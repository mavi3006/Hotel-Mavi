import axios from 'axios';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Serviços de autenticação
export const authService = {
  // Cadastrar usuário
  async register(userData) {
    try {
      const response = await api.post('/api/users/register', userData);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login do usuário
  async login(credentials) {
    try {
      const response = await api.post('/api/users/login', credentials);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obter perfil do usuário
  async getProfile() {
    try {
      const response = await api.get('/api/users/profile');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar perfil
  async updateProfile(userData) {
    try {
      const response = await api.put('/api/users/profile', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Alterar senha
  async changePassword(passwordData) {
    try {
      const response = await api.put('/api/users/change-password', passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verificar se está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Obter usuário atual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Obter token
  getToken() {
    return localStorage.getItem('token');
  }
};

export default api;
