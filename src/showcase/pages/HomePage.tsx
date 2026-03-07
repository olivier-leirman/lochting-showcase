import { Box, Typography, Button, Checkbox, Switch, Slider, Chip, Radio, RadioGroup, FormControlLabel, TextField, Badge, ToggleButton, ToggleButtonGroup, Avatar, IconButton } from '@mui/material';
import { Icon } from '../../components/Icon';
import { ToggleChip, ToggleChipGroup } from '../../components/ToggleChip';
import { useBrand } from '../../theme/brand-context';
import { useState } from 'react';
import type { BrandTokens, BrandScale } from '../../theme/types';

/** Resolve the strong font-weight for the current brand */
function sw(brand: BrandTokens) { return brand.typography.strongWeight ?? 600; }

/* ─── Color conversion helpers (for HSV display) ─── */

function parseHexSimple(hex: string) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbToHsv(r: number, g: number, b: number) {
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

/* ─── uicolors.app-style swatch strip (reusable) ─── */

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
          const hsv = rgbToHsv(r, g, b);
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
              <Typography sx={{ color: textColor, fontSize: '0.7rem', fontWeight: 600, lineHeight: 1 }}>
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
          Spot text · {c.contentInverseSpot}
        </Typography>
      </Box>
    </Box>
  );
}

/* ─── Section label ─── */

function SectionLabel({ children, brand }: { children: string; brand: BrandTokens }) {
  return (
    <Typography variant="caption" sx={{
      fontWeight: sw(brand), mb: 1, display: 'block', color: 'text.secondary',
      letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem',
    }}>
      {children}
    </Typography>
  );
}

/* ─── Component card wrapper ─── */

function ComponentCard({ children, brand }: { children: React.ReactNode; brand: BrandTokens }) {
  const c = brand.colors;
  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 2,
      p: 2.5,
      border: '1px solid',
      borderColor: c.borderDefault,
    }}>
      {children}
    </Box>
  );
}

/* ─── Mini card preview ─── */
function PreviewCard({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 3,
      p: 2.5,
      border: '1px solid',
      borderColor: c.borderDefault,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: c.brand400, width: 36, height: 36, fontSize: '0.85rem' }}>OL</Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary, lineHeight: 1.3 }}>
            Olivier Leirman
          </Typography>
          <Typography variant="caption" sx={{ color: c.contentSecondary, lineHeight: 1.3 }}>
            UX Designer
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: c.contentSecondary, fontSize: '0.8rem' }}>
        Building a design system with gradients and layered shadows for a premium feel.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip label="Design" size="small" color="primary" />
        <Chip label="MUI" size="small" />
      </Box>
    </Box>
  );
}

/* ─── Mini stat card ─── */
function StatCard({ icon, value, label, brand }: { icon: string; value: string; label: string; brand: BrandTokens }) {
  const c = brand.colors;
  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 2,
      p: 2,
      border: '1px solid',
      borderColor: c.borderDefault,
      flex: 1,
      minWidth: 120,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box sx={{
          width: 32, height: 32, borderRadius: 1.5,
          bgcolor: c.bgSubtle,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={18} color={c.brand400} />
        </Box>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: c.contentPrimary, fontFamily: 'inherit', lineHeight: 1.2 }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: c.contentTertiary }}>
        {label}
      </Typography>
    </Box>
  );
}

