import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('dotenv', () => ({
  default: { config: vi.fn() },
}));

import { ConfigService } from './ConfigService';

const PRIMARY_KEY = 'MONEY_FLOW_GEMINI_API';
const LEGACY_KEY = 'GEMINI_API_KEY';

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
    expect(() => config.getGeminiApiKey()).toThrow(/MONEY_FLOW_GEMINI_API/);
  });

  it('returns trimmed API key from MONEY_FLOW_GEMINI_API', () => {
    delete process.env[LEGACY_KEY];
    process.env[PRIMARY_KEY] = '  test-key-value  ';
    const config = new ConfigService();
    expect(config.getGeminiApiKey()).toBe('test-key-value');
  });

  it('falls back to legacy GEMINI_API_KEY', () => {
    delete process.env[PRIMARY_KEY];
    process.env[LEGACY_KEY] = 'legacy-key';
    const config = new ConfigService();
    expect(config.getGeminiApiKey()).toBe('legacy-key');
  });
});
