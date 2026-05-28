import { resolveGeminiModel } from '../src/config/gemini';
import { GeminiGateway } from './GeminiGateway';

const DEFAULT_SYSTEM_INSTRUCTION =
  'You are the Strativy Strategic AI Agent, an elite boardroom advisor assisting the Chairman.';

export class GeminiAdvisorService {
  private readonly temperature = 0.7;

  constructor(private readonly gateway: GeminiGateway) {}

  async advise(
    prompt: string,
    systemPrompt?: string,
    model?: string
  ): Promise<string> {
    if (!prompt?.trim()) {
      throw new Error('Prompt is required');
    }

    return this.gateway.generateContent({
      prompt: prompt.trim(),
      systemPrompt: systemPrompt?.trim() || DEFAULT_SYSTEM_INSTRUCTION,
      model: resolveGeminiModel(model),
      temperature: this.temperature,
    });
  }
}
