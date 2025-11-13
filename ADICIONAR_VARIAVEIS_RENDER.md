# 🚨 URGENTE: Adicionar Variáveis no Render

## ⚠️ O Erro
```
Error: Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórias
```

## ✅ SOLUÇÃO: Adicionar Variáveis no Painel do Render

### Passo 1: Acessar o Render
1. Abra: https://dashboard.render.com
2. Faça login

### Passo 2: Abrir o Serviço Backend
1. Clique no serviço **hotel-mavi-backend**
2. No menu lateral ESQUERDO, clique em **Environment** (ou **Environment Variables**)

### Passo 3: Adicionar as Variáveis

Clique no botão **Add Environment Variable** (ou **Add Variable**)

#### Variável 1: SUPABASE_URL
```
Key: SUPABASE_URL
Value: [Cole aqui a Project URL do Supabase]
```
- Vá em: https://app.supabase.com
- Settings > API
- Copie a **Project URL**
- Cole no campo Value
- Clique em **Save**

#### Variável 2: SUPABASE_SERVICE_ROLE_KEY
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: [Cole aqui a service_role key]
```
- No Supabase (Settings > API)
- Copie a **service_role** key (chave longa)
- Cole no campo Value
- Clique em **Save**

#### Variável 3: SUPABASE_ANON_KEY
```
Key: SUPABASE_ANON_KEY
Value: [Cole aqui a anon public key]
```
- No Supabase (Settings > API)
- Copie a **anon public** key
- Cole no campo Value
- Clique em **Save**

#### Variável 4: JWT_SECRET
```
Key: JWT_SECRET
Value: [Cole uma chave secreta]
```
- Gere uma chave no PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```
- Copie o resultado
- Cole no campo Value
- Clique em **Save**

#### Variável 5: FRONTEND_URL
```
Key: FRONTEND_URL
Value: https://hotel-mavi-frontend.onrender.com
```
- Use a URL do seu frontend no Render
- **SEM barra no final!**
- Clique em **Save**

#### Variável 6: NODE_ENV
```
Key: NODE_ENV
Value: production
```
- Clique em **Save**

### Passo 4: Verificar

Você deve ter 6 variáveis configuradas:
- ✅ SUPABASE_URL
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ SUPABASE_ANON_KEY
- ✅ JWT_SECRET
- ✅ FRONTEND_URL
- ✅ NODE_ENV

### Passo 5: Fazer Deploy

1. Vá em **Manual Deploy** (no menu lateral)
2. Clique em **Deploy latest commit**
3. Aguarde o deploy
4. Verifique os logs - deve aparecer: `🚀 Servidor Hotel Mavi rodando`

## 🎯 Onde Encontrar as Chaves do Supabase

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Menu lateral > **Settings** (engrenagem)
4. Clique em **API**
5. Você verá:
   - **Project URL** → Para `SUPABASE_URL`
   - **anon public** → Para `SUPABASE_ANON_KEY`
   - **service_role** → Para `SUPABASE_SERVICE_ROLE_KEY`

## ⚠️ IMPORTANTE

- O arquivo `.env` local **NÃO** funciona no Render
- As variáveis **DEVEM** ser adicionadas no painel do Render
- Após adicionar, **SEMPRE** faça um novo deploy

## ✅ Checklist

- [ ] Acessei o painel do Render
- [ ] Abri o serviço hotel-mavi-backend
- [ ] Fui em Environment
- [ ] Adicionei SUPABASE_URL
- [ ] Adicionei SUPABASE_SERVICE_ROLE_KEY
- [ ] Adicionei SUPABASE_ANON_KEY
- [ ] Adicionei JWT_SECRET
- [ ] Adicionei FRONTEND_URL
- [ ] Adicionei NODE_ENV
- [ ] Fiz um novo deploy
- [ ] Verifiquei os logs - servidor iniciou corretamente

## 🆘 Ainda com Erro?

1. Verifique se todas as 6 variáveis foram salvas
2. Verifique se os nomes estão exatamente como mostrado (case-sensitive)
3. Verifique se não há espaços extras
4. Faça um novo deploy após adicionar as variáveis

