import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function textFieldOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const r = PRIMITIVES.radius.md;

  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: r,
          backgroundColor: c.bgSunken,
          boxShadow: fx.shadows.textfield,
          fontFamily: brand.typography.bodyFont,
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
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  };
}
