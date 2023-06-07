import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve as pathResolve } from 'path';

const resolve = (path: string) => pathResolve(__dirname, path);
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  base: '/currency-exchange/',
});
