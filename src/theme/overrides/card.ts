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
  const isDark = fx.mode === 'dark';
  const profile = sp;

  // Subtle card shadows — high blur, low opacity (never harsh/black)
  const cardShadow = isDark
    ? '0 2px 8px 0 rgba(0,0,0,0.20)'
    : '0 1px 4px 0 rgba(0,0,0,0.06)';
  const cardHoverShadow = isDark
    ? '0 4px 16px 0 rgba(0,0,0,0.28)'
    : '0 4px 16px 0 rgba(0,0,0,0.08)';

  // Build card root styles from profile — flat by default (no resting shadow)
  const cardRoot: Record<string, unknown> = {
    borderRadius: profile.radius.lg,
    fontFamily: brand.typography.bodyFont,
    backgroundImage: 'none',
    boxShadow: 'none',
    transition: 'box-shadow 0.2s ease-out, border-color 0.2s ease-out',
  };

  // Surface treatment from profile
  if (profile.surface.cardBg) {
    cardRoot.backgroundColor = profile.surface.cardBg;
  }
  // Border: use profile border if set, otherwise default to subtle border
  if (profile.surface.cardBorder) {
    cardRoot.border = profile.surface.cardBorder;
  } else {
    cardRoot.border = `1px solid ${c.borderDefault}`;
  }
  // Extra CSS (backdrop-filter for glass, etc.)
  if (profile.cardExtra) {
    Object.assign(cardRoot, profile.cardExtra);
  }

  return {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: cardRoot,
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          // Clickable cards get a subtle resting shadow to signal interactivity
          '& .MuiCard-root, &': {
            boxShadow: cardShadow,
          },
          '&:hover': {
            '& .MuiCard-root, &': {
              boxShadow: cardHoverShadow,
            },
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 16px 8px',
        },
        title: {
          fontFamily: brand.typography.bodyFont,
          fontWeight: PRIMITIVES.fontWeight.medium,
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
          fontWeight: PRIMITIVES.fontWeight.medium,
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
