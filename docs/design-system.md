# Strativy Boardroom Core — Design System

Minimalist light + dark design system for the boardroom dashboard. Tokens are generated from the monorepo source of truth at `money-flow/design-tokens.js`.

## Token pipeline

```bash
npm run tokens   # regenerates src/styles/tokens.css
npm run build    # runs tokens automatically via prebuild
```

**Generator:** `scripts/generate-tokens.mjs`  
**Output:** `src/styles/tokens.css` with `:root` (light) and `.dark` (dark) semantic CSS variables.

## Principles

| Principle | Light | Dark |
|-----------|-------|------|
| Primary action | `#212121` | `#E0E0E0` |
| Surfaces | Grayscale elevation, subtle borders | Same |
| Semantic color | Status only (muted bg + high-contrast text) | Same |
| Typography | Inter 400/500/600/700 only | Same |
| Spacing | 8pt grid (`--space-1` = 4px … `--space-16` = 64px) | Same |
| Radius | sm 4px · md 6px · lg 8px · xl 12px | Same |

## CSS variable reference

### Surfaces & text
- `--color-bg-page`, `--color-bg-surface`, `--color-bg-elevated`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse`

### Action (monochrome)
- `--color-action-main`, `--color-action-hover`, `--color-action-active`, `--color-action-disabled`, `--color-action-text`

### Semantic status
- `--color-success-*`, `--color-error-*`, `--color-warning-*`, `--color-info-*` (each: `bg`, `text`, `border`)

## Tailwind integration

`src/index.css` maps tokens into Tailwind v4 `@theme` utilities and global styles (focus ring, tables, brain markdown).

Dark mode: toggle `dark` class on `<html>` via `App.tsx` `useEffect` when `darkMode` state changes.

## UI primitives

Located in `src/components/ui/`:

| Component | Purpose |
|-----------|---------|
| `Button` | Primary / secondary / ghost / danger actions |
| `Card` | Elevated or inset surface container |
| `Input` | Text input with token borders |
| `Badge` | Status chips (default + semantic variants) |
| `Alert` | Callout blocks |
| `KpiCard` | Metric tile (monochrome default, semantic accents) |
| `SegmentedControl` | Filter tabs with action fill when active |
| `ProgressBar` | Monochrome default fill; semantic for status |

**Helpers:** `src/lib/cn.ts` (class merge), `src/lib/uiTheme.ts` (dark-aware class bundles).

## Usage examples

```tsx
import { Button, Card, Badge, KpiCard } from '@/components/ui';
import * as ui from '@/lib/uiTheme';

<Card className="p-5">
  <KpiCard darkMode={darkMode} label="Revenue" accent="default" value="$1.2B" />
  <Badge variant="success">On track</Badge>
  <Button variant="primary">Run analysis</Button>
</Card>
```

## Updating tokens

1. Edit `money-flow/design-tokens.js`
2. Run `npm run tokens` in `strativy-boardroom-core`
3. Verify UI in light and dark mode

Do not hand-edit `src/styles/tokens.css` — it is auto-generated.
