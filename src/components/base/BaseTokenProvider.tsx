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
    // Brand colors
    '--bw-brand-400': c.brand400,
    '--bw-brand-450': c.brand450,
    '--bw-brand-300': c.brand300,
    '--bw-brand-200': c.brand200,
    '--bw-brand-100': c.brand100,
    '--bw-brand-50': brand.brandScale?.['50'] ?? c.brand100,

    // Backgrounds
    '--bw-bg-base': c.bgBase,
    '--bw-bg-elevated': c.bgElevated,
    '--bw-bg-sunken': c.bgSunken,
    '--bw-bg-overlay': c.bgOverlay,

    // Content
    '--bw-content-primary': c.contentPrimary,
    '--bw-content-secondary': c.contentSecondary,
    '--bw-content-tertiary': c.contentTertiary,
    '--bw-content-stay-light': c.contentStayLight,

    // Borders
    '--bw-border-default': c.borderDefault,
    '--bw-border-weak': c.borderWeak,
    '--bw-border-strong': c.borderStrong,

    // Feedback — error
    '--bw-error-main': c.error.bgDefault,
    '--bw-error-content': c.error.contentStrong,
    '--bw-error-bg': c.error.bgWeakest,
    '--bw-error-border': c.error.borderWeak,
    // Feedback — warning
    '--bw-warning-main': c.warning.bgDefault,
    '--bw-warning-content': c.warning.contentStrong,
    '--bw-warning-bg': c.warning.bgWeakest,
    '--bw-warning-border': c.warning.borderWeak,
    // Feedback — info
    '--bw-info-main': c.info.bgDefault,
    '--bw-info-content': c.info.contentStrong,
    '--bw-info-bg': c.info.bgWeakest,
    '--bw-info-border': c.info.borderWeak,
    // Feedback — success
    '--bw-success-main': c.success.bgDefault,
    '--bw-success-content': c.success.contentStrong,
    '--bw-success-bg': c.success.bgWeakest,
    '--bw-success-border': c.success.borderWeak,

    // Typography
    '--bw-font-body': brand.typography.bodyFont,
    '--bw-font-display': brand.typography.displayFont,
    '--bw-font-weight-medium': 500,
    '--bw-font-weight-semibold': brand.typography.strongWeight ?? 600,

    // Radius (from resolved style profile)
    '--bw-radius-xs': `${Math.round(styleProfile.radius.sm * 0.5)}px`,
    '--bw-radius-sm': `${styleProfile.radius.sm}px`,
    '--bw-radius-md': `${styleProfile.radius.md}px`,
    '--bw-radius-lg': `${styleProfile.radius.lg}px`,
    '--bw-radius-round': '1000px',

    // Shadows (from effects system)
    '--bw-shadow-button': effects.shadows.primaryButton,
    '--bw-shadow-button-hover': effects.shadows.primaryButtonHover,
    '--bw-shadow-card': effects.shadows.innerElement,
    '--bw-shadow-input': effects.shadows.textfield,
    '--bw-shadow-dialog': `0 8px 32px rgba(0,0,0,0.18), ${effects.shadows.innerElement}`,

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
