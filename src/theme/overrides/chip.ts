import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

function msIcon(name: string, size: number, color: string) {
  return createElement('span', {
    className: 'material-symbols-rounded',
    style: {
      fontFamily: '"Material Symbols Rounded"',
      fontVariationSettings: `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' ${size}`,
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

export function chipOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;

  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: msIcon('close', 16, c.contentSecondary),
      },
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.round,
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.xs,
          letterSpacing: '0.16px',
          fontWeight: PRIMITIVES.fontWeight.regular,
          height: PRIMITIVES.component.chipHeight,
        },
        icon: {
          marginLeft: 8,
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
        colorPrimary: {
          backgroundColor: c.brand100,
          color: c.brand450,
          border: `1px solid ${c.brand100}`,
          boxShadow: fx.shadows.chipBrand,
        },
        colorSecondary: {
          backgroundColor: c.bgSunken,
          color: c.contentSecondary,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: fx.shadows.inactive,
        },
        colorError: {
          backgroundColor: c.error.bgWeakest,
          color: c.error.contentStrong,
          border: `1px solid ${c.error.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(253,164,175,0.12)',
            'inset 0px -4px 4px 0px rgba(253,164,175,0.22)',
          ].join(', '),
        },
        colorWarning: {
          backgroundColor: c.warning.bgWeakest,
          color: c.warning.contentStrong,
          border: `1px solid ${c.warning.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(252,211,77,0.12)',
            'inset 0px -4px 4px 0px rgba(252,211,77,0.22)',
          ].join(', '),
        },
        colorSuccess: {
          backgroundColor: c.success.bgWeakest,
          color: c.success.contentStrong,
          border: `1px solid ${c.success.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(110,231,183,0.12)',
            'inset 0px -4px 4px 0px rgba(110,231,183,0.22)',
          ].join(', '),
        },
        colorInfo: {
          backgroundColor: c.info.bgWeakest,
          color: c.info.contentStrong,
          border: `1px solid ${c.info.bgWeakest}`,
          boxShadow: [
            'inset 0px 4px 4px 0px rgba(147,197,253,0.12)',
            'inset 0px -4px 4px 0px rgba(147,197,253,0.22)',
          ].join(', '),
        },
      },
    },
  };
}
