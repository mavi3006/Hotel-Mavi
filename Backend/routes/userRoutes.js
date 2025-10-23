const express = require('express');
const router = express.Router();
const {
  validateUserRegistration,
  validateUserLogin,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Rotas públicas (não requerem autenticação)
router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);

// Rotas protegidas (requerem autenticação)
router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.put('/change-password', authenticateToken, changePassword);

// Rotas administrativas (requerem autenticação e privilégios de admin)
router.get('/admin/users', authenticateToken, requireAdmin, getAllUsers);
router.delete('/admin/users/:id', authenticateToken, requireAdmin, deleteUser);

module.exports = router;
