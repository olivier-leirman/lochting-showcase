import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

/* ── Custom step icon using primary button gradient + Material Symbols check ── */
function brandStepIcon(brand: BrandTokens, fx: Effects) {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return function StepIcon(props: { active?: boolean; completed?: boolean; icon?: React.ReactNode }) {
    const { active, completed, icon } = props;
    const size = 24;

    // Common circle styles
    const base: React.CSSProperties = {
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: PRIMITIVES.fontWeight.medium,
      fontFamily: brand.typography.bodyFont,
      transition: 'all 0.2s ease',
    };

    /** Weak brand accent — same as chip colorPrimary / sidebar active / toggle chip */
    const completedBg = isDark ? c.brand500 : c.brand100;
    const completedColor = isDark ? c.brand200 : c.brand450;

    if (completed) {
      return createElement('span', {
        style: {
          ...base,
          backgroundColor: completedBg,
          boxShadow: fx.shadows.chipBrand,
          color: completedColor,
        },
      },
        // Material Symbols Rounded check icon, weight 400, filled
        createElement('span', {
          className: 'material-symbols-rounded',
          style: {
            fontFamily: '"Material Symbols Rounded"',
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20",
            fontSize: 16,
            lineHeight: 1,
            color: completedColor,
          },
        }, 'check'),
      );
    }

    if (active) {
      return createElement('span', {
        style: {
          ...base,
          background: fx.gradients.primary,
          boxShadow: fx.shadows.primaryButton,
          color: '#fff',
        },
      }, icon);
    }

    // Inactive / upcoming step
    return createElement('span', {
      style: {
        ...base,
        backgroundColor: isDark ? c.bgSunkenDeep : c.bgSunken,
        border: `1.5px solid ${c.borderDefault}`,
        color: c.contentTertiary,
      },
    }, icon);
  };
}

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
      defaultProps: {
        StepIconComponent: brandStepIcon(brand, fx) as any,
      },
      styleOverrides: {
        label: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.medium,
          color: c.contentTertiary,
          '&.Mui-active': {
            color: c.contentPrimary,
            fontWeight: PRIMITIVES.fontWeight.medium,
          },
          '&.Mui-completed': {
            color: c.contentSecondary,
            fontWeight: PRIMITIVES.fontWeight.medium,
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          '&.Mui-completed .MuiStepConnector-line': {
            borderColor: isDark ? c.brand500 : c.brand200,
          },
          '&.Mui-active .MuiStepConnector-line': {
            borderColor: isDark ? c.brand500 : c.brand200,
          },
        },
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
