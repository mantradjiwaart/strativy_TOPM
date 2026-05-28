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

  const geminiApiKey = env.GEMINI_API_KEY || env.MONEY_FLOW_GEMINI_API || '';
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
    define: injectClientKey
      ? {
          'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        }
      : undefined,
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
