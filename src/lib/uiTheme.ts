/**
 * Strativy minimalist design-token class bundles for light/dark UI.
 * Uses CSS custom properties from tokens.css — no hardcoded palette scales.
 */

export function card(_dark: boolean): string {
  return 'bg-[var(--color-bg-elevated)] border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]';
}

export function cardInset(_dark: boolean): string {
  return 'bg-[var(--color-bg-surface)] border-[var(--color-border-subtle)]';
}

export function label(_dark: boolean): string {
  return 'text-[var(--color-text-secondary)]';
}

export function labelMuted(_dark: boolean): string {
  return 'text-[var(--color-text-muted)]';
}

export function value(_dark: boolean): string {
  return 'text-[var(--color-text-primary)]';
}

export function valueSoft(_dark: boolean): string {
  return 'text-[var(--color-text-secondary)]';
}

export function sectionEyebrow(_dark: boolean): string {
  return `text-xs font-semibold uppercase tracking-widest ${label(_dark)}`;
}

export function kpiLabel(_dark: boolean): string {
  return `block text-[10px] font-semibold uppercase tracking-widest ${label(_dark)}`;
}

export function calloutPrimary(_dark: boolean): string {
  return 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border-[var(--color-border-default)]';
}

export function calloutSuccess(_dark: boolean): string {
  return 'bg-[var(--color-success-bg)] text-[var(--color-success-text)] border-[var(--color-success-border)]';
}

export function calloutWarning(_dark: boolean): string {
  return 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]';
}

export function calloutDanger(_dark: boolean): string {
  return 'bg-[var(--color-error-bg)] text-[var(--color-error-text)] border-[var(--color-error-border)]';
}

export function calloutInfo(_dark: boolean): string {
  return 'bg-[var(--color-info-bg)] text-[var(--color-info-text)] border-[var(--color-info-border)]';
}

export function badgePositive(_dark: boolean): string {
  return 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]';
}

export function badgeNegative(_dark: boolean): string {
  return 'bg-[var(--color-error-bg)] text-[var(--color-error-text)]';
}

export function navActive(_dark: boolean): string {
  return 'bg-[var(--color-action-main)] text-[var(--color-action-text)] shadow-[var(--shadow-sm)]';
}

export function navInactive(_dark: boolean): string {
  return _dark
    ? 'text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-surface)]'
    : 'text-[var(--color-text-secondary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-elevated)] hover:shadow-[var(--shadow-sm)]';
}

export function actionText(_dark: boolean): string {
  return 'text-[var(--color-action-main)]';
}
