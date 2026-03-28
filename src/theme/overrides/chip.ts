import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

function msIcon(name: string, size: number, color: string) {
  return createElement('span', {
    className: 'material-symbols-rounded',
    style: {
      fontFamily: '"Material Symbols Rounded"',
      fontVariationSettings: `'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
      fontSize: size,
      lineHeight: 1,
      color,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      WebkitFontSmoothing: 'antialiased',
    },
  }, name);
}

export function chipOverrides(
  brand: BrandTokens,
  fx: Effects,
  sp: StyleProfile = DEFAULT_STYLE_PROFILE,
): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const secondaryHoverFilter = isDark ? 'brightness(1.12)' : 'brightness(0.97)';

  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: msIcon('close', 16, `${c.contentPrimary}B3`),  // contentPrimary at ~70%
        size: 'small',
      },
      styleOverrides: {
        root: {
          borderRadius: sp.radius.sm >= 20 ? sp.radius.sm : PRIMITIVES.radius.round,
          fontFamily: brand.typography.bodyFont,
          letterSpacing: '0.16px',
          fontWeight: PRIMITIVES.fontWeight.regular,
          // Target icon (Box-based Icon component doesn't get MuiChip-icon class)
          '& > .MuiBox-root:first-child': {
            marginLeft: 6,
            marginRight: -4,
          },
        },
        sizeSmall: {
          height: PRIMITIVES.component.chipHeight,       // 24px
          fontSize: PRIMITIVES.fontSize.xs,               // 12px
        },
        sizeMedium: {
          height: PRIMITIVES.component.chipHeightLg,      // 40px
          fontSize: PRIMITIVES.fontSize.sm,               // 14px
          '& > .MuiBox-root:first-child': {
            marginLeft: 12,
            marginRight: -2,
          },
          '& .MuiChip-icon': {
            marginLeft: 12,
            marginRight: -2,
          },
          '& .MuiChip-label': {
            paddingLeft: 10,
            paddingRight: 10,
          },
          '& .MuiChip-deleteIcon': {
            marginRight: 8,
          },
        },
        icon: {
          marginLeft: 6,
          marginRight: -4,
        },
        deleteIcon: {
          marginRight: 6,
          marginLeft: -2,
        },
        label: {
          paddingLeft: 8,
          paddingRight: 8,
        },
        clickable: {
          cursor: 'pointer',
          transition: 'filter 0.15s ease, transform 0.1s ease, box-shadow 0.1s ease',
          '&:hover': {
            filter: secondaryHoverFilter,
          },
          '&:active': {
            transform: 'scale(0.96)',
            boxShadow: isDark
              ? 'inset 0px 2px 4px 0px rgba(0,0,0,0.25)'
              : 'inset 0px 2px 4px 0px rgba(0,0,0,0.08)',
            filter: 'none',
          },
        },
        colorPrimary: {
          // Non-clickable: subtle brand tint (status chips, badges)
          backgroundColor: isDark ? c.brand500 : c.brand100,
          color: isDark ? c.brand200 : c.brand450,
          border: `1px solid ${isDark ? c.brand500 : c.brand100}`,
          boxShadow: fx.shadows.chipBrand,
          '&.MuiChip-clickable:hover': {
            backgroundColor: isDark ? c.brand500 : c.brand100,
          },
          // Clickable primary: strong brand treatment (toggle chips selected state)
          '&.MuiChip-clickable': {
            backgroundColor: c.brand400,
            color: c.contentStayLight,
            border: `1px solid ${c.brand400}`,
            boxShadow: fx.shadows.primaryButton,
            '& .MuiChip-icon, & > .MuiBox-root:first-child': {
              color: c.contentStayLight,
            },
            '& .MuiChip-deleteIcon': {
              color: `${c.contentStayLight}B3`,
              '&:hover': { color: c.contentStayLight },
            },
          },
          '&.MuiChip-clickable:hover': {
            backgroundColor: c.brand400,
            filter: 'brightness(1.08)',
          },
        },
        colorSecondary: {
          background: fx.gradients.secondary,
          color: c.contentSecondary,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: fx.shadows.secondaryButton,
        },
        colorError: {
          backgroundColor: c.error.bgWeakest,
          color: c.error.contentStrong,
          border: `1px solid ${c.error.bgWeakest}`,
          boxShadow: isDark ? 'none' : [
            'inset 0px 4px 4px 0px rgba(253,164,175,0.12)',
            'inset 0px -4px 4px 0px rgba(253,164,175,0.22)',
          ].join(', '),
        },
        colorWarning: {
          backgroundColor: c.warning.bgWeakest,
          color: c.warning.contentStrong,
          border: `1px solid ${c.warning.bgWeakest}`,
          boxShadow: isDark ? 'none' : [
            'inset 0px 4px 4px 0px rgba(252,211,77,0.12)',
            'inset 0px -4px 4px 0px rgba(252,211,77,0.22)',
          ].join(', '),
        },
        colorSuccess: {
          backgroundColor: c.success.bgWeakest,
          color: c.success.contentStrong,
          border: `1px solid ${c.success.bgWeakest}`,
          boxShadow: isDark ? 'none' : [
            'inset 0px 4px 4px 0px rgba(110,231,183,0.12)',
            'inset 0px -4px 4px 0px rgba(110,231,183,0.22)',
          ].join(', '),
        },
        colorInfo: {
          backgroundColor: c.info.bgWeakest,
          color: c.info.contentStrong,
          border: `1px solid ${c.info.bgWeakest}`,
          boxShadow: isDark ? 'none' : [
            'inset 0px 4px 4px 0px rgba(147,197,253,0.12)',
            'inset 0px -4px 4px 0px rgba(147,197,253,0.22)',
          ].join(', '),
        },
      },
    },
  };
}
