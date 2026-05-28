import { describe, expect, it } from 'vitest';
import { toGeminiApiError } from './GeminiApiError';

describe('toGeminiApiError', () => {
  it('maps quota errors to 429 with retry hint', () => {
    const err = toGeminiApiError(
      new Error(
        '{"error":{"code":429,"message":"quota exceeded Please retry in 33.223200457s","status":"RESOURCE_EXHAUSTED"}}'
      )
    );

    expect(err.statusCode).toBe(429);
    expect(err.retryAfterMs).toBeGreaterThanOrEqual(33000);
    expect(err.message).toContain('busy');
    expect(err.message).toMatch(/wait about \d+ seconds/);
  });

  it('maps quota limit errors to user-friendly busy message', () => {
    const err = toGeminiApiError(
      new Error('limit: 0, model: gemini-2.0-flash quota exceeded 429')
    );

    expect(err.message).toContain('busy');
  });
});
