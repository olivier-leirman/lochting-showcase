import { useState } from 'react';
import { Box, Typography, Divider, ToggleButton, ToggleButtonGroup, Chip, Button, alpha } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { CodeBlock } from '../../showcase/blocks/CodeBlock';
import type { BrandTokens, BrandScale } from '../../theme/types';
import { generateHarmony, HARMONY_TYPES, HARMONY_LABELS, type HarmonyType, type AccentPalette } from '../../theme/color-harmony';

/* ─── Color format conversion ─── */

type ColorFormat = 'hex' | 'rgb' | 'oklch' | 'hsl' | 'hsv' | 'hsb';

function parseColor(value: string): { r: number; g: number; b: number; a: number } {
  // Handle rgba(...) format
  const rgbaMatch = value.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    };
  }
  // Handle hex format
  const h = value.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function rgbToHsl(r: number, g: number, b: number) {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;
  return { h: h * 360, s, l };
}

function rgbToHsv(r: number, g: number, b: number) {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const v = max;
  if (max === 0) return { h: 0, s: 0, v: 0 };
  const d = max - min;
  const s = d / max;
  if (max === min) return { h: 0, s: 0, v };
  let h = 0;
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;
  return { h: h * 360, s, v };
}

function rgbToOklch(r: number, g: number, b: number) {
  // sRGB → linear sRGB
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const lr = toLinear(r), lg = toLinear(g), lb = toLinear(b);

  // linear sRGB → LMS (via OKLab matrix)
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // cube root
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);

  // LMS → OKLab
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // OKLab → OKLCH
  const C = Math.sqrt(a * a + b2 * b2);
  let H = Math.atan2(b2, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return { L, C, H };
}

