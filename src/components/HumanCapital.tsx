/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Activity, 
  TrendingDown, 
  Coins, 
  ShieldAlert, 
  Sparkles, 
  Flame, 
  Zap, 
  Building, 
  Briefcase, 
  Leaf, 
  Waves, 
  Lightbulb, 
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { ProgressBar } from './ui/ProgressBar';
import { KpiCard } from './ui/KpiCard';
import * as ui from '../lib/uiTheme';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Label,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { HumanCapitalTelemetry } from '../types';

interface HumanCapitalProps {
  darkMode: boolean;
  hrData: Record<string, HumanCapitalTelemetry>;
  selectedBU: string;
  setSelectedBU: (id: string) => void;
  groupMetrics: import('../types').GroupMetrics;
  techAdoptionRate: number;
}

export default function HumanCapital({
  darkMode,
  hrData,
  selectedBU,
  setSelectedBU,
  groupMetrics,
  techAdoptionRate
}: HumanCapitalProps) {
  
  const [wellnessBudgetFactor, setWellnessBudgetFactor] = useState<number>(4); // Slate value from $1M to $10M

  const renderBUIcon = (iconName: string, className = "w-3.5 h-3.5") => {
    switch (iconName) {
      case 'oilAndGas': return <Flame id="hc-flame" className={className} />;
      case 'renewableEnergy': return <Zap id="hc-zap" className={className} />;
      case 'property': return <Building id="hc-building" className={className} />;
      case 'hotel': return <Briefcase id="hc-briefcase" className={className} />;
      case 'agriculture': return <Leaf id="hc-leaf" className={className} />;
      case 'aquaculture': return <Waves id="hc-waves" className={className} />;
      case 'innovation': return <Lightbulb id="hc-lightbulb" className={className} />;
      default: return <Users id="hc-users" className={className} />;
    }
  };

  // 1. DYNAMICALLY ADJUST SCALING COEF BASED ON WELLNESS SLIDER
  // Increasing budget factor boosts participation, engagement, and lowers attrition!
  const simulatedHR = useMemo(() => {
    const updated: Record<string, HumanCapitalTelemetry> = JSON.parse(JSON.stringify(hrData));
    const multiplier = 1 + (wellnessBudgetFactor * 0.04); // Up to +40% participation

    Object.keys(updated).forEach(key => {
      const bu = updated[key];
      bu.wellnessParticipation = Math.min(99, Math.round(bu.wellnessParticipation * multiplier));
      bu.engagementScore = Math.min(100, Math.round(bu.engagementScore + (wellnessBudgetFactor * 0.8)));
      // Attrition Reduction = Base Attrition - (Wellness Participation Factor * 0.18)
      bu.attritionRate = Math.max(2.1, +(bu.attritionRate - (wellnessBudgetFactor * 0.3)).toFixed(1));
    });

    return updated;
  }, [hrData, wellnessBudgetFactor]);

  // Aggregate Group metrics
  const hrAggregates = useMemo(() => {
    let headcountTotal = 0;
    let contractorsTotal = 0;
    let weightedEngagement = 0;
    let weightedAttrition = 0;
    let weightedParticipation = 0;

    Object.values(simulatedHR).forEach(bu => {
      headcountTotal += bu.headcount;
      contractorsTotal += bu.contractors;
      weightedEngagement += (bu.engagementScore * bu.headcount);
      weightedAttrition += (bu.attritionRate * bu.headcount);
      weightedParticipation += (bu.wellnessParticipation * bu.headcount);
    });

    return {
      headcount: headcountTotal,
      contractors: contractorsTotal,
      engagement: Math.round(weightedEngagement / headcountTotal),
      attrition: (weightedAttrition / headcountTotal).toFixed(1),
      participation: Math.round(weightedParticipation / headcountTotal)
    };
  }, [simulatedHR]);

  const focusedBU = simulatedHR[selectedBU];

  // Productivity vs Attrition nodes map coordinates for Scatter graph
  const scatterData = useMemo(() => {
    return Object.values(simulatedHR).map(bu => {
      // Mock Productivity index: 55-95 base + automation bonuses
      let productivity = 65;
      if (bu.buId === 'innovation') productivity = 88;
      if (bu.buId === 'renewableEnergy') productivity = 82;
      if (bu.buId === 'hotel') productivity = 74;
      if (bu.buId === 'agriculture') productivity = 70;
      if (bu.buId === 'aquaculture') productivity = 78;

      // Add tech adoption influence
      productivity = Math.min(99, Math.round(productivity + (techAdoptionRate * 0.12)));

      return {
        x: productivity, // Physical Productivity index
        y: bu.attritionRate, // Attrition Rate %
        name: bu.buName,
        buId: bu.buId,
        color: bu.color,
        headcount: bu.headcount,
        val: bu.headcount / 50 // Size for bubble scatter ZAxis
      };
    });
  }, [simulatedHR, techAdoptionRate]);

  // Dual Axis simulated line charts representing Attrition vs Wellness budget factor over 10 points
  const correlationLineData = useMemo(() => {
    return Array.from({ length: 11 }).map((_, i) => {
      const budget = i; // $0M to $10M
      const participation = Math.min(99, 45 + (budget * 5.2));
      const groupAttrition = Math.max(3.2, 11.2 - (budget * 0.42));
      const safetyIncidents = Math.max(1, 14 - (budget * 1.1));
      return {
        budget: `$${budget}M`,
        'Wellness Participation %': +participation.toFixed(0),
        'Group Attrition %': +groupAttrition.toFixed(1),
        'Safety Incidents': +safetyIncidents.toFixed(0)
      };
    });
  }, []);

  return (
    <div id="human-capital-module" className="space-y-6">
      
      {/* 1. HUD SUMMARY ROW CARDGRID */}
      <div id="hr-hud-cards" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          id="hr-stat-1"
          darkMode={darkMode}
          label="Total Headcount"
          accent="default"
          icon={<Users className="w-4 h-4" />}
          value={<>{hrAggregates.headcount.toLocaleString()} FTEs</>}
          footer={
            <span className={`text-[10px] ${ui.labelMuted(darkMode)}`}>
              +{hrAggregates.contractors} Contractors
            </span>
          }
        />
        <KpiCard
          id="hr-stat-2"
          darkMode={darkMode}
          label="Group Engagement Score"
          accent="success"
          icon={<Activity className="w-4 h-4" />}
          value={<>{hrAggregates.engagement} / 100</>}
          footer={
            <span className="text-[10px] text-[var(--color-success-text)] font-semibold">
              Weighted Avg
            </span>
          }
        />
        <KpiCard
          id="hr-stat-3"
          darkMode={darkMode}
          label="Annual Attrition Rate"
          accent="error"
          icon={<TrendingDown className="w-4 h-4" />}
          value={<>{hrAggregates.attrition}%</>}
          footer={
            <span className={`text-[10px] font-semibold ${ui.labelMuted(darkMode)}`}>
              Benchmark: 14%
            </span>
          }
        />
        <KpiCard
          id="hr-stat-4"
          darkMode={darkMode}
          label="Active Wellness Rate"
          accent="success"
          icon={<UserCheck className="w-4 h-4" />}
          value={<>{hrAggregates.participation}% Active</>}
          footer={
            <span className={`text-[10px] ${ui.labelMuted(darkMode)}`}>
              {wellnessBudgetFactor > 5 ? 'High participation' : 'Adequate'}
            </span>
          }
        />
      </div>

      {/* 2. PRODUCTIVITY VS ATTRITION MATRIX (SCATTER DIAGRAM) */}
      <div id="productivity-matrix-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Scatter coordinate diagram 8 cols */}
        <div className={`lg:col-span-8 p-5 rounded-2xl border transition-all duration-300 ${ui.card(darkMode)}`}>
          <div className="flex justify-between items-center mb-1">
            <h3 className={`font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 ${ui.value(darkMode)}`}>
              <Users className="w-4 h-4 text-[var(--color-text-secondary)]" />
              <span>Productivity vs Attrition Quadrant Matrix</span>
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-[var(--radius-sm)] ${darkMode ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]' : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}>Interactive Nodes</span>
          </div>
          <p className={`text-xs mb-4 ${ui.label(darkMode)}`}>
            Visualizes employee burnout (top-right) and high-performance safety zones (bottom-right). Click any sector bubble to focus detailed parameters.
          </p>

          <div className={`w-full h-80 relative border rounded-xl p-2.5 ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
            {/* Visual quadrant labels overlays */}
            <div className={`absolute top-4 left-4 px-2 py-0.5 rounded-[var(--radius-sm)] text-[9px] text-[var(--color-error-text)] border border-[var(--color-error-border)] ${darkMode ? 'bg-[var(--color-bg-elevated)]/95' : 'bg-[var(--color-bg-elevated)]/95 shadow-[var(--shadow-sm)]'}`}>💥 H1 RISK: Burnout / Tension risk (High Attrition, High Output)</div>
            <div className={`absolute bottom-4 left-4 px-2 py-0.5 rounded-[var(--radius-sm)] text-[9px] border ${darkMode ? 'bg-[var(--color-bg-elevated)]/95 text-[var(--color-text-muted)] border-[var(--color-border-subtle)]' : 'bg-[var(--color-bg-elevated)]/95 text-[var(--color-text-secondary)] border-[var(--color-border-default)] shadow-[var(--shadow-sm)]'}`}>💤 Q3 STAGNATION: Skill stagnation (Low Attrition, Low Output)</div>
            <div className={`absolute bottom-4 right-4 px-2 py-0.5 rounded-[var(--radius-sm)] text-[9px] text-[var(--color-success-text)] border border-[var(--color-success-border)] ${darkMode ? 'bg-[var(--color-bg-elevated)]/95' : 'bg-[var(--color-bg-elevated)]/95 shadow-[var(--shadow-sm)]'}`}>✨ Q4 IDEAL: Peak Engagement (Low Attrition, High Output)</div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 30, right: 20, bottom: 20, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity="0.3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Productivity Index" 
                  unit="" 
                  domain={[40, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  stroke="#475569"
                >
                  <Label value="Productivity Output index ➔" offset={-10} position="insideBottom" fill="#475569" fontSize={10} />
                </XAxis>
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Annual Attrition" 
                  unit="%" 
                  domain={[0, 15]}
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  stroke="#475569"
                >
                  <Label value="Annual Attrition speed % ➔" angle={-90} offset={10} position="insideLeft" fill="#475569" fontSize={10} />
                </YAxis>
                <ZAxis type="number" dataKey="val" range={[100, 800]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    borderRadius: '8px', 
                    border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                    fontSize: '11px',
                    color: darkMode ? '#f8fafc' : '#0f172a'
                  }}
                />
                <Scatter name="Business Units" data={scatterData} onClick={(node: any) => setSelectedBU(node.buId)}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={selectedBU === entry.buId ? '#FFF' : 'none'} strokeWidth={3} className="cursor-pointer" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic HR Telemetry Sidebar focused BU 4 cols */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className={`p-5 rounded-2xl border transition-all duration-300 ${ui.cardInset(darkMode)} flex-1 flex flex-col justify-between`}>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[var(--color-text-secondary)]">
                <Users className="w-5 h-5" />
                <h4 className="font-semibold text-xs uppercase tracking-widest">Sector HR parameters</h4>
              </div>
              <h3 className={`text-base font-bold flex items-center space-x-2 ${ui.value(darkMode)}`}>
                <span className={`p-1 rounded-md ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`} style={{ color: focusedBU.color }}>
                  {renderBUIcon(focusedBU.buId)}
                </span>
                <span>{focusedBU.buName}</span>
              </h3>

              <div id="telemetry-inner-indicators" className="space-y-3.5 pt-2 text-left">
                
                {/* indicator headcount */}
                <div className={`flex justify-between items-center text-xs border-b pb-2 ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Headcount FTE / Contacts</span>
                  <span className={`font-semibold ${ui.value(darkMode)}`}>{focusedBU.headcount} FTE / {focusedBU.contractors}</span>
                </div>

                {/* indicator engagement slider ratio */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Employee Engagement</span>
                    <span className="font-semibold text-[var(--color-success-text)]">{focusedBU.engagementScore} / 100</span>
                  </div>
                  <ProgressBar value={focusedBU.engagementScore} variant="success" darkMode={darkMode} aria-label="Employee engagement" />
                </div>

                {/* indicator attrition */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Direct Attrition Risk</span>
                    <span className="font-semibold text-[var(--color-error-text)]">{focusedBU.attritionRate}%</span>
                  </div>
                  <ProgressBar value={(focusedBU.attritionRate / 15) * 100} variant="error" darkMode={darkMode} aria-label="Attrition risk" />
                </div>

                {/* indicator wellness participation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Wellness Program participation</span>
                    <span className="font-semibold text-[var(--color-success-text)]">{focusedBU.wellnessParticipation}%</span>
                  </div>
                  <ProgressBar value={focusedBU.wellnessParticipation} variant="success" darkMode={darkMode} aria-label="Wellness participation" />
                </div>

                {/* leadership readiness */}
                <div className={`flex justify-between items-center text-xs border-t pt-2 ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Leadership Readiness index</span>
                  <span className={`font-semibold ${ui.actionText(darkMode)} flex items-center space-x-1`}>
                    <Award className="w-4 h-4" />
                    <span>{focusedBU.leadershipReadiness}% index</span>
                  </span>
                </div>

              </div>

              {/* Dynamic trigger rules alarms */}
              {focusedBU.attritionRate > 10.0 && (
                <div className={`p-2.5 rounded-xl border text-[10px] leading-snug flex items-start space-x-1.5 ${ui.calloutWarning(darkMode)}`}>
                  <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>
                    <strong>High turnover breach:</strong> Overworked or disengaged staff. Wellness slider budget adjustments strongly recommended to reduce key asset drain.
                  </p>
                </div>
              )}

            </div>

            <div className={`p-3.5 rounded-[var(--radius-xl)] border text-[10px] leading-relaxed text-left ${ui.calloutInfo(darkMode)}`}>
              <strong>Ecosystem Context:</strong> Safety indicators are direct physical limits. High safety indices represent high training rates, reducing downtime by 12%.
            </div>

          </div>
        </div>

      </div>

      {/* 3. WELLNESS INVESTMENT SLIDER SIMULATOR (POWER LAYER) */}
      <div id="wellness-simulator-section" className={`p-6 rounded-2xl border shadow-sm ${ui.card(darkMode)}`}>
        <div id="wellness-sim-header" className={`border-b pb-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center text-left ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="space-y-1">
            <h4 className="font-semibold text-sm uppercase tracking-wider flex items-center space-x-2 text-[var(--color-success-text)]">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Wellness program investment slider simulator</span>
            </h4>
            <p className={`text-xs ${ui.label(darkMode)}`}>
              Model physical returns of health, safety, and training investment values ($1M to $10M holding budget cap).
            </p>
          </div>
          <div className={`mt-2 md:mt-0 p-2 text-xs rounded-[var(--radius-lg)] font-semibold ${ui.calloutSuccess(darkMode)}`}>
            Active alloc: ${wellnessBudgetFactor}M Group-wide
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className={`text-xs uppercase font-semibold ${ui.label(darkMode)}`}>Allocate Group-wide Wellness budget</span>
            <input 
              id="wellness-budget-factor-slider"
              type="range" 
              min="1" 
              max="10" 
              value={wellnessBudgetFactor} 
              onChange={(e) => setWellnessBudgetFactor(Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-success-500 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'}`}
              aria-label="Wellness budget allocation"
            />
            <div className={`flex justify-between text-[10px] ${ui.labelMuted(darkMode)}`}>
              <span>Bare compliance ($1.0M Allocation)</span>
              <span>Wellness Core ($10.0M Allocation)</span>
            </div>

            <div className={`p-3 rounded-xl border text-xs space-y-1 ${ui.calloutSuccess(darkMode)}`}>
              <div>📈 <strong>Impact projections:</strong></div>
              <p className={`text-[11px] leading-snug ${ui.label(darkMode)}`}>
                A $10M lift in wellness budget correlates to an immediate <strong>1.8% decrease in annual group attrition</strong> and a <strong>0.5% lift to the physical Operational Efficiency Index</strong>.
              </p>
            </div>
          </div>

          {/* Dual Axis chart 8 cols */}
          <div className={`lg:col-span-8 p-4 rounded-xl relative border ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
            <h5 className={`text-[10px] uppercase font-bold tracking-wider mb-2 ${ui.label(darkMode)}`}>Simulated attrition reduction curve</h5>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={correlationLineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity="0.3" />
                  <XAxis dataKey="budget" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#475569" />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#475569" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                      borderRadius: '8px', 
                      border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                      fontSize: '11px',
                      color: darkMode ? '#f8fafc' : '#0f172a'
                    }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '10px' }} />
                  <Line type="monotone" dataKey="Wellness Participation %" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Group Attrition %" stroke="#F43F5E" strokeWidth={2.5} />
                  <Line type="monotone" dataKey="Safety Incidents" stroke="#F59E0B" strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
