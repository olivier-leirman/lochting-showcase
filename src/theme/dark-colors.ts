import type { BrandColors, BrandTokens } from './types';

/* ─── Hex color helpers ─── */

function parseHex(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/** Mix hex color towards white by amount (0–1) */
function lightenHex(hex: string, amount: number): string {
  const { r, g, b } = parseHex(hex);
  return toHex(
    Math.min(255, r + Math.round((255 - r) * amount)),
    Math.min(255, g + Math.round((255 - g) * amount)),
    Math.min(255, b + Math.round((255 - b) * amount)),
  );
}

/** Mix hex color towards black by amount (0–1) */
function darkenHex(hex: string, amount: number): string {
  const { r, g, b } = parseHex(hex);
  return toHex(
    Math.max(0, Math.round(r * (1 - amount))),
    Math.max(0, Math.round(g * (1 - amount))),
    Math.max(0, Math.round(b * (1 - amount))),
  );
}

/**
 * Derive dark-mode color tokens from a brand's light-mode tokens.
 *
 * Priority:
 * 1. If the brand provides explicit `darkOverrides` (sourced from Figma),
 *    those are merged on top of the light-mode colors.
 * 2. Otherwise, dark colors are algorithmically derived as a fallback.
 */
export function deriveDarkColors(brand: BrandTokens): BrandColors {
  const light = brand.colors;

  // ─── Explicit Figma overrides (preferred) ───────────────────────
  if (brand.darkOverrides) {
    const merged: BrandColors = {
      ...light,
      ...brand.darkOverrides,
      // Brand accents always carry over unchanged from light mode
      brand100: light.brand100,
      brand200: light.brand200,
      brand300: light.brand300,
      brand400: light.brand400,
      brand450: light.brand450,
      brand500: light.brand500,
    };

    // Ensure surface/overlay tokens work on dark backgrounds
    // (these are semi-transparent overlays that need to flip color)
    if (!brand.darkOverrides.bgSurface) {
      merged.bgSurface = 'rgba(255, 255, 255, 0.04)';
    }
    if (!brand.darkOverrides.bgSurfaceSecondary) {
      merged.bgSurfaceSecondary = 'rgba(255, 255, 255, 0.07)';
    }
    if (!brand.darkOverrides.bgOverlay) {
      merged.bgOverlay = 'rgba(0, 0, 0, 0.60)';
    }

    return merged;
  }

  // ─── Algorithmic fallback ──────────────────────────────────────
  const darkBase = light.bgBaseInverse;
  const { r, g, b } = parseHex(brand.colors.brand400);

  return {
    // Brand accent colors — unchanged
    brand100: light.brand100,
    brand200: light.brand200,
    brand300: light.brand300,
    brand400: light.brand400,
    brand450: light.brand450,
    brand500: light.brand500,

    // Backgrounds — derived from the dark base
    bgBase: darkBase,
    bgElevated: lightenHex(darkBase, 0.06),
    bgSunken: darkenHex(darkBase, 0.18),
    bgSunkenDeep: darkenHex(darkBase, 0.35),
    bgSunkenDeeper: darkenHex(darkBase, 0.50),
    bgSurface: 'rgba(255, 255, 255, 0.04)',
    bgSurfaceSecondary: 'rgba(255, 255, 255, 0.07)',
    bgSubtle: `rgba(${r}, ${g}, ${b}, 0.14)`,
    bgBaseInverse: light.bgBase, // swap
    bgInverseSecondary: lightenHex(light.bgBase, 0.1), // lighter shade of swapped base
    bgOverlay: 'rgba(0, 0, 0, 0.60)',

    // Content — swap with inverse tokens
    contentPrimary: light.contentInversePrimary,
    contentSecondary: light.contentInverseSecondary,
    contentTertiary: 'rgba(255, 255, 255, 0.45)',
    contentSpot: light.contentInverseSpot,
    contentStayLight: light.contentStayLight, // stays light in both modes
    contentStayDark: light.contentStayDark,   // stays dark in both modes
    contentInversePrimary: light.contentPrimary, // swap
    contentInverseSecondary: light.contentSecondary,
    contentInverseSpot: light.contentSpot,

    // Borders — semi-transparent white on dark backgrounds
    borderDefault: 'rgba(255, 255, 255, 0.12)',
    borderWeak: 'rgba(255, 255, 255, 0.06)',
    borderStrong: 'rgba(255, 255, 255, 0.18)',
    borderStrongest: 'rgba(255, 255, 255, 0.24)',

    // Feedback — lighter text, semi-transparent tinted backgrounds
    error: {
      contentStrong: '#fca5a5',
      bgWeakest: 'rgba(244, 63, 94, 0.12)',
      bgDefault: light.error.bgDefault,
      borderWeak: 'rgba(244, 63, 94, 0.30)',
    },
    warning: {
      contentStrong: '#fcd34d',
      bgWeakest: 'rgba(245, 158, 11, 0.12)',
      bgDefault: light.warning.bgDefault,
      borderWeak: 'rgba(245, 158, 11, 0.30)',
    },
    info: {
      contentStrong: '#93c5fd',
      bgWeakest: 'rgba(59, 130, 246, 0.12)',
      bgDefault: light.info.bgDefault,
      borderWeak: 'rgba(59, 130, 246, 0.30)',
    },
    success: {
      contentStrong: '#6ee7b7',
      bgWeakest: 'rgba(16, 185, 129, 0.12)',
      bgDefault: light.success.bgDefault,
      borderWeak: 'rgba(16, 185, 129, 0.30)',
    },
  };
}
