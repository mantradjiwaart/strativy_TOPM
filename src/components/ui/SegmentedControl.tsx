/**
 * Light-mode-friendly segmented filter (Dept / Team / Employee).
 */

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
      className={`inline-flex p-1 rounded-full border gap-0.5 ${
        darkMode
          ? 'bg-neutral-800 border-neutral-700'
          : 'bg-neutral-100 border-neutral-200'
      } ${className}`}
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
            className={`px-3 py-1.5 text-[10px] font-bold rounded-full transition-all duration-200 ${
              active
                ? darkMode
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-primary-600 text-white shadow-sm'
                : darkMode
                  ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50'
                  : 'text-neutral-600 hover:text-neutral-800 hover:bg-white/80'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
