import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BoardAdvisorClient } from './BoardAdvisorClient';
import { BRAIN_SCENARIO_PROMPTS } from '../lib/brainStaticResponses';

vi.mock('../config/brainStatic', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../config/brainStatic')>();
  return { ...actual, BRAIN_STATIC_LOADING_MS: 0 };
});

describe('BoardAdvisorClient static mode', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_STRATIVY_BRAIN_STATIC', 'true');
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns static content without calling fetch or OpenRouter', async () => {
    const client = new BoardAdvisorClient();
    const text = await client.generate({
      prompt: BRAIN_SCENARIO_PROMPTS['custom-esg-reallocation'],
      systemPrompt: '',
    });

    expect(text).toContain('800M');
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('BoardAdvisorClient live mode', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_STRATIVY_BRAIN_STATIC', 'false');
    vi.stubEnv('VITE_OPENROUTER_API_KEY', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('attempts server route when static mode is disabled and no client key', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      text: async () => JSON.stringify({ text: 'Live response' }),
    });
    vi.stubGlobal('fetch', mockFetch);

    const client = new BoardAdvisorClient();
    const text = await client.generate({ prompt: 'test', systemPrompt: 'ctx' });

    expect(text).toBe('Live response');
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/openrouter/generate',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});
