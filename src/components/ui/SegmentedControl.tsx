/**
 * Segmented filter control — monochrome active state via action tokens.
 */

import { cn } from '../../lib/cn';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  darkMode,
  className = '',
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        'inline-flex p-1 rounded-full border gap-0.5',
        'bg-[var(--color-bg-surface)] border-[var(--color-border-default)]',
        className,
      )}
      role="tablist"
    >
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option)}
            className={cn(
              'px-3 py-1.5 text-[10px] font-semibold rounded-full transition-all duration-200',
              active
                ? 'bg-[var(--color-action-main)] text-[var(--color-action-text)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]',
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
