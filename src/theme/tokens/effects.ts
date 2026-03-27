import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';

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

/** Scale shadow opacity values by an intensity multiplier */
function scaleOpacity(baseOpacity: number, intensity: number): number {
  return Math.min(1, baseOpacity * intensity);
}

export function createEffects(
  brand: BrandTokens,
  mode: ColorMode = 'light',
  profile: StyleProfile = DEFAULT_STYLE_PROFILE,
): Effects {
  const c = brand.colors;
  const isDark = mode === 'dark';
  const { useInset, intensity, brandTinted } = profile.shadows;

  // Derive brand-tinted shadow colors from actual brand tokens
  const { r: br, g: bg, b: bb } = hexToRgb(c.brand200);       // chip inner shadows
  const { r: pr, g: pg, b: pb } = hexToRgb(c.contentPrimary);  // drop shadow tint
  const { r: dr, g: dg, b: db } = hexToRgb(c.bgBaseInverse);   // inner dark tint
  const { r: b4r, g: b4g, b: b4b } = hexToRgb(c.brand400);     // brand accent for tinted drops

  // Shadow ingredients adapt to mode AND intensity
  const innerLight   = isDark
    ? `rgba(255, 255, 255, ${scaleOpacity(0.06, intensity)})`
    : `rgba(252, 252, 255, ${scaleOpacity(0.12, intensity)})`;
  const innerDark    = isDark
    ? `rgba(0, 0, 0, ${scaleOpacity(0.20, intensity)})`
    : `rgba(${dr},${dg},${db}, ${scaleOpacity(0.08, intensity)})`;

  // Drop shadow source: brand-tinted if profile says so, otherwise neutral
  const dropR = brandTinted ? b4r : pr;
  const dropG = brandTinted ? b4g : pg;
  const dropB = brandTinted ? b4b : pb;

  const dropPrimary  = isDark
    ? `rgba(0, 0, 0, ${scaleOpacity(0.30, intensity)})`
    : `rgba(${dropR},${dropG},${dropB}, ${scaleOpacity(0.08, intensity)})`;
  const dropSecondary = isDark
    ? `rgba(0, 0, 0, ${scaleOpacity(0.20, intensity)})`
    : `rgba(233, 230, 237, ${scaleOpacity(0.1, intensity)})`;
  const innerSecDark = isDark
    ? `rgba(0, 0, 0, ${scaleOpacity(0.15, intensity)})`
    : `rgba(158, 157, 160, ${scaleOpacity(0.08, intensity)})`;
  const chipInner    = isDark ? `rgba(${br},${bg},${bb}, 0.10)` : `rgba(${br},${bg},${bb}, 0.22)`;
  const chipInner2   = isDark ? `rgba(${br},${bg},${bb}, 0.14)` : `rgba(${br},${bg},${bb}, 0.32)`;

  // Hover-state shadow ingredients
  const dropPrimaryHover   = isDark
    ? `rgba(0, 0, 0, ${scaleOpacity(0.40, intensity)})`
    : `rgba(${dropR},${dropG},${dropB}, ${scaleOpacity(0.16, intensity)})`;
  const dropSecondaryHover = isDark
    ? `rgba(0, 0, 0, ${scaleOpacity(0.30, intensity)})`
    : `rgba(233, 230, 237, ${scaleOpacity(0.2, intensity)})`;

  // Helper: build shadow with or without inset parts based on profile
  const buttonShadow = (drop: string, insetA: string, insetB: string) => {
    const parts = [`2px 2px 12px 0px ${drop}`];
    if (useInset) {
      parts.push(`inset 2px 2px 4px 0px ${insetA}`);
      parts.push(`inset 2px -2px 4px 0px ${insetB}`);
    }
    return parts.join(', ');
  };

  const buttonHoverShadow = (drop: string, insetA: string, insetB: string) => {
    const parts = [`2px 2px 16px 0px ${drop}`];
    if (useInset) {
      parts.push(`inset 2px 2px 4px 0px ${insetA}`);
      parts.push(`inset 2px -2px 4px 0px ${insetB}`);
    }
    return parts.join(', ');
  };

  // If intensity is 0 → no shadows at all
  const noShadow = intensity === 0;

  return {
    mode,
    gradients: {
      primary: `linear-gradient(180deg, ${c.brand400}, ${c.brand450})`,
      secondary: `linear-gradient(180deg, ${c.bgElevated}, ${c.bgBase})`,
      inactive: `linear-gradient(180deg, ${c.bgSunken}, ${c.bgSunkenDeep})`,
    },
    shadows: {
      primaryButton: noShadow ? 'none' : buttonShadow(dropPrimary, innerLight, innerDark),
      primaryButtonHover: noShadow ? 'none' : buttonHoverShadow(dropPrimaryHover, innerLight, innerDark),
      secondaryButton: noShadow ? 'none' : buttonShadow(dropSecondary, innerLight, innerSecDark),
      secondaryButtonHover: noShadow ? 'none' : buttonHoverShadow(dropSecondaryHover, innerLight, innerSecDark),
      inactive: noShadow ? 'none' : (useInset
        ? [`inset 0px 4px 4px 0px ${innerLight}`, `inset 0px -4px 4px 0px ${innerDark}`].join(', ')
        : `0px 2px 8px 0px ${dropSecondary}`),
      innerElement: noShadow ? 'none' : [
        `2px 2px 8px 0px ${isDark ? `rgba(0, 0, 0, ${scaleOpacity(0.25, intensity)})` : `rgba(${dr},${dg},${db}, ${scaleOpacity(0.08, intensity)})`}`,
        ...(useInset ? [`inset -1px -1px 2px 0px ${isDark ? `rgba(0, 0, 0, ${scaleOpacity(0.20, intensity)})` : `rgba(${dr},${dg},${db}, ${scaleOpacity(0.14, intensity)})`}`] : []),
      ].join(', '),
      textfield: noShadow ? 'none' : (useInset
        ? [`inset 0px -4px 4px 0px ${innerLight}`, `inset 0px 4px 4px 0px ${innerLight}`].join(', ')
        : 'none'),
      chipBrand: noShadow ? 'none' : (useInset
        ? [`inset 0px 4px 4px 0px ${chipInner}`, `inset 0px -4px 4px 0px ${chipInner2}`].join(', ')
        : `0px 1px 4px 0px ${chipInner}`),
      sidebar: noShadow ? 'none' : `1px 0px 8px 0px ${isDark ? `rgba(0, 0, 0, ${scaleOpacity(0.20, intensity)})` : `rgba(${pr},${pg},${pb}, ${scaleOpacity(0.04, intensity)})`}`,
    },
  };
}
