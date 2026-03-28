import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';

export function selectOverrides(brand: BrandTokens, _fx: Effects, sp: StyleProfile = DEFAULT_STYLE_PROFILE): Components<Theme> {
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
          borderRadius: sp.radius.md,
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
          backgroundColor: sp.surface.cardBg || c.bgElevated,
          border: sp.surface.cardBorder || `1px solid ${c.borderDefault}`,
          borderRadius: sp.radius.lg,
          boxShadow: '4px 6px 18px 0px rgba(84, 84, 84, 0.14)',
          marginTop: 4,
          ...(sp.surface.blur ? {
            backdropFilter: `blur(${sp.surface.blur}px)`,
            WebkitBackdropFilter: `blur(${sp.surface.blur}px)`,
          } : {}),
        },
        list: {
          padding: '8px 0',
        },
      },
    },
  };
}
