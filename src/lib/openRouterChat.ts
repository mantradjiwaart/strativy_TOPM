import { OpenRouter } from '@openrouter/sdk';
import { OpenRouterError } from '@openrouter/sdk/models/errors';
import { getOpenRouterModelsToTry } from '../config/openrouter';

export interface OpenRouterChatParams {
  prompt: string;
  systemPrompt: string;
  model: string;
  temperature: number;
}

const OPENROUTER_REFERER = 'https://strativy-boardroom-core';
const OPENROUTER_TITLE = 'STRATIVY BRAIN';

function createOpenRouterClient(apiKey: string): OpenRouter {
  return new OpenRouter({
    apiKey,
    httpReferer: OPENROUTER_REFERER,
    appTitle: OPENROUTER_TITLE,
  });
}

function throwStructuredApiError(
  status: number,
  message: string,
  code?: number | string | null
): never {
  throw new Error(
    JSON.stringify({
      status,
      code: code ?? status,
      message: message || `OpenRouter request failed (${status})`,
    })
  );
}

function mapOpenRouterError(error: unknown): never {
  if (error instanceof OpenRouterError) {
    throwStructuredApiError(error.statusCode, error.message);
  }
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(String(error));
}

function isRateLimitError(error: unknown): boolean {
  if (error instanceof OpenRouterError) {
    return error.statusCode === 429;
  }
  if (!(error instanceof Error)) return false;
  const lower = error.message.toLowerCase();
  return (
    lower.includes('"status":429') ||
    lower.includes('"code":429') ||
    lower.includes('429') ||
    lower.includes('rate limit') ||
    lower.includes('rate-limited')
  );
}

function extractMessageText(content: unknown): string {
  if (typeof content === 'string') {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'object' && part !== null && 'text' in part) {
          return String((part as { text: unknown }).text);
        }
        return '';
      })
      .join('')
      .trim();
  }

  return '';
}

export async function openRouterComplete(
  apiKey: string,
  params: OpenRouterChatParams
): Promise<string> {
  const client = createOpenRouterClient(apiKey);

  try {
    const completion = await client.chat.send({
      chatRequest: {
        model: params.model,
        messages: [
          { role: 'system', content: params.systemPrompt },
          { role: 'user', content: params.prompt },
        ],
        temperature: params.temperature,
      },
    });

    const text = extractMessageText(completion.choices[0]?.message?.content);
    if (!text) {
      throw new Error('OpenRouter returned an empty response');
    }

    return text;
  } catch (error) {
    if (error instanceof Error && error.message.includes('empty response')) {
      throw error;
    }
    mapOpenRouterError(error);
  }
}

/** Tries the primary model, then free-tier fallbacks when upstream returns 429. */
export async function openRouterCompleteWithFallback(
  apiKey: string,
  params: OpenRouterChatParams
): Promise<string> {
  const models = getOpenRouterModelsToTry(params.model);
  let lastError: unknown;

  for (const model of models) {
    try {
      return await openRouterComplete(apiKey, { ...params, model });
    } catch (error) {
      lastError = error;
      if (!isRateLimitError(error)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('STRATIVY BRAIN free models are rate-limited. Please try again shortly.');
}
