import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';
import type { BrandTokens } from './types';
import type { Effects } from './tokens/effects';
import { LOCHTING } from './tokens/lochting';
import { MEDIPIM } from './tokens/medipim';
import { createBrandTheme } from './create-brand-theme';

const BRANDS: Record<string, BrandTokens> = {
  lochting: LOCHTING,
  medipim: MEDIPIM,
};

interface BrandContextValue {
  brand: BrandTokens;
  brandId: string;
  setBrand: (id: string) => void;
  theme: Theme;
  effects: Effects;
  availableBrands: { id: string; name: string }[];
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brandId, setBrandId] = useState('lochting');

  const value = useMemo(() => {
    const brand = BRANDS[brandId] ?? LOCHTING;
    const { theme, effects } = createBrandTheme(brand);
    return {
      brand,
      brandId,
      setBrand: setBrandId,
      theme,
      effects,
      availableBrands: Object.values(BRANDS).map(b => ({ id: b.id, name: b.name })),
    };
  }, [brandId]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within BrandProvider');
  return ctx;
}
