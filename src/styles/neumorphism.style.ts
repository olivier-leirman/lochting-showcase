import type { StyleDefinition } from './types';

export const NEUMORPHISM_STYLE: StyleDefinition = {
  id: 'neumorphism',
  name: 'Neumorphism',
  description: 'Soft, extruded UI elements with dual inset shadows creating a tactile, clay-like appearance.',

  surface: {
    blur: 0,
    cardBg: '',
    cardBorder: '',
    inputBg: '',
  },

  elevation: {
    none: 'none',
    low: '4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.80)',
    medium: '6px 6px 12px rgba(0,0,0,0.10), -6px -6px 12px rgba(255,255,255,0.85)',
    high: '8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.90)',
  },

  interaction: {
    hoverEffect: 'lift',
    activeEffect: 'press-in',
    focusRing: 'ring-2px-brand',
    transitionDuration: '0.2s',
    transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  borderRadius: {
    mode: 'absolute',
    sm: 12,
    md: 16,
    lg: 24,
  },

  shadows: {
    useInset: true,
    intensity: 1.2,
    brandTinted: false,
  },

  buttonPrimary: 'gradient',
  buttonSecondary: 'outlined-flat',
  cardTreatment: 'inset',
  inputTreatment: 'filled',
};
