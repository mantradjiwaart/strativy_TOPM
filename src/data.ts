/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessUnit, DependencyFlow, StrategicProject, HumanCapitalTelemetry } from './types';

export const defaultBUs: Record<string, BusinessUnit> = {
  oilAndGas: {
    id: 'oilAndGas',
    name: 'Oil & Gas Exploration',
    short: 'Oil & Gas',
    baseRevenue: 950,
    baseEbitda: 380,
    baseCapex: 280,
    esgScore: 42,
    riskIndex: 78,
    portfolioGrowth: 4.2,
    color: '#F59E0B', // Amber
    icon: 'Flame',
    description: 'High-yield extraction operations. Key carbon liability under strategic transition pressure. Direct capital generator funding renewable grid deployment.'
  },
  renewableEnergy: {
    id: 'renewableEnergy',
    name: 'Renewable Power Grid',
    short: 'Renewables',
    baseRevenue: 280,
    baseEbitda: 98,
    baseCapex: 240,
    esgScore: 94,
    riskIndex: 32,
    portfolioGrowth: 34.5,
    color: '#10B981', // Emerald
    icon: 'Zap',
    description: 'Offshore deepwater wind turbines, solar fields, and advanced grid interconnects. Capital-intensive scaling phase requiring high-velocity reinvestment.'
  },
  property: {
    id: 'property',
    name: 'Commercial Property & Land',
    short: 'Property',
    baseRevenue: 480,
    baseEbitda: 210,
    baseCapex: 150,
    esgScore: 68,
    riskIndex: 45,
    portfolioGrowth: 8.7,
    color: '#6366F1', // Indigo
    icon: 'Building',
    description: 'Commercial urban real estate portfolio. Assets lease directly to Hospitality and technology divisions. Highly stable long-term land valuations.'
  },
  hotel: {
    id: 'hotel',
    name: 'Luxe Hospitality & Resorts',
    short: 'Hotels',
    baseRevenue: 320,
    baseEbitda: 80,
    baseCapex: 90,
    esgScore: 72,
    riskIndex: 52,
    portfolioGrowth: 11.2,
    color: '#EC4899', // Pink
    icon: 'Briefcase',
    description: 'Premium hotels and sustainable oceanfront resorts. Linked directly to Property land plots, using clean power and clean agro-produce chains internally.'
  },
  agriculture: {
    id: 'agriculture',
    name: 'Precision Agro-Farms',
    short: 'Agriculture',
    baseRevenue: 190,
    baseEbitda: 62,
    baseCapex: 40,
    esgScore: 82,
    riskIndex: 38,
    portfolioGrowth: 6.8,
    color: '#84CC16', // Lime
    icon: 'Leaf',
    description: 'Organic farming networks powered by agricultural software and drones. Directly handles prime food procurement loops for adjacent Hotels divisions.'
  },
  aquaculture: {
    id: 'aquaculture',
    name: 'Offshore Aquaculture',
    short: 'Aquaculture',
    baseRevenue: 140,
    baseEbitda: 50,
    baseCapex: 35,
    esgScore: 88,
    riskIndex: 40,
    portfolioGrowth: 18.3,
    color: '#06B6D4', // Cyan
    icon: 'Waves',
    description: 'Premium deepwater seafood nurseries. Integrates clean floating solar grids. Ships high-margin seafood exports globally to offset culinary inflation.'
  },
  innovation: {
    id: 'innovation',
    name: 'DeepTech Venture Capital',
    short: 'Innovation',
    baseRevenue: 90,
    baseEbitda: -15, // R&D cost center
    baseCapex: 65,
    esgScore: 80,
    riskIndex: 65,
    portfolioGrowth: 42.1,
    color: '#A855F7', // Purple
    icon: 'Lightbulb',
    description: 'Incubator for proprietary neural networks, grid load-balancing AI engines, and precision AgriTech algorithms deployed client-side across the group.'
  }
};

export const defaultFlows: DependencyFlow[] = [
  { 
    from: 'agriculture', 
    to: 'hotel', 
    type: 'Food Supply', 
    text: 'Procures premium, fully trackable organic food pipelines internally. Decreases hotel logistics costs and culinary supply friction.',
    metric: 'Dynamic SLA: Sourcing internally offsets culinary inflation by 11.4%' 
  },
  { 
    from: 'property', 
    to: 'hotel', 
    type: 'Asset Leasing', 
    text: 'Real estate portfolio leases prime plots directly to resort management, locking in stable long-term master facility leases across cycles.',
    metric: 'Annual contract block: $42.0M/yr lease payments | 100% dependency' 
  },
  { 
    from: 'oilAndGas', 
    to: 'renewableEnergy', 
    type: 'Transition Funding', 
    text: 'Allocates high cash yields from traditional crude extraction to offshore turbine capital project schedules, shifting long-term carbon liabilities.',
    metric: 'Funding correlation: Shifting $150M fossil yield funds phase 3 clean grids' 
  },
  { 
    from: 'innovation', 
    to: 'renewableEnergy', 
    type: 'Grid Automation', 
    text: 'Smart power router AI systems and grid transmission managers dispatch utility electricity based on forecast demands, lowering grid curtailment.',
    metric: 'R&D synergy output: Neural routing increases active wind yield by 14.0%' 
  },
  { 
    from: 'innovation', 
    to: 'agriculture', 
    type: 'AgriTech AI', 
    text: 'Autonomous crop schedules, moisture monitoring sensors, and robotic yield trackers maximize sustainable tonnage per hectare.',
    metric: 'Technology lift: AI automation increases harvest yields by 18.2%' 
  }
];

