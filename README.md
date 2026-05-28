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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Express + Vite dev server |
| `npm run build` | Production client + server bundle |
| `npm start` | Run production build (`NODE_ENV=production`) |
| `npm run lint` | TypeScript check |
| `npm test` | Vitest unit tests |

## CI

Pushes to `main` run lint, test, and build via [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml).
