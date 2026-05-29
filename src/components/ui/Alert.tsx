import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  default:
    'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border-[var(--color-border-default)]',
  success:
    'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)]',
  warning:
    'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]',
  error:
    'bg-[var(--color-error-bg)] text-[var(--color-error-text)] border-[var(--color-error-border)]',
  info:
    'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)]',
};

export function Alert({ variant = 'default', children, className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        'p-3 text-xs leading-relaxed rounded-[var(--radius-lg)] border',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
