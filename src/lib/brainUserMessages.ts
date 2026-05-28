export const BRAIN_USER_MESSAGES = {
  offline: 'STRATIVY BRAIN is temporarily unavailable. Please try again in a moment.',
  notConnected:
    'STRATIVY BRAIN is not available right now. Please try again later or contact your administrator.',
  quota: 'STRATIVY BRAIN is busy at the moment. Please wait a minute and try again.',
  empty: 'STRATIVY BRAIN could not produce a response. Please try again with a different question.',
  generic: 'Something went wrong. Please try again.',
  helpHint: 'If this keeps happening, contact your board administrator.',
} as const;

const TECHNICAL_MARKERS = [
  'gemini_api',
  'gemini_api_key',
  'money_flow',
  '.env',
  'github',
  'npm run',
  'repository secret',
  'json',
  'vite_',
  'process.env',
  'api key',
  'unexpected response',
  'invalid json',
  'server_unavailable',
  'html instead',
];

function looksTechnical(message: string): boolean {
  const lower = message.toLowerCase();
  return TECHNICAL_MARKERS.some((marker) => lower.includes(marker));
}

function quotaMessage(retryAfterMs?: number): string {
  if (retryAfterMs && retryAfterMs > 0) {
    const seconds = Math.ceil(retryAfterMs / 1000);
    return `STRATIVY BRAIN is busy. Please wait about ${seconds} seconds and try again.`;
  }
  return BRAIN_USER_MESSAGES.quota;
}

export function toUserFacingBrainError(error: unknown): string {
  if (!(error instanceof Error)) {
    return BRAIN_USER_MESSAGES.generic;
  }

  const message = error.message;
  const lower = message.toLowerCase();

  if (lower.includes('quota') || lower.includes('429') || lower.includes('rate limit')) {
    const retryMatch = message.match(/retry in about (\d+)/i);
    const retryMs = retryMatch ? Number(retryMatch[1]) * 1000 : undefined;
    return quotaMessage(retryMs);
  }

  if (
    lower.includes('server_unavailable') ||
    lower.includes('not connected') ||
    lower.includes('not defined') ||
    looksTechnical(message)
  ) {
    return BRAIN_USER_MESSAGES.notConnected;
  }

  if (lower.includes('empty response')) {
    return BRAIN_USER_MESSAGES.empty;
  }

  if (lower.includes('momentarily offline') || lower.includes('temporarily unavailable')) {
    return BRAIN_USER_MESSAGES.offline;
  }

  if (!looksTechnical(message) && message.length < 200) {
    return message;
  }

  return BRAIN_USER_MESSAGES.generic;
}
