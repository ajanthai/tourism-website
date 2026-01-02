import { createClient } from '@supabase/supabase-js';

// Try to read build-time Vite vars first. If they're not present (deployed bundle
// built without them), fall back to fetching runtime values from an API route
// that reads Azure Static Web App configuration.
let _supabase = null;

const buildUrl = import.meta.env.VITE_SUPABASE_URL;
const buildKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function fetchRuntimeConfig() {
  try {
    const res = await fetch('/api/runtime-config');
    if (!res.ok) return {};
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch runtime config', err);
    return {};
  }
}

async function initSupabase() {
  let url = buildUrl;
  let key = buildKey;

  if (!url || !key) {
    const runtime = await fetchRuntimeConfig();
    url = runtime?.VITE_SUPABASE_URL || runtime?.supabaseUrl || url;
    key = runtime?.VITE_SUPABASE_ANON_KEY || runtime?.supabaseAnonKey || key;
  }

  if (!url || !key) {
    console.error('Missing Supabase configuration (build-time and runtime)');
    return null;
  }

  _supabase = createClient(url, key);
  return _supabase;
}

// Start initialization immediately; components can await `supabaseReady`.
export const supabaseReady = initSupabase();

export function getSupabase() {
  if (!_supabase) {
    throw new Error('Supabase not initialized yet; await supabaseReady');
  }
  return _supabase;
}

// Backwards-compatible named export for callers that used `import { supabase }`.
// It will be undefined until initialization completes. Prefer using `supabaseReady`.
export const supabase = _supabase;
