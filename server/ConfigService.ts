import dotenv from 'dotenv';

const GEMINI_ENV_KEY = 'MONEY_FLOW_GEMINI_API';
const GEMINI_MODEL_ENV_KEY = 'GEMINI_MODEL';
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';

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

  getGeminiModel(): string {
    this.load();
    const model = process.env[GEMINI_MODEL_ENV_KEY]?.trim();
    return model || DEFAULT_GEMINI_MODEL;
  }
}
