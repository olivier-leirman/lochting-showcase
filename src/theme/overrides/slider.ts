import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function sliderOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';
  const thumbSize = PRIMITIVES.component.sliderThumbSize;
  const trackH = PRIMITIVES.component.sliderTrackHeight;
  const dotSize = PRIMITIVES.component.radioDotSize;

  // Primary background based on style profile
  const primaryBg = sp.buttonPrimary === 'solid' ? c.brand400
    : sp.buttonPrimary === 'glass' ? (isDark ? `color-mix(in srgb, ${c.brand400} 20%, transparent)` : `color-mix(in srgb, ${c.brand400} 85%, transparent)`)
    : fx.gradients.primary;

  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          height: trackH,
        },
        rail: {
          background: fx.gradients.inactive,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: fx.shadows.inactive,
          borderRadius: PRIMITIVES.radius.round,
          opacity: 1,
          height: trackH,
        },
        track: {
          background: primaryBg,
          boxShadow: fx.shadows.primaryButton,
          border: 'none',
          borderRadius: PRIMITIVES.radius.round,
          height: trackH,
        },
        thumb: {
          width: thumbSize,
          height: thumbSize,
          background: primaryBg,
          boxShadow: fx.shadows.primaryButton,
          border: 'none',
          '&::before': {
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            backgroundColor: c.contentStayLight,
            boxShadow: fx.shadows.innerElement,
            border: `0.2px solid ${c.borderWeak}`,
          },
          '&:hover, &.Mui-focusVisible': {
            boxShadow: [
              `0px 0px 0px 8px color-mix(in srgb, ${c.brand400} 16%, transparent)`,
              fx.shadows.primaryButton,
            ].join(', '),
          },
        },
      },
    },
  };
}
