import { BRAIN_USER_MESSAGES } from '../lib/brainUserMessages';
import { DirectStrativyBrainClient } from './DirectStrativyBrainClient';

export interface BoardAdvisorRequest {
  prompt: string;
  systemPrompt: string;
}

function getClientApiKey(): string {
  return import.meta.env.VITE_OPENROUTER_API_KEY?.trim() ?? '';
}

function parseApiResponse(
  res: Response,
  body: string
): { text?: string; error?: string } {
  const contentType = res.headers.get('content-type') ?? '';

  if (body.trimStart().startsWith('<')) {
    throw new Error('SERVER_UNAVAILABLE');
  }

  if (!contentType.includes('application/json')) {
    throw new Error('SERVER_UNAVAILABLE');
  }

  try {
    return JSON.parse(body) as { text?: string; error?: string };
  } catch {
    throw new Error('SERVER_UNAVAILABLE');
  }
}

export class BoardAdvisorClient {
  async generate(request: BoardAdvisorRequest): Promise<string> {
    const clientKey = getClientApiKey();

    if (clientKey) {
      return new DirectStrativyBrainClient(clientKey).generate(request);
    }

    try {
      return await this.generateViaServer(request);
    } catch (error) {
      if (error instanceof Error && error.message === 'SERVER_UNAVAILABLE') {
        throw new Error(BRAIN_USER_MESSAGES.notConnected);
      }
      throw error;
    }
  }

  private async generateViaServer(request: BoardAdvisorRequest): Promise<string> {
    const res = await fetch('/api/openrouter/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    const body = await res.text();
    const data = parseApiResponse(res, body);

    if (!res.ok) {
      throw new Error(data.error ?? BRAIN_USER_MESSAGES.offline);
    }

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.text) {
      throw new Error(BRAIN_USER_MESSAGES.empty);
    }

    return data.text;
  }
}
