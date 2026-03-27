import { PRIMITIVES } from '../theme/tokens/primitives';
import type { BrandTokens } from '../theme/types';
import { DEFAULT_STYLE_PROFILE } from '../theme/types';

/* ── Violation types ── */

export type ViolationSeverity = 'error' | 'warning';

export interface Violation {
  component: string;
  violation: string;
  severity: ViolationSeverity;
  suggestion: string;
  autoFixAvailable: boolean;
}

export interface ConsistencyReport {
  brand: string;
  violations: Violation[];
  score: number; // 0–100
  checkedAt: string;
}

/* ── Named radius tokens ── */

const VALID_RADII = new Set(Object.values(PRIMITIVES.radius));

/* ── Valid spacing values (multiples of 4, plus half-steps 2 and 6) ── */

const VALID_SPACING = new Set(Object.values(PRIMITIVES.spacing));

/* ── Button height tokens ── */

const VALID_BUTTON_HEIGHTS = new Set([
  PRIMITIVES.component.buttonHeightSm,
  PRIMITIVES.component.buttonHeight,
  PRIMITIVES.component.buttonHeightLg,
]);

/* ── Helpers ── */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.match(/^#([0-9a-f]{6})$/i);
  if (!match) return null;
  const h = match[1];
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number | null {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return null;
  const l1 = relativeLuminance(c1.r, c1.g, c1.b);
  const l2 = relativeLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function snapToGrid(value: number, grid: number = 4): number {
  return Math.round(value / grid) * grid;
}

/* ── Check functions ── */

function checkSpacingGrid(brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const profile = { ...DEFAULT_STYLE_PROFILE, ...brand.styleProfile };

  // Check radius values from style profile
  for (const [key, value] of Object.entries(profile.radius)) {
    if (!VALID_RADII.has(value)) {
      const nearest = [...VALID_RADII].reduce((a, b) =>
        Math.abs(b - value) < Math.abs(a - value) ? b : a,
      );
      violations.push({
        component: `StyleProfile.radius.${key}`,
        violation: `Radius ${value}px is not a named token`,
        severity: 'warning',
        suggestion: `Use ${nearest}px (nearest named token)`,
        autoFixAvailable: true,
      });
    }
  }

  return violations;
}

function checkColorContrast(brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const c = brand.colors;

  // Primary brand color against white
  const ratio = contrastRatio(c.brand400, '#ffffff');
  if (ratio !== null && ratio < 4.5) {
    violations.push({
      component: 'BrandColors.brand400',
      violation: `Primary color ${c.brand400} has contrast ratio ${ratio.toFixed(2)}:1 against white (minimum 4.5:1)`,
      severity: 'error',
      suggestion: 'Darken brand400 to meet WCAG AA contrast requirements',
      autoFixAvailable: false,
    });
  }

  // Content primary against bgBase
  const contentRatio = contrastRatio(c.contentPrimary, c.bgBase);
  if (contentRatio !== null && contentRatio < 4.5) {
    violations.push({
      component: 'BrandColors.contentPrimary',
      violation: `Text color ${c.contentPrimary} has contrast ratio ${contentRatio.toFixed(2)}:1 against background ${c.bgBase}`,
      severity: 'error',
      suggestion: 'Ensure contentPrimary meets WCAG AA against bgBase',
      autoFixAvailable: false,
    });
  }

  // Content secondary against bgBase (lower threshold for secondary text)
  const secRatio = contrastRatio(c.contentSecondary, c.bgBase);
  if (secRatio !== null && secRatio < 3.0) {
    violations.push({
      component: 'BrandColors.contentSecondary',
      violation: `Secondary text ${c.contentSecondary} has contrast ratio ${secRatio.toFixed(2)}:1 against ${c.bgBase}`,
      severity: 'warning',
      suggestion: 'Darken contentSecondary for better readability',
      autoFixAvailable: false,
    });
  }

  return violations;
}

function checkButtonHeights(_brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];

  // Check component sizing tokens from primitives
  const heights = [
    { key: 'buttonHeightSm', value: PRIMITIVES.component.buttonHeightSm },
    { key: 'buttonHeight', value: PRIMITIVES.component.buttonHeight },
    { key: 'buttonHeightLg', value: PRIMITIVES.component.buttonHeightLg },
  ];

  for (const { key, value } of heights) {
    if (!VALID_BUTTON_HEIGHTS.has(value)) {
      violations.push({
        component: `PRIMITIVES.component.${key}`,
        violation: `Button height ${value}px is non-standard`,
        severity: 'error',
        suggestion: `Use 40px (sm), 48px (default), or 56px (lg)`,
        autoFixAvailable: true,
      });
    }
  }

  return violations;
}

function checkTypography(brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const t = brand.typography;

  // Check heading weight is valid
  if (t.headingWeight && ![400, 500, 600, 700].includes(t.headingWeight)) {
    violations.push({
      component: 'BrandTypography.headingWeight',
      violation: `Heading weight ${t.headingWeight} is non-standard`,
      severity: 'warning',
      suggestion: 'Use 400 (regular), 500 (medium), 600 (semibold), or 700 (bold)',
      autoFixAvailable: false,
    });
  }

  // Check fonts are not empty
  if (!t.displayFont) {
    violations.push({
      component: 'BrandTypography.displayFont',
      violation: 'Display font is not set',
      severity: 'error',
      suggestion: 'Set a display font family',
      autoFixAvailable: false,
    });
  }

  if (!t.bodyFont) {
    violations.push({
      component: 'BrandTypography.bodyFont',
      violation: 'Body font is not set',
      severity: 'error',
      suggestion: 'Set a body font family',
      autoFixAvailable: false,
    });
  }

  return violations;
}

function checkStyleProfile(brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const sp = brand.styleProfile;
  if (!sp) return violations;

  // Check blur value is reasonable
  if (sp.blur !== undefined) {
    const blur = (sp as Record<string, unknown>)['blur'];
    if (typeof blur === 'number' && blur > 40) {
      violations.push({
        component: 'StyleProfile.surface.blur',
        violation: `Blur value ${blur}px is unusually high`,
        severity: 'warning',
        suggestion: 'Keep blur between 0–40px for best performance',
        autoFixAvailable: false,
      });
    }
  }

  if (sp.surface?.blur !== undefined && sp.surface.blur > 40) {
    violations.push({
      component: 'StyleProfile.surface.blur',
      violation: `Blur value ${sp.surface.blur}px is unusually high`,
      severity: 'warning',
      suggestion: 'Keep blur between 0–40px for best performance',
      autoFixAvailable: false,
    });
  }

  // Check shadow intensity is reasonable
  if (sp.shadows?.intensity !== undefined && sp.shadows.intensity > 3) {
    violations.push({
      component: 'StyleProfile.shadows.intensity',
      violation: `Shadow intensity ${sp.shadows.intensity} is very high`,
      severity: 'warning',
      suggestion: 'Keep intensity between 0–2 for subtle shadows',
      autoFixAvailable: false,
    });
  }

  return violations;
}

/* ── Main scan function ── */

export function runConsistencyCheck(brand: BrandTokens): ConsistencyReport {
  const violations = [
    ...checkSpacingGrid(brand),
    ...checkColorContrast(brand),
    ...checkButtonHeights(brand),
    ...checkTypography(brand),
    ...checkStyleProfile(brand),
  ];

  // Calculate health score: start at 100, deduct per violation
  const errorDeduction = 10;
  const warningDeduction = 3;
  const totalDeduction = violations.reduce(
    (sum, v) => sum + (v.severity === 'error' ? errorDeduction : warningDeduction),
    0,
  );
  const score = Math.max(0, 100 - totalDeduction);

  return {
    brand: brand.name,
    violations,
    score,
    checkedAt: new Date().toISOString(),
  };
}

/* ── Auto-fix helpers ── */

export function suggestRadiusFix(value: number): number {
  return [...VALID_RADII].reduce((a, b) =>
    Math.abs(b - value) < Math.abs(a - value) ? b : a,
  );
}

export function suggestSpacingFix(value: number): number {
  if (VALID_SPACING.has(value)) return value;
  return snapToGrid(value);
}
