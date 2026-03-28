import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function navigationOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    // ── Drawer (sidebar shell) ──
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: sp.surface.cardBg || c.bgElevated,
          borderRight: `1px solid ${c.borderWeak}`,
          boxShadow: fx.shadows.sidebar,
          backgroundImage: 'none',
          ...(sp.surface.blur ? {
            backdropFilter: `blur(${sp.surface.blur}px)`,
            WebkitBackdropFilter: `blur(${sp.surface.blur}px)`,
          } : {}),
        },
      },
    },

    // ── Section headers ──
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.medium,
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
          borderRadius: sp.radius.md,
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
            backgroundColor: isDark ? c.brand500 : c.brand100,
            borderColor: 'transparent',
            boxShadow: 'none',
            color: isDark ? c.brand200 : c.brand450,
            '&:hover': {
              backgroundColor: isDark ? c.brand500 : c.brand100,
              filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
            },
            '& .MuiListItemIcon-root': {
              color: isDark ? c.brand200 : c.brand450,
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
          fontWeight: PRIMITIVES.fontWeight.medium,
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
