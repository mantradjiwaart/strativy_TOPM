/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { 
  Building, 
  Layers, 
  Users, 
  Clock, 
  Sparkles, 
  Sun, 
  Moon, 
  Activity, 
  Sliders, 
  RefreshCw 
} from 'lucide-react';

import { defaultBUs, defaultFlows, defaultProjects, defaultHRData } from './data';
import HoldingOverview from './components/HoldingOverview';
import BuDrilldown from './components/BuDrilldown';
import HumanCapital from './components/HumanCapital';
import ProjectMonitor from './components/ProjectMonitor';
import StrativyBrain from './components/StrativyBrain';
import { useSimulation } from './hooks/useSimulation';
import { StrategicProject } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('core-holding');
  const [selectedBU, setSelectedBU] = useState<string>('oilAndGas');
  const [projects, setProjects] = useState<StrategicProject[]>(defaultProjects);
  const [timeframe, setTimeframe] = useState<string>('FY 2026 (Forecast)');

  // Dynamic board sliders driving the entire core simulation engine
  const [oilTransitionSpeed, setOilTransitionSpeed] = useState<number>(50);
  const [propertyExpansionRate, setPropertyExpansionRate] = useState<number>(40);
  const [esgInvestmentFactor, setEsgInvestmentFactor] = useState<number>(60);
  const [techAdoptionRate, setTechAdoptionRate] = useState<number>(50);

  const { simulatedBUs, groupMetrics } = useSimulation({
    oilTransitionSpeed,
    propertyExpansionRate,
    esgInvestmentFactor,
    techAdoptionRate,
  });

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${
      darkMode ? 'bg-zinc-950 text-zinc-50' : 'bg-zinc-50 text-zinc-950'
    }`}>
      
      {/* 1. HEADER SECTION */}
      <header className={`border-b sticky top-0 z-40 transition-colors duration-200 ${
        darkMode ? 'border-zinc-800 bg-zinc-900/90 backdrop-blur-md' : 'border-zinc-200 bg-white/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md transition-transform hover:scale-105">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-lg">STRATIVY</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-650 dark:text-blue-400">
                  Boardroom Core
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">Ecosystem Pulse, STRATIVY BRAIN Strategy & Bento Modeling Panel</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
            {/* Time selector */}
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono ${
              darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-800'
            }`}>
              <span className="text-zinc-400 font-medium">Scenario:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent text-blue-600 dark:text-blue-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="FY 2026 (Forecast)">FY 2026 (Forecast)</option>
                <option value="Q3 2026 Shift Matrix">Q3 2026 Shift Matrix</option>
                <option value="FY 2025 (Audited)">FY 2025 (Audited)</option>
              </select>
            </div>

            {/* Dark mode selector */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all border ${
                darkMode ? 'bg-zinc-900 border-zinc-800 text-yellow-450 hover:bg-zinc-850' : 'bg-white border-zinc-200 text-blue-600 hover:bg-zinc-100'
              }`}
              title="Toggle theme visualizer"
              type="button"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Board user tag */}
            <div className="flex items-center space-x-2 border-l pl-4 border-zinc-800">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-sm">
                CB
              </div>
              <div className="hidden md:block text-left">
                <span className="block text-xs font-bold leading-none">Chairman of Board</span>
                <span className="text-[9px] text-zinc-400 block mt-0.5 font-mono">Holding Executive</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. TAB MULTI-NAVIGATION BAR */}
      <div className={`border-b transition-all duration-300 shadow-sm relative ${darkMode ? 'border-zinc-800 bg-zinc-900/60' : 'border-zinc-300 bg-zinc-100/60'}`}>
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          
          <div className="flex items-center space-x-3 shrink-0">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800 text-blue-400' : 'bg-white shadow-sm text-blue-600'}`}>
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className={`text-[11px] font-black uppercase tracking-widest font-mono ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>Active Module Set</h2>
              <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Select a strategic tier below to inspect</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            
            <button
              onClick={() => setActiveTab('core-holding')}
              className={`flex flex-col items-center justify-center min-w-[120px] px-3 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                activeTab === 'core-holding' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : (darkMode ? 'hover:bg-zinc-800 text-zinc-300 border border-zinc-800' : 'hover:bg-white text-zinc-650 bg-transparent border border-zinc-300 hover:shadow-sm')
              }`}
              type="button"
            >
              <Layers className="w-5 h-5 mb-1.5" />
              <span className="font-mono tracking-wide">L1: Ecosystem Pulse</span>
            </button>

            <button
              onClick={() => setActiveTab('bu-performance')}
              className={`flex flex-col items-center justify-center min-w-[120px] px-3 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                activeTab === 'bu-performance' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : (darkMode ? 'hover:bg-zinc-800 text-zinc-300 border border-zinc-800' : 'hover:bg-white text-zinc-650 bg-transparent border border-zinc-300 hover:shadow-sm')
              }`}
              type="button"
            >
              <Building className="w-5 h-5 mb-1.5" />
              <span className="font-mono tracking-wide">L2: BU Performance</span>
            </button>

            <button
              onClick={() => setActiveTab('human-capital')}
              className={`flex flex-col items-center justify-center min-w-[120px] px-3 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                activeTab === 'human-capital' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : (darkMode ? 'hover:bg-zinc-800 text-zinc-300 border border-zinc-800' : 'hover:bg-white text-zinc-650 bg-transparent border border-zinc-300 hover:shadow-sm')
              }`}
              type="button"
            >
              <Users className="w-5 h-5 mb-1.5" />
              <span className="font-mono tracking-wide">L3: Human Capital</span>
            </button>

            <button
              onClick={() => setActiveTab('capex')}
              className={`flex flex-col items-center justify-center min-w-[120px] px-3 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                activeTab === 'capex' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : (darkMode ? 'hover:bg-zinc-800 text-zinc-300 border border-zinc-800' : 'hover:bg-white text-zinc-650 bg-transparent border border-zinc-300 hover:shadow-sm')
              }`}
              type="button"
            >
              <Clock className="w-5 h-5 mb-1.5" />
              <span className="font-mono tracking-wide">L4: Capex Gantt</span>
            </button>

            <button
              onClick={() => setActiveTab('strativy-brain')}
              className={`flex flex-col items-center justify-center min-w-[120px] px-3 py-3 rounded-xl text-[11px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                activeTab === 'strativy-brain' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : (darkMode ? 'hover:bg-zinc-900 text-zinc-300 bg-zinc-900/40 border border-zinc-800' : 'hover:bg-white text-zinc-650 bg-transparent border border-zinc-300 hover:shadow-sm')
              }`}
              type="button"
            >
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse mb-1.5" />
              <span className="font-mono tracking-wide">✨ STRATIVY BRAIN</span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. MAIN CONTAINER VIEWPORT */}
      <main className="max-w-7xl mx-auto p-6">
        
        {activeTab === 'core-holding' && (
          <HoldingOverview
            darkMode={darkMode}
            simulatedBUs={simulatedBUs}
            groupMetrics={groupMetrics}
            selectedBU={selectedBU}
            setSelectedBU={setSelectedBU}
            flows={defaultFlows}
            oilTransitionSpeed={oilTransitionSpeed}
            setOilTransitionSpeed={setOilTransitionSpeed}
            propertyExpansionRate={propertyExpansionRate}
            setPropertyExpansionRate={setPropertyExpansionRate}
            esgInvestmentFactor={esgInvestmentFactor}
            setEsgInvestmentFactor={setEsgInvestmentFactor}
            techAdoptionRate={techAdoptionRate}
            setTechAdoptionRate={setTechAdoptionRate}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'bu-performance' && (
          <BuDrilldown
            darkMode={darkMode}
            simulatedBUs={simulatedBUs}
            selectedBU={selectedBU}
            setSelectedBU={setSelectedBU}
            flows={defaultFlows}
          />
        )}

        {activeTab === 'human-capital' && (
          <HumanCapital
            darkMode={darkMode}
            hrData={defaultHRData}
            selectedBU={selectedBU}
            setSelectedBU={setSelectedBU}
            groupMetrics={groupMetrics}
            techAdoptionRate={techAdoptionRate}
          />
        )}

        {activeTab === 'capex' && (
          <ProjectMonitor
            darkMode={darkMode}
            projects={projects}
            setProjects={setProjects}
            groupMetrics={groupMetrics}
            propertyExpansionRate={propertyExpansionRate}
          />
        )}

        {activeTab === 'strativy-brain' && (
          <StrativyBrain
            darkMode={darkMode}
            simulatedBUs={simulatedBUs}
            groupMetrics={groupMetrics}
          />
        )}

      </main>

      {/* 4. FOOTER */}
      <footer className={`border-t py-6 mt-14 text-center text-[10px] font-mono transition-colors ${
        darkMode ? 'border-zinc-800 text-zinc-500 bg-zinc-950' : 'border-zinc-200 text-zinc-400 bg-zinc-100/50'
      }`}>
        <p>© 2026 Strativy Boardroom Core. Designed under corporate board security standards & guidelines.</p>
        <p className="mt-1">Chairman & Board of Directors Authorized Session Only.</p>
      </footer>

    </div>
  );
}
