import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      input: ['index.html', '404.html'],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          markdown: [
            'react-markdown',
            'remark-gfm',
            'remark-math',
            'rehype-katex',
            'rehype-raw',
            'rehype-slug',
            'katex',
          ],
        },
      },
    },
  },
});
