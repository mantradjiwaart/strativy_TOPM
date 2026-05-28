export class GeminiApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly retryAfterMs?: number
  ) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

function parseRetryAfterMs(text: string): number | undefined {
  const match = text.match(/retry in (\d+(?:\.\d+)?)\s*s/i);
  if (!match) return undefined;
  return Math.ceil(parseFloat(match[1]) * 1000);
}

export function toGeminiApiError(error: unknown): GeminiApiError {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : JSON.stringify(error);

  const retryAfterMs = parseRetryAfterMs(raw);
  const lower = raw.toLowerCase();

  if (
    lower.includes('429') ||
    lower.includes('resource_exhausted') ||
    lower.includes('quota exceeded') ||
    lower.includes('rate limit')
  ) {
    const retryHint = retryAfterMs
      ? ` Please retry in about ${Math.ceil(retryAfterMs / 1000)} seconds.`
      : ' Please wait a minute and try again.';

    const modelHint = lower.includes('limit: 0')
      ? ' This model may not be available on the free tier — set GEMINI_MODEL=gemini-2.5-flash in .env.'
      : '';

    return new GeminiApiError(
      `Gemini API quota exceeded.${retryHint}${modelHint} Check usage at https://ai.dev/rate-limit`,
      429,
      retryAfterMs
    );
  }

  if (error instanceof Error) {
    return new GeminiApiError(error.message, 500);
  }

  return new GeminiApiError(
    'The AI Strategist is momentarily offline. Please try again.',
    500
  );
}
