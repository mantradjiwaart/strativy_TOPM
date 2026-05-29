import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2 text-sm rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[var(--color-action-main)] focus:border-[var(--color-border-strong)]',
        'disabled:bg-[var(--color-bg-surface)] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  );
}
