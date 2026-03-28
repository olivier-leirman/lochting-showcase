import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function autocompleteOverrides(brand: BrandTokens, fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
  const c = brand.colors;
  const isDark = fx.mode === 'dark';

  const chevronIcon = createElement('span', {
    style: {
      fontFamily: '"Material Symbols Rounded"',
      fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20",
      fontSize: 20,
      lineHeight: 1,
      WebkitFontSmoothing: 'antialiased',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }, 'stat_minus_1');

  return {
    MuiAutocomplete: {
      defaultProps: {
        ChipProps: { color: 'secondary', size: 'small' },
        popupIcon: chevronIcon,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            // Reset MUI Autocomplete's default 9px padding back to 0 so the
            // input padding (14px 12px) matches a regular TextField and the
            // label stays vertically centered.
            padding: '0 !important',
            paddingRight: '39px !important',   // keep room for clear/popup icons

            '& .MuiAutocomplete-input': {
              padding: '14px 12px',             // match TextField input padding
            },

            // When chips are present, add just enough wrapper padding for spacing
            '&.MuiInputBase-adornedStart': {
              padding: '5px 39px 5px 5px !important',
              '& .MuiAutocomplete-input': {
                padding: '9px 4px 9px 5px',     // smaller input padding alongside chips
              },
            },

            '& .MuiAutocomplete-tag': {
              margin: 2,
            },

            // Small size — tighter padding to match small inputs
            '&.MuiInputBase-sizeSmall': {
              '& .MuiAutocomplete-input': {
                padding: '10px 12px',
              },
              '&.MuiInputBase-adornedStart': {
                padding: '3px 39px 3px 5px !important',
                '& .MuiAutocomplete-input': {
                  padding: '5px 4px 5px 5px',
                },
              },
            },
          },
        },
        paper: {
          borderRadius: sp.radius.md,
          backgroundColor: sp.surface.cardBg || undefined,
          border: sp.surface.cardBorder || `1px solid ${c.borderDefault}`,
          ...(sp.surface.blur ? {
            backdropFilter: `blur(${sp.surface.blur}px)`,
            WebkitBackdropFilter: `blur(${sp.surface.blur}px)`,
          } : {}),
          boxShadow: [
            `0 4px 16px 0 ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
            `0 1px 4px 0 ${isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)'}`,
          ].join(', '),
          marginTop: 4,
        },
        listbox: {
          padding: 4,
          '& .MuiAutocomplete-option': {
            borderRadius: sp.radius.sm,
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
          transition: 'transform 0.2s ease',
          '&:hover': {
            color: c.contentSecondary,
          },
        },
      },
    },
  };
}
