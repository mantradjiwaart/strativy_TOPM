import { GoogleGenAI } from '@google/genai';

const MAX_ATTEMPTS = 3;
const INITIAL_BACKOFF_MS = 500;

function isRetryableError(error: unknown): boolean {
  if (!(error instanceof Error)) return true;
  const msg = error.message.toLowerCase();
  if (msg.includes('429') || msg.includes('rate') || msg.includes('quota')) return true;
  if (msg.includes('500') || msg.includes('502') || msg.includes('503') || msg.includes('504'))
    return true;
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('timeout')) return true;
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface GenerateContentParams {
  prompt: string;
  systemPrompt: string;
  model: string;
  temperature: number;
}

export class GeminiGateway {
  private readonly client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'strativy-boardroom-core',
        },
      },
    });
  }

  async generateContent(params: GenerateContentParams): Promise<string> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const response = await this.client.models.generateContent({
          model: params.model,
          contents: params.prompt,
          config: {
            systemInstruction: params.systemPrompt,
            temperature: params.temperature,
          },
        });

        const text = response.text;
        if (!text) {
          throw new Error('Gemini returned an empty response');
        }
        return text;
      } catch (error) {
        lastError = error;
        if (attempt >= MAX_ATTEMPTS || !isRetryableError(error)) {
          break;
        }
        await delay(INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1));
      }
    }

    if (lastError instanceof Error) {
      throw lastError;
    }
    throw new Error('Gemini request failed after retries');
  }
}
