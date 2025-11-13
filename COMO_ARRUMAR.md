# 🔧 Como Arrumar - Variáveis de Ambiente no Render

## ⚠️ Problema
O servidor não inicia porque faltam variáveis de ambiente.

## ✅ Solução em 3 Passos

### PASSO 1: Obter as Chaves do Supabase

1. Acesse: https://app.supabase.com
2. Faça login
3. Selecione seu projeto
4. Clique em **Settings** (ícone de engrenagem) no menu lateral
5. Clique em **API**
6. Você verá 3 coisas importantes:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (uma chave longa começando com `eyJ...`)
   - **service_role** key (outra chave longa começando com `eyJ...`)

**Copie essas 3 informações!**

### PASSO 2: Gerar JWT_SECRET

Abra o PowerShell e execute:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Copie o resultado!**

### PASSO 3: Adicionar no Render

1. Acesse: https://dashboard.render.com
2. Clique no serviço **hotel-mavi-backend**
3. No menu lateral esquerdo, clique em **Environment**
4. Clique no botão **Add Environment Variable** (ou **Add Variable**)

**Adicione uma por uma:**

#### Variável 1: SUPABASE_URL
- **Key**: `SUPABASE_URL`
- **Value**: Cole a **Project URL** do Supabase
- Clique em **Save**

#### Variável 2: SUPABASE_SERVICE_ROLE_KEY
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Cole a **service_role** key do Supabase
- Clique em **Save**

#### Variável 3: SUPABASE_ANON_KEY
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: Cole a **anon public** key do Supabase
- Clique em **Save**

#### Variável 4: JWT_SECRET
- **Key**: `JWT_SECRET`
- **Value**: Cole a chave que você gerou no PowerShell
- Clique em **Save**

#### Variável 5: FRONTEND_URL
- **Key**: `FRONTEND_URL`
- **Value**: A URL do seu frontend no Render
  - Se ainda não tem frontend, use: `http://localhost:5173` (temporário)
  - Se já tem, use: `https://hotel-mavi-frontend.onrender.com` (sem barra no final!)
- Clique em **Save**

#### Variável 6: NODE_ENV (se não existir)
- **Key**: `NODE_ENV`
- **Value**: `production`
- Clique em **Save**

### PASSO 4: Fazer Novo Deploy

1. Depois de adicionar todas as variáveis, vá em **Manual Deploy**
2. Clique em **Deploy latest commit**
3. Aguarde alguns minutos
4. Verifique os logs - deve aparecer: `🚀 Servidor Hotel Mavi rodando na porta XXXX`

## ✅ Verificar se Funcionou

1. Vá em **Logs** no menu lateral
2. Procure por: `🚀 Servidor Hotel Mavi rodando`
3. Se aparecer, está funcionando! ✅
4. Se ainda aparecer erro de variáveis, verifique se salvou todas corretamente

## 🆘 Ainda com Problema?

**Verifique:**
- [ ] Todas as 6 variáveis foram adicionadas?
- [ ] Os nomes das variáveis estão exatamente como mostrado acima?
- [ ] Não tem espaços extras nos nomes ou valores?
- [ ] FRONTEND_URL não tem barra no final?
- [ ] Fez um novo deploy após adicionar as variáveis?

## 📝 Resumo Rápido

1. **Supabase** → Settings > API → Copiar 3 chaves
2. **PowerShell** → Gerar JWT_SECRET
3. **Render** → Environment → Adicionar 6 variáveis
4. **Render** → Manual Deploy → Deploy latest commit

Pronto! 🎉

