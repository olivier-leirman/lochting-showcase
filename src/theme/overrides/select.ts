import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

export function selectOverrides(brand: BrandTokens, _fx: Effects): Components<Theme> {
  const c = brand.colors;

  const iconStyle = {
    fontFamily: '"Material Symbols Rounded"',
    fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20",
    fontSize: 20,
    lineHeight: 1,
    color: c.contentSecondary,
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Stable component — always shows down chevron, CSS handles open rotation
  function SelectIcon(props: Record<string, unknown>) {
    return createElement(
      'span',
      { ...props, style: { ...iconStyle, ...(props.style as object || {}) } },
      'stat_minus_1',
    );
  }

  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: SelectIcon as unknown as React.ElementType,
      },
      styleOverrides: {
        root: {
          borderRadius: PRIMITIVES.radius.md,
        },
        icon: {
          top: 'calc(50% - 10px)',
          right: 12,
          transition: 'transform 0.2s ease',
        },
        iconOpen: {
          transform: 'rotate(180deg)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: c.bgElevated,
          border: `1px solid ${c.borderDefault}`,
          borderRadius: 16,
          boxShadow: '4px 6px 18px 0px rgba(84, 84, 84, 0.14)',
          marginTop: 4,
        },
        list: {
          padding: '8px 0',
        },
      },
    },
  };
}
