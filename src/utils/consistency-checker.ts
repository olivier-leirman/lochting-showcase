import { PRIMITIVES } from '../theme/tokens/primitives';
import type { BrandTokens } from '../theme/types';
import { DEFAULT_STYLE_PROFILE } from '../theme/types';
import { getUnifiedRegistry } from '../showcase/registry';
import { config } from '../config';

/* ── Violation types ── */

export type ViolationSeverity = 'error' | 'warning' | 'suggestion';
export type ViolationCategory = 'consistency' | 'patterns' | 'parity' | 'ux';

export interface Violation {
  component: string;
  violation: string;
  severity: ViolationSeverity;
  suggestion: string;
  autoFixAvailable: boolean;
  category: ViolationCategory;
  claudeCodePrompt?: string;
}

export interface CategorySummary {
  category: ViolationCategory;
  label: string;
  total: number;
  errors: number;
  warnings: number;
  suggestions: number;
}

export interface ConsistencyReport {
  brand: string;
  violations: Violation[];
  score: number; // 0–100
  categories: CategorySummary[];
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
        category: 'consistency',
      });
    }
  }

  return violations;
}

function checkColorContrast(brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const c = brand.colors;

  // Primary interactive color against white (brand450 is used for button backgrounds, text-on-white)
  const ratio = contrastRatio(c.brand450, '#ffffff');
  if (ratio !== null && ratio < 4.5) {
    violations.push({
      component: 'BrandColors.brand450',
      violation: `Interactive color ${c.brand450} has contrast ratio ${ratio.toFixed(2)}:1 against white (minimum 4.5:1)`,
      severity: 'error',
      suggestion: 'Darken brand450 to meet WCAG AA contrast requirements',
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
        category: 'consistency',
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
        category: 'consistency',
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

/* ── Pattern checks ── */

function checkPatterns(_brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const rules = config.patterns.rules ?? [];

  // Report the number of pattern rules defined
  const categoryCount: Record<string, number> = {};
  for (const rule of rules) {
    categoryCount[rule.category] = (categoryCount[rule.category] ?? 0) + 1;
  }

  // Check that critical categories have rules
  const requiredCategories = ['buttons', 'selection', 'icons', 'navigation'];
  for (const cat of requiredCategories) {
    if (!categoryCount[cat]) {
      violations.push({
        component: `PatternRules.${cat}`,
        violation: `No pattern rules defined for category "${cat}"`,
        severity: 'warning',
        suggestion: `Add enforceable rules for ${cat} patterns in patterns.config.json`,
        autoFixAvailable: false,
        category: 'patterns',
      });
    }
  }

  // Check icon containers guideline exists
  const iconContainers = config.patterns.iconContainers;
  if (!iconContainers) {
    violations.push({
      component: 'PatternGuidelines.iconContainers',
      violation: 'Icon container guidelines are not defined',
      severity: 'warning',
      suggestion: 'Add iconContainers section to patterns.config.json',
      autoFixAvailable: false,
      category: 'patterns',
    });
  }

  // Check toggle selection guideline exists
  const toggleSelection = config.patterns.toggleSelection;
  if (!toggleSelection) {
    violations.push({
      component: 'PatternGuidelines.toggleSelection',
      violation: 'Toggle selection guidelines are not defined',
      severity: 'warning',
      suggestion: 'Add toggleSelection section to patterns.config.json',
      autoFixAvailable: false,
      category: 'patterns',
    });
  }

  // Check action hierarchy is complete
  const hierarchy = config.patterns.actionHierarchy;
  const requiredActions = ['primary', 'secondary', 'tertiary', 'destructive'];
  for (const action of requiredActions) {
    if (!hierarchy?.[action]) {
      violations.push({
        component: `ActionHierarchy.${action}`,
        violation: `Action hierarchy missing "${action}" level`,
        severity: 'error',
        suggestion: `Define ${action} action pattern in actionHierarchy config`,
        autoFixAvailable: false,
        category: 'patterns',
      });
    }
  }

  return violations;
}

/* ── Parity checks (MUI ↔ Base UI) ── */

function checkParity(): Violation[] {
  const violations: Violation[] = [];
  const unified = getUnifiedRegistry();

  // Count implementation coverage
  const muiOnly = unified.filter(c => c.layers.length === 1 && c.layers[0] === 'mui');
  const baseOnly = unified.filter(c => c.layers.length === 1 && c.layers[0] === 'base');
  const both = unified.filter(c => c.layers.length === 2);

  // Report components that only have one implementation
  if (muiOnly.length > 0 && both.length > 0) {
    // Only flag if some components have both — meaning parity is a goal
    const highPriority = muiOnly.filter(c => ['button', 'text-field', 'select', 'card', 'checkbox'].includes(c.id));
    for (const comp of highPriority) {
      violations.push({
        component: `Parity.${comp.id}`,
        violation: `"${comp.name}" only has MUI implementation — Base UI variant missing`,
        severity: 'suggestion',
        suggestion: `Create Base UI implementation for ${comp.name} in src/components/base/`,
        autoFixAvailable: false,
        category: 'parity',
        claudeCodePrompt: `Create a Base UI implementation for ${comp.name}. Follow the pattern in src/components/base/BwButton.tsx. Register it in src/showcase/register-base-components.tsx.`,
      });
    }
  }

  // Report parity stats as a suggestion
  if (unified.length > 0) {
    const parityPercent = Math.round((both.length / unified.length) * 100);
    if (parityPercent < 30) {
      violations.push({
        component: 'Parity.coverage',
        violation: `Only ${parityPercent}% of components have both MUI and Base UI implementations (${both.length}/${unified.length})`,
        severity: 'suggestion',
        suggestion: 'Increase Base UI coverage for core components (Button, Input, Card, Checkbox, Select)',
        autoFixAvailable: false,
        category: 'parity',
      });
    }
  }

  return violations;
}

/* ── UX checks ── */

function checkUX(brand: BrandTokens): Violation[] {
  const violations: Violation[] = [];
  const c = brand.colors;

  // Check that error/warning/success colors exist and have contrast
  const systemColors = [
    { name: 'error', color: c.error },
    { name: 'warning', color: c.warning },
    { name: 'success', color: c.success },
    { name: 'info', color: c.info },
  ];

  for (const { name, color } of systemColors) {
    if (!color?.contentStrong) {
      violations.push({
        component: `SystemColors.${name}`,
        violation: `System color "${name}" is missing contentStrong value`,
        severity: 'error',
        suggestion: `Define ${name}.contentStrong in brand tokens`,
        autoFixAvailable: false,
        category: 'ux',
      });
    }
    if (!color?.bgWeakest) {
      violations.push({
        component: `SystemColors.${name}`,
        violation: `System color "${name}" is missing bgWeakest value`,
        severity: 'warning',
        suggestion: `Define ${name}.bgWeakest for chip/badge backgrounds`,
        autoFixAvailable: false,
        category: 'ux',
      });
    }
  }

  // Check accent colors availability
  if (!brand.accents) {
    violations.push({
      component: 'AccentColors',
      violation: 'No curated accent colors defined — using generated harmonies only',
      severity: 'suggestion',
      suggestion: 'Add curated accent colors (e.g. teal, gold, coral) for dashboard and data visualization use cases',
      autoFixAvailable: false,
      category: 'ux',
    });
  }

  return violations;
}

/* ── Main scan function ── */

function buildCategories(violations: Violation[]): CategorySummary[] {
  const cats: ViolationCategory[] = ['consistency', 'patterns', 'parity', 'ux'];
  const labels: Record<ViolationCategory, string> = {
    consistency: 'Consistency',
    patterns: 'Patterns',
    parity: 'MUI ↔ Base UI Parity',
    ux: 'UX Quality',
  };
  return cats.map(cat => {
    const catViolations = violations.filter(v => v.category === cat);
    return {
      category: cat,
      label: labels[cat],
      total: catViolations.length,
      errors: catViolations.filter(v => v.severity === 'error').length,
      warnings: catViolations.filter(v => v.severity === 'warning').length,
      suggestions: catViolations.filter(v => v.severity === 'suggestion').length,
    };
  });
}

export function runConsistencyCheck(brand: BrandTokens): ConsistencyReport {
  const violations = [
    ...checkSpacingGrid(brand),
    ...checkColorContrast(brand),
    ...checkButtonHeights(brand),
    ...checkTypography(brand),
    ...checkStyleProfile(brand),
    ...checkPatterns(brand),
    ...checkParity(),
    ...checkUX(brand),
  ];

  // Calculate health score: start at 100, deduct per violation
  const errorDeduction = 10;
  const warningDeduction = 3;
  const suggestionDeduction = 0; // suggestions don't affect score
  const totalDeduction = violations.reduce(
    (sum, v) => sum + (v.severity === 'error' ? errorDeduction : v.severity === 'warning' ? warningDeduction : suggestionDeduction),
    0,
  );
  const score = Math.max(0, 100 - totalDeduction);

  return {
    brand: brand.name,
    violations,
    score,
    categories: buildCategories(violations),
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
