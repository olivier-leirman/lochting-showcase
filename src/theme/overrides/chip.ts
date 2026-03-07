import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function chipOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;

  return {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.round,
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.xs,
          letterSpacing: '0.16px',
          fontWeight: PRIMITIVES.fontWeight.regular,
          height: PRIMITIVES.component.chipHeight,
        },
        colorPrimary: {
          backgroundColor: c.brand100,
          color: c.brand450,
          border: `1px solid ${c.brand100}`,
          boxShadow: fx.shadows.chipBrand,
        },
        colorSecondary: {
          backgroundColor: c.bgSunken,
          color: c.contentSecondary,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: fx.shadows.inactive,
        },
        colorError: {
          boxShadow: fx.shadows.chipBrand,
        },
        colorWarning: {
          boxShadow: fx.shadows.chipBrand,
        },
        colorSuccess: {
          boxShadow: fx.shadows.chipBrand,
        },
        colorInfo: {
          boxShadow: fx.shadows.chipBrand,
        },
      },
    },
  };
}
