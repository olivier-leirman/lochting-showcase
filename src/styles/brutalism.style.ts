import type { StyleDefinition } from './types';

export const BRUTALISM_STYLE: StyleDefinition = {
  id: 'brutalism',
  name: 'Brutalism',
  description: 'Bold, raw aesthetic with sharp corners, heavy borders, offset shadows, and high contrast.',

  surface: {
    blur: 0,
    cardBg: '',
    cardBorder: '3px solid',
    inputBg: '',
  },

  elevation: {
    none: 'none',
    low: '3px 3px 0 rgba(0,0,0,0.90)',
    medium: '5px 5px 0 rgba(0,0,0,0.90)',
    high: '8px 8px 0 rgba(0,0,0,0.90)',
  },

  interaction: {
    hoverEffect: 'lift',
    activeEffect: 'press-in',
    focusRing: 'outline-dashed',
    transitionDuration: '0.1s',
    transitionEasing: 'ease-out',
  },

  borderRadius: {
    mode: 'absolute',
    sm: 0,
    md: 0,
    lg: 0,
  },

  shadows: {
    useInset: false,
    intensity: 2,
    brandTinted: false,
  },

  buttonPrimary: 'solid',
  buttonSecondary: 'outlined-flat',
  cardTreatment: 'bordered',
  inputTreatment: 'bordered',
};
