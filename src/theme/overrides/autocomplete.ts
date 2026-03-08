import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function autocompleteOverrides(brand: BrandTokens, fx: Effects): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  return {
    MuiAutocomplete: {
      defaultProps: {
        ChipProps: { color: 'secondary', size: 'small' },
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            // Already inherits textfield overrides (sunken bg, shadow, radius)
            // Just ensure chips inside have proper spacing
            '& .MuiAutocomplete-tag': {
              margin: 2,
            },
          },
        },
        paper: {
          borderRadius: PRIMITIVES.radius.md,
          border: `1px solid ${c.borderDefault}`,
          boxShadow: [
            `0 4px 16px 0 ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
            `0 1px 4px 0 ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)'}`,
          ].join(', '),
          marginTop: 4,
        },
        listbox: {
          padding: 4,
          '& .MuiAutocomplete-option': {
            borderRadius: PRIMITIVES.radius.sm,
            minHeight: 36,
            fontSize: PRIMITIVES.fontSize.sm,
            fontFamily: brand.typography.bodyFont,
            '&[aria-selected="true"]': {
              backgroundColor: isDark ? c.brand500 : c.brand100,
              color: isDark ? c.brand200 : c.brand450,
              '&.Mui-focused': {
                backgroundColor: isDark ? c.brand500 : c.brand100,
              },
            },
            '&.Mui-focused': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.bgSunken,
            },
          },
        },
        noOptions: {
          fontSize: PRIMITIVES.fontSize.sm,
          fontFamily: brand.typography.bodyFont,
          color: c.contentTertiary,
        },
        clearIndicator: {
          color: c.contentSpot,
          '&:hover': {
            color: c.contentSecondary,
          },
        },
        popupIndicator: {
          color: c.contentSpot,
          '&:hover': {
            color: c.contentSecondary,
          },
        },
      },
    },
  };
}
