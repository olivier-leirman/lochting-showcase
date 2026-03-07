import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function selectOverrides(_brand: BrandTokens, _fx: Effects): Components<Theme> {
  return {
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.md,
        },
      },
    },
  };
}
