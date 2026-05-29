export class OpenRouterApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
    readonly retryAfterMs?: number
  ) {
    super(message);
    this.name = 'OpenRouterApiError';
  }
}

function parseRetryAfterMs(text: string, headerValue: string | null): number | undefined {
  if (headerValue) {
    const seconds = Number(headerValue);
    if (!Number.isNaN(seconds) && seconds > 0) {
      return Math.ceil(seconds * 1000);
    }
  }
  const match = text.match(/retry in (\d+(?:\.\d+)?)\s*s/i);
  if (!match) return undefined;
  return Math.ceil(parseFloat(match[1]) * 1000);
}

function parseStructuredError(raw: string): { status?: number; message?: string } {
  try {
    const parsed = JSON.parse(raw) as {
      status?: number;
      message?: string;
      error?: { message?: string; code?: number };
    };

    if (typeof parsed.message === 'string') {
      return { status: parsed.status ?? parsed.error?.code, message: parsed.message };
    }

    if (typeof parsed.error?.message === 'string') {
      return { status: parsed.status ?? parsed.error.code, message: parsed.error.message };
    }
  } catch {
    // not JSON — use raw string
  }
  return { message: raw };
}

export function toOpenRouterApiError(
  error: unknown,
  retryAfterHeader: string | null = null
): OpenRouterApiError {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : JSON.stringify(error);

  const structured = parseStructuredError(raw);
  const message = structured.message ?? raw;
  const status = structured.status;
  const retryAfterMs = parseRetryAfterMs(message, retryAfterHeader);
  const lower = message.toLowerCase();

  if (status === 401 || lower.includes('unauthorized') || lower.includes('invalid api key')) {
    return new OpenRouterApiError(
      'STRATIVY BRAIN could not authenticate. Please contact your administrator.',
      401
    );
  }

  if (
    status === 429 ||
    lower.includes('429') ||
    lower.includes('rate limit') ||
    lower.includes('rate-limited') ||
    lower.includes('quota')
  ) {
    const retryHint = retryAfterMs
      ? ` Please wait about ${Math.ceil(retryAfterMs / 1000)} seconds and try again.`
      : ' Please wait a minute and try again.';

    return new OpenRouterApiError(
      `STRATIVY BRAIN is busy at the moment.${retryHint}`,
      429,
      retryAfterMs
    );
  }

  if (status === 402 || lower.includes('insufficient') || lower.includes('credits')) {
    return new OpenRouterApiError(
      'STRATIVY BRAIN credits are exhausted. Please contact your administrator.',
      402
    );
  }

  if (error instanceof Error && !looksTechnical(message)) {
    return new OpenRouterApiError(message, status ?? 500);
  }

  return new OpenRouterApiError(
    'STRATIVY BRAIN is temporarily unavailable. Please try again.',
    status ?? 500
  );
}

function looksTechnical(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes('openrouter') ||
    lower.includes('api key') ||
    lower.includes('bearer') ||
    lower.includes('http') ||
    lower.includes('fetch failed')
  );
}
