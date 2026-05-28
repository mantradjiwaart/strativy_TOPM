import { GoogleGenAI } from '@google/genai';
import { GeminiApiError, toGeminiApiError } from './GeminiApiError';

const MAX_ATTEMPTS = 4;
const INITIAL_BACKOFF_MS = 500;
const MAX_RETRY_WAIT_MS = 60_000;

function isRetryableError(error: unknown): boolean {
  if (error instanceof GeminiApiError) {
    return error.statusCode === 429 || error.statusCode >= 500;
  }
  if (!(error instanceof Error)) return true;
  const msg = error.message.toLowerCase();
  if (msg.includes('429') || msg.includes('rate') || msg.includes('quota')) return true;
  if (msg.includes('500') || msg.includes('502') || msg.includes('503') || msg.includes('504'))
    return true;
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('timeout')) return true;
  return false;
}

function getRetryDelayMs(error: unknown, attempt: number): number {
  if (error instanceof GeminiApiError && error.retryAfterMs) {
    return Math.min(error.retryAfterMs, MAX_RETRY_WAIT_MS);
  }
  return INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1);
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
        lastError = toGeminiApiError(error);
        if (attempt >= MAX_ATTEMPTS || !isRetryableError(lastError)) {
          break;
        }
        await delay(getRetryDelayMs(lastError, attempt));
      }
    }

    throw lastError instanceof GeminiApiError
      ? lastError
      : toGeminiApiError(lastError);
  }
}
