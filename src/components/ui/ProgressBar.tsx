/**
 * Strativy design-system progress bar — token-based track & fill.
 */

export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger';

interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  darkMode?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
}

const fillClasses: Record<ProgressBarVariant, string> = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
};

export function ProgressBar({
  value,
  variant = 'primary',
  darkMode = false,
  size = 'sm',
  className = '',
  'aria-label': ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const height = size === 'md' ? 'h-2' : 'h-1.5';
  const track = darkMode ? 'bg-neutral-800' : 'bg-neutral-200';

  return (
    <div
      className={`w-full ${height} rounded-full overflow-hidden ${track} ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ease-out ${fillClasses[variant]}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
