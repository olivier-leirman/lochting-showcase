import type { StyleDefinition } from './types';

export const SOFT_MINIMAL_STYLE: StyleDefinition = {
  id: 'soft-minimal',
  name: 'Soft Minimal',
  description: 'Gentle, airy design with generous spacing, soft shadows, large radii, and subtle color usage.',

  surface: {
    blur: 0,
    cardBg: '',
    cardBorder: '',
    inputBg: '',
  },

  elevation: {
    none: 'none',
    low: '0 1px 4px rgba(0,0,0,0.04)',
    medium: '0 2px 12px rgba(0,0,0,0.06)',
    high: '0 4px 24px rgba(0,0,0,0.08)',
  },

  interaction: {
    hoverEffect: 'opacity-shift',
    activeEffect: 'scale-down',
    focusRing: 'ring-3px-offset',
    transitionDuration: '0.2s',
    transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  borderRadius: {
    mode: 'absolute',
    sm: 10,
    md: 16,
    lg: 24,
  },

  shadows: {
    useInset: false,
    intensity: 0.6,
    brandTinted: false,
  },

  buttonPrimary: 'solid',
  buttonSecondary: 'ghost',
  cardTreatment: 'elevated',
  inputTreatment: 'outlined',
};
