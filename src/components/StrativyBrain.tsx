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
import { cn } from '../lib/cn';
import { Alert, Button } from './ui';
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
      variant: 'default' as const,
    },
    {
      title: 'Oil to Renewable Transition Path',
      prompt:
        'Draft a strategic roadmap to shift $150M of fossil capital from Oil & Gas exploration to offshore clean turbine grids without breaching our $800M consolidated EBITDA target.',
      variant: 'warning' as const,
    },
    {
      title: 'ESG & Carbon Offsets Audit',
      prompt:
        'Identify which Business Units present the lowest capital return index relative to carbon offsets, and provide a 3-step capital structural rebalance.',
      variant: 'success' as const,
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
          <p className={cn('text-[11px] mt-0.5', ui.label(darkMode))}>
            Focus STRATIVY BRAIN analysis on key corporate frictions & targets.
          </p>
        </div>

        <div className="space-y-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => askBrain(preset.prompt)}
              disabled={loading}
              className={cn(
                'w-full text-left p-4 rounded-[var(--radius-xl)] border text-xs transition-all duration-300 hover:scale-[1.01] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]',
                loading ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer',
                ui.card(darkMode),
              )}
              type="button"
            >
              <div className={cn(
                'flex justify-between items-center font-semibold border-b border-[var(--color-border-subtle)] pb-2 mb-2',
                preset.variant === 'warning' ? 'text-[var(--color-warning-text)]' :
                preset.variant === 'success' ? 'text-[var(--color-success-text)]' :
                ui.value(darkMode),
              )}>
                <span>{preset.title}</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </div>
              <p className={cn('text-[10px] mt-1.5 line-clamp-2 leading-normal', ui.label(darkMode))}>
                {preset.prompt}
              </p>
            </button>
          ))}
        </div>

        <Alert variant="info">
          <strong>Autonomous Packaging:</strong> Upon clicking any preset, all active simulator
          values, revenue metrics, ESG scores, and portfolio growth weights are compiled and
          securely pushed as context to STRATIVY BRAIN.
        </Alert>
      </div>

      <div id="brain-dialog-console" className="lg:col-span-8 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <label htmlFor="board-query-textbox" className={cn(ui.sectionEyebrow(darkMode), 'block')}>
            Custom Board query
          </label>
          <textarea
            id="board-query-textbox"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Interrogate our portfolio holdings using deep telemetry prompts..."
            className={cn(
              'w-full p-4 text-xs rounded-[var(--radius-xl)] h-20 focus:outline-none focus:ring-2 focus:ring-[var(--color-action-main)] border',
              'bg-[var(--color-bg-elevated)] border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
            )}
          />
          <div className="flex justify-between items-center gap-3">
            <span className={cn('text-[10px] flex items-center', ui.label(darkMode))}>
              <Info className="w-3.5 h-3.5 mr-1 shrink-0 text-[var(--color-text-secondary)]" />
              Connected to STRATIVY BRAIN
            </span>
            <Button
              onClick={() => askBrain()}
              disabled={loading || !prompt.trim()}
              size="lg"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[var(--color-action-text)] border-t-transparent rounded-full animate-spin" />
                  <span>STRATIVY BRAIN Consulting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run STRATIVY BRAIN</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className={cn(
          'p-5 rounded-[var(--radius-xl)] border min-h-[220px] text-xs leading-relaxed flex flex-col justify-between transition-all duration-300',
          ui.cardInset(darkMode),
        )}>
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-3 py-14">
              <div className="w-10 h-10 border-4 border-[var(--color-action-main)] border-t-transparent rounded-full animate-spin" />
              <p className={cn('text-xs text-center max-w-md leading-relaxed', ui.label(darkMode))}>
                Compiling real-time sector logs, balancing ESG vectors and generating
                recommendations...
              </p>
            </div>
          ) : response ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border-subtle)]">
                <span className={cn('font-semibold uppercase tracking-widest text-[9px]', ui.actionText(darkMode))}>
                  ✨ STRATIVY BRAIN Output
                </span>
                <span className={cn('text-[10px]', ui.labelMuted(darkMode))}>
                  Live Secure Connection
                </span>
              </div>
              <div className="brain-markdown pr-1 select-text space-y-2 max-w-none text-left">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </div>
          ) : errorMsg ? (
            <div className="space-y-3 py-10 text-center">
              <span className="text-[var(--color-error-text)] block font-semibold">{errorMsg}</span>
              <p className={cn('text-[10px] max-w-sm mx-auto leading-normal', ui.label(darkMode))}>
                {BRAIN_USER_MESSAGES.helpHint}
              </p>
            </div>
          ) : (
            <div className={cn('italic py-16 text-center', ui.label(darkMode))}>
              💡 Consult STRATIVY BRAIN to generate immediate balance-sheet forecasts, carbon
              trade-off insights, and action plans. Click any preset on the left to start.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
