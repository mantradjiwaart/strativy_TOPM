import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

/** GitHub Pages project site: https://<user>.github.io/<repo>/ */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base =
    env.VITE_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === 'true' ? '/strativy_TOPM/' : '/');

  const openRouterApiKey = env.OPENROUTER_API_KEY || '';
  const injectClientKey = mode === 'production' || process.env.GITHUB_ACTIONS === 'true';

  return {
    base,
    root: __dirname,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    optimizeDeps: {
      include: ['@openrouter/sdk'],
    },
    define: injectClientKey
      ? {
          'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(openRouterApiKey),
        }
      : undefined,
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
