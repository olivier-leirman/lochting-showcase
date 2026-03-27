import type { BrandTokens } from '../types';

/**
 * Lochting — Soft Premium
 * ───────────────────────
 * Inspired by the "Chatassist" and bento-card references.
 * White-dominant with purple only as a refined accent.
 * Generous whitespace, softer borders, muted neutrals that
 * let the brand purple pop where it matters.
 *
 * Key differences from base Lochting:
 *  – Backgrounds are warmer whites / near-whites (less blue-purple tint)
 *  – Borders are softer and lighter
 *  – Content colors are slightly less contrasty for a relaxed premium feel
 *  – Brand accent stays identical so components stay on-brand
 */
export const LOCHTING_SOFT_PREMIUM: BrandTokens = {
  id: 'lochting-soft-premium',
  name: 'Lochting Soft Premium',
  colors: {
    // Brand accent colors — identical to base Lochting
    brand100: '#efe7fb',
    brand200: '#d8c4f6',
    brand300: '#be9cf1',
    brand400: '#8a54dd',
    brand450: '#6029b2',
    brand500: '#41197d',

    // Backgrounds — warmer, whiter, minimal purple tint
    bgBase:         '#fafafa',   // near-white, warm neutral
    bgElevated:     '#ffffff',   // pure white cards
    bgSunken:       '#f4f4f6',   // very light cool gray
    bgSunkenDeep:   '#ededf0',   // slightly deeper
    bgSunkenDeeper: '#e0e0e5',   // deepest sunken
    bgSurface:          '#1a163b05',  // 2% — barely there
    bgSurfaceSecondary: '#1a163b0a',  // 4% — subtle
    bgSubtle:       '#f0ecf8',   // soft lavender tint for highlights
    bgBaseInverse:     '#1c1832', // dark base — less purple than original
    bgInverseSecondary: '#2e2a4d',
    bgOverlay:      '#08052499',

    // Content — slightly softer contrast
    contentPrimary:   '#1e1535',   // deep purple-black, softer than #200845
    contentSecondary: '#5a5578',   // muted purple-gray
    contentTertiary:  '#8c86a3',   // lighter spot
    contentSpot:      '#a29cb5',   // decorative
    contentSpotWeak:  '#1e153520', // 12% transparent
    contentStayLight: '#ffffff',
    contentStayDark:  '#1e1535',
    contentInversePrimary:   '#ffffff',
    contentInverseSecondary: '#dcdae2',
    contentInverseSpot:      '#a9a3bc',

    // Borders — softer, lighter, more breathable
    borderDefault:   '#f0eff4',   // very soft
    borderWeak:      '#f5f4f8',   // barely visible
    borderStrong:    '#e6e5ec',   // still gentle
    borderStrongest: '#dddce4',   // strongest but still refined

    // Brand feedback
    brand: {
      contentStrong: '#41197d',
      bgWeakest: '#f5f0fd',      // even lighter than base
      bgDefault: '#8a54dd',
      borderWeak: '#e2d4f8',     // softer than base
    },

    // System feedback — softened to match the premium tone
    error: {
      contentStrong: '#9f1239',
      bgWeakest: '#fff5f6',
      bgDefault: '#f43f5e',
      borderWeak: '#fecdd3',
    },
    warning: {
      contentStrong: '#854d0e',
      bgWeakest: '#fffcf0',
      bgDefault: '#f59e0b',
      borderWeak: '#fde68a',
    },
    info: {
      contentStrong: '#1e40af',
      bgWeakest: '#f0f6ff',
      bgDefault: '#3b82f6',
      borderWeak: '#bfdbfe',
    },
    success: {
      contentStrong: '#065f46',
      bgWeakest: '#f0fdf8',
      bgDefault: '#10b981',
      borderWeak: '#a7f3d0',
    },
  },

  darkOverrides: {
    bgBase:         '#161330',
    bgElevated:     '#1c1840',
    bgSunken:       '#0e0b2c',
    bgSunkenDeep:   '#0a0824',
    bgSunkenDeeper: '#07051d',
    bgBaseInverse:     '#fafafa',
    bgInverseSecondary: '#e0e0e5',
    bgSubtle:       '#3d3868',

    contentPrimary:   '#fafafa',
    contentSecondary: '#d5d3de',
    contentTertiary:  '#a9a3bc',
    contentSpot:      '#8c86a3',
    contentSpotWeak:  '#fafafa2e',
    contentStayLight: '#ffffff',
    contentStayDark:  '#1e1535',
    contentInversePrimary:   '#1e1535',
    contentInverseSecondary: '#5a5578',
    contentInverseSpot:      '#8c86a3',

    borderDefault:   '#302b58',
    borderWeak:      '#231f46',
    borderStrong:    '#443f72',
    borderStrongest: '#6b6696',

    brand: {
      contentStrong: '#d8c4f6',
      bgWeakest: '#25104e',
      bgDefault: '#8a54dd',
      borderWeak: '#d8c4f6',
    },

    error: {
      contentStrong: '#fecdd3',
      bgWeakest: '#4c0d1e',
      bgDefault: '#f43f5e',
      borderWeak: '#fecdd3',
    },
    warning: {
      contentStrong: '#fde68a',
      bgWeakest: '#3d1d08',
      bgDefault: '#fbbf24',
      borderWeak: '#fde68a',
    },
    info: {
      contentStrong: '#bfdbfe',
      bgWeakest: '#112250',
      bgDefault: '#3b82f6',
      borderWeak: '#bfdbfe',
    },
    success: {
      contentStrong: '#a7f3d0',
      bgWeakest: '#032e22',
      bgDefault: '#10b981',
      borderWeak: '#a7f3d0',
    },
  },

  accents: {
    label: 'Refined Sage & Warm Sand',
    colors: {
      sage: {
        light: '#eef5f0',
        default: '#6ba87a',
        dark: '#3d6347',
      },
      sand: {
        light: '#faf5ed',
        default: '#c4a265',
        dark: '#7a6438',
      },
      blush: {
        light: '#fdf0f2',
        default: '#d4808e',
        dark: '#8a4450',
      },
    },
  },
  brandScale: {
    '50':  '#f5f0fd',
    '100': '#e2d4f8',
    '200': '#cbb2f3',
    '300': '#a173e8',
    '400': '#8a54dd',
    '500': '#7434d2',
    '600': '#6029b2',
    '700': '#41197d',
    '800': '#38136e',
    '900': '#200845',
    '950': '#120428',
  },
  // StyleProfile: Soft Premium — no inset shadows, larger radius, subtle drop-shadows only
  styleProfile: {
    label: 'Soft Premium',
    radius: { sm: 10, md: 16, lg: 24 },
    surface: {
      blur: 0,
      cardBg: '',
      cardBorder: '1px solid var(--border-weak, #f5f4f8)',
      inputBg: '',
    },
    shadows: { useInset: false, intensity: 0.6, brandTinted: false },
    buttonPrimary: 'solid',
    buttonSecondary: 'outlined-flat',
  },
  typography: {
    displayFont: '"Calibre", sans-serif',
    bodyFont: '"Calibre", sans-serif',
  },
};
