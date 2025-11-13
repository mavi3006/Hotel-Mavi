const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');

// Importar database para testar conexão
require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging simples
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', async (req, res) => {
  try {
    const { supabase } = require('./config/database');
    const { error } = await supabase.from('users').select('count').limit(1);
    
    res.json({
      success: true,
      message: 'API funcionando',
      database: error ? 'erro' : 'conectado',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro na conexão com o banco',
      error: error.message
    });
  }
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hotel Mavi API',
    endpoints: {
      health: '/health',
      users: '/api/users',
      rooms: '/api/rooms'
    }
  });
});

// 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Erro:', error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
});

module.exports = app;
