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
import { ProgressBar } from './ui/ProgressBar';
import * as ui from '../lib/uiTheme';

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
        
        <div id="kpi-card-1" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Total Revenue</span>
            <div className="p-1.5 rounded bg-[var(--color-bg-surface)] text-[var(--color-action-main)]"><DollarSign className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-action-main)]">${groupMetrics.totalRevenue}M</span>
            <span className="flex items-center text-[10px] text-[var(--color-success-text)] mt-1.5 font-bold">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12.4% YoY
            </span>
          </div>
        </div>

        <div id="kpi-card-2" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">EBITDA</span>
            <div className="p-1.5 rounded bg-[var(--color-success-bg)] text-[var(--color-success-text)]"><Coins className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-success-text)]">${groupMetrics.ebitda}M</span>
            <span className="block text-[10px] text-[var(--color-text-secondary)] mt-1.5">
              Margin: <span className="font-semibold text-[var(--color-success-text)]">{((parseFloat(groupMetrics.ebitda) / parseFloat(groupMetrics.totalRevenue)) * 100).toFixed(0)}%</span>
            </span>
          </div>
        </div>

        <div id="kpi-card-3" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Net Profit</span>
            <div className="p-1.5 rounded bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"><BarChart3 className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">${groupMetrics.netProfit}M</span>
            <span className="flex items-center text-[10px] text-[var(--color-success-text)] mt-1.5 font-bold">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +8.2% vs target
            </span>
          </div>
        </div>

        <div id="kpi-card-4" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Cash Position</span>
            <div className="p-1.5 rounded bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"><Coins className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">${groupMetrics.cashPosition}M</span>
            <span className="block text-[10px] text-[var(--color-text-secondary)] mt-1.5">High reserves liquidity</span>
          </div>
        </div>

        <div id="kpi-card-5" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Asset Valuation</span>
            <div className="p-1.5 rounded bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"><Layers className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">${groupMetrics.assetValuation}B</span>
            <span className="block text-[10px] text-[var(--color-text-primary)] mt-1.5">Revalued current cycle</span>
          </div>
        </div>

        <div id="kpi-card-6" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">CAPEX Spend</span>
            <div className="p-1.5 rounded bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]"><TrendingDown className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-warning-text)]">${groupMetrics.capex}M</span>
            <span className="block text-[10px] text-[var(--color-text-secondary)] mt-1.5">
              Budget: <span className="font-semibold text-[var(--color-text-secondary)]">${groupMetrics.capexBudget}M</span>
            </span>
          </div>
        </div>

        <div id="kpi-card-7" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Ops Efficiency</span>
            <div className="p-1.5 rounded bg-[var(--color-success-bg)] text-[var(--color-success-text)]"><Activity className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-success-text)]">{groupMetrics.operationalEfficiency}%</span>
            <span className="block text-[10px] text-[var(--color-success-text)] mt-1.5 font-bold">
              Automation: {techAdoptionRate}%
            </span>
          </div>
        </div>

        <div id="kpi-card-8" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Weighted ESG</span>
            <div className="p-1.5 rounded bg-[var(--color-success-bg)] text-[var(--color-success-text)]"><Leaf className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-success-text)]">{groupMetrics.esgScore}/100</span>
            <span className="block text-[10px] mt-1.5 text-[var(--color-success-text)] font-bold">
              {groupMetrics.esgScore >= 75 ? 'Grade A compliance' : 'Grade B compliance'}
            </span>
          </div>
        </div>

        <div id="kpi-card-9" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Portfolio Growth</span>
            <div className="p-1.5 rounded bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]"><Compass className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">{groupMetrics.portfolioGrowth}%</span>
            <span className="block text-[10px] text-[var(--color-text-secondary)] mt-1.5">Composite yield</span>
          </div>
        </div>

        <div id="kpi-card-10" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest">Risk Exposure</span>
            <div className="p-1.5 rounded bg-[var(--color-error-bg)] text-[var(--color-error-text)]"><ShieldAlert className="w-4 h-4" /></div>
          </div>
          <div className="mt-3 text-left">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-error-text)]">{groupMetrics.riskExposure}/100</span>
            <span className={`block text-[10px] mt-1.5 font-bold ${groupMetrics.riskExposure > 60 ? 'text-[var(--color-error-text)]' : 'text-[var(--color-warning-text)]'}`}>
              {groupMetrics.riskExposure > 60 ? 'MODERATE HIGH' : 'SAFE INDEX'}
            </span>
          </div>
        </div>

      </div>

      {/* 2. DUAL COLUMN: SIMULATORS & NETWORK PULSE */}
      <div id="simulators-and-map-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scenario Selectors Sidebar (4 Cols) */}
        <div id="scenarios-telemetry-panel" className="lg:col-span-4 space-y-6">
          
          <div id="scenario-simulator-card" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 ${ui.card(darkMode)} shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-[var(--color-text-secondary)]" />
                <h3 className={`text-sm font-bold uppercase tracking-wider ${ui.value(darkMode)}`}>Executive Scenario Sliders</h3>
              </div>
              <button 
                id="reset-simulator-btn"
                onClick={() => {
                  setOilTransitionSpeed(50);
                  setPropertyExpansionRate(40);
                  setEsgInvestmentFactor(60);
                  setTechAdoptionRate(50);
                }}
                className={`text-[10px] px-2 py-1 rounded-[var(--radius-md)] border transition-all flex items-center space-x-1 ${darkMode ? 'bg-[var(--color-bg-surface)] text-[var(--color-action-main)] border-[var(--color-border-default)] hover:bg-[var(--color-bg-surface)]' : 'bg-[var(--color-bg-surface)] text-[var(--color-action-main)] border-[var(--color-border-default)] hover:bg-[var(--color-bg-surface)]'}`}
                title="Reset Sliders"
                type="button"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <p className={`text-xs mb-6 ${ui.label(darkMode)}`}>
              Adjust sliders dynamically to simulate portfolio stress levels. Strategic allocations automatically scale map nodes and cash distributions below.
            </p>

            <div className="space-y-6">
              
              {/* Slider 1 */}
              <div id="slider-transition-container" className="space-y-2">
                <div className={`flex justify-between text-xs font-semibold ${ui.value(darkMode)}`}>
                  <span>O&G energy transition speed</span>
                  <span className="text-[var(--color-warning-text)] font-bold tabular-nums">{oilTransitionSpeed}% Speed</span>
                </div>
                <input 
                  id="oil-transition-slider"
                  type="range" 
                  min="10" 
                  max="100" 
                  value={oilTransitionSpeed} 
                  onChange={(e) => setOilTransitionSpeed(Number(e.target.value))}
                  className={`w-full h-2 rounded-[var(--radius-lg)] appearance-none cursor-pointer accent-[var(--color-warning-text)] ${'bg-[var(--color-bg-surface)]'}`}
                  aria-label="Oil and gas transition speed"
                />
                <div className={`flex justify-between text-[9px] ${ui.labelMuted(darkMode)}`}>
                  <span>Yield Retention</span>
                  <span>Grid Transition</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div id="slider-property-container" className="space-y-2">
                <div className={`flex justify-between text-xs font-semibold ${ui.value(darkMode)}`}>
                  <span>Hospitality & property expansion</span>
                  <span className="text-[var(--color-action-main)] font-bold tabular-nums">{propertyExpansionRate}% Velocity</span>
                </div>
                <input 
                  id="property-expansion-slider"
                  type="range" 
                  min="10" 
                  max="100" 
                  value={propertyExpansionRate} 
                  onChange={(e) => setPropertyExpansionRate(Number(e.target.value))}
                  className={`w-full h-2 rounded-[var(--radius-lg)] appearance-none cursor-pointer accent-[var(--color-action-main)] ${'bg-[var(--color-bg-surface)]'}`}
                  aria-label="Property expansion rate"
                />
                <div className={`flex justify-between text-[9px] ${ui.labelMuted(darkMode)}`}>
                  <span>Capital Preservation</span>
                  <span>Rapid Landbank</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div id="slider-esg-container" className="space-y-2">
                <div className={`flex justify-between text-xs font-semibold ${ui.value(darkMode)}`}>
                  <span>Carbon-Offset investments</span>
                  <span className="text-[var(--color-success-text)] font-bold tabular-nums">{esgInvestmentFactor}% Alloc.</span>
                </div>
                <input 
                  id="esg-investment-slider"
                  type="range" 
                  min="20" 
                  max="100" 
                  value={esgInvestmentFactor} 
                  onChange={(e) => setEsgInvestmentFactor(Number(e.target.value))}
                  className={`w-full h-2 rounded-[var(--radius-lg)] appearance-none cursor-pointer accent-[var(--color-success-text)] ${'bg-[var(--color-bg-surface)]'}`}
                  aria-label="ESG investment factor"
                />
                <div className={`flex justify-between text-[9px] ${ui.labelMuted(darkMode)}`}>
                  <span>Sovereign Mandate</span>
                  <span>Carbon-Neutral</span>
                </div>
              </div>

              {/* Slider 4 */}
              <div id="slider-tech-container" className="space-y-2">
                <div className={`flex justify-between text-xs font-semibold ${ui.value(darkMode)}`}>
                  <span>DeepTech automation index</span>
                  <span className="text-[var(--color-action-main)] font-bold tabular-nums">{techAdoptionRate}% Adoption</span>
                </div>
                <input 
                  id="tech-adoption-slider"
                  type="range" 
                  min="10" 
                  max="100" 
                  value={techAdoptionRate} 
                  onChange={(e) => setTechAdoptionRate(Number(e.target.value))}
                  className={`w-full h-2 rounded-[var(--radius-lg)] appearance-none cursor-pointer accent-[var(--color-action-main)] ${'bg-[var(--color-bg-surface)]'}`}
                  aria-label="Technology adoption rate"
                />
                <div className={`flex justify-between text-[9px] ${ui.labelMuted(darkMode)}`}>
                  <span>Manual Operations</span>
                  <span>Ecosystem Smart Core</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sector HUD Telemetry display */}
          <div id="sector-hud-card" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm ${ui.cardInset(darkMode)}`}>
            <div className="flex items-center space-x-2 text-[var(--color-action-main)] mb-2">
              {renderBUIcon(selectedBUData.icon, "w-5 h-5")}
              <h4 className="font-semibold text-xs uppercase tracking-widest">Sector HUD Telemetry</h4>
            </div>
            <h3 className="text-lg font-bold tracking-tight">{selectedBUData.name} ({selectedBUData.short})</h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">{selectedBUData.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[var(--color-border-subtle)] text-left">
              <div>
                <span className="block text-[10px] text-[var(--color-text-secondary)] uppercase font-semibold tracking-wider">Simulated Revenue</span>
                <span className="text-base font-bold tracking-tight text-[var(--color-action-main)]">${selectedBUData.baseRevenue.toFixed(1)}M</span>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--color-text-secondary)] uppercase font-semibold tracking-wider">Simulated EBITDA</span>
                <span className={`text-base font-bold tracking-tight ${selectedBUData.baseEbitda >= 0 ? 'text-[var(--color-success-text)]' : 'text-[var(--color-error-text)]'}`}>
                  ${selectedBUData.baseEbitda.toFixed(1)}M
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--color-text-secondary)] uppercase font-semibold tracking-wider">ESG Rating Score</span>
                <span className="text-sm font-bold text-[var(--color-success-text)]">{selectedBUData.esgScore}/100</span>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--color-text-secondary)] uppercase font-semibold tracking-wider">Portfolio Risk</span>
                <span className="text-sm font-bold text-[var(--color-error-text)]">{selectedBUData.riskIndex}/100</span>
              </div>
            </div>

            {selectedBUData.riskIndex > 65 && (
              <div id="crit-exposure-warning" className="mt-4 p-2.5 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border border-amber-500/20 flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-[10px] leading-snug">
                  <strong>Critical Exposure warning:</strong> High portfolio risk detected. Board recommends immediate asset hedge.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Network Map Visual (8 Cols) */}
        <div id="network-pulse-map-panel" className="lg:col-span-8 flex flex-col space-y-4">
          <div className={`p-5 rounded-[var(--radius-xl)] border flex-1 flex flex-col justify-between transition-all duration-300 ${ui.card(darkMode)} shadow-sm`}>
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block animate-ping"></span>
                  <span>Ecosystem Pulse Map</span>
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded ${'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}>
                  Vector coordinates grid (800 x 480)
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Scalable coordinate mapping showing cross-sector dependencies. Node radius scales with simulated revenue contribution. Click on a node to update the slider telemetry HUD.
              </p>
            </div>

            {/* SVG STAGE */}
            <div id="svg-map-stage" className={`relative w-full aspect-[8/5] border rounded-[var(--radius-xl)] overflow-hidden ${'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]'}`}>
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

               <div id="coordinate-legend" className={`absolute bottom-3 left-3 border p-2 rounded-[var(--radius-lg)] text-[9px] space-y-1 ${'bg-[var(--color-bg-elevated)]/95 border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]'}`}>
                <div className="font-semibold text-[var(--color-text-secondary)] mb-0.5">Scenographic Mapping Coordinates</div>
                <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> <span>O&G Node: (180, 140)</span></div>
                <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> <span>Renewable Node: (200, 340)</span></div>
                <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> <span>Property Node: (580, 180)</span></div>
              </div>
            </div>

            {/* FLOW EXPANDED READOUT */}
            {selectedFlow ? (
              <div id="flow-connection-readout" className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] border border-[var(--color-info-border)] flex justify-between items-start text-left">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-info-text)]">Dependency Integration SLA</div>
                  <div className="text-sm font-bold text-zinc-800 dark:text-white flex items-center">
                    <span>{simulatedBUs[selectedFlow.from]?.short}</span>
                    <ChevronRight className="w-4 h-4 mx-1 text-[var(--color-info-text)]" />
                    <span>{simulatedBUs[selectedFlow.to]?.short}</span>
                    <span className="ml-2 text-xs bg-[var(--color-bg-surface)] px-1.5 py-0.5 rounded text-[var(--color-action-main)] dark:text-[var(--color-action-main)]">{selectedFlow.type}</span>
                  </div>
                  <p className={`text-xs ${ui.valueSoft(darkMode)}`}>{selectedFlow.text}</p>
                  <p className="text-xs text-[var(--color-success-text)] font-bold">{selectedFlow.metric}</p>
                </div>
                <button 
                  id="close-flow-details-btn"
                  onClick={() => setSelectedFlow(null)}
                  className={`text-xs transition-colors ${darkMode ? 'text-neutral-500 hover:text-neutral-200' : 'text-[var(--color-text-secondary)] hover:text-neutral-900'}`}
                  type="button"
                >
                  Close
                </button>
              </div>
            ) : (
              <div id="flow-hint-slate" className={`p-3.5 rounded-[var(--radius-lg)] border border-dashed text-center text-xs ${darkMode ? 'border-neutral-700 text-neutral-500' : 'border-neutral-300 text-[var(--color-text-secondary)]'}`}>
                💡 Hint: Click on any colored bezier connection vector on the map to evaluate flow SLAs and ESG dependencies.
              </div>
            )}

          </div>
        </div>

      </div>

      {/* 3. SANKEY CAPITAL DISTRIBUTION SECTION */}
      <div id="money-flow-sankey-panel" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 ${ui.card(darkMode)} shadow-sm text-left`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]/80 mb-4">
          <div>
            <div className="flex items-center space-x-2 text-[var(--color-action-main)]">
              <Coins className="w-5 h-5" />
              <h3 className="font-semibold text-base">The Capital Distribution Sankey</h3>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Visualizes how aggregate holding capital (Sources) flows into the sector business units, and then streams out into destinations.
            </p>
          </div>
          <button 
            id="redirect-to-capex-btn"
            onClick={() => setActiveTab('capex')}
            className="text-xs text-[var(--color-action-main)] hover:underline flex items-center space-x-1 font-bold"
            type="button"
          >
            <span>Monitor Capex projects ➔</span>
          </button>
        </div>

        <div id="sankey-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div id="sankey-svg-holder" className={`lg:col-span-9 rounded-[var(--radius-xl)] p-4 overflow-x-auto relative border ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100/60 border-neutral-200'}`}>
            <div className="min-w-[800px]">
              
              <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3 px-6">
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
            <div className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 ${ui.card(darkMode)} space-y-4 text-left`}>
              <div className="flex items-center space-x-2 text-[var(--color-action-main)]">
                <BarChart3 className="w-4 h-4" />
                <h4 className="text-xs font-semibold uppercase tracking-widest">Capital Consumption</h4>
              </div>

              <p className={`text-[11px] leading-snug ${darkMode ? 'text-neutral-400' : 'text-[var(--color-text-secondary)]'}`}>
                Real-time mapping of capital consumption (Capex allocated) against direct sector EBITDA income.
              </p>

              <div className="space-y-3.5">
                
                {/* Item 1 */}
                <div id="consumption-item-1" className={`p-3 rounded-[var(--radius-lg)] border ${'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[var(--color-warning-text)]">O&G Extraction</span>
                    <span className="text-[10px] text-[var(--color-warning-text)] font-bold">Yield Ratio: 1.3</span>
                  </div>
                  <ProgressBar
                    value={(simulatedBUs.oilAndGas.baseEbitda / simulatedBUs.oilAndGas.baseCapex) * 100}
                    variant="warning"
                    darkMode={darkMode}
                    className="mt-2"
                    aria-label="O&G capital yield"
                  />
                  <div className={`flex justify-between text-[9px] mt-1.5 ${darkMode ? 'text-neutral-500' : 'text-[var(--color-text-secondary)]'}`}>
                    <span>CAPEX: ${simulatedBUs.oilAndGas.baseCapex.toFixed(0)}M</span>
                    <span>EBITDA: ${simulatedBUs.oilAndGas.baseEbitda.toFixed(0)}M</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div id="consumption-item-2" className={`p-3 rounded-[var(--radius-lg)] border ${'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[var(--color-success-text)]">Renewables Power</span>
                    <span className="text-[10px] text-[var(--color-success-text)] font-bold">Yield Ratio: 0.4</span>
                  </div>
                  <ProgressBar
                    value={(simulatedBUs.renewableEnergy.baseEbitda / simulatedBUs.renewableEnergy.baseCapex) * 100}
                    variant="success"
                    darkMode={darkMode}
                    className="mt-2"
                    aria-label="Renewables capital yield"
                  />
                  <div className={`flex justify-between text-[9px] mt-1.5 ${darkMode ? 'text-neutral-500' : 'text-[var(--color-text-secondary)]'}`}>
                    <span>CAPEX: ${simulatedBUs.renewableEnergy.baseCapex.toFixed(0)}M</span>
                    <span>EBITDA: ${simulatedBUs.renewableEnergy.baseEbitda.toFixed(0)}M</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div id="consumption-item-3" className={`p-3 rounded-[var(--radius-lg)] border ${'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]'}`}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[var(--color-action-main)]">Property & Land</span>
                    <span className="text-[10px] text-[var(--color-action-main)] font-bold">Yield Ratio: 1.4</span>
                  </div>
                  <ProgressBar
                    value={(simulatedBUs.property.baseEbitda / simulatedBUs.property.baseCapex) * 100}
                    variant="default"
                    darkMode={darkMode}
                    className="mt-2"
                    aria-label="Property capital yield"
                  />
                  <div className={`flex justify-between text-[9px] mt-1.5 ${darkMode ? 'text-neutral-500' : 'text-[var(--color-text-secondary)]'}`}>
                    <span>CAPEX: ${simulatedBUs.property.baseCapex.toFixed(0)}M</span>
                    <span>EBITDA: ${simulatedBUs.property.baseEbitda.toFixed(0)}M</span>
                  </div>
                </div>

              </div>

              <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-action-main)]/10 text-[var(--color-action-main)] dark:text-[var(--color-action-main)] border border-[var(--color-border-default)] text-[10px] leading-relaxed">
                <strong>Strategic Insight:</strong> Changing the transition speed shift slider on top directly updates the Renewable and O&G ribbons shown here. Note the ROI offsets.
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 4. BUSINESS UNIT LEDGER & ESG AUDITING */}
      <div id="bu-ledger-esg-auditing" className={`p-5 rounded-[var(--radius-xl)] border transition-all duration-300 shadow-sm text-left ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b mb-4 ${'border-[var(--color-border-subtle)]'}`}>
          <div>
            <div className="flex items-center space-x-2 text-[var(--color-action-main)]">
              <Layers className="w-5 h-5" />
              <h3 className={`font-semibold text-base tracking-widest uppercase ${darkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>BUSINESS UNIT LEDGER & ESG AUDITING</h3>
            </div>
            <p className={`text-xs mt-1 font-sans ${darkMode ? 'text-neutral-400' : 'text-[var(--color-text-secondary)]'}`}>
              Drill down into individual operational records. Click on any row to load into telemetry panels.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="strativy-table w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className={`border-b text-[10px] font-semibold uppercase tracking-widest ${'border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]'}`}>
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
            <tbody className={`divide-y ${'divide-[var(--color-border-subtle)]'}`}>
              {esgTableData.map((row) => (
                <tr 
                  key={row.id}
                  className={`group transition-all duration-300 cursor-pointer hover:shadow-sm relative ${darkMode ? 'hover:bg-neutral-800/50' : 'hover:bg-[var(--color-bg-surface)]'}`}
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
                      <span className={`p-2 rounded-[var(--radius-lg)] ${darkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-[var(--color-text-secondary)]'}`}>
                        {row.sector.icon === 'flame' && <Flame className="w-4 h-4" />}
                        {row.sector.icon === 'lightning' && <Zap className="w-4 h-4" />}
                        {row.sector.icon === 'building' && <Building className="w-4 h-4" />}
                        {row.sector.icon === 'suitcase' && <Briefcase className="w-4 h-4" />}
                        {row.sector.icon === 'leaf' && <Leaf className="w-4 h-4" />}
                        {row.sector.icon === 'waves' && <Waves className="w-4 h-4" />}
                        {row.sector.icon === 'lightbulb' && <Lightbulb className="w-4 h-4" />}
                      </span>
                      <span className="ledger-sector-name font-semibold text-sm tracking-tight font-sans">
                        {row.sector.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold ledger-metric">
                    ${row.annualizedRev_M.toFixed(1)}M
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-[var(--radius-md)] font-bold text-[10px] tracking-wider ${
                      row.ebitdaMargin.status === 'positive' 
                        ? 'bg-success-50 text-[var(--color-success-text)] dark:bg-[var(--color-success-text)]/15 dark:text-success-400' 
                        : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
                    }`}>
                      {row.ebitdaMargin.value}%
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold ledger-metric">
                    ${row.allocatedCapex_M.toFixed(1)}M
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center space-x-2 font-semibold ${ui.valueSoft(darkMode)}`}>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        row.esgScore.status === 'positive' ? 'bg-[var(--color-success-text)]' : 'bg-[var(--color-warning-text)]'
                      }`}></span>
                      <span>{row.esgScore.value}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold">
                    <span className={row.growthPercent >= 0 ? 'text-[var(--color-success-text)]' : 'text-[var(--color-error-text)]'}>
                      {row.growthPercent >= 0 ? '+' : ''}{row.growthPercent.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5 min-w-[7rem]">
                      <ProgressBar
                        value={row.portfolioRisk_percent}
                        variant="error"
                        darkMode={darkMode}
                        size="md"
                        className="flex-1 max-w-24"
                        aria-label={`Portfolio risk ${row.portfolioRisk_percent}%`}
                      />
                      <span className={`text-[10px] font-bold tabular-nums shrink-0 ${darkMode ? 'text-neutral-400' : 'text-[var(--color-text-secondary)]'}`}>
                        {row.portfolioRisk_percent}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span 
                      className="inline-flex items-center text-xs font-bold text-[var(--color-action-main)] group-hover:text-[var(--color-action-main)] dark:group-hover:text-primary-300 font-sans tracking-wide transition-all duration-300"
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