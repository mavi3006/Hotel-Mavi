const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { supabase } = require('../config/database');

// Função para gerar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'seu-jwt-secret-aqui',
    { expiresIn: '24h' }
  );
};

// Função para validar CPF (básica)
const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '');
  if (cpf.length !== 11) return false;
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Algoritmo de validação do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;
  
  return true;
};

// Validações para cadastro
const validateUserRegistration = [
  body('nome').trim().isLength({ min: 2 }).withMessage('Nome deve ter pelo menos 2 caracteres'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('cpf').custom((value) => {
    if (!validateCPF(value)) {
      throw new Error('CPF inválido');
    }
    return true;
  }),
  body('tel').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
  body('data_nascimento').optional().isISO8601().withMessage('Data de nascimento inválida')
];

// Validações para login
const validateUserLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('senha').notEmpty().withMessage('Senha é obrigatória')
];

// Cadastrar usuário
const registerUser = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { nome, pronome, email, senha, tel, data_nascimento, cpf } = req.body;

    // Verificar se email já existe
    const { data: existingUserByEmail } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .eq('deleted_at', null)
      .single();

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    // Verificar se CPF já existe
    const { data: existingUserByCPF } = await supabase
      .from('users')
      .select('id')
      .eq('cpf', cpf)
      .eq('deleted_at', null)
      .single();

    if (existingUserByCPF) {
      return res.status(400).json({
        success: false,
        message: 'CPF já está em uso'
      });
    }

    // Criptografar senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Criar usuário
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        nome,
        pronome: pronome || null,
        email,
        senha: hashedPassword,
        tel: tel || null,
        data_nascimento: data_nascimento || null,
        cpf,
        active: true
      }])
      .select('id, nome, email, tel, data_nascimento, created_at')
      .single();

    if (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    // Gerar token
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      data: {
        user: newUser,
        token
      }
    });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Login do usuário
const loginUser = async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const { email, senha } = req.body;

    // Buscar usuário por email
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nome, email, senha, active, deleted_at')
      .eq('email', email)
      .eq('deleted_at', null)
      .single();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificar se usuário está ativo
    if (!user.active) {
      return res.status(401).json({
        success: false,
        message: 'Conta desativada'
      });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Atualizar último login
    await supabase
      .from('users')
      .update({ ultimo_login: new Date().toISOString() })
      .eq('id', user.id);

    // Gerar token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email
        },
        token
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Obter perfil do usuário
const getUserProfile = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nome, pronome, email, tel, data_nascimento, cpf, created_at')
      .eq('id', req.user.id)
      .eq('deleted_at', null)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Atualizar perfil do usuário
const updateUserProfile = async (req, res) => {
  try {
    const { nome, pronome, tel, data_nascimento } = req.body;
    const userId = req.user.id;

    const updateData = {};
    if (nome) updateData.nome = nome;
    if (pronome !== undefined) updateData.pronome = pronome;
    if (tel) updateData.tel = tel;
    if (data_nascimento) updateData.data_nascimento = data_nascimento;

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .eq('deleted_at', null)
      .select('id, nome, pronome, email, tel, data_nascimento, cpf, created_at')
      .single();

    if (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: { user: updatedUser }
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Alterar senha
const changePassword = async (req, res) => {
  try {
    const { senha_atual, nova_senha } = req.body;

    if (!senha_atual || !nova_senha) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual e nova senha são obrigatórias'
      });
    }

    if (nova_senha.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Nova senha deve ter pelo menos 6 caracteres'
      });
    }

    // Buscar usuário atual
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('senha')
      .eq('id', req.user.id)
      .eq('deleted_at', null)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(senha_atual, user.senha);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }

    // Criptografar nova senha
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(nova_senha, saltRounds);

    // Atualizar senha
    const { error: updateError } = await supabase
      .from('users')
      .update({ senha: hashedNewPassword })
      .eq('id', req.user.id);

    if (updateError) {
      console.error('Erro ao atualizar senha:', updateError);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Listar todos os usuários (apenas admin)
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select('id, nome, email, tel, data_nascimento, active, created_at')
      .eq('deleted_at', null)
      .order('created_at', { ascending: false });

    // Aplicar filtro de busca se fornecido
    if (search) {
      query = query.or(`nome.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Aplicar paginação
    query = query.range(offset, offset + limit - 1);

    const { data: users, error, count } = await query;

    if (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count || users.length
        }
      }
    });

  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Soft delete do usuário
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBy = req.user.nome;

    // Verificar se o usuário existe
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .eq('deleted_at', null)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Soft delete
    const { error } = await supabase
      .from('users')
      .update({
        active: false,
        deleted_at: new Date().toISOString(),
        deleted_by: deletedBy
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers,
  deleteUser
};
