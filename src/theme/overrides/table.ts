import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function tableOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.md,
          border: `1px solid ${c.borderWeak}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? c.bgSunken : c.bgSunken,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          borderColor: c.borderWeak,
          padding: '12px 16px',
        },
        head: {
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.xs,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.06em',
          color: c.contentSecondary,
          backgroundColor: isDark ? c.bgSunken : c.bgSunken,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : c.bgSunken,
          },
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          borderTop: `1px solid ${c.borderWeak}`,
        },
        selectLabel: {
          fontSize: PRIMITIVES.fontSize.xs,
          color: c.contentSecondary,
        },
        displayedRows: {
          fontSize: PRIMITIVES.fontSize.xs,
          color: c.contentSecondary,
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.medium,
          borderRadius: PRIMITIVES.radius.sm,
          '&.Mui-selected': {
            background: fx.gradients.primary,
            color: '#fff',
            boxShadow: fx.shadows.primaryButton,
            '&:hover': {
              background: fx.gradients.primary,
              filter: 'brightness(1.08)',
            },
          },
        },
        outlined: {
          borderColor: c.borderDefault,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : c.bgSunken,
          },
        },
      },
    },
  };
}
