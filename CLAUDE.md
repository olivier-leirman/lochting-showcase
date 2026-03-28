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
- **Base UI** (`@base-ui/react`): Headless, 0 styling, 100% eigen CSS via CSS custom properties. Voor Style Variants, nieuwe components, Medipim redesign.
  - `BaseTokenProvider` injecteert brand tokens als CSS vars (`--bw-brand-400`, `--bw-radius-sm`, etc.)
  - Initiële components: `BwButton`, `BwCard`, `BwInput` in `src/components/base/`
- **MUI Core** (`@mui/material`): Pre-styled via `createTheme()` + `sx` overrides. Voor complexe components (DataGrid, DatePicker), Lochting backwards compat.
  - 22 MUI component overrides in `src/theme/overrides/` (⚠️ slechts 5 zijn style-aware via StyleProfile — zie Stap 6 in Action Queue voor propagation fix)
- Tags: `[Base]`, `[MUI]`, `[Hybrid]` — zichtbaar in Library component headers
- Beide consumeren dezelfde brand tokens → visueel identiek bij zelfde Brand × Style.

### Brand × Style Model (twee assen)
- **Brand** = kleuren, typography, spacing (Medipim, Medipim Glass, Lochting, Lochting Purple Forward, Lochting Soft Premium)
- **Style** = visual treatment via `StyleDefinition` interface in `src/styles/`:
  - Flat, Neumorphism, Glassmorphism, Brutalism, Soft/Minimal
  - Definieert: surface, elevation, interaction, borderRadius, shadows, button/card/input treatment
