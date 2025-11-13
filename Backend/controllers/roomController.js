const { body, validationResult, query } = require('express-validator');
const { supabase } = require('../config/database');

// Validações para criar quarto
const validateRoomCreation = [
  body('numero').isInt({ min: 1 }).withMessage('Número do quarto deve ser um número inteiro positivo'),
  body('tipo').trim().isLength({ min: 2 }).withMessage('Tipo do quarto é obrigatório'),
  body('capacidade').isInt({ min: 1, max: 10 }).withMessage('Capacidade deve ser entre 1 e 10 pessoas'),
  body('preco').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  body('descricao').optional().trim(),
  body('amenidades').optional().isArray().withMessage('Amenidades deve ser um array')
];

// Validações para atualizar quarto
const validateRoomUpdate = [
  body('numero').optional().isInt({ min: 1 }).withMessage('Número do quarto deve ser um número inteiro positivo'),
  body('tipo').optional().trim().isLength({ min: 2 }).withMessage('Tipo do quarto deve ter pelo menos 2 caracteres'),
  body('capacidade').optional().isInt({ min: 1, max: 10 }).withMessage('Capacidade deve ser entre 1 e 10 pessoas'),
  body('preco').optional().isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo'),
  body('status').optional().isIn(['disponivel', 'ocupado', 'manutencao', 'reservado']).withMessage('Status inválido'),
  body('descricao').optional().trim(),
  body('amenidades').optional().isArray().withMessage('Amenidades deve ser um array')
];

