import { defaultBUs } from '../data';
import type { BoardScenarioInputs, BusinessUnit } from '../types';

export class SimulationEngine {
  simulate(inputs: BoardScenarioInputs): Record<string, BusinessUnit> {
    const updated = JSON.parse(JSON.stringify(defaultBUs)) as Record<string, BusinessUnit>;
    const {
      oilTransitionSpeed,
      propertyExpansionRate,
      esgInvestmentFactor,
      techAdoptionRate,
    } = inputs;

    const oilReduction = (oilTransitionSpeed / 100) * 280;
    updated.oilAndGas.baseRevenue = Math.max(300, updated.oilAndGas.baseRevenue - oilReduction);
    updated.oilAndGas.baseEbitda = Math.max(100, updated.oilAndGas.baseEbitda - oilReduction * 0.45);
    updated.oilAndGas.baseCapex = Math.max(80, updated.oilAndGas.baseCapex - oilReduction * 0.5);
    updated.oilAndGas.esgScore = Math.min(90, Math.round(42 + oilTransitionSpeed * 0.38));
    updated.oilAndGas.riskIndex = Math.max(40, Math.round(78 - oilTransitionSpeed * 0.35));

    const renewableBoost = (oilTransitionSpeed / 100) * 410;
    updated.renewableEnergy.baseRevenue += renewableBoost;
    updated.renewableEnergy.baseEbitda += renewableBoost * 0.38;
    updated.renewableEnergy.baseCapex += renewableBoost * 0.6;
    updated.renewableEnergy.portfolioGrowth += oilTransitionSpeed * 0.25;

    const propMultiplier = propertyExpansionRate / 50;
    updated.property.baseRevenue *= 0.8 + propMultiplier * 0.2;
    updated.property.baseEbitda *= 0.8 + propMultiplier * 0.22;
    updated.property.baseCapex *= 0.7 + propMultiplier * 0.3;

    updated.hotel.baseRevenue *= 0.85 + propMultiplier * 0.15;
    updated.hotel.baseEbitda *= 0.85 + propMultiplier * 0.16;
    updated.hotel.baseCapex *= 0.8 + propMultiplier * 0.2;

    const esgBonus = (esgInvestmentFactor - 50) * 0.4;
    Object.keys(updated).forEach((key) => {
      if (key !== 'renewableEnergy' && key !== 'oilAndGas') {
        updated[key].esgScore = Math.min(100, Math.round(updated[key].esgScore + esgBonus));
      }
    });

    const techMultiplier = techAdoptionRate / 50;
    updated.innovation.baseRevenue *= techMultiplier;
    updated.innovation.baseEbitda += (techAdoptionRate - 50) * 1.5;
    updated.agriculture.portfolioGrowth = Math.min(
      15,
      updated.agriculture.portfolioGrowth * techMultiplier
    );
    updated.aquaculture.portfolioGrowth = Math.min(
      30,
      updated.aquaculture.portfolioGrowth * techMultiplier
    );

    return updated;
  }
}
