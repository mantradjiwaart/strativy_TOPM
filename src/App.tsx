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
  const [darkMode, setDarkMode] = useState<boolean>(false);
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
      darkMode ? 'bg-neutral-950 text-neutral-50' : 'bg-neutral-50 text-neutral-950'
    }`}>
      
      {/* 1. HEADER SECTION */}
      <header className={`border-b sticky top-0 z-40 transition-colors duration-200 ${
        darkMode ? 'border-neutral-800 bg-neutral-900/90 backdrop-blur-md' : 'border-neutral-200 bg-white/95 backdrop-blur-md shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md transition-transform hover:scale-105">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-lg">STRATIVY</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-primary-500/10 border border-primary-500/20 text-primary-700 dark:text-primary-400">
                  Boardroom Core
                </span>
              </div>
              <p className={`text-[10px] font-mono ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Ecosystem Pulse, STRATIVY BRAIN Strategy & Bento Modeling Panel</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
            {/* Time selector */}
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono ${
              darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-800'
            }`}>
              <span className={`font-medium ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Scenario:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent text-primary-600 dark:text-primary-400 font-bold focus:outline-none cursor-pointer"
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
                darkMode ? 'bg-neutral-900 border-neutral-800 text-warning-400 hover:bg-neutral-800' : 'bg-white border-neutral-200 text-primary-600 hover:bg-neutral-100'
              }`}
              title="Toggle theme visualizer"
              type="button"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Board user tag */}
            <div className={`flex items-center space-x-2 border-l pl-4 ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center font-bold text-sm text-white shadow-sm">
                CB
              </div>
              <div className="hidden md:block text-left">
                <span className="block text-xs font-bold leading-none">Chairman of Board</span>
                <span className={`text-[9px] block mt-0.5 font-mono ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Holding Executive</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. TAB MULTI-NAVIGATION BAR */}
      <div className={`border-b transition-all duration-300 shadow-sm relative ${darkMode ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200 bg-neutral-100/80'}`}>
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          
          <div className="flex items-center space-x-3 shrink-0">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-neutral-800 text-primary-400' : 'bg-white shadow-sm text-primary-600'}`}>
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
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                  : (darkMode ? 'hover:bg-neutral-800 text-neutral-300 border border-neutral-800' : 'hover:bg-white text-neutral-700 bg-transparent border border-neutral-300 hover:shadow-sm')
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
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                  : (darkMode ? 'hover:bg-neutral-800 text-neutral-300 border border-neutral-800' : 'hover:bg-white text-neutral-700 bg-transparent border border-neutral-300 hover:shadow-sm')
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
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                  : (darkMode ? 'hover:bg-neutral-800 text-neutral-300 border border-neutral-800' : 'hover:bg-white text-neutral-700 bg-transparent border border-neutral-300 hover:shadow-sm')
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
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                  : (darkMode ? 'hover:bg-neutral-800 text-neutral-300 border border-neutral-800' : 'hover:bg-white text-neutral-700 bg-transparent border border-neutral-300 hover:shadow-sm')
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
                  : (darkMode ? 'hover:bg-neutral-900 text-neutral-300 bg-neutral-900/40 border border-neutral-800' : 'hover:bg-white text-neutral-700 bg-transparent border border-neutral-300 hover:shadow-sm')
              }`}
              type="button"
            >
              <Sparkles className="w-5 h-5 text-primary-500 animate-pulse mb-1.5" />
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
        darkMode ? 'border-neutral-800 text-neutral-500 bg-neutral-950' : 'border-neutral-200 text-neutral-500 bg-neutral-100/50'
      }`}>
        <p>© 2026 Strativy Boardroom Core. Designed under corporate board security standards & guidelines.</p>
        <p className="mt-1">Chairman & Board of Directors Authorized Session Only.</p>
      </footer>

    </div>
  );
}
