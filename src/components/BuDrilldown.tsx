/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Zap, 
  Building, 
  Briefcase, 
  Leaf, 
  Waves, 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Activity, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  FileText 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { BusinessUnit } from '../types';
import StrativyPerformance from './StrativyPerformance';
import * as ui from '../lib/uiTheme';
import { KpiCard, type KpiAccent } from './ui/KpiCard';

interface BuDrilldownProps {
  darkMode: boolean;
  simulatedBUs: Record<string, BusinessUnit>;
  selectedBU: string;
  setSelectedBU: (id: string) => void;
  flows: any[];
}

export default function BuDrilldown({
  darkMode,
  simulatedBUs,
  selectedBU,
  setSelectedBU,
  flows
}: BuDrilldownProps) {
  
  const currentBU = simulatedBUs[selectedBU];
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  const renderBUIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Flame': return <Flame id="b-icon-flame" className={className} />;
      case 'Zap': return <Zap id="b-icon-zap" className={className} />;
      case 'Building': return <Building id="b-icon-building" className={className} />;
      case 'Briefcase': return <Briefcase id="b-icon-briefcase" className={className} />;
      case 'Leaf': return <Leaf id="b-icon-leaf" className={className} />;
      case 'Waves': return <Waves id="b-icon-waves" className={className} />;
      case 'Lightbulb': return <Lightbulb id="b-icon-lightbulb" className={className} />;
      default: return <Activity id="b-icon-activity" className={className} />;
    }
  };

  // 1. Compile mock history timeline data for charts based on active simulated states
  const chartData = useMemo(() => {
    const rev = currentBU.baseRevenue;
    const ebitda = currentBU.baseEbitda;
    return [
      { month: 'Jan', Revenue: +(rev * 0.85).toFixed(1), EBITDA: +(ebitda * 0.83).toFixed(1), Margin: +((ebitda/rev)*100).toFixed(0) },
      { month: 'Feb', Revenue: +(rev * 0.90).toFixed(1), EBITDA: +(ebitda * 0.88).toFixed(1), Margin: +((ebitda/rev)*100).toFixed(0) },
      { month: 'Mar', Revenue: +(rev * 0.95).toFixed(1), EBITDA: +(ebitda * 0.94).toFixed(1), Margin: +((ebitda/rev)*100).toFixed(0) },
      { month: 'Apr', Revenue: +(rev * 1.00).toFixed(1), EBITDA: +(ebitda * 1.00).toFixed(1), Margin: +((ebitda/rev)*100).toFixed(0) },
      { month: 'May', Revenue: +(rev * 1.05).toFixed(1), EBITDA: +(ebitda * 1.03).toFixed(1), Margin: +((ebitda/rev)*100).toFixed(0) },
      { month: 'Jun', Revenue: +(rev * 1.10).toFixed(1), EBITDA: +(ebitda * 1.08).toFixed(1), Margin: +((ebitda/rev)*100).toFixed(0) }
    ];
  }, [currentBU]);

  // Upstream & Downstream relations for local synergies mapping
  const localSynergies = useMemo(() => {
    switch (selectedBU) {
      case 'hotel':
        return {
          upstream: [
            { id: 'agri', name: 'Precision Agro-Farms', contribution: 'Provides 74% of premium organic food items', esgBenefit: '+15% ESG Score Lift' },
            { id: 'prop', name: 'Commercial Property & Land', contribution: 'Owns resort real estate under master leases', esgBenefit: '+10% Asset Security' }
          ],
          downstream: [
            { id: 'consumers', name: 'Premium Retail Visitors', contribution: 'Guest feedback drives commercial tenant traffic in property nodes', esgBenefit: 'High NPS alignment' }
          ]
        };
      case 'renewableEnergy':
        return {
          upstream: [
            { id: 'og', name: 'Oil & Gas Exploration', contribution: 'Funds turbine CAPEX pipelines via traditional cashflows', esgBenefit: 'Decarbonization Offset' },
            { id: 'innov', name: 'DeepTech Venture Capital', contribution: 'Engineers neural dispatcher and smart router codes', esgBenefit: '+14% Turbine Output Gain' }
          ],
          downstream: [
            { id: 'hotel', name: 'Luxe Hospitality & Resorts', contribution: 'Supplies 100% clean power utility to oceanfront facilities', esgBenefit: '-35% Utility Cost drop' }
          ]
        };
      case 'agriculture':
        return {
          upstream: [
            { id: 'innov', name: 'DeepTech Venture Capital', contribution: 'Autonomous crop seeding software & moisture tracking', esgBenefit: '+18.2% Harvest Tonnage' }
          ],
          downstream: [
            { id: 'hotel', name: 'Luxe Hospitality & Resorts', contribution: 'Supplies certified organic inputs reducing supply constraints', esgBenefit: 'Grade-A Food safety' }
          ]
        };
      case 'oilAndGas':
        return {
          upstream: [],
          downstream: [
            { id: 're', name: 'Renewable Power Grid', contribution: 'Reinvests 25% of fossil margins into wind assemblies', esgBenefit: 'Grade-A Compliance' }
          ]
        };
      case 'property':
        return {
          upstream: [],
          downstream: [
            { id: 'hotel', name: 'Luxe Hospitality & Resorts', contribution: 'Leases structural plots generating premium recurrent cash yields', esgBenefit: 'Inflation hedge' }
          ]
        };
      case 'aquaculture':
        return {
          upstream: [
            { id: 're', name: 'Renewable Power Grid', contribution: 'Supplies clean energy to deepwater oxygen arrays', esgBenefit: '100% Carbon-Neutral seafood' }
          ],
          downstream: [
            { id: 'hotel', name: 'Luxe Hospitality & Resorts', contribution: 'Provides direct sustainable maritime logistics', esgBenefit: '-11% Food logistics opex' }
          ]
        };
      case 'innovation':
        return {
          upstream: [],
          downstream: [
            { id: 're', name: 'Renewable Power Grid', contribution: 'Deploys electric routing software core', esgBenefit: 'Optimize grid output 14%' },
            { id: 'agri', name: 'Precision Agro-Farms', contribution: 'Aggregates AgriTech automated drone seeding schedules', esgBenefit: 'Harvest output surplus' }
          ]
        };
      default:
        return { upstream: [], downstream: [] };
    }
  }, [selectedBU]);

  // Sector specific micro-telemetry metrics cards
  const sectorMicroFields = useMemo(() => {
    switch (selectedBU) {
      case 'hotel':
        return [
          { label: 'Average Daily Rate (ADR)', val: '$580 / Night', change: '+4.5%', isPos: true },
          { label: 'RevPAR', val: '$440', change: '+3.1%', isPos: true },
          { label: 'Occupancy average', val: '78.5%', change: '+5.2%', isPos: true },
          { label: 'F&B Gross Margin', val: '62.0%', change: '-1.0%', isPos: false }
        ];
      case 'renewableEnergy':
        return [
          { label: 'Wind/Solar generated', val: '430 MWh / Day', change: '+18.2%', isPos: true },
          { label: 'FiT PPA tariff rate', val: '$0.12 / kWh', change: 'Stable', isPos: true },
          { label: 'Battery storage index', val: '86.4%', change: '+12.5%', isPos: true },
          { label: 'Cabling distance', val: '46.2 km', change: 'Ongoing', isPos: true }
        ];
      case 'property':
        return [
          { label: 'Commercial Occupancy', val: '94.2%', change: '+1.5%', isPos: true },
          { label: 'Rental Gross Yield', val: '8.4%', change: '+0.5%', isPos: true },
          { label: 'Square meters rentable', val: '450K sq/m', change: '+18K newly completed', isPos: true },
          { label: 'Facility Complaints', val: '0.4%', change: '-15% SLA speed', isPos: true }
        ];
      case 'oilAndGas':
        return [
          { label: 'Production Output', val: '38,500 barrels/day', change: '-4.2% transition shift', isPos: false },
          { label: 'Refining Gross Margin', val: '42.0%', change: '-0.8%', isPos: false },
          { label: 'Safety incident count', val: '0 incidents', change: 'Clean record Q1', isPos: true },
          { label: 'CO2 intensity index', val: '78 / 100 limit', change: 'Reducing', isPos: true }
        ];
      case 'agriculture':
        return [
          { label: 'Tons per hectare average', val: '14.5 Tons / ha', change: '+18.2% code optimized', isPos: true },
          { label: 'Sourcing contract size', val: '$18.5M allocated', change: '+10.4%', isPos: true },
          { label: 'Water volume tracking', val: '0.12 Liters / kg', change: '-22% savings', isPos: true },
          { label: 'Field safety index', val: '100% compliant', change: 'Zero injuries', isPos: true }
        ];
      case 'aquaculture':
        return [
          { label: 'Wholesale Seafood rev', val: '$140.0M', change: '+18.3%', isPos: true },
          { label: 'Feed Conversion Rate', val: '1.2 FCR index', change: '-12% optimized', isPos: true },
          { label: 'Seafood Mortality average', val: '1.4%', change: 'Safe standard', isPos: true },
          { label: 'Dissolved oxygen limit', val: '6.8 mg/L', change: 'Excellent stability', isPos: true }
        ];
      case 'innovation':
        return [
          { label: 'IP Royaltiy license base', val: '$32.4M ARR', change: '+42.1%', isPos: true },
          { label: 'Software deployment cycle', val: '12 Days SLA', change: '-3 Days', isPos: true },
          { label: 'Active incubators size', val: '12 Startups', change: '+3 holdings', isPos: true },
          { label: 'Sprint cycle speed', val: '98.4%', change: 'High compliance', isPos: true }
        ];
      default:
        return [];
    }
  }, [selectedBU]);

  return (
    <div id="bu-drilldown-container" className="flex flex-col lg:flex-row gap-6">
      
      {/* 1. SECTOR SELECTOR BAR */}
      <div id="bu-selector-tabs" className={`flex flex-col gap-2 w-full lg:w-[240px] shrink-0 lg:pr-4 lg:border-r ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
        <h3 className={`font-extrabold text-[10px] tracking-widest uppercase mb-2 font-mono ${ui.label(darkMode)}`}>Business Units</h3>
        {Object.values(simulatedBUs).map((bu) => (
          <button 
            key={bu.id}
            id={`tab-bu-${bu.id}`}
            onClick={() => setSelectedBU(bu.id)}
            className={`flex items-center w-full text-left space-x-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
              selectedBU === bu.id 
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                : (darkMode ? 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300' : 'bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700')
            }`}
            type="button"
          >
            <span style={{ color: selectedBU === bu.id ? '#FFF' : bu.color }}>
              {renderBUIcon(bu.icon, "w-4 h-4")}
            </span>
            <span className="truncate">{bu.short}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-6 overflow-hidden">
        {/* 2. DENSE FIELD NUMERICS PANEL */}
        <div id="bu-microdata-cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {sectorMicroFields.map((field, idx) => {
            const accents: KpiAccent[] = ['primary', 'cyan', 'amber', 'purple'];
            const cardAccent: KpiAccent = field.isPos
              ? 'success'
              : idx === 0
                ? 'danger'
                : accents[idx % accents.length];
            return (
              <KpiCard
                key={`idx-${idx}`}
                darkMode={darkMode}
                label={field.label}
                accent={cardAccent}
                value={field.val}
                footer={
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                      field.isPos ? ui.badgePositive(darkMode) : ui.badgeNegative(darkMode)
                    }`}
                  >
                    {field.change}
                  </span>
                }
              />
            );
          })}
        </div>

      {/* 3. PERFORMANCE FORECAST CHART PANEL & DYNAMICS */}
      <div id="bu-performance-visuals" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* CHART Area 8 cols */}
        <div className={`lg:col-span-8 p-5 rounded-2xl border transition-all duration-300 ${ui.card(darkMode)} flex flex-col justify-between`}>
          <div>
            <h3 className={`font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 ${ui.value(darkMode)}`}>
              <Activity className="w-4 h-4 text-primary-500" />
              <span>Micro-Financial Performance Trails</span>
            </h3>
            <p className={`text-xs mt-1 ${ui.label(darkMode)}`}>
              Historical performance index representing active simulated revenue and EBITDA streams across the current cycle.
            </p>
          </div>

          <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradient-rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentBU.color} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={currentBU.color} stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="gradient-ebitda" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity="0.4"/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#1e293b" : "#e2e8f0"} opacity="0.3" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#475569" />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#475569" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    borderRadius: '8px', 
                    border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                    color: darkMode ? '#f8fafc' : '#0f172a'
                  }} 
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Revenue" stroke={currentBU.color} strokeWidth={2.5} fillOpacity={1} fill="url(#gradient-rev)" />
                <Area type="monotone" dataKey="EBITDA" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#gradient-ebitda)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Component C - Correlation Intelligence (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className={`p-5 rounded-2xl border transition-all duration-300 ${ui.cardInset(darkMode)} flex-1 flex flex-col justify-between`}>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                <Sparkles className="w-4 h-4 text-primary-500 animate-pulse" />
                <h4 className="text-xs font-extrabold uppercase tracking-widest font-mono">Correlation Analyzer</h4>
              </div>
              <p className={`text-[11px] leading-snug font-mono ${ui.label(darkMode)}`}>
                How does this Business Unit interact with physical parameters of other holding divisions?
              </p>

              {/* Specific correlation insights */}
              <div className="space-y-3 pt-2">
                
                {selectedBU === 'hotel' && (
                  <div className="space-y-2 text-xs">
                    <div className={`p-2.5 rounded-xl border text-xs ${ui.calloutWarning(darkMode)}`}>
                      <strong>Food Procurement SLA:</strong> Internally sourcing 74% of premium organic food items from <em>Precision Agro-Farms</em> offsets hotel culinary inflation by 11.4%.
                    </div>
                    <div className={`p-2.5 rounded-xl border text-xs ${ui.calloutSuccess(darkMode)}`}>
                      <strong>Renewable Integration:</strong> Powering Nusadua oceanic facilities with 100% offshore turbine inputs reduced hospitality utility expenditures by 35%.
                    </div>
                  </div>
                )}

                {selectedBU === 'renewableEnergy' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-primary-50 text-primary-800 dark:bg-primary-500/10 dark:text-primary-300 border border-primary-200 dark:border-primary-500/20">
                      <strong>Fossil transition correlation:</strong> Reallocating $150M fossil yield from Oil & Gas exploration has direct negative safety exposure and accelerates project commission schedules by 45 calendar days.
                    </div>
                    <div className={`p-2.5 rounded-xl border text-xs ${darkMode ? 'bg-primary-500/10 text-primary-300 border-primary-500/20' : 'bg-primary-50 text-primary-800 border-primary-200'}`}>
                      <strong>Neural Router R&D:</strong> Deploys electric code route optimization from Innovation lab VC, which directly expands physical turbine efficiency by 14.0%.
                    </div>
                  </div>
                )}

                {selectedBU !== 'hotel' && selectedBU !== 'renewableEnergy' && (
                  <div className="space-y-2 text-xs">
                    <div className={`p-2.5 rounded-xl border text-xs ${ui.calloutPrimary(darkMode)}`}>
                      <strong>Ecosystem automation sync:</strong> High-velocity software adoption improves physical capacity parameters by 18% group-wide.
                    </div>
                    {!auditMessage ? (
                      <button 
                        id="learn-more-synergies-btn"
                        className="text-[11px] text-primary-600 dark:text-primary-400 hover:underline inline-block font-extrabold"
                        onClick={() => setAuditMessage("Strategic link verified. Synergy output yields +12.4% EBITDA return on initial investment.")}
                        type="button"
                      >
                        Audit detailed ecosystem synergy linkages ➔
                      </button>
                    ) : (
                      <div className={`p-3 rounded-xl border mt-2 font-mono ${ui.calloutSuccess(darkMode)}`}>
                        💡 {auditMessage}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            <div className={`mt-4 p-3 rounded-xl border text-[10px] leading-relaxed ${ui.calloutPrimary(darkMode)}`}>
              <strong>Interactive Intelligence:</strong> All coefficients on this correlation board correspond to active slider scenarios selected on Level 1.
            </div>

          </div>
        </div>

      </div>

      {/* 4. LOCAL ECOSYSTEM SYNERGIES DIAGRAM SECTION */}
      <div id="local-synergies-view" className={`p-5 rounded-2xl border shadow-sm ${ui.card(darkMode)}`}>
        <div className={`border-b pb-3 mb-4 text-left ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <h3 className={`font-bold text-sm uppercase tracking-wider flex items-center space-x-2 ${ui.value(darkMode)}`}>
            <Coins className="w-4 h-4 text-primary-500" />
            <span>Interactive Multi-Sector Contract Flows</span>
          </h3>
          <p className={`text-xs ${ui.label(darkMode)}`}>Evaluating upstream suppliers and downstream buyers of the {currentBU.short} division.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          {/* Supplier Upstream */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 flex items-center space-x-1">
              <span>Upstream Suppliers</span>
            </h4>
            {localSynergies.upstream.length > 0 ? (
              <div className="space-y-2.5">
                {localSynergies.upstream.map((item, id) => (
                  <div key={`upstream-${id}`} className={`p-3 rounded-xl border flex justify-between items-center gap-3 ${ui.cardInset(darkMode)}`}>
                    <div className="min-w-0">
                      <span className={`block text-xs font-bold ${ui.value(darkMode)}`}>{item.name}</span>
                      <span className={`block text-[10px] mt-0.5 ${ui.label(darkMode)}`}>{item.contribution}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono shrink-0 ${ui.badgePositive(darkMode)}`}>{item.esgBenefit}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-4 rounded-xl border border-dashed text-center text-xs ${darkMode ? 'border-neutral-700 text-neutral-500' : 'border-neutral-300 text-neutral-600'}`}>
                No direct vertical upstream dependencies mapped in holding ledger.
              </div>
            )}
          </div>

          {/* Supplier Downstream */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-warning-600 dark:text-warning-400 flex items-center space-x-1">
              <span>Downstream Buyers</span>
            </h4>
            {localSynergies.downstream.length > 0 ? (
              <div className="space-y-2.5">
                {localSynergies.downstream.map((item, id) => (
                  <div key={`downstream-${id}`} className={`p-3 rounded-xl border flex justify-between items-center gap-3 ${ui.cardInset(darkMode)}`}>
                    <div className="min-w-0">
                      <span className={`block text-xs font-bold ${ui.value(darkMode)}`}>{item.name}</span>
                      <span className={`block text-[10px] mt-0.5 ${ui.label(darkMode)}`}>{item.contribution}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono shrink-0 ${darkMode ? 'bg-primary-500/15 text-primary-400' : 'bg-primary-50 text-primary-700'}`}>{item.esgBenefit}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-4 rounded-xl border border-dashed text-center text-xs ${darkMode ? 'border-neutral-700 text-neutral-500' : 'border-neutral-300 text-neutral-600'}`}>
                No direct vertical downstream flows mapped in holding ledger.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 5. STRATIVY PERFORMANCE DATA */}
      <StrativyPerformance darkMode={darkMode} />

    </div>
    </div>
  );
}
