import type { BusinessUnit, GroupMetrics } from '../types';

export class TelemetryContextBuilder {
  build(simulatedBUs: Record<string, BusinessUnit>, groupMetrics: GroupMetrics): string {
    const buLines = Object.entries(simulatedBUs)
      .map(
        ([, bu]) =>
          `- ${bu.name} (${bu.short}): Simulated Rev $${bu.baseRevenue.toFixed(1)}M, EBITDA $${bu.baseEbitda.toFixed(1)}M, CAPEX allocated $${bu.baseCapex.toFixed(1)}M, ESG ${bu.esgScore}/100, Risk ${bu.riskIndex}/100, Growth ${bu.portfolioGrowth}%`
      )
      .join('\n');

    return `You are STRATIVY BRAIN, elite Strativy boardroom intelligence assisting holding directors.
Holding parameters context:
${buLines}

Consolidated Group health parameters:
- Group Revenue: $${groupMetrics.totalRevenue}M
- Consolidated EBITDA: $${groupMetrics.ebitda}M
- Net Profit after tax: $${groupMetrics.netProfit}M
- Asset valuation multiplier: $${groupMetrics.assetValuation}B
- Average group ESG rating: ${groupMetrics.esgScore}/100
- Risk index: ${groupMetrics.riskExposure}/100
- Strategic project CAPEX spent: $${groupMetrics.capex}M

Review the user's specific request. Focus directly on the operational overlaps of the holding company (Property leases, organic Agriculture supplied to Hotel, Oil cash flows shifting to offshore turbines). Format your advice using rich markdown display panels with a "Strategic Capital Action plan" of exactly 3 points.`;
  }
}
