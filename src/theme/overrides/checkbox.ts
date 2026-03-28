import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function checkboxOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const size = PRIMITIVES.component.checkboxSize;
  // Checkbox radius: derived from sp.radius.sm scaled down (half of small)
  const r = Math.max(2, Math.round(sp.radius.sm / 2));

  // Primary background based on style profile
  const primaryBg = sp.buttonPrimary === 'solid' ? c.brand400
    : sp.buttonPrimary === 'glass' ? (isDark ? `color-mix(in srgb, ${c.brand400} 20%, transparent)` : `color-mix(in srgb, ${c.brand400} 85%, transparent)`)
    : fx.gradients.primary;

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
      background: primaryBg,
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
      fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
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
        sizeSmall: {
          padding: 4,
          '& > span': {
            transform: 'scale(0.8)',
          },
        },
      },
    },
  };
}
