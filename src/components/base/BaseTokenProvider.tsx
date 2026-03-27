import { useMemo, type ReactNode, type CSSProperties } from 'react';
import { useBrand } from '../../theme/brand-context';

/**
 * Injects brand tokens as CSS custom properties so that
 * Base UI components can consume them without any MUI dependency.
 *
 * Wrap your Base UI components in this provider (or use it at app root
 * alongside MUI's ThemeProvider).
 */
export function BaseTokenProvider({ children }: { children: ReactNode }) {
  const { brand, effects, styleProfile } = useBrand();
  const c = brand.colors;

  const vars = useMemo((): CSSProperties => ({
    // Colors
    '--bw-brand-400': c.brand400,
    '--bw-brand-450': c.brand450,
    '--bw-brand-300': c.brand300,
    '--bw-brand-200': c.brand200,
    '--bw-brand-100': c.brand100,
    '--bw-brand-50': c.brand50,
    '--bw-bg-base': c.bgBase,
    '--bw-bg-elevated': c.bgElevated,
    '--bw-content-primary': c.contentPrimary,
    '--bw-content-secondary': c.contentSecondary,
    '--bw-border-default': c.borderDefault,
    '--bw-error-main': c.error.bgDefault,

    // Typography
    '--bw-font-body': brand.typography.bodyFont,
    '--bw-font-display': brand.typography.displayFont,
    '--bw-font-weight-medium': 500,
    '--bw-font-weight-semibold': brand.typography.strongWeight ?? 600,

    // Radius (from resolved style profile)
    '--bw-radius-sm': `${styleProfile.radius.sm}px`,
    '--bw-radius-md': `${styleProfile.radius.md}px`,
    '--bw-radius-lg': `${styleProfile.radius.lg}px`,

    // Shadows (from effects system)
    '--bw-shadow-button': effects.shadows.primaryButton,
    '--bw-shadow-button-hover': effects.shadows.primaryButtonHover,
    '--bw-shadow-card': effects.shadows.innerElement,
    '--bw-shadow-input': effects.shadows.textfield,

    // Surface (from style profile)
    '--bw-surface-card-bg': styleProfile.surface.cardBg || c.bgElevated,
    '--bw-surface-card-border': styleProfile.surface.cardBorder || c.borderDefault,
    '--bw-surface-input-bg': styleProfile.surface.inputBg || c.bgElevated,
    '--bw-surface-blur': `${styleProfile.surface.blur}px`,

    // Transition
    '--bw-transition-fast': '0.15s ease',
    '--bw-transition-normal': '0.2s ease',
  } as CSSProperties), [brand, effects, styleProfile, c]);

  return (
    <div style={vars}>
      {children}
    </div>
  );
}
