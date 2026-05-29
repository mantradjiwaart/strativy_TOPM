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

2. Copy environment template and set your OpenRouter API key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `OPENROUTER_API_KEY` to your [OpenRouter](https://openrouter.ai/) key. STRATIVY BRAIN uses model `google/gemma-4-26b-a4b-it:free` via the OpenAI SDK pointed at OpenRouter.

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) and use the **STRATIVY BRAIN** tab to verify connectivity.

### Quota / 429 errors

If STRATIVY BRAIN reports it is busy or rate-limited:

1. Wait for the retry window (the server auto-retries with backoff)
2. Check usage on your [OpenRouter dashboard](https://openrouter.ai/activity)

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

> **GitHub Pages + STRATIVY BRAIN:** Add a repository secret named `OPENROUTER_API_KEY` (Settings → Secrets and variables → Actions), then push to `main` to rebuild. The key is embedded in the static build via `VITE_OPENROUTER_API_KEY` — use a restricted key and avoid public repos for production secrets.

> **Local dev:** Run `npm run dev` — the API key stays on the server via `.env` (`OPENROUTER_API_KEY`). No client-side key is required for local development.

> **Gemini:** Previous `GEMINI_API_KEY` / `VITE_GEMINI_API_KEY` variables are deprecated and no longer used.

**One-time repo setup:** In GitHub → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
