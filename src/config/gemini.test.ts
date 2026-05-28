import { describe, expect, it } from 'vitest';
import { DEFAULT_GEMINI_MODEL, GEMINI_MODELS, resolveGeminiModel } from './gemini';

describe('gemini config', () => {
  it('exports the expected model list', () => {
    expect(GEMINI_MODELS).toEqual([
      'gemini-3-flash-preview',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ]);
  });

  it('defaults to first model when invalid', () => {
    expect(resolveGeminiModel('unknown')).toBe(DEFAULT_GEMINI_MODEL);
    expect(resolveGeminiModel('gemini-2.0-flash')).toBe('gemini-2.0-flash');
  });
});
