# Configuração de Variáveis de Ambiente

Este arquivo contém informações sobre as variáveis de ambiente necessárias para o projeto.

## Arquivo .env

O arquivo `.env` foi criado na pasta `Backend/`. Você precisa editar este arquivo e adicionar suas credenciais reais.

## Variáveis Necessárias

### Configuração do Servidor
- `PORT`: Porta em que o servidor irá rodar (padrão: 3000)
- `NODE_ENV`: Ambiente de execução (`development`, `production`, `test`)
- `FRONTEND_URL`: URL do frontend para configuração do CORS (padrão: http://localhost:5173)

### Configuração JWT
- `JWT_SECRET`: Chave secreta para assinar e verificar tokens JWT
  - **IMPORTANTE**: Gere uma chave secreta segura e única
  - Você pode gerar uma usando: `openssl rand -base64 32`
  - Ou use um gerador online de chaves aleatórias

### Configuração Supabase
- `SUPABASE_URL`: URL do seu projeto Supabase
  - Formato: `https://seu-projeto.supabase.co`
  - Encontre no painel do Supabase: Settings > API > Project URL

- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key do Supabase
  - **ATENÇÃO**: Esta chave tem privilégios administrativos completos
  - Mantenha-a segura e nunca a exponha no frontend
  - Encontre no painel do Supabase: Settings > API > service_role key

- `SUPABASE_ANON_KEY`: Anon/Public Key do Supabase
  - Esta é a chave pública que pode ser usada no frontend
  - Encontre no painel do Supabase: Settings > API > anon public key

## Como Obter as Credenciais do Supabase

1. Acesse o painel do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie as seguintes informações:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Exemplo de Arquivo .env Completo

```env
# Configuração do Servidor
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Configuração JWT
JWT_SECRET=minha-chave-secreta-super-segura-gerada-aleatoriamente

# Configuração Supabase
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQxMjM0NTY3LCJleHAiOjE5NTY4MTA1Njd9.exemplo
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTIzNDU2NywiZXhwIjoxOTU2ODEwNTY3fQ.exemplo
```

## Segurança

⚠️ **IMPORTANTE**:
- Nunca commite o arquivo `.env` no Git (já está no `.gitignore`)
- Não compartilhe suas chaves secretas publicamente
- Use diferentes valores de `JWT_SECRET` para desenvolvimento e produção
- A `SUPABASE_SERVICE_ROLE_KEY` deve ser mantida em segredo absoluto

## Verificação

Após configurar o arquivo `.env`, você pode testar se está funcionando:

```bash
cd Backend
npm start
```

Se houver algum erro relacionado a variáveis de ambiente, verifique se todas as variáveis foram preenchidas corretamente.

