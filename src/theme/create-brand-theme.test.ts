import { describe, it, expect } from 'vitest';
import { createBrandTheme } from './create-brand-theme';
import { LOCHTING } from './tokens/lochting';
import { MEDIPIM } from './tokens/medipim';

describe('createBrandTheme', () => {
  it('creates a valid MUI theme for Lochting in light mode', () => {
    const { theme, effects, profile } = createBrandTheme(LOCHTING, 'light');
    expect(theme).toBeTruthy();
    expect(theme.palette).toBeTruthy();
    expect(effects.mode).toBe('light');
    expect(profile).toBeTruthy();
    expect(profile.radius.md).toBeGreaterThan(0);
  });

  it('creates a valid MUI theme for Lochting in dark mode', () => {
    const { theme, effects } = createBrandTheme(LOCHTING, 'dark');
    expect(effects.mode).toBe('dark');
    expect(theme.palette.mode).toBe('dark');
  });

  it('creates a valid MUI theme for Medipim', () => {
    const { theme, effects } = createBrandTheme(MEDIPIM, 'light');
    expect(theme).toBeTruthy();
    expect(effects.mode).toBe('light');
  });

  it('returns a default profile with expected shape', () => {
    const { profile } = createBrandTheme(LOCHTING, 'light');
    expect(profile.buttonPrimary).toBeTruthy();
    expect(profile.surface).toBeDefined();
    expect(profile.radius).toBeDefined();
    expect(profile.shadows).toBeDefined();
  });

  it('generates shadows in effects', () => {
    const { effects } = createBrandTheme(LOCHTING, 'light');
    expect(effects.shadows.primaryButton).toBeTruthy();
    expect(effects.shadows.secondaryButton).toBeTruthy();
    expect(effects.shadows.textfield).toBeDefined();
  });

  it('generates gradients in effects', () => {
    const { effects } = createBrandTheme(LOCHTING, 'light');
    expect(effects.gradients.primary).toContain('linear-gradient');
    expect(effects.gradients.secondary).toContain('linear-gradient');
  });
});
