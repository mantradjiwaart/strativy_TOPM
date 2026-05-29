import dotenv from 'dotenv';

const PRIMARY_ENV_KEY = 'OPENROUTER_API_KEY';

export class ConfigService {
  private loaded = false;

  load(): void {
    if (!this.loaded) {
      dotenv.config();
      this.loaded = true;
    }
  }

  getOpenRouterApiKey(): string {
    this.load();
    const apiKey = process.env[PRIMARY_ENV_KEY]?.trim();
    if (!apiKey) {
      throw new Error(
        `${PRIMARY_ENV_KEY} is not defined. Copy .env.example to .env and set your OpenRouter API key.`
      );
    }
    return apiKey;
  }
}
