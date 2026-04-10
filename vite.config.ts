import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { securityHeaders } from './vite-plugin-security-headers';

export default defineConfig({
  plugins: [react(), securityHeaders()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  }
});
