import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function accordionOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${c.borderWeak}`,
          borderRadius: `${PRIMITIVES.radius.md}px !important`,
          marginBottom: 8,
          overflow: 'hidden',
          '&::before': {
            display: 'none', // Remove default top divider
          },
          '&.Mui-expanded': {
            margin: '0 0 8px 0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.sm,
          minHeight: 48,
          padding: '0 16px',
          backgroundColor: isDark ? c.bgSunken : c.bgBase,
          '&:hover': {
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : c.bgSunken,
          },
          '&.Mui-expanded': {
            minHeight: 48,
            borderBottom: `1px solid ${c.borderWeak}`,
          },
        },
        content: {
          margin: '12px 0',
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
        expandIconWrapper: {
          color: c.contentSpot,
          '&.Mui-expanded': {
            color: c.contentPrimary,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          color: c.contentSecondary,
          padding: '16px',
          lineHeight: 1.6,
        },
      },
    },
  };
}
