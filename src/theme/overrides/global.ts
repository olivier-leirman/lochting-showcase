import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';

export function globalOverrides(brand: BrandTokens): Components<Theme> {
  const c = brand.colors;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: c.bgBase,
          color: c.contentPrimary,
          fontFamily: brand.typography.bodyFont,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
        h1: { fontFamily: brand.typography.displayFont },
        h2: { fontFamily: brand.typography.displayFont },
        h3: { fontFamily: brand.typography.displayFont },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
