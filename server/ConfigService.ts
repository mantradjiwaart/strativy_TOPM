import dotenv from 'dotenv';

const PRIMARY_ENV_KEY = 'GEMINI_API_KEY';
const LEGACY_ENV_KEY = 'MONEY_FLOW_GEMINI_API';

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
    const apiKey =
      process.env[PRIMARY_ENV_KEY]?.trim() ||
      process.env[LEGACY_ENV_KEY]?.trim();
    if (!apiKey) {
      throw new Error(
        `${PRIMARY_ENV_KEY} is not defined. Copy .env.example to .env and set your Strativy Brain API key.`
      );
    }
    return apiKey;
  }
}
