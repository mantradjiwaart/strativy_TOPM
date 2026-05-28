import React, { useState } from 'react';
import { ChevronDown, Trophy, Users, Briefcase, ChevronRight, BarChart3, PieChart, Info, Layers, TrendingUp, Cpu } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface StrativyPerformanceProps {
  darkMode: boolean;
}

export default function StrativyPerformance({ darkMode }: StrativyPerformanceProps) {
  const [activeToggleOKR, setActiveToggleOKR] = useState('Dept');
  const [activeToggleComp, setActiveToggleComp] = useState('Dept');

  const dashboardData = {
    "dashboard": {
      "okrPerformance": {
        "chartPanel": {
          "title": "OKR Performance",
          "lastUpdate": "October 12, 2026",
          "toggles": ["Dept", "Team", "Employee"],
          "chartData": {
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            "dataPoints": [25, 37, 66, 58, 91, 103, 115],
            "yAxisFormat": "percentage"
          },
          "footerInsight": {
            "highlight": "↑ 12.5%",
            "text": "Average progress has improved compared to last month."
          }
        },
        "stratifyBrainPanel": {
          "title": "Strativy Brain - OKR Performance",
          "lastUpdate": "October 12, 2026",
          "overallSummary": "This quarter's data highlights robust performance. Despite a pressure drop in February, swift recalibration led to a recovery, exceeding projected targets in the Oil & Gas sector.",
          "insights": [
            {
              "period": "January",
              "title": "Crude Oil Extraction",
              "description": "Peak extraction observed in the Volkovysk Basin."
            },
            {
              "period": "February",
              "title": "Gas Lift Optimization",
              "description": "Gas lift needs adjustment for optimal output."
            },
            {
              "period": "March",
              "title": "Water Cut Analysis",
              "description": "Water cut levels require immediate attention."
            },
            {
              "period": "April",
              "title": "Enhanced Oil Recovery",
              "description": "EOR techniques boosted production in key sectors."
            }
          ]
        }
      },
      "competencyGrowth": {
        "chartPanel": {
          "title": "Competency Growth Analytics",
          "lastUpdate": "October 12, 2026",
          "toggles": ["Dept", "Team", "Employee"],
          "chartData": {
            "labels": ["Q1-2025", "Q2-2025", "Q3-2025", "Q4-2025", "Q1-2026"],
            "dataPoints": [2.5, 3.2, 3.8, 4.2, 4.7],
            "targetLine": 3.6,
            "yAxisFormat": "decimal"
          },
          "footerInsight": {
            "highlight": "Insight:",
            "text": "The score exceeded the target (3.8) in Q3 thanks to an intensive Renewable Energy upskilling program."
          }
        },
        "stratifyBrainPanel": {
          "title": "Strativy Brain - Competency Growth Analytics",
          "lastUpdate": "October 12, 2026",
          "overallSummary": "This semester's performance shows strong resilience. Despite a cost anomaly in March, a quick strategic response led to a sharp recovery, projecting achievements above target for the Tech BU.",
          "insights": [
            {
              "period": "Q1-2026",
              "title": "Production Volume",
              "description": "Target output in Q1 exceeded by 15%."
            },
            {
              "period": "Q2-2026",
              "title": "Pumping Pressure",
              "description": "Pressure stabilized after new pump install."
            },
            {
              "period": "Q3-2026",
              "title": "Gas Flow Velocity",
              "description": "Velocity increased 8% with new catalyst."
            },
            {
              "period": "Q4-2026",
              "title": "Refinement Purity",
              "description": "Purity levels are within acceptable range."
            }
          ]
        }
      }
    }
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800/80 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <BarChart3 className="w-5 h-5" />
            <h3 className="font-extrabold text-base tracking-widest uppercase">Strativy - Performance Data</h3>
          </div>
          <p className="text-xs text-zinc-500 mt-1 font-sans">
            Business unit data performance extracted from the Strativy analytics platform.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* ROW 1: OKR Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light Panel - Chart */}
          <div className={`flex flex-col rounded-2xl border p-5 ${darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className={`font-bold text-sm ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{dashboardData.dashboard.okrPerformance.chartPanel.title}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">Last update: {dashboardData.dashboard.okrPerformance.chartPanel.lastUpdate}</p>
              </div>
              <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-inner">
                {dashboardData.dashboard.okrPerformance.chartPanel.toggles.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveToggleOKR(t)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${activeToggleOKR === t ? 'bg-white dark:bg-zinc-900 text-blue-600 border border-blue-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="flex-1 w-full h-[220px] pt-4 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart 
                  data={dashboardData.dashboard.okrPerformance.chartPanel.chartData.labels.map((label, index) => ({
                    name: label,
                    value: dashboardData.dashboard.okrPerformance.chartPanel.chartData.dataPoints[index]
                  }))} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorOkr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#3f3f46" : "#e4e4e7"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontFamily: 'inherit' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontFamily: 'inherit' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: darkMode ? '#18181b' : '#ffffff', borderRadius: '8px', border: darkMode ? '1px solid #27272a' : '1px solid #e4e4e7', fontSize: '12px' }}
                    itemStyle={{ color: '#2563EB', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorOkr)" activeDot={{ r: 6 }} dot={{ r: 4, strokeWidth: 2, fill: darkMode ? '#27272a' : '#ffffff', stroke: '#2563EB' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-3 border border-emerald-100 dark:border-emerald-500/20 text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-2">{dashboardData.dashboard.okrPerformance.chartPanel.footerInsight.highlight}</span>
              <span className="text-zinc-700 dark:text-zinc-300">{dashboardData.dashboard.okrPerformance.chartPanel.footerInsight.text}</span>
            </div>
          </div>

          {/* Dark Panel - AI Insights */}
          <div className="flex flex-col rounded-2xl p-5 border border-purple-500/20 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-950 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-purple-300 mb-1">
                <Cpu className="w-4 h-4" />
                <h4 className="font-bold text-sm text-white">{dashboardData.dashboard.okrPerformance.stratifyBrainPanel.title}</h4>
              </div>
              <p className="text-[10px] text-purple-300/70 mb-5">Last update: {dashboardData.dashboard.okrPerformance.stratifyBrainPanel.lastUpdate}</p>
              
              <div className="bg-white/10 border border-white/10 rounded-xl p-4 mb-5 backdrop-blur-sm">
                <p className="text-xs text-purple-100 leading-relaxed">
                  {dashboardData.dashboard.okrPerformance.stratifyBrainPanel.overallSummary}
                </p>
              </div>

              <h5 className="text-[10px] uppercase font-bold text-purple-300/70 mb-3 tracking-widest">Insights</h5>
              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {dashboardData.dashboard.okrPerformance.stratifyBrainPanel.insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-20 shrink-0">
                      <span className="text-xs font-bold text-white/90 group-hover:text-purple-300 transition-colors">{insight.period}</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">{insight.title}</h5>
                      <p className="text-[10px] text-purple-200/70 leading-normal">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Competency Growth Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light Panel - Chart */}
          <div className={`flex flex-col rounded-2xl border p-5 ${darkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-white border-zinc-200 shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className={`font-bold text-sm ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{dashboardData.dashboard.competencyGrowth.chartPanel.title}</h4>
                <p className="text-[10px] text-zinc-400 mt-0.5">Last update: {dashboardData.dashboard.competencyGrowth.chartPanel.lastUpdate}</p>
              </div>
              <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-inner">
                {dashboardData.dashboard.competencyGrowth.chartPanel.toggles.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveToggleComp(t)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${activeToggleComp === t ? 'bg-white dark:bg-zinc-900 text-blue-600 border border-blue-500 shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Line Chart */}
            <div className="flex-1 w-full h-[220px] pt-4 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={dashboardData.dashboard.competencyGrowth.chartPanel.chartData.labels.map((label, index) => ({
                    name: label,
                    value: dashboardData.dashboard.competencyGrowth.chartPanel.chartData.dataPoints[index]
                  }))} 
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#3f3f46" : "#e4e4e7"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontFamily: 'inherit' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontFamily: 'inherit' }} domain={[0, 5]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: darkMode ? '#18181b' : '#ffffff', borderRadius: '8px', border: darkMode ? '1px solid #27272a' : '1px solid #e4e4e7', fontSize: '12px' }}
                    itemStyle={{ color: '#2563EB', fontWeight: 'bold' }}
                  />
                  <ReferenceLine y={3.6} stroke={darkMode ? "#71717a" : "#A1A1AA"} strokeDasharray="3 3" label={{ position: 'top', value: 'TARGET: 3.6', fill: darkMode ? '#71717a' : '#A1A1AA', fontSize: 10, fontWeight: 'bold' }} />
                  <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 4, strokeWidth: 2, fill: darkMode ? '#27272a' : '#ffffff', stroke: '#2563EB' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-3 border border-emerald-100 dark:border-emerald-500/20 text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-2">{dashboardData.dashboard.competencyGrowth.chartPanel.footerInsight.highlight}</span>
              <span className="text-zinc-700 dark:text-zinc-300">{dashboardData.dashboard.competencyGrowth.chartPanel.footerInsight.text}</span>
            </div>
          </div>

          {/* Dark Panel - AI Insights */}
          <div className="flex flex-col rounded-2xl p-5 border border-blue-500/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-blue-300 mb-1">
                <Cpu className="w-4 h-4" />
                <h4 className="font-bold text-sm text-white">{dashboardData.dashboard.competencyGrowth.stratifyBrainPanel.title}</h4>
              </div>
              <p className="text-[10px] text-blue-300/70 mb-5">Last update: {dashboardData.dashboard.competencyGrowth.stratifyBrainPanel.lastUpdate}</p>
              
              <div className="bg-white/10 border border-white/10 rounded-xl p-4 mb-5 backdrop-blur-sm">
                <p className="text-xs text-blue-100 leading-relaxed">
                  {dashboardData.dashboard.competencyGrowth.stratifyBrainPanel.overallSummary}
                </p>
              </div>

              <h5 className="text-[10px] uppercase font-bold text-blue-300/70 mb-3 tracking-widest">Insights</h5>
              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {dashboardData.dashboard.competencyGrowth.stratifyBrainPanel.insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-20 shrink-0">
                      <span className="text-xs font-bold text-white/90 group-hover:text-blue-300 transition-colors">{insight.period}</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">{insight.title}</h5>
                      <p className="text-[10px] text-blue-200/70 leading-normal">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}} />
    </div>
  );
}
