export interface BoardAdvisorRequest {
  prompt: string;
  systemPrompt: string;
}

export interface BoardAdvisorResponse {
  text: string;
}

export class BoardAdvisorClient {
  async generate(request: BoardAdvisorRequest): Promise<string> {
    const res = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    const data = (await res.json()) as { text?: string; error?: string };

    if (!res.ok) {
      throw new Error(data.error ?? `Request failed with status ${res.status}`);
    }

    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.text) {
      throw new Error('No response text returned from board advisor');
    }

    return data.text;
  }
}
