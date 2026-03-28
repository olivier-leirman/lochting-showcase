import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';

export function buttonGroupOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const secondaryHoverFilter = isDark ? 'brightness(1.12)' : 'brightness(0.98)';

  // Primary button background based on style profile
  const primaryBg = (() => {
    switch (sp.buttonPrimary) {
      case 'solid': return c.brand400;
      case 'glass': return isDark ? `color-mix(in srgb, ${c.brand400} 20%, transparent)` : `color-mix(in srgb, ${c.brand400} 85%, transparent)`;
      case 'gradient': default: return fx.gradients.primary;
    }
  })();

  const primaryExtra: Record<string, unknown> = {};
  if (sp.buttonPrimary === 'glass') {
    primaryExtra.backdropFilter = `blur(${sp.surface.blur || 12}px)`;
    primaryExtra.WebkitBackdropFilter = `blur(${sp.surface.blur || 12}px)`;
  }

  // Secondary button background based on style profile
  const secondaryBg = (() => {
    switch (sp.buttonSecondary) {
      case 'outlined-flat': return 'transparent';
      case 'glass': return isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.50)';
      case 'gradient': default: return fx.gradients.secondary;
    }
  })();

  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '& .MuiButtonGroup-grouped': {
            minWidth: 0,
          },
        },

        // ── Contained (primary) ──
        contained: {
          borderRadius: sp.radius.md,
          overflow: 'hidden',
          boxShadow: fx.shadows.primaryButton,
          ...primaryExtra,
          '& .MuiButton-root': {
            background: primaryBg,
            color: c.contentStayLight,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '0 !important',
            '&:hover': {
              background: primaryBg,
              filter: 'brightness(1.1)',
            },
          },
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: `1px solid ${c.brand450} !important`,
          },
        },

        // ── Outlined (secondary) ──
        outlined: {
          borderRadius: sp.radius.md,
          overflow: 'hidden',
          border: `1px solid ${c.borderWeak}`,
          boxShadow: sp.buttonSecondary === 'outlined-flat' ? 'none' : fx.shadows.secondaryButton,
          '& .MuiButton-root': {
            background: secondaryBg,
            color: c.contentSecondary,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '0 !important',
            '&:hover': {
              background: secondaryBg,
              border: 'none',
              filter: sp.buttonSecondary === 'gradient' ? secondaryHoverFilter : undefined,
            },
          },
          '& .MuiButtonGroup-grouped': {
            marginLeft: '0 !important',
          },
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderRight: `1px solid ${c.borderWeak} !important`,
          },
        },
      },
    },
  };
}
