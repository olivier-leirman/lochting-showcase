import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function badgeOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;

  return {
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: PRIMITIVES.radius.round,
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.xs,
          fontWeight: PRIMITIVES.fontWeight.medium,
          minWidth: PRIMITIVES.component.badgeSize,
          height: PRIMITIVES.component.badgeSize,
          padding: '0 4px',
        },
        colorPrimary: {
          background: fx.gradients.primary,
          color: c.contentStayLight,
          boxShadow: fx.shadows.primaryButton,
        },
      },
    },
  };
}