// Criar novo quarto
const createRoom = async (req, res) => {
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

    const { numero, tipo, capacidade, preco, descricao, amenidades, status } = req.body;

    // Verificar se o número do quarto já existe
    const { data: existingRoom } = await supabase
      .from('rooms')
      .select('id')
      .eq('numero', numero)
      .eq('deleted_at', null)
      .single();

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: 'Número do quarto já está em uso'
      });
    }

    // Criar quarto
    const { data: newRoom, error } = await supabase
      .from('rooms')
      .insert([{
        numero,
        tipo,
        capacidade,
        preco,
        descricao: descricao || null,
        amenidades: amenidades || [],
        status: status || 'disponivel',
        created_by: req.user?.id || null
      }])
      .select('id, numero, tipo, capacidade, preco, descricao, amenidades, status, created_at, updated_at')
      .single();

    if (error) {
      console.error('Erro ao criar quarto:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Quarto criado com sucesso',
      data: { room: newRoom }
    });

  } catch (error) {
    console.error('Erro no cadastro de quarto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Listar todos os quartos
const getAllRooms = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = '',
      tipo = '',
      min_preco = '',
      max_preco = '',
      min_capacidade = ''
    } = req.query;
    
    const offset = (page - 1) * limit;

    let query = supabase
      .from('rooms')
      .select('id, numero, tipo, capacidade, preco, descricao, amenidades, status, created_at, updated_at', { count: 'exact' })
      .eq('deleted_at', null)
      .order('numero', { ascending: true });

    // Aplicar filtros
    if (search) {
      query = query.or(`numero.ilike.%${search}%,tipo.ilike.%${search}%,descricao.ilike.%${search}%`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (tipo) {
      query = query.eq('tipo', tipo);
    }

    if (min_preco) {
      query = query.gte('preco', parseFloat(min_preco));
    }

    if (max_preco) {
      query = query.lte('preco', parseFloat(max_preco));
    }

    if (min_capacidade) {
      query = query.gte('capacidade', parseInt(min_capacidade));
    }

    // Aplicar paginação
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: rooms, error, count } = await query;

    if (error) {
      console.error('Erro ao buscar quartos:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      data: {
        rooms: rooms || [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count || 0,
          totalPages: Math.ceil((count || 0) / parseInt(limit))
        }
      }
    });

  } catch (error) {
    console.error('Erro ao listar quartos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Obter quarto por ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: room, error } = await supabase
      .from('rooms')
      .select('id, numero, tipo, capacidade, preco, descricao, amenidades, status, created_at, updated_at')
      .eq('id', id)
      .eq('deleted_at', null)
      .single();

    if (error || !room) {
      return res.status(404).json({
        success: false,
        message: 'Quarto não encontrado'
      });
    }

    res.json({
      success: true,
      data: { room }
    });

  } catch (error) {
    console.error('Erro ao buscar quarto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Atualizar quarto
const updateRoom = async (req, res) => {
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

    const { id } = req.params;
    const { numero, tipo, capacidade, preco, descricao, amenidades, status } = req.body;

    // Verificar se o quarto existe
    const { data: existingRoom, error: checkError } = await supabase
      .from('rooms')
      .select('id, numero')
      .eq('id', id)
      .eq('deleted_at', null)
      .single();

    if (checkError || !existingRoom) {
      return res.status(404).json({
        success: false,
        message: 'Quarto não encontrado'
      });
    }

    // Se o número está sendo alterado, verificar se já existe outro quarto com esse número
    if (numero && numero !== existingRoom.numero) {
      const { data: roomWithNumber } = await supabase
        .from('rooms')
        .select('id')
        .eq('numero', numero)
        .eq('deleted_at', null)
        .neq('id', id)
        .single();

      if (roomWithNumber) {
        return res.status(400).json({
          success: false,
          message: 'Número do quarto já está em uso'
        });
      }
    }

    // Preparar dados para atualização
    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (numero !== undefined) updateData.numero = numero;
    if (tipo !== undefined) updateData.tipo = tipo;
    if (capacidade !== undefined) updateData.capacidade = capacidade;
    if (preco !== undefined) updateData.preco = preco;
    if (descricao !== undefined) updateData.descricao = descricao;
    if (amenidades !== undefined) updateData.amenidades = amenidades;
    if (status !== undefined) updateData.status = status;

    // Atualizar quarto
    const { data: updatedRoom, error } = await supabase
      .from('rooms')
      .update(updateData)
      .eq('id', id)
      .eq('deleted_at', null)
      .select('id, numero, tipo, capacidade, preco, descricao, amenidades, status, created_at, updated_at')
      .single();

    if (error) {
      console.error('Erro ao atualizar quarto:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      message: 'Quarto atualizado com sucesso',
      data: { room: updatedRoom }
    });

  } catch (error) {
    console.error('Erro ao atualizar quarto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Deletar quarto (soft delete)
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se o quarto existe
    const { data: room, error: checkError } = await supabase
      .from('rooms')
      .select('id, numero')
      .eq('id', id)
      .eq('deleted_at', null)
      .single();

    if (checkError || !room) {
      return res.status(404).json({
        success: false,
        message: 'Quarto não encontrado'
      });
    }

    // Soft delete
    const { error } = await supabase
      .from('rooms')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: req.user?.id || null
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar quarto:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    res.json({
      success: true,
      message: 'Quarto deletado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao deletar quarto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Obter quartos disponíveis
const getAvailableRooms = async (req, res) => {
  try {
    const { 
      data_entrada = '', 
      data_saida = '',
      capacidade = '',
      tipo = ''
    } = req.query;

    let query = supabase
      .from('rooms')
      .select('id, numero, tipo, capacidade, preco, descricao, amenidades, status')
      .eq('deleted_at', null)
      .eq('status', 'disponivel')
      .order('numero', { ascending: true });

    // Aplicar filtros
    if (capacidade) {
      query = query.gte('capacidade', parseInt(capacidade));
    }

    if (tipo) {
      query = query.eq('tipo', tipo);
    }

    const { data: rooms, error } = await query;

    if (error) {
      console.error('Erro ao buscar quartos disponíveis:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }

    // TODO: Se data_entrada e data_saida forem fornecidas, 
    // verificar conflitos com reservas existentes
    // Por enquanto, retornamos apenas os quartos com status 'disponivel'

    res.json({
      success: true,
      data: {
        rooms: rooms || [],
        count: rooms?.length || 0
      }
    });

  } catch (error) {
    console.error('Erro ao buscar quartos disponíveis:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  validateRoomCreation,
  validateRoomUpdate,
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAvailableRooms
};

