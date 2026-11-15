import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  cacheDir: 'node_modules/.vite-android',
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react(), tailwindcss()],
  define: { 'import.meta.env.VITE_ANDROID_BUILD': 'true' },
  resolve: {
    alias: [
      { find: '@/lib/beats.functions', replacement: fileURLToPath(new URL('./src/lib/beats.native.ts', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  build: { outDir: 'dist', emptyOutDir: true },
});