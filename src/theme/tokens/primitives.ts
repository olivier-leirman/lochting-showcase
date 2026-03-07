export const PRIMITIVES = {
  radius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 1000,
  },
  spacing: {
    base: 8,
  },
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
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  component: {
    buttonHeight: 48,
    buttonHeightSm: 40,
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
  },
} as const;
