import { describe, expect, it, vi } from 'vitest';
import { GeminiAdvisorService } from './GeminiAdvisorService';
import type { GeminiGateway } from './GeminiGateway';

describe('GeminiAdvisorService', () => {
  it('rejects empty prompt', async () => {
    const gateway = {
      generateContent: vi.fn(),
    } as unknown as GeminiGateway;
    const service = new GeminiAdvisorService(gateway);

    await expect(service.advise('')).rejects.toThrow(/Prompt is required/);
  });

  it('delegates to gateway with default system instruction and model', async () => {
    const generateContent = vi.fn().mockResolvedValue('Strategic advice');
    const gateway = { generateContent } as unknown as GeminiGateway;
    const service = new GeminiAdvisorService(gateway);

    const result = await service.advise('Analyze capex', undefined, 'gemini-2.0-flash');

    expect(result).toBe('Strategic advice');
    expect(generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: 'Analyze capex',
        systemPrompt: expect.stringContaining('Strativy Strategic AI Agent'),
        model: 'gemini-2.0-flash',
        temperature: 0.7,
      })
    );
  });

  it('falls back to default model when request model is invalid', async () => {
    const generateContent = vi.fn().mockResolvedValue('ok');
    const gateway = { generateContent } as unknown as GeminiGateway;
    const service = new GeminiAdvisorService(gateway);

    await service.advise('query', undefined, 'not-a-real-model');

    expect(generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-3-flash-preview',
      })
    );
  });

  it('uses custom system prompt when provided', async () => {
    const generateContent = vi.fn().mockResolvedValue('ok');
    const gateway = { generateContent } as unknown as GeminiGateway;
    const service = new GeminiAdvisorService(gateway);

    await service.advise('query', 'Custom board context', 'gemini-1.5-flash');

    expect(generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        systemPrompt: 'Custom board context',
        model: 'gemini-1.5-flash',
      })
    );
  });
});
