import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function cardOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.md,
          fontFamily: brand.typography.bodyFont,
          backgroundImage: 'none', // Remove MUI default gradient overlay
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 16px 8px',
        },
        title: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.md,
        },
        subheader: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.xs,
          color: c.contentTertiary,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          padding: '8px 16px 16px',
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '8px 16px 16px',
          gap: 8,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          borderRadius: PRIMITIVES.radius.md,
        },
        outlined: {
          backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : c.bgBase,
        },
        icon: {
          alignItems: 'center',
        },
      },
    },
  };
}
