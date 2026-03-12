import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function tabsOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 40,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          background: fx.gradients.primary,
        },
        flexContainer: {
          gap: 4,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.medium,
          fontSize: PRIMITIVES.fontSize.sm,
          letterSpacing: '0.01em',
          color: c.contentSecondary,
          minHeight: 40,
          padding: '8px 16px',
          borderRadius: `${PRIMITIVES.radius.sm}px ${PRIMITIVES.radius.sm}px 0 0`,
          transition: 'color 0.15s, background-color 0.15s',
          '&:hover': {
            color: c.contentSecondary,
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : c.bgSunken,
          },
          '&.Mui-selected': {
            color: c.brand450,
            fontWeight: PRIMITIVES.fontWeight.semibold,
          },
          '&.Mui-disabled': {
            color: c.contentTertiary,
            opacity: 0.5,
          },
          // Icon + label spacing (iconPosition start/end)
          '&.MuiTab-labelIcon': {
            gap: 4,
          },
        },
      },
    },
  };
}
