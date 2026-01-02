module.exports = async function (context, req) {
  // Read values from environment (set these in Azure Static Web App > Configuration)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

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
