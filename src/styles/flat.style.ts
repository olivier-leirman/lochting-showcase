import type { StyleDefinition } from './types';

export const FLAT_STYLE: StyleDefinition = {
  id: 'flat',
  name: 'Flat',
  description: 'Clean, minimal design with no shadows or gradients. Sharp visual hierarchy through color and spacing alone.',

  surface: {
    blur: 0,
    cardBg: '',
    cardBorder: '1px solid',
    inputBg: '',
  },

  elevation: {
    none: 'none',
    low: 'none',
    medium: 'none',
    high: 'none',
  },

  interaction: {
    hoverEffect: 'darken',
    activeEffect: 'scale-down',
    focusRing: 'ring-2px-brand',
    transitionDuration: '0.15s',
    transitionEasing: 'ease-out',
  },

  borderRadius: {
    mode: 'absolute',
    sm: 4,
    md: 8,
    lg: 12,
  },

  shadows: {
    useInset: false,
    intensity: 0,
    brandTinted: false,
  },

  buttonPrimary: 'flat',
  buttonSecondary: 'flat',
  cardTreatment: 'bordered',
  inputTreatment: 'outlined',
};
