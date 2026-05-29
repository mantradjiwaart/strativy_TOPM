import { describe, expect, it } from 'vitest';
import { OPENROUTER_MODEL } from './openrouter';

describe('openrouter config', () => {
  it('uses gemma-4-26b-a4b-it free tier', () => {
    expect(OPENROUTER_MODEL).toBe('google/gemma-4-26b-a4b-it:free');
  });
});
