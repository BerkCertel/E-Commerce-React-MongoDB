import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// import.meta.url ile dizin çözümleme
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/scss'),
    },
  },
});
