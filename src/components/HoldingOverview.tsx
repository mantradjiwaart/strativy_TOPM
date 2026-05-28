/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Coins, 
  BarChart3, 
  Layers, 
  ShieldAlert, 
  Leaf, 
  Compass, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  Sliders, 
  RefreshCw, 
  Flame, 
  Zap, 
  Building, 
  Briefcase, 
  Waves, 
  Lightbulb, 
  Info, 
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { BusinessUnit, DependencyFlow, GroupMetrics } from '../types';

interface HoldingOverviewProps {
  darkMode: boolean;
  simulatedBUs: Record<string, BusinessUnit>;
  groupMetrics: GroupMetrics;
  selectedBU: string;
  setSelectedBU: (id: string) => void;
  flows: DependencyFlow[];
  oilTransitionSpeed: number;
  setOilTransitionSpeed: (v: number) => void;
  propertyExpansionRate: number;
  setPropertyExpansionRate: (v: number) => void;
  esgInvestmentFactor: number;
  setEsgInvestmentFactor: (v: number) => void;
  techAdoptionRate: number;
  setTechAdoptionRate: (v: number) => void;
  setActiveTab: (t: string) => void;
}

export default function HoldingOverview({
  darkMode,
  simulatedBUs,
  groupMetrics,
  selectedBU,
  setSelectedBU,
  flows,
  oilTransitionSpeed,
  setOilTransitionSpeed,
  propertyExpansionRate,
  setPropertyExpansionRate,
  esgInvestmentFactor,
  setEsgInvestmentFactor,
  techAdoptionRate,
  setTechAdoptionRate,
  setActiveTab
}: HoldingOverviewProps) {
  const [selectedFlow, setSelectedFlow] = useState<DependencyFlow | null>(null);

  const renderBUIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Flame': return <Flame id="icon-flame" className={className} />;
      case 'Zap': return <Zap id="icon-zap" className={className} />;
      case 'Building': return <Building id="icon-building" className={className} />;
      case 'Briefcase': return <Briefcase id="icon-briefcase" className={className} />;
      case 'Leaf': return <Leaf id="icon-leaf" className={className} />;
      case 'Waves': return <Waves id="icon-waves" className={className} />;
      case 'Lightbulb': return <Lightbulb id="icon-lightbulb" className={className} />;
      default: return <Activity id="icon-activity" className={className} />;
    }
  };

  const selectedBUData = simulatedBUs[selectedBU];

  return (
    <div id="holding-overview-container" className="space-y-6">
      
      {/* 1. OVERVIEW GRID METRICS (KPI Cards Grid) */}
      <div id="holding-kpis-grid" className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div id="kpi-card-1" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Total Revenue</span>
            <div className="p-1.5 rounded bg-blue-500/10 text-blue-500"><DollarSign className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">${groupMetrics.totalRevenue}M</span>
            <span className="flex items-center text-[10px] text-emerald-500 mt-1.5 font-bold font-mono">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.4% YoY
            </span>
          </div>
        </div>

        <div id="kpi-card-2" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">EBITDA</span>
            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-500"><Coins className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-emerald-500">${groupMetrics.ebitda}M</span>
            <span className="block text-[10px] text-zinc-400 mt-1.5 font-mono">
              Margin: <span className="font-extrabold text-emerald-500">{((parseFloat(groupMetrics.ebitda) / parseFloat(groupMetrics.totalRevenue)) * 100).toFixed(0)}%</span>
            </span>
          </div>
        </div>

        <div id="kpi-card-3" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Net Profit</span>
            <div className="p-1.5 rounded bg-teal-500/10 text-teal-500"><BarChart3 className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-teal-500">${groupMetrics.netProfit}M</span>
            <span className="flex items-center text-[10px] text-emerald-500 mt-1.5 font-bold font-mono">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +8.2% vs target
            </span>
          </div>
        </div>

        <div id="kpi-card-4" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Cash Position</span>
            <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-500"><Coins className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-cyan-500">${groupMetrics.cashPosition}M</span>
            <span className="block text-[10px] text-zinc-400 mt-1.5 font-mono">High reserves liquidity</span>
          </div>
        </div>

        <div id="kpi-card-5" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Asset Valuation</span>
            <div className="p-1.5 rounded bg-purple-500/10 text-purple-500"><Layers className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-purple-500">${groupMetrics.assetValuation}B</span>
            <span className="block text-[10px] text-purple-500 mt-1.5 font-mono">Revalued current cycle</span>
          </div>
        </div>

        <div id="kpi-card-6" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">CAPEX Spend</span>
            <div className="p-1.5 rounded bg-amber-500/10 text-amber-500"><TrendingDown className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-amber-500">${groupMetrics.capex}M</span>
            <span className="block text-[10px] text-zinc-400 mt-1.5 font-mono">
              Budget: <span className="font-semibold text-zinc-400">${groupMetrics.capexBudget}M</span>
            </span>
          </div>
        </div>

        <div id="kpi-card-7" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Ops Efficiency</span>
            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-500"><Activity className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-emerald-500">{groupMetrics.operationalEfficiency}%</span>
            <span className="block text-[10px] text-emerald-500 mt-1.5 font-bold font-mono">
              Automation: {techAdoptionRate}%
            </span>
          </div>
        </div>

        <div id="kpi-card-8" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Weighted ESG</span>
            <div className="p-1.5 rounded bg-green-500/10 text-green-500"><Leaf className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-green-500">{groupMetrics.esgScore}/100</span>
            <span className="block text-[10px] mt-1.5 text-green-500 font-bold font-mono">
              {groupMetrics.esgScore >= 75 ? 'Grade A compliance' : 'Grade B compliance'}
            </span>
          </div>
        </div>

        <div id="kpi-card-9" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Portfolio Growth</span>
            <div className="p-1.5 rounded bg-pink-500/10 text-pink-500"><Compass className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-pink-500">{groupMetrics.portfolioGrowth}%</span>
            <span className="block text-[10px] text-zinc-400 mt-1.5 font-mono">Composite yield</span>
          </div>
        </div>

        <div id="kpi-card-10" className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Risk Exposure</span>
            <div className="p-1.5 rounded bg-rose-500/10 text-rose-500"><ShieldAlert className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-black tracking-tight text-rose-500">{groupMetrics.riskExposure}/100</span>
            <span className={`block text-[10px] mt-1.5 font-bold font-mono ${groupMetrics.riskExposure > 60 ? 'text-rose-500' : 'text-amber-500'}`}>
              {groupMetrics.riskExposure > 60 ? 'MODERATE HIGH' : 'SAFE INDEX'}
            </span>
          </div>
        </div>

      </div>

      {/* 2. DUAL COLUMN: SIMULATORS & NETWORK PULSE */}
      <div id="simulators-and-map-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scenario Selectors Sidebar (4 Cols) */}
        <div id="scenarios-telemetry-panel" className="lg:col-span-4 space-y-6">
          
          <div id="scenario-simulator-card" className={`p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Executive Scenario Sliders</h3>
              </div>
              <button 
                id="reset-simulator-btn"
                onClick={() => {
                  setOilTransitionSpeed(50);
                  setPropertyExpansionRate(40);
                  setEsgInvestmentFactor(60);
                  setTechAdoptionRate(50);
                }}
                className="text-[10px] px-2 py-1 bg-indigo-505/10 text-indigo-400 hover:bg-indigo-500/15 rounded border border-indigo-500/20 transition-all flex items-center space-x-1"
                title="Reset Sliders"
                type="button"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-6">
              Adjust sliders dynamically to simulate portfolio stress levels. Strategic allocations automatically scale map nodes and cash distributions below.
            </p>

            <div className="space-y-6">
              
              {/* Slider 1 */}
              <div id="slider-transition-container" className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>O&G energy transition speed</span>
                  <span className="text-amber-400 font-bold">{oilTransitionSpeed}% Speed</span>
                </div>
                <input 
                  id="oil-transition-slider"
                  type="range" 
                  min="10" 
                  max="100" 
                  value={oilTransitionSpeed} 
                  onChange={(e) => setOilTransitionSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-750 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[9px] text-gray-450">
                  <span>Yield Retention</span>
                  <span>Grid Transition</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div id="slider-property-container" className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Hospitality & property expansion</span>
                  <span className="text-indigo-400 font-bold">{propertyExpansionRate}% Velocity</span>
                </div>
                <input 
                  id="property-expansion-slider"
                  type="range" 
                  min="10" 
                  max="100" 
                  value={propertyExpansionRate} 
                  onChange={(e) => setPropertyExpansionRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-750 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[9px] text-gray-450">
                  <span>Capital Preservation</span>
                  <span>Rapid Landbank</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div id="slider-esg-container" className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Carbon-Offset investments</span>
                  <span className="text-emerald-400 font-bold">{esgInvestmentFactor}% Alloc.</span>
                </div>
                <input 
                  id="esg-investment-slider"
                  type="range" 
                  min="20" 
                  max="100" 
                  value={esgInvestmentFactor} 
                  onChange={(e) => setEsgInvestmentFactor(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-750 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[9px] text-gray-450">
                  <span>Sovereign Mandate</span>
                  <span>Carbon-Neutral</span>
                </div>
              </div>

              {/* Slider 4 */}
              <div id="slider-tech-container" className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>DeepTech automation index</span>
                  <span className="text-purple-400 font-bold">{techAdoptionRate}% Adoption</span>
                </div>
                <input 
                  id="tech-adoption-slider"
                  type="range" 
                  min="10" 
                  max="100" 
                  value={techAdoptionRate} 
                  onChange={(e) => setTechAdoptionRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-750 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[9px] text-gray-450">
                  <span>Manual Operations</span>
                  <span>Ecosystem Smart Core</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sector HUD Telemetry display */}
          <div id="sector-hud-card" className={`p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/60 border-zinc-805 bg-gradient-to-br from-zinc-900/70 to-zinc-950/40 border-zinc-800' : 'bg-blue-50/40 border-blue-100'} shadow-sm`}>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
              {renderBUIcon(selectedBUData.icon, "w-5 h-5")}
              <h4 className="font-extrabold text-xs uppercase tracking-widest font-mono">Sector HUD Telemetry</h4>
            </div>
            <h3 className="text-lg font-black tracking-tight">{selectedBUData.name} ({selectedBUData.short})</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-mono">{selectedBUData.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-left">
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-extrabold font-mono tracking-wider">Simulated Revenue</span>
                <span className="text-base font-black tracking-tight text-blue-600 dark:text-blue-450">${selectedBUData.baseRevenue.toFixed(1)}M</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-extrabold font-mono tracking-wider">Simulated EBITDA</span>
                <span className={`text-base font-black tracking-tight ${selectedBUData.baseEbitda >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  ${selectedBUData.baseEbitda.toFixed(1)}M
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-extrabold font-mono tracking-wider">ESG Rating Score</span>
                <span className="text-sm font-black text-green-500 font-mono">{selectedBUData.esgScore}/100</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase font-extrabold font-mono tracking-wider">Portfolio Risk</span>
                <span className="text-sm font-black text-rose-500 font-mono">{selectedBUData.riskIndex}/100</span>
              </div>
            </div>

            {selectedBUData.riskIndex > 65 && (
              <div id="crit-exposure-warning" className="mt-4 p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-[10px] leading-snug font-mono">
                  <strong>Critical Exposure warning:</strong> High portfolio risk detected. Board recommends immediate asset hedge.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Network Map Visual (8 Cols) */}
        <div id="network-pulse-map-panel" className="lg:col-span-8 flex flex-col space-y-4">
          <div className={`p-5 rounded-2xl border flex-1 flex flex-col justify-between transition-all duration-300 ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block animate-ping"></span>
                  <span>Ecosystem Pulse Map</span>
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'}`}>
                  Vector coordinates grid (800 x 480)
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Scalable coordinate mapping showing cross-sector dependencies. Node radius scales with simulated revenue contribution. Click on a node to update the slider telemetry HUD.
              </p>
            </div>

            {/* SVG STAGE */}
            <div id="svg-map-stage" className={`relative w-full aspect-[8/5] border rounded-2xl overflow-hidden ${darkMode ? 'bg-zinc-950 border-zinc-805 border-zinc-800' : 'bg-zinc-100/50 border-zinc-200'}`}>
              <svg viewBox="0 0 800 480" className="w-full h-full">
                <defs>
                  {/* Glowing Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Gradient paths */}
                  <linearGradient id="g-agri-hotel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#84CC16" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="g-prop-hotel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="g-oil-re" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="g-innov-re" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="g-innov-agri" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#84CC16" />
                  </linearGradient>
                </defs>

                {/* Coordinate Grid lines */}
                <g opacity="0.10">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line key={`val-v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="480" stroke="#475569" strokeWidth="1" />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`val-h-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#475569" strokeWidth="1" />
                  ))}
                </g>

                {/* CONNECTION LINES (INTERPLAY) */}
                {flows.map((flow, i) => {
                  let pathD = "";
                  let grad = "";
                  
                  if (flow.from === 'agriculture' && flow.to === 'hotel') {
                    pathD = "M 680,260 Q 560,280 440,290";
                    grad = "url(#g-agri-hotel)";
                  } else if (flow.from === 'property' && flow.to === 'hotel') {
                    pathD = "M 580,180 Q 510,230 440,290";
                    grad = "url(#g-prop-hotel)";
                  } else if (flow.from === 'oilAndGas' && flow.to === 'renewableEnergy') {
                    pathD = "M 180,140 Q 150,230 200,340";
                    grad = "url(#g-oil-re)";
                  } else if (flow.from === 'innovation' && flow.to === 'renewableEnergy') {
                    pathD = "M 380,240 Q 290,290 200,340";
                    grad = "url(#g-innov-re)";
                  } else if (flow.from === 'innovation' && flow.to === 'agriculture') {
                    pathD = "M 380,240 Q 530,250 680,260";
                    grad = "url(#g-innov-agri)";
                  }

                  if (!pathD) return null;

                  return (
                    <path 
                      key={`flow-path-${i}`}
                      d={pathD} 
                      fill="none" 
                      stroke={grad} 
                      strokeWidth={selectedFlow?.from === flow.from && selectedFlow?.to === flow.to ? "6" : "3.5"} 
                      strokeDasharray={flow.from === 'agriculture' ? "8,4" : undefined}
                      className="cursor-pointer hover:stroke-white transition-all duration-200"
                      onClick={() => setSelectedFlow(flow)}
                    />
                  );
                })}

                {/* LIVING NODES CIRCLES */}
                
                {/* 1. Oil & Gas (180, 140) */}
                <g transform="translate(180,140)" className="cursor-pointer group" onClick={() => setSelectedBU('oilAndGas')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.oilAndGas.baseRevenue / 18))} 
                    fill="#F59E0B" 
                    fillOpacity={selectedBU === 'oilAndGas' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'oilAndGas' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">O&G</text>
                  <text y={Math.max(30, (simulatedBUs.oilAndGas.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.oilAndGas.baseRevenue.toFixed(0)}M
                  </text>
                </g>

                {/* 2. Renewables (200, 340) */}
                <g transform="translate(200,340)" className="cursor-pointer group" onClick={() => setSelectedBU('renewableEnergy')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.renewableEnergy.baseRevenue / 18))} 
                    fill="#10B981" 
                    fillOpacity={selectedBU === 'renewableEnergy' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'renewableEnergy' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">RE</text>
                  <text y={Math.max(30, (simulatedBUs.renewableEnergy.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.renewableEnergy.baseRevenue.toFixed(0)}M
                  </text>
                </g>

                {/* 3. Property (580, 180) */}
                <g transform="translate(580,180)" className="cursor-pointer group" onClick={() => setSelectedBU('property')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.property.baseRevenue / 18))} 
                    fill="#6366F1" 
                    fillOpacity={selectedBU === 'property' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'property' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">PROP</text>
                  <text y={Math.max(30, (simulatedBUs.property.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.property.baseRevenue.toFixed(0)}M
                  </text>
                </g>

                {/* 4. Hotel (440, 290) */}
                <g transform="translate(440,290)" className="cursor-pointer group" onClick={() => setSelectedBU('hotel')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.hotel.baseRevenue / 18))} 
                    fill="#EC4899" 
                    fillOpacity={selectedBU === 'hotel' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'hotel' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">HTL</text>
                  <text y={Math.max(30, (simulatedBUs.hotel.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.hotel.baseRevenue.toFixed(0)}M
                  </text>
                </g>

                {/* 5. Agriculture (680, 260) */}
                <g transform="translate(680,260)" className="cursor-pointer group" onClick={() => setSelectedBU('agriculture')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.agriculture.baseRevenue / 18))} 
                    fill="#84CC16" 
                    fillOpacity={selectedBU === 'agriculture' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'agriculture' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">AGRI</text>
                  <text y={Math.max(30, (simulatedBUs.agriculture.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.agriculture.baseRevenue.toFixed(0)}M
                  </text>
                </g>

                {/* 6. Aquaculture (660, 390) */}
                <g transform="translate(660,390)" className="cursor-pointer group" onClick={() => setSelectedBU('aquaculture')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.aquaculture.baseRevenue / 18))} 
                    fill="#06B6D4" 
                    fillOpacity={selectedBU === 'aquaculture' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'aquaculture' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">AQUA</text>
                  <text y={Math.max(30, (simulatedBUs.aquaculture.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.aquaculture.baseRevenue.toFixed(0)}M
                  </text>
                </g>

                {/* 7. Innovation / Tech (380, 240) */}
                <g transform="translate(380,240)" className="cursor-pointer group" onClick={() => setSelectedBU('innovation')}>
                  <circle 
                    r={Math.max(25, (simulatedBUs.innovation.baseRevenue / 18))} 
                    fill="#A855F7" 
                    fillOpacity={selectedBU === 'innovation' ? "0.95" : "0.75"} 
                    stroke={selectedBU === 'innovation' ? "#FFF" : "none"}
                    strokeWidth="3.5"
                    filter="url(#glow)"
                  />
                  <text y="4" textAnchor="middle" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold" className="select-none pointer-events-none">TECH</text>
                  <text y={Math.max(30, (simulatedBUs.innovation.baseRevenue / 18) + 14)} textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="bold">
                    ${simulatedBUs.innovation.baseRevenue.toFixed(0)}M
                  </text>
                </g>
              </svg>

               <div id="coordinate-legend" className={`absolute bottom-3 left-3 border p-2 rounded-xl text-[9px] space-y-1 font-mono ${darkMode ? 'bg-zinc-950/95 border-zinc-800 text-zinc-300' : 'bg-white/95 border-zinc-200 text-zinc-700'}`}>
                <div className="font-extrabold text-zinc-400 mb-0.5">Scenographic Mapping Coordinates</div>
                <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> <span>O&G Node: (180, 140)</span></div>
                <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> <span>Renewable Node: (200, 340)</span></div>
                <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> <span>Property Node: (580, 180)</span></div>
              </div>
            </div>

            {/* FLOW EXPANDED READOUT */}
            {selectedFlow ? (
              <div id="flow-connection-readout" className="p-3.5 rounded-xl bg-blue-600/10 border border-blue-500/25 flex justify-between items-start text-left font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-blue-555 dark:text-blue-400">Dependency Integration SLA</div>
                  <div className="text-sm font-black text-zinc-800 dark:text-white flex items-center">
                    <span>{simulatedBUs[selectedFlow.from]?.short}</span>
                    <ChevronRight className="w-4 h-4 mx-1 text-blue-500" />
                    <span>{simulatedBUs[selectedFlow.to]?.short}</span>
                    <span className="ml-2 text-xs bg-blue-500/10 px-1.5 py-0.5 rounded text-blue-650 dark:text-blue-400">{selectedFlow.type}</span>
                  </div>
                  <p className="text-xs text-zinc-650 dark:text-zinc-300">{selectedFlow.text}</p>
                  <p className="text-xs text-emerald-500 font-bold">{selectedFlow.metric}</p>
                </div>
                <button 
                  id="close-flow-details-btn"
                  onClick={() => setSelectedFlow(null)}
                  className="text-xs text-zinc-450 hover:text-zinc-100 transition-colors"
                  type="button"
                >
                  Close
                </button>
              </div>
            ) : (
              <div id="flow-hint-slate" className={`p-3.5 rounded-xl border border-dashed text-center text-xs font-mono ${darkMode ? 'border-zinc-805 text-zinc-400' : 'border-zinc-200 text-zinc-500'}`}>
                💡 Hint: Click on any colored bezier connection vector on the map to evaluate flow SLAs and ESG dependencies.
              </div>
            )}

          </div>
        </div>

      </div>

      {/* 3. SANKEY CAPITAL DISTRIBUTION SECTION */}
      <div id="money-flow-sankey-panel" className={`p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm text-left`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Coins className="w-5 h-5" />
              <h3 className="font-extrabold text-base">The Capital Distribution Sankey</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Visualizes how aggregate holding capital (Sources) flows into the sector business units, and then streams out into destinations.
            </p>
          </div>
          <button 
            id="redirect-to-capex-btn"
            onClick={() => setActiveTab('capex')}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 font-bold"
            type="button"
          >
            <span>Monitor Capex projects ➔</span>
          </button>
        </div>

        <div id="sankey-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div id="sankey-svg-holder" className={`lg:col-span-9 rounded-2xl p-4 overflow-x-auto relative border ${darkMode ? 'bg-zinc-950 border-zinc-850' : 'bg-zinc-100/60 border-zinc-200'}`}>
            <div className="min-w-[800px]">
              
              <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 px-6 font-mono">
                <span>1. Funding Pools (Sources)</span>
                <span>2. Ecosystem Business Units</span>
                <span>3. Allocation Destination</span>
              </div>

              <svg viewBox="0 0 1000 460" className="w-full h-auto">
                <defs>
                  <linearGradient id="g-flow-s-og" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="g-flow-s-prop" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="g-flow-s-re" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F472B6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                  </linearGradient>
                  
                  <linearGradient id="g-flow-og-cap" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="g-flow-re-sust" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="g-flow-prop-growth" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Grid Background marker */}
                <g opacity="0.08">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`lh-${i}`} x1="0" y1={i * 25} x2="1000" y2={i * 25} stroke="#475569" strokeWidth="1" />
                  ))}
                </g>

                {/* COL 1: Sources */}
                <g transform="translate(30, 20)">
                  {/* Revenue */}
                  <rect x="0" y="5" width="10" height="130" fill="#818CF8" rx="2" />
                  <text x="18" y="50" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Holding Revenue</text>
                  <text x="18" y="65" fill="#818CF8" fontSize="10" fontWeight="mono">${groupMetrics.totalRevenue}M</text>

                  {/* External Invest */}
                  <rect x="0" y="155" width="10" height="70" fill="#34D399" rx="2" />
                  <text x="18" y="185" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">External Funds</text>
                  <text x="18" y="200" fill="#34D399" fontSize="10" fontWeight="mono">$350.0M</text>

                  {/* Debt Financing */}
                  <rect x="0" y="245" width="10" height="60" fill="#F472B6" rx="2" />
                  <text x="18" y="270" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Debt Finance</text>
                  <text x="18" y="285" fill="#F472B6" fontSize="10" fontWeight="mono">$220.0M</text>

                  {/* Internal reserves */}
                  <rect x="0" y="325" width="10" height="50" fill="#A78BFA" rx="2" />
                  <text x="18" y="350" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Retained Reserves</text>
                  <text x="18" y="365" fill="#A78BFA" fontSize="10" fontWeight="mono">$150.0M</text>
                </g>

                {/* Bezier Ribbons - Left Side */}
                <path d="M 40,85 C 230,85 230,65 420,65" fill="none" stroke="url(#g-flow-s-og)" strokeWidth="35" />
                <path d="M 40,120 C 230,120 230,145 420,145" fill="none" stroke="url(#g-flow-s-prop)" strokeWidth="25" />
                <path d="M 40,180 C 230,180 230,225 420,225" fill="none" stroke="url(#g-flow-s-re)" strokeWidth="30" />
                <path d="M 40,270 C 230,270 230,305 420,305" fill="none" stroke="url(#g-flow-s-prop)" strokeWidth="18" />

                {/* COL 2: Business Units */}
                <g transform="translate(420, 20)">
                  {/* Oil & Gas */}
                  <rect x="0" y="10" width="10" height="70" fill="#F59E0B" rx="2" />
                  <text x="16" y="38" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">O&G Extraction</text>
                  <text x="16" y="52" fill="#F59E0B" fontSize="10" fontWeight="mono">${simulatedBUs.oilAndGas.baseRevenue.toFixed(0)}M</text>

                  {/* Property */}
                  <rect x="0" y="100" width="10" height="60" fill="#6366F1" rx="2" />
                  <text x="16" y="125" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Property & Leases</text>
                  <text x="16" y="138" fill="#6366F1" fontSize="10" fontWeight="mono">${simulatedBUs.property.baseRevenue.toFixed(0)}M</text>

                  {/* Renewables */}
                  <rect x="0" y="180" width="10" height="70" fill="#10B981" rx="2" />
                  <text x="16" y="205" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Renewables Grid</text>
                  <text x="16" y="218" fill="#10B981" fontSize="10" fontWeight="mono">${simulatedBUs.renewableEnergy.baseRevenue.toFixed(0)}M</text>

                  {/* Hotels */}
                  <rect x="0" y="270" width="10" height="50" fill="#EC4899" rx="2" />
                  <text x="16" y="295" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Luxe Hotels</text>
                  <text x="16" y="308" fill="#EC4899" fontSize="10" fontWeight="mono">${simulatedBUs.hotel.baseRevenue.toFixed(0)}M</text>

                  {/* Agri & Aquaculture & Tech */}
                  <rect x="0" y="340" width="10" height="55" fill="#84CC16" rx="2" />
                  <text x="16" y="365" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Other Sectors</text>
                  <text x="16" y="378" fill="#84CC16" fontSize="9" fontWeight="mono">Agri/Aqua/VC</text>
                </g>

                {/* Bezier Ribbons - Right Side */}
                <path d="M 430,45 C 650,45 650,175 840,175" fill="none" stroke="url(#g-flow-og-cap)" strokeWidth="32" />
                <path d="M 430,215 C 650,215 650,375 840,375" fill="none" stroke="url(#g-flow-re-sust)" strokeWidth="28" />
                <path d="M 430,130 C 650,130 650,275 840,275" fill="none" stroke="url(#g-flow-prop-growth)" strokeWidth="22" />

                {/* COL 3: Destinations */}
                <g transform="translate(840, 20)">
                  {/* Operations */}
                  <rect x="0" y="5" width="10" height="110" fill="#F43F5E" rx="2" />
                  <text x="16" y="45" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Operational Opex</text>
                  <text x="16" y="60" fill="#F43F5E" fontSize="10" fontWeight="mono">$580.0M</text>

                  {/* CAPEX Projects */}
                  <rect x="0" y="130" width="10" height="90" fill="#3B82F6" rx="2" />
                  <text x="16" y="165" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Strategic Capex</text>
                  <text x="16" y="180" fill="#3B82F6" fontSize="10" fontWeight="mono">${groupMetrics.capex}M</text>

                  {/* Growth / Acquisitions */}
                  <rect x="0" y="235" width="10" height="70" fill="#EC4899" rx="2" />
                  <text x="16" y="260" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">Portfolio M&A</text>
                  <text x="16" y="275" fill="#EC4899" fontSize="10" fontWeight="mono">$290.0M</text>

                  {/* ESG Compliance */}
                  <rect x="0" y="320" width="10" height="85" fill="#10B981" rx="2" />
                  <text x="16" y="350" fill={darkMode ? "#FFFFFF" : "#18181B"} fontSize="11" fontWeight="bold">ESG Carbon Offset</text>
                  <text x="16" y="365" fill="#10B981" fontSize="10" fontWeight="mono">${(100 + (esgInvestmentFactor * 1.5)).toFixed(0)}M</text>
                </g>

              </svg>

            </div>
          </div>

          {/* Sidebar Capital consumption */}
          <div id="capital-consumption-sidebar" className="lg:col-span-3 space-y-4">
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/45 border-zinc-800' : 'bg-white border-zinc-200'} space-y-4 text-left`}>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <BarChart3 className="w-4 h-4" />
                <h4 className="text-xs font-extrabold uppercase tracking-widest font-mono">Capital Consumption</h4>
              </div>

              <p className="text-[11px] text-gray-400 leading-snug">
                Real-time mapping of capital consumption (Capex allocated) against direct sector EBITDA income.
              </p>

              <div className="space-y-3.5">
                
                {/* Item 1 */}
                <div id="consumption-item-1" className={`p-2 rounded-xl border ${darkMode ? 'bg-zinc-950/85 border-zinc-850' : 'bg-zinc-100/30 border-zinc-200'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-amber-500">O&G Extraction</span>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">Yield Ratio: 1.3</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-amber-500 h-full" style={{ width: `${(simulatedBUs.oilAndGas.baseEbitda / simulatedBUs.oilAndGas.baseCapex * 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-450 mt-1 font-mono">
                    <span>CAPEX: ${simulatedBUs.oilAndGas.baseCapex.toFixed(0)}M</span>
                    <span>EBITDA: ${simulatedBUs.oilAndGas.baseEbitda.toFixed(0)}M</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div id="consumption-item-2" className={`p-2 rounded-xl border ${darkMode ? 'bg-zinc-950/85 border-zinc-850' : 'bg-zinc-100/30 border-zinc-200'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-emerald-500">Renewables Power</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">Yield Ratio: 0.4</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(simulatedBUs.renewableEnergy.baseEbitda / simulatedBUs.renewableEnergy.baseCapex * 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-450 mt-1 font-mono">
                    <span>CAPEX: ${simulatedBUs.renewableEnergy.baseCapex.toFixed(0)}M</span>
                    <span>EBITDA: ${simulatedBUs.renewableEnergy.baseEbitda.toFixed(0)}M</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div id="consumption-item-3" className={`p-2 rounded-xl border ${darkMode ? 'bg-zinc-950/85 border-zinc-850' : 'bg-zinc-100/30 border-zinc-200'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-indigo-500">Property & Land</span>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">Yield Ratio: 1.4</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-indigo-500 h-full" style={{ width: `${(simulatedBUs.property.baseEbitda / simulatedBUs.property.baseCapex * 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-450 mt-1 font-mono">
                    <span>CAPEX: ${simulatedBUs.property.baseCapex.toFixed(0)}M</span>
                    <span>EBITDA: ${simulatedBUs.property.baseEbitda.toFixed(0)}M</span>
                  </div>
                </div>

              </div>

              <div className="p-3 rounded-xl bg-blue-600/10 text-blue-650 dark:text-blue-400 border border-blue-500/20 text-[10px] leading-relaxed font-mono">
                <strong>Strategic Insight:</strong> Changing the transition speed shift slider on top directly updates the Renewable and O&G ribbons shown here. Note the ROI offsets.
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 4. BUSINESS UNIT LEDGER & ESG AUDITING */}
      <div id="bu-ledger-esg-auditing" className={`p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm text-left font-mono`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Layers className="w-5 h-5" />
              <h3 className="font-extrabold text-base tracking-widest uppercase">BUSINESS UNIT LEDGER & ESG AUDITING</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Drill down into individual operational records. Click on any row to load into telemetry panels.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                <th className="py-4 px-4 font-sans">Business Unit (Sector)</th>
                <th className="py-4 px-4">Annualized Rev</th>
                <th className="py-4 px-4">EBITDA Margin</th>
                <th className="py-4 px-4">Allocated CAPEX</th>
                <th className="py-4 px-4">ESG Score</th>
                <th className="py-4 px-4">Growth %</th>
                <th className="py-4 px-4">Portfolio Risk</th>
                <th className="py-4 px-4 text-right font-sans">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
              {esgTableData.map((row) => (
                <tr 
                  key={row.id}
                  className={`group transition-all duration-300 cursor-pointer ${darkMode ? 'hover:bg-zinc-800/60' : 'hover:bg-blue-50'} hover:shadow-sm relative`}
                  onClick={() => {
                    const buMap: Record<string, string> = {
                      bu_001: 'oilAndGas',
                      bu_002: 'renewableEnergy',
                      bu_003: 'property',
                      bu_004: 'hotel',
                      bu_005: 'agriculture',
                      bu_006: 'aquaculture',
                      bu_007: 'innovation'
                    };
                    setSelectedBU(buMap[row.id] || 'oilAndGas');
                    setActiveTab('bu-performance');
                  }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <span className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'}`}>
                        {row.sector.icon === 'flame' && <Flame className="w-4 h-4" />}
                        {row.sector.icon === 'lightning' && <Zap className="w-4 h-4" />}
                        {row.sector.icon === 'building' && <Building className="w-4 h-4" />}
                        {row.sector.icon === 'suitcase' && <Briefcase className="w-4 h-4" />}
                        {row.sector.icon === 'leaf' && <Leaf className="w-4 h-4" />}
                        {row.sector.icon === 'waves' && <Waves className="w-4 h-4" />}
                        {row.sector.icon === 'lightbulb' && <Lightbulb className="w-4 h-4" />}
                      </span>
                      <span className="font-bold text-sm tracking-tight text-zinc-800 dark:text-zinc-100 font-sans">
                        {row.sector.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-zinc-800 dark:text-zinc-200">
                    ${row.annualizedRev_M.toFixed(1)}M
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded font-bold text-[10px] tracking-wider ${
                      row.ebitdaMargin.status === 'positive' 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {row.ebitdaMargin.value}%
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-zinc-800 dark:text-zinc-200">
                    ${row.allocatedCapex_M.toFixed(1)}M
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2 font-bold text-zinc-800 dark:text-zinc-200">
                      <span className={`w-2 h-2 rounded-full ${
                        row.esgScore.status === 'positive' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      <span>{row.esgScore.value}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold">
                    <span className={row.growthPercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                      {row.growthPercent >= 0 ? '+' : ''}{row.growthPercent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-rose-500 rounded-full" 
                          style={{ width: `${row.portfolioRisk_percent}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold">{row.portfolioRisk_percent}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span 
                      className="inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-sans tracking-wide transition-all duration-300"
                    >
                      {row.actionLabel} <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">➔</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

const esgTableData = [
  {
    "id": "bu_001",
    "sector": {
      "icon": "flame",
      "name": "Oil & Gas Exploration"
    },
    "annualizedRev_M": 810.0,
    "ebitdaMargin": {
      "value": 39,
      "status": "positive"
    },
    "allocatedCapex_M": 210.0,
    "esgScore": {
      "value": 61,
      "status": "warning"
    },
    "growthPercent": 4.2,
    "portfolioRisk_percent": 85,
    "actionLabel": "Inspect HUD"
  },
  {
    "id": "bu_002",
    "sector": {
      "icon": "lightning",
      "name": "Renewable Power Grid"
    },
    "annualizedRev_M": 485.0,
    "ebitdaMargin": {
      "value": 36,
      "status": "positive"
    },
    "allocatedCapex_M": 363.0,
    "esgScore": {
      "value": 94,
      "status": "positive"
    },
    "growthPercent": 47.0,
    "portfolioRisk_percent": 15,
    "actionLabel": "Inspect HUD"
  },
  {
    "id": "bu_003",
    "sector": {
      "icon": "building",
      "name": "Commercial Property & Land"
    },
    "annualizedRev_M": 460.8,
    "ebitdaMargin": {
      "value": 44,
      "status": "positive"
    },
    "allocatedCapex_M": 141.0,
    "esgScore": {
      "value": 72,
      "status": "warning"
    },
    "growthPercent": 8.7,
    "portfolioRisk_percent": 25,
    "actionLabel": "Inspect HUD"
  },
  {
    "id": "bu_004",
    "sector": {
      "icon": "suitcase",
      "name": "Luxe Hospitality & Resorts"
    },
    "annualizedRev_M": 310.4,
    "ebitdaMargin": {
      "value": 25,
      "status": "warning"
    },
    "allocatedCapex_M": 86.4,
    "esgScore": {
      "value": 76,
      "status": "warning"
    },
    "growthPercent": 11.2,
    "portfolioRisk_percent": 35,
    "actionLabel": "Inspect HUD"
  },
  {
    "id": "bu_005",
    "sector": {
      "icon": "leaf",
      "name": "Precision Agro-Farms"
    },
    "annualizedRev_M": 190.0,
    "ebitdaMargin": {
      "value": 33,
      "status": "warning"
    },
    "allocatedCapex_M": 40.0,
    "esgScore": {
      "value": 86,
      "status": "positive"
    },
    "growthPercent": 6.8,
    "portfolioRisk_percent": 20,
    "actionLabel": "Inspect HUD"
  },
  {
    "id": "bu_006",
    "sector": {
      "icon": "waves",
      "name": "Offshore Aquaculture"
    },
    "annualizedRev_M": 140.0,
    "ebitdaMargin": {
      "value": 36,
      "status": "positive"
    },
    "allocatedCapex_M": 35.0,
    "esgScore": {
      "value": 92,
      "status": "positive"
    },
    "growthPercent": 18.3,
    "portfolioRisk_percent": 15,
    "actionLabel": "Inspect HUD"
  },
  {
    "id": "bu_007",
    "sector": {
      "icon": "lightbulb",
      "name": "DeepTech Venture Capital"
    },
    "annualizedRev_M": 90.0,
    "ebitdaMargin": {
      "value": -17,
      "status": "warning"
    },
    "allocatedCapex_M": 65.0,
    "esgScore": {
      "value": 84,
      "status": "positive"
    },
    "growthPercent": 42.1,
    "portfolioRisk_percent": 65,
    "actionLabel": "Inspect HUD"
  }
];