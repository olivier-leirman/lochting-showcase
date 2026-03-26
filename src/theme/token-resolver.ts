import type { BrandTokens } from './types';
import type { Effects } from './tokens/effects';
import { PRIMITIVES } from './tokens/primitives';

export type TokenMap = Map<string, string>;

/** Normalize any color value to lowercase hex for comparison */
function normalizeColor(value: string): string {
  // Already hex
  if (value.startsWith('#')) return value.toLowerCase();

  // rgb(r, g, b) or rgba(r, g, b, a)
  const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (m) {
    const hex = `#${[m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
    if (m[4] !== undefined && parseFloat(m[4]) < 1) {
      const alpha = Math.round(parseFloat(m[4]) * 255).toString(16).padStart(2, '0');
      return `${hex}${alpha}`.toLowerCase();
    }
    return hex.toLowerCase();
  }
  return value.toLowerCase();
}

/** Normalize a shadow string for comparison: collapse whitespace, normalize colors */
function normalizeShadow(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/rgba?\([^)]+\)/g, c => normalizeColor(c))
    .toLowerCase();
}

/**
 * Build a reverse map from normalized values → token names.
 * Semantic color tokens are inserted first (highest priority).
 * Scale tokens and nested system tokens are appended later.
 * The first match found via `resolveToken` wins.
 */
export function buildTokenMap(brand: BrandTokens, effects: Effects): TokenMap {
  const map: TokenMap = new Map();

  // Helper: only set if key not already present (preserves priority)
  const setOnce = (key: string, name: string) => {
    if (!map.has(key)) map.set(key, name);
  };

  // ── 1. Semantic color tokens (highest priority) ──
  const c = brand.colors;
  const flatColors: [string, string][] = [
    ['brand100', c.brand100], ['brand200', c.brand200], ['brand300', c.brand300],
    ['brand400', c.brand400], ['brand450', c.brand450], ['brand500', c.brand500],
    ['bgBase', c.bgBase], ['bgElevated', c.bgElevated], ['bgSunken', c.bgSunken],
    ['bgSunkenDeep', c.bgSunkenDeep], ['bgSunkenDeeper', c.bgSunkenDeeper],
    ['bgSurface', c.bgSurface], ['bgSurfaceSecondary', c.bgSurfaceSecondary],
    ['bgSubtle', c.bgSubtle], ['bgBaseInverse', c.bgBaseInverse],
    ['bgInverseSecondary', c.bgInverseSecondary], ['bgOverlay', c.bgOverlay],
    ['contentPrimary', c.contentPrimary], ['contentSecondary', c.contentSecondary],
    ['contentTertiary', c.contentTertiary], ['contentSpot', c.contentSpot],
    ['contentSpotWeak', c.contentSpotWeak], ['contentStayLight', c.contentStayLight],
    ['contentStayDark', c.contentStayDark],
    ['contentInversePrimary', c.contentInversePrimary],
    ['contentInverseSecondary', c.contentInverseSecondary],
    ['contentInverseSpot', c.contentInverseSpot],
    ['borderDefault', c.borderDefault], ['borderWeak', c.borderWeak],
    ['borderStrong', c.borderStrong], ['borderStrongest', c.borderStrongest],
  ];
  for (const [name, hex] of flatColors) {
    setOnce(normalizeColor(hex), name);
  }

  // ── 2. System feedback color sets ──
  const systemSets = ['brand', 'error', 'warning', 'info', 'success'] as const;
  for (const set of systemSets) {
    const s = c[set];
    setOnce(normalizeColor(s.contentStrong), `${set}.contentStrong`);
    setOnce(normalizeColor(s.bgWeakest), `${set}.bgWeakest`);
    setOnce(normalizeColor(s.bgDefault), `${set}.bgDefault`);
    setOnce(normalizeColor(s.borderWeak), `${set}.borderWeak`);
  }

  // ── 3. Brand scale (lower priority than semantics) ──
  for (const [key, hex] of Object.entries(brand.brandScale)) {
    setOnce(normalizeColor(hex), `brandScale.${key}`);
  }

  // ── 4. Gradients ──
  for (const [name, value] of Object.entries(effects.gradients)) {
    setOnce(value.toLowerCase(), `gradients.${name}`);
  }

  // ── 5. Shadows ──
  for (const [name, value] of Object.entries(effects.shadows)) {
    setOnce(normalizeShadow(value), `shadows.${name}`);
  }

  // ── 6. Spacing (px values → token names) ──
  for (const [key, value] of Object.entries(PRIMITIVES.spacing)) {
    if (key === 'base') continue;
    setOnce(`${value}px`, `spacing.${key}`);
  }

  // ── 7. Radius ──
  for (const [key, value] of Object.entries(PRIMITIVES.radius)) {
    setOnce(`${value}px`, `radius.${key}`);
  }

  // ── 8. Font sizes ──
  for (const [key, value] of Object.entries(PRIMITIVES.fontSize)) {
    setOnce(value, `fontSize.${key}`);
  }

  // ── 9. Font weights ──
  for (const [key, value] of Object.entries(PRIMITIVES.fontWeight)) {
    setOnce(String(value), `fontWeight.${key}`);
  }

  return map;
}

/** Look up a computed CSS value in the token map. Returns token name or null. */
export function resolveToken(value: string, map: TokenMap): string | null {
  if (!value || value === 'none' || value === 'normal' || value === 'auto') return null;

  // Try direct lookup
  const direct = map.get(value);
  if (direct) return direct;

  // Try normalized color
  const normalized = normalizeColor(value);
  const colorMatch = map.get(normalized);
  if (colorMatch) return colorMatch;

  // Try normalized shadow
  if (value.includes('shadow') || value.includes('px') && value.includes('rgba')) {
    const shadowNorm = normalizeShadow(value);
    const shadowMatch = map.get(shadowNorm);
    if (shadowMatch) return shadowMatch;
  }

  return null;
}
