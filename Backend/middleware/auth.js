const { supabaseAnon } = require('../config/database');

// Middleware para autenticar usando Supabase
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

    // Verificar token com Supabase
    const { data: { user }, error } = await supabaseAnon.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }

    // Buscar informações do usuário na tabela users
    const { data: userData, error: userError } = await supabaseAnon
      .from('users')
      .select('id, nome, email, active, deleted_at')
      .eq('id', user.id)
      .eq('deleted_at', null)
      .single();

    if (userError || !userData) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    if (!userData.active) {
      return res.status(401).json({
        success: false,
        message: 'Conta desativada'
      });
    }

    // Adicionar informações do usuário à requisição
    req.user = {
      id: userData.id,
      nome: userData.nome,
      email: userData.email
    };

    next();
  } catch (error) {
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
    const { data: user, error } = await supabaseAnon
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

