import { useMemo } from 'react';
import { GroupMetricsCalculator, SimulationEngine } from '../domain';
import type { BoardScenarioInputs, BusinessUnit, GroupMetrics } from '../types';

const simulationEngine = new SimulationEngine();
const metricsCalculator = new GroupMetricsCalculator();

export function useSimulation(inputs: BoardScenarioInputs): {
  simulatedBUs: Record<string, BusinessUnit>;
  groupMetrics: GroupMetrics;
} {
  const simulatedBUs = useMemo(
    () => simulationEngine.simulate(inputs),
    [
      inputs.oilTransitionSpeed,
      inputs.propertyExpansionRate,
      inputs.esgInvestmentFactor,
      inputs.techAdoptionRate,
    ]
  );

  const groupMetrics = useMemo(
    () => metricsCalculator.calculate(simulatedBUs, inputs),
    [
      simulatedBUs,
      inputs.propertyExpansionRate,
      inputs.oilTransitionSpeed,
      inputs.techAdoptionRate,
    ]
  );

  return { simulatedBUs, groupMetrics };
}
