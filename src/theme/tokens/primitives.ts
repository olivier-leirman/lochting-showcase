export const PRIMITIVES = {
  /* ── 4 px spacing grid ── */
  spacing: {
    base: 4,           // base unit
    '0': 0,            //  0 px
    '0.5': 2,          //  2 px
    '1': 4,            //  4 px
    '1.5': 6,          //  6 px
    '2': 8,            //  8 px
    '3': 12,           // 12 px
    '4': 16,           // 16 px
    '5': 20,           // 20 px
    '6': 24,           // 24 px
    '8': 32,           // 32 px
    '10': 40,          // 40 px
    '12': 48,          // 48 px
    '16': 64,          // 64 px
    '20': 80,          // 80 px
    '24': 96,          // 96 px
  },

  /* ── Border radius ── */
  radius: {
    none: 0,
    xs: 4,
    'xs-plus': 6,
    sm: 8,
    'sm-plus': 10,
    md: 12,
    lg: 16,
    'lg-plus': 20,
    xl: 24,
    '2xl': 32,
    round: 1000,
  },

  /* ── Breakpoints ── */
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },

  /* ── Font sizes ── */
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    md: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.375rem',  // 22px
    '2xl': '1.75rem',  // 28px
    '3xl': '2rem',     // 32px
    '4xl': '2.5rem',   // 40px
    '5xl': '3.5rem',   // 56px
  },

  /* ── Font weights ── */
  fontWeight: {
    regular: 400,
    medium: 500,
  },

  /* ── Component sizing ── */
  component: {
    buttonHeight: 48,
    buttonHeightSm: 40,
    buttonHeightLg: 56,
    utilityButtonSize: 32,
    checkboxSize: 20,
    radioDotSize: 8,
    switchWidth: 44,
    switchHeight: 20,
    switchThumbSize: 16,
    sliderTrackHeight: 12,
    sliderThumbSize: 20,
    chipHeight: 24,
    chipHeightLg: 40,
    badgeSize: 24,
    inputHeight: 48,
    inputHeightSm: 40,
    inputHeightLg: 56,
  },
} as const;
