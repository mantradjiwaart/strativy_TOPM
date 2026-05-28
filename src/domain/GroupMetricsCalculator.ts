import type { BoardScenarioInputs, BusinessUnit, GroupMetrics } from '../types';

export class GroupMetricsCalculator {
  calculate(
    simulatedBUs: Record<string, BusinessUnit>,
    inputs: BoardScenarioInputs
  ): GroupMetrics {
    const { propertyExpansionRate, oilTransitionSpeed, techAdoptionRate } = inputs;

    let totalRev = 0;
    let totalEbitda = 0;
    let totalCapex = 0;
    let weightedEsg = 0;
    let weightedRisk = 0;
    let totalGrowth = 0;

    Object.values(simulatedBUs).forEach((bu) => {
      totalRev += bu.baseRevenue;
      totalEbitda += bu.baseEbitda;
      totalCapex += bu.baseCapex;
      weightedEsg += bu.esgScore * bu.baseRevenue;
      weightedRisk += bu.riskIndex * bu.baseRevenue;
      totalGrowth += bu.portfolioGrowth;
    });

    const netProfit = totalEbitda * 0.52;
    const cashReserve = 450 + totalEbitda * 0.35 - totalCapex * 0.15;
    const assetValuation = 4500 + totalRev * 0.8 + totalCapex * 1.2;
    const automatedOpsEfficiency =
      88 + techAdoptionRate * 0.1 - (100 - oilTransitionSpeed) * 0.02;

    return {
      totalRevenue: totalRev.toFixed(1),
      ebitda: totalEbitda.toFixed(1),
      netProfit: netProfit.toFixed(1),
      cashPosition: cashReserve.toFixed(1),
      assetValuation: (assetValuation / 1000).toFixed(2),
      capex: totalCapex.toFixed(1),
      capexBudget: (340 + propertyExpansionRate * 1.5 + oilTransitionSpeed * 1.2).toFixed(1),
      operationalEfficiency: Math.min(99.5, automatedOpsEfficiency).toFixed(1),
      esgScore: Math.round(weightedEsg / totalRev),
      portfolioGrowth: (totalGrowth / Object.keys(simulatedBUs).length).toFixed(1),
      riskExposure: Math.round(weightedRisk / totalRev),
    };
  }
}
