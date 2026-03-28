import workspaceConfig from './workspace.config.json';
import designRulesConfig from './design-rules.config.json';
import patternsConfig from './patterns.config.json';

// ── Types ──

export interface DesignRuleException {
  component: string;
  override: string;
  reason: string;
}

export interface DesignRule {
  id: string;
  category: string;
  rule: string;
  enforcement: 'error' | 'warning';
  exceptions: DesignRuleException[];
}

export interface ActionPattern {
  variant: string;
  color: string;
}

export interface PatternRule {
  id: string;
  category: string;
  severity: 'critical' | 'warning' | 'suggestion';
  description: string;
  check: string;
}

// ── Design Rules structured token sections ──

export interface SpacingConfig {
  grid: number;
  allowedMultiples: number[];
  sectionGap: number;
  componentGap: number;
}

export interface ButtonsConfig {
  heights: Record<string, number>;
  maxPrimaryPerView: number;
  touchTarget: number;
  destructiveRequiresConfirmation: boolean;
  iconOnlyMinSize: number;
  borderRadius: string;
}

export interface BorderRadiusConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface IconsConfig {
  library: string;
  defaultWeight: number;
  defaultStyle: string;
  defaultOpticalSize: number;
  grade: number;
  fillOnlyFor: string[];
  exceptions: DesignRuleException[];
}

export interface ContrastConfig {
  minRatio: number;
  minLargeTextRatio: number;
  minInteractiveOpacity: number;
  minFocusContrast: number;
}

export interface CardsConfig {
  padding: Record<string, number>;
  radius: Record<string, number>;
  gap: Record<string, number>;
  minClickTarget: number;
}

export interface FocusConfig {
  width: number;
  offset: number;
  style: string;
  color: string;
  minContrast: number;
}

export interface HoverConfig {
  transitionMin: number;
  transitionMax: number;
  easing: string;
  backgroundShift: number;
}

// ── Aggregate config interfaces ──

export interface WorkspaceConfig {
  activeBrand: string;
  activeStyle: string;
  colorMode: 'light' | 'dark';
  sidebar: { collapsed: boolean; activeSection: string };
  lastVisited: string;
}

export interface DesignRulesConfig {
  spacing: SpacingConfig;
  buttons: ButtonsConfig;
  borderRadius: BorderRadiusConfig;
  icons: IconsConfig;
  contrast: ContrastConfig;
  cards: CardsConfig;
  focus: FocusConfig;
  hover: HoverConfig;
  rules: DesignRule[];
}

export interface PatternsConfig {
  actionHierarchy: Record<string, ActionPattern>;
  states: Record<string, string>;
  loading: Record<string, string>;
  rules: PatternRule[];
  iconContainers?: Record<string, unknown>;
  toggleSelection?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface AppConfig {
  workspace: WorkspaceConfig;
  designRules: DesignRulesConfig;
  patterns: PatternsConfig;
}

// ── Static config (read-only at runtime) ──

export const config: AppConfig = {
  workspace: workspaceConfig as WorkspaceConfig,
  designRules: designRulesConfig as DesignRulesConfig,
  patterns: patternsConfig as PatternsConfig,
};

// ── Helpers ──

export function getDesignRules(category?: string): DesignRule[] {
  if (!category) return config.designRules.rules;
  return config.designRules.rules.filter(r => r.category === category);
}

export function getActionPattern(level: string): ActionPattern | undefined {
  return config.patterns.actionHierarchy[level];
}

export function getPatternRules(category?: string): PatternRule[] {
  if (!category) return config.patterns.rules;
  return config.patterns.rules.filter(r => r.category === category);
}
