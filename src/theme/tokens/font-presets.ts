import type { BrandTypography } from '../types';

export interface FontPreset {
  /** Short label for the UI toggle */
  label: string;
  /** Typography overrides applied on top of the brand defaults */
  typography: Partial<BrandTypography>;
}

/**
 * Available font presets per brand.
 * Index 0 is always the brand's default / original font combination.
 * When a preset supplies only displayFont/bodyFont, the brand's own
 * headingWeight and strongWeight are preserved.
 */
/** Shared Lochting font presets — reused across all Lochting theme variants */
const LOCHTING_FONT_PRESETS: FontPreset[] = [
  {
    label: 'Calibre',
    typography: {
      displayFont: '"Calibre", sans-serif',
      bodyFont: '"Calibre", sans-serif',
    },
  },
  {
    label: 'Playwrite + Nunito',
    typography: {
      displayFont: '"Playwrite HU", cursive',
      bodyFont: '"Nunito", sans-serif',
    },
  },
  {
    label: 'Noto + Figtree',
    typography: {
      displayFont: '"Noto Serif JP", serif',
      bodyFont: '"Figtree", sans-serif',
    },
  },
];

export const FONT_PRESETS: Record<string, FontPreset[]> = {
  lochting: LOCHTING_FONT_PRESETS,
  'lochting-soft-premium': LOCHTING_FONT_PRESETS,
  'lochting-purple-forward': LOCHTING_FONT_PRESETS,
  'medipim-glass': [
    {
      label: 'Inter',
      typography: {
        displayFont: '"Inter", sans-serif',
        bodyFont: '"Inter", sans-serif',
        headingWeight: 700,
        strongWeight: 600,
      },
    },
    {
      label: 'Plus Jakarta Sans',
      typography: {
        displayFont: '"Plus Jakarta Sans", sans-serif',
        bodyFont: '"Plus Jakarta Sans", sans-serif',
        headingWeight: 700,
        strongWeight: 600,
      },
    },
  ],
  medipim: [
    {
      label: 'Azo Sans',
      typography: {
        displayFont: '"Azo Sans", sans-serif',
        bodyFont: '"Azo Sans", sans-serif',
        headingWeight: 500,
        strongWeight: 500,
      },
    },
    {
      label: 'IBM Plex',
      typography: {
        displayFont: '"IBM Plex Serif", serif',
        bodyFont: '"IBM Plex Sans", sans-serif',
        headingWeight: 500,
        strongWeight: 500,
      },
    },
  ],
};
