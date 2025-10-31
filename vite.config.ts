import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: isDev
      ? {
          https: {
            key: fs.readFileSync('./cert/localhost-key.pem'),
            cert: fs.readFileSync('./cert/localhost-cert.pem'),
          },
          port: 5173,
        }
      : undefined,
  };
});
