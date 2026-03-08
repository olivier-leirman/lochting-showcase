import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function dialogOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: PRIMITIVES.radius.lg,
          border: `1px solid ${c.borderWeak}`,
          boxShadow: [
            `0 8px 32px 0 ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.12)'}`,
            `0 2px 8px 0 ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)'}`,
          ].join(', '),
          backgroundImage: 'none',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.lg,
          padding: '20px 24px 12px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          color: c.contentSecondary,
          padding: '8px 24px 16px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 24px 20px',
          gap: 8,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
  };
}
