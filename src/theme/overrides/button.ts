import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function buttonOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const r = PRIMITIVES.radius;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: r.md,
          textTransform: 'none' as const,
          fontWeight: PRIMITIVES.fontWeight.medium,
          fontFamily: brand.typography.bodyFont,
          letterSpacing: '0.46px',
          fontSize: PRIMITIVES.fontSize.lg,
          padding: '12px 24px',
          lineHeight: 1,
          minWidth: 0,
        },
        containedPrimary: {
          background: fx.gradients.primary,
          color: c.contentStayLight,
          border: 'none',
          boxShadow: fx.shadows.primaryButton,
          '&:hover': {
            background: fx.gradients.primary,
            filter: 'brightness(1.1)',
            boxShadow: [
              '2px 2px 16px 0px rgba(32, 8, 69, 0.16)',
              'inset 2px 2px 4px 0px rgba(252, 252, 255, 0.12)',
              'inset 2px -2px 4px 0px rgba(31, 26, 69, 0.08)',
            ].join(', '),
          },
          '&:active': {
            filter: 'brightness(0.95)',
          },
          '&.Mui-disabled': {
            background: fx.gradients.primary,
            color: c.contentStayLight,
            opacity: 0.45,
          },
        },
        outlined: {
          background: fx.gradients.secondary,
          color: c.contentSecondary,
          borderColor: c.borderStrong,
          boxShadow: fx.shadows.secondaryButton,
          '&:hover': {
            background: fx.gradients.secondary,
            borderColor: c.borderStrong,
            filter: 'brightness(0.98)',
            boxShadow: [
              '2px 2px 10px 0px rgba(233, 230, 237, 0.2)',
              'inset 2px 2px 4px 0px rgba(252, 252, 255, 0.12)',
              'inset 2px -2px 4px 0px rgba(158, 157, 160, 0.08)',
            ].join(', '),
          },
          '&.Mui-disabled': {
            background: fx.gradients.secondary,
            opacity: 0.45,
          },
        },
        text: {
          color: c.contentSecondary,
          background: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${c.brand400} 4%, transparent)`,
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: PRIMITIVES.fontSize.sm,
          height: PRIMITIVES.component.buttonHeightSm,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: r.md,
          fontFamily: brand.typography.bodyFont,
          color: c.contentTertiary,
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${c.brand400} 6%, transparent)`,
          },
        },
        colorPrimary: {
          background: fx.gradients.primary,
          color: c.contentStayLight,
          boxShadow: fx.shadows.primaryButton,
          '&:hover': {
            background: fx.gradients.primary,
            filter: 'brightness(1.1)',
          },
        },
        colorSecondary: {
          background: fx.gradients.secondary,
          color: c.contentSecondary,
          border: `1px solid ${c.borderStrong}`,
          boxShadow: fx.shadows.secondaryButton,
          '&:hover': {
            background: fx.gradients.secondary,
            borderColor: c.borderStrong,
            filter: 'brightness(0.98)',
          },
        },
      },
    },
  };
}
