import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('dotenv', () => ({
  default: { config: vi.fn() },
}));

import { ConfigService } from './ConfigService';

const ENV_KEY = 'MONEY_FLOW_GEMINI_API';

describe('ConfigService', () => {
  const original = process.env[ENV_KEY];

  afterEach(() => {
    if (original === undefined) {
      delete process.env[ENV_KEY];
    } else {
      process.env[ENV_KEY] = original;
    }
  });

  it('throws when MONEY_FLOW_GEMINI_API is missing', () => {
    delete process.env[ENV_KEY];
    const config = new ConfigService();
    expect(() => config.getGeminiApiKey()).toThrow(/MONEY_FLOW_GEMINI_API/);
  });

  it('returns trimmed API key when set', () => {
    process.env[ENV_KEY] = '  test-key-value  ';
    const config = new ConfigService();
    expect(config.getGeminiApiKey()).toBe('test-key-value');
  });
});
