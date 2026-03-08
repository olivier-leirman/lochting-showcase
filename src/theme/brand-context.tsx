import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';
import type { BrandTokens } from './types';
import type { Effects, ColorMode } from './tokens/effects';
import { LOCHTING } from './tokens/lochting';
import { MEDIPIM } from './tokens/medipim';
import { createBrandTheme } from './create-brand-theme';
import { deriveDarkColors } from './dark-colors';
import { FONT_PRESETS, type FontPreset } from './tokens/font-presets';

const BRANDS: Record<string, BrandTokens> = {
  lochting: LOCHTING,
  medipim: MEDIPIM,
};

interface BrandContextValue {
  /** Brand tokens with mode-effective colors (dark-adapted when in dark mode) */
  brand: BrandTokens;
  /** Original (light-mode) brand tokens — use for brandScale, typography, name, etc. */
  sourceBrand: BrandTokens;
  brandId: string;
  setBrand: (id: string) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  theme: Theme;
  effects: Effects;
  availableBrands: { id: string; name: string }[];
  /** Font preset switching */
  fontPresetIndex: number;
  setFontPreset: (index: number) => void;
  fontPresets: FontPreset[];
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandId] = useState('lochting');
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [fontPresetIndex, setFontPresetIndex] = useState(0);

  // Reset font preset when brand changes
  const setBrand = (id: string) => {
    setBrandId(id);
    setFontPresetIndex(0);
  };

  const value = useMemo(() => {
    const sourceBrand = BRANDS[brandId] ?? LOCHTING;
    const presets = FONT_PRESETS[brandId] ?? [];
    const fontPreset = presets[fontPresetIndex] ?? presets[0];

    // Apply font preset overrides to the brand's typography
    const brandWithFonts: BrandTokens = fontPreset
      ? {
          ...sourceBrand,
          typography: {
            ...sourceBrand.typography,
            ...fontPreset.typography,
          },
        }
      : sourceBrand;

    const { theme, effects } = createBrandTheme(brandWithFonts, colorMode);

    // Expose brand tokens with mode-effective colors so components reading
    // brand.colors directly get the correct dark-adapted values.
    const effectiveColors = colorMode === 'dark'
      ? deriveDarkColors(sourceBrand)
      : sourceBrand.colors;
    const brand: BrandTokens = { ...brandWithFonts, colors: effectiveColors };

    return {
      brand,
      sourceBrand,
      brandId,
      setBrand,
      colorMode,
      setColorMode,
      toggleColorMode: () => setColorMode(prev => prev === 'light' ? 'dark' : 'light'),
      theme,
      effects,
      availableBrands: Object.values(BRANDS).map(b => ({ id: b.id, name: b.name })),
      fontPresetIndex,
      setFontPreset: setFontPresetIndex,
      fontPresets: presets,
    };
  }, [brandId, colorMode, fontPresetIndex]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within BrandProvider');
  return ctx;
}