function formatColor(hex: string, format: ColorFormat): string {
  if (format === 'hex') return hex;

  const { r, g, b, a } = parseColor(hex);
  const alpha = a < 1 ? `, ${Math.round(a * 100) / 100}` : '';

  switch (format) {
    case 'rgb':
      return a < 1 ? `rgba(${r}, ${g}, ${b}${alpha})` : `rgb(${r}, ${g}, ${b})`;
    case 'hsl': {
      const { h, s, l } = rgbToHsl(r, g, b);
      return a < 1
        ? `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%${alpha})`
        : `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }
    case 'hsv':
    case 'hsb': {
      const { h, s, v } = rgbToHsv(r, g, b);
      const label = format;
      return a < 1
        ? `${label}a(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%${alpha})`
        : `${label}(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(v * 100)}%)`;
    }
    case 'oklch': {
      const { L, C, H } = rgbToOklch(r, g, b);
      const lStr = (Math.round(L * 1000) / 1000).toFixed(3);
      const cStr = (Math.round(C * 1000) / 1000).toFixed(3);
      const hStr = Math.round(H * 10) / 10;
      return a < 1
        ? `oklch(${lStr} ${cStr} ${hStr} / ${Math.round(a * 100) / 100})`
        : `oklch(${lStr} ${cStr} ${hStr})`;
    }
  }
}

/* ─── Swatch ─── */

interface SwatchProps {
  name: string;
  token: string;
  value: string;
  format: ColorFormat;
}

function Swatch({ name, token, value, format }: SwatchProps) {
  const { brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;
  const isTransparent = parseColor(value).a < 1;
  const display = formatColor(value, format);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          bgcolor: value,
          border: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
          ...(isTransparent && {
            backgroundImage: `linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)`,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              bgcolor: value,
            },
          }),
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: sw }}>{name}</Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          {token}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', flexShrink: 0 }}>
        {display}
      </Typography>
    </Box>
  );
}

/** Helper to convert hex to an rgba string with a specific alpha */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ─── uicolors.app-style swatch strip (moved from HomePage) ─── */

/** Resolve the strong font-weight for the current brand */
function sw(brand: BrandTokens) { return brand.typography.strongWeight ?? 600; }

function parseHexSimple(hex: string) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function swatchRgbToHsv(r: number, g: number, b: number) {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
  const v = max, d = max - min;
  const s = max === 0 ? 0 : d / max;
  if (max === min) return { h: 0, s: 0, v };
  let h = 0;
  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

interface SwatchItem { name: string; hex: string }

function swatchTextColor(hex: string): string {
  const { r, g, b } = parseHexSimple(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#200845' : '#ffffff';
}

function SwatchStrip({ items, label, brand }: { items: SwatchItem[]; label: string; brand: BrandTokens }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ fontWeight: sw(brand), mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden' }}>
        {items.map((item) => {
          const textColor = swatchTextColor(item.hex);
          const { r, g, b } = parseHexSimple(item.hex);
          const hsv = swatchRgbToHsv(r, g, b);
          return (
            <Box
              key={item.name}
              sx={{
                flex: 1,
                bgcolor: item.hex,
                py: 1.5,
                px: 0.75,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 80,
                cursor: 'default',
                transition: 'flex 0.2s',
                '&:hover': { flex: 1.6 },
              }}
            >
              <Typography sx={{ color: textColor, fontSize: '0.7rem', fontWeight: 500, lineHeight: 1 }}>
                {item.name}
              </Typography>
              <Box>
                <Typography sx={{ color: textColor, fontFamily: 'monospace', fontSize: '0.55rem', lineHeight: 1.5, opacity: 0.85 }}>
                  {item.hex.toUpperCase().replace('#', '')}
                </Typography>
                <Typography sx={{ color: textColor, fontFamily: 'monospace', fontSize: '0.55rem', lineHeight: 1.5, opacity: 0.65 }}>
                  {hsv.h} {hsv.s} {hsv.v}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const SCALE_KEYS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

function BrandScaleSwatch({ scale, brandName, brand }: { scale: BrandScale; brandName: string; brand: BrandTokens }) {
  const items: SwatchItem[] = SCALE_KEYS.map(key => ({ name: key, hex: scale[key] }));
  return <SwatchStrip items={items} label={brandName} brand={brand} />;
}

/* ─── Dark Mode Preview ─── */

/* ─── Accent Colors & Harmony Section ─── */

function AccentSection({ brand }: { brand: BrandTokens }) {
  const [activeHarmony, setActiveHarmony] = useState<HarmonyType>('complementary');
  const primary = brand.colors.brand400;
  const harmony = generateHarmony(primary, activeHarmony);
  const hasCurated = !!brand.accents;

  return (
    <Box sx={{ mb: 4 }}>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" sx={{ mb: 0.5, fontFamily: 'inherit' }}>
        Accent Colors
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Supplementary colors that complement the brand primary. Switch between curated accents and generated harmonies.
      </Typography>

      {/* ── Curated accents (if defined) ── */}
      {hasCurated && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ display: 'block', mb: 1.5, letterSpacing: 1.2, color: 'text.secondary', fontSize: '0.65rem' }}>
            Curated — {brand.accents!.label}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {Object.entries(brand.accents!.colors).map(([key, accent]) => (
              <AccentCard key={key} name={key} light={accent.light} defaultColor={accent.default} dark={accent.dark} />
            ))}
          </Box>

          {/* Usage example strip */}
          <Box sx={{ mt: 2.5, display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
            {Object.entries(brand.accents!.colors).map(([key, accent]) => (
              <Chip
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                size="small"
                sx={{
                  bgcolor: accent.light,
                  color: accent.dark,
                  fontWeight: 500,
                  border: '1px solid',
                  borderColor: alpha(accent.default, 0.2),
                }}
              />
            ))}
            <Typography variant="caption" sx={{ color: 'text.disabled', ml: 1 }}>
              ← Example chip usage
            </Typography>
          </Box>
        </Box>
      )}

      {/* ── Generated harmonies ── */}
      <Box>
        <Typography variant="overline" sx={{ display: 'block', mb: 1.5, letterSpacing: 1.2, color: 'text.secondary', fontSize: '0.65rem' }}>
          Generated Harmonies
        </Typography>

        <ToggleButtonGroup
          value={activeHarmony}
          exclusive
          onChange={(_, v) => v && setActiveHarmony(v)}
          size="small"
          sx={{ mb: 2.5 }}
        >
          {HARMONY_TYPES.map(h => (
            <ToggleButton key={h} value={h} sx={{ px: 2, py: 0.5, fontSize: '0.8rem' }}>
              {HARMONY_LABELS[h]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* Harmony wheel visualization */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Color wheel mini-viz */}
          <HarmonyWheel palette={harmony} />

          {/* Accent cards */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flex: 1 }}>
            {harmony.accents.map((accent) => (
              <AccentCard
                key={accent.label}
                name={accent.label}
                light={accent.light}
                defaultColor={accent.default}
                dark={accent.dark}
              />
            ))}
          </Box>
        </Box>

        {/* Combined preview strip */}
        <Box sx={{ mt: 2.5 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary', fontWeight: sw(brand) }}>
            Combined palette preview
          </Typography>
          <Box sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden', height: 48 }}>
            {harmony.accents.map((accent) => (
              <Box
                key={accent.label}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flex: 1, bgcolor: accent.light }} />
                <Box sx={{ flex: 2, bgcolor: accent.default }} />
                <Box sx={{ flex: 1, bgcolor: accent.dark }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/** Single accent color card with 3 shades */
function AccentCard({ name, light, defaultColor, dark }: {
  name: string;
  light: string;
  defaultColor: string;
  dark: string;
}) {
  return (
    <Box sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      overflow: 'hidden',
      minWidth: 140,
      flex: '1 1 140px',
      maxWidth: 200,
    }}>
      {/* Main swatch */}
      <Box sx={{ bgcolor: defaultColor, height: 56, position: 'relative' }}>
        <Typography sx={{
          position: 'absolute',
          bottom: 6,
          left: 8,
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 500,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </Box>
      {/* Shade rows */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {[
          { label: 'Light', hex: light },
          { label: 'Default', hex: defaultColor },
          { label: 'Dark', hex: dark },
        ].map(shade => (
          <Box
            key={shade.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 0.5,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: shade.hex, border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', flex: 1 }}>{shade.label}</Typography>
            <Typography sx={{ fontSize: '0.6rem', fontFamily: 'monospace', color: 'text.disabled' }}>{shade.hex}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** Mini color wheel showing harmony angles */
function HarmonyWheel({ palette }: { palette: AccentPalette }) {
  const size = 120;
  const center = size / 2;
  const radius = 44;
  const dotRadius = 8;

  return (
    <Box sx={{
      width: size,
      height: size,
      flexShrink: 0,
      position: 'relative',
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Hue ring */}
        <defs>
          <linearGradient id="hue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="17%" stopColor="#ffff00" />
            <stop offset="33%" stopColor="#00ff00" />
            <stop offset="50%" stopColor="#00ffff" />
            <stop offset="67%" stopColor="#0000ff" />
            <stop offset="83%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#ff0000" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius + 6}
          fill="none"
          stroke="url(#hue-grad)"
          strokeWidth={10}
          opacity={0.15}
        />

        {/* Connection lines */}
        {palette.accents.length > 1 && palette.accents.map((accent, i) => {
          if (i === 0) return null;
          const source = palette.accents[0];
          const angle1 = (source.hue - 90) * Math.PI / 180;
          const angle2 = (accent.hue - 90) * Math.PI / 180;
          return (
            <line
              key={i}
              x1={center + radius * Math.cos(angle1)}
              y1={center + radius * Math.sin(angle1)}
              x2={center + radius * Math.cos(angle2)}
              y2={center + radius * Math.sin(angle2)}
              stroke="#ccc"
              strokeWidth={1.5}
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Dots */}
        {palette.accents.map((accent, i) => {
          const angle = (accent.hue - 90) * Math.PI / 180;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={dotRadius + 1} fill="#fff" />
              <circle cx={x} cy={y} r={dotRadius} fill={accent.default} stroke="#fff" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
    </Box>
  );
}

function DarkModePreview({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  return (
    <Box sx={{
      bgcolor: c.bgBaseInverse,
      borderRadius: 3,
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <Typography sx={{ color: c.contentInversePrimary, fontWeight: sw(brand), fontSize: '1.1rem' }}>
        Dark Mode Preview
      </Typography>
      <Typography sx={{ color: c.contentInverseSecondary, fontSize: '0.85rem' }}>
        Inverse tokens provide light-on-dark text colors for overlays and dark backgrounds.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
        <Chip label="Primary" size="small" sx={{ bgcolor: c.brand400, color: c.contentStayLight }} />
        <Chip label="Brand 100" size="small" sx={{ bgcolor: c.brand100, color: c.brand450 }} />
        <Chip label="Error" size="small" sx={{ bgcolor: c.error.bgDefault, color: '#fff' }} />
        <Chip label="Success" size="small" sx={{ bgcolor: c.success.bgDefault, color: '#fff' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" color="primary" size="small">Action</Button>
        <Typography sx={{ color: c.contentInverseSpot, fontSize: '0.75rem' }}>
          Spot text
        </Typography>
      </Box>
    </Box>
  );
}

export function ColorsPage() {
  const { brand, sourceBrand, colorMode } = useBrand();
  const c = brand.colors;
  const isDark = colorMode === 'dark';
  const [format, setFormat] = useState<ColorFormat>('hex');

  const sections = [
    {
      title: 'Brand',
      swatches: [
        { name: 'Brand 100', token: 'brand100', value: c.brand100 },
        { name: 'Brand 200', token: 'brand200', value: c.brand200 },
        { name: 'Brand 300', token: 'brand300', value: c.brand300 },
        { name: 'Brand 400 (Primary)', token: 'brand400', value: c.brand400 },
        { name: 'Brand 450', token: 'brand450', value: c.brand450 },
        { name: 'Brand 500', token: 'brand500', value: c.brand500 },
      ],
    },
    {
      title: 'Backgrounds',
      swatches: [
        { name: 'Base', token: 'bgBase', value: c.bgBase },
        { name: 'Elevated', token: 'bgElevated', value: c.bgElevated },
        { name: 'Sunken', token: 'bgSunken', value: c.bgSunken },
        { name: 'Sunken Deep', token: 'bgSunkenDeep', value: c.bgSunkenDeep },
        { name: 'Sunken Deeper', token: 'bgSunkenDeeper', value: c.bgSunkenDeeper },
        { name: 'Surface', token: 'bgSurface', value: c.bgSurface },
        { name: 'Surface Secondary', token: 'bgSurfaceSecondary', value: c.bgSurfaceSecondary },
        { name: 'Subtle', token: 'bgSubtle', value: c.bgSubtle },
        { name: 'Base Inverse', token: 'bgBaseInverse', value: c.bgBaseInverse },
        { name: 'Inverse Secondary', token: 'bgInverseSecondary', value: c.bgInverseSecondary },
        { name: 'Overlay', token: 'bgOverlay', value: c.bgOverlay },
      ],
    },
    {
      title: 'Content',
      swatches: [
        { name: 'Primary', token: 'contentPrimary', value: c.contentPrimary },
        { name: 'Secondary', token: 'contentSecondary', value: c.contentSecondary },
        { name: 'Tertiary', token: 'contentTertiary', value: c.contentTertiary },
        { name: 'Spot', token: 'contentSpot', value: c.contentSpot },
        { name: 'Spot Weak', token: 'contentSpotWeak', value: c.contentSpotWeak },
        { name: 'Stay Light', token: 'contentStayLight', value: c.contentStayLight },
        { name: 'Stay Dark', token: 'contentStayDark', value: c.contentStayDark },
        { name: 'Inverse Primary', token: 'contentInversePrimary', value: c.contentInversePrimary },
        { name: 'Inverse Secondary', token: 'contentInverseSecondary', value: c.contentInverseSecondary },
        { name: 'Inverse Spot', token: 'contentInverseSpot', value: c.contentInverseSpot },
      ],
    },
    {
      title: 'Borders',
      swatches: [
        { name: 'Default', token: 'borderDefault', value: c.borderDefault },
        { name: 'Weak', token: 'borderWeak', value: c.borderWeak },
        { name: 'Strong', token: 'borderStrong', value: c.borderStrong },
        { name: 'Strongest', token: 'borderStrongest', value: c.borderStrongest },
      ],
    },
    {
      title: 'Feedback — Error',
      swatches: [
        { name: 'Error Default', token: 'error.bgDefault', value: c.error.bgDefault },
        { name: 'Error Content', token: 'error.contentStrong', value: c.error.contentStrong },
        { name: 'Error Bg Weakest', token: 'error.bgWeakest', value: c.error.bgWeakest },
        { name: 'Error Border', token: 'error.borderWeak', value: c.error.borderWeak },
      ],
    },
    {
      title: 'Feedback — Warning',
      swatches: [
        { name: 'Warning Default', token: 'warning.bgDefault', value: c.warning.bgDefault },
        { name: 'Warning Content', token: 'warning.contentStrong', value: c.warning.contentStrong },
        { name: 'Warning Bg Weakest', token: 'warning.bgWeakest', value: c.warning.bgWeakest },
        { name: 'Warning Border', token: 'warning.borderWeak', value: c.warning.borderWeak },
      ],
    },
    {
      title: 'Feedback — Info',
      swatches: [
        { name: 'Info Default', token: 'info.bgDefault', value: c.info.bgDefault },
        { name: 'Info Content', token: 'info.contentStrong', value: c.info.contentStrong },
        { name: 'Info Bg Weakest', token: 'info.bgWeakest', value: c.info.bgWeakest },
        { name: 'Info Border', token: 'info.borderWeak', value: c.info.borderWeak },
      ],
    },
    {
      title: 'Feedback — Success',
      swatches: [
        { name: 'Success Default', token: 'success.bgDefault', value: c.success.bgDefault },
        { name: 'Success Content', token: 'success.contentStrong', value: c.success.contentStrong },
        { name: 'Success Bg Weakest', token: 'success.bgWeakest', value: c.success.bgWeakest },
        { name: 'Success Border', token: 'success.borderWeak', value: c.success.borderWeak },
      ],
    },
    {
      title: 'Effect Ingredients — Shadows',
      swatches: [
        { name: 'Drop Primary', token: 'effect/dropPrimary', value: isDark ? '#00000040' : hexToRgba(c.contentPrimary, 0.08) },
        { name: 'Drop Primary Hover', token: 'effect/dropPrimaryHover', value: isDark ? '#00000066' : hexToRgba(c.contentPrimary, 0.16) },
        { name: 'Inner Light', token: 'effect/innerLight', value: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(252, 252, 255, 0.12)' },
        { name: 'Inner Dark', token: 'effect/innerDark', value: isDark ? 'rgba(0, 0, 0, 0.20)' : hexToRgba(c.bgBaseInverse, 0.08) },
        { name: 'Chip Brand Inner', token: 'effect/chipInner', value: isDark ? hexToRgba(c.brand200, 0.10) : hexToRgba(c.brand200, 0.22) },
        { name: 'Chip Brand Inner Deep', token: 'effect/chipInner2', value: isDark ? hexToRgba(c.brand200, 0.14) : hexToRgba(c.brand200, 0.32) },
        { name: 'Inner Element Drop', token: 'effect/innerElDrop', value: isDark ? 'rgba(0, 0, 0, 0.25)' : hexToRgba(c.bgBaseInverse, 0.08) },
        { name: 'Inner Element Inset', token: 'effect/innerElInset', value: isDark ? 'rgba(0, 0, 0, 0.20)' : hexToRgba(c.bgBaseInverse, 0.14) },
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>Colors</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        Color tokens for the <strong>{brand.name}</strong> brand. Switch brands in the sidebar to see different palettes.
      </Typography>
      <CodeBlock
        code={`import { useBrand } from './theme/brand-context';\nconst { brand } = useBrand();\n// brand.colors.brand400 → "${c.brand400}"`}
        language="tsx"
      />

      {/* ─── Brand Scale (uicolors.app style) — moved from HomePage ─── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4, mb: 4 }}>
        <BrandScaleSwatch scale={sourceBrand.brandScale} brandName={`${brand.name} · Primary`} brand={brand} />

        <SwatchStrip
          label="System"
          brand={brand}
          items={[
            { name: 'Error', hex: c.error.bgDefault },
            { name: 'Warning', hex: c.warning.bgDefault },
            { name: 'Success', hex: c.success.bgDefault },
            { name: 'Info', hex: c.info.bgDefault },
          ]}
        />

        <SwatchStrip
          label="Neutral Backgrounds"
          brand={brand}
          items={[
            { name: 'Elevated', hex: c.bgElevated },
            { name: 'Base', hex: c.bgBase },
            { name: 'Sunken', hex: c.bgSunken },
            { name: 'Deep', hex: c.bgSunkenDeep },
            { name: 'Deeper', hex: c.bgSunkenDeeper },
          ]}
        />
      </Box>

      {/* ─── Accent Colors & Harmony Explorer ─── */}
      <AccentSection brand={brand} />

      {/* ─── Dark Mode Preview — moved from HomePage ─── */}
      <Box sx={{ mb: 4 }}>
        <DarkModePreview brand={brand} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ my: 3 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
          Color format
        </Typography>
        <ToggleButtonGroup
          value={format}
          exclusive
          onChange={(_, v) => v && setFormat(v)}
          size="small"
        >
          <ToggleButton value="hex">HEX</ToggleButton>
          <ToggleButton value="rgb">RGB</ToggleButton>
          <ToggleButton value="hsl">HSL</ToggleButton>
          <ToggleButton value="hsv">HSV</ToggleButton>
          <ToggleButton value="hsb">HSB</ToggleButton>
          <ToggleButton value="oklch">OKLCH</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Divider sx={{ my: 3 }} />

      {sections.map((section, i) => (
        <Box key={section.title} sx={{ mb: i < sections.length - 1 ? 4 : 0 }}>
          <Typography variant="h5" sx={{ mb: 1, fontFamily: 'inherit' }}>{section.title}</Typography>
          {section.swatches.map(s => (
            <Swatch key={s.token} name={s.name} token={`colors.${s.token}`} value={s.value} format={format} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
