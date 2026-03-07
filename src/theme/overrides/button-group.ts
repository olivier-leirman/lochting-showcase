import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function buttonGroupOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const secondaryHoverFilter = isDark ? 'brightness(1.12)' : 'brightness(0.98)';

  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.md,
          boxShadow: 'none',
          // Remove the default separator between grouped buttons
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: 'none',
          },
        },
        containedPrimary: {
          '& .MuiButton-root': {
            background: fx.gradients.primary,
            color: c.contentStayLight,
            boxShadow: fx.shadows.primaryButton,
            border: 'none',
            '&:hover': {
              background: fx.gradients.primary,
              filter: 'brightness(1.1)',
              boxShadow: fx.shadows.primaryButtonHover,
            },
          },
          // Subtle divider between primary grouped buttons
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: `1px solid rgba(255, 255, 255, 0.20) !important`,
          },
        },
        outlined: {
          '& .MuiButton-root': {
            background: fx.gradients.secondary,
            color: c.contentSecondary,
            borderColor: c.borderWeak,
            boxShadow: fx.shadows.secondaryButton,
            '&:hover': {
              background: fx.gradients.secondary,
              borderColor: c.borderDefault,
              filter: secondaryHoverFilter,
              boxShadow: fx.shadows.secondaryButtonHover,
            },
          },
          // Re-add the right border as a subtle separator
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: `1px solid ${c.borderStrong} !important`,
          },
        },
      },
    },
  };
}
