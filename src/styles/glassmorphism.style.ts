import type { StyleDefinition } from './types';

export const GLASSMORPHISM_STYLE: StyleDefinition = {
  id: 'glassmorphism',
  name: 'Glassmorphism',
  description: 'Translucent frosted-glass surfaces with backdrop blur, subtle borders, and brand-tinted shadows.',

  surface: {
    blur: 16,
    cardBg: 'rgba(255, 255, 255, 0.40)',
    cardBorder: '1px solid rgba(255, 255, 255, 0.50)',
    inputBg: 'rgba(255, 255, 255, 0.25)',
  },

  elevation: {
    none: 'none',
    low: '0 2px 8px rgba(0,0,0,0.06)',
    medium: '0 4px 16px rgba(0,0,0,0.08)',
    high: '0 8px 32px rgba(0,0,0,0.12)',
  },

  interaction: {
    hoverEffect: 'glow',
    activeEffect: 'scale-down',
    focusRing: 'glow',
    transitionDuration: '0.25s',
    transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  borderRadius: {
    mode: 'absolute',
    sm: 12,
    md: 20,
    lg: 32,
  },

  shadows: {
    useInset: false,
    intensity: 0.8,
    brandTinted: true,
  },

  buttonPrimary: 'glass',
  buttonSecondary: 'glass',
  cardTreatment: 'glass',
  inputTreatment: 'glass',

  cardExtra: {
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  },
  inputExtra: {
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
};
