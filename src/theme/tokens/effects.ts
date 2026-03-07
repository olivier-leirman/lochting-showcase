import type { BrandTokens } from '../types';

export interface EffectPreset {
  boxShadow: string;
}

export interface GradientPreset {
  background: string;
}

export interface Effects {
  gradients: {
    primary: string;
    secondary: string;
    inactive: string;
  };
  shadows: {
    primaryButton: string;
    secondaryButton: string;
    inactive: string;
    innerElement: string;
    textfield: string;
    chipBrand: string;
  };
}

export function createEffects(brand: BrandTokens): Effects {
  const c = brand.colors;

  return {
    gradients: {
      primary: `linear-gradient(180deg, ${c.brand400}, ${c.brand450})`,
      secondary: `linear-gradient(180deg, ${c.bgElevated}, ${c.bgBase})`,
      inactive: `linear-gradient(180deg, ${c.bgSunken}, ${c.bgSunkenDeep})`,
    },
    shadows: {
      // Primary button: drop shadow + light top-left inner + dark bottom-right inner
      primaryButton: [
        '2px 2px 12px 0px rgba(32, 8, 69, 0.08)',
        'inset 2px 2px 4px 0px rgba(252, 252, 255, 0.12)',
        'inset 2px -2px 4px 0px rgba(31, 26, 69, 0.08)',
      ].join(', '),
      // Secondary button: subtle drop + light inner + grey inner
      secondaryButton: [
        '2px 2px 6px 0px rgba(233, 230, 237, 0.1)',
        'inset 2px 2px 4px 0px rgba(252, 252, 255, 0.12)',
        'inset 2px -2px 4px 0px rgba(158, 157, 160, 0.08)',
      ].join(', '),
      // Inactive/sunken: light top inner + dark bottom inner
      inactive: [
        'inset 0px 4px 4px 0px rgba(252, 252, 255, 0.12)',
        'inset 0px -4px 4px 0px rgba(31, 26, 69, 0.08)',
      ].join(', '),
      // Inner element (switch/slider thumb): drop shadow + dark inner
      innerElement: [
        '2px 2px 8px 0px rgba(31, 26, 69, 0.08)',
        'inset -1px -1px 2px 0px rgba(31, 26, 69, 0.14)',
      ].join(', '),
      // Textfield: symmetric inner light shadows
      textfield: [
        'inset 0px -4px 4px 0px rgba(252, 252, 255, 0.12)',
        'inset 0px 4px 4px 0px rgba(252, 252, 255, 0.12)',
      ].join(', '),
      // Chip brand: brand-tinted inner shadows
      chipBrand: [
        'inset 0px 4px 4px 0px rgba(216, 196, 246, 0.22)',
        'inset 0px -4px 4px 0px rgba(216, 196, 246, 0.32)',
      ].join(', '),
    },
  };
}
