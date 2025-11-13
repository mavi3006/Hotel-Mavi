# 🔐 Configurar Variáveis de Ambiente no Render

## ✅ Progresso
O build está funcionando! Agora você precisa configurar as variáveis de ambiente.

## ❌ Erro Atual
```
Error: Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias
```

## 📋 Variáveis Necessárias

### Para o Serviço Backend (hotel-mavi-backend)

Você precisa configurar as seguintes variáveis de ambiente:

1. **SUPABASE_URL** - URL do seu projeto Supabase
2. **SUPABASE_SERVICE_ROLE_KEY** - Service Role Key do Supabase
3. **SUPABASE_ANON_KEY** - Anon Key do Supabase
4. **JWT_SECRET** - Chave secreta para JWT (gere uma chave segura)
5. **FRONTEND_URL** - URL do seu frontend no Render
6. **NODE_ENV** - `production` (já deve estar configurado)
7. **PORT** - `3000` ou deixe o Render atribuir automaticamente

## 🚀 Passo a Passo

### Passo 1: Obter Credenciais do Supabase

1. Acesse: https://app.supabase.com
2. Faça login e selecione seu projeto
3. Vá em **Settings** (Configurações) > **API**
4. Você verá:
   - **Project URL** → Use para `SUPABASE_URL`
   - **anon public** key → Use para `SUPABASE_ANON_KEY`
   - **service_role** key → Use para `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANTE**: A `service_role` key tem privilégios administrativos completos. Mantenha-a segura!

### Passo 2: Gerar JWT_SECRET

Você pode gerar uma chave secreta de várias formas:

**Opção 1: Online**
- Acesse: https://generate-secret.vercel.app/32
- Copie a chave gerada

**Opção 2: Terminal (se tiver Node.js)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Opção 3: PowerShell (Windows)**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Passo 3: Obter URL do Frontend

1. No Render, vá no serviço do **Frontend** (hotel-mavi-frontend)
2. Copie a URL do serviço (ex: `https://hotel-mavi-frontend.onrender.com`)
3. Use essa URL para `FRONTEND_URL` (sem barra no final)

### Passo 4: Configurar Variáveis no Render

1. Acesse: https://dashboard.render.com
2. Vá no serviço **hotel-mavi-backend**
3. No menu lateral, clique em **Environment** (ou **Environment Variables**)
4. Clique em **Add Environment Variable** (ou **Adicionar Variável de Ambiente**)

#### Adicionar cada variável:

**1. SUPABASE_URL**
- **Key**: `SUPABASE_URL`
- **Value**: Cole a Project URL do Supabase (ex: `https://abcdefghijklmnop.supabase.co`)
- Clique em **Save**

**2. SUPABASE_SERVICE_ROLE_KEY**
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Cole a service_role key do Supabase
- Clique em **Save**

**3. SUPABASE_ANON_KEY**
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: Cole a anon public key do Supabase
- Clique em **Save**

**4. JWT_SECRET**
- **Key**: `JWT_SECRET`
- **Value**: Cole a chave secreta que você gerou
- Clique em **Save**

**5. FRONTEND_URL**
- **Key**: `FRONTEND_URL`
- **Value**: URL do seu frontend (ex: `https://hotel-mavi-frontend.onrender.com`)
- ⚠️ **Sem barra no final!**
- Clique em **Save**

**6. NODE_ENV** (se não existir)
- **Key**: `NODE_ENV`
- **Value**: `production`
- Clique em **Save**

### Passo 5: Verificar Todas as Variáveis

Após adicionar todas, você deve ter:

```
✅ SUPABASE_URL
✅ SUPABASE_SERVICE_ROLE_KEY
✅ SUPABASE_ANON_KEY
✅ JWT_SECRET
✅ FRONTEND_URL
✅ NODE_ENV (production)
✅ PORT (opcional, o Render atribui automaticamente)
```

### Passo 6: Fazer Novo Deploy

1. Após adicionar todas as variáveis, vá em **Manual Deploy**
2. Clique em **Deploy latest commit**
3. Aguarde o deploy completar
4. Verifique os logs para confirmar que iniciou corretamente

## 🔍 Verificação

Após o deploy, verifique:

1. **Logs do Servidor**:
   - Deve mostrar: `🚀 Servidor Hotel Mavi rodando na porta XXXX`
   - Não deve mostrar erros sobre variáveis de ambiente

2. **Health Check**:
   - Acesse: `https://seu-backend.onrender.com/health`
   - Deve retornar: `{"success":true,"message":"Hotel Mavi API está funcionando"}`

3. **Endpoints**:
   - `/api/users` - Deve estar acessível
   - `/api/rooms` - Deve estar acessível

## ⚠️ Problemas Comuns

### Erro: "Variáveis de ambiente são obrigatórias"
- Verifique se todas as variáveis foram salvas
- Certifique-se de que não há espaços extras nos nomes das variáveis
- Verifique se os valores foram copiados completamente

### Erro: "Invalid API key"
- Verifique se copiou as chaves corretas do Supabase
- Certifique-se de que não há espaços ou quebras de linha nas chaves

### CORS Errors
- Verifique se `FRONTEND_URL` está correto
- Certifique-se de que não tem barra no final da URL
- Verifique se a URL do frontend está correta

## 📝 Checklist Final

- [ ] Todas as variáveis de ambiente foram adicionadas
- [ ] Valores foram copiados corretamente (sem espaços extras)
- [ ] FRONTEND_URL não tem barra no final
- [ ] Novo deploy foi feito
- [ ] Logs mostram que o servidor iniciou corretamente
- [ ] Health check retorna sucesso

## 🎯 Próximos Passos

Após configurar as variáveis:
1. Configure as variáveis do Frontend também (VITE_API_URL)
2. Teste os endpoints da API
3. Teste a integração Frontend-Backend

