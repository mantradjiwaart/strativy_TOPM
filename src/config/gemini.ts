/** Supported Gemini models — single source for client UI and server validation. */
export const GEMINI_MODELS = [
  'gemini-3-flash-preview',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
] as const;

export type GeminiModelId = (typeof GEMINI_MODELS)[number];

export const DEFAULT_GEMINI_MODEL: GeminiModelId = GEMINI_MODELS[0];

export function isAllowedGeminiModel(model: string): model is GeminiModelId {
  return (GEMINI_MODELS as readonly string[]).includes(model);
}

export function resolveGeminiModel(model?: string): GeminiModelId {
  if (model && isAllowedGeminiModel(model)) {
    return model;
  }
  return DEFAULT_GEMINI_MODEL;
}
