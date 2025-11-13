# 🔧 Correção do Erro no Render

## Problema
O Render está procurando diretórios incorretos:
- Frontend: `/opt/render/project/src/frontend` (deveria ser `Frontend`)
- Backend: `/opt/render/project/src/Beckend` (erro de digitação, deveria ser `Backend`)

## ✅ Solução Rápida

### Opção 1: Corrigir no Painel do Render (Mais Rápido)

#### Para o Serviço Backend (hotel-mavi-backend):

1. Acesse o painel do Render: https://dashboard.render.com
2. Vá no serviço **hotel-mavi-backend**
3. Clique em **Settings** (Configurações)
4. Role até a seção **Build & Deploy**
5. Encontre o campo **Root Directory**
6. **Altere de**: `src/Beckend` ou qualquer outro valor incorreto
7. **Para**: `Backend` (exatamente assim, com B maiúsculo e "a")
8. Clique em **Save Changes**
9. Vá em **Manual Deploy** > **Deploy latest commit**

#### Para o Serviço Frontend (hotel-mavi-frontend):

1. Vá no serviço **hotel-mavi-frontend**
2. Clique em **Settings** (Configurações)
3. Role até a seção **Build & Deploy**
4. Encontre o campo **Root Directory**
5. **Altere de**: `src/frontend` ou qualquer outro valor incorreto
6. **Para**: `Frontend` (exatamente assim, com F maiúsculo)
7. Clique em **Save Changes**
8. Vá em **Manual Deploy** > **Deploy latest commit**

### Opção 2: Recriar o Serviço usando Blueprint (Recomendado)

1. **Delete o serviço atual**:
   - No painel do Render, vá no serviço **hotel-mavi-frontend**
   - Clique em **Settings** > **Delete Service**
   - Confirme a exclusão

2. **Crie um novo Blueprint**:
   - No Dashboard, clique em **New** > **Blueprint**
   - Conecte seu repositório: `https://github.com/mavi3006/Hotel-Mavi`
   - O Render detectará automaticamente o `render.yaml`
   - Clique em **Apply**
   - Isso criará ambos os serviços (Backend e Frontend) automaticamente

3. **Configure as variáveis de ambiente**:
   - Após criar, configure as variáveis de ambiente em cada serviço
   - Backend: JWT_SECRET, SUPABASE_URL, etc.
   - Frontend: VITE_API_URL

## 🔍 Verificação

Após corrigir, verifique nos logs:
- Backend: O build deve mostrar: `cd Backend` (não `cd src/Beckend` ou `cd src/backend`)
- Frontend: O build deve mostrar: `cd Frontend` (não `cd src/frontend`)
- Não deve mais aparecer o erro: "Service Root Directory is missing"

## 📝 Configuração Correta

O `render.yaml` já está correto na raiz do repositório com:
```yaml
# Backend
rootDir: Backend  # Com B maiúsculo e "a" (não "Beckend" ou "backend")

# Frontend  
rootDir: Frontend  # Com F maiúsculo (não "frontend" ou "src/frontend")
```

⚠️ **IMPORTANTE**: Se você configurou manualmente no painel, essa configuração manual **sobrescreve** o `render.yaml`.

## ⚠️ Importante

- Se você tem um serviço criado manualmente, ele **não usa** o `render.yaml` automaticamente
- O `render.yaml` só funciona com **Blueprints** (criados via "New > Blueprint")
- Para serviços manuais, você precisa configurar o Root Directory no painel

## 🚀 Próximos Passos

1. Corrija o Root Directory no painel OU recrie via Blueprint
2. Faça um novo deploy
3. Verifique os logs para confirmar que está funcionando

