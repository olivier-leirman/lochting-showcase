import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function textFieldOverrides(
  brand: BrandTokens,
  fx: Effects,
  sp: StyleProfile = DEFAULT_STYLE_PROFILE,
): Components<Theme> {
  const c = brand.colors;
  const r = sp.radius.md;

  // Input background from profile (empty = default bgSunken)
  const inputBg = sp.surface.inputBg || c.bgSunken;

  // Extra CSS props for glass-style inputs
  const inputRootExtra: Record<string, unknown> = {};
  if (sp.inputExtra) {
    Object.assign(inputRootExtra, sp.inputExtra);
  }

  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: r,
          backgroundColor: inputBg,
          boxShadow: fx.shadows.textfield,
          fontFamily: brand.typography.bodyFont,
          ...inputRootExtra,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: c.brand300,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: c.brand400,
            borderWidth: 1.5,
          },
        },
        notchedOutline: {
          borderColor: c.borderDefault,
        },
        input: {
          padding: '14px 12px',
          fontSize: PRIMITIVES.fontSize.md,
          color: c.contentPrimary,
          '&::placeholder': {
            color: c.contentSpot,
            opacity: 1,
          },
        },
        inputSizeSmall: {
          padding: '10px 12px',
          fontSize: PRIMITIVES.fontSize.sm,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          color: c.contentSpot,
          fontSize: PRIMITIVES.fontSize.md,
          '&.Mui-focused': {
            color: c.brand400,
          },
        },
        outlined: {
          // Align un-shrunk label with input padding (14px top)
          '&:not(.MuiInputLabel-shrink)': {
            transform: 'translate(12px, 14px) scale(1)',
          },
        },
        sizeSmall: {
          fontSize: PRIMITIVES.fontSize.sm,
          '&.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
            transform: 'translate(12px, 10px) scale(1)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  };
}
