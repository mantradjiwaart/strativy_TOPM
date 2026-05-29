import OpenAI from 'openai';
import { getOpenRouterModelsToTry, OPENROUTER_BASE_URL } from '../config/openrouter';

export interface OpenRouterChatParams {
  prompt: string;
  systemPrompt: string;
  model: string;
  temperature: number;
}

const OPENROUTER_REFERER = 'https://strativy-boardroom-core';
const OPENROUTER_TITLE = 'STRATIVY BRAIN';

function createOpenRouterClient(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
    baseURL: OPENROUTER_BASE_URL,
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      'HTTP-Referer': OPENROUTER_REFERER,
      'X-Title': OPENROUTER_TITLE,
    },
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

function mapOpenAiError(error: unknown): never {
  if (error instanceof OpenAI.APIError) {
    throwStructuredApiError(error.status ?? 500, error.message, error.code ?? undefined);
  }
  if (error instanceof Error) {
    throw error;
  }
  throw new Error(String(error));
}

function isRateLimitError(error: unknown): boolean {
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

export async function openRouterComplete(
  apiKey: string,
  params: OpenRouterChatParams
): Promise<string> {
  const client = createOpenRouterClient(apiKey);

  try {
    const completion = await client.chat.completions.create({
      model: params.model,
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.prompt },
      ],
      temperature: params.temperature,
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) {
      throw new Error('OpenRouter returned an empty response');
    }

    return text;
  } catch (error) {
    if (error instanceof Error && error.message.includes('empty response')) {
      throw error;
    }
    mapOpenAiError(error);
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
