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
export const FONT_PRESETS: Record<string, FontPreset[]> = {
  lochting: [
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
    {
      label: 'Calibre',
      typography: {
        displayFont: '"Calibre", sans-serif',
        bodyFont: '"Calibre", sans-serif',
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
