/**
 * L1-style KPI card — monochrome values, muted labels, semantic accents only.
 */

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import * as ui from '../../lib/uiTheme';

export type KpiAccent = 'default' | 'success' | 'warning' | 'error' | 'info';

const accentStyles: Record<KpiAccent, { value: string; iconBg: string; icon: string }> = {
  default: {
    value: 'text-[var(--color-text-primary)]',
    iconBg: 'bg-[var(--color-bg-surface)]',
    icon: 'text-[var(--color-text-secondary)]',
  },
  success: {
    value: 'text-[var(--color-success-text)]',
    iconBg: 'bg-[var(--color-success-bg)]',
    icon: 'text-[var(--color-success-text)]',
  },
  warning: {
    value: 'text-[var(--color-warning-text)]',
    iconBg: 'bg-[var(--color-warning-bg)]',
    icon: 'text-[var(--color-warning-text)]',
  },
  error: {
    value: 'text-[var(--color-error-text)]',
    iconBg: 'bg-[var(--color-error-bg)]',
    icon: 'text-[var(--color-error-text)]',
  },
  info: {
    value: 'text-[var(--color-info-text)]',
    iconBg: 'bg-[var(--color-info-bg)]',
    icon: 'text-[var(--color-info-text)]',
  },
};

interface KpiCardProps {
  darkMode: boolean;
  label: string;
  value: ReactNode;
  accent?: KpiAccent;
  icon?: ReactNode;
  footer?: ReactNode;
  id?: string;
  className?: string;
}

export function KpiCard({
  darkMode,
  label,
  value,
  accent = 'default',
  icon,
  footer,
  id,
  className = '',
}: KpiCardProps) {
  const a = accentStyles[accent];

  return (
    <div
      id={id}
      className={cn(
        'p-5 rounded-[var(--radius-xl)] border transition-all duration-300 hover:shadow-[var(--shadow-md)] text-left',
        ui.card(darkMode),
        className,
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <span className={ui.kpiLabel(darkMode)}>{label}</span>
        {icon ? (
          <div className={cn('p-1.5 rounded-[var(--radius-sm)] shrink-0', a.iconBg, a.icon)}>
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <div className={cn('text-2xl font-bold tracking-tight', a.value)}>{value}</div>
        {footer ? <div className="mt-1.5">{footer}</div> : null}
      </div>
    </div>
  );
}
