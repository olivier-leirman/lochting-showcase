import { useState } from 'react';
import { Box, Typography, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { CodeBlock } from '../blocks/CodeBlock';

/* ─── Color format conversion ─── */

type ColorFormat = 'hex' | 'rgb' | 'oklch' | 'hsl' | 'hsv' | 'hsb';

function parseHex(hex: string): { r: number; g: number; b: number; a: number } {
  const h = hex.replace('#', '');
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

  const { r, g, b, a } = parseHex(hex);
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
  const isTransparent = parseHex(value).a < 1;
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

export function ColorsPage() {
  const { brand } = useBrand();
  const c = brand.colors;
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
      ],
    },
    {
      title: 'Content',
      swatches: [
        { name: 'Primary', token: 'contentPrimary', value: c.contentPrimary },
        { name: 'Secondary', token: 'contentSecondary', value: c.contentSecondary },
        { name: 'Tertiary', token: 'contentTertiary', value: c.contentTertiary },
        { name: 'Spot', token: 'contentSpot', value: c.contentSpot },
        { name: 'Stay Light', token: 'contentStayLight', value: c.contentStayLight },
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
      title: 'Feedback',
      swatches: [
        { name: 'Error', token: 'error.bgDefault', value: c.error.bgDefault },
        { name: 'Error Content', token: 'error.contentStrong', value: c.error.contentStrong },
        { name: 'Error Bg', token: 'error.bgWeakest', value: c.error.bgWeakest },
        { name: 'Warning', token: 'warning.bgDefault', value: c.warning.bgDefault },
        { name: 'Warning Content', token: 'warning.contentStrong', value: c.warning.contentStrong },
        { name: 'Info', token: 'info.bgDefault', value: c.info.bgDefault },
        { name: 'Info Content', token: 'info.contentStrong', value: c.info.contentStrong },
        { name: 'Success', token: 'success.bgDefault', value: c.success.bgDefault },
        { name: 'Success Content', token: 'success.contentStrong', value: c.success.contentStrong },
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
