/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Info, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BoardAdvisorClient } from '../clients/BoardAdvisorClient';
import { TelemetryContextBuilder } from '../domain';
import { BRAIN_USER_MESSAGES, toUserFacingBrainError } from '../lib/brainUserMessages';
import * as ui from '../lib/uiTheme';
import type { BusinessUnit, GroupMetrics } from '../types';

const boardAdvisorClient = new BoardAdvisorClient();
const telemetryContextBuilder = new TelemetryContextBuilder();

interface StrativyBrainProps {
  darkMode: boolean;
  simulatedBUs: Record<string, BusinessUnit>;
  groupMetrics: GroupMetrics;
}

export default function StrativyBrain({
  darkMode,
  simulatedBUs,
  groupMetrics,
}: StrativyBrainProps) {
  const [prompt, setPrompt] = useState<string>(
    'Analyze the holding company ecosystem bottlenecks and suggest a capital reallocation plan to maximize overall ESG score without letting EBITDA drop below $800M.'
  );
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const presets = [
    {
      title: 'Analyze Property ➔ Hotel Leases',
      prompt:
        'Evaluate the operational dependency and commercial friction between Property leasing and Luxe Hospitality portfolio margins. What are the key ESG/Capital allocation trade-offs?',
      accent: 'text-primary-600 dark:text-primary-400 border-primary-500/25',
    },
    {
      title: 'Oil to Renewable Transition Path',
      prompt:
        'Draft a strategic roadmap to shift $150M of fossil capital from Oil & Gas exploration to offshore clean turbine grids without breaching our $800M consolidated EBITDA target.',
      accent: 'text-warning-600 dark:text-warning-400 border-warning-500/25',
    },
    {
      title: 'ESG & Carbon Offsets Audit',
      prompt:
        'Identify which Business Units present the lowest capital return index relative to carbon offsets, and provide a 3-step capital structural rebalance.',
      accent: 'text-success-600 dark:text-success-400 border-success-500/25',
    },
  ];

  const askBrain = async (customPrompt?: string) => {
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
      });
      setResponse(text);
    } catch (e: unknown) {
      setErrorMsg(toUserFacingBrainError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="strativy-brain-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      <div id="presets-sidebar-column" className="lg:col-span-4 space-y-4">
        <div>
          <h4 className={ui.sectionEyebrow(darkMode)}>Board Preset Scenarios</h4>
          <p className={`text-[11px] mt-0.5 ${ui.label(darkMode)}`}>
            Focus STRATIVY BRAIN analysis on key corporate frictions & targets.
          </p>
        </div>

        <div className="space-y-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => askBrain(preset.prompt)}
              disabled={loading}
              className={`w-full text-left p-4 rounded-2xl border text-xs transition-all duration-300 hover:scale-[1.01] hover:border-primary-500 hover:bg-primary-500/5 ${
                loading ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'
              } ${ui.card(darkMode)}`}
              type="button"
            >
              <div className={`flex justify-between items-center font-bold font-mono border-b pb-2 mb-2 ${preset.accent}`}>
                <span>{preset.title}</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </div>
              <p className={`text-[10px] mt-1.5 line-clamp-2 leading-normal font-mono ${ui.label(darkMode)}`}>
                {preset.prompt}
              </p>
            </button>
          ))}
        </div>

        <div className={`p-4 rounded-2xl text-[10px] leading-relaxed border font-mono ${ui.calloutPrimary(darkMode)}`}>
          <strong>Autonomous Packaging:</strong> Upon clicking any preset, all active simulator
          values, revenue metrics, ESG scores, and portfolio growth weights are compiled and
          securely pushed as context to STRATIVY BRAIN.
        </div>
      </div>

      <div id="brain-dialog-console" className="lg:col-span-8 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="board-query-textbox"
            className={`${ui.sectionEyebrow(darkMode)} block`}
          >
            Custom Board query
          </label>
          <textarea
            id="board-query-textbox"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Interrogate our portfolio holdings using deep telemetry prompts..."
            className={`w-full p-4 text-xs rounded-2xl h-20 focus:outline-none focus:ring-2 focus:ring-primary-500/40 font-mono border ${
              darkMode
                ? 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500'
                : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'
            }`}
          />
          <div className="flex justify-between items-center gap-3">
            <span className={`text-[10px] flex items-center font-mono ${ui.label(darkMode)}`}>
              <Info className="w-3.5 h-3.5 mr-1 text-primary-500 shrink-0" />
              Connected to STRATIVY BRAIN
            </span>
            <button
              onClick={() => askBrain()}
              disabled={loading || !prompt.trim()}
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl flex items-center space-x-2 transition-all disabled:opacity-50 font-mono cursor-pointer shadow-sm"
              type="button"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>STRATIVY BRAIN Consulting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run STRATIVY BRAIN</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div
          className={`p-5 rounded-2xl border min-h-[220px] text-xs leading-relaxed flex flex-col justify-between transition-all duration-300 ${ui.cardInset(darkMode)}`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-14">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              <p className={`text-xs font-mono text-center max-w-md leading-relaxed ${ui.label(darkMode)}`}>
                Compiling real-time sector logs, balancing ESG vectors and generating
                recommendations...
              </p>
            </div>
          ) : response ? (
            <div className="space-y-4">
              <div className={`flex justify-between items-center pb-2 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <span className="font-extrabold uppercase tracking-widest text-[9px] text-primary-600 dark:text-primary-400 font-mono">
                  ✨ STRATIVY BRAIN Output
                </span>
                <span className={`text-[10px] font-mono ${ui.labelMuted(darkMode)}`}>
                  Live Secure Connection
                </span>
              </div>
              <div className="brain-markdown pr-1 select-text space-y-2 max-w-none font-mono text-left">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          ) : errorMsg ? (
            <div className="space-y-3 py-10 text-center">
              <span className="text-danger-600 dark:text-danger-400 block font-bold font-mono">{errorMsg}</span>
              <p className={`text-[10px] max-w-sm mx-auto leading-normal font-mono ${ui.label(darkMode)}`}>
                {BRAIN_USER_MESSAGES.helpHint}
              </p>
            </div>
          ) : (
            <div className={`italic py-16 text-center font-mono ${ui.label(darkMode)}`}>
              💡 Consult STRATIVY BRAIN to generate immediate balance-sheet forecasts, carbon
              trade-off insights, and action plans. Click any preset on the left to start.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
