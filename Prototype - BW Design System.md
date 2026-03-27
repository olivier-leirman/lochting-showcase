---
type: prototype
status: active
project: "Baldwin Design System"
client: "Baldwin"
tech-stack: ["React", "TypeScript", "Vite", "MUI"]
repo: ""
local-path: "Claude Code/bw-design-system"
figma-link: ""
date-created: 2025-03-19
tags:
  - type/prototype
  - client/baldwin
  - platform/medipim
  - platform/lochting
---

# Prototype — BW Design System

## Overview
Het Baldwin design system gebouwd als React/MUI showcase applicatie. Bevat een volledige component bibliotheek met brand theming voor zowel Medipim als Lochting, inclusief dark mode support.

## Context
- **Project:** [[Medipim - Project Brief]], [[Lochting-Meditech - Project Brief]]
- **Client:** Baldwin (intern)
- **Doel:** Design System showcase & documentatie

## Tech Stack
- React + TypeScript + Vite
- MUI (Material UI) als basis component library
- Brand theming via custom tokens
- Dark mode support

## Lokaal Draaien
```bash
cd "Claude Code/bw-design-system"
npm install
npm run dev
```

## Architectuur
- `src/theme/tokens/` — Design tokens per brand
  - `medipim.ts` — Medipim brand tokens
  - `lochting.ts` — Lochting brand tokens
  - `primitives.ts` — Shared primitive tokens
- `src/theme/overrides/` — MUI component overrides (22 componenten)
- `src/components/` — Custom componenten (AdvancedTable, ActivityTimeline, MultiSelect, etc.)
- `src/showcase/` — Showcase pages per component categorie

## Componenten
| Component | Type | Notes |
|-----------|------|-------|
| AdvancedTable | Custom | Geavanceerde tabel met sorting, filtering |
| ActivityTimeline | Custom | Tijdlijn voor activiteiten/logs |
| MultiSelect | Custom | Multi-selectie met chips |
| SearchField | Custom | Zoekveld component |
| ToggleChip | Custom | Toggle chip filter |
| AppSidebar | Layout | Navigatie sidebar |
| AppTopBar | Layout | Top navigatie bar |

## MUI Theme Overrides
Button, Card, Checkbox, Chip, DatePicker, Dialog, Radio, Select, Slider, Stepper, Switch, Table, Tabs, TextField, ToggleButton, Accordion, Autocomplete, Badge, ButtonGroup, Navigation, Global

## Design Decisions
| Beslissing | Rationale |
|-----------|-----------|
| MUI als basis | Snelste weg naar volledige component set, goede accessibility defaults |
| Brand tokens per klant | Eén codebase, meerdere brands — schaalbaar voor Baldwin |
| Dark mode | Toekomstbestendig, goede test voor kleurcontrast |

## Related
- **Design System:** [[Medipim Design System]], [[Lochting Design System]]
- **MOC:** [[MOC-Prototypes]], [[MOC-Design-Systems]]
