import { Box, Typography, Button, Checkbox, Switch, Slider, Chip, Radio, RadioGroup, FormControlLabel, TextField, Badge, ToggleButton, ToggleButtonGroup, Avatar } from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { useState } from 'react';
import type { BrandTokens } from '../../theme/types';

/** Resolve the strong font-weight for the current brand */
function sw(brand: BrandTokens) { return brand.typography.strongWeight ?? 600; }

/* ─── Small helper: color swatch strip ─── */
function ColorStrip({ colors, label, brand }: { colors: { hex: string; name: string }[]; label: string; brand: BrandTokens }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ fontWeight: sw(brand), mb: 0.5, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', borderRadius: 1.5, overflow: 'hidden', height: 40 }}>
        {colors.map((c) => (
          <Box
            key={c.name}
            title={`${c.name}: ${c.hex}`}
            sx={{
              flex: 1,
              bgcolor: c.hex,
              cursor: 'default',
              transition: 'flex 0.2s',
              '&:hover': { flex: 2 },
            }}
          />
        ))}
      </Box>
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

/* ─── Background layer preview ─── */
function BackgroundLayers({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const layers = [
    { name: 'Elevated', value: c.bgElevated },
    { name: 'Base', value: c.bgBase },
    { name: 'Sunken', value: c.bgSunken },
    { name: 'Sunken Deep', value: c.bgSunkenDeep },
    { name: 'Sunken Deeper', value: c.bgSunkenDeeper },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      {layers.map((l) => (
        <Box key={l.name} sx={{
          bgcolor: l.value, px: 2, py: 1.5, borderRadius: 1.5,
          border: '1px solid', borderColor: c.borderWeak,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Typography variant="caption" sx={{ fontWeight: sw(brand), color: c.contentPrimary }}>
            {l.name}
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: c.contentTertiary, fontSize: '0.7rem' }}>
            {l.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ─── Typography preview ─── */
function TypographyPreview({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography sx={{ fontFamily: brand.typography.displayFont, fontSize: '1.3rem', color: c.contentPrimary, lineHeight: 1.3 }}>
        Display Heading
      </Typography>
      <Typography sx={{ fontWeight: sw(brand), color: c.contentPrimary, fontSize: '0.95rem' }}>
        Body Strong Text
      </Typography>
      <Typography sx={{ color: c.contentSecondary, fontSize: '0.85rem' }}>
        Secondary body text for descriptions and supporting content.
      </Typography>
      <Typography sx={{ color: c.contentTertiary, fontSize: '0.75rem' }}>
        Tertiary caption — meta info, timestamps
      </Typography>
      <Typography sx={{ color: c.contentSpot, fontSize: '0.75rem' }}>
        Spot — placeholders, disabled
      </Typography>
    </Box>
  );
}

/* ─── Main Home Page ─── */
export function HomePage() {
  const { brand } = useBrand();
  const c = brand.colors;
  const [toggleVal, setToggleVal] = useState('active');
  const strongWeight = sw(brand);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>
        Design System
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: 600 }}>
        A modern component library built on MUI with gradients, layered shadows, and a premium tactile feel. Import the theme and use standard MUI components.
      </Typography>

      {/* ─── Color Strips ─── */}
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'inherit' }}>Color Palette</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
        <ColorStrip
          label="Brand"
          brand={brand}
          colors={[
            { hex: c.brand100, name: '100' },
            { hex: c.brand200, name: '200' },
            { hex: c.brand300, name: '300' },
            { hex: c.brand400, name: '400' },
            { hex: c.brand450, name: '450' },
            { hex: c.brand500, name: '500' },
          ]}
        />
        <ColorStrip
          label="Neutral Backgrounds"
          brand={brand}
          colors={[
            { hex: c.bgElevated, name: 'Elevated' },
            { hex: c.bgBase, name: 'Base' },
            { hex: c.bgSunken, name: 'Sunken' },
            { hex: c.bgSunkenDeep, name: 'Sunken Deep' },
            { hex: c.bgSunkenDeeper, name: 'Sunken Deeper' },
          ]}
        />
        <ColorStrip
          label="System"
          brand={brand}
          colors={[
            { hex: c.error.bgDefault, name: 'Error' },
            { hex: c.warning.bgDefault, name: 'Warning' },
            { hex: c.success.bgDefault, name: 'Success' },
            { hex: c.info.bgDefault, name: 'Info' },
          ]}
        />
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
          <Typography variant="caption" sx={{ fontWeight: strongWeight, mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            Card Component
          </Typography>
          <PreviewCard brand={brand} />
        </Box>

        {/* Nav Preview */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: strongWeight, mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            Navigation
          </Typography>
          <NavPreview brand={brand} />
        </Box>

        {/* Stats */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: strongWeight, mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            Stat Cards
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StatCard icon="trending_up" value="2,847" label="Active users" brand={brand} />
            <StatCard icon="inventory_2" value="14.2k" label="Products" brand={brand} />
          </Box>
        </Box>

        {/* Feedback Banners */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: strongWeight, mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            System Feedback
          </Typography>
          <FeedbackBanners brand={brand} />
        </Box>

        {/* Background Layers */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: strongWeight, mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            Background Layers
          </Typography>
          <BackgroundLayers brand={brand} />
        </Box>

        {/* Typography Preview */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: strongWeight, mb: 1, display: 'block', color: 'text.secondary', letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
            Typography Colors
          </Typography>
          <Box sx={{
            bgcolor: c.bgElevated, borderRadius: 2, p: 2.5,
            border: '1px solid', borderColor: c.borderDefault,
          }}>
            <TypographyPreview brand={brand} />
          </Box>
        </Box>
      </Box>

      {/* ─── Component Overview (existing) ─── */}
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'inherit' }}>
        Component Overview
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {/* Buttons */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Buttons</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="outlined">Secondary</Button>
            <Button variant="text">Tertiary</Button>
          </Box>
        </Box>

        {/* Form Controls */}
        <Box>
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
        </Box>

        {/* Text Fields */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Text Fields</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField placeholder="Label" size="small" sx={{ width: 200 }} />
            <TextField label="Label" defaultValue="Value" size="small" sx={{ width: 200 }} />
          </Box>
        </Box>

        {/* Chips & Badges */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Chips & Badges</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label="Chip" color="primary" size="small" />
            <Chip label="Chip" color="secondary" size="small" />
            <Chip label="Chip" color="error" size="small" />
            <Chip label="Chip" color="warning" size="small" />
            <Chip label="Chip" color="success" size="small" />
            <Chip label="Chip" color="info" size="small" />
            <Badge badgeContent={4} color="primary">
              <Icon name="notifications" color="action" />
            </Badge>
          </Box>
        </Box>

        {/* Toggle Button */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: 'inherit', color: 'text.secondary' }}>Toggle Button</Typography>
          <ToggleButtonGroup value={toggleVal} exclusive onChange={(_, v) => v && setToggleVal(v)}>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="inactive1">Inactive</ToggleButton>
            <ToggleButton value="inactive2">Inactive</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
