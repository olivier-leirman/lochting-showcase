import { createElement } from 'react';
import type { Components, Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from '../types';
import { DEFAULT_STYLE_PROFILE } from '../types';
import type { Effects } from '../tokens/effects';
import { PRIMITIVES } from '../tokens/primitives';

/* ── Material Symbols Rounded helper (weight 200, outline) ── */
function msIcon(name: string, size = 20, color?: string) {
  return (props: Record<string, unknown>) =>
    createElement('span', {
      ...props,
      className: 'material-symbols-rounded',
      style: {
        fontFamily: '"Material Symbols Rounded"',
        fontVariationSettings: `'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' ${size}`,
        fontSize: size,
        lineHeight: 1,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitFontSmoothing: 'antialiased',
        ...(props?.style as object || {}),
      },
    }, name);
}

export function cardOverrides(
  brand: BrandTokens,
  fx: Effects,
  sp: StyleProfile = DEFAULT_STYLE_PROFILE,
): Components<Theme> {
  const c = brand.colors;
  void fx; // preserve parameter for API parity
  const profile = sp;

  // Build card root styles from profile
  const cardRoot: Record<string, unknown> = {
    borderRadius: profile.radius.lg,
    fontFamily: brand.typography.bodyFont,
    backgroundImage: 'none',
  };

  // Surface treatment from profile
  if (profile.surface.cardBg) {
    cardRoot.backgroundColor = profile.surface.cardBg;
  }
  if (profile.surface.cardBorder) {
    cardRoot.border = profile.surface.cardBorder;
  }
  // Extra CSS (backdrop-filter for glass, etc.)
  if (profile.cardExtra) {
    Object.assign(cardRoot, profile.cardExtra);
  }

  return {
    MuiCard: {
      styleOverrides: {
        root: cardRoot,
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 16px 8px',
        },
        title: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          fontSize: PRIMITIVES.fontSize.md,
        },
        subheader: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.xs,
          color: c.contentTertiary,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          padding: '8px 16px 16px',
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '8px 16px 16px',
          gap: 8,
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          error: createElement(msIcon('error', 20)),
          warning: createElement(msIcon('warning', 20)),
          success: createElement(msIcon('check_circle', 20)),
          info: createElement(msIcon('info', 20)),
        },
      },
      styleOverrides: {
        root: {
          fontFamily: brand.typography.bodyFont,
          fontSize: PRIMITIVES.fontSize.sm,
          fontWeight: PRIMITIVES.fontWeight.semibold,
          borderRadius: PRIMITIVES.radius.sm,
          padding: '6px 12px',
        },
        icon: {
          alignItems: 'center',
          padding: 0,
          marginRight: 8,
        },
        message: {
          padding: '4px 0',
        },
        outlinedError: {
          backgroundColor: c.error.bgWeakest,
          borderColor: c.error.borderWeak,
          color: c.error.contentStrong,
          '& .MuiAlert-icon': { color: c.error.contentStrong },
        },
        outlinedWarning: {
          backgroundColor: c.warning.bgWeakest,
          borderColor: c.warning.borderWeak,
          color: c.warning.contentStrong,
          '& .MuiAlert-icon': { color: c.warning.contentStrong },
        },
        outlinedSuccess: {
          backgroundColor: c.success.bgWeakest,
          borderColor: c.success.borderWeak,
          color: c.success.contentStrong,
          '& .MuiAlert-icon': { color: c.success.contentStrong },
        },
        outlinedInfo: {
          backgroundColor: c.info.bgWeakest,
          borderColor: c.info.borderWeak,
          color: c.info.contentStrong,
          '& .MuiAlert-icon': { color: c.info.contentStrong },
        },
        filled: {
          '& .material-symbols-rounded': {
            fontVariationSettings: "'FILL' 1, 'wght' 200, 'GRAD' 0, 'opsz' 20 !important",
          },
        },
        filledError: {
          color: c.contentInversePrimary,
          '& .MuiAlert-icon': { color: c.contentInversePrimary },
        },
        filledWarning: {
          color: c.contentInversePrimary,
          '& .MuiAlert-icon': { color: c.contentInversePrimary },
        },
        filledSuccess: {
          color: c.contentInversePrimary,
          '& .MuiAlert-icon': { color: c.contentInversePrimary },
        },
        filledInfo: {
          color: c.contentInversePrimary,
          '& .MuiAlert-icon': { color: c.contentInversePrimary },
        },
      },
    },
  };
}
