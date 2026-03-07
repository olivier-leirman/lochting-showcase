import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';
import type { BrandTokens } from './types';
import type { Effects, ColorMode } from './tokens/effects';
import { LOCHTING } from './tokens/lochting';
import { MEDIPIM } from './tokens/medipim';
import { createBrandTheme } from './create-brand-theme';
import { deriveDarkColors } from './dark-colors';

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
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandId] = useState('lochting');
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const value = useMemo(() => {
    const sourceBrand = BRANDS[brandId] ?? LOCHTING;
    const { theme, effects } = createBrandTheme(sourceBrand, colorMode);

    // Expose brand tokens with mode-effective colors so components reading
    // brand.colors directly get the correct dark-adapted values.
    const effectiveColors = colorMode === 'dark'
      ? deriveDarkColors(sourceBrand)
      : sourceBrand.colors;
    const brand: BrandTokens = { ...sourceBrand, colors: effectiveColors };

    return {
      brand,
      sourceBrand,
      brandId,
      setBrand: setBrandId,
      colorMode,
      setColorMode,
      toggleColorMode: () => setColorMode(prev => prev === 'light' ? 'dark' : 'light'),
      theme,
      effects,
      availableBrands: Object.values(BRANDS).map(b => ({ id: b.id, name: b.name })),
    };
  }, [brandId, colorMode]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within BrandProvider');
  return ctx;
}
