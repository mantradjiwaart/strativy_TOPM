import { describe, expect, it, vi } from 'vitest';
import { OPENROUTER_MODEL } from '../src/config/openrouter';
import { OpenRouterAdvisorService } from './OpenRouterAdvisorService';
import type { OpenRouterGateway } from './OpenRouterGateway';

describe('OpenRouterAdvisorService', () => {
  it('rejects empty prompt', async () => {
    const gateway = {
      generateContent: vi.fn(),
    } as unknown as OpenRouterGateway;
    const service = new OpenRouterAdvisorService(gateway);

    await expect(service.advise('')).rejects.toThrow(/Prompt is required/);
  });

  it('delegates to gateway with fixed model', async () => {
    const generateContent = vi.fn().mockResolvedValue('Strategic advice');
    const gateway = { generateContent } as unknown as OpenRouterGateway;
    const service = new OpenRouterAdvisorService(gateway);

    const result = await service.advise('Analyze capex', undefined);

    expect(result).toBe('Strategic advice');
    expect(generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: 'Analyze capex',
        systemPrompt: expect.stringContaining('STRATIVY BRAIN'),
        model: OPENROUTER_MODEL,
        temperature: 0.7,
      })
    );
  });

  it('uses custom system prompt when provided', async () => {
    const generateContent = vi.fn().mockResolvedValue('ok');
    const gateway = { generateContent } as unknown as OpenRouterGateway;
    const service = new OpenRouterAdvisorService(gateway);

    await service.advise('query', 'Custom board context');

    expect(generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        systemPrompt: 'Custom board context',
        model: OPENROUTER_MODEL,
      })
    );
  });
});
