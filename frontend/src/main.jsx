import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";

import './index.css';
import App from './App.jsx';

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
