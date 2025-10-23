# Hotel Mavi - Frontend

Frontend React para o sistema de gerenciamento de hotel desenvolvido com Vite, Tailwind CSS e React Router.

## 🚀 Funcionalidades

- ✅ Página de Login responsiva
- ✅ Página de Cadastro com validação
- ✅ Dashboard com informações do usuário
- ✅ Autenticação JWT
- ✅ Roteamento protegido
- ✅ Notificações toast
- ✅ Design moderno e responsivo
- ✅ Formulários com validação
- ✅ Context API para gerenciamento de estado

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Backend da API rodando

## 🛠️ Instalação

1. **Navegue para a pasta Frontend:**
```bash
cd Frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Crie um arquivo .env baseado no .env.example
cp .env.example .env
```

4. **Configure o arquivo .env:**
```env
VITE_API_URL=http://localhost:3000
```

## 🏃‍♂️ Executando o projeto

**Desenvolvimento:**
```bash
npm run dev
```

**Build para produção:**
```bash
npm run build
```

**Preview da build:**
```bash
npm run preview
```

O servidor de desenvolvimento estará rodando em `http://localhost:5173`

## 📱 Páginas Disponíveis

### **Login** (`/login`)
- Formulário de login com email e senha
- Validação de campos obrigatórios
- Redirecionamento automático após login
- Link para página de cadastro

### **Cadastro** (`/register`)
- Formulário completo de cadastro
- Validação de CPF
- Confirmação de senha
- Validação de email
- Aceite de termos

### **Dashboard** (`/dashboard`)
- Informações do usuário logado
- Cards com estatísticas (simuladas)
- Botão de logout
- Design responsivo

## 🎨 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool moderna
- **React Router DOM** - Roteamento
- **Tailwind CSS** - Framework CSS
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones

## 🔧 Componentes

### **UI Components**
- `Button` - Botão reutilizável com variantes
- `Input` - Input com validação e máscaras
- `Card` - Cards para layout

### **Pages**
- `Login` - Página de login
- `Register` - Página de cadastro
- `Dashboard` - Dashboard principal

### **Services**
- `authService` - Serviços de autenticação

### **Context**
- `AuthContext` - Contexto de autenticação global

## 🔒 Autenticação

O sistema utiliza JWT para autenticação:
- Token armazenado no localStorage
- Interceptor automático para requisições
- Redirecionamento automático em caso de token expirado
- Proteção de rotas

## 🎯 Roteamento

- `/login` - Página de login (pública)
- `/register` - Página de cadastro (pública)
- `/dashboard` - Dashboard (protegida)
- `/` - Redireciona para dashboard se logado, senão para login

## 📱 Responsividade

O design é totalmente responsivo e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🔧 Desenvolvimento

### Estrutura de pastas:
```
src/
├── components/
│   ├── ui/           # Componentes de UI reutilizáveis
│   └── ProtectedRoute.jsx
├── contexts/         # Contextos React
├── pages/           # Páginas da aplicação
├── services/        # Serviços de API
├── App.jsx          # Componente principal
├── main.jsx         # Ponto de entrada
└── index.css        # Estilos globais
```

### Adicionando novas páginas:
1. Crie o componente na pasta `src/pages/`
2. Adicione a rota em `src/App.jsx`
3. Use `ProtectedRoute` se necessário

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure a variável `VITE_API_URL` com a URL da API de produção
2. Execute `npm run build`
3. Os arquivos estarão na pasta `dist/`

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
