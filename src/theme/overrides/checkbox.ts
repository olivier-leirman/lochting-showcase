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
    },
  }, createElement('span', {
    style: {
      width: size * 0.28,
      height: size * 0.48,
      borderRight: `2px solid ${c.contentStayLight}`,
      borderBottom: `2px solid ${c.contentStayLight}`,
      transform: 'rotate(45deg)',
      marginTop: -size * 0.06,
    },
  }));

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
            backgroundColor: 'rgba(138, 84, 221, 0.04)',
          },
        },
      },
    },
  };
}
