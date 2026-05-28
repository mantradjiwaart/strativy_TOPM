# strativy_TOPM

Strativy Boardroom Core — holding-company ecosystem pulse, simulation, and STRATIVY BRAIN board advisor.

## Prerequisites

- Node.js 22+

## Run locally

Run all commands from this directory (`strativy-boardroom-core`), or from the parent `money-flow` folder using `npm run dev` (delegates here).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template and set your Strativy Brain API key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `GEMINI_API_KEY` to your Strativy API key.

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and use the **STRATIVY BRAIN** tab to verify connectivity.

### Quota / 429 errors

If you see `RESOURCE_EXHAUSTED` or `limit: 0` for a model, your API quota may be exhausted. Try:

1. Wait for the retry window (the app auto-retries using the API’s `retry in Ns` hint)
2. Check your API usage dashboard or enable billing on your Strativy API provider account

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Express + Vite dev server |
| `npm run build` | Production client + server bundle |
| `npm start` | Run production build (`NODE_ENV=production`) |
| `npm run lint` | TypeScript check |
| `npm test` | Vitest unit tests |

## CI & GitHub Pages

Pushes to `main` run lint, test, build, and deploy the static app to **GitHub Pages** via [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml).

**Live site:** https://mantradjiwaart.github.io/strativy_TOPM/

> **GitHub Pages + STRATIVY BRAIN:** Add a repository secret named `GEMINI_API_KEY` (Settings → Secrets → Actions), then push to `main` to rebuild. The key is embedded in the static build — use a restricted key and avoid public repos for production secrets.

> **Local dev:** Run `npm run dev` — the API key stays on the server via `.env` (`GEMINI_API_KEY`).

**One-time repo setup:** In GitHub → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
