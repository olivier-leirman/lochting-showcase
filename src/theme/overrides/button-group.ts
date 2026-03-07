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
          boxShadow: 'none',
          '& .MuiButtonGroup-grouped': {
            minWidth: 0,
          },
        },

        // ── Contained (primary gradient) ──
        contained: {
          borderRadius: PRIMITIVES.radius.md,
          overflow: 'hidden',
          boxShadow: fx.shadows.primaryButton,
          '& .MuiButton-root': {
            background: fx.gradients.primary,
            color: c.contentStayLight,
            border: 'none',
            boxShadow: 'none',            // shadow lives on the group wrapper
            borderRadius: '0 !important', // let the group clip corners
            '&:hover': {
              background: fx.gradients.primary,
              filter: 'brightness(1.1)',
            },
          },
          // Dark brand divider between grouped buttons
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: `1px solid ${c.brand450} !important`,
          },
        },

        // ── Outlined (secondary gradient) ──
        outlined: {
          borderRadius: PRIMITIVES.radius.md,
          overflow: 'hidden',
          border: `1px solid ${c.borderWeak}`,
          boxShadow: fx.shadows.secondaryButton,
          '& .MuiButton-root': {
            background: fx.gradients.secondary,
            color: c.contentSecondary,
            border: 'none',               // no per-button border, group owns it
            boxShadow: 'none',
            borderRadius: '0 !important',
            '&:hover': {
              background: fx.gradients.secondary,
              border: 'none',
              filter: secondaryHoverFilter,
            },
          },
          // Reset MUI's default -1px margin that hides the divider
          '& .MuiButtonGroup-grouped': {
            marginLeft: '0 !important',
          },
          // Inner divider between outlined grouped buttons
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: `1px solid ${c.borderStrong} !important`,
          },
        },
      },
    },
  };
}
