import { useState, useMemo, useCallback, useRef } from 'react';
import {
  Box,
  Typography,
  Slider,
  Switch,
  Select,
  MenuItem,
  Button,
  Card,
  TextField,
  Chip,
  Collapse,
  IconButton,
  Divider,
  Popover,
  ThemeProvider,
  alpha,
  Stack,
  FormControlLabel,
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { createBrandTheme } from '../../theme/create-brand-theme';
import type { BrandTokens, BrandColors } from '../../theme/types';

/* ── Helpers ── */

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/** Snap a number to nearest multiple of step */
function snap(value: number, step: number) {
  return Math.round(value / step) * step;
}

/* ── Color swatch with popover picker ── */

interface ColorSwatchProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

function ColorSwatch({ label, value, onChange }: ColorSwatchProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          py: 0.5,
          '&:hover': { opacity: 0.85 },
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1,
            bgcolor: value,
            border: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
          }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.2 }}>
            {label}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontFamily: 'monospace', fontSize: 11 }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { p: 2, borderRadius: 2 } } }}
      >
        <HexColorPicker color={value} onChange={onChange} />
        <TextField
          size="small"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
          }}
          sx={{ mt: 1.5, width: '100%', '& input': { fontFamily: 'monospace', fontSize: 13 } }}
        />
      </Popover>
    </>
  );
}

/* ── Collapsible section ── */

interface SectionProps {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function Section({ title, icon, defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 1,
          userSelect: 'none',
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon name={icon} size={18} />
          <Typography variant="body2" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <Icon name={open ? 'expand_less' : 'expand_more'} size={18} />
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Box sx={{ pb: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
}

/* ── Labeled slider ── */

interface LabeledSliderProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  snapTo?: number;
  unit?: string;
}

function LabeledSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  snapTo,
  unit = 'px',
}: LabeledSliderProps) {
  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: -0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: 11 }}>
          {value}
          {unit}
        </Typography>
      </Box>
      <Slider
        size="small"
        value={value}
        onChange={(_, v) => {
          const n = v as number;
          onChange(snapTo ? snap(n, snapTo) : n);
        }}
        min={min}
        max={max}
        step={step}
      />
    </Box>
  );
}

/* ── Font options ── */

const FONT_OPTIONS = [
  'Inter',
  'Plus Jakarta Sans',
  'DM Sans',
  'system-ui, -apple-system, sans-serif',
];

const FONT_LABELS: Record<string, string> = {
  'Inter': 'Inter',
  'Plus Jakarta Sans': 'Plus Jakarta Sans',
  'DM Sans': 'DM Sans',
  'system-ui, -apple-system, sans-serif': 'System',
};

/* ── Color token keys to expose ── */

type EditableColorKey = keyof Pick<
  BrandColors,
  | 'brand400'
  | 'brand500'
  | 'bgBase'
  | 'bgElevated'
  | 'bgSunken'
  | 'contentPrimary'
  | 'contentSecondary'
  | 'borderDefault'
>;

const COLOR_TOKENS: { key: EditableColorKey; label: string }[] = [
  { key: 'brand400', label: 'Brand 400' },
  { key: 'brand500', label: 'Brand 500' },
  { key: 'bgBase', label: 'Background Base' },
  { key: 'bgElevated', label: 'Background Elevated' },
  { key: 'bgSunken', label: 'Background Sunken' },
  { key: 'contentPrimary', label: 'Content Primary' },
  { key: 'contentSecondary', label: 'Content Secondary' },
  { key: 'borderDefault', label: 'Border Default' },
];

/* ═══════════════════════════════════════════════════════════
   ThemePlayground
   ═══════════════════════════════════════════════════════════ */

