export type BrainScenarioKey =
  | 'property-hotel-leases'
  | 'oil-renewable-transition'
  | 'esg-carbon-audit'
  | 'autonomous-packaging'
  | 'custom-esg-reallocation';

export const BRAIN_SCENARIO_PROMPTS: Record<BrainScenarioKey, string> = {
  'property-hotel-leases':
    'Evaluate the operational dependency and commercial friction between Property leasing and Luxe Hospitality portfolio margins. What are the key ESG/Capital allocation trade-offs?',
  'oil-renewable-transition':
    'Draft a strategic roadmap to shift $150M of fossil capital from Oil & Gas exploration to offshore clean turbine grids without breaching our $800M consolidated EBITDA target.',
  'esg-carbon-audit':
    'Identify which Business Units present the lowest capital return index relative to carbon offsets, and provide a 3-step capital structural rebalance.',
  'autonomous-packaging':
    'Package autonomous reallocation recommendations using live simulator telemetry — revenue, ESG scores, and portfolio growth weights — into an executable board action plan.',
  'custom-esg-reallocation':
    'Analyze the holding company ecosystem bottlenecks and suggest a capital reallocation plan to maximize overall ESG score without letting EBITDA drop below $800M.',
};

const STATIC_RESPONSES: Record<BrainScenarioKey, string> = {
  'property-hotel-leases': `## Property → Luxe Hospitality: Dependency & Margin Analysis

**Executive summary:** The Property–Hotel lease chain is the holding's most stable internal synergy loop, but margin compression at Luxe Hospitality is masking under-priced green-capital upgrades across the landbank.

### Current telemetry snapshot
| Unit | Revenue | EBITDA | ESG | Risk |
|------|---------|--------|-----|------|
| Commercial Property & Land | $480M | $210M | 68/100 | 45 |
| Luxe Hospitality & Resorts | $320M | $80M | 72/100 | 52 |

Property contributes **2.6× the EBITDA** of Hotels while carrying a lower ESG score — the primary friction vector for board capital allocation.

### Key frictions
1. **Lease-rate lag:** Hospitality margins (25%) trail Property asset yields (44%) because long-dated leases were fixed pre-ESG premium era.
2. **Clean-power dependency:** Hotels rely on Renewable Power Grid interconnects; any wind-phase procurement delay passes through as occupancy-cost inflation within 2 quarters.
3. **Food-supply SLA:** Agriculture → Hotel organic pipelines reduce culinary inflation by 11.4%, but capex for cold-chain ESG certification sits unfunded in Property's landbank budget.

### ESG / capital trade-offs
- **Option A — Green lease repricing:** Redirect **$22M** from Property expansion into LEED retrofit bundles tied to lease escalators. Group ESG +3 pts; Hospitality EBITDA +$6M over 18 months.
- **Option B — Hospitality margin floor:** Hold leases flat; accept ESG stagnation. Consolidated EBITDA protected near **$865M** but carbon-offset liability rises on O&G side.

### Board recommendation
Execute **Option A** with a phased 18-month green-lease schedule. Pair with **$8M** cross-subsidy from Oil & Gas transition reserve to accelerate hotel rooftop solar — net group EBITDA impact **−$4M** (within $800M guardrail), group ESG target **76/100**.`,

  'oil-renewable-transition': `## Oil → Renewable Transition Roadmap ($150M Reallocation)

**Executive summary:** A disciplined **$150M** shift from Oil & Gas exploration capex to offshore wind Phase 3 can lift group ESG by **+8 points** while holding consolidated EBITDA above the **$800M** board floor.

### Starting position
| Unit | EBITDA | ESG | Capex allocated |
|------|--------|-----|-----------------|
| Oil & Gas Exploration | $380M | 42/100 | $280M |
| Renewable Power Grid | $98M | 94/100 | $240M |
| **Group consolidated** | **~$865M** | **~72/100** | **$910M** |

### 36-month transition path

**Phase 1 — Quarters 1–2 (Harvest & ring-fence)**
- Reduce O&G exploration capex by **$50M**; redeploy to wind turbine express logistics (resolving the 40-day deepwater procurement block).
- Expected O&G EBITDA impact: **−$18M** (deferred wells, not shut-ins).
- Renewables EBITDA uplift: **+$12M** from accelerated 100MW Phase 3 grid connection.

**Phase 2 — Quarters 3–6 (Grid interconnect scale)**
- Shift additional **$60M** to offshore array manufacturing and grid load-balancing STRATIVY BRAIN automation.
- Carbon-offset liability reduction: **−14%** on scope 1 reporting.
- Net group EBITDA after Phase 2: **~$812M** (above $800M guardrail).

**Phase 3 — Quarters 7–12 (Fossil tail management)**
- Final **$40M** transition tranche funds battery storage and agro-solar co-location.
- O&G retained as cash generator at reduced capex intensity; EBITDA stabilises at **~$340M**.
- Group ESG projected: **80/100**; consolidated EBITDA **~$828M**.

### Risk controls
- Maintain O&G production floors — no forced shut-ins before renewable baseload ≥ 62% of displaced MW.
- Hedge 18-month power-price exposure on grid interconnect delays.
- Monthly EBITDA covenant monitor against **$800M** hard floor with automatic reallocation pause triggers.

### Board action
Approve **$150M** phased transfer with Phase 1 **$50M** authorised immediately; tie remaining tranches to wind Phase 3 milestone gates.`,

  'esg-carbon-audit': `## ESG & Carbon Offsets Audit — Capital Return Index

**Executive summary:** Oil & Gas and Innovation present the weakest **ESG return per capex dollar** in the portfolio. A three-step structural rebalance can lift group ESG from **~72 to 78/100** without breaching **$800M EBITDA**.

### Capital return vs. carbon efficiency (ranked)
| Rank | Business Unit | ESG/Capex Index | Carbon offset cost | Verdict |
|------|---------------|-----------------|--------------------|---------|
| 1 | Oil & Gas | **0.15** | Highest group liability | Rebalance source |
| 2 | Innovation (DeepTech VC) | **1.23** | Low direct, high indirect | Refocus spend |
| 3 | Commercial Property | 0.45 | Moderate | Optimise retrofits |
| 4 | Renewable Power Grid | **3.92** | Net negative (offsets sold) | **Expand** |
| 5 | Aquaculture | 2.51 | Low | Maintain |
| 6 | Precision Agro-Farms | 2.05 | Low | Maintain |
| 7 | Luxe Hospitality | 0.80 | Moderate | Green-lease upgrade |

### Three-step capital structural rebalance

**Step 1 — Carbon liability haircut (0–6 months)**
- Cut O&G exploration capex by **$45M**; fund verified nature-based offsets only for residual scope 1 gaps.
- Redirect **$30M** to Renewable grid interconnect — highest ESG/capex multiplier in portfolio.
- EBITDA impact: **−$11M** | ESG impact: **+4 pts**

**Step 2 — Innovation portfolio rationalisation (6–12 months)**
- Ring-fence Innovation spend to grid automation and AgriTech STRATIVY BRAIN engines with proven 18.2% yield lift.
- Exit two early-stage bets with <1.0 ESG/capex index.
- Frees **$25M** for aquaculture floating-solar integration (ESG 88 → 92 trajectory).

**Step 3 — Property–Renewable green bundle (12–18 months)**
- Package Property landbank plots with renewable co-location rights — unlocks **$35M** efficiency capex at blended ESG index **2.8**.
- Consolidated EBITDA projected: **~$818M** | Group ESG: **78/100**

### Board recommendation
Authorise Step 1 immediately. Steps 2–3 contingent on quarterly ESG/capex index review. Hard floor: consolidated EBITDA **≥ $800M** at every gate.`,

  'autonomous-packaging': `## Autonomous Packaging — Board Action Plan

**Executive summary:** Live simulator telemetry has been compiled across all seven business units. STRATIVY BRAIN recommends an **autonomous capital package** — three executable moves that resolve the top ecosystem bottlenecks while preserving the **$800M EBITDA** covenant.

### Telemetry bundle ingested
- **Group revenue:** $2,450M | **EBITDA:** ~$865M | **ESG:** 72/100
- **Risk exposure:** 58/100 (moderate-high, driven by O&G weighting)
- **Active friction:** Wind Phase 3 procurement block · Property landbank vs. express logistics · O&G carbon liability

### Packaged actions (execute in sequence)

**Action 1 — STRATIVY BRAIN Strategic Reallocation**
Transfer **$15M** from Commercial Property landbank acquisition to Offshore Wind Phase 3 express logistics. Resolves **40 days** of turbine procurement delay; preserves consolidated EBITDA trajectory.

**Action 2 — Cross-sector green loop**
Deploy **$10M** from Oil & Gas transition reserve to hotel rooftop solar + agriculture cold-chain ESG certification. Internal food-supply SLA improves; Hospitality margin +1.8 pts.

**Action 3 — Grid automation deploy**
Allocate **$8M** Innovation capex to Ecosystem STRATIVY BRAIN Process Automation v2 — grid load-balancing reduces curtailment **−12%** on renewable interconnect.

### Projected outcomes (12-month horizon)
| Metric | Current | Post-package |
|--------|---------|--------------|
| Consolidated EBITDA | ~$865M | **~$858M** |
| Group ESG | 72/100 | **76/100** |
| Risk exposure | 58/100 | **52/100** |
| Wind Phase 3 delay | 40 days | **0 days** |

### Board resolution text (ready to adopt)
> *"The Board authorises the Autonomous Packaging reallocation of $33M across Property, Renewables, O&G transition reserve, and Innovation — subject to monthly EBITDA floor monitoring at $800M and quarterly ESG index verification."*

**Next step:** Execute Action 1 via the Project Monitor reallocation panel to unlock expedited shipping logs immediately.`,

  'custom-esg-reallocation': `## Ecosystem Bottleneck Analysis & Capital Reallocation Plan

**Executive summary:** The holding faces three simultaneous bottlenecks — **wind procurement delay**, **O&G carbon drag**, and **Property capital lock-up** — that cap ESG upside. A **$68M** targeted reallocation can lift group ESG from **72 → 77/100** while holding consolidated EBITDA at **~$812M** (above the **$800M** board floor).

### Bottleneck diagnosis

**1. Renewable Power Grid — procurement choke (Critical)**
100MW Wind Phase 3 faces **40-day** deepwater turbine delays. Root cause: under-funded express logistics. Every week of delay pushes **$2.1M** of renewable EBITDA recognition to the right.

**2. Oil & Gas Exploration — carbon liability drag (High)**
At ESG **42/100** and **$280M capex**, O&G contributes 44% of group EBITDA but 61% of carbon-offset cost. Transition speed slider at mid-range leaves **$150M** of fossil capex structurally misallocated vs. grid demand.

**3. Commercial Property — capital lock-up (Moderate)**
Property holds **$210M EBITDA** at ESG **68/100**. Landbank acquisition budget exceeds near-term Hospitality lease demand; **$22M** sits idle while Hotels await green retrofit capex.

### Recommended reallocation ($68M total)

| Source | Destination | Amount | EBITDA Δ | ESG Δ |
|--------|-------------|--------|----------|-------|
| Property landbank | Wind express logistics | $15M | +$8M | +1.5 |
| O&G exploration capex | Grid interconnect | $35M | −$14M | +4.0 |
| Innovation (non-core bets) | AgriTech + aquaculture solar | $8M | +$2M | +1.2 |
| O&G transition reserve | Hotel green leases | $10M | −$3M | +0.8 |

**Net impact:** EBITDA **~$812M** (−$53M gross, +$0M from accelerated renewables) | ESG **77/100**

### Sector alignment check
- **O&G:** Remains cash generator at reduced capex; no production shut-ins.
- **Property → Hotels:** Green-lease repricing unlocks margin recovery on $480M revenue base.
- **Renewables:** Phase 3 on-time; grid automation reduces curtailment 12%.
- **Agriculture / Aquaculture:** Floating-solar integration sustains premium food-supply SLA to Hotels.

### Guardrails & monitoring
- **Hard floor:** Consolidated EBITDA ≥ **$800M** — automatic pause on further O&G capex cuts if breached for 2 consecutive months.
- **ESG target:** 77/100 by Q4; interim gate at 75/100 after Phase 1 ($15M logistics release).
- **Review cadence:** Monthly STRATIVY BRAIN telemetry sync with simulator slider positions.

### Board decision
Approve the **$68M reallocation package** in two tranches: **$15M immediate** (wind logistics) and **$53M** upon ESG gate confirmation at 74/100.`,
};

export function resolveBrainScenarioKey(prompt: string): BrainScenarioKey {
  const normalized = prompt.trim().toLowerCase();

  for (const [key, scenarioPrompt] of Object.entries(BRAIN_SCENARIO_PROMPTS) as [
    BrainScenarioKey,
    string,
  ][]) {
    if (prompt.trim() === scenarioPrompt.trim()) return key;
  }

  if (
    normalized.includes('800m') &&
    (normalized.includes('esg') || normalized.includes('bottleneck'))
  ) {
    return 'custom-esg-reallocation';
  }

  if (normalized.includes('property') && normalized.includes('hotel')) {
    return 'property-hotel-leases';
  }

  if (normalized.includes('renewable') || normalized.includes('150m')) {
    return 'oil-renewable-transition';
  }

  if (normalized.includes('carbon offset') || normalized.includes('capital return index')) {
    return 'esg-carbon-audit';
  }

  if (normalized.includes('autonomous') || normalized.includes('simulator telemetry')) {
    return 'autonomous-packaging';
  }

  return 'custom-esg-reallocation';
}

export function getStaticBrainResponse(prompt: string): string {
  const key = resolveBrainScenarioKey(prompt);
  return STATIC_RESPONSES[key];
}
