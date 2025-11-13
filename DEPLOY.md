# Guia de Deploy no Render

Este guia explica como fazer deploy do Hotel Mavi no Render.

## 📋 Estrutura do Projeto

O projeto está organizado da seguinte forma:
```
Hotel-Mavi/
├── Backend/          # API Node.js/Express
├── Frontend/         # Aplicação React/Vite
└── render.yaml       # Configuração do Render
```

## 🚀 Configuração no Render

### 1. Arquivo render.yaml

O arquivo `render.yaml` na raiz do projeto configura automaticamente dois serviços:

- **Backend**: API Node.js na pasta `Backend/`
- **Frontend**: Aplicação React na pasta `Frontend/`

### 2. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no painel do Render:

#### Backend (`hotel-mavi-backend`):
- `NODE_ENV`: `production`
- `PORT`: `3000` (ou deixe o Render atribuir automaticamente)
- `JWT_SECRET`: Sua chave secreta JWT (gere uma chave segura)
- `SUPABASE_URL`: URL do seu projeto Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key do Supabase
- `SUPABASE_ANON_KEY`: Anon Key do Supabase
- `FRONTEND_URL`: URL do seu frontend no Render (ex: `https://hotel-mavi-frontend.onrender.com`)

#### Frontend (`hotel-mavi-frontend`):
- `NODE_ENV`: `production`
- `VITE_API_URL`: URL do seu backend no Render (ex: `https://hotel-mavi-backend.onrender.com`)

### 3. Como Fazer Deploy

#### Opção 1: Deploy Automático via render.yaml

1. No painel do Render, vá em **Dashboard** > **New** > **Blueprint**
2. Conecte seu repositório GitHub
3. O Render detectará automaticamente o `render.yaml` e criará os serviços

#### Opção 2: Deploy Manual

**Backend:**
1. Crie um novo **Web Service**
2. Conecte seu repositório GitHub
3. Configure:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. Adicione as variáveis de ambiente listadas acima

**Frontend:**
1. Crie um novo **Web Service**
2. Conecte seu repositório GitHub
3. Configure:
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx vite preview --host 0.0.0.0 --port $PORT`
   - **Environment**: `Node`
4. Adicione as variáveis de ambiente listadas acima

## 🔧 Solução de Problemas

### Erro: "Service Root Directory is missing"

Se você receber este erro:
```
Service Root Directory "/opt/render/project/src/frontend" is missing.
```

**Solução:**
1. Verifique se o arquivo `render.yaml` está na raiz do repositório
2. Certifique-se de que o `rootDir` no `render.yaml` está correto:
   - Backend: `rootDir: Backend`
   - Frontend: `rootDir: Frontend`
3. Verifique se os diretórios `Backend/` e `Frontend/` existem na raiz do repositório

### Erro: "No such file or directory"

Se você receber este erro ao fazer build:
```
builder.sh: line 51: cd: /opt/render/project/src/frontend: No such file or directory
```

**Solução:**
- O Render está procurando no caminho errado
- Certifique-se de que o `render.yaml` está configurado corretamente
- Verifique se você não configurou manualmente um "Root Directory" diferente no painel do Render

### Build do Frontend Falha

Se o build do frontend falhar:
1. Verifique se todas as dependências estão no `package.json`
2. Certifique-se de que o Node.js está na versão 16 ou superior
3. Verifique os logs de build no Render para mais detalhes

### CORS Errors

Se você receber erros de CORS:
1. Certifique-se de que `FRONTEND_URL` no backend está configurado com a URL correta do frontend
2. Verifique se a URL não tem barra no final (ex: `https://hotel-mavi-frontend.onrender.com` e não `https://hotel-mavi-frontend.onrender.com/`)

## 📝 Checklist de Deploy

- [ ] Arquivo `render.yaml` está na raiz do repositório
- [ ] Diretórios `Backend/` e `Frontend/` existem
- [ ] Variáveis de ambiente do Backend configuradas
- [ ] Variáveis de ambiente do Frontend configuradas
- [ ] `FRONTEND_URL` aponta para a URL do frontend no Render
- [ ] `VITE_API_URL` aponta para a URL do backend no Render
- [ ] Credenciais do Supabase configuradas corretamente
- [ ] `JWT_SECRET` é uma chave segura e única

## 🔗 URLs dos Serviços

Após o deploy, você terá URLs como:
- Backend: `https://hotel-mavi-backend.onrender.com`
- Frontend: `https://hotel-mavi-frontend.onrender.com`

## ⚠️ Notas Importantes

1. **Free Tier do Render**: Os serviços podem "dormir" após inatividade. O primeiro acesso pode demorar alguns segundos para "acordar".

2. **Build Time**: O build inicial pode levar alguns minutos. Seja paciente.

3. **Logs**: Use os logs do Render para debugar problemas. Eles estão disponíveis no painel de cada serviço.

4. **Health Check**: O backend tem um endpoint de health check em `/health` que você pode usar para verificar se está funcionando.

## 🆘 Suporte

Se você continuar tendo problemas:
1. Verifique os logs no painel do Render
2. Certifique-se de que todas as variáveis de ambiente estão configuradas
3. Verifique se o `render.yaml` está formatado corretamente (YAML é sensível a indentação)

