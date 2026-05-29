import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  inset?: boolean;
}

export function Card({ children, className, inset = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border transition-all duration-200',
        inset
          ? 'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]'
          : 'bg-[var(--color-bg-elevated)] border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
