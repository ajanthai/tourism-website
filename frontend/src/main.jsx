import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";

import './index.css';
import App from './App.jsx';

console.log("🟢 PROD CHECK — SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log(
  "🟢 PROD CHECK — SUPABASE KEY:",
  import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 10)
);


Sentry.init({
  dsn: "https://4c4f5ebac829ae23a553e25d459205fa@o1106855.ingest.us.sentry.io/4510605031768064",
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
