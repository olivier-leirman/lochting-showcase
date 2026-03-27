import type { BrandTokens } from '../types';

/**
 * Medipim — Glass AI
 * ──────────────────
 * Extracted from the Variant.com-generated design system concept.
 *
 * Key characteristics:
 *  – Glassmorphism: translucent white cards (white/40), frosted borders
 *  – Sky-blue primary palette (Tailwind sky scale, shifted cooler than base Medipim)
 *  – Slate neutrals instead of teal-tinged neutrals
 *  – Prominent inset + drop shadows with white inner glow
 *  – Brand-tinted drop shadows on primary buttons (rgba(56,189,248,0.3))
 *  – Very rounded corners (32px cards, full-round pills)
 *  – Inter font family
 *  – AI-forward visual language (sparkle icons, gradient pills)
 *
 * Shadow tokens (glass-*):
 *  – glass-primary:   inset top white glow + inset bottom dark + brand-tinted drop
 *  – glass-secondary: inset white glow + soft neutral drop
 *  – glass-card:      inset white glow + large neutral drop
 *  – glass-input:     inset recessed dark + outer white glow
 */
export const MEDIPIM_GLASS: BrandTokens = {
  id: 'medipim-glass',
  name: 'Medipim Glass AI',
  colors: {
    // Brand accent — shifted to Tailwind sky blue (cooler, more saturated)
    brand100: '#e0f2fe',   // sky-100
    brand200: '#bae6fd',   // sky-200
    brand300: '#7dd3fc',   // sky-300
    brand400: '#38bdf8',   // sky-400 — primary / gradient top
    brand450: '#0284c7',   // sky-600 — gradient bottom
    brand500: '#0369a1',   // sky-700

    // Backgrounds — pure slate, no teal tint (from Variant body bg #f8fafc)
    bgBase:         '#f8fafc',   // slate-50
    bgElevated:     '#ffffff',   // pure white (card content)
    bgSunken:       '#f1f5f9',   // slate-100
    bgSunkenDeep:   '#e2e8f0',   // slate-200
    bgSunkenDeeper: '#cbd5e1',   // slate-300
    bgSurface:          '#ffffff66',  // white/40 — glassmorphism surface
    bgSurfaceSecondary: '#ffffff80',  // white/50 — stronger glass
    bgSubtle:       '#f0f9ff',   // sky-50 — brand-tinted subtle
    bgBaseInverse:     '#0f172a', // slate-900
    bgInverseSecondary: '#1e293b', // slate-800
    bgOverlay:      '#0f172a99', // slate-900 at 60%

    // Content — slate scale (clean, neutral)
    contentPrimary:   '#0f172a',   // slate-900
    contentSecondary: '#475569',   // slate-600
    contentTertiary:  '#94a3b8',   // slate-400
    contentSpot:      '#94a3b8',   // slate-400
    contentSpotWeak:  '#0f172a1a', // slate-900 at 10%
    contentStayLight: '#ffffff',
    contentStayDark:  '#0f172a',
    contentInversePrimary:   '#f8fafc',
    contentInverseSecondary: '#cbd5e1',
    contentInverseSpot:      '#94a3b8',

    // Borders — slate + glass white (from border-white, border-slate-200/60)
    borderDefault:   '#e2e8f0',   // slate-200
    borderWeak:      '#f1f5f9',   // slate-100 (almost invisible)
    borderStrong:    '#cbd5e1',   // slate-300
    borderStrongest: '#94a3b8',   // slate-400

    // Brand feedback
    brand: {
      contentStrong: '#0369a1',   // sky-700
      bgWeakest: '#f0f9ff',       // sky-50
      bgDefault: '#38bdf8',       // sky-400
      borderWeak: '#bae6fd',      // sky-200
    },

    // System feedback — matches Variant design (emerald success, rose error)
    error: {
      contentStrong: '#9f1239',   // rose-800
      bgWeakest: '#fff1f2',       // rose-50
      bgDefault: '#f43f5e',       // rose-500
      borderWeak: '#fecdd3',      // rose-200
    },
    warning: {
      contentStrong: '#854d0e',   // yellow-800
      bgWeakest: '#fefce8',       // yellow-50
      bgDefault: '#eab308',       // yellow-500
      borderWeak: '#fde68a',      // yellow-200
    },
    info: {
      contentStrong: '#1e40af',   // blue-800
      bgWeakest: '#eff6ff',       // blue-50
      bgDefault: '#3b82f6',       // blue-500
      borderWeak: '#bfdbfe',      // blue-200
    },
    success: {
      contentStrong: '#065f46',   // emerald-800
      bgWeakest: '#ecfdf5',       // emerald-50
      bgDefault: '#10b981',       // emerald-500
      borderWeak: '#a7f3d0',      // emerald-200
    },
  },

  darkOverrides: {
    bgBase:         '#0f172a',   // slate-900
    bgElevated:     '#1e293b',   // slate-800
    bgSunken:       '#0b1120',   // darker than slate-900
    bgSunkenDeep:   '#080d1a',
    bgSunkenDeeper: '#050912',
    bgBaseInverse:     '#f8fafc',
    bgInverseSecondary: '#cbd5e1',
    bgSubtle:       '#1e293b',
    bgSurface:          '#1e293b66',  // dark glass
    bgSurfaceSecondary: '#1e293b80',

    contentPrimary:   '#f8fafc',
    contentSecondary: '#cbd5e1',
    contentTertiary:  '#94a3b8',
    contentSpot:      '#64748b',
    contentSpotWeak:  '#f8fafc2e',
    contentStayLight: '#ffffff',
    contentStayDark:  '#0f172a',
    contentInversePrimary:   '#0f172a',
    contentInverseSecondary: '#475569',
    contentInverseSpot:      '#64748b',

    borderDefault:   '#334155',   // slate-700
    borderWeak:      '#1e293b',   // slate-800
    borderStrong:    '#475569',   // slate-600
    borderStrongest: '#64748b',   // slate-500

    brand: {
      contentStrong: '#7dd3fc',   // sky-300
      bgWeakest: '#082f49',       // sky-950
      bgDefault: '#38bdf8',       // sky-400
      borderWeak: '#7dd3fc',      // sky-300
    },

    error: {
      contentStrong: '#fecdd3',
      bgWeakest: '#4c0519',
      bgDefault: '#f43f5e',
      borderWeak: '#fecdd3',
    },
    warning: {
      contentStrong: '#fde68a',
      bgWeakest: '#422006',
      bgDefault: '#eab308',
      borderWeak: '#fde68a',
    },
    info: {
      contentStrong: '#bfdbfe',
      bgWeakest: '#172554',
      bgDefault: '#3b82f6',
      borderWeak: '#bfdbfe',
    },
    success: {
      contentStrong: '#a7f3d0',
      bgWeakest: '#022c22',
      bgDefault: '#10b981',
      borderWeak: '#a7f3d0',
    },
  },

  // Sky-blue scale (Tailwind sky)
  brandScale: {
    '50':  '#f0f9ff',
    '100': '#e0f2fe',
    '200': '#bae6fd',
    '300': '#7dd3fc',
    '400': '#38bdf8',
    '500': '#0ea5e9',
    '600': '#0284c7',
    '700': '#0369a1',
    '800': '#075985',
    '900': '#0c4a6e',
    '950': '#082f49',
  },

  accents: {
    label: 'AI Emerald & Warm Slate',
    colors: {
      emerald: {
        light: '#ecfdf5',
        default: '#10b981',
        dark: '#065f46',
      },
      indigo: {
        light: '#eef2ff',
        default: '#6366f1',
        dark: '#3730a3',
      },
      amber: {
        light: '#fffbeb',
        default: '#f59e0b',
        dark: '#92400e',
      },
    },
  },

  // StyleProfile: Glassmorphism — translucent surfaces, backdrop blur, pill shapes,
  //   brand-tinted drop shadows, NO inset shadows
  styleProfile: {
    label: 'Glassmorphism',
    radius: { sm: 12, md: 20, lg: 32 },
    surface: {
      blur: 16,
      cardBg: 'rgba(255, 255, 255, 0.40)',
      cardBorder: '1px solid rgba(255, 255, 255, 0.60)',
      inputBg: 'rgba(255, 255, 255, 0.50)',
    },
    shadows: { useInset: false, intensity: 0.8, brandTinted: true },
    buttonPrimary: 'glass',
    buttonSecondary: 'glass',
    cardExtra: {
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
    },
    inputExtra: {
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    },
  },
  typography: {
    displayFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    headingWeight: 700,
    strongWeight: 600,
  },
};