- Actieve config = Brand × Style combinatie, onafhankelijk schakelbaar
- `styleDefinitionToProfile()` in `create-brand-theme.ts` bridget StyleDefinition → StyleProfile voor backwards compatibility met 22 MUI overrides
- `BrandProvider` beheert: platform → style variant + onafhankelijke StyleDefinition override + colorMode + fontPreset

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
- React 19 + TypeScript 5.9 + Vite 7
- MUI 7.x + Base UI 1.3 (`@base-ui/react`)
- Emotion (CSS-in-JS, MUI's engine) — Base UI components use plain CSS
- React Router v7 (BrowserRouter, NIET createBrowserRouter)
- Material Symbols Rounded (icons, weight 300)
- dayjs (date handling voor DatePicker)

## File Structuur
```
src/
├── components/
│   ├── base/              ← Base UI components (BwButton, BwCard, BwInput, BaseTokenProvider)
│   ├── Icon.tsx           ← Material Symbols wrapper
│   ├── StyleSwitcher.tsx  ← Visual style picker grid
│   └── ...                ← Shared components (SearchField, ToggleChip, etc.)
├── data/                  ← Real data fixtures (Medipim, Lochting)
│   ├── types.ts           ← Product, Order, Customer, etc. interfaces
│   ├── medipim/           ← products, categories, suppliers, users
│   ├── lochting/          ← orders, customers, notifications, products
│   └── hooks.ts           ← useMedipimProducts, useLochtingOrders, etc.
├── layout/                ← Responsive layout shell (desktop + tablet + mobile)
│   ├── AppShell.tsx       ← Root layout: ModeStrip + ContextSidebar + content + BottomTabBar
│   ├── ModeStrip.tsx      ← Left nav strip (6rem, desktop only, hidden < md)
│   ├── ContextSidebar.tsx ← Mode sidebar (15rem inline desktop, Drawer on mobile)
│   ├── TopContextBar.tsx  ← Breadcrumbs desktop, hamburger + title mobile
│   ├── BottomTabBar.tsx   ← 5-tab bottom nav (3.5rem, mobile/tablet only)
│   ├── useResponsive.ts   ← Hook: isMobile (<600), isTablet (600-899), isDesktop (≥900)
│   ├── InspectorSidebar.tsx ← Component inspector (desktop only)
│   └── sidebars/          ← ComponentsSidebar, ThemeSidebar, DesignSystemSidebar, PlaygroundSidebar, PrototypesSidebar
├── pages/
│   ├── library/           ← LibraryOverview, ComponentDetail (6 tabs incl. In Context)
│   ├── design-system/     ← Token pages, rules, patterns, styles, identity, consistency
│   ├── playground/        ← ComponentPlayground, ThemePlayground, Sessions
│   ├── home/              ← HomePage with system health dashboard
│   └── prototypes/        ← Per-project prototypes (PrototypesOverview, PrototypePage canvas viewer, MedipimSaasShowcase)
├── prototypes/             ← Prototype registry (prototype-registry.ts: per-platform grouping + folders)
├── inspiration/            ← Inspiration Board persistence (board-store.ts: localStorage per style)
├── showcase/              ← Component registry, register-components.tsx, register-base-components.tsx
├── styles/                ← StyleDefinition interface + 5 style files (flat, neumorphism, glassmorphism, brutalism, soft-minimal)
├── theme/
│   ├── brand-context.tsx  ← BrandProvider (platform/style/colorMode/fontPreset/styleDefinition state)
│   ├── create-brand-theme.ts ← Theme factory + StyleDefinition→StyleProfile bridge
│   ├── overrides/         ← 22 MUI component overrides (style-aware via StyleProfile)
│   └── tokens/            ← primitives.ts, brand token files, effects.ts, font-presets.ts
└── utils/                 ← Helpers, consistency-checker.ts
```

## Component Library
- **6 tabs** per component: Preview, Documentation, Examples, In Context, Code, Styles
- **In Context tab** toont real-world case studies met Medipim/Lochting data fixtures
- **Styles tab** toont component in alle 5 style definitions side by side
- **Component registry** in `src/showcase/registry.ts` — components registreren via `registerComponent()`
- MUI components: `register-components.tsx` | Base UI components: `register-base-components.tsx`

## Design Rules (VERPLICHT bij generatie)

### Typography
- Font weights: ALLEEN regular (400) en medium (500). Geen semibold of bold.
- Hiërarchie via font-size en kleur, niet via weight.

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

### Shadows
- Subtiel: hoge blur, lage opacity (max 0.12). Nooit harsh of solid zwart.
- Resting: `0 1px 4px rgba(0,0,0,0.06)` | Hover: `0 4px 16px rgba(0,0,0,0.08)` | Elevated: `0 8px 24px rgba(0,0,0,0.08)`
- Altijd `rgba(0,0,0)` — nooit solid black of hoge opacity shadows.
- MUI shadow array override in `create-brand-theme.ts` (25 levels, 4-8% opacity).

### Color & Contrast
- Primary kleur contrast ratio ≥ 4.5:1 tegen wit
- Nooit opacity < 0.6 voor interactieve elementen

### Cards (3 types)
- **Static:** flat (`boxShadow: 'none'`), border only, geen hover effect
- **Interactive:** resting shadow `0 1px 4px rgba(0,0,0,0.06)`, hover → `0 4px 16px rgba(0,0,0,0.08)` + border highlight. Gebruik `CardActionArea` voor MUI cards.
- **Section Container:** flat, geen hover, grotere padding (24-32px)
- Radius: 16px standaard (`profile.radius.lg`)
- Hover effects ALLEEN op klikbare cards — nooit op statische/informatieve cards
- Showcase card demos (ElevatedCardDemo, SunkenCardDemo) zijn intentionele uitzonderingen

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

## Post-Task Protocol (ALTIJD UITVOEREN)
Na ELKE taak die code wijzigt of toevoegt, voer je automatisch deze stappen uit — zonder dat Olivier het hoeft te vragen:

1. **PRD updaten** — Open de PRD (`01-Projects/PRD - BW Design System v2.md` in de Obsidian Vault) en:
   - Als de taak een Action Queue stap was: markeer als `✅ DONE` en noteer kort wat gedaan is
   - Als de taak een bestaande feature wijzigt: update de relevante Implementation Audit sectie (§11)
   - Als de taak een nieuw component/pagina/route toevoegt: voeg toe aan de juiste sectie
2. **CLAUDE.md updaten** — Als de taak de architectuur, file structuur, componenten, routes, of design rules verandert: update dit CLAUDE.md bestand zodat het actueel blijft
3. **Rapporteer** — Geef een korte samenvatting van wat gedaan is en welke files gewijzigd zijn

Dit protocol is niet optioneel. De PRD en CLAUDE.md zijn de bron van waarheid — als ze niet bijgewerkt worden, raakt het project uit sync.

## Action Queue (BELANGRIJK)
De PRD bevat een **Claude Code Action Queue** (§11 → "Claude Code Action Queue") met 18 genummerde stappen. Dit is de volgende-stappen roadmap.

**Werkwijze:**
1. Lees de PRD sectie "Claude Code Action Queue" voor de volledige stap
2. Voer de stap uit volgens de instructies en Definition of Done
3. Voer het Post-Task Protocol uit (zie hierboven)
4. Wacht op "ga door" of "start met volgende stap" van Olivier
5. Ga NIET verder zonder bevestiging

**Huidige status:** Start bij de eerste `⏳ TODO` stap.

## Vault Referenties
Uitgebreide documentatie beschikbaar in de Obsidian Vault:
- PRD + Action Queue: `01-Projects/PRD - BW Design System v2.md`
- Implementation Plan: `01-Projects/Implementation Plan - BW Design System v2.md`
- Next Steps (detail): `01-Projects/Next Steps - BW Design System v2.md`
- Component Patterns: `03-Knowledge-Base/UX-Patterns/Component Patterns - Best Practices.md`
- Tool research: `02-Areas/AI-Tools-Workflows/Subframe - Visual React Builder.md`
- Tool research: `02-Areas/AI-Tools-Workflows/MagicPath - AI Design Canvas.md`
- Tool research: `02-Areas/AI-Tools-Workflows/Blitzit Approach - Claude Code Design System.md`
- Design Systems MOC: `07-MOCs/MOC-Design-Systems.md`
