/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Settings, 
  ChevronRight, 
  ShieldAlert, 
  Activity, 
  Coins, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  FileText 
} from 'lucide-react';
import { StrategicProject } from '../types';
import { ProgressBar } from './ui/ProgressBar';
import { KpiCard } from './ui/KpiCard';
import * as ui from '../lib/uiTheme';

interface ProjectMonitorProps {
  darkMode: boolean;
  projects: StrategicProject[];
  setProjects: React.Dispatch<React.SetStateAction<StrategicProject[]>>;
  groupMetrics: import('../types').GroupMetrics;
  propertyExpansionRate: number;
}

export default function ProjectMonitor({
  darkMode,
  projects,
  setProjects,
  groupMetrics,
  propertyExpansionRate
}: ProjectMonitorProps) {
  
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [reallocationMsg, setReallocationMsg] = useState<string | null>(null);

  // 1. CALCULATE CONSOLIDATED PRJ HUD
  const projectAggregates = useMemo(() => {
    let committedTotal = 0;
    let budgetTotal = 0;
    let weightedProgress = 0;
    let activeRedsCount = 0;

    projects.forEach(p => {
      committedTotal += p.budgetSpent;
      budgetTotal += p.totalBudget;
      weightedProgress += (p.progress * p.totalBudget);
      if (p.status === 'red') activeRedsCount++;
    });

    return {
      committed: committedTotal,
      budget: budgetTotal,
      progress: Math.round(weightedProgress / budgetTotal),
      redAlerts: activeRedsCount
    };
  }, [projects]);

  // Handle reallocating capital suggestion from STRATIVY BRAIN
  const reallocateFunds = () => {
    const updated = projects.map(p => {
      // Reallocate $15M from PRJ-LAND-02 to PRJ-WIND-03 to solve shipping/import delays!
      if (p.id === 'PRJ-WIND-03') {
        return {
          ...p,
          budgetSpent: p.budgetSpent + 15,
          status: 'green' as const,
          slippageDays: 5,
          rootCause: 'Turbine shipping expedited via premium express shipping. Delays resolved.'
        };
      }
      if (p.id === 'PRJ-LAND-02') {
        return {
          ...p,
          totalBudget: p.totalBudget - 15,
          rootCause: 'Budget reduced by $15M to assist high-yield Renewables turbine schedule.'
        };
      }
      return p;
    });
    setProjects(updated);
    setReallocationMsg('STRATIVY BRAIN Strategic Reallocation executed: $15M transferred from Commercial Property Acquisition to Offshore wind turbine arrays. Shipping expedited!');
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div id="project-monitor-container" className="space-y-6 text-left">
      
      {/* 1. HUD KPIs PANEL */}
      <div id="project-hud-cards" className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <KpiCard
          id="prj-stat-1"
          darkMode={darkMode}
          label="Total CAPEX Allocated"
          accent="primary"
          icon={<Coins className="w-4 h-4" />}
          value={
            <>
              ${projectAggregates.committed}M / ${projectAggregates.budget}M
            </>
          }
          footer={
            <span className={`text-[10px] font-mono ${ui.labelMuted(darkMode)}`}>Consolidated Sum</span>
          }
        />
        <KpiCard
          id="prj-stat-2"
          darkMode={darkMode}
          label="Weighted Progress"
          accent="cyan"
          icon={<TrendingUp className="w-4 h-4" />}
          value={<>{projectAggregates.progress}%</>}
          footer={
            <span className="text-[10px] text-success-600 dark:text-success-400 font-mono font-bold">
              Completed Avg
            </span>
          }
        />
        <KpiCard
          id="prj-stat-3"
          darkMode={darkMode}
          label="Project IRR Average"
          accent="success"
          icon={<ArrowUpRight className="w-4 h-4" />}
          value={<>24.5% IRR</>}
          footer={
            <span className={`text-[10px] font-mono ${ui.labelMuted(darkMode)}`}>Projected ROI yield</span>
          }
        />
        <KpiCard
          id="prj-stat-4"
          darkMode={darkMode}
          label="Active Critical Warnings"
          accent="danger"
          icon={<ShieldAlert className="w-4 h-4" />}
          value={<>{projectAggregates.redAlerts} High-Risk</>}
          footer={
            <span className="text-[10px] text-danger-600 dark:text-danger-400 font-bold font-mono">
              Standard Alert
            </span>
          }
        />
      </div>

      {/* 2. INTERACTIVE GANTT TIMELINE MATRIX */}
      <div id="gantt-chart-section" className={`p-5 rounded-2xl border transition-all duration-300 ${ui.card(darkMode)}`}>
        <div className="flex justify-between items-center mb-1">
          <h3 className={`font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 ${ui.value(darkMode)}`}>
            <Clock className="w-4 h-4 text-primary-500" />
            <span>Interactive gantt roadmap & timeline</span>
          </h3>
          <span className={`text-[9px] px-2 py-0.5 rounded-md font-mono ${darkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>Pure SVG Matrix</span>
        </div>
        <p className={`text-xs mb-4 font-mono ${ui.label(darkMode)}`}>
          Gantt bars represent start-to-finish schedules. Lines map chronological project dependencies.
        </p>

        {/* Gantt viewport coordinates */}
        <div id="gantt-vector-stage" className={`relative w-full aspect-[10/3.2] border rounded-xl overflow-hidden p-1.5 ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
          <svg viewBox="0 0 1000 320" className="w-full h-full">
            {/* Timeline months grid lines */}
            <g opacity="0.10">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`month-grid-${i}`} x1={i * 83 + 50} y1="0" x2={i * 83 + 50} y2="320" stroke="#475569" strokeWidth="1" />
              ))}
            </g>

            {/* Timeline texts headers */}
            <g fill="#94A3B8" fontSize="10" fontWeight="bold" opacity="0.7">
              <text x="80" y="25">Jan</text>
              <text x="163" y="25">Feb</text>
              <text x="246" y="25">Mar</text>
              <text x="329" y="25">Apr</text>
              <text x="412" y="25">May</text>
              <text x="495" y="25">Jun</text>
              <text x="578" y="25">Jul</text>
              <text x="661" y="25">Aug</text>
              <text x="744" y="25">Sep</text>
              <text x="827" y="25">Oct</text>
              <text x="910" y="25">Nov</text>
            </g>

            {/* HORIZONTAL LANE INDICATORS */}
            <g opacity="0.15" stroke="#475569">
              <line x1="0" y1="40" x2="1000" y2="40" strokeWidth="1" />
              <line x1="0" y1="110" x2="1000" y2="110" strokeWidth="1" />
              <line x1="0" y1="180" x2="1000" y2="180" strokeWidth="1" />
              <line x1="0" y1="250" x2="1000" y2="250" strokeWidth="1" />
            </g>

            {/* DEPENDENCY LINES CONNECTORS */}
            <g stroke="#6366F1" strokeWidth="2.5" fill="none" opacity="0.6">
              {/* Land bank endpoints (350, 200) connects to Nusa Dua resorts foundation (380, 80) */}
              <path d="M 320,210 L 350,210 L 350,75 L 380,75" strokeDasharray="3,3" />
              
              {/* Wind phase manufacturing endpoint connects directly to STRATIVY BRAIN Software grid automation deploy */}
              <path d="M 450,145 L 480,145 L 480,275 L 500,275" strokeDasharray="3,3" />
            </g>

            {/* PROJECT BARS */}
            
            {/* Luxe Resort Nusa Dua */}
            <g 
              transform="translate(380,55)" 
              className="cursor-pointer group"
              onClick={() => setSelectedProjectId('PRJ-NUSA-01')}
            >
              <rect 
                width="320" 
                height="35" 
                fill="#EC4899" 
                fillOpacity={selectedProjectId === 'PRJ-NUSA-01' ? "0.95" : "0.70"} 
                rx="4" 
                stroke={selectedProjectId === 'PRJ-NUSA-01' ? '#FFF' : 'none'}
                strokeWidth="2.5"
              />
              <text x="12" y="22" fill="#FFFFFF" fontSize="10" fontWeight="bold">Luxe Resort Nusa Dua Phase 2 ({projects[0].progress}%)</text>
            </g>

            {/* 100MW Offshore Wind Cable */}
            <g 
              transform="translate(180,125)" 
              className="cursor-pointer group"
              onClick={() => setSelectedProjectId('PRJ-WIND-03')}
            >
              <rect 
                width="450" 
                height="35" 
                fill={projects[2].status === 'red' ? '#EF4444' : '#10B981'} 
                fillOpacity={selectedProjectId === 'PRJ-WIND-03' ? "0.95" : "0.70"} 
                rx="4" 
                stroke={selectedProjectId === 'PRJ-WIND-03' ? '#FFF' : 'none'}
                strokeWidth="2.5"
              />
              <text x="12" y="22" fill="#FFFFFF" fontSize="10" fontWeight="bold">100MW Offshore Wind Turbine ({projects[2].progress}%)</text>
            </g>

            {/* CBD Commercial Acquisition */}
            <g 
              transform="translate(50,195)" 
              className="cursor-pointer group"
              onClick={() => setSelectedProjectId('PRJ-LAND-02')}
            >
              <rect 
                width="270" 
                height="35" 
                fill="#6366F1" 
                fillOpacity={selectedProjectId === 'PRJ-LAND-02' ? "0.95" : "0.70"} 
                rx="4" 
                stroke={selectedProjectId === 'PRJ-LAND-02' ? '#FFF' : 'none'}
                strokeWidth="2.5"
              />
              <text x="12" y="22" fill="#FFFFFF" fontSize="10" fontWeight="bold">Commercial Land Acquisition ({projects[1].progress}%)</text>
            </g>

            {/* Ecosystem STRATIVY BRAIN automation software */}
            <g 
              transform="translate(500,255)" 
              className="cursor-pointer group"
              onClick={() => setSelectedProjectId('PRJ-AI-04')}
            >
              <rect 
                width="280" 
                height="35" 
                fill="#A855F7" 
                fillOpacity={selectedProjectId === 'PRJ-AI-04' ? "0.95" : "0.70"} 
                rx="4" 
                stroke={selectedProjectId === 'PRJ-AI-04' ? '#FFF' : 'none'}
                strokeWidth="2.5"
              />
              <text x="12" y="22" fill="#FFFFFF" fontSize="10" fontWeight="bold">STRATIVY BRAIN Ecosystem Router ({projects[3].progress}%)</text>
            </g>
          </svg>
        </div>

        {/* Render tooltip detailing focused parameters */}
        {selectedProject ? (
          <div className={`mt-4 p-3.5 rounded-xl border text-left ${ui.calloutPrimary(darkMode)}`}>
            <span className="text-[10px] uppercase font-bold text-primary-600 dark:text-primary-400">Strategic Project focused details</span>
            <h4 className={`text-sm font-bold mt-1 ${ui.value(darkMode)}`}>{selectedProject.name} ({selectedProject.id})</h4>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-2.5 pt-2.5 border-t text-xs ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div>
                <span className={ui.label(darkMode)}>Allocation Target:</span>
                <span className={`block font-semibold capitalize ${ui.value(darkMode)}`}>{selectedProject.sector} sector</span>
              </div>
              <div>
                <span className={ui.label(darkMode)}>Timetable span:</span>
                <span className={`block font-semibold ${ui.value(darkMode)}`}>{selectedProject.start} ➔ {selectedProject.end}</span>
              </div>
              <div>
                <span className={ui.label(darkMode)}>CAPEX Budget spent index:</span>
                <span className={`block font-semibold ${ui.value(darkMode)}`}>${selectedProject.budgetSpent}M / ${selectedProject.totalBudget}M</span>
              </div>
              <div>
                <span className={ui.label(darkMode)}>Delay / Bottleneck indicators:</span>
                <span className={`block font-semibold ${selectedProject.slippageDays > 0 ? 'text-danger-600 dark:text-danger-400' : 'text-success-600 dark:text-success-400'}`}>
                  {selectedProject.slippageDays > 0 ? `+${selectedProject.slippageDays} Days Delay` : 'On schedule'}
                </span>
              </div>
            </div>
            <p className={`text-xs mt-2.5 italic ${ui.label(darkMode)}`}>
              <strong>Root Cause:</strong> {selectedProject.rootCause}
            </p>
          </div>
        ) : (
          <div className={`mt-4 p-2 rounded-lg border border-dashed text-center text-xs ${darkMode ? 'border-neutral-700 text-neutral-500' : 'border-neutral-300 text-neutral-600'}`}>
            📊 Hint: Hover or Click any Gantt lane timeline above to load focused timeline parameters.
          </div>
        )}

      </div>

      {/* 3. COOP DETAIL CARD GRID */}
      <div id="project-detailed-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className={`p-4 rounded-xl border space-y-3 ${ui.card(darkMode)}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${darkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>{p.id}</span>
                <h4 className={`text-sm font-bold mt-1.5 ${ui.value(darkMode)}`}>{p.name}</h4>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                p.status === 'green' ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400' : p.status === 'amber' ? 'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400' : 'bg-danger-50 text-danger-700 dark:bg-danger-500/15 dark:text-danger-400'
              }`}>
                {p.status}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className={`flex justify-between text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <span>Milestone progress:</span>
                <span className={`font-semibold tabular-nums ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>{p.progress}% Completed</span>
              </div>
              <ProgressBar
                value={p.progress}
                variant={p.status === 'green' ? 'success' : p.status === 'amber' ? 'warning' : 'danger'}
                darkMode={darkMode}
                aria-label={`${p.name} milestone progress`}
              />
            </div>

            <div className={`grid grid-cols-2 gap-4 text-xs mt-2.5 pt-2.5 border-t ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div>
                <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Segment budget allocation:</span>
                <span className={`block font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-900'}`}>${p.budgetSpent}M Spent / ${p.totalBudget}M Total</span>
              </div>
              <div>
                <span className={`block font-normal ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Slippage indicator:</span>
                <span className={`font-semibold ${p.slippageDays > 0 ? 'text-danger-500 dark:text-danger-400' : 'text-success-600 dark:text-success-400'}`}>
                  {p.slippageDays > 0 ? `+${p.slippageDays} days` : 'Stable schedule'}
                </span>
              </div>
            </div>

            {p.status === 'red' && (
              <div className={`p-2 rounded-xl border text-[10px] leading-snug ${ui.calloutDanger(darkMode)}`}>
                🚨 <strong>Critical bottleneck detected:</strong> {p.rootCause} Use the STRATIVY BRAIN panel below to reallocate surplus property funds to unlock expedited shipping logs.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 4. EXECUTIVE STRATIVY BRAIN REALLOCATION PANEL (POWER LAYER) */}
      <div id="capital-reallocation-decision-board" className={`p-5 rounded-2xl border transition-all duration-300 ${ui.cardInset(darkMode)} flex flex-col md:flex-row justify-between items-center gap-4`}>
        <div className="space-y-1 text-left flex-1">
          <h4 className="font-extrabold text-sm text-primary-600 dark:text-primary-400 flex items-center space-x-1.5 uppercase tracking-wider font-mono">
            <Sparkles className="w-4 h-4 animate-pulse text-primary-500" />
            <span>STRATIVY BRAIN Project Allocation</span>
          </h4>
          <p className={`text-xs font-mono leading-relaxed ${ui.label(darkMode)}`}>
            "100MW Wind Grid Phase 3 is experiencing deepwater turbine procurement blocks. We recommend reallocating $15M from the Property landbank acquisition budget to lock express logistics, resolving 40 days of construction delay and preserving consolidated holding EBITDA targets."
          </p>
          {reallocationMsg && (
            <div className={`mt-3.5 p-3 rounded-xl border text-xs font-mono ${ui.calloutSuccess(darkMode)}`}>
              💡 {reallocationMsg}
            </div>
          )}
        </div>

        {projects.find(p => p.id === 'PRJ-WIND-03')?.status === 'red' ? (
          <button 
            id="reallocate-funds-btn"
            onClick={reallocateFunds}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl flex items-center space-x-2 shrink-0 transition-all shadow-md shadow-primary-600/10 font-mono"
            type="button"
          >
            <Sparkles className="w-4 h-4" />
            <span>Execute STRATIVY BRAIN Reallocation</span>
          </button>
        ) : (
          <div className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono flex items-center space-x-1.5 shrink-0 border ${ui.calloutSuccess(darkMode)}`}>
            <span>✓ Recommendations Executed</span>
          </div>
        )}
      </div>

    </div>
  );
}
