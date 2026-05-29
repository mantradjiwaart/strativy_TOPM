import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('dotenv', () => ({
  default: { config: vi.fn() },
}));

import { ConfigService } from './ConfigService';

const PRIMARY_KEY = 'OPENROUTER_API_KEY';

describe('ConfigService', () => {
  const originalPrimary = process.env[PRIMARY_KEY];

  afterEach(() => {
    if (originalPrimary === undefined) {
      delete process.env[PRIMARY_KEY];
    } else {
      process.env[PRIMARY_KEY] = originalPrimary;
    }
  });

  it('throws when env key is missing', () => {
    delete process.env[PRIMARY_KEY];
    const config = new ConfigService();
    expect(() => config.getOpenRouterApiKey()).toThrow(/OPENROUTER_API_KEY/);
  });

  it('returns trimmed API key from OPENROUTER_API_KEY', () => {
    process.env[PRIMARY_KEY] = '  test-key-value  ';
    const config = new ConfigService();
    expect(config.getOpenRouterApiKey()).toBe('test-key-value');
  });
});
