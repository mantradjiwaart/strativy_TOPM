# strativy_TOPM

Strativy Boardroom Core — holding-company ecosystem pulse, simulation, and Gemini-powered board AI advisor.

## Prerequisites

- Node.js 22+

## Run locally

Run all commands from this directory (`strativy-boardroom-core`), or from the parent `money-flow` folder using `npm run dev` (delegates here).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template and set your Gemini key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `MONEY_FLOW_GEMINI_API` to your [Google AI Studio](https://aistudio.google.com/apikey) API key.

   > **Note:** Older setups used `GEMINI_API_KEY`; this project uses `MONEY_FLOW_GEMINI_API` only.

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and use the **AI Advisor** tab to verify Gemini connectivity.

### Quota / 429 errors

If you see `RESOURCE_EXHAUSTED` or `limit: 0` for a model, your free-tier quota for that model is exhausted or disabled. Try:

1. Wait for the retry window (the app auto-retries using the API’s `retry in Ns` hint)
3. Check usage at [ai.dev/rate-limit](https://ai.dev/rate-limit) or enable billing in [Google AI Studio](https://aistudio.google.com/)

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

> **Note:** GitHub Pages hosts the dashboard UI only. The Gemini AI Advisor requires the Express API (`npm run dev` or a Node host). For full features locally, run `npm run dev`.

**One-time repo setup:** In GitHub → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
