import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Skeleton,
  CircularProgress,
  Divider,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { ToggleChip, ToggleChipGroup } from '../../components/ToggleChip';
import { useBrand } from '../../theme/brand-context';
import { generateHarmony } from '../../theme/color-harmony';
import { config } from '../../config';
import type { PatternRule } from '../../config';

/* ── Section header helper ── */
function SectionHeader({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
        <Icon name={icon} size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        {description}
      </Typography>
    </>
  );
}

/* ── Do / Don't card ── */
function DoOrDont({ isDo, label, children }: { isDo: boolean; label: string; children: React.ReactNode }) {
  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        flex: '1 1 260px',
        borderColor: isDo
          ? alpha(theme.palette.success.main, 0.4)
          : alpha(theme.palette.error.main, 0.4),
        borderWidth: 2,
      })}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Icon
            name={isDo ? 'check_circle' : 'cancel'}
            size={20}
            color={isDo ? 'var(--mui-palette-success-main, #2e7d32)' : 'var(--mui-palette-error-main, #d32f2f)'}
            filled
          />
          <Typography variant="subtitle2" fontWeight={500} color={isDo ? 'success.main' : 'error.main'}>
            {isDo ? 'Do' : "Don't"} — {label}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}

/* ── Descriptions for each action level ── */
const ACTION_DESCRIPTIONS: Record<string, string> = {
  primary: 'Main call-to-action. Use for the single most important action on the screen.',
  secondary: 'Supporting action. Use alongside or as alternative to the primary action.',
  tertiary: 'Low-emphasis action. Use for optional or less important actions.',
  destructive: 'Irreversible or dangerous action. Use for delete, remove, or cancel operations.',
};

/* ── State descriptions & icons ── */
const STATE_META: Record<string, { icon: string; description: string }> = {
  hover: { icon: 'mouse', description: 'Background opacity shift on pointer enter.' },
  active: { icon: 'touch_app', description: 'Subtle scale-down to indicate press.' },
  focus: { icon: 'center_focus_strong', description: '2px ring in brand color for keyboard navigation.' },
  disabled: { icon: 'block', description: 'Reduced opacity (0.4) — no pointer events.' },
  loading: { icon: 'hourglass_empty', description: 'Spinner overlay, disabled interaction.' },
};

const CATEGORY_ICONS: Record<string, string> = {
  buttons: 'smart_button',
  selection: 'check_box',
  navigation: 'menu',
  states: 'toggle_on',
  cards: 'dashboard',
  chips: 'label',
  focus: 'center_focus_strong',
  loading: 'hourglass_empty',
};

const SEVERITY_CONFIG: Record<string, { color: 'error' | 'warning' | 'info'; variant: 'filled' | 'outlined'; icon: string }> = {
  critical: { color: 'error', variant: 'filled', icon: 'error' },
  warning: { color: 'warning', variant: 'outlined', icon: 'warning' },
  suggestion: { color: 'info', variant: 'outlined', icon: 'lightbulb' },
};

/* ── Chip type data ── */
const CHIP_TYPES = [
  { type: 'Filter', purpose: 'Filter / organise', color: 'primary' as const, variant: 'outlined' as const, deletable: true, icon: 'filter_list' },
  { type: 'Input', purpose: 'User-entered value', color: 'default' as const, variant: 'outlined' as const, deletable: true, icon: 'edit' },
  { type: 'Action', purpose: 'Quick action shortcut', color: 'default' as const, variant: 'outlined' as const, deletable: false, icon: 'bolt' },
  { type: 'Status', purpose: 'Read-only indicator', color: 'success' as const, variant: 'filled' as const, deletable: false, icon: 'info' },
  { type: 'Suggestion', purpose: 'Input suggestion', color: 'default' as const, variant: 'outlined' as const, deletable: false, icon: 'lightbulb' },
];

