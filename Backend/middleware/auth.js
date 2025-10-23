const jwt = require('jsonwebtoken');
const { supabase } = require('../config/database');

// Middleware de autenticação JWT
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acesso requerido' 
    });
  }

  try {
    // Verificar o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu-jwt-secret-aqui');
    
    // Buscar o usuário no banco para verificar se ainda está ativo
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nome, email, active, deleted_at')
      .eq('id', decoded.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não encontrado' 
      });
    }

    if (!user.active || user.deleted_at) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário inativo ou deletado' 
      });
    }

    // Adicionar dados do usuário ao request
    req.user = {
      id: user.id,
      nome: user.nome,
      email: user.email
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expirado' 
      });
    }
    
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};

// Middleware para verificar se é admin (opcional)
const requireAdmin = async (req, res, next) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('tipo_usuario')
      .eq('id', req.user.id)
      .single();

    if (error || !user || user.tipo_usuario !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Acesso negado. Apenas administradores.' 
      });
    }

    next();
  } catch (error) {
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
