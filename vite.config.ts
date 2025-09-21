import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // 👈 change output directory to "build"
    emptyOutDir: true, // also necessary
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      '@': path.resolve(__dirname, './src'), // you can use @ or anything else
    },
  },
  server: {
    port: 3000,
  },
});