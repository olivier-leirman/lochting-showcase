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
  contentPrimary: string;
  contentSecondary: string;
  contentTertiary: string;
  contentSpot: string;
  contentStayLight: string;
  borderDefault: string;
  borderWeak: string;
  borderStrong: string;
  borderStrongest: string;
  error: SystemColorSet;
  warning: SystemColorSet;
  info: SystemColorSet;
  success: SystemColorSet;
}

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
  typography: BrandTypography;
}