export const defaultProjects: StrategicProject[] = [
  {
    id: 'PRJ-NUSA-01',
    name: 'Luxe Resort Nusa Dua Phase 2',
    sector: 'hospitality',
    status: 'amber',
    budgetSpent: 90,
    totalBudget: 120,
    progress: 75,
    start: '2026-01-10',
    end: '2026-10-15',
    slippageDays: 12,
    rootCause: 'Sustainable construction material imports clearing delay.'
  },
  {
    id: 'PRJ-LAND-02',
    name: 'CBD Commercial Land Acquisition',
    sector: 'property',
    status: 'green',
    budgetSpent: 45,
    totalBudget: 60,
    progress: 90,
    start: '2026-02-01',
    end: '2026-06-30',
    slippageDays: 0,
    rootCause: 'All clear. Final zoning validations approved.'
  },
  {
    id: 'PRJ-WIND-03',
    name: '100MW Offshore Wind Grid Phase 3',
    sector: 'renewables',
    status: 'red',
    budgetSpent: 135,
    totalBudget: 200,
    progress: 35,
    start: '2026-03-15',
    end: '2027-04-30',
    slippageDays: 45,
    rootCause: 'Supply chain friction in deepwater turbine shipping.'
  },
  {
    id: 'PRJ-AI-04',
    name: 'Ecosystem AI Process Automation v2',
    sector: 'innovation',
    status: 'green',
    budgetSpent: 40,
    totalBudget: 50,
    progress: 80,
    start: '2026-01-05',
    end: '2026-08-30',
    slippageDays: 2,
    rootCause: 'System fine-tuning and sandbox testing cycle.'
  }
];

export const defaultHRData: Record<string, HumanCapitalTelemetry> = {
  oilAndGas: {
    id: 'HR-OG',
    buId: 'oilAndGas',
    buName: 'Oil & Gas Exploration',
    color: '#F59E0B',
    headcount: 2500,
    contractors: 800,
    engagementScore: 68,
    attritionRate: 11.8,
    wellnessParticipation: 42,
    wellnessParticipationBudget: 2.2, // $2.2M
    safetyIncidents: 6,
    leadershipReadiness: 65
  },
  renewableEnergy: {
    id: 'HR-RE',
    buId: 'renewableEnergy',
    buName: 'Renewable Power Grid',
    color: '#10B981',
    headcount: 1200,
    contractors: 350,
    engagementScore: 86,
    attritionRate: 5.4,
    wellnessParticipation: 78,
    wellnessParticipationBudget: 3.5,
    safetyIncidents: 0,
    leadershipReadiness: 88
  },
  property: {
    id: 'HR-PROP',
    buId: 'property',
    buName: 'Commercial Property & Land',
    color: '#6366F1',
    headcount: 950,
    contractors: 200,
    engagementScore: 74,
    attritionRate: 7.2,
    wellnessParticipation: 55,
    wellnessParticipationBudget: 1.5,
    safetyIncidents: 1,
    leadershipReadiness: 72
  },
  hotel: {
    id: 'HR-HOTEL',
    buId: 'hotel',
    buName: 'Luxe Hospitality & Resorts',
    color: '#EC4899',
    headcount: 3850,
    contractors: 1200,
    engagementScore: 82,
    attritionRate: 10.5,
    wellnessParticipation: 68,
    wellnessParticipationBudget: 2.8,
    safetyIncidents: 2,
    leadershipReadiness: 81
  },
  agriculture: {
    id: 'HR-AGRI',
    buId: 'agriculture',
    buName: 'Precision Agro-Farms',
    color: '#84CC16',
    headcount: 1800,
    contractors: 900,
    engagementScore: 80,
    attritionRate: 8.1,
    wellnessParticipation: 72,
    wellnessParticipationBudget: 1.8,
    safetyIncidents: 3,
    leadershipReadiness: 76
  },
  aquaculture: {
    id: 'HR-AQUA',
    buId: 'aquaculture',
    buName: 'Offshore Aquaculture',
    color: '#06B6D4',
    headcount: 1150,
    contractors: 400,
    engagementScore: 85,
    attritionRate: 6.2,
    wellnessParticipation: 80,
    wellnessParticipationBudget: 1.6,
    safetyIncidents: 1,
    leadershipReadiness: 84
  },
  innovation: {
    id: 'HR-INNOV',
    buId: 'innovation',
    buName: 'DeepTech Venture Capital',
    color: '#A855F7',
    headcount: 1000,
    contractors: 150,
    engagementScore: 84,
    attritionRate: 9.3,
    wellnessParticipation: 70,
    wellnessParticipationBudget: 2.5,
    safetyIncidents: 0,
    leadershipReadiness: 90
  }
};
