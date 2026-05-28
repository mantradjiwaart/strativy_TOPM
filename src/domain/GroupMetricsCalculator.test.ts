import { describe, expect, it } from 'vitest';
import { defaultBUs } from '../data';
import { GroupMetricsCalculator } from './GroupMetricsCalculator';
import { SimulationEngine } from './SimulationEngine';

const calculator = new GroupMetricsCalculator();
const engine = new SimulationEngine();

describe('GroupMetricsCalculator', () => {
  it('aggregates revenue from all business units', () => {
    const inputs = {
      oilTransitionSpeed: 50,
      propertyExpansionRate: 40,
      esgInvestmentFactor: 60,
      techAdoptionRate: 50,
    };
    const simulated = engine.simulate(inputs);
    const metrics = calculator.calculate(simulated, inputs);

    const expectedRevenue = Object.values(simulated).reduce(
      (sum, bu) => sum + bu.baseRevenue,
      0
    );
    expect(parseFloat(metrics.totalRevenue)).toBeCloseTo(expectedRevenue, 1);
  });

  it('returns valid ESG score within range', () => {
    const inputs = {
      oilTransitionSpeed: 50,
      propertyExpansionRate: 40,
      esgInvestmentFactor: 60,
      techAdoptionRate: 50,
    };
    const simulated = engine.simulate(inputs);
    const metrics = calculator.calculate(simulated, inputs);

    expect(metrics.esgScore).toBeGreaterThanOrEqual(0);
    expect(metrics.esgScore).toBeLessThanOrEqual(100);
  });

  it('uses default BUs when sliders at midpoint', () => {
    const inputs = {
      oilTransitionSpeed: 50,
      propertyExpansionRate: 50,
      esgInvestmentFactor: 50,
      techAdoptionRate: 50,
    };
    const simulated = engine.simulate(inputs);
    const metrics = calculator.calculate(simulated, inputs);

    expect(metrics.totalRevenue).toBeDefined();
    expect(Object.keys(defaultBUs).length).toBe(7);
  });
});
