import { createTheme, type Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from './types';
import { DEFAULT_STYLE_PROFILE } from './types';
import { PRIMITIVES } from './tokens/primitives';
import { createEffects, type Effects, type ColorMode } from './tokens/effects';
import { buildAllOverrides } from './overrides';
import { deriveDarkColors } from './dark-colors';
import type { StyleDefinition } from '../styles/types';

/** Merge partial styleProfile with defaults */
export function resolveStyleProfile(brand: BrandTokens): StyleProfile {
  const partial = brand.styleProfile;
  if (!partial) return DEFAULT_STYLE_PROFILE;
  return {
    ...DEFAULT_STYLE_PROFILE,
    ...partial,
    radius: { ...DEFAULT_STYLE_PROFILE.radius, ...partial.radius },
    surface: { ...DEFAULT_STYLE_PROFILE.surface, ...partial.surface },
    shadows: { ...DEFAULT_STYLE_PROFILE.shadows, ...partial.shadows },
  };
}

/**
 * Convert a standalone StyleDefinition into a StyleProfile that the
 * existing MUI override system understands.
 */
export function styleDefinitionToProfile(style: StyleDefinition): StyleProfile {
  return {
    label: style.name,
    radius: {
      sm: style.borderRadius.sm,
      md: style.borderRadius.md,
      lg: style.borderRadius.lg,
    },
    surface: {
      blur: style.surface.blur,
      cardBg: style.surface.cardBg,
      cardBorder: style.surface.cardBorder,
      inputBg: style.surface.inputBg,
    },
    shadows: {
      useInset: style.shadows.useInset,
      intensity: style.shadows.intensity,
      brandTinted: style.shadows.brandTinted,
    },
    // Map extended button types back to the 3 types overrides understand
    buttonPrimary: (['gradient', 'solid', 'glass'].includes(style.buttonPrimary)
      ? style.buttonPrimary
      : style.buttonPrimary === 'flat' ? 'solid' : 'solid') as 'gradient' | 'solid' | 'glass',
    buttonSecondary: (['gradient', 'outlined-flat', 'glass'].includes(style.buttonSecondary)
      ? style.buttonSecondary
      : style.buttonSecondary === 'ghost' ? 'outlined-flat' : 'outlined-flat') as 'gradient' | 'outlined-flat' | 'glass',
    cardExtra: style.cardExtra,
    inputExtra: style.inputExtra,
  };
}

export function createBrandTheme(
  brand: BrandTokens,
  mode: ColorMode = 'light',
  styleOverride?: StyleDefinition,
): { theme: Theme; effects: Effects; profile: StyleProfile; styleDefinition?: StyleDefinition } {
  // Resolve the style profile: use explicit StyleDefinition if provided, else fall back to brand's profile
  const profile = styleOverride
    ? styleDefinitionToProfile(styleOverride)
    : resolveStyleProfile(brand);

  // Derive dark colors when in dark mode
  const colors = mode === 'dark' ? deriveDarkColors(brand) : brand.colors;
  const effectiveBrand: BrandTokens = { ...brand, colors };

  const effects = createEffects(effectiveBrand, mode, profile);
  const c = colors;
  const p = PRIMITIVES;
  const t = brand.typography;
  const hw = t.headingWeight ?? p.fontWeight.medium;
  const sw = t.strongWeight ?? p.fontWeight.medium;

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: c.brand400, dark: c.brand450, light: c.brand300 },
      secondary: { main: c.brand450 },
      error: { main: c.error.bgDefault, dark: c.error.contentStrong, light: c.error.bgWeakest },
      warning: { main: c.warning.bgDefault, dark: c.warning.contentStrong, light: c.warning.bgWeakest },
      info: { main: c.info.bgDefault, dark: c.info.contentStrong, light: c.info.bgWeakest },
      success: { main: c.success.bgDefault, dark: c.success.contentStrong, light: c.success.bgWeakest },
      background: { default: c.bgBase, paper: c.bgElevated },
      text: { primary: c.contentPrimary, secondary: c.contentSecondary, disabled: c.contentSpot },
      divider: c.borderDefault,
    },
    typography: {
      fontFamily: t.bodyFont,
      h1: { fontFamily: t.displayFont, fontSize: p.fontSize['5xl'], fontWeight: p.fontWeight.regular },
      h2: { fontFamily: t.displayFont, fontSize: p.fontSize['4xl'], fontWeight: p.fontWeight.regular },
      h3: { fontFamily: t.displayFont, fontSize: p.fontSize['3xl'], fontWeight: p.fontWeight.regular },
      h4: { fontSize: p.fontSize['2xl'], fontWeight: hw },
      h5: { fontSize: p.fontSize.xl, fontWeight: hw },
      h6: { fontSize: p.fontSize.lg, fontWeight: hw },
      body1: { fontSize: p.fontSize.md },
      body2: { fontSize: p.fontSize.sm },
      caption: { fontSize: p.fontSize.xs },
      button: { textTransform: 'none' as const, fontWeight: sw },
    },
    shadows: [
      'none',
      '0 1px 2px 0 rgba(0,0,0,0.04)',
      '0 1px 4px 0 rgba(0,0,0,0.06)',
      '0 2px 6px 0 rgba(0,0,0,0.06)',
      '0 2px 8px 0 rgba(0,0,0,0.07)',
      '0 3px 10px 0 rgba(0,0,0,0.07)',
      '0 4px 12px 0 rgba(0,0,0,0.08)',
      '0 4px 16px 0 rgba(0,0,0,0.08)',
      '0 6px 20px 0 rgba(0,0,0,0.08)',
      '0 8px 24px 0 rgba(0,0,0,0.08)',
      '0 10px 28px 0 rgba(0,0,0,0.08)',
      '0 12px 32px 0 rgba(0,0,0,0.08)',
      '0 14px 36px 0 rgba(0,0,0,0.08)',
      '0 16px 40px 0 rgba(0,0,0,0.08)',
      '0 18px 44px 0 rgba(0,0,0,0.08)',
      '0 20px 48px 0 rgba(0,0,0,0.08)',
      '0 22px 52px 0 rgba(0,0,0,0.08)',
      '0 24px 56px 0 rgba(0,0,0,0.08)',
      '0 26px 60px 0 rgba(0,0,0,0.08)',
      '0 28px 64px 0 rgba(0,0,0,0.08)',
      '0 30px 68px 0 rgba(0,0,0,0.08)',
      '0 32px 72px 0 rgba(0,0,0,0.08)',
      '0 34px 76px 0 rgba(0,0,0,0.08)',
      '0 36px 80px 0 rgba(0,0,0,0.08)',
      '0 38px 84px 0 rgba(0,0,0,0.08)',
    ] as unknown as Theme['shadows'],
    shape: {
      borderRadius: profile.radius.sm,
    },
    spacing: p.spacing.base,
    components: buildAllOverrides(effectiveBrand, effects, profile),
  });

  return { theme, effects, profile, styleDefinition: styleOverride };
}
