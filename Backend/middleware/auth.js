const jwt = require('jsonwebtoken');
const { supabase } = require('../config/database');

// Middleware para autenticar token JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido'
      });
    }

    // Verificar e decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu-jwt-secret-aqui');
    
    // Buscar usuário no banco de dados
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nome, email, active, deleted_at')
      .eq('id', decoded.userId)
      .eq('deleted_at', null)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado ou token inválido'
      });
    }

    if (!user.active) {
      return res.status(401).json({
        success: false,
        message: 'Conta desativada'
      });
    }

    // Adicionar informações do usuário à requisição
    req.user = {
      id: user.id,
      nome: user.nome,
      email: user.email
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    console.error('Erro na autenticação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Middleware para verificar se o usuário é admin
const requireAdmin = async (req, res, next) => {
  try {
    // Buscar informações completas do usuário incluindo role
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nome, email, role, active, deleted_at')
      .eq('id', req.user.id)
      .eq('deleted_at', null)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar se o usuário é admin
    // Assumindo que existe um campo 'role' na tabela users
    // Se não existir, você pode ajustar esta lógica
    if (user.role !== 'admin' && user.role !== 'administrador') {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Apenas administradores podem realizar esta ação.'
      });
    }

    req.user.role = user.role;
    next();
  } catch (error) {
    console.error('Erro ao verificar permissões de admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  authenticateToken,
  requireAdmin
};

