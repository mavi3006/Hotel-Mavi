const express = require('express');
const router = express.Router();
const {
  validateRoomCreation,
  validateRoomUpdate,
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAvailableRooms
} = require('../controllers/roomController');
const { authenticateToken } = require('../middleware/auth');

// Rota pública - listar quartos disponíveis
router.get('/available', getAvailableRooms);

// Rota pública - listar todos os quartos (com filtros)
router.get('/', getAllRooms);

// Rota pública - obter quarto por ID
router.get('/:id', getRoomById);

// Rotas protegidas (requerem autenticação)
router.post('/', authenticateToken, validateRoomCreation, createRoom);
router.put('/:id', authenticateToken, validateRoomUpdate, updateRoom);
router.delete('/:id', authenticateToken, deleteRoom);

module.exports = router;

