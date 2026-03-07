import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function sliderOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const thumbSize = PRIMITIVES.component.sliderThumbSize;
  const trackH = PRIMITIVES.component.sliderTrackHeight;
  const dotSize = PRIMITIVES.component.radioDotSize;

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
          background: fx.gradients.primary,
          boxShadow: fx.shadows.primaryButton,
          border: 'none',
          borderRadius: PRIMITIVES.radius.round,
          height: trackH,
        },
        thumb: {
          width: thumbSize,
          height: thumbSize,
          background: fx.gradients.primary,
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
              '0px 0px 0px 8px rgba(138, 84, 221, 0.16)',
              fx.shadows.primaryButton,
            ].join(', '),
          },
        },
      },
    },
  };
}
