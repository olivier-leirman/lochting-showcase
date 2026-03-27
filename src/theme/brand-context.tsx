import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react';
import type { Theme } from '@mui/material/styles';
import type { BrandTokens, StyleProfile } from './types';
import type { Effects, ColorMode } from './tokens/effects';
import { LOCHTING } from './tokens/lochting';
import { LOCHTING_SOFT_PREMIUM } from './tokens/lochting-soft-premium';
import { LOCHTING_PURPLE_FORWARD } from './tokens/lochting-purple-forward';
import { MEDIPIM } from './tokens/medipim';
import { MEDIPIM_GLASS } from './tokens/medipim-glass';
import { createBrandTheme } from './create-brand-theme';
import { deriveDarkColors } from './dark-colors';
import { FONT_PRESETS, type FontPreset } from './tokens/font-presets';
import { ALL_STYLES, type StyleDefinition } from '../styles';
import { getAllStyles, getAllStylesById } from '../styles/custom-styles';

/* ── Platform → Style hierarchy ── */

export interface StyleVariant {
  id: string;
  label: string;
  tokens: BrandTokens;
}

export interface Platform {
  id: string;
  name: string;
  styles: StyleVariant[];
}

const PLATFORMS: Platform[] = [
  {
    id: 'lochting',
    name: 'Lochting',
    styles: [
      { id: 'lochting', label: 'Original', tokens: LOCHTING },
      { id: 'lochting-soft-premium', label: 'Soft Premium', tokens: LOCHTING_SOFT_PREMIUM },
      { id: 'lochting-purple-forward', label: 'Purple Forward', tokens: LOCHTING_PURPLE_FORWARD },
    ],
  },
  {
    id: 'medipim',
    name: 'Medipim',
    styles: [
      { id: 'medipim-glass', label: 'Glass AI', tokens: MEDIPIM_GLASS },
      { id: 'medipim', label: 'Original', tokens: MEDIPIM },
    ],
  },
];

/** Flat lookup for backwards compatibility */
const ALL_TOKENS: Record<string, BrandTokens> = {};
for (const p of PLATFORMS) {
  for (const s of p.styles) {
    ALL_TOKENS[s.id] = s.tokens;
  }
}

interface BrandContextValue {
  /** Brand tokens with mode-effective colors (dark-adapted when in dark mode) */
  brand: BrandTokens;
  /** Original (light-mode) brand tokens — use for brandScale, typography, name, etc. */
  sourceBrand: BrandTokens;
  /** Current flat brand id (e.g. 'lochting-soft-premium') */
  brandId: string;
  setBrand: (id: string) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  theme: Theme;
  effects: Effects;
  /** @deprecated — use platforms + currentPlatform instead */
  availableBrands: { id: string; name: string }[];

  /* ── Platform / Style hierarchy ── */
  platforms: Platform[];
  currentPlatform: Platform;
  platformId: string;
  setPlatform: (platformId: string) => void;
  currentStyle: StyleVariant;
  styleId: string;
  setStyle: (styleId: string) => void;

  /** Font preset switching */
  fontPresetIndex: number;
  setFontPreset: (index: number) => void;
  fontPresets: FontPreset[];

  /** Resolved style profile (shape, surface, shadow character) */
  styleProfile: StyleProfile;