/* ─── Feedback banner previews ─── */
function FeedbackBanners({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const banners = [
    { key: 'error' as const, icon: 'error', text: 'Payment failed' },
    { key: 'warning' as const, icon: 'warning', text: 'Almost full' },
    { key: 'success' as const, icon: 'check_circle', text: 'Published' },
    { key: 'info' as const, icon: 'info', text: '3 updates' },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {banners.map(({ key, icon, text }) => (
        <Box key={key} sx={{
          display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75,
          bgcolor: c[key].bgWeakest,
          border: '1px solid',
          borderColor: c[key].borderWeak,
          borderRadius: 1.5,
        }}>
          <Icon name={icon} size={16} color={c[key].contentStrong} />
          <Typography variant="caption" sx={{ color: c[key].contentStrong, fontWeight: sw(brand) }}>
            {text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ─── Nav list preview ─── */
function NavPreview({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const items = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'inventory_2', label: 'Products', active: false },
    { icon: 'people', label: 'Customers', active: false },
    { icon: 'settings', label: 'Settings', active: false },
  ];
  return (
    <Box sx={{
      bgcolor: c.bgElevated, borderRadius: 2, p: 1,
      border: '1px solid', borderColor: c.borderDefault,
    }}>
      {items.map((item) => (
        <Box key={item.label} sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 1.5, py: 1, borderRadius: 1.5, cursor: 'default',
          bgcolor: item.active ? c.bgSubtle : 'transparent',
        }}>
          <Icon name={item.icon} size={18} color={item.active ? c.brand400 : c.contentSpot} />
          <Typography variant="body2" sx={{
            fontWeight: item.active ? sw(brand) : 400,
            color: item.active ? c.brand450 : c.contentSecondary,
            fontSize: '0.85rem',
          }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ─── Main Home Page ─── */
export function HomePage() {
  const { brand, sourceBrand } = useBrand();
  const c = brand.colors;
  const [toggleVal, setToggleVal] = useState('active');
  const [chipVal, setChipVal] = useState<string | string[]>('all');
  const strongWeight = sw(brand);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>
        Design System
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: 600 }}>
        A modern component library built on MUI with gradients, layered shadows, and a premium tactile feel. Import the theme and use standard MUI components.
      </Typography>

      {/* ─── Brand Scale (uicolors.app style) ─── */}
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'inherit' }}>Color Palette</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
        <BrandScaleSwatch scale={sourceBrand.brandScale} brandName={`${brand.name} · Primary`} brand={brand} />

        {/* System colors */}
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

        {/* Neutral backgrounds */}
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

      {/* ─── Dark Mode Preview ─── */}
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'inherit' }}>Dark Mode</Typography>
      <Box sx={{ mb: 6 }}>
        <DarkModePreview brand={brand} />
      </Box>

      {/* ─── Colors in Action ─── */}
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'inherit' }}>Colors in Action</Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3,
        mb: 6,
      }}>
        {/* Card Preview */}
        <Box>
          <SectionLabel brand={brand}>Card Component</SectionLabel>
          <PreviewCard brand={brand} />
        </Box>

        {/* Nav Preview */}
        <Box>
          <SectionLabel brand={brand}>Navigation</SectionLabel>
          <NavPreview brand={brand} />
        </Box>

        {/* Stats */}
        <Box>
          <SectionLabel brand={brand}>Stat Cards</SectionLabel>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StatCard icon="trending_up" value="2,847" label="Active users" brand={brand} />
            <StatCard icon="inventory_2" value="14.2k" label="Products" brand={brand} />
          </Box>
        </Box>

        {/* Feedback Banners */}
        <Box>
          <SectionLabel brand={brand}>System Feedback</SectionLabel>
          <FeedbackBanners brand={brand} />
        </Box>
      </Box>

      {/* ─── Component Overview ─── */}
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'inherit' }}>
        Component Overview
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Buttons */}
        <ComponentCard brand={brand}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Buttons</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="contained" color="primary" startIcon={<Icon name="add" size={20} />}>Create</Button>
            <Button variant="outlined">Secondary</Button>
            <Button variant="outlined" startIcon={<Icon name="edit" size={20} />}>Edit</Button>
            <Button variant="text">Tertiary</Button>
            <IconButton color="primary"><Icon name="add" /></IconButton>
            <IconButton color="secondary"><Icon name="edit" /></IconButton>
            <IconButton><Icon name="more_vert" /></IconButton>
          </Box>
        </ComponentCard>

        {/* Form Controls */}
        <ComponentCard brand={brand}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Form Controls</Typography>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox defaultChecked />
              <Checkbox />
            </Box>
            <RadioGroup row defaultValue="a">
              <FormControlLabel value="a" control={<Radio />} label="" />
              <FormControlLabel value="b" control={<Radio />} label="" />
            </RadioGroup>
            <Switch defaultChecked />
            <Switch />
            <Box sx={{ width: 180 }}>
              <Slider defaultValue={40} />
            </Box>
          </Box>
        </ComponentCard>

        {/* Text Fields */}
        <ComponentCard brand={brand}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Text Fields</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField placeholder="Label" size="small" sx={{ width: 200 }} />
            <TextField label="Label" defaultValue="Value" size="small" sx={{ width: 200 }} />
          </Box>
        </ComponentCard>

        {/* Chips & Badges */}
        <ComponentCard brand={brand}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Chips & Badges</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label="Primary" color="primary" size="small" />
            <Chip label="Secondary" color="secondary" size="small" />
            <Chip label="Error" color="error" size="small" />
            <Chip label="Warning" color="warning" size="small" />
            <Chip label="Success" color="success" size="small" />
            <Chip label="Info" color="info" size="small" />
            <Badge badgeContent={4} color="primary">
              <Icon name="notifications" color="action" />
            </Badge>
            <Badge badgeContent={2} color="error">
              <Icon name="mail" color="action" />
            </Badge>
          </Box>
        </ComponentCard>

        {/* Toggle Buttons & Toggle Chips */}
        <ComponentCard brand={brand}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Toggle Controls</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ToggleButtonGroup value={toggleVal} exclusive onChange={(_, v) => v && setToggleVal(v)}>
              <ToggleButton value="active">Active</ToggleButton>
              <ToggleButton value="inactive1">Inactive</ToggleButton>
              <ToggleButton value="inactive2">Inactive</ToggleButton>
            </ToggleButtonGroup>
            <ToggleChipGroup value={chipVal} exclusive onChange={setChipVal}>
              <ToggleChip value="all" label="All" count={9} />
              <ToggleChip value="webshop" label="Webshop" icon="shopping_cart" count={4} />
              <ToggleChip value="rx" label="Prescriptions" icon="prescriptions" count={1} />
            </ToggleChipGroup>
          </Box>
        </ComponentCard>
      </Box>
    </Box>
  );
}
