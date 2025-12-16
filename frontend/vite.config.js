import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://agreeable-grass-0cc742210.3.azurestaticapps.net',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