export function PatternsPage() {
  const { brand } = useBrand();
  const c = brand.colors;
  const { actionHierarchy, states, loading, rules } = config.patterns;
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [selectionRadio, setSelectionRadio] = useState('option1');
  const [selectionSwitch, setSelectionSwitch] = useState(true);
  const [selectionToggle, setSelectionToggle] = useState('active');
  const [chipFilter, setChipFilter] = useState<string[]>(['electronics']);
  const [toggleChipDemo, setToggleChipDemo] = useState<string[]>(['electronics']);
  const [toggleViewMode, setToggleViewMode] = useState('list');

  const rulesByCategory = useMemo(() => {
    const map = new Map<string, PatternRule[]>();
    for (const rule of rules) {
      const existing = map.get(rule.category) ?? [];
      existing.push(rule);
      map.set(rule.category, existing);
    }
    return map;
  }, [rules]);

  const handleLoadingDemo = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2.5rem' }}>Patterns</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Reusable UI patterns and component compositions. These patterns ensure visual and
        behavioural consistency across Medipim and Lochting.
      </Typography>

      {/* ══════════════════════════════════════════════════
          Section 1: Action Hierarchy
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="touch_app"
        title="Action Hierarchy"
        description="Every screen should have a clear visual hierarchy of actions. Use these four levels consistently."
      />

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
        {Object.entries(actionHierarchy).map(([level, pattern]) => (
          <Card key={level} variant="outlined" sx={{ flex: '1 1 200px', minWidth: 200, maxWidth: 280 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3 }}>
              <Button
                variant={pattern.variant as 'contained' | 'outlined' | 'text'}
                color={pattern.color as 'primary' | 'error'}
                sx={{ textTransform: 'capitalize', minWidth: 140 }}
              >
                {level} Action
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Chip label={`${pattern.variant} / ${pattern.color}`} size="small" sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.75rem' }} />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.5 }}>
                  {ACTION_DESCRIPTIONS[level]}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Do / Don't: Button Hierarchy */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="One primary per view">
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained">Save</Button>
            <Button variant="outlined">Cancel</Button>
            <Button variant="text">Skip</Button>
          </Box>
        </DoOrDont>
        <DoOrDont isDo={false} label="Multiple primary buttons">
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained">Save</Button>
            <Button variant="contained">Publish</Button>
            <Button variant="contained">Submit</Button>
          </Box>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 2: Variant Decision Tree
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="account_tree"
        title="Variant Decision Tree"
        description="Follow this decision tree to pick the right button variant for any action."
      />

      <Card variant="outlined" sx={{ mb: 4, overflow: 'hidden' }}>
        <CardContent sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { question: 'Is this the main action?', yes: 'Contained (filled)', variant: 'contained' as const, color: 'primary' as const },
              { question: 'Important but secondary?', yes: 'Outlined', variant: 'outlined' as const, color: 'primary' as const },
              { question: 'Low-priority action?', yes: 'Text (ghost)', variant: 'text' as const, color: 'primary' as const },
              { question: 'Destructive / irreversible?', yes: 'Contained + error', variant: 'contained' as const, color: 'error' as const },
            ].map((step, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box
                  sx={(theme) => ({
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    flexShrink: 0,
                  })}
                >
                  {i + 1}
                </Box>
                <Typography variant="body2" sx={{ flex: '1 1 200px', minWidth: 160 }}>
                  {step.question}
                </Typography>
                <Icon name="arrow_forward" size={16} sx={{ color: 'text.disabled', flexShrink: 0 }} />
                <Typography variant="body2" fontWeight={500} sx={{ minWidth: 120 }}>
                  YES →
                </Typography>
                <Button variant={step.variant} color={step.color} size="small" sx={{ textTransform: 'none', pointerEvents: 'none' }}>
                  {step.yes}
                </Button>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Do / Don't: Destructive */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Descriptive destructive label">
          <Button variant="contained" color="error" startIcon={<Icon name="delete" size={18} />}>
            Delete Account
          </Button>
        </DoOrDont>
        <DoOrDont isDo={false} label="Vague labels">
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="error">Yes</Button>
            <Button variant="outlined">No</Button>
          </Box>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 3: Selection Patterns
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="check_box"
        title="Selection Patterns"
        description="Choose the right selection component based on selection type, effect timing, and number of options."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 3, mb: 3 }}>
        {/* Checkbox */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>Checkbox</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Multi-select (0, 1, or more). Effect: deferred (needs Save).
            </Typography>
            <Box>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Notifications" />
              <FormControlLabel control={<Checkbox />} label="Newsletter" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Updates" />
            </Box>
          </CardContent>
        </Card>

        {/* Radio */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>Radio</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Exclusive choice (1 of N). Effect: deferred (needs Save).
            </Typography>
            <RadioGroup value={selectionRadio} onChange={(e) => setSelectionRadio(e.target.value)}>
              <FormControlLabel value="option1" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="option2" control={<Radio />} label="PayPal" />
              <FormControlLabel value="option3" control={<Radio />} label="Bank Transfer" />
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Switch */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>Switch / Toggle</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Binary ON/OFF. Effect: immediate (no Save needed).
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControlLabel control={<Switch checked={selectionSwitch} onChange={(e) => setSelectionSwitch(e.target.checked)} />} label="Dark Mode" />
              <FormControlLabel control={<Switch defaultChecked />} label="Auto-save" />
            </Box>
          </CardContent>
        </Card>

        {/* Toggle Button */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>Toggle Button</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Binary quick switch. Effect: immediate.
            </Typography>
            <ToggleButtonGroup value={selectionToggle} exclusive onChange={(_, v) => v && setSelectionToggle(v)} size="small">
              <ToggleButton value="active" sx={{ textTransform: 'none', px: 2 }}>Active</ToggleButton>
              <ToggleButton value="archived" sx={{ textTransform: 'none', px: 2 }}>Archived</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
        </Card>
      </Box>

      {/* Do / Don't: Selection */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Switch for immediate effect">
          <FormControlLabel control={<Switch defaultChecked />} label="Enable feature" />
          <Typography variant="caption" color="text.secondary">Takes effect immediately</Typography>
        </DoOrDont>
        <DoOrDont isDo={false} label="Switch that needs Save">
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <FormControlLabel control={<Switch defaultChecked />} label="Enable feature" />
            <Button variant="contained" size="small">Save Changes</Button>
            <Typography variant="caption" color="text.secondary">Confusing: switch implies immediate</Typography>
          </Box>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 3b: Toggle Selection (ToggleButton vs ToggleChip)
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="toggle_on"
        title="Toggle Selection"
        description="Two dedicated components for toggle selection. Use ToggleButton for mode/view switches, ToggleChip for content filters."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* ToggleButton example: view switcher */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>ToggleButton — Mode Switch</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              View modes, sort order, layout switches. Mutually exclusive. Sunken container.
            </Typography>
            <ToggleButtonGroup value={toggleViewMode} exclusive onChange={(_, v) => v && setToggleViewMode(v)} size="small">
              <ToggleButton value="list" sx={{ textTransform: 'none', px: 2 }}>
                <Icon name="view_list" size={18} />
              </ToggleButton>
              <ToggleButton value="grid" sx={{ textTransform: 'none', px: 2 }}>
                <Icon name="grid_view" size={18} />
              </ToggleButton>
              <ToggleButton value="table" sx={{ textTransform: 'none', px: 2 }}>
                <Icon name="table_rows" size={18} />
              </ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
        </Card>

        {/* ToggleChip example: category filter */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 1 }}>ToggleChip — Content Filter</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Category filters, tag selection, multi-select. Can be exclusive or multi.
            </Typography>
            <ToggleChipGroup value={toggleChipDemo} onChange={(val) => setToggleChipDemo(val as string[])}>
              <ToggleChip value="electronics" label="Electronics" icon="devices" count={24} />
              <ToggleChip value="clothing" label="Clothing" icon="checkroom" count={18} />
              <ToggleChip value="food" label="Food" icon="restaurant" count={9} />
            </ToggleChipGroup>
          </CardContent>
        </Card>
      </Box>

      {/* Do / Don't: Toggle Selection */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="ToggleChipGroup for filters">
          <ToggleChipGroup value={['cat1']} onChange={() => {}}>
            <ToggleChip value="cat1" label="Category A" />
            <ToggleChip value="cat2" label="Category B" />
          </ToggleChipGroup>
          <Typography variant="caption" color="text.secondary">Consistent selection pattern</Typography>
        </DoOrDont>
        <DoOrDont isDo={false} label="Ad-hoc Chip onClick for selection">
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Chip label="Category A" color="primary" size="small" />
            <Chip label="Category B" variant="outlined" size="small" />
          </Box>
          <Typography variant="caption" color="text.secondary">No managed state, inconsistent behavior</Typography>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 4: Chip Types
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="label"
        title="Chip Types"
        description="Each chip type has a specific purpose. Use the right type and color treatment."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        {CHIP_TYPES.map(ct => (
          <Card key={ct.type} variant="outlined">
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 2 }}>
              <Chip
                icon={<Icon name={ct.icon} size={16} />}
                label={ct.type}
                color={ct.color}
                variant={ct.variant}
                onDelete={ct.deletable ? () => {} : undefined}
                sx={{ fontSize: '0.8125rem' }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', lineHeight: 1.4 }}>
                {ct.purpose}
              </Typography>
              <Chip
                label={ct.deletable ? 'Removable' : 'Static'}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.625rem', height: 20 }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Do / Don't: Chips */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Filter chips with clear mechanism">
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Electronics', 'Clothing', 'Books'].map(label => {
              const active = chipFilter.includes(label.toLowerCase());
              return (
                <Chip
                  key={label}
                  label={label}
                  color={active ? 'primary' : 'default'}
                  variant={active ? 'filled' : 'outlined'}
                  onClick={() => setChipFilter(prev =>
                    prev.includes(label.toLowerCase())
                      ? prev.filter(f => f !== label.toLowerCase())
                      : [...prev, label.toLowerCase()]
                  )}
                  onDelete={active ? () => setChipFilter(prev => prev.filter(f => f !== label.toLowerCase())) : undefined}
                  icon={active ? <Icon name="check" size={16} /> : undefined}
                />
              );
            })}
          </Box>
        </DoOrDont>
        <DoOrDont isDo={false} label="No way to dismiss active filters">
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip label="Electronics" color="primary" sx={{ pointerEvents: 'none' }} />
            <Chip label="Clothing" color="primary" sx={{ pointerEvents: 'none' }} />
          </Box>
          <Typography variant="caption" color="text.secondary">No X icon, no Clear All</Typography>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 4b: Icon Containers
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="square"
        title="Icon Containers"
        description="Decorative icon containers use brand tints, never primary gradients. Gradients are reserved for interactive elements."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
        {/* Subtle variant */}
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 3 }}>
            <Box sx={{
              width: 44, height: 44, borderRadius: 2,
              bgcolor: c.bgSunken,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="analytics" size={22} color={c.contentSecondary} />
            </Box>
            <Typography variant="subtitle2" fontWeight={500}>Subtle</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              bgSunken + contentSecondary
            </Typography>
          </CardContent>
        </Card>

        {/* Branded variant (most common) */}
        <Card variant="outlined" sx={{ borderColor: 'primary.main', borderWidth: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 3 }}>
            <Box sx={{
              width: 44, height: 44, borderRadius: 2,
              bgcolor: c.brand100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="insights" size={22} color={c.brand500} />
            </Box>
            <Typography variant="subtitle2" fontWeight={500}>Branded</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              brand100 + brand500
            </Typography>
          </CardContent>
        </Card>

        {/* Emphasis variant */}
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 3 }}>
            <Box sx={{
              width: 44, height: 44, borderRadius: 2,
              bgcolor: c.brand200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="star" size={22} color={c.brand500} />
            </Box>
            <Typography variant="subtitle2" fontWeight={500}>Emphasis</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              brand200 + brand500
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Sizing scale */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 2 }}>Sizing Scale</Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
            {[
              { label: 'xs', size: 24, iconSize: 14 },
              { label: 'sm', size: 32, iconSize: 16 },
              { label: 'md', size: 40, iconSize: 20 },
              { label: 'lg', size: 48, iconSize: 24 },
            ].map(s => (
              <Box key={s.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: s.size, height: s.size, borderRadius: 1.5,
                  bgcolor: c.brand100,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="widgets" size={s.iconSize} color={c.brand500} />
                </Box>
                <Typography variant="caption" color="text.secondary">{s.label} ({s.size}px)</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Accent color icon containers */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={500} sx={{ mb: 0.5 }}>Accent Colors</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            Use accent colors for dashboards, data categories, and multi-color layouts. Pattern: accent.light bg + accent.dark icon.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {(() => {
              // Use curated accents if available, otherwise generate from brand
              const accents = brand.accents
                ? Object.entries(brand.accents.colors).map(([key, a]) => ({
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    light: a.light, dark: a.dark, icon: ['local_pharmacy', 'payments', 'favorite', 'inventory_2', 'storefront'][0],
                  }))
                : generateHarmony(c.brand400, 'triadic').accents.map(a => ({
                    label: a.label, light: a.light, dark: a.dark,
                  }));
              const icons = ['local_pharmacy', 'payments', 'favorite', 'inventory_2', 'storefront'];
              return accents.map((a, i) => (
                <Box key={a.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                  <Box sx={{
                    width: 44, height: 44, borderRadius: 2,
                    bgcolor: a.light,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={icons[i % icons.length]} size={22} color={a.dark} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">{a.label}</Typography>
                </Box>
              ));
            })()}
            {/* Brand primary for comparison */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{
                width: 44, height: 44, borderRadius: 2,
                bgcolor: c.brand100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="dashboard" size={22} color={c.brand500} />
              </Box>
              <Typography variant="caption" color="text.secondary">Brand</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Do / Don't: Icon Containers */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Brand tint + brand500 icon">
          <Box sx={{
            width: 44, height: 44, borderRadius: 2,
            bgcolor: c.brand100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="settings" size={22} color={c.brand500} />
          </Box>
          <Typography variant="caption" color="text.secondary">Clearly decorative</Typography>
        </DoOrDont>
        <DoOrDont isDo={false} label="Primary gradient on non-clickable icon">
          <Box sx={{
            width: 44, height: 44, borderRadius: 2,
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="settings" size={22} color="white" />
          </Box>
          <Typography variant="caption" color="text.secondary">Looks like a button</Typography>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 5: Card Sizing
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="dashboard"
        title="Card Sizing"
        description="Card padding and radius scale proportionally. Use design tokens for consistency."
      />

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {[
          { size: 'Compact', padding: 12, radius: 8, gap: 8, use: 'Dense layouts, list items, thumbnail grids' },
          { size: 'Medium', padding: 16, radius: 12, gap: 12, use: 'Standard cards, product cards, feature cards' },
          { size: 'Large', padding: 24, radius: 16, gap: 16, use: 'Detail panels, hero cards, premium layouts' },
        ].map(card => (
          <Card key={card.size} variant="outlined" sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent sx={{ p: `${card.padding}px !important` }}>
              <Box
                sx={(theme) => ({
                  p: `${card.padding}px`,
                  borderRadius: `${card.radius}px`,
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  border: '1px dashed',
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: `${card.gap}px`,
                })}
              >
                <Typography variant="subtitle2" fontWeight={500}>{card.size}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={`padding: ${card.padding}px`} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.6875rem', height: 22 }} />
                  <Chip label={`radius: ${card.radius}px`} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.6875rem', height: 22 }} />
                  <Chip label={`gap: ${card.gap}px`} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.6875rem', height: 22 }} />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
                  {card.use}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Do / Don't: Cards */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Entire card is clickable">
          <Card variant="outlined" sx={{ width: '100%', borderRadius: 2, transition: 'border-color 0.2s ease-out, box-shadow 0.2s ease-out', '&:hover': { borderColor: 'primary.main' } }}>
            <CardActionArea sx={{ p: 2.5 }}>
              <Typography variant="subtitle2" fontWeight={500}>Product Name</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>Click anywhere on this card</Typography>
            </CardActionArea>
          </Card>
        </DoOrDont>
        <DoOrDont isDo={false} label="Only button is clickable">
          <Card variant="outlined" sx={{ width: '100%', p: 2.5, borderRadius: 2 }}>
            <Typography variant="subtitle2" fontWeight={500}>Product Name</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, mb: 1 }}>Card is not interactive</Typography>
            <Button variant="contained" size="small">View Details</Button>
          </Card>
        </DoOrDont>
      </Box>

      {/* Do / Don't: Card Shadows */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Subtle shadow: high blur, low opacity">
          <Card sx={{ width: '100%', p: 2.5, boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}>
            <Typography variant="subtitle2" fontWeight={500}>Good Shadow</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>Soft, barely visible — elevates without distraction</Typography>
          </Card>
        </DoOrDont>
        <DoOrDont isDo={false} label="Harsh shadow: solid black, high opacity">
          <Card sx={{ width: '100%', p: 2.5, boxShadow: '0 2px 4px rgba(0,0,0,0.35)' }}>
            <Typography variant="subtitle2" fontWeight={500}>Bad Shadow</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>Heavy, harsh — looks dated and draws too much attention</Typography>
          </Card>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 6: Interactive States
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="toggle_on"
        title="Interactive States"
        description="Interactive elements must communicate their current state clearly. Each state uses a specific visual treatment."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
          mb: 3,
        }}
      >
        {Object.entries(states).map(([state, token]) => (
          <Card key={state} variant="outlined" sx={{ overflow: 'visible' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3 }}>
              <Icon name={STATE_META[state]?.icon ?? 'info'} size={20} color="text.secondary" />
              {state === 'hover' && (
                <Button variant="contained" size="small" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.85), pointerEvents: 'none' }}>
                  Hovered
                </Button>
              )}
              {state === 'active' && (
                <Button variant="contained" size="small" sx={{ transform: 'scale(0.97)', pointerEvents: 'none' }}>
                  Pressed
                </Button>
              )}
              {state === 'focus' && (
                <Button variant="contained" size="small" sx={{ outline: (theme) => `2px solid ${theme.palette.primary.main}`, outlineOffset: 2, pointerEvents: 'none' }}>
                  Focused
                </Button>
              )}
              {state === 'disabled' && (
                <Button variant="contained" size="small" disabled>Disabled</Button>
              )}
              {state === 'loading' && (
                <Button variant="contained" size="small" disabled sx={{ pointerEvents: 'none', position: 'relative' }}>
                  <CircularProgress size={16} sx={{ color: 'inherit', mr: 1 }} />
                  Loading
                </Button>
              )}
              <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', fontWeight: 500, mt: 0.5 }}>
                {state}
              </Typography>
              <Chip label={token} size="small" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.4 }}>
                {STATE_META[state]?.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Do / Don't: States */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Visible focus ring for keyboard">
          <Button variant="contained" size="small" sx={{ outline: (theme) => `2px solid ${theme.palette.primary.main}`, outlineOffset: 2, pointerEvents: 'none' }}>
            Focused Button
          </Button>
        </DoOrDont>
        <DoOrDont isDo={false} label="No visible focus indicator">
          <Button variant="contained" size="small" sx={{ outline: 'none', pointerEvents: 'none' }}>
            No Focus Ring
          </Button>
          <Typography variant="caption" color="text.secondary">Keyboard users can't see where they are</Typography>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 7: Loading Patterns
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="hourglass_empty"
        title="Loading Patterns"
        description="Use the right loading indicator for the context: skeletons for content areas, spinners for actions."
      />

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
        <Card variant="outlined" sx={{ flex: '1 1 320px', maxWidth: 480 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip label={loading.content} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Content Loading</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Use skeleton placeholders for content areas to preserve layout during load.
            </Typography>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: (theme) => alpha(theme.palette.divider, 0.08) }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={16} />
                </Box>
              </Box>
              <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1, mb: 1 }} />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="75%" />
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 320px', maxWidth: 480 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip label={loading.actions} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>Action Loading</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Use a spinner inside the button label for actions like submit, save, or delete.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                disabled={loadingDemo}
                onClick={handleLoadingDemo}
                startIcon={loadingDemo ? <CircularProgress size={16} color="inherit" /> : <Icon name="save" size={18} />}
              >
                {loadingDemo ? 'Saving...' : 'Save Changes'}
              </Button>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {loadingDemo ? 'Spinner replaces icon during action' : 'Click to see loading state'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Do / Don't: Loading */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <DoOrDont isDo label="Disable button during request">
          <Button variant="contained" size="small" disabled startIcon={<CircularProgress size={14} color="inherit" />} sx={{ pointerEvents: 'none' }}>
            Saving...
          </Button>
          <Typography variant="caption" color="text.secondary">Prevents double submission</Typography>
        </DoOrDont>
        <DoOrDont isDo={false} label="Button stays clickable while loading">
          <Button variant="contained" size="small" startIcon={<CircularProgress size={14} sx={{ color: '#fff' }} />} sx={{ pointerEvents: 'none' }}>
            Save
          </Button>
          <Typography variant="caption" color="text.secondary">User can click multiple times</Typography>
        </DoOrDont>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 8: Pattern Rules
         ══════════════════════════════════════════════════ */}
      <SectionHeader
        icon="checklist"
        title="Pattern Rules"
        description={`${rules.length} enforceable pattern rules across ${rulesByCategory.size} categories. Based on research from NNGroup, Material Design, Baymard Institute, and WCAG 2.2.`}
      />

      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        {Object.entries(SEVERITY_CONFIG).map(([sev, cfg]) => (
          <Chip key={sev} label={sev} size="small" color={cfg.color} variant={cfg.variant} sx={{ fontSize: '0.75rem', height: 24 }} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[...rulesByCategory.entries()].map(([category, categoryRules]) => (
          <Box key={category}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={(theme) => ({
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                })}
              >
                <Icon name={CATEGORY_ICONS[category] ?? 'rule'} size={20} />
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                  {category}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {categoryRules.length} rule{categoryRules.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {categoryRules.map((rule) => {
                const sev = SEVERITY_CONFIG[rule.severity] ?? SEVERITY_CONFIG.suggestion;
                return (
                  <Card key={rule.id} variant="outlined">
                    <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Icon name={sev.icon} size={18} color={`var(--mui-palette-${sev.color}-main)`} filled />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.5 }}>
                            {rule.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontFamily: 'monospace', fontSize: '0.7rem' }}>
                            {rule.check}
                          </Typography>
                        </Box>
                        <Chip
                          label={rule.severity}
                          size="small"
                          color={sev.color}
                          variant={sev.variant}
                          sx={{ height: 22, fontSize: '0.6875rem', fontWeight: 500, flexShrink: 0 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
