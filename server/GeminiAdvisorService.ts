import { GeminiGateway } from './GeminiGateway';

const DEFAULT_SYSTEM_INSTRUCTION =
  'You are the Strativy Strategic AI Agent, an elite boardroom advisor assisting the Chairman.';

export class GeminiAdvisorService {
  private readonly model = 'gemini-2.0-flash';
  private readonly temperature = 0.7;

  constructor(private readonly gateway: GeminiGateway) {}

  async advise(prompt: string, systemPrompt?: string): Promise<string> {
    if (!prompt?.trim()) {
      throw new Error('Prompt is required');
    }

    return this.gateway.generateContent({
      prompt: prompt.trim(),
      systemPrompt: systemPrompt?.trim() || DEFAULT_SYSTEM_INSTRUCTION,
      model: this.model,
      temperature: this.temperature,
    });
  }
}
