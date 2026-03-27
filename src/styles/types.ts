/**
 * StyleDefinition — A standalone style definition that can be combined with
 * any BrandTokens to produce a unique Brand × Style combination.
 *
 * This extends the original StyleProfile concept by making styles first-class
 * entities that are independent from brand tokens.
 */
export interface StyleDefinition {
  id: string;
  name: string;
  description: string;

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

  /* ── Elevation / shadows ── */
  elevation: {
    none: string;
    low: string;
    medium: string;
    high: string;
  };

  /* ── Interaction ── */
  interaction: {
    /** CSS hover effect description */
    hoverEffect: 'opacity-shift' | 'lift' | 'glow' | 'scale' | 'darken';
    /** CSS active/press effect */
    activeEffect: 'scale-down' | 'press-in' | 'none';
    /** Focus ring style */
    focusRing: 'ring-2px-brand' | 'ring-3px-offset' | 'outline-dashed' | 'glow';
    /** Transition duration */
    transitionDuration: string;
    /** Transition easing */
    transitionEasing: string;
  };

  /* ── Border radius ── */
  borderRadius: {
    /** Whether radius values are absolute px or a multiplier on brand tokens */
    mode: 'absolute' | 'multiplier';
    /** The radius values (sm/md/lg) or a single multiplier */
    sm: number;
    md: number;
    lg: number;
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

  /* ── Component treatments ── */
  buttonPrimary: 'gradient' | 'solid' | 'glass' | 'outline-bold' | 'flat';
  buttonSecondary: 'gradient' | 'outlined-flat' | 'glass' | 'ghost' | 'flat';
  cardTreatment: 'elevated' | 'bordered' | 'glass' | 'inset' | 'flat';
  inputTreatment: 'outlined' | 'filled' | 'glass' | 'underline' | 'bordered';

  /* ── Extras ── */
  /** Extra CSS properties merged onto card roots */
  cardExtra?: Record<string, string | number>;
  /** Extra CSS properties merged onto input roots */
  inputExtra?: Record<string, string | number>;
}
