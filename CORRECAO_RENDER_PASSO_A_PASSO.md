# 🔧 CORREÇÃO PASSO A PASSO - Erro Root Directory no Render

## ❌ Erro Atual
```
Service Root Directory "/opt/render/project/src/Beckend" is missing.
builder.sh: line 51: cd: /opt/render/project/src/Beckend: No such file or directory
```

## ✅ SOLUÇÃO DEFINITIVA

### Passo 1: Acessar o Painel do Render
1. Abra: https://dashboard.render.com
2. Faça login na sua conta

### Passo 2: Localizar o Serviço Backend
1. No Dashboard, procure pelo serviço chamado **hotel-mavi-backend**
2. Clique no nome do serviço para abrir

### Passo 3: Acessar as Configurações
1. No menu lateral esquerdo, clique em **Settings** (ou **Configurações**)
2. Role a página para baixo até encontrar a seção **Build & Deploy**

### Passo 4: Corrigir o Root Directory
1. Procure pelo campo **Root Directory** (pode estar escrito como "Root Directory" ou "Diretório Raiz")
2. Você verá algo como: `src/Beckend` ou `/opt/render/project/src/Beckend`
3. **APAGUE** todo o conteúdo desse campo
4. Digite exatamente: `Backend` (com B maiúsculo e "a" - não "e")
5. **NÃO** coloque barra no início ou fim
6. **NÃO** coloque "src/" antes
7. Apenas: `Backend`

### Passo 5: Salvar as Alterações
1. Role até o final da página
2. Clique no botão **Save Changes** (ou **Salvar Alterações**)
3. Aguarde a confirmação de que foi salvo

### Passo 6: Fazer Novo Deploy
1. No menu lateral, clique em **Manual Deploy** (ou **Deploy Manual**)
2. Selecione **Deploy latest commit** (ou **Fazer deploy do último commit**)
3. Clique em **Deploy**
4. Aguarde o build iniciar

### Passo 7: Verificar os Logs
1. Clique em **Logs** no menu lateral
2. Procure por mensagens como:
   - ✅ `cd Backend` (correto)
   - ❌ `cd src/Beckend` (errado - se aparecer, volte ao Passo 4)

## 🔍 Verificação Visual

### ❌ ERRADO (causa o erro):
```
Root Directory: src/Beckend
Root Directory: /opt/render/project/src/Beckend
Root Directory: Beckend
Root Directory: backend
Root Directory: src/backend
```

### ✅ CORRETO (resolve o problema):
```
Root Directory: Backend
```

## 📋 Checklist

Antes de fazer deploy, verifique:
- [ ] Root Directory está exatamente como: `Backend` (sem aspas)
- [ ] Não tem "src/" antes
- [ ] Não tem barra no início ou fim
- [ ] Está com B maiúsculo e "a" (não "e")
- [ ] Salvou as alterações
- [ ] Fez um novo deploy

## 🚨 Se Ainda Não Funcionar

### Opção A: Deletar e Recriar (Recomendado)

1. **Backup das variáveis de ambiente**:
   - Anote TODAS as variáveis de ambiente do serviço
   - Vá em Settings > Environment Variables
   - Copie cada variável (nome e valor)

2. **Deletar o serviço**:
   - Settings > Danger Zone > Delete Service
   - Confirme a exclusão

3. **Criar via Blueprint**:
   - Dashboard > New > Blueprint
   - Conecte: `https://github.com/mavi3006/Hotel-Mavi`
   - O Render detectará o `render.yaml` automaticamente
   - Isso criará os serviços com as configurações corretas

4. **Restaurar variáveis de ambiente**:
   - Vá em cada serviço criado
   - Settings > Environment Variables
   - Adicione todas as variáveis que você anotou

### Opção B: Verificar Outros Campos

Se o Root Directory está correto mas ainda dá erro, verifique:

1. **Build Command**: Deve ser `npm install` (não precisa de `cd Backend`)
2. **Start Command**: Deve ser `npm start` (não precisa de `cd Backend`)
3. **Environment**: Deve ser `Node`

## 📞 Ainda com Problemas?

Se após seguir todos os passos o erro persistir:

1. Verifique se o diretório `Backend/` existe no repositório GitHub
2. Verifique se há commits recentes no repositório
3. Tente fazer um commit vazio para forçar novo deploy:
   ```bash
   git commit --allow-empty -m "Force redeploy"
   git push
   ```

## 🎯 Resumo Rápido

**O problema**: Root Directory está como `src/Beckend`  
**A solução**: Mudar para `Backend` (apenas isso, sem mais nada)  
**Onde**: Settings > Build & Deploy > Root Directory

