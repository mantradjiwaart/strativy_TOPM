import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL } from '../config/gemini';
import { BRAIN_USER_MESSAGES } from '../lib/brainUserMessages';
import type { BoardAdvisorRequest } from './BoardAdvisorClient';

const DEFAULT_SYSTEM_INSTRUCTION =
  'You are STRATIVY BRAIN, the elite Strativy boardroom intelligence advisor assisting the Chairman.';

export class DirectStrativyBrainClient {
  constructor(private readonly apiKey: string) {}

  async generate(request: BoardAdvisorRequest): Promise<string> {
    const client = new GoogleGenAI({ apiKey: this.apiKey });

    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: request.prompt,
      config: {
        systemInstruction: request.systemPrompt?.trim() || DEFAULT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error(BRAIN_USER_MESSAGES.empty);
    }

    return text;
  }
}
