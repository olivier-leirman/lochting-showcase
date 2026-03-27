import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Slider, Switch, Select, MenuItem,
  Button, Card, Divider, Chip, Alert, ThemeProvider, alpha,
  FormControl, InputLabel, FormControlLabel, Snackbar,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { createBrandTheme } from '../../theme/create-brand-theme';
import { saveCustomStyle } from '../../styles/custom-styles';
import { generateStyleFromPrompt, exportStyleAsTypeScript, createBlankStyle } from '../../styles/style-generator';
import { ALL_STYLES, STYLES_BY_ID } from '../../styles';
import type { StyleDefinition } from '../../styles/types';

/* ── Helper: copy to clipboard ── */
async function copyToClipboard(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

/* ── Dropdown options ── */
const HOVER_OPTIONS: StyleDefinition['interaction']['hoverEffect'][] = ['opacity-shift', 'lift', 'glow', 'scale', 'darken'];
const ACTIVE_OPTIONS: StyleDefinition['interaction']['activeEffect'][] = ['scale-down', 'press-in', 'none'];
const FOCUS_OPTIONS: StyleDefinition['interaction']['focusRing'][] = ['ring-2px-brand', 'ring-3px-offset', 'outline-dashed', 'glow'];
const BTN_PRIMARY_OPTIONS: StyleDefinition['buttonPrimary'][] = ['gradient', 'solid', 'glass', 'outline-bold', 'flat'];
const BTN_SECONDARY_OPTIONS: StyleDefinition['buttonSecondary'][] = ['gradient', 'outlined-flat', 'glass', 'ghost', 'flat'];
const CARD_OPTIONS: StyleDefinition['cardTreatment'][] = ['elevated', 'bordered', 'glass', 'inset', 'flat'];
const INPUT_OPTIONS: StyleDefinition['inputTreatment'][] = ['outlined', 'filled', 'glass', 'underline', 'bordered'];

export function StyleCreatorPage() {
  const { id: editId } = useParams();
  const navigate = useNavigate();
  const { brand, colorMode, refreshStyles } = useBrand();
  const c = brand.colors;

  // Initialize style from preset/edit or blank
  const [style, setStyle] = useState<StyleDefinition>(() => {
    if (editId && STYLES_BY_ID[editId]) {
      return { ...STYLES_BY_ID[editId], id: `custom-${Date.now()}`, name: `${STYLES_BY_ID[editId].name} (copy)` };
    }
    return createBlankStyle();
  });

  const [prompt, setPrompt] = useState('');
  const [snackbar, setSnackbar] = useState<string | null>(null);

  // Live preview theme
  const preview = useMemo(
    () => createBrandTheme(brand, colorMode, style),
    [brand, colorMode, style],
  );

  // Update helper
  const update = useCallback((patch: Partial<StyleDefinition>) => {
    setStyle((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateSurface = useCallback((patch: Partial<StyleDefinition['surface']>) => {
    setStyle((prev) => ({ ...prev, surface: { ...prev.surface, ...patch } }));
  }, []);

  const updateRadius = useCallback((patch: Partial<StyleDefinition['borderRadius']>) => {
    setStyle((prev) => ({ ...prev, borderRadius: { ...prev.borderRadius, ...patch } }));
  }, []);

  const updateShadows = useCallback((patch: Partial<StyleDefinition['shadows']>) => {
    setStyle((prev) => ({ ...prev, shadows: { ...prev.shadows, ...patch } }));
  }, []);

  const updateInteraction = useCallback((patch: Partial<StyleDefinition['interaction']>) => {
    setStyle((prev) => ({ ...prev, interaction: { ...prev.interaction, ...patch } }));
  }, []);

  // Actions
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    const generated = generateStyleFromPrompt(prompt);
    setStyle(generated);
    setSnackbar('Style generated from prompt');
  };

  const handleSave = () => {
    saveCustomStyle(style);
    refreshStyles?.();
    setSnackbar(`"${style.name}" saved`);
  };

  const handleExport = async () => {
    const ts = exportStyleAsTypeScript(style);
    const ok = await copyToClipboard(ts);
    setSnackbar(ok ? 'TypeScript copied to clipboard' : 'Failed to copy');
  };

  const handleLoadPreset = (preset: StyleDefinition) => {
    setStyle({ ...preset, id: `custom-${Date.now()}`, name: `${preset.name} (copy)` });
    setSnackbar(`Loaded "${preset.name}" as starting point`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentPrimary, mb: 1 }}>
        Style Creator
      </Typography>
      <Typography variant="body1" sx={{ color: c.contentSecondary, mb: 4, maxWidth: 600 }}>
        Design a new visual style by adjusting parameters or generate one from a text prompt.
        Saved styles appear alongside the 5 built-in styles.
      </Typography>

      {/* ── Generate from prompt ── */}
      <Card sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.9375rem', mb: 2 }}>
          <Icon name="auto_awesome" size={18} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
          Generate from Prompt
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. &quot;Soft glassmorphism with large rounded corners and premium feel&quot;"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <Button
            variant="contained"
            onClick={handleGenerate}
            startIcon={<Icon name="auto_awesome" size={18} />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Generate
          </Button>
        </Box>

        {/* Presets */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1, lineHeight: '32px' }}>
            Start from:
          </Typography>
          {ALL_STYLES.map((s) => (
            <Chip
              key={s.id}
              label={s.name}
              size="small"
              variant="outlined"
              onClick={() => handleLoadPreset(s)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Card>

      {/* ── Two-column layout: Controls + Preview ── */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>

        {/* ── LEFT: Controls ── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Identity */}
          <Section title="Identity" icon="badge">
            <TextField
              fullWidth size="small" label="Name"
              value={style.name} onChange={(e) => update({ name: e.target.value })}
            />
            <TextField
              fullWidth size="small" label="Description" multiline rows={2}
              value={style.description} onChange={(e) => update({ description: e.target.value })}
              sx={{ mt: 2 }}
            />
          </Section>

          {/* Surface */}
          <Section title="Surface" icon="layers">
            <SliderField label="Backdrop Blur" value={style.surface.blur} min={0} max={40} unit="px"
              onChange={(v) => updateSurface({ blur: v })} />
            <TextField fullWidth size="small" label="Card Background" sx={{ mt: 2 }}
              value={style.surface.cardBg} onChange={(e) => updateSurface({ cardBg: e.target.value })}
              placeholder="rgba(255,255,255,0.40) or empty" />
            <TextField fullWidth size="small" label="Card Border" sx={{ mt: 2 }}
              value={style.surface.cardBorder} onChange={(e) => updateSurface({ cardBorder: e.target.value })}
              placeholder="1px solid rgba(255,255,255,0.50)" />
            <TextField fullWidth size="small" label="Input Background" sx={{ mt: 2 }}
              value={style.surface.inputBg} onChange={(e) => updateSurface({ inputBg: e.target.value })}
              placeholder="rgba(255,255,255,0.25) or empty" />
          </Section>

          {/* Border Radius */}
          <Section title="Border Radius" icon="rounded_corner">
            <SliderField label="Small" value={style.borderRadius.sm} min={0} max={40} unit="px"
              onChange={(v) => updateRadius({ sm: v })} />
            <SliderField label="Medium" value={style.borderRadius.md} min={0} max={40} unit="px"
              onChange={(v) => updateRadius({ md: v })} />
            <SliderField label="Large" value={style.borderRadius.lg} min={0} max={40} unit="px"
              onChange={(v) => updateRadius({ lg: v })} />
          </Section>

          {/* Shadows */}
          <Section title="Shadows" icon="shadow">
            <FormControlLabel
              control={<Switch checked={style.shadows.useInset} onChange={(_, v) => updateShadows({ useInset: v })} />}
              label="Use Inset Shadows"
            />
            <SliderField label="Intensity" value={style.shadows.intensity} min={0} max={3} step={0.1} unit="x"
              onChange={(v) => updateShadows({ intensity: v })} />
            <FormControlLabel
              control={<Switch checked={style.shadows.brandTinted} onChange={(_, v) => updateShadows({ brandTinted: v })} />}
              label="Brand-Tinted Shadows"
            />
          </Section>

          {/* Interaction */}
          <Section title="Interaction" icon="touch_app">
            <DropdownField label="Hover Effect" value={style.interaction.hoverEffect}
              options={HOVER_OPTIONS} onChange={(v) => updateInteraction({ hoverEffect: v as StyleDefinition['interaction']['hoverEffect'] })} />
            <DropdownField label="Active Effect" value={style.interaction.activeEffect}
              options={ACTIVE_OPTIONS} onChange={(v) => updateInteraction({ activeEffect: v as StyleDefinition['interaction']['activeEffect'] })} />
            <DropdownField label="Focus Ring" value={style.interaction.focusRing}
              options={FOCUS_OPTIONS} onChange={(v) => updateInteraction({ focusRing: v as StyleDefinition['interaction']['focusRing'] })} />
          </Section>

          {/* Component Treatments */}
          <Section title="Component Treatments" icon="widgets">
            <DropdownField label="Primary Button" value={style.buttonPrimary}
              options={BTN_PRIMARY_OPTIONS} onChange={(v) => update({ buttonPrimary: v as StyleDefinition['buttonPrimary'] })} />
            <DropdownField label="Secondary Button" value={style.buttonSecondary}
              options={BTN_SECONDARY_OPTIONS} onChange={(v) => update({ buttonSecondary: v as StyleDefinition['buttonSecondary'] })} />
            <DropdownField label="Card Treatment" value={style.cardTreatment}
              options={CARD_OPTIONS} onChange={(v) => update({ cardTreatment: v as StyleDefinition['cardTreatment'] })} />
            <DropdownField label="Input Treatment" value={style.inputTreatment}
              options={INPUT_OPTIONS} onChange={(v) => update({ inputTreatment: v as StyleDefinition['inputTreatment'] })} />
          </Section>
        </Box>

        {/* ── RIGHT: Live Preview ── */}
        <Box>
          <Box sx={{ position: 'sticky', top: 24 }}>
            <Card sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                  <Icon name="preview" size={18} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
                  Live Preview
                </Typography>
                <Chip label={style.name} size="small" color="primary" variant="outlined" />
              </Box>

              <ThemeProvider theme={preview.theme}>
                <Box sx={{
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}>
                  {/* Buttons */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                      BUTTONS
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      <Button variant="contained" size="small">Primary</Button>
                      <Button variant="outlined" size="small">Secondary</Button>
                      <Button variant="text" size="small">Text</Button>
                      <Button variant="contained" size="small" color="error">Error</Button>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Card */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                      CARD
                    </Typography>
                    <Card sx={{ p: 2.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Product Card</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Paracetamol 500mg — CNK 0012345
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                        <Chip label="OTC" size="small" color="primary" variant="outlined" />
                        <Chip label="In Stock" size="small" color="success" variant="outlined" />
                      </Box>
                    </Card>
                  </Box>

                  <Divider />

                  {/* Input */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                      INPUT
                    </Typography>
                    <TextField
                      fullWidth size="small" label="Product Name" placeholder="Enter name..."
                    />
                  </Box>

                  <Divider />

                  {/* Alert */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                      ALERTS
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Alert severity="success" variant="outlined" sx={{ py: 0 }}>Saved</Alert>
                      <Alert severity="warning" variant="outlined" sx={{ py: 0 }}>Low stock</Alert>
                    </Box>
                  </Box>
                </Box>
              </ThemeProvider>
            </Card>

            {/* Action buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained" onClick={handleSave}
                startIcon={<Icon name="save" size={18} />}
              >
                Save Style
              </Button>
              <Button
                variant="outlined" onClick={handleExport}
                startIcon={<Icon name="content_copy" size={18} />}
              >
                Export TypeScript
              </Button>
              <Button
                variant="text" onClick={() => navigate('/design-system/styles')}
                startIcon={<Icon name="arrow_back" size={18} />}
              >
                Back to Styles
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
      />
    </Box>
  );
}

/* ── Reusable sub-components ── */

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <Card sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon name={icon} size={18} /> {title}
      </Typography>
      {children}
    </Card>
  );
}

function SliderField({ label, value, min, max, step = 1, unit, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 500 }}>{label}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{value}{unit}</Typography>
      </Box>
      <Slider size="small" value={value} min={min} max={max} step={step}
        onChange={(_, v) => onChange(v as number)} />
    </Box>
  );
}

function DropdownField({ label, value, options, onChange }: {
  label: string; value: string; options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
