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

export interface WorkspaceConfig {
  activeBrand: string;
  activeStyle: string;
  colorMode: 'light' | 'dark';
  sidebar: { collapsed: boolean; activeSection: string };
  lastVisited: string;
}

export interface DesignRulesConfig {
  rules: DesignRule[];
}

export interface PatternsConfig {
  actionHierarchy: Record<string, ActionPattern>;
  states: Record<string, string>;
  loading: Record<string, string>;
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
