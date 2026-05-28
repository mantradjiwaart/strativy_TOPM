import type { Express, Request, Response } from 'express';
import { GeminiAdvisorService } from './GeminiAdvisorService';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return 'The AI Strategist is momentarily offline. Please try again.';
}

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
        res.status(500).json({ error: getErrorMessage(error) });
      }
    });
  }
}