export function ThemePlayground() {
  const { brand: currentBrand, colorMode } = useBrand();

  /* ── Local overridden tokens ── */
  const [tokens, setTokens] = useState<BrandTokens>(() => deepClone(currentBrand));
  const initialRef = useRef<BrandTokens>(deepClone(currentBrand));

  // Sync when brand changes externally
  const prevBrandIdRef = useRef(currentBrand.id);
  if (currentBrand.id !== prevBrandIdRef.current) {
    prevBrandIdRef.current = currentBrand.id;
    const fresh = deepClone(currentBrand);
    setTokens(fresh);
    initialRef.current = fresh;
  }

  /* ── Mutators ── */
  const setColor = useCallback((key: EditableColorKey, hex: string) => {
    setTokens((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: hex },
    }));
  }, []);

  const setTypo = useCallback(
    (field: 'displayFont' | 'bodyFont' | 'headingWeight' | 'strongWeight', value: string | number) => {
      setTokens((prev) => ({
        ...prev,
        typography: { ...prev.typography, [field]: value },
      }));
    },
    [],
  );

  const setRadius = useCallback((key: 'sm' | 'md' | 'lg', value: number) => {
    setTokens((prev) => ({
      ...prev,
      styleProfile: {
        ...prev.styleProfile,
        radius: { ...(prev.styleProfile?.radius ?? { sm: 8, md: 12, lg: 16 }), [key]: value },
      },
    }));
  }, []);

  const setShadow = useCallback(
    (field: 'intensity' | 'brandTinted' | 'useInset', value: number | boolean) => {
      setTokens((prev) => ({
        ...prev,
        styleProfile: {
          ...prev.styleProfile,
          shadows: {
            ...(prev.styleProfile?.shadows ?? { intensity: 1, brandTinted: false, useInset: true }),
            [field]: value,
          },
        },
      }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    const fresh = deepClone(initialRef.current);
    setTokens(fresh);
  }, []);

  /* ── Build preview theme ── */
  const previewTheme = useMemo(() => {
    const { theme } = createBrandTheme(tokens, colorMode);
    return theme;
  }, [tokens, colorMode]);

  /* ── Derived values ── */
  const radius = tokens.styleProfile?.radius ?? { sm: 8, md: 12, lg: 16 };
  const shadows = tokens.styleProfile?.shadows ?? {
    intensity: 1,
    brandTinted: false,
    useInset: true,
  };

  return (
    <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Theme Playground
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Experiment with token values and see live component previews.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Icon name="restart_alt" size={18} />}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>

      {/* Split view */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          gap: 3,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* ── Left: Controls ── */}
        <Box
          sx={{
            width: 360,
            flexShrink: 0,
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': { width: 4 },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'divider',
              borderRadius: 2,
            },
          }}
        >
          {/* Brand Colors */}
          <Section title="Brand Colors" icon="palette">
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              {COLOR_TOKENS.map((t) => (
                <ColorSwatch
                  key={t.key}
                  label={t.label}
                  value={tokens.colors[t.key] as string}
                  onChange={(hex) => setColor(t.key, hex)}
                />
              ))}
            </Box>
          </Section>

          <Divider />

          {/* Typography */}
          <Section title="Typography" icon="text_fields">
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Display Font
              </Typography>
              <Select
                size="small"
                fullWidth
                value={tokens.typography.displayFont}
                onChange={(e) => setTypo('displayFont', e.target.value)}
              >
                {FONT_OPTIONS.map((f) => (
                  <MenuItem key={f} value={f} sx={{ fontFamily: f }}>
                    {FONT_LABELS[f] ?? f}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                Body Font
              </Typography>
              <Select
                size="small"
                fullWidth
                value={tokens.typography.bodyFont}
                onChange={(e) => setTypo('bodyFont', e.target.value)}
              >
                {FONT_OPTIONS.map((f) => (
                  <MenuItem key={f} value={f} sx={{ fontFamily: f }}>
                    {FONT_LABELS[f] ?? f}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <LabeledSlider
              label="Heading Weight"
              value={tokens.typography.headingWeight ?? 600}
              onChange={(v) => setTypo('headingWeight', v)}
              min={300}
              max={800}
              step={100}
              unit=""
            />
            <LabeledSlider
              label="Body Strong Weight"
              value={tokens.typography.strongWeight ?? 600}
              onChange={(v) => setTypo('strongWeight', v)}
              min={300}
              max={700}
              step={100}
              unit=""
            />
          </Section>

          <Divider />

          {/* Spacing & Radius */}
          <Section title="Spacing & Radius" icon="rounded_corner">
            <LabeledSlider
              label="Radius SM"
              value={radius.sm}
              onChange={(v) => setRadius('sm', v)}
              min={0}
              max={24}
              step={4}
              snapTo={4}
            />
            <LabeledSlider
              label="Radius MD"
              value={radius.md}
              onChange={(v) => setRadius('md', v)}
              min={0}
              max={32}
              step={4}
              snapTo={4}
            />
            <LabeledSlider
              label="Radius LG"
              value={radius.lg}
              onChange={(v) => setRadius('lg', v)}
              min={0}
              max={48}
              step={4}
              snapTo={4}
            />
          </Section>

          <Divider />

          {/* Effects */}
          <Section title="Effects" icon="auto_awesome" defaultOpen={false}>
            <LabeledSlider
              label="Shadow Intensity"
              value={shadows.intensity}
              onChange={(v) => setShadow('intensity', v)}
              min={0}
              max={2}
              step={0.1}
              unit="x"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={shadows.brandTinted}
                  onChange={(_, checked) => setShadow('brandTinted', checked)}
                />
              }
              label={
                <Typography variant="caption" color="text.secondary">
                  Brand Tinted Shadows
                </Typography>
              }
              sx={{ mt: 1 }}
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={shadows.useInset}
                  onChange={(_, checked) => setShadow('useInset', checked)}
                />
              }
              label={
                <Typography variant="caption" color="text.secondary">
                  Use Inset Shadows
                </Typography>
              }
              sx={{ mt: 0.5 }}
            />
          </Section>
        </Box>

        {/* ── Right: Preview ── */}
        <ThemeProvider theme={previewTheme}>
          <Box
            sx={{
              flex: 1,
              bgcolor: previewTheme.palette.background.default,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              overflowY: 'auto',
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: previewTheme.palette.text.primary,
                fontFamily: tokens.typography.displayFont,
              }}
            >
              Live Preview
            </Typography>

            {/* Buttons */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ mb: 1.5, color: previewTheme.palette.text.secondary }}
              >
                Buttons
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                <Button variant="contained">Primary</Button>
                <Button variant="outlined">Secondary</Button>
                <Button variant="text">Text</Button>
                <Button variant="contained" color="error">
                  Destructive
                </Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
              </Stack>
            </Box>

            {/* Text Fields */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ mb: 1.5, color: previewTheme.palette.text.secondary }}
              >
                Text Fields
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <TextField label="First name" placeholder="Enter name" size="small" />
                <TextField
                  label="Email"
                  placeholder="user@example.com"
                  size="small"
                  helperText="We'll never share your email."
                />
              </Stack>
            </Box>

            {/* Card */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ mb: 1.5, color: previewTheme.palette.text.secondary }}
              >
                Card
              </Typography>
              <Card sx={{ p: 3, maxWidth: 400 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Sample Card
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  This card demonstrates the current token configuration including background,
                  border radius, and shadow settings.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" size="small">
                    Action
                  </Button>
                  <Button variant="outlined" size="small">
                    Cancel
                  </Button>
                </Stack>
              </Card>
            </Box>

            {/* Chips */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ mb: 1.5, color: previewTheme.palette.text.secondary }}
              >
                Chips
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Success" color="success" />
                <Chip label="Warning" color="warning" />
                <Chip label="Error" color="error" />
                <Chip label="Outlined" variant="outlined" />
                <Chip label="Deletable" onDelete={() => {}} />
              </Stack>
            </Box>

            {/* Typography Showcase */}
            <Box>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ mb: 1.5, color: previewTheme.palette.text.secondary }}
              >
                Typography
              </Typography>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: alpha(previewTheme.palette.primary.main, 0.04),
                  border: '1px solid',
                  borderColor: alpha(previewTheme.palette.primary.main, 0.08),
                }}
              >
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  Heading 4
                </Typography>
                <Typography variant="h5" sx={{ mb: 0.5 }}>
                  Heading 5
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Heading 6
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Body 1 -- The quick brown fox jumps over the lazy dog.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Body 2 -- Secondary text for descriptions and captions.
                </Typography>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
