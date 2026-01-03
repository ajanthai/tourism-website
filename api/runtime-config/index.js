const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

module.exports = async function (context, req) {
  // Read values from environment (set these in Azure Static Web App > Configuration)
  const supabaseUrl = supabaseUrl;
  const supabaseAnonKey = supabaseAnonKey;

  context.log('runtime-config requested');

  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      VITE_SUPABASE_URL: supabaseUrl || null,
      VITE_SUPABASE_ANON_KEY: supabaseAnonKey || null
    }
  };
};
