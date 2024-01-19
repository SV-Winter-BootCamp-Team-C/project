import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgrPlugin()],
  server: {
    port: 3001,
    host: true,
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
