import { OPENROUTER_MODEL } from '../config/openrouter';
import { BRAIN_USER_MESSAGES } from '../lib/brainUserMessages';
import { openRouterCompleteWithFallback } from '../lib/openRouterChat';
import type { BoardAdvisorRequest } from './BoardAdvisorClient';

const DEFAULT_SYSTEM_INSTRUCTION =
  'You are STRATIVY BRAIN, the elite Strativy boardroom intelligence advisor assisting the Chairman.';

export class DirectStrativyBrainClient {
  constructor(private readonly apiKey: string) {}

  async generate(request: BoardAdvisorRequest): Promise<string> {
    try {
      return await openRouterCompleteWithFallback(this.apiKey, {
        prompt: request.prompt,
        systemPrompt: request.systemPrompt?.trim() || DEFAULT_SYSTEM_INSTRUCTION,
        model: OPENROUTER_MODEL,
        temperature: 0.7,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('empty response')) {
        throw new Error(BRAIN_USER_MESSAGES.empty);
      }
      throw error;
    }
  }
}
