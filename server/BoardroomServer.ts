import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { ConfigService } from './ConfigService';
import { GeminiAdvisorService } from './GeminiAdvisorService';
import { GeminiGateway } from './GeminiGateway';
import { GeminiRoutes } from './GeminiRoutes';

const PORT = 3000;

export class BoardroomServer {
  private readonly config = new ConfigService();

  async start(): Promise<void> {
    const app = express();
    app.use(express.json());

    const apiKey = this.config.getGeminiApiKey();
    const gateway = new GeminiGateway(apiKey);
    const advisorService = new GeminiAdvisorService(gateway);
    new GeminiRoutes(advisorService).register(app);

    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      // Startup log only — required for local dev feedback
      process.stdout.write(`Server running on http://localhost:${PORT}\n`);
    });
  }
}
