# Hotel Mavi - Backend API

API REST para o sistema de gerenciamento de hotel desenvolvida com Node.js, Express e Supabase.

## 🚀 Funcionalidades

- ✅ Cadastro de usuários com validação
- ✅ Login com JWT
- ✅ Autenticação e autorização
- ✅ CRUD completo de usuários
- ✅ Soft delete
- ✅ Validação de CPF
- ✅ Criptografia de senhas com bcrypt
- ✅ Rate limiting
- ✅ Middleware de segurança

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Supabase
- Banco de dados PostgreSQL (Supabase)

## 🛠️ Instalação

1. **Clone o repositório e navegue para a pasta Backend:**
```bash
cd Backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Renomeie o arquivo .env.example para .env
cp .env.example .env
```

4. **Configure o arquivo .env com suas credenciais do Supabase:**
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-servico-aqui
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. **Execute o SQL no Supabase para criar a tabela users:**
```sql
CREATE TABLE public.users (
  id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  nome text NOT NULL,
  pronome text,
  senha text NOT NULL,
  email text NOT NULL UNIQUE,
  tel text,
  data_nascimento date,
  cpf text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  active boolean DEFAULT true,
  deleted_at timestamp with time zone,
  deleted_by text,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
```

## 🏃‍♂️ Executando o projeto

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Documentação da API

### Endpoints de Usuários

#### **POST** `/api/users/register`
Cadastra um novo usuário.

**Body:**
```json
{
  "nome": "João Silva",
  "pronome": "ele/dele",
  "email": "joao@email.com",
  "senha": "123456",
  "tel": "(11) 99999-9999",
  "data_nascimento": "1990-01-01",
  "cpf": "12345678901"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "tel": "(11) 99999-9999",
      "data_nascimento": "1990-01-01",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### **POST** `/api/users/login`
Realiza login do usuário.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### **GET** `/api/users/profile`
Obtém o perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

#### **PUT** `/api/users/profile`
Atualiza o perfil do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

#### **PUT** `/api/users/change-password`
Altera a senha do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "senha_atual": "123456",
  "nova_senha": "novaSenha123"
}
```

### Endpoints Administrativos

#### **GET** `/api/users/admin/users`
Lista todos os usuários (apenas admin).

**Headers:**
```
Authorization: Bearer <admin-token>
```

#### **DELETE** `/api/users/admin/users/:id`
Remove um usuário (soft delete, apenas admin).

**Headers:**
```
Authorization: Bearer <admin-token>
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt (12 rounds)
- JWT para autenticação
- Rate limiting (100 req/15min geral, 5 req/15min para login)
- Validação de entrada com express-validator
- Headers de segurança com helmet
- CORS configurado
- Soft delete para preservar dados

## 🧪 Testando a API

Use o Postman, Insomnia ou curl para testar os endpoints:

```bash
# Health check
curl http://localhost:3000/health

# Cadastro
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@email.com",
    "senha": "123456",
    "cpf": "12345678901"
  }'

# Login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@email.com",
    "senha": "123456"
  }'
```

## 📝 Logs

O servidor registra automaticamente:
- Todas as requisições HTTP
- Erros e exceções
- Tentativas de login

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente de produção
2. Execute `npm install --production`
3. Execute `npm start`

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
