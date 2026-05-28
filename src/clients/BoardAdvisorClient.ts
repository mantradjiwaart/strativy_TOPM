export interface BoardAdvisorRequest {
  prompt: string;
  systemPrompt: string;
}

function parseApiResponse(
  res: Response,
  body: string
): { text?: string; error?: string } {
  const contentType = res.headers.get('content-type') ?? '';

  if (body.trimStart().startsWith('<')) {
    throw new Error(
      'STRATIVY BRAIN API is not reachable (received HTML instead of JSON). ' +
        'GitHub Pages only hosts the dashboard — run `npm run dev` locally for STRATIVY BRAIN, or deploy the Node server.'
    );
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
      'STRATIVY BRAIN returned invalid JSON. Check that `npm run dev` is running and MONEY_FLOW_GEMINI_API is set in `.env`.'
    );
  }
}

export class BoardAdvisorClient {
  async generate(request: BoardAdvisorRequest): Promise<string> {
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
