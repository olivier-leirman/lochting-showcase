import type { BrandTokens } from '../types';

export const LOCHTING: BrandTokens = {
  id: 'lochting',
  name: 'Lochting',
  colors: {
    // Brand accent colors — from Figma brand/ primitives
    brand100: '#efe7fb',   // brand/50
    brand200: '#d8c4f6',   // brand/100
    brand300: '#be9cf1',   // brand/200
    brand400: '#8a54dd',   // brand/400 — primary gradient top
    brand450: '#6029b2',   // brand/600 — primary gradient bottom
    brand500: '#41197d',   // brand/700

    // Backgrounds — from Figma NeutralColor/modes lo-background-lm
    bgBase:         '#f7f7fc',   // neutral/light/100
    bgElevated:     '#fcfcff',   // neutral/light/50
    bgSunken:       '#f0f0f7',   // neutral/light/200
    bgSunkenDeep:   '#e9e9f0',   // neutral/light/225
    bgSunkenDeeper: '#d5d5db',   // neutral/light/275
    bgSurface:          '#1a163b08',  // bgBaseInverse at ~3% opacity
    bgSurfaceSecondary: '#1a163b0f',  // bgBaseInverse at ~6% opacity
    bgSubtle:       '#e5e5ff',   // neutral/light/300
    bgBaseInverse:     '#1a163b', // neutral/dark/650
    bgInverseSecondary: '#302b57', // neutral/dark/500
    bgOverlay:      '#08052499', // near-black at 60%

    // Content — from Figma NeutralColor/modes lo-content-*-lm (solid colors)
    contentPrimary:   '#200845',   // brand/900
    contentSecondary: '#464170',   // neutral/dark/400
    contentTertiary:  '#7e7699',   // neutral/dark/200
    contentSpot:      '#9189a3',   // neutral/dark/150
    contentSpotWeak:  '#20084526', // contentPrimary at ~15% — transparent overlay
    contentStayLight: '#fcfcff',   // neutral/light/50 — always light
    contentStayDark:  '#200845',   // brand/900 — always dark
    contentInversePrimary:   '#fcfcff',   // neutral/light/50
    contentInverseSecondary: '#d5d5db',   // neutral/light/275
    contentInverseSpot:      '#a098b2',   // neutral/dark/100

    // Borders — from Figma custom/theme Border/*
    borderDefault:   '#ebebf1',
    borderWeak:      '#f0f0f6',
    borderStrong:    '#dfdfe6',
    borderStrongest: '#d3d3dc',

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

  // Explicit dark-mode overrides from Figma NeutralColor/modes lo-*-dm
  darkOverrides: {
    bgBase:         '#1a163b',   // neutral/dark/650
    bgElevated:     '#1f1a45',   // neutral/dark/600
    bgSunken:       '#0f0b36',   // neutral/dark/700
    bgSunkenDeep:   '#0c092b',   // neutral/dark/750
    bgSunkenDeeper: '#080524',   // neutral/dark/800
    bgBaseInverse:     '#fcfcff', // neutral/light/50 (swap)
    bgInverseSecondary: '#d5d5db', // neutral/light/275 (swap)
    bgSubtle:       '#464170',   // neutral/dark/400

    contentPrimary:   '#fcfcff',   // neutral/light/50
    contentSecondary: '#d5d5db',   // neutral/light/275
    contentTertiary:  '#a098b2',   // neutral/dark/100
    contentSpot:      '#9189a3',   // neutral/dark/150
    contentSpotWeak:  '#fcfcff33', // contentStayLight at ~20% — transparent overlay
    contentStayLight: '#fcfcff',   // stays light
    contentStayDark:  '#200845',   // stays dark
    contentInversePrimary:   '#200845',   // brand/900 (swap)
    contentInverseSecondary: '#464170',   // neutral/dark/400 (swap)
    contentInverseSpot:      '#7e7699',   // neutral/dark/200

    // Borders — from Figma custom/theme Border/* DM (solid colors)
    borderDefault:   '#363061',
    borderWeak:      '#26214b',
    borderStrong:    '#4d487a',
    borderStrongest: '#736e99',

    // System feedback — from Figma custom/theme System/* DM
    error: {
      contentStrong: '#fda4af',  // borderWeak — bright for dark bg
      bgWeakest: '#540c22',
      bgDefault: '#f43f5e',
      borderWeak: '#fda4af',
    },
    warning: {
      contentStrong: '#fcd34d',  // borderWeak — bright for dark bg
      bgWeakest: '#451e09',
      bgDefault: '#fbbf24',
      borderWeak: '#fcd34d',
    },
    info: {
      contentStrong: '#93c5fd',  // borderWeak — bright for dark bg
      bgWeakest: '#132457',
      bgDefault: '#3b82f6',
      borderWeak: '#93c5fd',
    },
    success: {
      contentStrong: '#6ee7b7',  // borderWeak — bright for dark bg
      bgWeakest: '#043629',
      bgDefault: '#10b981',
      borderWeak: '#6ee7b7',
    },
  },

  // Brand scale — from Figma brand/ primitives (50–900), 950 extrapolated
  brandScale: {
    '50':  '#efe7fb',   // brand/50
    '100': '#d8c4f6',   // brand/100
    '200': '#be9cf1',   // brand/200
    '300': '#a173e8',   // brand/300
    '400': '#8a54dd',   // brand/400
    '500': '#7434d2',   // brand/500
    '600': '#6029b2',   // brand/600
    '700': '#41197d',   // brand/700
    '800': '#38136e',   // brand/800
    '900': '#200845',   // brand/900
    '950': '#120428',   // extrapolated darker
  },
  typography: {
    displayFont: '"Calibre", sans-serif',
    bodyFont: '"Calibre", sans-serif',
  },
};
