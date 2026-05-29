import { OPENROUTER_MODEL } from '../src/config/openrouter';
import { OpenRouterGateway } from './OpenRouterGateway';

const DEFAULT_SYSTEM_INSTRUCTION =
  'You are STRATIVY BRAIN, the elite Strativy boardroom intelligence advisor assisting the Chairman.';

export class OpenRouterAdvisorService {
  private readonly temperature = 0.7;

  constructor(private readonly gateway: OpenRouterGateway) {}

  async advise(prompt: string, systemPrompt?: string): Promise<string> {
    if (!prompt?.trim()) {
      throw new Error('Prompt is required');
    }

    return this.gateway.generateContent({
      prompt: prompt.trim(),
      systemPrompt: systemPrompt?.trim() || DEFAULT_SYSTEM_INSTRUCTION,
      model: OPENROUTER_MODEL,
      temperature: this.temperature,
    });
  }
}
