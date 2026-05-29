/**
 * Strativy design-system progress bar — token-based track & fill.
 */

import { cn } from '../../lib/cn';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error';

interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  darkMode?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
}

const fillClasses: Record<ProgressBarVariant, string> = {
  default: 'bg-[var(--color-action-main)]',
  success: 'bg-[var(--color-success-text)]',
  warning: 'bg-[var(--color-warning-text)]',
  error: 'bg-[var(--color-error-text)]',
};

export function ProgressBar({
  value,
  variant = 'default',
  darkMode = false,
  size = 'sm',
  className = '',
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === 'md' ? 'h-2' : 'h-1.5';

  return (
    <div
      className={cn(
        'w-full rounded-full overflow-hidden bg-[var(--color-bg-surface)]',
        height,
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-300 ease-out',
          fillClasses[variant],
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
