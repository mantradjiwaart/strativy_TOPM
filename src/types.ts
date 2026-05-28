/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessUnit {
  id: string;
  name: string;
  short: string;
  baseRevenue: number;
  baseEbitda: number;
  baseCapex: number;
  esgScore: number;
  riskIndex: number;
  portfolioGrowth: number;
  color: string;
  icon: string;
  description: string;
}

export interface DependencyFlow {
  from: string;
  to: string;
  type: string;
  text: string;
  metric: string;
}

export interface StrategicProject {
  id: string;
  name: string;
  sector: string;
  status: 'green' | 'amber' | 'red';
  budgetSpent: number;
  totalBudget: number;
  progress: number;
  start: string;
  end: string;
  slippageDays: number;
  rootCause: string;
}

export interface BoardScenarioInputs {
  oilTransitionSpeed: number;
  propertyExpansionRate: number;
  esgInvestmentFactor: number;
  techAdoptionRate: number;
}

export interface GroupMetrics {
  totalRevenue: string;
  ebitda: string;
  netProfit: string;
  cashPosition: string;
  assetValuation: string;
  capex: string;
  capexBudget: string;
  operationalEfficiency: string;
  esgScore: number;
  portfolioGrowth: string;
  riskExposure: number;
}

export interface HumanCapitalTelemetry {
  id: string;
  buId: string;
  buName: string;
  color: string;
  headcount: number;
  contractors: number;
  engagementScore: number;
  attritionRate: number;
  wellnessParticipation: number;
  wellnessParticipationBudget: number;
  safetyIncidents: number;
  leadershipReadiness: number; // 0-100
}
