import { describe, expect, it } from 'vitest';
import {
  getOpenRouterModelsToTry,
  OPENROUTER_FALLBACK_MODELS,
  OPENROUTER_MODEL,
} from './openrouter';

describe('openrouter config', () => {
  it('uses gemma-4-26b-a4b-it free tier as primary', () => {
    expect(OPENROUTER_MODEL).toBe('google/gemma-4-26b-a4b-it:free');
  });

  it('includes free-tier fallbacks for upstream rate limits', () => {
    expect(OPENROUTER_FALLBACK_MODELS.length).toBeGreaterThan(0);
    expect(OPENROUTER_FALLBACK_MODELS).toContain('openrouter/free');
  });

  it('deduplicates primary and fallback models', () => {
    const models = getOpenRouterModelsToTry(OPENROUTER_MODEL);
    expect(models[0]).toBe(OPENROUTER_MODEL);
    expect(new Set(models).size).toBe(models.length);
  });
});
