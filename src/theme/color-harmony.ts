/**
 * Color harmony generator
 * ───────────────────────
 * Generates complementary, analogous, split-complementary, and triadic
 * accent palettes from a source hex color. Each accent gets a full
 * mini-scale (light/default/dark) so it can be used for backgrounds,
 * text, and borders — matching the SystemColorSet pattern.
 */

export type HarmonyType = 'complementary' | 'analogous' | 'split-complementary' | 'triadic';

export interface AccentColor {
  /** Human-readable label */
  label: string;
  /** Hue angle (for reference) */
  hue: number;
  /** Light tint — use for bgWeakest / tags / highlights */
  light: string;
  /** Default / saturated — use for icons, badges, accents */
  default: string;
  /** Dark shade — use for text on light backgrounds */
  dark: string;
}

export interface AccentPalette {
  harmony: HarmonyType;
  accents: AccentColor[];
}

/* ── Internal helpers ── */

function hexToHsl(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue = 0;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) hue = ((b - r) / d + 2) / 6;
  else hue = ((r - g) / d + 4) / 6;

  return [hue * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * Math.max(0, Math.min(1, color)))
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Generate a 3-shade mini-scale from a given hue */
function makeAccent(hue: number, baseSat: number, label: string): AccentColor {
  // Clamp saturation for pleasant results
  const sat = Math.min(baseSat, 0.75);
  return {
    label,
    hue: Math.round(((hue % 360) + 360) % 360),
    light: hslToHex(hue, sat * 0.45, 0.93),  // very light tint
    default: hslToHex(hue, sat, 0.52),         // vibrant mid-tone
    dark: hslToHex(hue, sat * 0.8, 0.30),     // dark shade for text
  };
}

/* ── Public API ── */

/** Get the hue offsets for a given harmony type */
function getHueOffsets(harmony: HarmonyType): number[] {
  switch (harmony) {
    case 'complementary':
      return [180];
    case 'analogous':
      return [-30, 30];
    case 'split-complementary':
      return [150, 210];
    case 'triadic':
      return [120, 240];
  }
}

/** Labels per harmony type */
function getLabels(harmony: HarmonyType): string[] {
  switch (harmony) {
    case 'complementary':
      return ['Complement'];
    case 'analogous':
      return ['Analogous A', 'Analogous B'];
    case 'split-complementary':
      return ['Split A', 'Split B'];
    case 'triadic':
      return ['Triad A', 'Triad B'];
  }
}

/**
 * Generate an accent palette for a given harmony type from a source hex color.
 * Always includes the source as the first accent for reference.
 */
export function generateHarmony(sourceHex: string, harmony: HarmonyType): AccentPalette {
  const [h, s, _l] = hexToHsl(sourceHex);
  const offsets = getHueOffsets(harmony);
  const labels = getLabels(harmony);

  const source: AccentColor = {
    label: 'Primary',
    hue: Math.round(h),
    light: hslToHex(h, s * 0.45, 0.93),
    default: sourceHex,
    dark: hslToHex(h, s * 0.8, 0.30),
  };

  const accents = offsets.map((offset, i) =>
    makeAccent(h + offset, s, labels[i])
  );

  return {
    harmony,
    accents: [source, ...accents],
  };
}

/**
 * Generate all harmony palettes from a source hex.
 * Useful for preview purposes (show all harmonies at once).
 */
export function generateAllHarmonies(sourceHex: string): Record<HarmonyType, AccentPalette> {
  return {
    complementary: generateHarmony(sourceHex, 'complementary'),
    analogous: generateHarmony(sourceHex, 'analogous'),
    'split-complementary': generateHarmony(sourceHex, 'split-complementary'),
    triadic: generateHarmony(sourceHex, 'triadic'),
  };
}

/** All available harmony types */
export const HARMONY_TYPES: HarmonyType[] = ['complementary', 'analogous', 'split-complementary', 'triadic'];

/** Human-readable labels for harmony types */
export const HARMONY_LABELS: Record<HarmonyType, string> = {
  complementary: 'Complementary',
  analogous: 'Analogous',
  'split-complementary': 'Split-Complementary',
  triadic: 'Triadic',
};
