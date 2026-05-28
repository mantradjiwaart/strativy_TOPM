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

   Edit `.env` and set `MONEY_FLOW_GEMINI_API` to your Strativy API key (legacy name `GEMINI_API_KEY` also works).

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

> **Note:** GitHub Pages hosts the dashboard UI only. STRATIVY BRAIN requires the Express API (`npm run dev` or a Node host). For full features locally, run `npm run dev`.

**One-time repo setup:** In GitHub → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
