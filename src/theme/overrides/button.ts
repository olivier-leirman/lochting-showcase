import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function buttonOverrides(
  brand: BrandTokens,
  fx: Effects,
  sp: StyleProfile = DEFAULT_STYLE_PROFILE,
): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const btnRadius = sp.radius.md;

  // In dark mode, hover brightens; in light mode, hover slightly darkens
  const secondaryHoverFilter = isDark ? 'brightness(1.12)' : 'brightness(0.98)';

  /* ── Primary button styling based on profile ── */
  const primaryBg = (() => {
    switch (sp.buttonPrimary) {
      case 'solid':
        return c.brand400;
      case 'glass':
        return isDark ? `color-mix(in srgb, ${c.brand400} 20%, transparent)` : `color-mix(in srgb, ${c.brand400} 85%, transparent)`;
      case 'gradient':
      default:
        return fx.gradients.primary;
    }
  })();

  const primaryExtra: Record<string, unknown> = {};
  if (sp.buttonPrimary === 'glass') {
    primaryExtra.backdropFilter = `blur(${sp.surface.blur || 12}px)`;
    primaryExtra.WebkitBackdropFilter = `blur(${sp.surface.blur || 12}px)`;
    primaryExtra.border = `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.40)'}`;
  }

  /* ── Secondary button styling based on profile ── */
  const secondaryStyles: Record<string, unknown> = (() => {
    switch (sp.buttonSecondary) {
      case 'outlined-flat':
        return {
          background: 'transparent',
          color: c.contentSecondary,
          borderColor: c.borderStrong,
          boxShadow: 'none',
          '&:hover': {
            background: `color-mix(in srgb, ${c.brand400} ${isDark ? '6' : '3'}%, transparent)`,
            borderColor: c.brand300,
            boxShadow: 'none',
          },
          '&.Mui-disabled': { background: 'transparent', opacity: 0.45 },
        };
      case 'glass':
        return {
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.50)',
          color: c.contentSecondary,
          borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.60)',
          boxShadow: fx.shadows.secondaryButton,
          backdropFilter: `blur(${sp.surface.blur || 8}px)`,
          WebkitBackdropFilter: `blur(${sp.surface.blur || 8}px)`,
          '&:hover': {
            background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.65)',
            borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.75)',
            boxShadow: fx.shadows.secondaryButtonHover,
          },
          '&.Mui-disabled': {
            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.30)',
            opacity: 0.45,
          },
        };
      case 'gradient':
      default:
        return {
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
          '&.Mui-disabled': { background: fx.gradients.secondary, opacity: 0.45 },
        };
    }
  })();

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: btnRadius,
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
          background: primaryBg,
          color: c.contentStayLight,
          border: sp.buttonPrimary === 'glass' ? undefined : 'none',
          boxShadow: fx.shadows.primaryButton,
          ...primaryExtra,
          '&:hover': {
            background: primaryBg,
            filter: 'brightness(1.1)',
            boxShadow: fx.shadows.primaryButtonHover,
          },
          '&:active': {
            filter: 'brightness(0.95)',
          },
          '&.Mui-disabled': {
            background: primaryBg,
            color: c.contentStayLight,
            opacity: 0.45,
          },
        },
        outlined: secondaryStyles,
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
        sizeLarge: {
          padding: '16px 32px',
          fontSize: PRIMITIVES.fontSize.xl,
          height: PRIMITIVES.component.buttonHeightLg,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: btnRadius,
          fontFamily: brand.typography.bodyFont,
          color: c.contentTertiary,
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${c.brand400} ${isDark ? '10' : '6'}%, transparent)`,
          },
        },
        colorPrimary: {
          background: primaryBg,
          color: c.contentStayLight,
          boxShadow: fx.shadows.primaryButton,
          ...primaryExtra,
          '&:hover': {
            background: primaryBg,
            filter: 'brightness(1.1)',
            boxShadow: fx.shadows.primaryButtonHover,
          },
        },
        colorSecondary: {
          background: sp.buttonSecondary === 'gradient' ? fx.gradients.secondary
            : sp.buttonSecondary === 'glass' ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.50)')
            : 'transparent',
          color: c.contentSecondary,
          border: `1px solid ${c.borderWeak}`,
          boxShadow: fx.shadows.secondaryButton,
          '&:hover': {
            background: sp.buttonSecondary === 'gradient' ? fx.gradients.secondary
              : sp.buttonSecondary === 'glass' ? (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.65)')
              : `color-mix(in srgb, ${c.brand400} 4%, transparent)`,
            borderColor: c.borderDefault,
            filter: sp.buttonSecondary === 'gradient' ? secondaryHoverFilter : undefined,
            boxShadow: fx.shadows.secondaryButtonHover,
          },
        },
      },
    },
  };
}
