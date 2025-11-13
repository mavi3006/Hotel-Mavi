# Hotel Mavi - Backend API

Backend simplificado usando apenas Supabase.

## 📋 Variáveis de Ambiente

Apenas **3 variáveis** são necessárias:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
SUPABASE_ANON_KEY=sua-anon-key
```

## 🚀 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
```bash
# Copie o .env.example para .env
cp .env.example .env

# Edite o .env com suas credenciais do Supabase
```

3. **Executar:**
```bash
npm start
```

## 📁 Estrutura

```
Backend/
├── config/
│   └── database.js      # Configuração Supabase
├── controllers/
│   ├── userController.js
│   └── roomController.js
├── middleware/
│   └── auth.js          # Autenticação Supabase
├── routes/
│   ├── userRoutes.js
│   └── roomRoutes.js
└── server.js            # Servidor Express
```

## 🔌 Endpoints

- `GET /health` - Health check
- `GET /api/users` - Listar usuários
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Login
- `GET /api/rooms` - Listar quartos
- `POST /api/rooms` - Criar quarto

## ✅ Teste de Conexão

O sistema testa automaticamente a conexão com Supabase ao iniciar.
Verifique os logs para confirmar: `✅ Conexão com Supabase estabelecida com sucesso`
