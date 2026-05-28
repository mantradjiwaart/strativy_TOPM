import dotenv from 'dotenv';

const GEMINI_ENV_KEY = 'MONEY_FLOW_GEMINI_API';

export class ConfigService {
  private loaded = false;

  load(): void {
    if (!this.loaded) {
      dotenv.config();
      this.loaded = true;
    }
  }

  getGeminiApiKey(): string {
    this.load();
    const apiKey = process.env[GEMINI_ENV_KEY];
    if (!apiKey?.trim()) {
      throw new Error(
        `${GEMINI_ENV_KEY} is not defined. Copy .env.example to .env and set your Gemini API key.`
      );
    }
    return apiKey.trim();
  }
}
