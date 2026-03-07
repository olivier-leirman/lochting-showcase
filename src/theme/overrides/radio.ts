import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function radioOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const size = PRIMITIVES.component.checkboxSize;
  const dotSize = PRIMITIVES.component.radioDotSize;

  const uncheckedIcon = createElement('span', {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
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
      borderRadius: '50%',
      background: fx.gradients.inactive,
      border: `1px solid ${c.borderDefault}`,
      boxShadow: fx.shadows.inactive,
      boxSizing: 'border-box' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }, createElement('span', {
    style: {
      width: dotSize,
      height: dotSize,
      borderRadius: '50%',
      background: fx.gradients.primary,
      boxShadow: fx.shadows.primaryButton,
    },
  }));

  return {
    MuiRadio: {
      defaultProps: {
        icon: uncheckedIcon,
        checkedIcon: checkedIcon,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 8,
          '&:hover': {
            backgroundColor: 'rgba(138, 84, 221, 0.04)',
          },
        },
      },
    },
  };
}
