import { DirectStrativyBrainClient } from './DirectStrativyBrainClient';

export interface BoardAdvisorRequest {
  prompt: string;
  systemPrompt: string;
}

function getClientApiKey(): string {
  return import.meta.env.VITE_GEMINI_API_KEY?.trim() ?? '';
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
    throw new Error(
      `STRATIVY BRAIN returned an unexpected response (${res.status}). Ensure the dev server is running with \`npm run dev\`.`
    );
  }

  try {
    return JSON.parse(body) as { text?: string; error?: string };
  } catch {
    throw new Error(
      'STRATIVY BRAIN returned invalid JSON. Check that `npm run dev` is running and GEMINI_API_KEY is set in `.env`.'
    );
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
        throw new Error(
          'STRATIVY BRAIN needs GEMINI_API_KEY. For GitHub Pages, add a repository secret named GEMINI_API_KEY ' +
            'and rebuild. For local use, set GEMINI_API_KEY in `.env` and run `npm run dev`, or run `npm run build` with the key in your environment.'
        );
      }
      throw error;
    }
  }

  private async generateViaServer(request: BoardAdvisorRequest): Promise<string> {
    const res = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    const body = await res.text();
    const data = parseApiResponse(res, body);

    if (!res.ok) {
      throw new Error(data.error ?? `Request failed with status ${res.status}`);
    }

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.text) {
      throw new Error('No response text returned from STRATIVY BRAIN');
    }

    return data.text;
  }
}
