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
      ? ` Please wait about ${Math.ceil(retryAfterMs / 1000)} seconds and try again.`
      : ' Please wait a minute and try again.';

    return new GeminiApiError(
      `STRATIVY BRAIN is busy at the moment.${retryHint}`,
      429,
      retryAfterMs
    );
  }

  if (error instanceof Error && !looksTechnical(error.message)) {
    return new GeminiApiError(error.message, 500);
  }

  return new GeminiApiError(
    'STRATIVY BRAIN is temporarily unavailable. Please try again.',
    500
  );
}

function looksTechnical(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes('gemini') ||
    lower.includes('api key') ||
    lower.includes('quota exceeded') ||
    lower.includes('resource_exhausted') ||
    lower.includes('google') ||
    lower.includes('http')
  );
}
