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
    sidebar: string;
  };
}

export type ColorMode = 'light' | 'dark';

/** Parse a hex color (#RRGGBB or #RRGGBBAA) into r, g, b components */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function createEffects(brand: BrandTokens, mode: ColorMode = 'light'): Effects {
  const c = brand.colors;
  const isDark = mode === 'dark';

  // Derive brand-tinted shadow colors from actual brand tokens
  const { r: br, g: bg, b: bb } = hexToRgb(c.brand200);       // chip inner shadows
  const { r: pr, g: pg, b: pb } = hexToRgb(c.contentPrimary);  // drop shadow tint
  const { r: dr, g: dg, b: db } = hexToRgb(c.bgBaseInverse);   // inner dark tint

  // Shadow ingredients adapt to mode — light mode uses brand-tinted values
  const innerLight   = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(252, 252, 255, 0.12)';
  const innerDark    = isDark ? 'rgba(0, 0, 0, 0.20)'       : `rgba(${dr},${dg},${db}, 0.08)`;
  const dropPrimary  = isDark ? 'rgba(0, 0, 0, 0.30)'       : `rgba(${pr},${pg},${pb}, 0.08)`;
  const dropSecondary = isDark ? 'rgba(0, 0, 0, 0.20)'      : 'rgba(233, 230, 237, 0.1)';
  const innerSecDark = isDark ? 'rgba(0, 0, 0, 0.15)'       : 'rgba(158, 157, 160, 0.08)';
  const chipInner    = isDark ? `rgba(${br},${bg},${bb}, 0.10)` : `rgba(${br},${bg},${bb}, 0.22)`;
  const chipInner2   = isDark ? `rgba(${br},${bg},${bb}, 0.14)` : `rgba(${br},${bg},${bb}, 0.32)`;

  // Hover-state shadow ingredients
  const dropPrimaryHover   = isDark ? 'rgba(0, 0, 0, 0.40)'  : `rgba(${pr},${pg},${pb}, 0.16)`;
  const dropSecondaryHover = isDark ? 'rgba(0, 0, 0, 0.30)'  : 'rgba(233, 230, 237, 0.2)';

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
        `2px 2px 8px 0px ${isDark ? 'rgba(0, 0, 0, 0.25)' : `rgba(${dr},${dg},${db}, 0.08)`}`,
        `inset -1px -1px 2px 0px ${isDark ? 'rgba(0, 0, 0, 0.20)' : `rgba(${dr},${dg},${db}, 0.14)`}`,
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
      // Sidebar: subtle right-edge drop shadow
      sidebar: `1px 0px 8px 0px ${isDark ? 'rgba(0, 0, 0, 0.20)' : `rgba(${pr},${pg},${pb}, 0.04)`}`,
    },
  };
}
