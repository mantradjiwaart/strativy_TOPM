import { BRAIN_STATIC_LOADING_MS } from '../config/brainStatic';
import { getStaticBrainResponse } from '../lib/brainStaticResponses';
import type { BoardAdvisorRequest } from './BoardAdvisorClient';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class StaticStrativyBrainClient {
  async generate(request: BoardAdvisorRequest): Promise<string> {
    await delay(BRAIN_STATIC_LOADING_MS);
    return getStaticBrainResponse(request.prompt);
  }
}
