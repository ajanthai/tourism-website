const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

module.exports = async function (context, req) {
  context.res = {
    status: 200,
    body: {
      VITE_SUPABASE_URL: supabaseUrl || null,
      VITE_SUPABASE_ANON_KEY: supabaseAnonKey || null
    }
  };
};
