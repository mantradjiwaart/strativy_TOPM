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
      <div id="hr-hud-cards" className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        
        <div id="hr-stat-1" className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} text-left`}>
          <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Total Headcount</span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-lg font-black tracking-tight text-zinc-800 dark:text-zinc-100 font-mono">{hrAggregates.headcount.toLocaleString()} FTEs</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">+{hrAggregates.contractors} Contractors</span>
          </div>
        </div>

        <div id="hr-stat-2" className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} text-left`}>
          <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Group Engagement Score</span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-lg font-black tracking-tight text-zinc-800 dark:text-zinc-100 font-mono">{hrAggregates.engagement} / 100</span>
            <span className="text-[10px] text-emerald-500 font-mono">Weighted Avg</span>
          </div>
        </div>

        <div id="hr-stat-3" className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} text-left`}>
          <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Annual Attrition Rate</span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-lg font-black tracking-tight text-rose-500 font-mono">{hrAggregates.attrition}%</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold font-mono">Benchmark: 14%</span>
          </div>
        </div>

        <div id="hr-stat-4" className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} text-left`}>
          <span className="block text-[10px] text-zinc-500 dark:text-zinc-400 font-extrabold uppercase tracking-widest font-mono">Active Wellness Rate</span>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-lg font-black tracking-tight text-emerald-500 font-mono">{hrAggregates.participation}% Active</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{wellnessBudgetFactor > 5 ? 'High participation' : 'Adequate'}</span>
          </div>
        </div>

      </div>

      {/* 2. PRODUCTIVITY VS ATTRITION MATRIX (SCATTER DIAGRAM) */}
      <div id="productivity-matrix-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Scatter coordinate diagram 8 cols */}
        <div className={`lg:col-span-8 p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Productivity vs Attrition Quadrant Matrix</span>
            </h3>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">Interactive Nodes</span>
          </div>
          <p className="text-xs text-zinc-500 md:text-zinc-400 mb-4 font-mono">
            Visualizes employee burnout (top-right) and high-performance safety zones (bottom-right). Click any sector bubble to focus detailed parameters.
          </p>

          <div className={`w-full h-80 relative border rounded-xl p-2.5 ${darkMode ? 'bg-[#09090b] border-zinc-800/60' : 'bg-zinc-100/50 border-zinc-200'}`}>
            {/* Visual quadrant labels overlays */}
            <div className={`absolute top-4 left-4 px-2 py-0.5 rounded text-[9px] text-rose-500 border border-rose-500/10 font-mono ${darkMode ? 'bg-zinc-900/95' : 'bg-white/95'}`}>💥 H1 RISK: Burnout / Tension risk (High Attrition, High Output)</div>
            <div className={`absolute bottom-4 left-4 px-2 py-0.5 rounded text-[9px] text-zinc-500 border border-zinc-500/10 font-mono ${darkMode ? 'bg-zinc-900/95 text-zinc-400' : 'bg-white/95'}`}>💤 Q3 STAGNATION: Skill stagnation (Low Attrition, Low Output)</div>
            <div className={`absolute bottom-4 right-4 px-2 py-0.5 rounded text-[9px] text-emerald-500 border border-emerald-500/10 font-mono ${darkMode ? 'bg-zinc-900/95 text-emerald-400' : 'bg-white/95'}`}>✨ Q4 IDEAL: Peak Engagement (Low Attrition, High Output)</div>

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
                    backgroundColor: '#0f172a', 
                    borderRadius: '8px', 
                    border: '1px solid #334155',
                    fontSize: '11px',
                    color: '#FFF'
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
          <div className={`p-5 rounded-2xl border transition-all duration-300 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} flex-1 flex flex-col justify-between`}>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-405 dark:text-blue-405 dark:text-blue-400">
                <Users className="w-5 h-5 text-blue-500" />
                <h4 className="font-extrabold text-xs uppercase tracking-widest font-mono">Sector HR parameters</h4>
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
                <span className="p-1 rounded bg-zinc-800/85 text-zinc-300" style={{ color: focusedBU.color }}>
                  {renderBUIcon(focusedBU.buId)}
                </span>
                <span>{focusedBU.buName}</span>
              </h3>

              <div id="telemetry-inner-indicators" className="space-y-3.5 pt-2 text-left">
                
                {/* indicator headcount */}
                <div className={`flex justify-between items-center text-xs border-b pb-2 ${darkMode ? 'border-gray-800/10' : 'border-zinc-200'}`}>
                  <span className="text-gray-400">Headcount FTE / Contacts</span>
                  <span className={`font-bold font-mono ${darkMode ? 'text-white' : 'text-zinc-800'}`}>{focusedBU.headcount} FTE / {focusedBU.contractors}</span>
                </div>

                {/* indicator engagement slider ratio */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Employee Engagement</span>
                    <span className="font-bold text-emerald-400 font-mono">{focusedBU.engagementScore} / 100</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-zinc-200'}`}>
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${focusedBU.engagementScore}%` }}></div>
                  </div>
                </div>

                {/* indicator attrition */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Direct Attrition Risk</span>
                    <span className="font-bold text-rose-500 font-mono">{focusedBU.attritionRate}%</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-zinc-200'}`}>
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(focusedBU.attritionRate / 15 * 100)}%` }}></div>
                  </div>
                </div>

                {/* indicator wellness participation */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Wellness Program participation</span>
                    <span className="font-bold text-green-400 font-mono">{focusedBU.wellnessParticipation}%</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-zinc-200'}`}>
                    <div className="bg-green-400 h-full rounded-full" style={{ width: `${focusedBU.wellnessParticipation}%` }}></div>
                  </div>
                </div>

                {/* leadership readiness */}
                <div className={`flex justify-between items-center text-xs border-t pt-2 ${darkMode ? 'border-gray-800/10' : 'border-zinc-200'}`}>
                  <span className="text-gray-400">Leadership Readiness index</span>
                  <span className="font-bold text-indigo-400 flex items-center space-x-1 font-mono">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <span>{focusedBU.leadershipReadiness}% index</span>
                  </span>
                </div>

              </div>

              {/* Dynamic trigger rules alarms */}
              {focusedBU.attritionRate > 10.0 && (
                <div className="p-2.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] leading-snug flex items-start space-x-1.5">
                  <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>
                    <strong>High turnover breach:</strong> Overworked or disengaged staff. Wellness slider budget adjustments strongly recommended to reduce key asset drain.
                  </p>
                </div>
              )}

            </div>

            <div className="p-3.5 rounded bg-indigo-500/10 text-indigo-450 border border-indigo-500/20 text-[10px] leading-relaxed text-left">
              <strong>Ecosystem Context:</strong> Safety indicators are direct physical limits. High safety indices represent high training rates, reducing downtime by 12%.
            </div>

          </div>
        </div>

      </div>

      {/* 3. WELLNESS INVESTMENT SLIDER SIMULATOR (POWER LAYER) */}
      <div id="wellness-simulator-section" className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'} shadow`}>
        <div id="wellness-sim-header" className="border-b border-gray-800/20 pb-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center text-left">
          <div className="space-y-1">
            <h4 className="font-bold text-sm uppercase tracking-wider flex items-center space-x-2 text-green-400">
              <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
              <span>Wellness program investment slider simulator</span>
            </h4>
            <p className="text-xs text-xs text-slate-450">
              Model physical returns of health, safety, and training investment values ($1M to $10M holding budget cap).
            </p>
          </div>
          <div className="mt-2 md:mt-0 p-2 text-xs bg-green-500/10 border border-green-500/25 rounded text-green-400 font-semibold font-mono">
            Active alloc: ${wellnessBudgetFactor}M Group-wide
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-xs text-gray-400 uppercase font-semibold">Allocate Group-wide Wellness budget</span>
            <input 
              id="wellness-budget-factor-slider"
              type="range" 
              min="1" 
              max="10" 
              value={wellnessBudgetFactor} 
              onChange={(e) => setWellnessBudgetFactor(Number(e.target.value))}
              className="w-full h-2 bg-gray-750 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-[10px] text-gray-450">
              <span>Bare compliance ($1.0M Allocation)</span>
              <span>Wellness Core ($10.0M Allocation)</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 text-xs space-y-1">
              <div>📈 <strong>Impact projections:</strong></div>
              <p className="text-[11px] text-slate-300 leading-snug">
                A $10M lift in wellness budget correlates to an immediate <strong>1.8% decrease in annual group attrition</strong> and a <strong>0.5% lift to the physical Operational Efficiency Index</strong>.
              </p>
            </div>
          </div>

          {/* Dual Axis chart 8 cols */}
          <div className={`lg:col-span-8 p-4 rounded-xl relative ${darkMode ? 'bg-[#070A13]' : 'bg-zinc-100/50'}`}>
            <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Simulated attrition reduction curve</h5>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={correlationLineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity="0.3" />
                  <XAxis dataKey="budget" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#475569" />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#475569" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      border: '1px solid #334155',
                      fontSize: '11px',
                      color: '#FFF'
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
