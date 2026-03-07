import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function toggleButtonOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const secondaryHoverFilter = isDark ? 'brightness(1.12)' : 'brightness(0.98)';

  return {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          background: fx.gradients.inactive,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: fx.shadows.inactive,
          borderRadius: PRIMITIVES.radius.md + 4,
          padding: 4,
          gap: 0,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: `${PRIMITIVES.radius.md}px !important`,
          border: 'none !important',
          textTransform: 'none' as const,
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.medium,
          fontSize: PRIMITIVES.fontSize.lg,
          letterSpacing: '0.46px',
          color: c.contentSecondary,
          padding: '12px 24px',
          lineHeight: 1,
          '&.Mui-selected': {
            background: fx.gradients.secondary,
            color: c.contentSecondary,
            border: `1px solid ${c.borderWeak} !important`,
            boxShadow: fx.shadows.secondaryButton,
            '&:hover': {
              background: fx.gradients.secondary,
              filter: secondaryHoverFilter,
              borderColor: `${c.borderDefault} !important`,
              boxShadow: fx.shadows.secondaryButtonHover,
            },
          },
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${c.brand400} ${isDark ? '8' : '4'}%, transparent)`,
          },
        },
      },
    },
  };
}
