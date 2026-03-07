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
          border: `1px solid ${c.borderWeak}`,
          boxShadow: fx.shadows.inactive,
          // Default = medium
          borderRadius: 12,
          padding: 4,
          gap: 2,
          // Size-specific group styling via :has() (MUI doesn't add size classes to the group)
          '&:has(.MuiToggleButton-sizeSmall)': {
            borderRadius: 8,
            padding: 2,
          },
          '&:has(.MuiToggleButton-sizeLarge)': {
            borderRadius: 14,
            padding: 4,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          // Default = medium
          borderRadius: '8px !important',
          border: 'none !important',
          textTransform: 'none' as const,
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.medium,
          fontSize: PRIMITIVES.fontSize.sm,       // 14px
          letterSpacing: '0.46px',
          color: c.contentSecondary,
          height: 32,
          padding: '0 12px',
          lineHeight: 1,
          '&.Mui-selected': {
            background: fx.gradients.secondary,
            color: c.contentPrimary,
            border: `1px solid ${c.borderDefault} !important`,
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
        sizeSmall: {
          borderRadius: '6px !important',
          height: 24,
          padding: '0 12px',
          fontSize: PRIMITIVES.fontSize.xs,        // 12px
        },
        sizeLarge: {
          borderRadius: '10px !important',
          height: 40,
          padding: '0 16px',
          fontSize: PRIMITIVES.fontSize.md,        // 16px
        },
      },
    },
  };
}
