export interface SystemColorSet {
  contentStrong: string;
  bgWeakest: string;
  bgDefault: string;
  borderWeak: string;
}

export interface BrandColors {
  brand100: string;
  brand200: string;
  brand300: string;
  brand400: string;
  brand450: string;
  brand500: string;
  bgBase: string;
  bgElevated: string;
  bgSunken: string;
  bgSunkenDeep: string;
  bgSunkenDeeper: string;
  bgSurface: string;
  bgSurfaceSecondary: string;
  bgSubtle: string;
  bgBaseInverse: string;
  bgInverseSecondary: string;
  bgOverlay: string;
  contentPrimary: string;
  contentSecondary: string;
  contentTertiary: string;
  contentSpot: string;
  contentSpotWeak: string;
  contentStayLight: string;
  contentStayDark: string;
  contentInversePrimary: string;
  contentInverseSecondary: string;
  contentInverseSpot: string;
  borderDefault: string;
  borderWeak: string;
  borderStrong: string;
  borderStrongest: string;
  error: SystemColorSet;
  warning: SystemColorSet;
  info: SystemColorSet;
  success: SystemColorSet;
}

/** Tailwind-style color scale from lightest (50) to darkest (950) */
export type BrandScale = Record<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950', string>;

export interface BrandTypography {
  displayFont: string;
  bodyFont: string;
  /** Override heading weight (h4–h6). Falls back to primitives.fontWeight.semibold */
  headingWeight?: number;
  /** Override body-strong / label weight. Falls back to primitives.fontWeight.semibold */
  strongWeight?: number;
}

export interface BrandTokens {
  id: string;
  name: string;
  colors: BrandColors;
  /** Explicit dark-mode color overrides sourced from Figma NeutralColor/modes.
   *  When present, these take precedence over algorithmically derived dark colors. */
  darkOverrides?: Partial<BrandColors>;
  typography: BrandTypography;
  brandScale: BrandScale;
}
