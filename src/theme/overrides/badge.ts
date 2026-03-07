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
          padding: '0 6px',
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
          backgroundColor: c.error.bgWeakest,
          color: c.error.contentStrong,
          border: `1px solid ${c.error.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(253,164,175,0.12)',
            'inset 0px -4px 4px 0px rgba(253,164,175,0.22)',
          ].join(', '),
        },
        colorWarning: {
          backgroundColor: c.warning.bgWeakest,
          color: c.warning.contentStrong,
          border: `1px solid ${c.warning.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(252,211,77,0.12)',
            'inset 0px -4px 4px 0px rgba(252,211,77,0.22)',
          ].join(', '),
        },
        colorSuccess: {
          backgroundColor: c.success.bgWeakest,
          color: c.success.contentStrong,
          border: `1px solid ${c.success.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(110,231,183,0.12)',
            'inset 0px -4px 4px 0px rgba(110,231,183,0.22)',
          ].join(', '),
        },
        colorInfo: {
          backgroundColor: c.info.bgWeakest,
          color: c.info.contentStrong,
          border: `1px solid ${c.info.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(147,197,253,0.12)',
            'inset 0px -4px 4px 0px rgba(147,197,253,0.22)',
          ].join(', '),
        },
      },
    },
  };
}
