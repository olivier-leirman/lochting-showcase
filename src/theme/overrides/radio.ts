import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function radioOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const size = PRIMITIVES.component.checkboxSize;
  const dotSize = PRIMITIVES.component.radioDotSize;

  // Primary background based on style profile
  const primaryBg = sp.buttonPrimary === 'solid' ? c.brand400
    : sp.buttonPrimary === 'glass' ? (isDark ? `color-mix(in srgb, ${c.brand400} 20%, transparent)` : `color-mix(in srgb, ${c.brand400} 85%, transparent)`)
    : fx.gradients.primary;

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
      background: primaryBg,
      boxShadow: fx.shadows.primaryButton,
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
      background: c.contentStayLight,
      border: `0.2px solid color-mix(in srgb, ${c.contentStayDark} 10%, ${c.contentStayLight})`,
      boxShadow: fx.shadows.innerElement,
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
            backgroundColor: `color-mix(in srgb, ${c.brand400} 4%, transparent)`,
          },
        },
      },
    },
  };
}
