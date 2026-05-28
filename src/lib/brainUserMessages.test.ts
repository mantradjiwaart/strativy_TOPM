import { describe, expect, it } from 'vitest';
import { toUserFacingBrainError } from './brainUserMessages';

describe('toUserFacingBrainError', () => {
  it('hides technical API key messages', () => {
    const msg = toUserFacingBrainError(
      new Error('STRATIVY BRAIN needs GEMINI_API_KEY in .env and GitHub secret')
    );
    expect(msg).not.toContain('GEMINI');
    expect(msg).not.toContain('.env');
    expect(msg).toContain('not available');
  });

  it('passes through friendly server messages', () => {
    const msg = toUserFacingBrainError(
      new Error('STRATIVY BRAIN is temporarily unavailable. Please try again.')
    );
    expect(msg).toContain('temporarily unavailable');
  });
});
