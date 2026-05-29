import { describe, expect, it } from 'vitest';
import { toOpenRouterApiError } from './OpenRouterApiError';

describe('toOpenRouterApiError', () => {
  it('maps quota errors to 429 with retry hint', () => {
    const err = toOpenRouterApiError(
      new Error(
        '{"status":429,"message":"rate limit exceeded Please retry in 33.223200457s"}'
      )
    );

    expect(err.statusCode).toBe(429);
    expect(err.retryAfterMs).toBeGreaterThanOrEqual(33000);
    expect(err.message).toContain('busy');
    expect(err.message).toMatch(/wait about \d+ seconds/);
  });

  it('maps auth errors to 401 with friendly message', () => {
    const err = toOpenRouterApiError(
      new Error('{"status":401,"message":"Invalid API key"}')
    );

    expect(err.statusCode).toBe(401);
    expect(err.message).toContain('authenticate');
  });
});
