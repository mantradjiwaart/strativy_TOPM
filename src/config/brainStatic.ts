/**
 * When true, STRATIVY BRAIN returns curated static insights — no OpenRouter calls.
 * Defaults to true so demos and GitHub Pages never hit rate limits or timeouts.
 */
export function isStrativyBrainStaticMode(): boolean {
  const raw = import.meta.env.VITE_STRATIVY_BRAIN_STATIC;
  if (raw === undefined || raw === '') return true;
  return raw === 'true' || raw === '1';
}

/** Simulated delay (ms) before static content appears — mimics brief analysis. */
export const BRAIN_STATIC_LOADING_MS = 1000;
