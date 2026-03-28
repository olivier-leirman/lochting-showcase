import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function navigationOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    // ── Drawer (sidebar shell) ──
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: c.bgElevated,
          borderRight: `1px solid ${c.borderWeak}`,
          boxShadow: fx.shadows.sidebar,
          backgroundImage: 'none',
        },
      },
    },

    // ── Section headers ──
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          letterSpacing: '1.1px',
          textTransform: 'uppercase' as const,
          color: c.contentTertiary,
          lineHeight: '24px',
          backgroundColor: 'transparent',
          padding: '16px 12px 4px',
        },
      },
    },

    // ── Nav list items ──
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          minHeight: 44,
          borderRadius: PRIMITIVES.radius.md,
          paddingLeft: 12,
          paddingRight: 8,
          gap: 12,
          color: c.contentPrimary,
          transition: 'background 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
          border: '1px solid transparent',
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : c.bgSunken,
          },
          '&.Mui-selected': {
            background: fx.gradients.secondary,
            borderColor: 'transparent',
            boxShadow: 'none',
            color: c.contentPrimary,
            '&:hover': {
              background: fx.gradients.secondary,
              filter: isDark ? 'brightness(1.08)' : 'brightness(0.98)',
            },
          },
        },
      },
    },

    // ── Nav item icon ──
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          color: c.contentSecondary,
          '.Mui-selected &': {
            color: c.contentPrimary,
          },
        },
      },
    },

    // ── Nav item text ──
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.md,
          fontWeight: PRIMITIVES.fontWeight.medium,
          letterSpacing: '0.4px',
        },
      },
    },

    // ── AppBar ──
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: c.bgElevated,
          color: c.contentPrimary,
          borderBottom: `1px solid ${c.borderWeak}`,
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },

    // ── Toolbar ──
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px !important',
          gap: 8,
        },
      },
    },

    // ── Breadcrumbs ──
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
        separator: {
          color: c.contentTertiary,
          marginLeft: 4,
          marginRight: 4,
        },
      },
    },

    // ── Avatar ──
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.sm,
        },
        colorDefault: {
          backgroundColor: c.brand100,
          color: c.brand500,
        },
      },
    },

    // ── Divider ──
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: c.borderWeak,
        },
      },
    },
  };
}
