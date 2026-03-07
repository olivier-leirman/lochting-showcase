import type { BrandTokens } from '../types';

export interface EffectPreset {
  boxShadow: string;
}

export interface GradientPreset {
  background: string;
}

export interface Effects {
  mode: ColorMode;
  gradients: {
    primary: string;
    secondary: string;
    inactive: string;
  };
  shadows: {
    primaryButton: string;
    primaryButtonHover: string;
    secondaryButton: string;
    secondaryButtonHover: string;
    inactive: string;
    innerElement: string;
    textfield: string;
    chipBrand: string;
  };
}

export type ColorMode = 'light' | 'dark';

export function createEffects(brand: BrandTokens, mode: ColorMode = 'light'): Effects {
  const c = brand.colors;
  const isDark = mode === 'dark';

  // Shadow ingredients adapt to mode
  const innerLight  = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(252, 252, 255, 0.12)';
  const innerDark   = isDark ? 'rgba(0, 0, 0, 0.20)'       : 'rgba(31, 26, 69, 0.08)';
  const dropPrimary = isDark ? 'rgba(0, 0, 0, 0.30)'        : 'rgba(32, 8, 69, 0.08)';
  const dropSecondary = isDark ? 'rgba(0, 0, 0, 0.20)'      : 'rgba(233, 230, 237, 0.1)';
  const innerSecDark = isDark ? 'rgba(0, 0, 0, 0.15)'       : 'rgba(158, 157, 160, 0.08)';
  const chipInner   = isDark ? 'rgba(216, 196, 246, 0.10)'  : 'rgba(216, 196, 246, 0.22)';
  const chipInner2  = isDark ? 'rgba(216, 196, 246, 0.14)'  : 'rgba(216, 196, 246, 0.32)';

  // Hover-state shadow ingredients
  const dropPrimaryHover  = isDark ? 'rgba(0, 0, 0, 0.40)'  : 'rgba(32, 8, 69, 0.16)';
  const dropSecondaryHover = isDark ? 'rgba(0, 0, 0, 0.30)' : 'rgba(233, 230, 237, 0.2)';

  return {
    mode,
    gradients: {
      // Primary gradient — brand colors, same in both modes
      primary: `linear-gradient(180deg, ${c.brand400}, ${c.brand450})`,
      // Secondary gradient — adapts via the brand.colors (light or dark) passed in
      secondary: `linear-gradient(180deg, ${c.bgElevated}, ${c.bgBase})`,
      // Inactive gradient — adapts via brand.colors
      inactive: `linear-gradient(180deg, ${c.bgSunken}, ${c.bgSunkenDeep})`,
    },
    shadows: {
      // Primary button: drop shadow + light top-left inner + dark bottom-right inner
      primaryButton: [
        `2px 2px 12px 0px ${dropPrimary}`,
        `inset 2px 2px 4px 0px ${innerLight}`,
        `inset 2px -2px 4px 0px ${innerDark}`,
      ].join(', '),
      primaryButtonHover: [
        `2px 2px 16px 0px ${dropPrimaryHover}`,
        `inset 2px 2px 4px 0px ${innerLight}`,
        `inset 2px -2px 4px 0px ${innerDark}`,
      ].join(', '),
      // Secondary button: subtle drop + light inner + grey inner
      secondaryButton: [
        `2px 2px 6px 0px ${dropSecondary}`,
        `inset 2px 2px 4px 0px ${innerLight}`,
        `inset 2px -2px 4px 0px ${innerSecDark}`,
      ].join(', '),
      secondaryButtonHover: [
        `2px 2px 10px 0px ${dropSecondaryHover}`,
        `inset 2px 2px 4px 0px ${innerLight}`,
        `inset 2px -2px 4px 0px ${innerSecDark}`,
      ].join(', '),
      // Inactive/sunken: light top inner + dark bottom inner
      inactive: [
        `inset 0px 4px 4px 0px ${innerLight}`,
        `inset 0px -4px 4px 0px ${innerDark}`,
      ].join(', '),
      // Inner element (switch/slider thumb): drop shadow + dark inner
      innerElement: [
        `2px 2px 8px 0px ${isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(31, 26, 69, 0.08)'}`,
        `inset -1px -1px 2px 0px ${isDark ? 'rgba(0, 0, 0, 0.20)' : 'rgba(31, 26, 69, 0.14)'}`,
      ].join(', '),
      // Textfield: symmetric inner light shadows
      textfield: [
        `inset 0px -4px 4px 0px ${innerLight}`,
        `inset 0px 4px 4px 0px ${innerLight}`,
      ].join(', '),
      // Chip brand: brand-tinted inner shadows
      chipBrand: [
        `inset 0px 4px 4px 0px ${chipInner}`,
        `inset 0px -4px 4px 0px ${chipInner2}`,
      ].join(', '),
    },
  };
}
