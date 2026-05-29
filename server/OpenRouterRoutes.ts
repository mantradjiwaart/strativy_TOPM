import type { Express, Request, Response } from 'express';
import { OpenRouterApiError } from './OpenRouterApiError';
import { OpenRouterAdvisorService } from './OpenRouterAdvisorService';

export class OpenRouterRoutes {
  constructor(private readonly advisorService: OpenRouterAdvisorService) {}

  register(app: Express): void {
    app.post('/api/openrouter/generate', async (req: Request, res: Response) => {
      try {
        const { prompt, systemPrompt } = req.body as {
          prompt?: string;
          systemPrompt?: string;
        };

        const text = await this.advisorService.advise(prompt ?? '', systemPrompt);
        res.json({ text });
      } catch (error) {
        const status = error instanceof OpenRouterApiError ? error.statusCode : 500;
        const message =
          error instanceof Error
            ? error.message
            : 'STRATIVY BRAIN is temporarily unavailable. Please try again.';
        res.status(status).json({
          error: message,
          retryAfterMs:
            error instanceof OpenRouterApiError ? error.retryAfterMs : undefined,
        });
      }
    });
  }
}
