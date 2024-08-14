// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-quill'],
  },  server: {
    watch: {
      usePolling: true,
      interval: 100, // Check for changes every 100ms
    },
    hmr: {
      overlay: true, // Enable or disable the HMR error overlay
    },
  },
});
