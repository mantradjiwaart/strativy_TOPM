/**
 * Strativy design-token class bundles for consistent light/dark UI.
 */

export function card(dark: boolean): string {
  return dark
    ? 'bg-neutral-900/50 border-neutral-800'
    : 'bg-white border-neutral-200 shadow-sm';
}

export function cardInset(dark: boolean): string {
  return dark
    ? 'bg-neutral-950 border-neutral-800'
    : 'bg-neutral-50 border-neutral-200';
}

export function label(dark: boolean): string {
  return dark ? 'text-neutral-400' : 'text-neutral-600';
}

export function labelMuted(dark: boolean): string {
  return dark ? 'text-neutral-500' : 'text-neutral-500';
}

export function value(dark: boolean): string {
  return dark ? 'text-neutral-100' : 'text-neutral-800';
}

/** Softer body text — tables, secondary labels */
export function valueSoft(dark: boolean): string {
  return dark ? 'text-neutral-300' : 'text-neutral-700';
}

export function sectionEyebrow(dark: boolean): string {
  return `text-xs font-black uppercase tracking-widest font-mono ${label(dark)}`;
}

export function kpiLabel(dark: boolean): string {
  return `block text-[10px] font-extrabold uppercase tracking-widest font-mono ${label(dark)}`;
}

export function calloutPrimary(dark: boolean): string {
  return dark
    ? 'bg-primary-500/10 text-primary-300 border-primary-500/20'
    : 'bg-primary-50 text-primary-800 border-primary-200';
}

export function calloutSuccess(dark: boolean): string {
  return dark
    ? 'bg-success-500/10 text-success-400 border-success-500/20'
    : 'bg-success-50 text-success-800 border-success-200';
}

export function calloutWarning(dark: boolean): string {
  return dark
    ? 'bg-warning-500/10 text-warning-400 border-warning-500/20'
    : 'bg-warning-50 text-warning-800 border-warning-200';
}

export function calloutDanger(dark: boolean): string {
  return dark
    ? 'bg-danger-500/10 text-danger-400 border-danger-500/20'
    : 'bg-danger-50 text-danger-800 border-danger-200';
}

export function badgePositive(dark: boolean): string {
  return dark
    ? 'bg-success-500/15 text-success-400'
    : 'bg-success-50 text-success-700';
}

export function badgeNegative(dark: boolean): string {
  return dark
    ? 'bg-danger-500/15 text-danger-400'
    : 'bg-danger-50 text-danger-700';
}