  /* ── Global Style Definition (independent axis) ── */
  /** All available standalone style definitions */
  availableStyleDefinitions: StyleDefinition[];
  /** Currently active style definition (null = use brand's built-in profile) */
  activeStyleDefinition: StyleDefinition | null;
  /** ID of active style definition (null = brand default) */
  activeStyleDefinitionId: string | null;
  /** Set the global style override (null to revert to brand default) */
  setStyleDefinition: (styleId: string | null) => void;
  /** Re-read custom styles from localStorage (call after saving a new custom style) */
  refreshStyles?: () => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [platformId, setPlatformIdRaw] = useState('lochting');
  const [styleId, setStyleIdRaw] = useState('lochting');
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    try {
      const stored = localStorage.getItem('bw-color-mode');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch { /* SSR / privacy mode */ }
    // Respect OS preference as default
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });
  const [fontPresetIndex, setFontPresetIndex] = useState(0);
  const [styleDefinitionId, setStyleDefinitionId] = useState<string | null>(null);
  const [customStylesVersion, setCustomStylesVersion] = useState(0);
  const refreshStyles = useCallback(() => setCustomStylesVersion((v) => v + 1), []);

  // Persist color mode to localStorage
  const setColorModeAndPersist = useCallback((mode: ColorMode | ((prev: ColorMode) => ColorMode)) => {
    setColorMode(prev => {
      const next = typeof mode === 'function' ? mode(prev) : mode;
      try { localStorage.setItem('bw-color-mode', next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setPlatform = useCallback((newPlatformId: string) => {
    const platform = PLATFORMS.find(p => p.id === newPlatformId);
    if (!platform) return;
    setPlatformIdRaw(newPlatformId);
    // Reset to first style of this platform
    setStyleIdRaw(platform.styles[0].id);
    setFontPresetIndex(0);
  }, []);

  const setStyle = useCallback((newStyleId: string) => {
    setStyleIdRaw(newStyleId);
    setFontPresetIndex(0);
  }, []);

  /** Legacy setBrand — maps flat id to platform + style */
  const setBrand = useCallback((id: string) => {
    for (const p of PLATFORMS) {
      const style = p.styles.find(s => s.id === id);
      if (style) {
        setPlatformIdRaw(p.id);
        setStyleIdRaw(style.id);
        setFontPresetIndex(0);
        return;
      }
    }
  }, []);

  const setStyleDefinition = useCallback((id: string | null) => {
    setStyleDefinitionId(id);
  }, []);

  const value = useMemo(() => {
    const currentPlatform = PLATFORMS.find(p => p.id === platformId) ?? PLATFORMS[0];
    const currentStyle = currentPlatform.styles.find(s => s.id === styleId) ?? currentPlatform.styles[0];
    const sourceBrand = currentStyle.tokens;
    const presets = FONT_PRESETS[styleId] ?? FONT_PRESETS[platformId] ?? [];
    const fontPreset = presets[fontPresetIndex] ?? presets[0];

    const brandWithFonts: BrandTokens = fontPreset
      ? { ...sourceBrand, typography: { ...sourceBrand.typography, ...fontPreset.typography } }
      : sourceBrand;

    // Resolve global style definition override (includes custom styles from localStorage)
    const allStylesById = getAllStylesById();
    const activeStyleDef = styleDefinitionId ? allStylesById[styleDefinitionId] ?? null : null;

    const { theme, effects, profile } = createBrandTheme(brandWithFonts, colorMode, activeStyleDef ?? undefined);

    const effectiveColors = colorMode === 'dark'
      ? deriveDarkColors(sourceBrand)
      : sourceBrand.colors;
    const brand: BrandTokens = { ...brandWithFonts, colors: effectiveColors };

    return {
      brand,
      sourceBrand,
      brandId: styleId,
      setBrand,
      colorMode,
      setColorMode: setColorModeAndPersist,
      toggleColorMode: () => setColorModeAndPersist(prev => prev === 'light' ? 'dark' : 'light'),
      theme,
      effects,
      availableBrands: Object.values(ALL_TOKENS).map(b => ({ id: b.id, name: b.name })),
      platforms: PLATFORMS,
      currentPlatform,
      platformId,
      setPlatform,
      currentStyle,
      styleId,
      setStyle,
      fontPresetIndex,
      setFontPreset: setFontPresetIndex,
      fontPresets: presets,
      styleProfile: profile,
      availableStyleDefinitions: getAllStyles(),
      activeStyleDefinition: activeStyleDef,
      activeStyleDefinitionId: styleDefinitionId,
      setStyleDefinition,
      refreshStyles,
    };
  }, [platformId, styleId, colorMode, fontPresetIndex, styleDefinitionId, customStylesVersion, setBrand, setPlatform, setStyle, setStyleDefinition, setColorModeAndPersist, refreshStyles]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error('useBrand must be used within BrandProvider');
  return ctx;
}
