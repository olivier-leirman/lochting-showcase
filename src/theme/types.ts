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
  brand: SystemColorSet;
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
  /** Override heading weight (h4–h6). Falls back to primitives.fontWeight.medium (500) */
  headingWeight?: number;
  /** Override body-strong / label weight. Falls back to primitives.fontWeight.medium (500) */
  strongWeight?: number;
}

/** Curated accent colors for supplementary palette use */
export interface AccentColorSet {
  /** Light tint — backgrounds, tags, subtle highlights */
  light: string;
  /** Default — icons, badges, accent elements */
  default: string;
  /** Dark shade — text on light backgrounds */
  dark: string;
}

/**
 * StyleProfile — structural / behavioural tokens that define *how* components
 * look beyond just color.  Each style variant supplies one of these so the
 * MUI overrides can produce genuinely different component shapes, shadows,
 * surface treatments, and interaction patterns.
 */
export interface StyleProfile {
  /** Human-readable label (e.g. "Glassmorphism", "Clean Minimal") */
  label: string;

  /* ── Border radius ── */
  radius: {
    /** Small elements: chips, badges, alerts */
    sm: number;
    /** Default: buttons, inputs, cards */
    md: number;
    /** Large: dialogs, hero cards, panels */
    lg: number;
  };

  /* ── Surface treatment ── */
  surface: {
    /** Backdrop-filter blur in px (0 = disabled) */
    blur: number;
    /** Card background CSS value — can include opacity for glass */
    cardBg: string;
    /** Card border CSS shorthand */
    cardBorder: string;
    /** Input background CSS value */
    inputBg: string;
  };

  /* ── Shadow character ── */
  shadows: {
    /** Use inset (neumorphic) shadows on buttons / surfaces */
    useInset: boolean;
    /** Global intensity multiplier (0 = flat, 1 = default, 2 = dramatic) */
    intensity: number;
    /** Tint drop-shadows with the brand accent color */
    brandTinted: boolean;
  };

  /* ── Button styling ── */
  /** Primary button surface: gradient fill, solid fill, or translucent glass */
  buttonPrimary: 'gradient' | 'solid' | 'glass';
  /** Secondary button surface: gradient, flat outline, or translucent glass */
  buttonSecondary: 'gradient' | 'outlined-flat' | 'glass';

  /* ── Misc ── */
  /** Extra CSS properties merged onto card roots (e.g. backdropFilter) */
  cardExtra?: Record<string, string | number>;
  /** Extra CSS properties merged onto input roots */
  inputExtra?: Record<string, string | number>;
}

/** Sensible defaults — matches the original Lochting / Medipim styling */
export const DEFAULT_STYLE_PROFILE: StyleProfile = {
  label: 'Default',
  radius: { sm: 8, md: 12, lg: 16 },
  surface: {
    blur: 0,
    cardBg: '',       // empty = use theme background.paper
    cardBorder: '',   // empty = no explicit border
    inputBg: '',      // empty = use bgSunken
  },
  shadows: { useInset: true, intensity: 1, brandTinted: false },
  buttonPrimary: 'gradient',
  buttonSecondary: 'gradient',
};

export interface BrandTokens {
  id: string;
  name: string;
  colors: BrandColors;
  /** Explicit dark-mode color overrides sourced from Figma NeutralColor/modes.
   *  When present, these take precedence over algorithmically derived dark colors. */
  darkOverrides?: Partial<BrandColors>;
  typography: BrandTypography;
  brandScale: BrandScale;
  /** Structural / behavioural style tokens (shape, surface, shadow character).
   *  Falls back to DEFAULT_STYLE_PROFILE when omitted. */
  styleProfile?: Partial<StyleProfile>;
  /** Hand-picked supplementary accent colors that complement the brand primary.
   *  When absent, accents are generated dynamically via color-harmony.ts */
  accents?: {
    /** Label for this curated set (e.g. "Pharmacy Mint & Warm Gold") */
    label?: string;
    colors: Record<string, AccentColorSet>;
  };
}
