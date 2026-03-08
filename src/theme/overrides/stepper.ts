import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function stepperOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiStepper: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.medium,
          color: c.contentTertiary,
          '&.Mui-active': {
            color: c.contentPrimary,
            fontWeight: PRIMITIVES.fontWeight.semibold,
          },
          '&.Mui-completed': {
            color: c.contentSecondary,
            fontWeight: PRIMITIVES.fontWeight.medium,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: isDark ? c.bgSunkenDeep : c.bgSunken,
          border: `1.5px solid ${c.borderDefault}`,
          borderRadius: '50%',
          '&.Mui-active': {
            color: c.brand400,
            border: 'none',
            filter: 'none',
            // Apply gradient via background trick
          },
          '&.Mui-completed': {
            color: c.brand400,
            border: 'none',
          },
        },
        text: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: '0.75rem',
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: c.borderDefault,
          borderWidth: 1.5,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: PRIMITIVES.radius.round,
          backgroundColor: isDark ? c.bgSunkenDeep : c.bgSunken,
          boxShadow: fx.shadows.inactive,
        },
        bar: {
          borderRadius: PRIMITIVES.radius.round,
          background: fx.gradients.primary,
        },
        barColorSecondary: {
          background: fx.gradients.secondary,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: c.brand400,
        },
        colorSecondary: {
          color: c.contentSecondary,
        },
      },
    },
  };
}
