import { OPENROUTER_CHAT_URL } from '../config/openrouter';

export interface OpenRouterChatParams {
  prompt: string;
  systemPrompt: string;
  model: string;
  temperature: number;
}

interface OpenRouterChoice {
  message?: { content?: string };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: { message?: string; code?: number | string };
}

export async function openRouterComplete(
  apiKey: string,
  params: OpenRouterChatParams
): Promise<string> {
  const res = await fetch(OPENROUTER_CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://strativy-boardroom-core',
      'X-Title': 'STRATIVY BRAIN',
    },
    body: JSON.stringify({
      model: params.model,
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.prompt },
      ],
      temperature: params.temperature,
    }),
  });

  const body = (await res.json()) as OpenRouterResponse;

  if (!res.ok) {
    const apiMessage = body.error?.message ?? res.statusText;
    const code = body.error?.code ?? res.status;
    throw new Error(
      JSON.stringify({
        status: res.status,
        code,
        message: apiMessage || `OpenRouter request failed (${res.status})`,
      })
    );
  }

  const text = body.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('OpenRouter returned an empty response');
  }

  return text;
}
