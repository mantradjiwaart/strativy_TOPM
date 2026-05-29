import { describe, expect, it } from 'vitest';
import {
  BRAIN_SCENARIO_PROMPTS,
  getStaticBrainResponse,
  resolveBrainScenarioKey,
} from './brainStaticResponses';

describe('brainStaticResponses', () => {
  it('resolves each preset prompt to its scenario key', () => {
    expect(resolveBrainScenarioKey(BRAIN_SCENARIO_PROMPTS['property-hotel-leases'])).toBe(
      'property-hotel-leases',
    );
    expect(resolveBrainScenarioKey(BRAIN_SCENARIO_PROMPTS['oil-renewable-transition'])).toBe(
      'oil-renewable-transition',
    );
    expect(resolveBrainScenarioKey(BRAIN_SCENARIO_PROMPTS['esg-carbon-audit'])).toBe(
      'esg-carbon-audit',
    );
    expect(resolveBrainScenarioKey(BRAIN_SCENARIO_PROMPTS['autonomous-packaging'])).toBe(
      'autonomous-packaging',
    );
    expect(resolveBrainScenarioKey(BRAIN_SCENARIO_PROMPTS['custom-esg-reallocation'])).toBe(
      'custom-esg-reallocation',
    );
  });

  it('returns executive markdown for the default ESG reallocation query', () => {
    const response = getStaticBrainResponse(BRAIN_SCENARIO_PROMPTS['custom-esg-reallocation']);
    expect(response).toContain('800M');
    expect(response).toContain('ESG');
    expect(response).toContain('Bottleneck');
  });

  it('returns distinct content per scenario', () => {
    const property = getStaticBrainResponse(BRAIN_SCENARIO_PROMPTS['property-hotel-leases']);
    const oil = getStaticBrainResponse(BRAIN_SCENARIO_PROMPTS['oil-renewable-transition']);
    expect(property).not.toBe(oil);
    expect(property).toContain('Property');
    expect(oil).toContain('Renewable');
  });
});
