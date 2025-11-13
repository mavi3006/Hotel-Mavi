# 🔧 Correção do Erro no Render

## Problema
O Render está procurando o diretório em `/opt/render/project/src/frontend`, mas o projeto tem `Frontend/` na raiz.

## ✅ Solução Rápida

### Opção 1: Corrigir no Painel do Render (Mais Rápido)

1. Acesse o painel do Render: https://dashboard.render.com
2. Vá no serviço **hotel-mavi-frontend**
3. Clique em **Settings** (Configurações)
4. Role até a seção **Build & Deploy**
5. Encontre o campo **Root Directory**
6. **Altere de**: `src/frontend` (ou qualquer outro valor)
7. **Para**: `Frontend` (exatamente assim, com F maiúsculo)
8. Clique em **Save Changes**
9. Vá em **Manual Deploy** > **Deploy latest commit**

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
- O build deve mostrar: `cd Frontend` (não `cd src/frontend`)
- Não deve mais aparecer o erro: "Service Root Directory is missing"

## 📝 Configuração Correta

O `render.yaml` já está correto na raiz do repositório com:
```yaml
rootDir: Frontend
```

Se você configurou manualmente no painel, essa configuração manual **sobrescreve** o `render.yaml`.

## ⚠️ Importante

- Se você tem um serviço criado manualmente, ele **não usa** o `render.yaml` automaticamente
- O `render.yaml` só funciona com **Blueprints** (criados via "New > Blueprint")
- Para serviços manuais, você precisa configurar o Root Directory no painel

## 🚀 Próximos Passos

1. Corrija o Root Directory no painel OU recrie via Blueprint
2. Faça um novo deploy
3. Verifique os logs para confirmar que está funcionando

