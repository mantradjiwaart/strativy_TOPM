/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Info, 
  ChevronRight, 
  RefreshCw,
  FileText
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BoardAdvisorClient } from '../clients/BoardAdvisorClient';
import { TelemetryContextBuilder } from '../domain';
import type { GeminiModelId } from '../config/gemini';
import type { BusinessUnit, GroupMetrics } from '../types';

const boardAdvisorClient = new BoardAdvisorClient();
const telemetryContextBuilder = new TelemetryContextBuilder();

interface AIAdvisorProps {
  darkMode: boolean;
  simulatedBUs: Record<string, BusinessUnit>;
  groupMetrics: GroupMetrics;
  geminiModel: GeminiModelId;
  geminiModels: readonly GeminiModelId[];
  onGeminiModelChange: (model: GeminiModelId) => void;
}

export default function AIAdvisor({
  darkMode,
  simulatedBUs,
  groupMetrics,
  geminiModel,
  geminiModels,
  onGeminiModelChange,
}: AIAdvisorProps) {
  
  const [prompt, setPrompt] = useState<string>(
    'Analyze the holding company ecosystem bottlenecks and suggest a capital reallocation plan to maximize overall ESG score without letting EBITDA drop below $800M.'
  );
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Preset Board Queries
  const presets = [
    {
      title: 'Analyze Property ➔ Hotel Leases',
      prompt: 'Evaluate the operational dependency and commercial friction between Property leasing and Luxe Hospitality portfolio margins. What are the key ESG/Capital allocation trade-offs?',
      color: 'text-blue-500 border-blue-500/20'
    },
    {
      title: 'Oil to Renewable Transition Path',
      prompt: 'Draft a strategic roadmap to shift $150M of fossil capital from Oil & Gas exploration to offshore clean turbine grids without breaching our $800M consolidated EBITDA target.',
      color: 'text-amber-500 border-amber-500/20'
    },
    {
      title: 'ESG & Carbon Offsets Audit',
      prompt: 'Identify which Business Units present the lowest capital return index relative to carbon offsets, and provide a 3-step capital structural rebalance.',
      color: 'text-emerald-500 border-emerald-500/20'
    }
  ];

  const askAdvisor = async (customPrompt?: string) => {
    const promptToSend = customPrompt || prompt;
    if (customPrompt) setPrompt(customPrompt);

    setLoading(true);
    setResponse('');
    setErrorMsg('');

    const telemetryContext = telemetryContextBuilder.build(simulatedBUs, groupMetrics);

    try {
      const text = await boardAdvisorClient.generate({
        prompt: promptToSend,
        systemPrompt: telemetryContext,
        model: geminiModel,
      });
      setResponse(text);
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : 'The AI Strategist is momentarily offline. Verify Gemini secrets configuration or try again.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-advisor-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      
      {/* Left 4 Cols: Presets */}
      <div id="presets-sidebar-column" className="lg:col-span-4 space-y-4">
        <div>
          <h4 className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono">Board Preset Scenarios</h4>
          <p className="text-[11px] text-zinc-450 mt-0.5">Focus AI analysis on key corporate frictions & targets.</p>
        </div>

        <div className="space-y-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => askAdvisor(preset.prompt)}
              disabled={loading}
              className={`w-full text-left p-4 rounded-2xl border text-xs transition-all duration-300 hover:scale-[1.01] hover:border-blue-500 hover:bg-blue-500/5 ${
                loading ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
              } ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}
              type="button"
            >
              <div className={`flex justify-between items-center font-bold font-mono ${preset.color}`}>
                <span>{preset.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-normal font-mono">{preset.prompt}</p>
            </button>
          ))}
        </div>

        <div className="p-4 bg-blue-500/5 text-blue-600 dark:text-blue-400 rounded-2xl text-[10px] leading-relaxed border border-blue-500/10 font-mono">
          <strong>Autonomous Packaging:</strong> Upon clicking any preset, all active simulator values, revenue metrics, ESG scores, and portfolio growth weights are compiled and securely pushed as context to the Gemini model.
        </div>
      </div>      {/* Right 8 Cols: Dialogue Console */}
      <div id="advisor-dialog-console" className="lg:col-span-8 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <label htmlFor="gemini-model-select" className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono block">
            Gemini model
          </label>
          <select
            id="gemini-model-select"
            value={geminiModel}
            onChange={(e) => onGeminiModelChange(e.target.value as GeminiModelId)}
            disabled={loading}
            className={`w-full p-3 text-xs rounded-xl font-mono border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-800'
            }`}
          >
            {geminiModels.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>

          <label htmlFor="board-query-textbox" className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-mono block">Custom Board query</label>
          <textarea
            id="board-query-textbox"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Interrogate our portfolio holdings using deep telemetry prompts..."
            className={`w-full p-4 text-xs rounded-2xl h-20 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono border ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-800'
            }`}
          />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center font-mono">
              <Info className="w-3.5 h-3.5 mr-1 text-blue-500" />
              Connected to Gemini Elite Agency
            </span>
            <button
              onClick={() => askAdvisor()}
              disabled={loading || !prompt.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center space-x-2 transition-all disabled:opacity-50 font-mono cursor-pointer"
              type="button"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Board Analyst Consulting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Board AI Advisor</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Console Box response */}
        <div className={`p-5 rounded-2xl border min-h-[220px] text-xs leading-relaxed flex flex-col justify-between transition-all duration-300 ${
          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
        }`}>
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-14">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono text-center max-w-md leading-relaxed">Compiling real-time sector logs, balancing ESG vectors and generating recommendations...</p>
            </div>
          ) : response ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/20">
                <span className="font-extrabold uppercase tracking-widest text-[9px] text-blue-500 font-mono">✨ Strativy Copilot Output</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Live Secure Connection</span>
              </div>
              <div className="markdown-body pr-1 select-text space-y-2 prose max-w-none text-zinc-800 dark:text-zinc-300 font-mono text-left leading-relaxed">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          ) : errorMsg ? (
            <div className="space-y-3 py-10 text-center">
              <span className="text-rose-500 block font-bold font-mono">{errorMsg}</span>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 max-w-sm mx-auto leading-normal font-mono">
                If the key is missing, configure it via the **Secrets** tab inside the Google AI Studio settings sidebar.
              </p>
            </div>
          ) : (
            <div className="text-zinc-550 dark:text-zinc-400 italic py-16 text-center font-mono">
              💡 Consult the AI Advisor to generate immediate balance-sheet forecasts, carbon trade-off insights, and action plans. Click any preset on the left to start.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
