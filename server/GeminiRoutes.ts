import type { Express, Request, Response } from 'express';
import { GeminiApiError } from './GeminiApiError';
import { GeminiAdvisorService } from './GeminiAdvisorService';

export class GeminiRoutes {
  constructor(private readonly advisorService: GeminiAdvisorService) {}

  register(app: Express): void {
    app.post('/api/gemini/generate', async (req: Request, res: Response) => {
      try {
        const { prompt, systemPrompt } = req.body as {
          prompt?: string;
          systemPrompt?: string;
        };

        const text = await this.advisorService.advise(prompt ?? '', systemPrompt);
        res.json({ text });
      } catch (error) {
        const status = error instanceof GeminiApiError ? error.statusCode : 500;
        const message =
          error instanceof Error
            ? error.message
            : 'The AI Strategist is momentarily offline. Please try again.';
        res.status(status).json({
          error: message,
          retryAfterMs:
            error instanceof GeminiApiError ? error.retryAfterMs : undefined,
        });
      }
    });
  }
}
