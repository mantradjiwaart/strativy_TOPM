import { describe, expect, it } from 'vitest';
import { GEMINI_MODEL } from './gemini';

describe('gemini config', () => {
  it('uses gemini-2.5-flash', () => {
    expect(GEMINI_MODEL).toBe('gemini-2.5-flash');
  });
});
