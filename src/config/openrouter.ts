/** OpenRouter model for STRATIVY BRAIN (see https://openrouter.ai/models). */
export const OPENROUTER_MODEL = 'liquid/lfm-2.5-1.2b-instruct:free';

/**
 * Free-tier fallbacks when the primary model is upstream rate-limited (429).
 * Order matters: prefer similar capability before generic routers.
 */
export const OPENROUTER_FALLBACK_MODELS = [
  'google/gemma-4-26b-a4b-it:free',
  'google/gemma-4-31b-it:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'moonshotai/kimi-k2.6:free',
  'openrouter/free',
] as const;

/** Primary model followed by unique fallbacks. */
export function getOpenRouterModelsToTry(primaryModel: string = OPENROUTER_MODEL): string[] {
  const seen = new Set<string>();
  const models: string[] = [];

  for (const model of [primaryModel, ...OPENROUTER_FALLBACK_MODELS]) {
    if (!seen.has(model)) {
      seen.add(model);
      models.push(model);
    }
  }

  return models;
}
