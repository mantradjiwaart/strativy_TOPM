/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import {
  Building,
  Layers,
  Users,
  Clock,
  Sparkles,
  Sun,
  Moon,
  Sliders,
} from 'lucide-react';

import { defaultBUs, defaultFlows, defaultProjects, defaultHRData } from './data';
import HoldingOverview from './components/HoldingOverview';
import BuDrilldown from './components/BuDrilldown';
import HumanCapital from './components/HumanCapital';
import ProjectMonitor from './components/ProjectMonitor';
import StrativyBrain from './components/StrativyBrain';
import { useSimulation } from './hooks/useSimulation';
import { StrategicProject } from './types';
import { Badge } from './components/ui';
import * as ui from './lib/uiTheme';
import { cn } from './lib/cn';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('core-holding');
  const [selectedBU, setSelectedBU] = useState<string>('oilAndGas');
  const [projects, setProjects] = useState<StrategicProject[]>(defaultProjects);
  const [timeframe, setTimeframe] = useState<string>('FY 2026 (Forecast)');

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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const tabs = [
    { id: 'core-holding', icon: Layers, label: 'L1: Ecosystem Pulse' },
    { id: 'bu-performance', icon: Building, label: 'L2: BU Performance' },
    { id: 'human-capital', icon: Users, label: 'L3: Human Capital' },
    { id: 'capex', icon: Clock, label: 'L4: Capex Gantt' },
    { id: 'strativy-brain', icon: Sparkles, label: '✨ STRATIVY BRAIN' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 font-sans bg-[var(--color-bg-page)] text-[var(--color-text-primary)]">

      {/* HEADER */}
      <header className="border-b border-[var(--color-border-subtle)] sticky top-0 z-40 bg-[var(--color-bg-elevated)]/95 backdrop-blur-md shadow-[var(--shadow-sm)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 bg-[var(--color-action-main)] rounded-[var(--radius-xl)] flex items-center justify-center text-[var(--color-action-text)] font-bold text-xl shadow-[var(--shadow-sm)] transition-transform hover:scale-105">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-lg">STRATIVY</span>
                <Badge variant="default">Boardroom Core</Badge>
              </div>
              <p className={cn('text-[10px]', ui.label(darkMode))}>
                Ecosystem Pulse, STRATIVY BRAIN Strategy & Bento Modeling Panel
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
            <div className={cn(
              'flex items-center space-x-2 px-3 py-1.5 rounded-[var(--radius-lg)] border text-xs',
              'bg-[var(--color-bg-elevated)] border-[var(--color-border-default)] text-[var(--color-text-primary)]',
            )}>
              <span className={cn('font-medium', ui.label(darkMode))}>Scenario:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent text-[var(--color-action-main)] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="FY 2026 (Forecast)">FY 2026 (Forecast)</option>
                <option value="Q3 2026 Shift Matrix">Q3 2026 Shift Matrix</option>
                <option value="FY 2025 (Audited)">FY 2025 (Audited)</option>
              </select>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                'p-2 rounded-[var(--radius-xl)] transition-all border',
                'bg-[var(--color-bg-elevated)] border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]',
              )}
              title="Toggle theme"
              type="button"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="flex items-center space-x-2 border-l border-[var(--color-border-subtle)] pl-4">
              <div className="w-8 h-8 rounded-[var(--radius-xl)] bg-[var(--color-action-main)] flex items-center justify-center font-semibold text-sm text-[var(--color-action-text)] shadow-[var(--shadow-sm)]">
                CB
              </div>
              <div className="hidden md:block text-left">
                <span className="block text-xs font-semibold leading-none">Chairman of Board</span>
                <span className={cn('text-[9px] block mt-0.5', ui.label(darkMode))}>Holding Executive</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* TAB NAVIGATION */}
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-sm)]">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-2 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className={ui.sectionEyebrow(darkMode)}>Active Module Set</h2>
              <p className={cn('text-[10px] mt-0.5', ui.labelMuted(darkMode))}>
                Select a strategic tier below to inspect
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[120px] px-3 py-3 rounded-[var(--radius-xl)] text-[11px] font-semibold transition-all duration-300 hover:scale-[1.02]',
                  activeTab === id ? ui.navActive(darkMode) : ui.navInactive(darkMode),
                )}
                type="button"
              >
                <Icon className="w-5 h-5 mb-1.5" />
                <span className="tracking-wide">{label}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* MAIN VIEWPORT */}
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

      {/* FOOTER */}
      <footer className={cn(
        'border-t py-6 mt-14 text-center text-[10px] transition-colors',
        'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] bg-[var(--color-bg-surface)]',
      )}>
        <p>© 2026 Strativy Boardroom Core. Designed under corporate board security standards & guidelines.</p>
        <p className="mt-1">Chairman & Board of Directors Authorized Session Only.</p>
      </footer>

    </div>
  );
}
