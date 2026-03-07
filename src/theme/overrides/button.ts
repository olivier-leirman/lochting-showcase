import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function buttonOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const r = PRIMITIVES.radius;
  const isDark = fx.mode === 'dark';

  // In dark mode, hover brightens; in light mode, hover slightly darkens
  const secondaryHoverFilter = isDark ? 'brightness(1.12)' : 'brightness(0.98)';

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
            boxShadow: fx.shadows.primaryButtonHover,
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
          borderColor: c.borderWeak,
          boxShadow: fx.shadows.secondaryButton,
          '&:hover': {
            background: fx.gradients.secondary,
            borderColor: c.borderDefault,
            filter: secondaryHoverFilter,
            boxShadow: fx.shadows.secondaryButtonHover,
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
            backgroundColor: `color-mix(in srgb, ${c.brand400} ${isDark ? '8' : '4'}%, transparent)`,
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
            backgroundColor: `color-mix(in srgb, ${c.brand400} ${isDark ? '10' : '6'}%, transparent)`,
          },
        },
        colorPrimary: {
          background: fx.gradients.primary,
          color: c.contentStayLight,
          boxShadow: fx.shadows.primaryButton,
          '&:hover': {
            background: fx.gradients.primary,
            filter: 'brightness(1.1)',
            boxShadow: fx.shadows.primaryButtonHover,
          },
        },
        colorSecondary: {
          background: fx.gradients.secondary,
          color: c.contentSecondary,
          border: `1px solid ${c.borderWeak}`,
          boxShadow: fx.shadows.secondaryButton,
          '&:hover': {
            background: fx.gradients.secondary,
            borderColor: c.borderDefault,
            filter: secondaryHoverFilter,
            boxShadow: fx.shadows.secondaryButtonHover,
          },
        },
      },
    },
  };
}
