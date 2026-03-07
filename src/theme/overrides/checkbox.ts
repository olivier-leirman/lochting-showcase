import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function checkboxOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const size = PRIMITIVES.component.checkboxSize;
  const r = PRIMITIVES.radius.xs;

  const uncheckedIcon = createElement('span', {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      background: fx.gradients.inactive,
      border: `1px solid ${c.borderDefault}`,
      boxShadow: fx.shadows.inactive,
      boxSizing: 'border-box' as const,
      display: 'block',
    },
  });

  const checkedIcon = createElement('span', {
    style: {
      width: size,
      height: size,
      borderRadius: r,
      background: fx.gradients.primary,
      boxShadow: fx.shadows.primaryButton,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box' as const,
      overflow: 'hidden',
    },
  }, createElement('span', {
    className: 'material-symbols-rounded',
    style: {
      fontFamily: '"Material Symbols Rounded"',
      fontVariationSettings: `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' ${size}`,
      fontSize: size,
      lineHeight: 1,
      color: c.contentStayLight,
      WebkitFontSmoothing: 'antialiased',
    },
  }, 'check_small'));

  return {
    MuiCheckbox: {
      defaultProps: {
        icon: uncheckedIcon,
        checkedIcon: checkedIcon,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 8,
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${c.brand400} 4%, transparent)`,
          },
        },
      },
    },
  };
}
