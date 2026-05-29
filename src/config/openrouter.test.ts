import { describe, expect, it } from 'vitest';
import { OPENROUTER_MODEL } from './openrouter';

describe('openrouter config', () => {
  it('uses deepseek-v4-flash free tier', () => {
    expect(OPENROUTER_MODEL).toBe('deepseek/deepseek-v4-flash:free');
  });
});
