import type { BrandTokens } from '../types';

export const MEDIPIM: BrandTokens = {
  id: 'medipim',
  name: 'Medipim',
  colors: {
    // Brand accent colors — from Figma mp-brand/ primitives
    brand100: '#d4f1fb',   // mp-brand/50
    brand200: '#aae4f7',   // mp-brand/100
    brand300: '#7fd6f2',   // mp-brand/200
    brand400: '#2abbea',   // mp-brand/400 — primary gradient top
    brand450: '#1183a7',   // mp-brand/600 — primary gradient bottom
    brand500: '#0c627e',   // mp-brand/700

    // Backgrounds — from Figma NeutralColor/modes mp-background-lm
    bgBase:         '#fafcfc',   // mp-neutral/50
    bgElevated:     '#ffffff',   // mp-neutral/0
    bgSunken:       '#e6f0f0',   // mp-neutral/100
    bgSunkenDeep:   '#d3e4e4',   // mp-neutral/150
    bgSunkenDeeper: '#bfd9d9',   // mp-neutral/200
    bgSurface:          '#18272708',  // bgBaseInverse at ~3% opacity
    bgSurfaceSecondary: '#1827270f',  // bgBaseInverse at ~6% opacity
    bgSubtle:       '#accdcd',   // mp-neutral/250
    bgBaseInverse:     '#182727', // mp-neutral/800
    bgInverseSecondary: '#233b3b', // mp-neutral/750
    bgOverlay:      '#0c141499', // near-black at 60%

    // Content — from Figma NeutralColor/modes mp-content-*-lm (solid colors)
    contentPrimary:   '#04212a',   // mp-brand/900
    contentSecondary: '#2f4e4e',   // mp-neutral/700
    contentTertiary:  '#657676',   // mp-neutral/600-grayish
    contentSpot:      '#8a9d9d',   // mp-neutral/400-greyish
    contentSpotWeak:  '#04212a26', // contentPrimary at ~15% — transparent overlay
    contentStayLight: '#fcfcff',   // neutral/light/50 — always light
    contentStayDark:  '#04212a',   // mp-brand/900 — always dark
    contentInversePrimary:   '#fafcfc',   // mp-neutral/50
    contentInverseSecondary: '#bfd9d9',   // mp-neutral/200
    contentInverseSpot:      '#8a9d9d',   // mp-neutral/400-greyish

    // Borders — from Figma mp-neutral scale
    borderDefault:   '#d3e4e4',   // mp-neutral/150
    borderWeak:      '#e6f0f0',   // mp-neutral/100
    borderStrong:    '#bfd9d9',   // mp-neutral/200
    borderStrongest: '#accdcd',   // mp-neutral/250

    // Brand feedback — mirrors error/warning/info/success for dark-mode adaptability
    brand: {
      contentStrong: '#0c627e',   // mp-brand/700 — dark for light bg
      bgWeakest: '#d4f1fb',       // mp-brand/50 — very light tint
      bgDefault: '#2abbea',       // mp-brand/400 — primary accent
      borderWeak: '#aae4f7',      // mp-brand/100 — light border
    },

    // System feedback — from Figma custom/theme System/*
    error: {
      contentStrong: '#881337',
      bgWeakest: '#fff1f2',
      bgDefault: '#f43f5e',
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
      bgWeakest: '#eff6ff',
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

  // Explicit dark-mode overrides from Figma NeutralColor/modes mp-*-dm
  darkOverrides: {
    bgBase:         '#182727',   // mp-neutral/800
    bgElevated:     '#233b3b',   // mp-neutral/750
    bgSunken:       '#111c1c',   // mp-neutral/850
    bgSunkenDeep:   '#0c1414',   // mp-neutral/900
    bgSunkenDeeper: '#080f0f',   // mp-neutral/950
    bgBaseInverse:     '#fafcfc', // mp-neutral/50 (swap)
    bgInverseSecondary: '#bfd9d9', // mp-neutral/200 (swap)
    bgSubtle:       '#2f4e4e',   // mp-neutral/700

    contentPrimary:   '#fafcfc',   // mp-neutral/50
    contentSecondary: '#bfd9d9',   // mp-neutral/200
    contentTertiary:  '#8a9d9d',   // mp-neutral/400-greyish
    contentSpot:      '#657676',   // mp-neutral/600-grayish
    contentSpotWeak:  '#fcfcff33', // contentStayLight at ~20% — transparent overlay
    contentStayLight: '#fcfcff',   // stays light
    contentStayDark:  '#04212a',   // stays dark
    contentInversePrimary:   '#04212a',   // mp-brand/900 (swap)
    contentInverseSecondary: '#2f4e4e',   // mp-neutral/700 (swap)
    contentInverseSpot:      '#657676',   // mp-neutral/600-grayish

    // Borders — solid colors from mp-neutral dark scale
    borderDefault:   '#2f4e4e',   // mp-neutral/700
    borderWeak:      '#233b3b',   // mp-neutral/750
    borderStrong:    '#3b6262',   // mp-neutral/650
    borderStrongest: '#477676',   // mp-neutral/500

    // Brand feedback — DM (mirrors system colors pattern)
    brand: {
      contentStrong: '#aae4f7',   // mp-brand/100 — bright for dark bg
      bgWeakest: '#0a2e3b',       // deep dark teal — between mp-brand/800 and /900
      bgDefault: '#2abbea',       // mp-brand/400 — unchanged
      borderWeak: '#aae4f7',      // mp-brand/100 — bright border
    },

    // System feedback — from Figma custom/theme System/* DM
    // contentStrong flipped to bright values for readability on dark backgrounds
    error: {
      contentStrong: '#fda4af',  // bright for dark bg (matches Lochting pattern)
      bgWeakest: '#540c22',
      bgDefault: '#f43f5e',
      borderWeak: '#fda4af',
    },
    warning: {
      contentStrong: '#fcd34d',  // bright for dark bg
      bgWeakest: '#451e09',
      bgDefault: '#fbbf24',
      borderWeak: '#fcd34d',
    },
    info: {
      contentStrong: '#93c5fd',  // bright for dark bg
      bgWeakest: '#132457',
      bgDefault: '#3b82f6',
      borderWeak: '#93c5fd',
    },
    success: {
      contentStrong: '#6ee7b7',  // bright for dark bg
      bgWeakest: '#043629',
      bgDefault: '#10b981',
      borderWeak: '#6ee7b7',
    },
  },

  // Brand scale — from Figma mp-brand/ primitives (50–900), 950 extrapolated
  brandScale: {
    '50':  '#d4f1fb',   // mp-brand/50
    '100': '#aae4f7',   // mp-brand/100
    '200': '#7fd6f2',   // mp-brand/200
    '300': '#55c9ee',   // mp-brand/300
    '400': '#2abbea',   // mp-brand/400
    '500': '#15a3d1',   // mp-brand/500
    '600': '#1183a7',   // mp-brand/600
    '700': '#0c627e',   // mp-brand/700
    '800': '#084154',   // mp-brand/800
    '900': '#04212a',   // mp-brand/900
    '950': '#021015',   // extrapolated darker
  },
  typography: {
    displayFont: '"Azo Sans", sans-serif',
    bodyFont: '"Azo Sans", sans-serif',
    headingWeight: 500,
    strongWeight: 500,
  },
};
