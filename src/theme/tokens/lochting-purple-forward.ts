import type { BrandTokens } from '../types';

/**
 * Lochting — Purple Forward
 * ─────────────────────────
 * Inspired by the "Company Overview" dashboard and Biliex references.
 * Purple is more present — in backgrounds, gradients, and surface tints.
 * Feels tech-forward and bold while still professional.
 *
 * Key differences from base Lochting:
 *  – Backgrounds carry a noticeable purple tint
 *  – Brand scale is shifted slightly warmer / more vibrant
 *  – Borders have more purple character
 *  – Hero/gradient surfaces can feel immersive
 *  – Content contrast is strong for dashboard readability
 */
export const LOCHTING_PURPLE_FORWARD: BrandTokens = {
  id: 'lochting-purple-forward',
  name: 'Lochting Purple Forward',
  colors: {
    // Brand accent colors — slightly more vibrant primary
    brand100: '#ece2fc',
    brand200: '#d4bdf7',
    brand300: '#b58ef2',
    brand400: '#7c44d8',   // shifted slightly deeper/richer
    brand450: '#5722a8',   // deeper gradient bottom
    brand500: '#3a1473',

    // Backgrounds — distinctly purple-tinted
    bgBase:         '#f5f3fb',   // warm lavender-white
    bgElevated:     '#faf9ff',   // elevated with purple warmth
    bgSunken:       '#eeecf7',   // purple-gray sunken
    bgSunkenDeep:   '#e6e3f2',   // deeper purple-gray
    bgSunkenDeeper: '#d4d0e3',   // strongest purple-gray
    bgSurface:          '#7c44d80a',  // brand at 4% — visible tint
    bgSurfaceSecondary: '#7c44d812',  // brand at 7% — noticeable tint
    bgSubtle:       '#e8e0ff',   // stronger lavender for highlights
    bgBaseInverse:     '#1a1240', // deep purple-black
    bgInverseSecondary: '#2d2560',
    bgOverlay:      '#0a063099',

    // Content — strong contrast for readability
    contentPrimary:   '#180640',   // very deep purple-black
    contentSecondary: '#3e3568',   // mid purple-gray
    contentTertiary:  '#706894',   // lighter
    contentSpot:      '#8a82a8',   // decorative
    contentSpotWeak:  '#18064022', // 13% transparent
    contentStayLight: '#faf9ff',
    contentStayDark:  '#180640',
    contentInversePrimary:   '#faf9ff',
    contentInverseSecondary: '#d4d0e3',
    contentInverseSpot:      '#9e96b8',

    // Borders — purple-tinted, slightly more visible
    borderDefault:   '#e8e5f3',   // purple-tinted default
    borderWeak:      '#edeaf5',   // light purple
    borderStrong:    '#dcd8eb',   // medium purple
    borderStrongest: '#cfcae0',   // strongest, clearly purple

    // Brand feedback — richer tints
    brand: {
      contentStrong: '#3a1473',
      bgWeakest: '#ece2fc',
      bgDefault: '#7c44d8',
      borderWeak: '#d4bdf7',
    },

    // System feedback
    error: {
      contentStrong: '#881337',
      bgWeakest: '#fff0f1',
      bgDefault: '#e11d48',
      borderWeak: '#fda4af',
    },
    warning: {
      contentStrong: '#78350f',
      bgWeakest: '#fffbeb',
      bgDefault: '#f59e0b',
      borderWeak: '#fcd34d',
    },
    info: {
      contentStrong: '#1e3a8a',
      bgWeakest: '#eef4ff',
      bgDefault: '#3b82f6',
      borderWeak: '#93c5fd',
    },
    success: {
      contentStrong: '#064e3b',
      bgWeakest: '#ecfdf5',
      bgDefault: '#10b981',
      borderWeak: '#6ee7b7',
    },
  },

  darkOverrides: {
    bgBase:         '#1a1240',
    bgElevated:     '#211850',
    bgSunken:       '#110c38',
    bgSunkenDeep:   '#0c082e',
    bgSunkenDeeper: '#080524',
    bgBaseInverse:     '#faf9ff',
    bgInverseSecondary: '#d4d0e3',
    bgSubtle:       '#3e3568',

    contentPrimary:   '#faf9ff',
    contentSecondary: '#d4d0e3',
    contentTertiary:  '#9e96b8',
    contentSpot:      '#8a82a8',
    contentSpotWeak:  '#faf9ff30',
    contentStayLight: '#faf9ff',
    contentStayDark:  '#180640',
    contentInversePrimary:   '#180640',
    contentInverseSecondary: '#3e3568',
    contentInverseSpot:      '#706894',

    borderDefault:   '#342d64',
    borderWeak:      '#252050',
    borderStrong:    '#4a4380',
    borderStrongest: '#6f68a0',

    brand: {
      contentStrong: '#d4bdf7',
      bgWeakest: '#271058',
      bgDefault: '#7c44d8',
      borderWeak: '#d4bdf7',
    },

    error: {
      contentStrong: '#fda4af',
      bgWeakest: '#500d20',
      bgDefault: '#e11d48',
      borderWeak: '#fda4af',
    },
    warning: {
      contentStrong: '#fcd34d',
      bgWeakest: '#401c08',
      bgDefault: '#fbbf24',
      borderWeak: '#fcd34d',
    },
    info: {
      contentStrong: '#93c5fd',
      bgWeakest: '#122252',
      bgDefault: '#3b82f6',
      borderWeak: '#93c5fd',
    },
    success: {
      contentStrong: '#6ee7b7',
      bgWeakest: '#033225',
      bgDefault: '#10b981',
      borderWeak: '#6ee7b7',
    },
  },

  accents: {
    label: 'Electric Cyan & Vivid Amber',
    colors: {
      cyan: {
        light: '#e6f6fc',
        default: '#22a8d4',
        dark: '#146580',
      },
      amber: {
        light: '#fef6e6',
        default: '#d4a022',
        dark: '#806114',
      },
      mint: {
        light: '#e8faf4',
        default: '#38c990',
        dark: '#1f7a55',
      },
    },
  },
  brandScale: {
    '50':  '#ece2fc',
    '100': '#d4bdf7',
    '200': '#b58ef2',
    '300': '#9a6beb',
    '400': '#7c44d8',
    '500': '#6830c5',
    '600': '#5722a8',
    '700': '#3a1473',
    '800': '#311064',
    '900': '#180640',
    '950': '#0e0326',
  },
  // StyleProfile: Purple Forward — tight radius, bold shadows, gradient everything
  styleProfile: {
    label: 'Bold Forward',
    radius: { sm: 6, md: 8, lg: 12 },
    surface: {
      blur: 0,
      cardBg: '',
      cardBorder: '',
      inputBg: '',
    },
    shadows: { useInset: true, intensity: 1.4, brandTinted: true },
    buttonPrimary: 'gradient',
    buttonSecondary: 'gradient',
  },
  typography: {
    displayFont: '"Calibre", sans-serif',
    bodyFont: '"Calibre", sans-serif',
  },
};
