# BW Design System v2 — Claude Code Context

## Designer
Olivier Leirman, UX/UI Designer bij Baldwin (agency). Figma, UX Pilot, Baymard Institute.
Projecten: Medipim (pharmacy PIM), Lochting/Meditech (pharmacy webshop + kiosks). Beide React + MUI.

## Project
BW Design System v2 is een **twee-laags design-to-prototype omgeving** voor twee SaaS-platformen:
- **Medipim** — PIM voor farmaceutische producten (oude React codebase, volledige redesign gepland)
- **Lochting/Meditech** — Shopify voor apothekers: webshop + vending machines/kiosks (gedeeltelijk MUI)

Doel: ONE centraal MUI-gebaseerd design system waar beide platformen van laden.
E-commerce (Magento/Hyva, Tailwind + Alpine) is BUITEN scope.

## Architectuur

### Twee Lagen
**Library (Subframe-model):** Gepolijste component library, bron van waarheid. Productie-ready.
**Playground (MagicPath-model):** Creatieve sandbox. Experimenteren → Accept-to-Library → permanent.

### Dual-Layer Components (MUI Core + Base UI)
Twee component-lagen naast elkaar:
- **Base UI** (`@base-ui/react`): Headless, 0 styling, 100% eigen CSS. Voor Style Variants, nieuwe components, Medipim redesign.
- **MUI Core** (`@mui/material`): Pre-styled. Voor complexe components (DataGrid, DatePicker), Lochting backwards compat.
- Tags: `[Base]`, `[MUI]`, `[Hybrid]`
- Beide consumeren dezelfde tokens → visueel identiek bij zelfde Brand × Style.

### Brand × Style Model (twee assen)
- **Brand** = kleuren, typography, spacing (Medipim, Medipim Glass, Lochting, Lochting Purple Forward, Lochting Soft Premium)
- **Style** = visual treatment (Flat, Neumorphism, Glassmorphism, Brutalism, Soft/Minimal)
- Actieve config = Brand × Style combinatie
- Per-pattern style overrides mogelijk (bijv. sidebar nav = soft variant terwijl rest = glassmorphism)

### Token Resolution Flow
```
Inspiration Board (images) → AI → Style Direction (markdown)
                                      ↓
                              style-tokens.ts (visual treatment)
                                      ↓ merge met ↓
primitives.ts (absolute waarden: 4px grid, radius, sizing)
                                      ↓
brand-tokens.ts (semantic mapping per brand)
                                      ↓
┌──────────────┬──────────────────────┐
│  Base UI     │  MUI Core            │
│  CSS vars +  │  createTheme() +     │
│  data-attrs  │  sx overrides        │
└──────────────┴──────────────────────┘
                ↓
        Components
```

### Persistence (geen database)
- **TypeScript token files** → source of truth, git-tracked
- **JSON config files** (`config/`) → workspace prefs, design rules, patterns, style overrides
- **localStorage** → ephemeral UI state only

## Tech Stack
- React 19 + TypeScript + Vite 7
- MUI 7.x + Base UI 1.x (`@base-ui/react`)
- Emotion (CSS-in-JS, MUI's engine)
- React Router (BrowserRouter)
- Material Symbols Rounded (icons)

## File Structuur
```
src/
├── components/base/       ← Base UI components
├── components/mui/        ← MUI-wrapped components
├── config/                ← JSON configs (workspace, rules, patterns, style-overrides)
├── data/                  ← Real data fixtures (Medipim, Lochting)
├── inspiration/           ← Boards per stijl (images + style-direction.md)
├── layout/                ← AppShell, Sidebar, TopBar
├── pages/library/         ← LibraryOverview, ComponentDetail
├── pages/design-system/   ← Token pages, rules, patterns, styles, identity
├── pages/playground/      ← ComponentPlayground, ThemePlayground
├── pages/prototypes/      ← Migrated prototypes
├── styles/                ← Style definitions (flat.style.ts, glassmorphism.style.ts, etc.)
├── theme/                 ← Brand tokens, overrides, BrandProvider
│   ├── overrides/         ← 22 MUI component overrides (style-aware)
│   └── tokens/            ← primitives.ts, brand token files, effects.ts
└── utils/                 ← Helpers, consistency-checker.ts
```

## Design Rules (VERPLICHT bij generatie)

### Spacing & Sizing
- ALTIJD 4-8pt spacing grid. Geen willekeurige waarden.
- Button heights: 40px (sm), 48px (default), 56px (lg) — geen uitzonderingen.
- Border radius: gebruik named tokens (xs=4, sm=8, md=12, lg=16, xl=24).

### Icons
- Library: Google Material Symbols
- Default: weight 300, outlined, rounded
- Fill variant: ALLEEN bij visueel gewicht (active states, selected states)
- EXCEPTIONS: checkbox check icon (filled), check-circle (filled), DatePicker nav arrows (weight 400)
- NOOIT weights mixen — geen weight 400 of sharp tenzij in exception registry

### Color & Contrast
- Primary kleur contrast ratio ≥ 4.5:1 tegen wit
- Nooit opacity < 0.6 voor interactieve elementen

### Component Conventies
- Gebruik MUI `sx` prop voor component-level styling (MUI laag)
- Gebruik CSS custom properties + data-attributes (Base UI laag)
- Altijd TypeScript interfaces voor props
- Altijd named exports
- Bestandsnaam = PascalCase component naam

## Active Style Direction
Wanneer een Style Direction beschikbaar is in `src/inspiration/{active-style}/style-direction.md`, gebruik die als visueel referentiekader bij het genereren van components. De MUI Vertaling sectie bevat concrete `sx` waarden.

## Patterns
- **Primary action:** contained button, brand color
- **Secondary action:** outlined button
- **Tertiary/ghost:** text-only button
- **Destructive:** contained error
- **Hover:** background-opacity-shift
- **Focus:** ring-2px-brand
- **Loading:** skeleton voor content, spinner voor acties

## Vault Referenties
Uitgebreide documentatie beschikbaar in de Obsidian Vault:
- PRD: `01-Projects/PRD - BW Design System v2.md`
- Implementation Plan: `01-Projects/Implementation Plan - BW Design System v2.md`
- Tool research: `02-Areas/AI-Tools-Workflows/Subframe - Visual React Builder.md`
- Tool research: `02-Areas/AI-Tools-Workflows/MagicPath - AI Design Canvas.md`
- Tool research: `02-Areas/AI-Tools-Workflows/Blitzit Approach - Claude Code Design System.md`
- Design Systems MOC: `07-MOCs/MOC-Design-Systems.md`
