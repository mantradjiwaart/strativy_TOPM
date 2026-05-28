/**
 * L1-style KPI card — colored metric, tinted icon, soft labels.
 */

import type { ReactNode } from 'react';
import * as ui from '../../lib/uiTheme';

export type KpiAccent =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'teal'
  | 'cyan'
  | 'purple'
  | 'amber'
  | 'pink';

const accentStyles: Record<
  KpiAccent,
  { value: string; iconBg: string; icon: string }
> = {
  primary: {
    value: 'text-primary-600 dark:text-primary-400',
    iconBg: 'bg-primary-500/10',
    icon: 'text-primary-600 dark:text-primary-400',
  },
  success: {
    value: 'text-success-600 dark:text-success-400',
    iconBg: 'bg-success-500/10',
    icon: 'text-success-600 dark:text-success-400',
  },
  warning: {
    value: 'text-warning-600 dark:text-warning-400',
    iconBg: 'bg-warning-500/10',
    icon: 'text-warning-600 dark:text-warning-400',
  },
  danger: {
    value: 'text-danger-600 dark:text-danger-400',
    iconBg: 'bg-danger-500/10',
    icon: 'text-danger-600 dark:text-danger-400',
  },
  teal: {
    value: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-500/10',
    icon: 'text-teal-600 dark:text-teal-400',
  },
  cyan: {
    value: 'text-cyan-600 dark:text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    icon: 'text-cyan-600 dark:text-cyan-400',
  },
  purple: {
    value: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  amber: {
    value: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  pink: {
    value: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-500/10',
    icon: 'text-pink-600 dark:text-pink-400',
  },
};

interface KpiCardProps {
  darkMode: boolean;
  label: string;
  value: ReactNode;
  accent: KpiAccent;
  icon?: ReactNode;
  footer?: ReactNode;
  id?: string;
  className?: string;
}

export function KpiCard({
  darkMode,
  label,
  value,
  accent,
  icon,
  footer,
  id,
  className = '',
}: KpiCardProps) {
  const a = accentStyles[accent];

  return (
    <div
      id={id}
      className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] text-left ${ui.card(darkMode)} ${className}`}
    >
      <div className="flex justify-between items-start gap-2">
        <span className={ui.kpiLabel(darkMode)}>{label}</span>
        {icon ? (
          <div className={`p-1.5 rounded-md shrink-0 ${a.iconBg} ${a.icon}`}>{icon}</div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className={`text-2xl font-black tracking-tight font-mono ${a.value}`}>{value}</div>
        {footer ? <div className="mt-1.5">{footer}</div> : null}
      </div>
    </div>
  );
}
