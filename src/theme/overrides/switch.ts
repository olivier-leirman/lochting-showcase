import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function switchOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const sw = PRIMITIVES.component.switchWidth;
  const sh = PRIMITIVES.component.switchHeight;
  const thumb = PRIMITIVES.component.switchThumbSize;
  const pad = (sh - thumb) / 2;

  // Primary background based on style profile
  const primaryBg = sp.buttonPrimary === 'solid' ? c.brand400
    : sp.buttonPrimary === 'glass' ? (isDark ? `color-mix(in srgb, ${c.brand400} 20%, transparent)` : `color-mix(in srgb, ${c.brand400} 85%, transparent)`)
    : fx.gradients.primary;

  return {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          gap: 8,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: sw + pad * 2,
          height: sh + pad * 2,
          padding: pad,
          overflow: 'visible',
        },
        switchBase: {
          padding: pad * 2,
          '&.Mui-checked': {
            transform: `translateX(${sw - sh}px)`,
            color: c.contentStayLight,
            '& + .MuiSwitch-track': {
              background: primaryBg,
              opacity: 1,
              border: 'none',
              boxShadow: fx.shadows.primaryButton,
            },
            '& .MuiSwitch-thumb': {
              boxShadow: fx.shadows.innerElement,
            },
          },
          '&.Mui-disabled': {
            opacity: 0.45,
          },
        },
        thumb: {
          width: thumb,
          height: thumb,
          backgroundColor: c.contentStayLight,
          boxShadow: fx.shadows.innerElement,
        },
        track: {
          borderRadius: PRIMITIVES.radius.round,
          background: fx.gradients.inactive,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: fx.shadows.inactive,
          opacity: 1,
        },
      },
    },
  };
}
