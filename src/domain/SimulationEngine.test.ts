import { describe, expect, it } from 'vitest';
import { SimulationEngine } from './SimulationEngine';

const engine = new SimulationEngine();

const defaultInputs = {
  oilTransitionSpeed: 50,
  propertyExpansionRate: 40,
  esgInvestmentFactor: 60,
  techAdoptionRate: 50,
};

describe('SimulationEngine', () => {
  it('caps oil revenue at floor when transition is maxed', () => {
    const result = engine.simulate({ ...defaultInputs, oilTransitionSpeed: 100 });
    expect(result.oilAndGas.baseRevenue).toBeGreaterThanOrEqual(300);
  });

  it('raises renewable revenue when oil transition increases', () => {
    const low = engine.simulate({ ...defaultInputs, oilTransitionSpeed: 0 });
    const high = engine.simulate({ ...defaultInputs, oilTransitionSpeed: 100 });
    expect(high.renewableEnergy.baseRevenue).toBeGreaterThan(low.renewableEnergy.baseRevenue);
  });

  it('caps ESG scores at 100 for non-oil BUs', () => {
    const result = engine.simulate({ ...defaultInputs, esgInvestmentFactor: 100 });
    expect(result.property.esgScore).toBeLessThanOrEqual(100);
    expect(result.hotel.esgScore).toBeLessThanOrEqual(100);
  });
});
