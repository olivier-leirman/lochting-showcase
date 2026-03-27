import { describe, it, expect } from 'vitest';
import { generateStyleFromPrompt, createBlankStyle, exportStyleAsTypeScript } from './style-generator';

describe('style-generator', () => {
  describe('generateStyleFromPrompt', () => {
    it('generates a glass style from glass keywords', () => {
      const style = generateStyleFromPrompt('frosted glass with translucent surfaces');
      expect(style.surface.blur).toBeGreaterThan(0);
      expect(style.shadows.brandTinted).toBe(true);
      expect(style.interaction.hoverEffect).toBe('glow');
    });

    it('generates a flat style from flat keywords', () => {
      const style = generateStyleFromPrompt('clean minimal flat design');
      expect(style.surface.blur).toBe(0);
      expect(style.shadows.intensity).toBe(0);
    });

    it('generates a brutal style from brutal keywords', () => {
      const style = generateStyleFromPrompt('bold brutalist raw heavy');
      expect(style.borderRadius.sm).toBe(0);
      expect(style.shadows.intensity).toBe(2);
      expect(style.interaction.activeEffect).toBe('none');
    });

    it('generates neumorphic style from neumorphism keywords', () => {
      const style = generateStyleFromPrompt('neumorphism clay extruded');
      expect(style.shadows.useInset).toBe(true);
    });

    it('generates a soft style from soft keywords', () => {
      const style = generateStyleFromPrompt('soft gentle airy calm');
      expect(style.shadows.intensity).toBe(0.6);
      expect(style.interaction.transitionDuration).toBe('0.3s');
    });

    it('generates a premium style', () => {
      const style = generateStyleFromPrompt('premium luxury elegant');
      expect(style.shadows.brandTinted).toBe(true);
      expect(style.shadows.intensity).toBe(1.2);
    });

    it('always returns a valid StyleDefinition with all required fields', () => {
      const style = generateStyleFromPrompt('random unknown words');
      expect(style.id).toBeTruthy();
      expect(style.name).toBeTruthy();
      expect(style.surface).toBeDefined();
      expect(style.borderRadius).toBeDefined();
      expect(style.shadows).toBeDefined();
      expect(style.elevation).toBeDefined();
      expect(style.interaction).toBeDefined();
      expect(style.buttonPrimary).toBeDefined();
      expect(style.buttonSecondary).toBeDefined();
      expect(style.cardTreatment).toBeDefined();
      expect(style.inputTreatment).toBeDefined();
    });

    it('generates an id starting with custom-', () => {
      const style = generateStyleFromPrompt('glass');
      expect(style.id).toMatch(/^custom-\d+$/);
    });
  });

  describe('createBlankStyle', () => {
    it('returns a valid style with sensible defaults', () => {
      const style = createBlankStyle();
      expect(style.name).toBe('New Custom Style');
      expect(style.borderRadius.sm).toBe(8);
      expect(style.shadows.intensity).toBe(1);
    });
  });

  describe('exportStyleAsTypeScript', () => {
    it('generates valid TypeScript string', () => {
      const style = createBlankStyle();
      const ts = exportStyleAsTypeScript(style);
      expect(ts).toContain('StyleDefinition');
      expect(ts).toContain(style.name);
      expect(ts).toContain('export const');
    });
  });
});
