import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('dotenv', () => ({
  default: { config: vi.fn() },
}));

import { ConfigService } from './ConfigService';

const PRIMARY_KEY = 'GEMINI_API_KEY';
const LEGACY_KEY = 'MONEY_FLOW_GEMINI_API';

describe('ConfigService', () => {
  const originalPrimary = process.env[PRIMARY_KEY];
  const originalLegacy = process.env[LEGACY_KEY];

  afterEach(() => {
    if (originalPrimary === undefined) {
      delete process.env[PRIMARY_KEY];
    } else {
      process.env[PRIMARY_KEY] = originalPrimary;
    }
    if (originalLegacy === undefined) {
      delete process.env[LEGACY_KEY];
    } else {
      process.env[LEGACY_KEY] = originalLegacy;
    }
  });

  it('throws when both env keys are missing', () => {
    delete process.env[PRIMARY_KEY];
    delete process.env[LEGACY_KEY];
    const config = new ConfigService();
    expect(() => config.getGeminiApiKey()).toThrow(/GEMINI_API_KEY/);
  });

  it('returns trimmed API key from GEMINI_API_KEY', () => {
    delete process.env[LEGACY_KEY];
    process.env[PRIMARY_KEY] = '  test-key-value  ';
    const config = new ConfigService();
    expect(config.getGeminiApiKey()).toBe('test-key-value');
  });

  it('falls back to legacy MONEY_FLOW_GEMINI_API', () => {
    delete process.env[PRIMARY_KEY];
    process.env[LEGACY_KEY] = 'legacy-key';
    const config = new ConfigService();
    expect(config.getGeminiApiKey()).toBe('legacy-key');
  });
});
