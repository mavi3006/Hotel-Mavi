const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Variáveis de ambiente obrigatórias
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Validação das variáveis
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_ANON_KEY) {
  throw new Error('Variáveis de ambiente obrigatórias: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY');
}

// Cliente Supabase para operações administrativas (service role)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Cliente Supabase para operações do usuário (anon key)
const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

// Testar conexão com Supabase
async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 = tabela vazia (ok)
      console.warn('⚠️  Aviso na conexão com Supabase:', error.message);
    } else {
      console.log('✅ Conexão com Supabase estabelecida com sucesso');
    }
  } catch (error) {
    console.error('❌ Erro ao testar conexão com Supabase:', error.message);
  }
}

// Testar conexão ao carregar o módulo
testConnection();

module.exports = {
  supabase,
  supabaseAnon
};
