import { createTheme, type Theme } from '@mui/material/styles';
import type { BrandTokens } from './types';
import { PRIMITIVES } from './tokens/primitives';
import { createEffects, type Effects } from './tokens/effects';
import { buildAllOverrides } from './overrides';

export function createBrandTheme(brand: BrandTokens): { theme: Theme; effects: Effects } {
  const effects = createEffects(brand);
  const c = brand.colors;
  const p = PRIMITIVES;
  const t = brand.typography;
  const hw = t.headingWeight ?? p.fontWeight.semibold;
  const sw = t.strongWeight ?? p.fontWeight.semibold;

  const theme = createTheme({
    palette: {
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
    shape: {
      borderRadius: p.radius.sm,
    },
    spacing: p.spacing.base,
    components: buildAllOverrides(brand, effects),
  });

  return { theme, effects };
}
