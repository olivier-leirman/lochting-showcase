import { useState, useRef } from 'react';
import { Button, ButtonGroup, Checkbox, Switch, Slider, Radio, RadioGroup, FormControlLabel, TextField, Select, MenuItem, Chip, Badge, ToggleButton, ToggleButtonGroup, IconButton, FormControl, InputLabel, Box, Typography, Popper, Grow, Paper, ClickAwayListener, MenuList, Autocomplete, InputAdornment, Tab, Tabs, Stepper, Step, StepLabel, StepContent, LinearProgress, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, CardActions, CardHeader, Alert, Drawer, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, AppBar, Toolbar, Breadcrumbs, Link, Divider, Avatar, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

import dayjs from 'dayjs';
import { Icon } from '../components/Icon';
import { ToggleChip, ToggleChipGroup } from '../components/ToggleChip';
import { SearchField } from '../components/SearchField';
import { MultiSelect, type MultiSelectOption } from '../components/MultiSelect';
import { AdvancedTable, type ColumnDef, type RowAction } from '../components/AdvancedTable';
import { AppSidebar } from '../components/AppSidebar';
import { AppTopBar, TopBarActions } from '../components/AppTopBar';
import { useBrand } from '../theme/brand-context';
import { registerComponent } from './registry';

/* ─── Icon with Background helper ─── */
function IconBg({ icon, iconColor, bg, size = 36 }: { icon: string; iconColor: string; bg: string; size?: number }) {
  return (
    <Box sx={{
      width: size, height: size, borderRadius: 1.5,
      bgcolor: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name={icon} size={size * 0.5} color={iconColor} />
    </Box>
  );
}

function IconBgSoftDemo() {
  const { brand } = useBrand();
  const c = brand.colors;
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="star" iconColor={c.brand.contentStrong} bg={c.brand.bgWeakest} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Brand</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="error" iconColor={c.error.contentStrong} bg={c.error.bgWeakest} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Error</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="warning" iconColor={c.warning.contentStrong} bg={c.warning.bgWeakest} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Warning</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="check_circle" iconColor={c.success.contentStrong} bg={c.success.bgWeakest} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Success</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="info" iconColor={c.info.contentStrong} bg={c.info.bgWeakest} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Info</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="settings" iconColor={c.contentSecondary} bg={c.bgSunken} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Neutral</Typography>
      </Box>
    </Box>
  );
}

function IconBgBrightDemo() {
  const { brand } = useBrand();
  const c = brand.colors;
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="star" iconColor={c.contentStayLight} bg={c.brand.bgDefault} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Brand</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="error" iconColor={c.contentStayLight} bg={c.error.bgDefault} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Error</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="warning" iconColor={c.contentStayLight} bg={c.warning.bgDefault} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Warning</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="check_circle" iconColor={c.contentStayLight} bg={c.success.bgDefault} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Success</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="info" iconColor={c.contentStayLight} bg={c.info.bgDefault} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Info</Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <IconBg icon="settings" iconColor={c.contentInverseSecondary} bg={c.contentSecondary} />
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: c.contentTertiary, fontSize: '0.65rem' }}>Neutral</Typography>
      </Box>
    </Box>
  );
}

// ─── Button ───
registerComponent({
  id: 'button',
  name: 'Button',
  description: 'Buttons trigger actions. The primary button uses a brand gradient with layered shadows for a premium tactile feel.',
  category: 'actions',
  importStatement: `import { Button, IconButton } from '@mui/material';`,
  examples: [
    {
      name: 'Primary',
      code: `<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="primary" startIcon={<Icon name="add" />}>Create</Button>
<Button variant="contained" color="primary" endIcon={<Icon name="chevron_right" />}>Next</Button>
<IconButton color="primary"><Icon name="add" /></IconButton>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="primary" startIcon={<Icon name="add" size={20} />}>Create</Button>
          <Button variant="contained" color="primary" endIcon={<Icon name="chevron_right" size={20} />}>Next</Button>
          <IconButton color="primary"><Icon name="add" /></IconButton>
        </Box>
      ),
    },
    {
      name: 'Secondary',
      code: `<Button variant="outlined">Secondary</Button>
<Button variant="outlined" startIcon={<Icon name="edit" />}>Edit</Button>
<Button variant="outlined" endIcon={<Icon name="stat_minus_1" />}>Options</Button>
<IconButton color="secondary"><Icon name="edit" /></IconButton>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="outlined">Secondary</Button>
          <Button variant="outlined" startIcon={<Icon name="edit" size={20} />}>Edit</Button>
          <Button variant="outlined" endIcon={<Icon name="stat_minus_1" size={20} />}>Options</Button>
          <IconButton color="secondary"><Icon name="edit" /></IconButton>
        </Box>
      ),
    },
    {
      name: 'Tertiary',
      code: `<Button variant="text">Tertiary</Button>
<Button variant="text" startIcon={<Icon name="visibility" />}>View</Button>
<Button variant="text" endIcon={<Icon name="open_in_new" />}>Link</Button>
<IconButton><Icon name="visibility" /></IconButton>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="text">Tertiary</Button>
          <Button variant="text" startIcon={<Icon name="visibility" size={20} />}>View</Button>
          <Button variant="text" endIcon={<Icon name="open_in_new" size={20} />}>Link</Button>
          <IconButton><Icon name="visibility" /></IconButton>
        </Box>
      ),
    },
    {
      name: 'Utility Buttons',
      code: `<IconButton><Icon name="close" /></IconButton>
<IconButton><Icon name="content_copy" /></IconButton>
<IconButton><Icon name="visibility" /></IconButton>
<IconButton><Icon name="search" /></IconButton>
<IconButton><Icon name="chevron_right" /></IconButton>
<IconButton><Icon name="more_vert" /></IconButton>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton><Icon name="close" /></IconButton>
          <IconButton><Icon name="content_copy" /></IconButton>
          <IconButton><Icon name="visibility" /></IconButton>
          <IconButton><Icon name="search" /></IconButton>
          <IconButton><Icon name="chevron_right" /></IconButton>
          <IconButton><Icon name="more_vert" /></IconButton>
        </Box>
      ),
    },
    {
      name: 'Disabled',
      code: `<Button variant="contained" disabled>Disabled</Button>
<Button variant="outlined" disabled>Disabled</Button>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" disabled>Disabled</Button>
          <Button variant="outlined" disabled>Disabled</Button>
        </Box>
      ),
    },
  ],
  props: [
    { name: 'variant', type: '"contained" | "outlined" | "text"', default: '"text"', description: 'The button style variant' },
    { name: 'color', type: '"primary" | "secondary" | "error" | ...', default: '"primary"', description: 'The color of the button' },
    { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'The size of the button' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the button is disabled' },
    { name: 'startIcon', type: 'ReactNode', description: 'Icon placed before the label' },
    { name: 'endIcon', type: 'ReactNode', description: 'Icon placed after the label' },
  ],
});

// ─── Checkbox ───
registerComponent({
  id: 'checkbox',
  name: 'Checkbox',
  description: 'Checkboxes use a sunken gradient when unchecked and a brand gradient when checked, with layered inner shadows.',
  category: 'inputs',
  importStatement: `import { Checkbox } from '@mui/material';`,
  examples: [
    {
      name: 'States',
      code: `<Checkbox defaultChecked />
<Checkbox />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Checkbox defaultChecked />
          <Checkbox />
        </Box>
      ),
    },
    {
      name: 'With Label',
      code: `<FormControlLabel control={<Checkbox defaultChecked />} label="Accept terms" />`,
      render: () => <FormControlLabel control={<Checkbox defaultChecked />} label="Accept terms" />,
    },
    {
      name: 'Sizes',
      code: `<Checkbox defaultChecked size="small" />
<Checkbox defaultChecked />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Small" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Medium" />
        </Box>
      ),
    },
    {
      name: 'Disabled',
      code: `<Checkbox disabled />
<Checkbox disabled checked />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Checkbox disabled />
          <Checkbox disabled checked />
        </Box>
      ),
    },
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'If true, the checkbox is checked' },
    { name: 'defaultChecked', type: 'boolean', description: 'The default checked state' },
    { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: 'The size of the checkbox' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the checkbox is disabled' },
    { name: 'onChange', type: '(event, checked) => void', description: 'Callback fired when the state changes' },
  ],
});

// ─── Radio ───
registerComponent({
  id: 'radio',
  name: 'Radio',
  description: 'Radio buttons use the same sunken/gradient pattern as checkboxes, with a gradient dot for the selected state.',
  category: 'inputs',
  importStatement: `import { Radio, RadioGroup, FormControlLabel } from '@mui/material';`,
  examples: [
    {
      name: 'Radio Group',
      code: `<RadioGroup defaultValue="option1">
  <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
  <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
</RadioGroup>`,
      render: () => (
        <RadioGroup defaultValue="option1">
          <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
        </RadioGroup>
      ),
    },
    {
      name: 'Inline',
      code: `<RadioGroup row defaultValue="a">
  <FormControlLabel value="a" control={<Radio />} label="A" />
  <FormControlLabel value="b" control={<Radio />} label="B" />
  <FormControlLabel value="c" control={<Radio />} label="C" />
</RadioGroup>`,
      render: () => (
        <RadioGroup row defaultValue="a">
          <FormControlLabel value="a" control={<Radio />} label="A" />
          <FormControlLabel value="b" control={<Radio />} label="B" />
          <FormControlLabel value="c" control={<Radio />} label="C" />
        </RadioGroup>
      ),
    },
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'If true, the radio is selected' },
    { name: 'value', type: 'string', description: 'The value of the radio' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the radio is disabled' },
  ],
});

// ─── Switch ───
registerComponent({
  id: 'switch',
  name: 'Switch',
  description: 'The switch track swaps between an inactive sunken gradient and the primary brand gradient. The thumb has a subtle inner shadow.',
  category: 'inputs',
  importStatement: `import { Switch } from '@mui/material';`,
  examples: [
    {
      name: 'States',
      code: `<Switch defaultChecked />
<Switch />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Switch defaultChecked />
          <Switch />
        </Box>
      ),
    },
    {
      name: 'With Label',
      code: `<FormControlLabel control={<Switch defaultChecked />} label="Notifications" />`,
      render: () => <FormControlLabel control={<Switch defaultChecked />} label="Notifications" />,
    },
    {
      name: 'Disabled',
      code: `<Switch disabled />
<Switch disabled checked />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Switch disabled />
          <Switch disabled checked />
        </Box>
      ),
    },
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'If true, the switch is on' },
    { name: 'defaultChecked', type: 'boolean', description: 'The default state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the switch is disabled' },
    { name: 'onChange', type: '(event, checked) => void', description: 'Callback fired when toggled' },
  ],
});

// ─── Slider ───

/* Slider variant: Volume bars */
function VolumeSlider() {
  const { brand } = useBrand();
  const c = brand.colors;
  const [value, setValue] = useState(50);
  const total = 30;
  const filledBars = Math.round((value / 100) * total);

  return (
    <Box sx={{ width: 280, position: 'relative' }}>
      {/* Bar visualisation */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: 20, mb: -1.25, mx: '10px', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
        {Array.from({ length: total }, (_, i) => (
          <Box key={i} sx={{
            flex: 1, height: '100%', borderRadius: '1px',
            background: i < filledBars ? c.brand400 : c.borderDefault,
            opacity: i < filledBars ? 0.6 + ((i / total) * 0.4) : 0.4,
            transition: 'background 0.1s, opacity 0.1s',
          }} />
        ))}
      </Box>
      <Slider value={value} onChange={(_, v) => setValue(v as number)} />
    </Box>
  );
}

/* Slider variant: Distribution histogram with range */
function DistributionSlider() {
  const { brand } = useBrand();
  const c = brand.colors;
  const [value, setValue] = useState<number[]>([25, 75]);

  /* Bell curve heights (0-1) for 30 bars */
  const barHeights = Array.from({ length: 30 }, (_, i) => {
    const x = (i - 15) / 5;
    return Math.exp(-0.5 * x * x);
  });

  return (
    <Box sx={{ width: 300, position: 'relative' }}>
      {/* Histogram */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: 40, mb: -1.5, mx: '10px', pointerEvents: 'none', position: 'relative', zIndex: 1 }}>
        {barHeights.map((h, i) => {
          const pct = (i / (barHeights.length - 1)) * 100;
          const inRange = pct >= value[0] && pct <= value[1];
          return (
            <Box key={i} sx={{
              flex: 1, height: `${h * 100}%`, borderRadius: '1.5px 1.5px 0 0',
              bgcolor: inRange ? c.brand400 : c.contentTertiary,
              opacity: inRange ? 0.7 : 0.2,
              transition: 'background 0.1s, opacity 0.1s',
            }} />
          );
        })}
      </Box>
      <Slider value={value} onChange={(_, v) => setValue(v as number[])} />
    </Box>
  );
}

/* Slider variant: Range with value labels and ruler scale */
function RulerRangeSlider() {
  const { brand } = useBrand();
  const c = brand.colors;

  return (
    <Box sx={{ width: 280 }}>
      <Slider
        defaultValue={[2, 8]}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="on"
        marks={Array.from({ length: 11 }, (_, i) => ({ value: i, label: i % 2 === 0 ? String(i) : '' }))}
        sx={{
          '& .MuiSlider-markLabel': {
            fontSize: '0.65rem', color: c.contentTertiary, top: 30,
          },
          '& .MuiSlider-mark': {
            height: 6, width: 1, bgcolor: c.borderDefault,
          },
          '& .MuiSlider-valueLabel': {
            bgcolor: c.bgBaseInverse, color: c.contentInversePrimary,
            borderRadius: 1, fontSize: '0.7rem', fontWeight: 500,
            px: 1, py: 0.25,
            '&::before': { display: 'none' },
          },
        }}
      />
    </Box>
  );
}

/* Slider variant: Step dots (pagination-style) */
function StepDotSlider() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const [value, setValue] = useState(3);
  const steps = 7;

  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.75,
      bgcolor: c.bgElevated, borderRadius: 2, px: 1.5, py: 1,
      border: '1px solid', borderColor: c.borderDefault,
      boxShadow: effects.shadows.secondaryButton,
    }}>
      <IconButton size="small" disabled={value <= 1} onClick={() => setValue(v => Math.max(1, v - 1))}>
        <Icon name="chevron_left" size={18} />
      </IconButton>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.25 }} />
      <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', px: 0.5 }}>
        {Array.from({ length: steps }, (_, i) => (
          <Box
            key={i}
            onClick={() => setValue(i + 1)}
            sx={{
              width: value === i + 1 ? 10 : 7,
              height: value === i + 1 ? 10 : 7,
              borderRadius: '50%',
              bgcolor: value === i + 1 ? c.brand400 : c.contentTertiary,
              opacity: value === i + 1 ? 1 : 0.35,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          />
        ))}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.25 }} />
      <IconButton size="small" disabled={value >= steps} onClick={() => setValue(v => Math.min(steps, v + 1))}>
        <Icon name="chevron_right" size={18} />
      </IconButton>
    </Box>
  );
}

registerComponent({
  id: 'slider',
  name: 'Slider',
  description: 'The slider rail uses a sunken gradient, while the track and thumb use the primary brand gradient with a centered white dot.',
  category: 'inputs',
  importStatement: `import { Slider } from '@mui/material';`,
  examples: [
    {
      name: 'Default',
      code: `<Slider defaultValue={40} />`,
      render: () => <Box sx={{ width: 250 }}><Slider defaultValue={40} /></Box>,
    },
    {
      name: 'Range',
      code: `<Slider defaultValue={[20, 60]} />`,
      render: () => <Box sx={{ width: 250 }}><Slider defaultValue={[20, 60]} /></Box>,
    },
    {
      name: 'Discrete with Marks',
      code: `<Slider
  defaultValue={50}
  step={null}
  marks={[
    { value: 0, label: 'Minimum' },
    { value: 50, label: 'Recommended' },
    { value: 100, label: 'Great' },
  ]}
/>`,
      render: () => (
        <Box sx={{ width: 300 }}>
          <Slider
            defaultValue={50}
            step={null}
            marks={[
              { value: 0, label: 'Minimum' },
              { value: 50, label: 'Recommended' },
              { value: 100, label: 'Great' },
            ]}
          />
        </Box>
      ),
    },
    {
      name: 'Tick Marks',
      code: `<Slider defaultValue={40} step={5} marks />`,
      render: () => <Box sx={{ width: 280 }}><Slider defaultValue={40} step={5} marks /></Box>,
    },
    {
      name: 'Step Dots',
      code: `// Pagination-style step indicator with prev/next
<StepDotSlider steps={7} defaultValue={3} />`,
      render: () => <StepDotSlider />,
    },
    {
      name: 'Range with Scale',
      code: `<Slider
  defaultValue={[2, 8]}
  min={0} max={10} step={1}
  valueLabelDisplay="on"
  marks={[
    { value: 0, label: '0' },
    { value: 2, label: '2' },
    // ... etc
  ]}
/>`,
      render: () => <RulerRangeSlider />,
    },
    {
      name: 'Volume Bars',
      code: `// Custom bar visualisation above a standard slider
<VolumeSlider />`,
      render: () => <VolumeSlider />,
    },
    {
      name: 'Distribution Range',
      code: `// Histogram distribution overlay on a range slider
<DistributionSlider />`,
      render: () => <DistributionSlider />,
    },
    {
      name: 'Disabled',
      code: `<Slider defaultValue={30} disabled />`,
      render: () => <Box sx={{ width: 250 }}><Slider defaultValue={30} disabled /></Box>,
    },
  ],
  props: [
    { name: 'value', type: 'number | number[]', description: 'The value of the slider' },
    { name: 'defaultValue', type: 'number | number[]', description: 'The default value' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'step', type: 'number | null', default: '1', description: 'Step increment. Pass null for discrete marks-only.' },
    { name: 'marks', type: 'boolean | Mark[]', default: 'false', description: 'Marks on the rail. Pass true for auto-marks or an array of { value, label }.' },
    { name: 'valueLabelDisplay', type: "'auto' | 'on' | 'off'", default: "'off'", description: 'Controls when the value label is displayed' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the slider is disabled' },
  ],
});

// ─── TextField ───
registerComponent({
  id: 'textfield',
  name: 'TextField',
  description: 'Text fields use a sunken background with symmetric inner light shadows, creating a subtle inset feel.',
  category: 'inputs',
  importStatement: `import { TextField } from '@mui/material';`,
  examples: [
    {
      name: 'Sizes',
      code: `<TextField label="Small" size="small" />
<TextField label="Medium (default)" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <TextField label="Small" size="small" defaultValue="Value" />
          <TextField label="Medium" defaultValue="Value" />
        </Box>
      ),
    },
    {
      name: 'Variants',
      code: `<TextField placeholder="Label" />
<TextField label="Label" />
<TextField label="Label" defaultValue="Value" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField placeholder="Label" size="small" />
          <TextField label="Label" size="small" />
          <TextField label="Label" defaultValue="Value" size="small" />
        </Box>
      ),
    },
    {
      name: 'Disabled & Error',
      code: `<TextField label="Disabled" disabled />
<TextField label="Error" error helperText="Something went wrong" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="Disabled" disabled size="small" />
          <TextField label="Error" error helperText="Something went wrong" size="small" />
        </Box>
      ),
    },
    {
      name: 'Multiline / Textarea',
      code: `<TextField label="Message" multiline rows={3} />
<TextField label="Auto-grow" multiline minRows={2} maxRows={6} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField label="Message" multiline rows={3} size="small" sx={{ width: 280 }} />
          <TextField label="Auto-grow" multiline minRows={2} maxRows={6} size="small" placeholder="Type to see auto-grow..." sx={{ width: 280 }} />
        </Box>
      ),
    },
    {
      name: 'With Adornments',
      code: `import { InputAdornment } from '@mui/material';

<TextField
  label="Amount"
  slotProps={{
    input: {
      startAdornment: <InputAdornment position="start">€</InputAdornment>,
    },
  }}
/>
<TextField
  label="Weight"
  slotProps={{
    input: {
      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
    },
  }}
/>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Amount"
            size="small"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
              },
            }}
          />
          <TextField
            label="Weight"
            size="small"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              },
            }}
          />
        </Box>
      ),
    },
  ],
  props: [
    { name: 'label', type: 'string', description: 'The label text' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string', description: 'The input value' },
    { name: 'error', type: 'boolean', default: 'false', description: 'If true, shows error state' },
    { name: 'helperText', type: 'string', description: 'Helper text below the input' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the input is disabled' },
    { name: 'size', type: '"small" | "medium"', default: '"medium"', description: 'The size of the input' },
    { name: 'multiline', type: 'boolean', default: 'false', description: 'If true, renders as a textarea' },
    { name: 'rows', type: 'number', description: 'Fixed number of rows for multiline' },
    { name: 'minRows', type: 'number', description: 'Minimum rows for auto-growing textarea' },
    { name: 'maxRows', type: 'number', description: 'Maximum rows for auto-growing textarea' },
  ],
});

// ─── Select ───
registerComponent({
  id: 'select',
  name: 'Select',
  description: 'Select dropdowns share the same sunken styling as text fields.',
  category: 'inputs',
  importStatement: `import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';`,
  examples: [
    {
      name: 'Sizes',
      code: `<FormControl size="small" sx={{ width: 200 }}>
  <InputLabel>Small</InputLabel>
  <Select label="Small" defaultValue="1">
    <MenuItem value="1">Option 1</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ width: 200 }}>
  <InputLabel>Medium</InputLabel>
  <Select label="Medium" defaultValue="1">
    <MenuItem value="1">Option 1</MenuItem>
  </Select>
</FormControl>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Small</InputLabel>
            <Select label="Small" defaultValue="1">
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Medium</InputLabel>
            <Select label="Medium" defaultValue="1">
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ),
    },
    {
      name: 'Basic',
      code: `<FormControl size="small" sx={{ width: 200 }}>
  <InputLabel>Category</InputLabel>
  <Select label="Category" defaultValue="1">
    <MenuItem value="1">Option 1</MenuItem>
    <MenuItem value="2">Option 2</MenuItem>
  </Select>
</FormControl>`,
      render: () => (
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select label="Category" defaultValue="1">
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
            <MenuItem value="3">Option 3</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ],
  props: [
    { name: 'value', type: 'string | number', description: 'The selected value' },
    { name: 'label', type: 'string', description: 'The label text' },
    { name: 'onChange', type: '(event) => void', description: 'Callback when selection changes' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the select is disabled' },
  ],
});

// ─── Chip ───
registerComponent({
  id: 'chip',
  name: 'Chip',
  description: 'Chips use a brand-tinted background with subtle inner shadows. Available in multiple color variants with optional icons, delete buttons, and count badges.',
  category: 'data-display',
  importStatement: `import { Chip } from '@mui/material';`,
  examples: [
    {
      name: 'Color Variants',
      code: `<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Error" color="error" />
<Chip label="Warning" color="warning" />
<Chip label="Success" color="success" />
<Chip label="Info" color="info" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Primary" color="primary" size="small" />
          <Chip label="Secondary" color="secondary" size="small" />
          <Chip label="Error" color="error" size="small" />
          <Chip label="Warning" color="warning" size="small" />
          <Chip label="Success" color="success" size="small" />
          <Chip label="Info" color="info" size="small" />
        </Box>
      ),
    },
    {
      name: 'With Icon',
      code: `<Chip label="Add" color="primary" icon={<Icon name="add" size={16} />} />
<Chip label="Star" color="warning" icon={<Icon name="star" size={16} />} />
<Chip label="Info" color="info" icon={<Icon name="info" size={16} />} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Add" color="primary" size="small" icon={<Icon name="add" size={16} />} />
          <Chip label="Star" color="warning" size="small" icon={<Icon name="star" size={16} />} />
          <Chip label="Info" color="info" size="small" icon={<Icon name="info" size={16} />} />
        </Box>
      ),
    },
    {
      name: 'With Delete',
      code: `<Chip label="Removable" color="primary" onDelete={() => {}} />
<Chip label="Tag" color="secondary" onDelete={() => {}} />
<Chip label="Filter" color="error" onDelete={() => {}} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Removable" color="primary" size="small" onDelete={() => {}} />
          <Chip label="Tag" color="secondary" size="small" onDelete={() => {}} />
          <Chip label="Filter" color="error" size="small" onDelete={() => {}} />
        </Box>
      ),
    },
    {
      name: 'With Icon & Delete',
      code: `<Chip label="Category" color="primary" icon={<Icon name="label" size={16} />} onDelete={() => {}} />
<Chip label="Location" color="secondary" icon={<Icon name="location_on" size={16} />} onDelete={() => {}} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Category" color="primary" size="small" icon={<Icon name="label" size={16} />} onDelete={() => {}} />
          <Chip label="Location" color="secondary" size="small" icon={<Icon name="location_on" size={16} />} onDelete={() => {}} />
        </Box>
      ),
    },
    {
      name: 'Number Badge',
      code: `<Chip label="4" color="error" size="small" />
<Chip label="12" color="primary" size="small" />
<Chip label="1" color="warning" size="small" />
<Chip label="3" color="success" size="small" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="4" color="error" size="small" />
          <Chip label="12" color="primary" size="small" />
          <Chip label="1" color="warning" size="small" />
          <Chip label="3" color="success" size="small" />
        </Box>
      ),
    },
    {
      name: 'Status Badges',
      code: `<Chip label="Open" color="primary" size="small" />
<Chip label="Overdue" color="error" size="small" />
<Chip label="Control" color="warning" size="small" />
<Chip label="Done" color="success" size="small" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Open" color="primary" size="small" />
          <Chip label="Overdue" color="error" size="small" />
          <Chip label="Control" color="warning" size="small" />
          <Chip label="Done" color="success" size="small" />
        </Box>
      ),
    },
    {
      name: 'Sizes',
      code: `<Chip label="Small" color="primary" size="small" />
<Chip label="Medium" color="primary" size="medium" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip label="Small" color="primary" size="small" />
          <Chip label="Medium" color="primary" size="medium" />
          <Chip label="Small" color="secondary" size="small" />
          <Chip label="Medium" color="secondary" size="medium" />
        </Box>
      ),
    },
    {
      name: 'Clickable',
      code: `<Chip label="Active" color="primary" size="medium" clickable />
<Chip label="Inactive" color="secondary" size="medium" clickable />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Chip label="Active" color="primary" size="medium" clickable />
          <Chip label="Inactive" color="secondary" size="medium" clickable />
          <Chip label="With Icon" color="primary" size="medium" clickable icon={<Icon name="shopping_cart" size={18} />} />
        </Box>
      ),
    },
  ],
  props: [
    { name: 'label', type: 'string', description: 'The chip label' },
    { name: 'color', type: '"primary" | "secondary" | "error" | ...', default: '"default"', description: 'The color variant' },
    { name: 'size', type: '"small" | "medium"', default: '"small"', description: 'The chip size (small: 24px, medium: 40px)' },
    { name: 'clickable', type: 'boolean', default: 'false', description: 'If true, the chip has hover/active states for interactive use' },
    { name: 'icon', type: 'ReactNode', description: 'Icon element shown before the label' },
    { name: 'onDelete', type: '() => void', description: 'If set, shows a delete icon after the label' },
  ],
});

// ─── Badge ───
registerComponent({
  id: 'badge',
  name: 'Badge',
  description: 'Badges are styled like small chips — pill-shaped with a tinted background and subtle inner shadows. They share the same visual treatment as chips.',
  category: 'data-display',
  importStatement: `import { Badge } from '@mui/material';`,
  examples: [
    {
      name: 'Color Variants',
      code: `<Badge badgeContent={4} color="primary"><Icon name="notifications" /></Badge>
<Badge badgeContent={2} color="error"><Icon name="mail" /></Badge>
<Badge badgeContent={1} color="warning"><Icon name="warning" /></Badge>
<Badge badgeContent={3} color="success"><Icon name="check_circle" /></Badge>
<Badge badgeContent={5} color="info"><Icon name="info" /></Badge>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Badge badgeContent={4} color="primary"><Icon name="notifications" /></Badge>
          <Badge badgeContent={2} color="error"><Icon name="mail" /></Badge>
          <Badge badgeContent={1} color="warning"><Icon name="warning" /></Badge>
          <Badge badgeContent={3} color="success"><Icon name="check_circle" /></Badge>
          <Badge badgeContent={5} color="info"><Icon name="info" /></Badge>
        </Box>
      ),
    },
    {
      name: 'Counts',
      code: `<Badge badgeContent={1} color="primary"><Icon name="notifications" /></Badge>
<Badge badgeContent={4} color="primary"><Icon name="notifications" /></Badge>
<Badge badgeContent={12} color="primary"><Icon name="notifications" /></Badge>
<Badge badgeContent={99} color="primary"><Icon name="notifications" /></Badge>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Badge badgeContent={1} color="primary"><Icon name="notifications" /></Badge>
          <Badge badgeContent={4} color="primary"><Icon name="notifications" /></Badge>
          <Badge badgeContent={12} color="primary"><Icon name="notifications" /></Badge>
          <Badge badgeContent={99} color="primary"><Icon name="notifications" /></Badge>
        </Box>
      ),
    },
  ],
  props: [
    { name: 'badgeContent', type: 'ReactNode', description: 'The content of the badge' },
    { name: 'color', type: '"primary" | "secondary" | "error" | ...', default: '"default"', description: 'The color of the badge' },
    { name: 'max', type: 'number', default: '99', description: 'Max count to show' },
    { name: 'invisible', type: 'boolean', default: 'false', description: 'If true, hides the badge' },
  ],
});

// ─── Toggle Button ───
registerComponent({
  id: 'toggle-button',
  name: 'Toggle Button',
  description: 'A segmented control with a sunken container. The active segment elevates with a secondary gradient and shadow. Available in small, medium, and large sizes.',
  category: 'actions',
  importStatement: `import { ToggleButton, ToggleButtonGroup } from '@mui/material';`,
  examples: [
    {
      name: 'Exclusive',
      code: `const [value, setValue] = useState('active');

<ToggleButtonGroup value={value} exclusive onChange={(_, v) => v && setValue(v)}>
  <ToggleButton value="active">Active</ToggleButton>
  <ToggleButton value="inactive">Inactive</ToggleButton>
  <ToggleButton value="other">Inactive</ToggleButton>
</ToggleButtonGroup>`,
      render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [val, setVal] = useState('active');
        return (
          <ToggleButtonGroup value={val} exclusive onChange={(_, v) => v && setVal(v)}>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="inactive">Inactive</ToggleButton>
            <ToggleButton value="other">Inactive</ToggleButton>
          </ToggleButtonGroup>
        );
      },
    },
    {
      name: 'Sizes',
      code: `<ToggleButtonGroup size="small" value="a" exclusive>
  <ToggleButton value="a">Small</ToggleButton>
  <ToggleButton value="b">Option</ToggleButton>
</ToggleButtonGroup>

<ToggleButtonGroup size="medium" value="a" exclusive>
  <ToggleButton value="a">Medium</ToggleButton>
  <ToggleButton value="b">Option</ToggleButton>
</ToggleButtonGroup>

<ToggleButtonGroup size="large" value="a" exclusive>
  <ToggleButton value="a">Large</ToggleButton>
  <ToggleButton value="b">Option</ToggleButton>
</ToggleButtonGroup>`,
      render: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
          <ToggleButtonGroup size="small" value="a" exclusive>
            <ToggleButton value="a">Small</ToggleButton>
            <ToggleButton value="b">Option</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="medium" value="a" exclusive>
            <ToggleButton value="a">Medium</ToggleButton>
            <ToggleButton value="b">Option</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup size="large" value="a" exclusive>
            <ToggleButton value="a">Large</ToggleButton>
            <ToggleButton value="b">Option</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      ),
    },
    {
      name: 'With Icons',
      code: `<ToggleButtonGroup size="small" value="list" exclusive>
  <ToggleButton value="list"><Icon name="view_list" size={18} /></ToggleButton>
  <ToggleButton value="grid"><Icon name="grid_view" size={18} /></ToggleButton>
</ToggleButtonGroup>

<ToggleButtonGroup value="left" exclusive>
  <ToggleButton value="left"><Icon name="format_align_left" size={20} /></ToggleButton>
  <ToggleButton value="center"><Icon name="format_align_center" size={20} /></ToggleButton>
  <ToggleButton value="right"><Icon name="format_align_right" size={20} /></ToggleButton>
</ToggleButtonGroup>`,
      render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [view, setView] = useState('list');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [align, setAlign] = useState('left');
        return (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup size="small" value={view} exclusive onChange={(_, v) => v && setView(v)}>
              <ToggleButton value="list"><Icon name="view_list" size={18} /></ToggleButton>
              <ToggleButton value="grid"><Icon name="grid_view" size={18} /></ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup value={align} exclusive onChange={(_, v) => v && setAlign(v)}>
              <ToggleButton value="left"><Icon name="format_align_left" size={20} /></ToggleButton>
              <ToggleButton value="center"><Icon name="format_align_center" size={20} /></ToggleButton>
              <ToggleButton value="right"><Icon name="format_align_right" size={20} /></ToggleButton>
            </ToggleButtonGroup>
          </Box>
        );
      },
    },
  ],
  props: [
    { name: 'value', type: 'string | string[]', description: 'The selected value(s)' },
    { name: 'exclusive', type: 'boolean', default: 'false', description: 'If true, only one button can be selected' },
    { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'The size of the toggle buttons' },
    { name: 'onChange', type: '(event, value) => void', description: 'Callback when selection changes' },
  ],
});

// ─── Button Group ───

function SplitButtonDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ['Export as PDF', 'Export as CSV', 'Export as XLSX'];

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button>{options[selectedIndex]}</Button>
        <Button
          onClick={() => setOpen(prev => !prev)}
          aria-label="select action"
          sx={{ px: '10px !important', minWidth: '0 !important' }}
        >
          <Icon name={open ? 'expand_less' : 'expand_more'} size={20} />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal sx={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom' }}>
            <Paper sx={{ mt: 0.5 }}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => { setSelectedIndex(index); setOpen(false); }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

function SplitButtonSecondaryDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = ['Export as PDF', 'Export as CSV', 'Export as Excel'];

  return (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef}>
        <Button>{options[selectedIndex]}</Button>
        <Button
          onClick={() => setOpen(prev => !prev)}
          aria-label="select export format"
          sx={{ px: '10px !important', minWidth: '0 !important' }}
        >
          <Icon name={open ? 'expand_less' : 'expand_more'} size={20} />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal sx={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom' }}>
            <Paper sx={{ mt: 0.5 }}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => { setSelectedIndex(index); setOpen(false); }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

registerComponent({
  id: 'button-group',
  name: 'Button Group',
  description: 'Groups related buttons together. The split button pattern combines a main action with a chevron dropdown for secondary options.',
  category: 'actions',
  importStatement: `import { Button, ButtonGroup } from '@mui/material';`,
  examples: [
    {
      name: 'Secondary Group',
      code: `<ButtonGroup variant="outlined">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`,
      render: () => (
        <ButtonGroup variant="outlined">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      ),
    },
    {
      name: 'Split Button (Primary)',
      code: `<ButtonGroup variant="contained">
  <Button>Export as PDF</Button>
  <Button onClick={handleToggle} sx={{ px: '10px', minWidth: 0 }}>
    <Icon name="expand_more" />
  </Button>
</ButtonGroup>
{/* Popper with MenuList for dropdown options */}`,
      render: () => <SplitButtonDemo />,
    },
    {
      name: 'Split Button (Secondary)',
      code: `<ButtonGroup variant="outlined">
  <Button>Export as PDF</Button>
  <Button onClick={handleToggle} sx={{ px: '10px', minWidth: 0 }}>
    <Icon name="expand_more" />
  </Button>
</ButtonGroup>`,
      render: () => <SplitButtonSecondaryDemo />,
    },
    {
      name: 'With Icons',
      code: `<ButtonGroup variant="contained">
  <Button startIcon={<Icon name="save" size={20} />}>Save</Button>
  <Button startIcon={<Icon name="send" size={20} />}>Send</Button>
</ButtonGroup>

<ButtonGroup variant="outlined">
  <Button startIcon={<Icon name="edit" size={20} />}>Edit</Button>
  <Button startIcon={<Icon name="delete" size={20} />}>Delete</Button>
</ButtonGroup>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <ButtonGroup variant="contained">
            <Button startIcon={<Icon name="save" size={20} />}>Save</Button>
            <Button startIcon={<Icon name="send" size={20} />}>Send</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <Button startIcon={<Icon name="edit" size={20} />}>Edit</Button>
            <Button startIcon={<Icon name="delete" size={20} />}>Delete</Button>
          </ButtonGroup>
        </Box>
      ),
    },
  ],
  props: [
    { name: 'variant', type: '"contained" | "outlined" | "text"', default: '"outlined"', description: 'The button group style variant' },
    { name: 'color', type: '"primary" | "secondary" | "error" | ...', default: '"primary"', description: 'The color of the button group' },
    { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'The size of the buttons' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, all buttons are disabled' },
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'The orientation of the group' },
  ],
});

// ─── Toggle Chip ───
registerComponent({
  id: 'toggle-chip',
  name: 'Toggle Chip',
  description: 'A filter chip with active/inactive toggle states. Active chips use the brand background with inner shadows, inactive chips use the secondary gradient. Supports exclusive (single) and multiple selection.',
  category: 'actions',
  importStatement: `import { ToggleChip, ToggleChipGroup } from './components/ToggleChip';`,
  examples: [
    {
      name: 'Exclusive Selection',
      code: `const [value, setValue] = useState('all');

<ToggleChipGroup value={value} exclusive onChange={(v) => setValue(v as string)}>
  <ToggleChip value="all" label="All" count={9} />
  <ToggleChip value="webshop" label="Webshop" icon="shopping_cart" count={4} />
  <ToggleChip value="prescriptions" label="Prescriptions" icon="prescriptions" count={1} />
  <ToggleChip value="reservations" label="Reservations" icon="inventory_2" count={4} />
</ToggleChipGroup>`,
      render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [val, setVal] = useState<string | string[]>('all');
        return (
          <ToggleChipGroup value={val} exclusive onChange={setVal}>
            <ToggleChip value="all" label="All" count={9} />
            <ToggleChip value="webshop" label="Webshop" icon="shopping_cart" count={4} />
            <ToggleChip value="prescriptions" label="Prescriptions" icon="prescriptions" count={1} />
            <ToggleChip value="reservations" label="Reservations" icon="inventory_2" count={4} />
          </ToggleChipGroup>
        );
      },
    },
    {
      name: 'Multiple Selection',
      code: `const [value, setValue] = useState(['webshop', 'prescriptions']);

<ToggleChipGroup value={value} onChange={(v) => setValue(v as string[])}>
  <ToggleChip value="webshop" label="Webshop" icon="shopping_cart" />
  <ToggleChip value="prescriptions" label="Prescriptions" icon="prescriptions" />
  <ToggleChip value="reservations" label="Reservations" icon="inventory_2" />
  <ToggleChip value="kiosk" label="Kiosk" icon="point_of_sale" />
</ToggleChipGroup>`,
      render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [val, setVal] = useState<string | string[]>(['webshop', 'prescriptions']);
        return (
          <ToggleChipGroup value={val} onChange={setVal}>
            <ToggleChip value="webshop" label="Webshop" icon="shopping_cart" />
            <ToggleChip value="prescriptions" label="Prescriptions" icon="prescriptions" />
            <ToggleChip value="reservations" label="Reservations" icon="inventory_2" />
            <ToggleChip value="kiosk" label="Kiosk" icon="point_of_sale" />
          </ToggleChipGroup>
        );
      },
    },
    {
      name: 'Without Icons',
      code: `const [value, setValue] = useState('today');

<ToggleChipGroup value={value} exclusive onChange={(v) => setValue(v as string)}>
  <ToggleChip value="today" label="Today" count={3} />
  <ToggleChip value="week" label="This Week" count={12} />
  <ToggleChip value="month" label="This Month" count={48} />
</ToggleChipGroup>`,
      render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [val, setVal] = useState<string | string[]>('today');
        return (
          <ToggleChipGroup value={val} exclusive onChange={setVal}>
            <ToggleChip value="today" label="Today" count={3} />
            <ToggleChip value="week" label="This Week" count={12} />
            <ToggleChip value="month" label="This Month" count={48} />
          </ToggleChipGroup>
        );
      },
    },
  ],
  props: [
    { name: 'label', type: 'string', description: 'The chip label text' },
    { name: 'value', type: 'string', description: 'Unique value for selection tracking' },
    { name: 'count', type: 'number', description: 'Optional count badge shown after the label' },
    { name: 'icon', type: 'string', description: 'Material Symbols icon name shown before the label' },
    { name: 'selected', type: 'boolean', description: 'Whether the chip is selected (managed by ToggleChipGroup)' },
  ],
});

// ─── Icon ───
registerComponent({
  id: 'icon',
  name: 'Icon',
  description: 'A lightweight wrapper around Material Symbols Rounded (Google Fonts). Supports variable font settings for weight, fill, grade, and optical size.',
  category: 'data-display',
  importStatement: `import { Icon } from './components/Icon';`,
  examples: [
    {
      name: 'Basic Icons',
      code: `<Icon name="search" />
<Icon name="notifications" />
<Icon name="add" />
<Icon name="settings" />
<Icon name="favorite" />
<Icon name="home" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Icon name="search" />
          <Icon name="notifications" />
          <Icon name="add" />
          <Icon name="settings" />
          <Icon name="favorite" />
          <Icon name="home" />
        </Box>
      ),
    },
    {
      name: 'Sizes',
      code: `<Icon name="favorite" size={16} />
<Icon name="favorite" size={24} />
<Icon name="favorite" size={32} />
<Icon name="favorite" size={48} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Icon name="favorite" size={16} />
          <Icon name="favorite" size={24} />
          <Icon name="favorite" size={32} />
          <Icon name="favorite" size={48} />
        </Box>
      ),
    },
    {
      name: 'Filled vs Outline',
      code: `{/* Outline (default) */}
<Icon name="favorite" />
<Icon name="star" />
<Icon name="visibility" />
<Icon name="check_circle" />
<Icon name="notifications" />
<Icon name="home" />

{/* Filled */}
<Icon name="favorite" filled />
<Icon name="star" filled />
<Icon name="visibility" filled />
<Icon name="check_circle" filled />
<Icon name="notifications" filled />
<Icon name="home" filled />`,
      render: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Icon name="favorite" />
            <Icon name="star" />
            <Icon name="visibility" />
            <Icon name="check_circle" />
            <Icon name="notifications" />
            <Icon name="home" />
          </Box>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Icon name="favorite" filled />
            <Icon name="star" filled />
            <Icon name="visibility" filled />
            <Icon name="check_circle" filled />
            <Icon name="notifications" filled />
            <Icon name="home" filled />
          </Box>
        </Box>
      ),
    },
    {
      name: 'Colors',
      code: `<Icon name="check_circle" color="success.main" />
<Icon name="error" color="error.main" />
<Icon name="info" color="info.main" />
<Icon name="warning" color="warning.main" />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Icon name="check_circle" color="#2e7d32" />
          <Icon name="error" color="#d32f2f" />
          <Icon name="info" color="#0288d1" />
          <Icon name="warning" color="#ed6c02" />
        </Box>
      ),
    },
    {
      name: 'With Background (Soft)',
      code: `<Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: c.brand.bgWeakest, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Icon name="star" size={18} color={c.brand.contentStrong} />
</Box>`,
      render: () => <IconBgSoftDemo />,
    },
    {
      name: 'With Background (Bright)',
      code: `<Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: c.brand.bgDefault, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Icon name="star" size={18} color={c.contentStayLight} />
</Box>`,
      render: () => <IconBgBrightDemo />,
    },
  ],
  props: [
    { name: 'name', type: 'string', description: 'The Material Symbols icon name, e.g. "search", "notifications"' },
    { name: 'size', type: 'number', default: '24', description: 'Icon size in pixels' },
    { name: 'color', type: 'string', default: '"inherit"', description: 'CSS color or theme color' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'If true, uses the filled variant' },
    { name: 'sx', type: 'SxProps', description: 'Additional MUI sx styles' },
  ],
});

/* ─────────────────────────────────────
   SearchField
   ───────────────────────────────────── */
registerComponent({
  id: 'search-field',
  name: 'SearchField',
  description: 'A search-oriented text field with a leading search icon and optional keyboard shortcut badge. Built on top of MUI TextField.',
  category: 'inputs',
  importStatement: `import { SearchField } from '@/components/SearchField';`,
  examples: [
    {
      name: 'Default',
      code: `<SearchField />`,
      render: () => <SearchField />,
    },
    {
      name: 'With Keyboard Shortcut',
      code: `<SearchField shortcut="⌘ S" globalShortcut="meta+s" />`,
      render: () => <SearchField shortcut="⌘ S" globalShortcut="meta+s" />,
    },
    {
      name: 'Custom Placeholder',
      code: `<SearchField placeholder="Find components…" shortcut="⌘ K" globalShortcut="meta+k" />`,
      render: () => <SearchField placeholder="Find components…" shortcut="⌘ K" globalShortcut="meta+k" />,
    },
    {
      name: 'Medium Size',
      code: `<SearchField size="medium" shortcut="⌘ S" />`,
      render: () => <SearchField size="medium" shortcut="⌘ S" />,
    },
    {
      name: 'Full Width',
      code: `<SearchField fullWidth shortcut="/" />`,
      render: () => <SearchField fullWidth shortcut="/" />,
    },
  ],
  props: [
    { name: 'placeholder', type: 'string', default: '"Search..."', description: 'Input placeholder text' },
    { name: 'shortcut', type: 'string', description: 'Keyboard shortcut label to display (e.g. "⌘ S")' },
    { name: 'globalShortcut', type: 'string', description: 'Register a global keyboard shortcut that focuses the field (e.g. "meta+s", "meta+k")' },
    { name: 'size', type: '"small" | "medium"', default: '"small"', description: 'Field size' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'If true, takes full container width' },
    { name: '...rest', type: 'TextFieldProps', description: 'All other MUI TextField props are forwarded' },
  ],
});

/* ─────────────────────────────────────
   Autocomplete (single + multi-select)
   ───────────────────────────────────── */
const demoStringOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

registerComponent({
  id: 'autocomplete',
  name: 'Autocomplete',
  description: 'MUI Autocomplete with single-select, multi-select (chips), and free-text search modes. Inherits TextField styling from the theme.',
  category: 'inputs',
  importStatement: `import { Autocomplete, TextField } from '@mui/material';`,
  examples: [
    {
      name: 'Sizes',
      code: `<Autocomplete
  size="small"
  options={['Apple', 'Banana', 'Cherry']}
  renderInput={(params) => <TextField {...params} label="Small" />}
  sx={{ width: 300 }}
/>
<Autocomplete
  options={['Apple', 'Banana', 'Cherry']}
  renderInput={(params) => <TextField {...params} label="Medium" />}
  sx={{ width: 300 }}
/>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Autocomplete
            size="small"
            options={demoStringOptions}
            defaultValue="Apple"
            renderInput={(params) => <TextField {...params} label="Small" />}
            sx={{ width: 300 }}
          />
          <Autocomplete
            options={demoStringOptions}
            defaultValue="Apple"
            renderInput={(params) => <TextField {...params} label="Medium" />}
            sx={{ width: 300 }}
          />
        </Box>
      ),
    },
    {
      name: 'Single Select',
      code: `<Autocomplete
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  renderInput={(params) => <TextField {...params} label="Fruit" />}
  sx={{ width: 300 }}
/>`,
      render: () => (
        <Autocomplete
          options={demoStringOptions}
          renderInput={(params) => <TextField {...params} label="Fruit" />}
          sx={{ width: 300 }}
        />
      ),
    },
    {
      name: 'Multi Select (Chips)',
      code: `<Autocomplete
  multiple
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']}
  defaultValue={['Apple', 'Cherry']}
  renderInput={(params) => <TextField {...params} label="Fruits" />}
  sx={{ width: 400 }}
/>`,
      render: () => (
        <Autocomplete
          multiple
          options={demoStringOptions}
          defaultValue={['Apple', 'Cherry']}
          renderInput={(params) => <TextField {...params} label="Fruits" />}
          sx={{ width: 400 }}
        />
      ),
    },
    {
      name: 'With Placeholder (no label)',
      code: `<Autocomplete
  options={['Apple', 'Banana', 'Cherry', 'Date']}
  renderInput={(params) => <TextField {...params} placeholder="Search fruits…" />}
  sx={{ width: 300 }}
/>`,
      render: () => (
        <Autocomplete
          options={demoStringOptions}
          renderInput={(params) => <TextField {...params} placeholder="Search fruits…" />}
          sx={{ width: 300 }}
        />
      ),
    },
    {
      name: 'Free Solo (search / custom input)',
      code: `<Autocomplete
  freeSolo
  options={['Apple', 'Banana', 'Cherry', 'Date']}
  renderInput={(params) => <TextField {...params} label="Search or type…" />}
  sx={{ width: 300 }}
/>`,
      render: () => (
        <Autocomplete
          freeSolo
          options={demoStringOptions}
          renderInput={(params) => <TextField {...params} label="Search or type…" />}
          sx={{ width: 300 }}
        />
      ),
    },
    {
      name: 'Disabled',
      code: `<Autocomplete
  disabled
  options={['Apple', 'Banana', 'Cherry']}
  defaultValue="Apple"
  renderInput={(params) => <TextField {...params} label="Disabled" />}
  sx={{ width: 300 }}
/>`,
      render: () => (
        <Autocomplete
          disabled
          options={demoStringOptions}
          defaultValue="Apple"
          renderInput={(params) => <TextField {...params} label="Disabled" />}
          sx={{ width: 300 }}
        />
      ),
    },
    {
      name: 'Multi Select with Limit Tags',
      code: `<Autocomplete
  multiple
  limitTags={2}
  options={['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']}
  defaultValue={['Apple', 'Cherry', 'Fig', 'Grape']}
  renderInput={(params) => <TextField {...params} label="Max 2 visible" />}
  sx={{ width: 400 }}
/>`,
      render: () => (
        <Autocomplete
          multiple
          limitTags={2}
          options={demoStringOptions}
          defaultValue={['Apple', 'Cherry', 'Fig', 'Grape']}
          renderInput={(params) => <TextField {...params} label="Max 2 visible" />}
          sx={{ width: 400 }}
        />
      ),
    },
  ],
  props: [
    { name: 'options', type: 'T[]', description: 'Array of options to display in the dropdown' },
    { name: 'multiple', type: 'boolean', default: 'false', description: 'If true, allows selecting multiple values (rendered as chips)' },
    { name: 'freeSolo', type: 'boolean', default: 'false', description: 'If true, allows arbitrary text input (not just from options)' },
    { name: 'limitTags', type: 'number', description: 'Max number of tags/chips visible before "+N" overflow label' },
    { name: 'defaultValue', type: 'T | T[]', description: 'Default selected value(s)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the input is disabled' },
    { name: 'renderInput', type: '(params) => ReactNode', description: 'Render function for the text field — required' },
    { name: 'onChange', type: '(event, value) => void', description: 'Callback when value changes' },
  ],
});

/* ─────────────────────────────────────
   Tabs
   ───────────────────────────────────── */
function TabsDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        <Tab label="Overview" />
        <Tab label="Features" />
        <Tab label="Pricing" />
      </Tabs>
    </Box>
  );
}

function TabsWithIconsDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        <Tab icon={<Icon name="home" size={18} />} iconPosition="start" label="Home" />
        <Tab icon={<Icon name="star" size={18} />} iconPosition="start" label="Favorites" />
        <Tab icon={<Icon name="settings" size={18} />} iconPosition="start" label="Settings" />
      </Tabs>
    </Box>
  );
}

function TabsScrollableDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)} variant="scrollable" scrollButtons="auto">
        <Tab label="Dashboard" />
        <Tab label="Analytics" />
        <Tab label="Reports" />
        <Tab label="Settings" />
        <Tab label="Integrations" />
        <Tab label="Billing" />
      </Tabs>
    </Box>
  );
}

function TabsDisabledDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        <Tab label="Active" />
        <Tab label="Also active" />
        <Tab label="Disabled" disabled />
      </Tabs>
    </Box>
  );
}

function TabsCenteredDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)} centered>
        <Tab label="First" />
        <Tab label="Second" />
        <Tab label="Third" />
      </Tabs>
    </Box>
  );
}

registerComponent({
  id: 'tabs',
  name: 'Tabs',
  description: 'Navigation tabs for switching between views. Features a gradient indicator, brand-styled active/hover states, and supports icons, scrollable, and centered variants.',
  category: 'navigation',
  importStatement: `import { Tabs, Tab } from '@mui/material';`,
  examples: [
    {
      name: 'Default',
      code: `const [value, setValue] = useState(0);

<Tabs value={value} onChange={(_, v) => setValue(v)}>
  <Tab label="Overview" />
  <Tab label="Features" />
  <Tab label="Pricing" />
</Tabs>`,
      render: () => <TabsDemo />,
    },
    {
      name: 'With Icons',
      code: `<Tabs value={value} onChange={(_, v) => setValue(v)}>
  <Tab icon={<Icon name="home" size={18} />} iconPosition="start" label="Home" />
  <Tab icon={<Icon name="star" size={18} />} iconPosition="start" label="Favorites" />
  <Tab icon={<Icon name="settings" size={18} />} iconPosition="start" label="Settings" />
</Tabs>`,
      render: () => <TabsWithIconsDemo />,
    },
    {
      name: 'Scrollable',
      code: `<Tabs value={value} onChange={(_, v) => setValue(v)} variant="scrollable" scrollButtons="auto">
  <Tab label="Dashboard" />
  <Tab label="Analytics" />
  <Tab label="Reports" />
  <Tab label="Settings" />
  <Tab label="Integrations" />
  <Tab label="Billing" />
</Tabs>`,
      render: () => <TabsScrollableDemo />,
    },
    {
      name: 'Centered',
      code: `<Tabs value={value} onChange={(_, v) => setValue(v)} centered>
  <Tab label="First" />
  <Tab label="Second" />
  <Tab label="Third" />
</Tabs>`,
      render: () => <TabsCenteredDemo />,
    },
    {
      name: 'With Disabled Tab',
      code: `<Tabs value={value} onChange={(_, v) => setValue(v)}>
  <Tab label="Active" />
  <Tab label="Also active" />
  <Tab label="Disabled" disabled />
</Tabs>`,
      render: () => <TabsDisabledDemo />,
    },
  ],
  props: [
    { name: 'value', type: 'number | string', description: 'The currently selected tab index or value' },
    { name: 'onChange', type: '(event, value) => void', description: 'Callback fired when a tab is selected' },
    { name: 'variant', type: '"standard" | "scrollable" | "fullWidth"', default: '"standard"', description: 'Layout variant' },
    { name: 'centered', type: 'boolean', default: 'false', description: 'If true, tabs are centered' },
    { name: 'scrollButtons', type: '"auto" | true | false', default: '"auto"', description: 'Show scroll buttons when tabs overflow' },
    { name: 'label', type: 'string', description: 'Tab label text (on Tab component)' },
    { name: 'icon', type: 'ReactNode', description: 'Icon element (on Tab component)' },
    { name: 'iconPosition', type: '"start" | "end" | "top" | "bottom"', default: '"top"', description: 'Icon position relative to label' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the tab is disabled' },
  ],
});

/* ─────────────────────────────────────
   Stepper
   ───────────────────────────────────── */
const stepperSteps = ['Account details', 'Personal info', 'Confirmation'];

function HorizontalStepperDemo() {
  const [active, setActive] = useState(1);
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={active}>
        {stepperSteps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', gap: 1, mt: 3, justifyContent: 'center' }}>
        <Button size="small" variant="outlined" disabled={active === 0} onClick={() => setActive(a => a - 1)}>Back</Button>
        <Button size="small" variant="contained" onClick={() => setActive(a => Math.min(a + 1, stepperSteps.length))}>
          {active === stepperSteps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

function VerticalStepperDemo() {
  const [active, setActive] = useState(1);
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={active} orientation="vertical">
        {stepperSteps.map((label, i) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {i === 0 ? 'Enter your email and password.' : i === 1 ? 'Fill in your name and address.' : 'Review and confirm your details.'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained" onClick={() => setActive(a => Math.min(a + 1, stepperSteps.length))}>
                  {i === stepperSteps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                {i > 0 && <Button size="small" variant="outlined" onClick={() => setActive(a => a - 1)}>Back</Button>}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

registerComponent({
  id: 'stepper',
  name: 'Stepper',
  description: 'A step-based navigation component for multi-step workflows. Supports horizontal and vertical orientations with brand-colored step icons.',
  category: 'navigation',
  importStatement: `import { Stepper, Step, StepLabel, StepContent } from '@mui/material';`,
  examples: [
    {
      name: 'Horizontal',
      code: `const [activeStep, setActiveStep] = useState(1);

<Stepper activeStep={activeStep}>
  <Step><StepLabel>Account details</StepLabel></Step>
  <Step><StepLabel>Personal info</StepLabel></Step>
  <Step><StepLabel>Confirmation</StepLabel></Step>
</Stepper>`,
      render: () => <HorizontalStepperDemo />,
    },
    {
      name: 'Vertical with Content',
      code: `<Stepper activeStep={activeStep} orientation="vertical">
  <Step>
    <StepLabel>Account details</StepLabel>
    <StepContent>
      <Typography variant="body2">Enter your email and password.</Typography>
      <Button size="small" variant="contained">Continue</Button>
    </StepContent>
  </Step>
  {/* more steps… */}
</Stepper>`,
      render: () => <VerticalStepperDemo />,
    },
    {
      name: 'All Completed',
      code: `<Stepper activeStep={3}>
  <Step><StepLabel>Account</StepLabel></Step>
  <Step><StepLabel>Details</StepLabel></Step>
  <Step><StepLabel>Done</StepLabel></Step>
</Stepper>`,
      render: () => (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={3}>
            {['Account', 'Details', 'Done'].map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
        </Box>
      ),
    },
  ],
  props: [
    { name: 'activeStep', type: 'number', default: '0', description: 'Index of the currently active step' },
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Layout orientation' },
    { name: 'alternativeLabel', type: 'boolean', default: 'false', description: 'If true, labels appear below the step icons' },
    { name: 'nonLinear', type: 'boolean', default: 'false', description: 'If true, allows clicking any step regardless of order' },
  ],
});

/* ─────────────────────────────────────
   Progress (Linear + Circular)
   ───────────────────────────────────── */
function LinearProgressDemo() {
  const [progress, setProgress] = useState(60);
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>Determinate ({progress}%)</Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button size="small" variant="outlined" onClick={() => setProgress(p => Math.max(0, p - 20))}>−20</Button>
        <Button size="small" variant="outlined" onClick={() => setProgress(p => Math.min(100, p + 20))}>+20</Button>
      </Box>
    </Box>
  );
}

registerComponent({
  id: 'progress',
  name: 'Progress',
  description: 'Linear and circular progress indicators with brand gradient fill and sunken track. Use for loading states, upload progress, or completion tracking.',
  category: 'feedback',
  importStatement: `import { LinearProgress, CircularProgress } from '@mui/material';`,
  examples: [
    {
      name: 'Linear — Determinate',
      code: `<LinearProgress variant="determinate" value={60} />`,
      render: () => <LinearProgressDemo />,
    },
    {
      name: 'Linear — Indeterminate',
      code: `<LinearProgress />`,
      render: () => (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ),
    },
    {
      name: 'Circular — Indeterminate',
      code: `<CircularProgress />
<CircularProgress size={24} />
<CircularProgress size={48} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <CircularProgress size={24} />
          <CircularProgress />
          <CircularProgress size={48} />
        </Box>
      ),
    },
    {
      name: 'Circular — Determinate',
      code: `<CircularProgress variant="determinate" value={25} />
<CircularProgress variant="determinate" value={50} />
<CircularProgress variant="determinate" value={75} />
<CircularProgress variant="determinate" value={100} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <CircularProgress variant="determinate" value={25} />
          <CircularProgress variant="determinate" value={50} />
          <CircularProgress variant="determinate" value={75} />
          <CircularProgress variant="determinate" value={100} />
        </Box>
      ),
    },
  ],
  props: [
    { name: 'variant', type: '"determinate" | "indeterminate" | "buffer" | "query"', default: '"indeterminate"', description: 'Progress variant' },
    { name: 'value', type: 'number', description: 'Progress value (0–100) for determinate variant' },
    { name: 'color', type: '"primary" | "secondary" | "inherit"', default: '"primary"', description: 'Color theme' },
    { name: 'size', type: 'number | string', default: '40', description: 'Size of circular progress (in px)' },
    { name: 'thickness', type: 'number', default: '3.6', description: 'Stroke thickness of circular progress' },
  ],
});

/* ─────────────────────────────────────
   Dialog
   ───────────────────────────────────── */
function BasicDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to proceed? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function FormDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>Edit Profile</Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>Update your display name and email address.</DialogContentText>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Display Name" defaultValue="Olivier" fullWidth size="small" />
            <TextField label="Email" defaultValue="olivier@lochting.com" fullWidth size="small" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function DeleteDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>Delete Item</Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will permanently delete the item and all associated data. This cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => setOpen(false)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

registerComponent({
  id: 'dialog',
  name: 'Dialog',
  description: 'Modal dialogs with brand-styled backdrop blur, rounded corners, and layered shadows. Use for confirmations, forms, and destructive actions.',
  category: 'feedback',
  importStatement: `import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';`,
  examples: [
    {
      name: 'Confirmation Dialog',
      code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogContent>
    <DialogContentText>Are you sure you want to proceed?</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="contained" onClick={() => setOpen(false)}>Confirm</Button>
  </DialogActions>
</Dialog>`,
      render: () => <BasicDialogDemo />,
    },
    {
      name: 'Form Dialog',
      code: `<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Edit Profile</DialogTitle>
  <DialogContent>
    <TextField label="Display Name" fullWidth size="small" />
    <TextField label="Email" fullWidth size="small" />
  </DialogContent>
  <DialogActions>
    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={handleClose}>Save</Button>
  </DialogActions>
</Dialog>`,
      render: () => <FormDialogDemo />,
    },
    {
      name: 'Destructive / Delete',
      code: `<Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
  <DialogTitle>Delete Item?</DialogTitle>
  <DialogContent>
    <DialogContentText>This will permanently delete the item.</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
    <Button variant="contained" color="error" onClick={handleClose}>Delete</Button>
  </DialogActions>
</Dialog>`,
      render: () => <DeleteDialogDemo />,
    },
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'If true, the dialog is open' },
    { name: 'onClose', type: '(event, reason) => void', description: 'Callback fired when the dialog requests to close' },
    { name: 'maxWidth', type: '"xs" | "sm" | "md" | "lg" | "xl" | false', default: '"sm"', description: 'Maximum width of the dialog' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'If true, dialog stretches to maxWidth' },
    { name: 'fullScreen', type: 'boolean', default: 'false', description: 'If true, dialog takes up the full screen' },
  ],
});

/* ─────────────────────────────────────
   Table
   ───────────────────────────────────── */
const tableRows = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'MED-001', stock: 142, status: 'In Stock' },
  { id: 2, name: 'Ibuprofen 400mg', sku: 'MED-002', stock: 87, status: 'In Stock' },
  { id: 3, name: 'Amoxicillin 250mg', sku: 'MED-003', stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Vitamin D3 1000IU', sku: 'SUP-010', stock: 234, status: 'In Stock' },
  { id: 5, name: 'Zinc 25mg', sku: 'SUP-011', stock: 12, status: 'Low Stock' },
];

registerComponent({
  id: 'table',
  name: 'Table',
  description: 'Data tables with themed header, hover rows, and bordered container. Integrates with the design system tokens for consistent spacing and typography.',
  category: 'data-display',
  importStatement: `import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';`,
  examples: [
    {
      name: 'Basic Table',
      code: `<TableContainer component={Paper} variant="outlined">
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Product</TableCell>
        <TableCell>SKU</TableCell>
        <TableCell align="right">Stock</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.sku}</TableCell>
          <TableCell align="right">{row.stock}</TableCell>
          <TableCell>
            <Chip label={row.status} size="small" color="secondary" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>`,
      render: () => (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={row.status === 'Out of Stock' ? 'error' : row.status === 'Low Stock' ? 'warning' : 'secondary'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ),
    },
    {
      name: 'Dense Table',
      code: `<Table size="small">
  {/* same structure as above */}
</Table>`,
      render: () => (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.slice(0, 3).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ),
    },
  ],
  props: [
    { name: 'size', type: '"small" | "medium"', default: '"medium"', description: 'Table density' },
    { name: 'stickyHeader', type: 'boolean', default: 'false', description: 'If true, header sticks on scroll' },
    { name: 'padding', type: '"normal" | "checkbox" | "none"', default: '"normal"', description: 'Cell padding' },
    { name: 'align', type: '"left" | "center" | "right"', default: '"left"', description: 'Cell text alignment (on TableCell)' },
  ],
});

/* ─────────────────────────────────────
   Pagination
   ───────────────────────────────────── */
function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} />;
}

function PaginationOutlinedDemo() {
  const [page, setPage] = useState(1);
  return <Pagination count={10} page={page} onChange={(_, p) => setPage(p)} variant="outlined" />;
}

/* Pagination variant: Classic with Previous/Next text buttons + page numbers */
function ClassicPagination() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const [page, setPage] = useState(2);
  const totalPages = 17;

  const getVisiblePages = () => {
    const pages: (number | '...')[] = [1];
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pillSx = {
    height: 36,
    borderRadius: 2,
    border: '1px solid',
    borderColor: c.borderDefault,
    bgcolor: c.bgElevated,
    fontSize: '0.8rem',
    fontWeight: 500,
    px: 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none' as const,
    transition: 'all 0.15s',
    '&:hover': { bgcolor: c.bgSunken },
  };
  const activePillSx = {
    ...pillSx,
    background: effects.gradients.primary,
    color: c.contentStayLight,
    borderColor: 'transparent',
    boxShadow: effects.shadows.primaryButton,
    '&:hover': { background: effects.gradients.primary, filter: 'brightness(1.08)' },
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
      <Box
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        sx={{ ...pillSx, opacity: page === 1 ? 0.4 : 1, pointerEvents: page === 1 ? 'none' : 'auto' }}
      >
        Previous
      </Box>
      {getVisiblePages().map((p, i) =>
        p === '...' ? (
          <Typography key={`e${i}`} variant="body2" sx={{ px: 0.5, color: c.contentTertiary }}>…</Typography>
        ) : (
          <Box key={p} onClick={() => setPage(p)} sx={{ ...(p === page ? activePillSx : pillSx), minWidth: 36 }}>
            {p}
          </Box>
        ),
      )}
      <Box
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        sx={{ ...activePillSx, pointerEvents: page === totalPages ? 'none' : 'auto', opacity: page === totalPages ? 0.4 : 1 }}
      >
        Next
      </Box>
    </Box>
  );
}

/* Pagination variant: Minimal arrows with page counter */
function MinimalPagination() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const [page, setPage] = useState(2);
  const totalPages = 17;

  const arrowBtnSx = {
    width: 40,
    height: 40,
    borderRadius: 2,
    border: '1px solid',
    borderColor: c.borderDefault,
    bgcolor: c.bgElevated,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s',
    '&:hover': { bgcolor: c.bgSunken },
  };
  const arrowBtnActiveSx = {
    ...arrowBtnSx,
    background: effects.gradients.primary,
    borderColor: 'transparent',
    boxShadow: effects.shadows.primaryButton,
    color: c.contentStayLight,
    '&:hover': { background: effects.gradients.primary, filter: 'brightness(1.08)' },
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        sx={{ ...arrowBtnSx, opacity: page === 1 ? 0.4 : 1, pointerEvents: page === 1 ? 'none' : 'auto' }}
      >
        <Icon name="arrow_back" size={18} />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500, px: 1.5, color: c.contentPrimary, minWidth: 60, textAlign: 'center' }}>
        {page} of {totalPages}
      </Typography>
      <Box
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        sx={{ ...arrowBtnActiveSx, pointerEvents: page === totalPages ? 'none' : 'auto', opacity: page === totalPages ? 0.4 : 1 }}
      >
        <Icon name="arrow_forward" size={18} color="inherit" />
      </Box>
    </Box>
  );
}

/* Pagination variant: Page size selector + arrows + counter */
function PageSizePagination() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const [page, setPage] = useState(2);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 170;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageSizes = [10, 25, 50];

  const chipSx = (active: boolean) => ({
    height: 32,
    borderRadius: 2,
    px: 1.5,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: active ? 500 : 400,
    bgcolor: active ? c.bgElevated : 'transparent',
    color: active ? c.contentPrimary : c.contentSecondary,
    boxShadow: active ? effects.shadows.secondaryButton : 'none',
    border: active ? `1px solid ${c.borderDefault}` : '1px solid transparent',
    transition: 'all 0.15s',
    userSelect: 'none' as const,
    '&:hover': { bgcolor: active ? c.bgElevated : c.bgSunken },
  });

  const arrowSx = (filled: boolean) => ({
    width: 32,
    height: 32,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s',
    ...(filled
      ? {
          background: effects.gradients.primary,
          color: c.contentStayLight,
          boxShadow: effects.shadows.primaryButton,
          '&:hover': { background: effects.gradients.primary, filter: 'brightness(1.08)' },
        }
      : {
          bgcolor: c.bgElevated,
          border: '1px solid',
          borderColor: c.borderDefault,
          '&:hover': { bgcolor: c.bgSunken },
        }),
  });

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      bgcolor: c.bgSunken,
      borderRadius: 2.5,
      px: 1,
      py: 0.75,
      border: '1px solid',
      borderColor: c.borderWeak,
    }}>
      <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center' }}>
        {pageSizes.map((s) => (
          <Box key={s} onClick={() => { setPageSize(s); setPage(1); }} sx={chipSx(pageSize === s)}>
            {pageSize === s ? `${s} Items` : s}
          </Box>
        ))}
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Box
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        sx={{ ...arrowSx(false), opacity: page === 1 ? 0.4 : 1, pointerEvents: page === 1 ? 'none' : 'auto' }}
      >
        <Icon name="chevron_left" size={18} />
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500, px: 0.5, color: c.contentPrimary, minWidth: 50, textAlign: 'center' }}>
        {page} of {totalPages}
      </Typography>
      <Box
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        sx={{ ...arrowSx(true), pointerEvents: page === totalPages ? 'none' : 'auto', opacity: page === totalPages ? 0.4 : 1 }}
      >
        <Icon name="chevron_right" size={18} color="inherit" />
      </Box>
    </Box>
  );
}

/* Pagination variant: Compact "Showing X/Y" with arrows */
function CompactPagination() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / pageSize);
  const showingEnd = Math.min(page * pageSize, totalItems);

  const arrowSx = (filled: boolean) => ({
    width: 36,
    height: 36,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s',
    ...(filled
      ? {
          background: effects.gradients.primary,
          color: c.contentStayLight,
          boxShadow: effects.shadows.primaryButton,
          '&:hover': { background: effects.gradients.primary, filter: 'brightness(1.08)' },
        }
      : {
          bgcolor: c.bgElevated,
          border: '1px solid',
          borderColor: c.borderDefault,
          '&:hover': { bgcolor: c.bgSunken },
        }),
  });

  return (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.75,
      bgcolor: c.bgSunken,
      borderRadius: 2.5,
      px: 1,
      py: 0.75,
      border: '1px solid',
      borderColor: c.borderWeak,
    }}>
      <Typography variant="body2" sx={{ fontWeight: 500, px: 1.5, color: c.contentPrimary, whiteSpace: 'nowrap' }}>
        Showing {showingEnd}/{totalItems}
      </Typography>
      <Box
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        sx={{ ...arrowSx(false), opacity: page === 1 ? 0.4 : 1, pointerEvents: page === 1 ? 'none' : 'auto' }}
      >
        <Icon name="arrow_back" size={18} />
      </Box>
      <Box
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        sx={{ ...arrowSx(true), pointerEvents: page === totalPages ? 'none' : 'auto', opacity: page === totalPages ? 0.4 : 1 }}
      >
        <Icon name="arrow_forward" size={18} color="inherit" />
      </Box>
    </Box>
  );
}

registerComponent({
  id: 'pagination',
  name: 'Pagination',
  description: 'Page navigation with brand gradient on the active page. Supports outlined and text variants, different sizes and shapes.',
  category: 'navigation',
  importStatement: `import { Pagination } from '@mui/material';`,
  examples: [
    {
      name: 'Default',
      code: `<Pagination count={10} page={page} onChange={(_, p) => setPage(p)} />`,
      render: () => <PaginationDemo />,
    },
    {
      name: 'Outlined',
      code: `<Pagination count={10} variant="outlined" />`,
      render: () => <PaginationOutlinedDemo />,
    },
    {
      name: 'Classic with Text Buttons',
      code: `// Previous | 1 | 2 | 3 | ... | 17 | Next
// Custom pill-style buttons with brand gradient on active page and Next
<ClassicPagination totalPages={17} />`,
      render: () => <ClassicPagination />,
    },
    {
      name: 'Minimal Arrows',
      code: `// ← | 2 of 17 | →
// Compact navigation with branded forward arrow
<MinimalPagination totalPages={17} />`,
      render: () => <MinimalPagination />,
    },
    {
      name: 'Page Size Selector',
      code: `// 10 Items | 25 | 50 | ‹ | 2 of 17 | ›
// Combines page size chips with navigation arrows
<PageSizePagination totalItems={170} pageSizes={[10, 25, 50]} />`,
      render: () => <PageSizePagination />,
    },
    {
      name: 'Compact Counter',
      code: `// Showing 10/100 | ← | →
// Minimal footer-style pagination with item counter
<CompactPagination totalItems={100} pageSize={10} />`,
      render: () => <CompactPagination />,
    },
    {
      name: 'Sizes',
      code: `<Pagination count={5} size="small" />
<Pagination count={5} size="medium" />
<Pagination count={5} size="large" />`,
      render: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Pagination count={5} size="small" defaultPage={2} />
          <Pagination count={5} size="medium" defaultPage={2} />
          <Pagination count={5} size="large" defaultPage={2} />
        </Box>
      ),
    },
    {
      name: 'Rounded',
      code: `<Pagination count={10} shape="rounded" variant="outlined" />`,
      render: () => <Pagination count={10} shape="rounded" variant="outlined" defaultPage={3} />,
    },
  ],
  props: [
    { name: 'count', type: 'number', description: 'Total number of pages' },
    { name: 'page', type: 'number', description: 'Current page (controlled)' },
    { name: 'defaultPage', type: 'number', default: '1', description: 'Default page (uncontrolled)' },
    { name: 'onChange', type: '(event, page) => void', description: 'Callback when page changes' },
    { name: 'variant', type: '"text" | "outlined"', default: '"text"', description: 'Visual variant' },
    { name: 'shape', type: '"circular" | "rounded"', default: '"circular"', description: 'Item shape' },
    { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'Pagination size' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, all items are disabled' },
  ],
});

/* ─────────────────────────────────────
   Accordion
   ───────────────────────────────────── */
registerComponent({
  id: 'accordion',
  name: 'Accordion',
  description: 'Expandable content panels with rounded borders, themed header and expand icon. Great for FAQs, settings, and collapsible sections.',
  category: 'surfaces',
  importStatement: `import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';`,
  examples: [
    {
      name: 'Default',
      code: `<Accordion>
  <AccordionSummary expandIcon={<Icon name="expand_more" />}>
    <Typography>What is the Design System?</Typography>
  </AccordionSummary>
  <AccordionDetails>
    A collection of reusable components, tokens, and guidelines…
  </AccordionDetails>
</Accordion>`,
      render: () => (
        <Box sx={{ width: '100%' }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<Icon name="expand_more" />}>
              <Typography variant="body2" fontWeight={500}>What is the Design System?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              A collection of reusable components, design tokens, and guidelines that ensure visual consistency across all Lochting and Medipim products.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<Icon name="expand_more" />}>
              <Typography variant="body2" fontWeight={500}>How do I install it?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Import the theme provider and wrap your application. All standard MUI components will automatically inherit the design system styling.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<Icon name="expand_more" />}>
              <Typography variant="body2" fontWeight={500}>Can I customize the brand colors?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Yes! The design system supports multiple brands. Switch between Lochting and Medipim using the brand switcher, or create your own brand tokens.
            </AccordionDetails>
          </Accordion>
        </Box>
      ),
    },
    {
      name: 'Disabled',
      code: `<Accordion disabled>
  <AccordionSummary expandIcon={<Icon name="expand_more" />}>
    <Typography>Disabled Section</Typography>
  </AccordionSummary>
  <AccordionDetails>This content is hidden.</AccordionDetails>
</Accordion>`,
      render: () => (
        <Box sx={{ width: '100%' }}>
          <Accordion>
            <AccordionSummary expandIcon={<Icon name="expand_more" />}>
              <Typography variant="body2" fontWeight={500}>Enabled Section</Typography>
            </AccordionSummary>
            <AccordionDetails>This section is interactive.</AccordionDetails>
          </Accordion>
          <Accordion disabled>
            <AccordionSummary expandIcon={<Icon name="expand_more" />}>
              <Typography variant="body2" fontWeight={500}>Disabled Section</Typography>
            </AccordionSummary>
            <AccordionDetails>This content is hidden.</AccordionDetails>
          </Accordion>
        </Box>
      ),
    },
  ],
  props: [
    { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'If true, starts expanded' },
    { name: 'expanded', type: 'boolean', description: 'Controlled expanded state' },
    { name: 'onChange', type: '(event, expanded) => void', description: 'Callback when expand/collapse' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the accordion is disabled' },
    { name: 'disableGutters', type: 'boolean', default: 'false', description: 'Removes extra padding when expanded' },
  ],
});

/* ─────────────────────────────────────
   Card (Elevated, Sunken, Base/Border, Feedback)
   ───────────────────────────────────── */
function ElevatedCardDemo() {
  const { brand } = useBrand();
  const c = brand.colors;
  return (
    <Card sx={{
      bgcolor: c.bgElevated,
      borderRadius: 3,
      boxShadow: `0 2px 12px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.04)`,
      p: 0, maxWidth: 320,
    }}>
      <CardHeader
        title="Elevated Card"
        subheader="Floating surface with shadow"
        titleTypographyProps={{ variant: 'body1', fontWeight: 500 }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Use for content that should appear lifted above the page, like modals, popovers, and elevated sections.
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" variant="outlined">Learn More</Button>
      </CardActions>
    </Card>
  );
}

function SunkenCardDemo() {
  const { brand } = useBrand();
  const c = brand.colors;
  return (
    <Card sx={{
      bgcolor: c.bgSunken,
      borderRadius: 3,
      boxShadow: 'none',
      border: `1px solid ${c.borderWeak}`,
      p: 0, maxWidth: 320,
    }}>
      <CardHeader
        title="Sunken Card"
        subheader="Flat inset surface"
        titleTypographyProps={{ variant: 'body1', fontWeight: 500 }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Use for content wells, input containers, or background sections that feel recessed into the page.
        </Typography>
      </CardContent>
    </Card>
  );
}

function BorderCardDemo() {
  const { brand } = useBrand();
  const c = brand.colors;
  return (
    <Card sx={{
      bgcolor: c.bgBase,
      borderRadius: 3,
      border: `1px solid ${c.borderDefault}`,
      boxShadow: 'none',
      p: 0, maxWidth: 320,
    }}>
      <CardHeader
        title="Base / Border Card"
        subheader="Flat surface with border"
        titleTypographyProps={{ variant: 'body1', fontWeight: 500 }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Use for standard content containers, list items, and neutral sections that need clear boundaries.
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small" variant="contained">Action</Button>
        <Button size="small" variant="text">Cancel</Button>
      </CardActions>
    </Card>
  );
}

function FeedbackCardDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <Alert severity="success" variant="outlined">
        Your changes have been saved successfully.
      </Alert>
      <Alert severity="info" variant="outlined">
        A new version is available. Refresh to update.
      </Alert>
      <Alert severity="warning" variant="outlined">
        Your subscription will expire in 3 days.
      </Alert>
      <Alert severity="error" variant="outlined">
        Failed to save changes. Please try again.
      </Alert>
    </Box>
  );
}

registerComponent({
  id: 'card',
  name: 'Card',
  description: 'Surface containers in three variants: Elevated (shadow), Sunken (inner shadow), and Base/Border (flat with border). Built with Box/Card + design system tokens.',
  category: 'surfaces',
  importStatement: `import { Card, CardContent, CardActions, CardHeader } from '@mui/material';`,
  examples: [
    {
      name: 'Elevated',
      code: `<Card sx={{ bgcolor: 'bgElevated', borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
  <CardHeader title="Elevated Card" subheader="Floating surface with shadow" />
  <CardContent>
    <Typography variant="body2">Lifted above the page…</Typography>
  </CardContent>
  <CardActions>
    <Button size="small" variant="outlined">Learn More</Button>
  </CardActions>
</Card>`,
      render: () => <ElevatedCardDemo />,
    },
    {
      name: 'Sunken',
      code: `<Card sx={{ bgcolor: 'bgSunken', borderRadius: 3, boxShadow: 'none', border: '1px solid borderWeak' }}>
  <CardHeader title="Sunken Card" subheader="Flat inset surface" />
  <CardContent>
    <Typography variant="body2">Recessed into the page…</Typography>
  </CardContent>
</Card>`,
      render: () => <SunkenCardDemo />,
    },
    {
      name: 'Base / Border',
      code: `<Card sx={{ bgcolor: 'bgBase', borderRadius: 3, border: '1px solid borderDefault', boxShadow: 'none' }}>
  <CardHeader title="Base Card" subheader="Flat with border" />
  <CardContent>
    <Typography variant="body2">Standard container…</Typography>
  </CardContent>
  <CardActions>
    <Button size="small" variant="contained">Action</Button>
  </CardActions>
</Card>`,
      render: () => <BorderCardDemo />,
    },
  ],
  props: [
    { name: 'sx', type: 'SxProps', description: 'Style overrides — use design tokens (bgElevated, bgSunken, etc.)' },
    { name: 'variant', type: '"elevation" | "outlined"', default: '"elevation"', description: 'Card variant' },
    { name: 'elevation', type: 'number', default: '1', description: 'Shadow depth (0–24)' },
  ],
});

// ─── Alert ───
registerComponent({
  id: 'alert',
  name: 'Alert',
  description: 'System feedback banners for success, info, warning, and error states. Uses semantic background and border colors from the design system with Material Symbols Rounded icons.',
  category: 'feedback',
  importStatement: `import { Alert } from '@mui/material';`,
  examples: [
    {
      name: 'Outlined',
      code: `<Alert severity="success" variant="outlined">Your changes have been saved successfully.</Alert>
<Alert severity="info" variant="outlined">A new version is available. Refresh to update.</Alert>
<Alert severity="warning" variant="outlined">Your subscription will expire in 3 days.</Alert>
<Alert severity="error" variant="outlined">Failed to save changes. Please try again.</Alert>`,
      render: () => <FeedbackCardDemo />,
    },
    {
      name: 'Filled',
      code: `<Alert severity="success" variant="filled">Changes saved.</Alert>
<Alert severity="info" variant="filled">New version available.</Alert>
<Alert severity="warning" variant="filled">Subscription expiring.</Alert>
<Alert severity="error" variant="filled">Save failed.</Alert>`,
      render: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Alert severity="success" variant="filled">Changes saved.</Alert>
          <Alert severity="info" variant="filled">New version available.</Alert>
          <Alert severity="warning" variant="filled">Subscription expiring.</Alert>
          <Alert severity="error" variant="filled">Save failed.</Alert>
        </Box>
      ),
    },
    {
      name: 'Standard',
      code: `<Alert severity="success">Changes saved.</Alert>
<Alert severity="info">New version available.</Alert>
<Alert severity="warning">Subscription expiring.</Alert>
<Alert severity="error">Save failed.</Alert>`,
      render: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Alert severity="success">Changes saved.</Alert>
          <Alert severity="info">New version available.</Alert>
          <Alert severity="warning">Subscription expiring.</Alert>
          <Alert severity="error">Save failed.</Alert>
        </Box>
      ),
    },
  ],
  props: [
    { name: 'severity', type: '"success" | "info" | "warning" | "error"', description: 'The severity level — controls icon, color, and styling' },
    { name: 'variant', type: '"outlined" | "filled" | "standard"', default: '"outlined"', description: 'Alert visual variant' },
    { name: 'onClose', type: '() => void', description: 'If set, shows a close button and fires this callback' },
    { name: 'icon', type: 'ReactNode | false', description: 'Override the default icon, or set to false to remove it' },
    { name: 'action', type: 'ReactNode', description: 'Custom action element (e.g. a button) shown at the end' },
  ],
});

/* ═══════════════════════════════════════════════════════════════════
   Date & Time Pickers
   ═══════════════════════════════════════════════════════════════════ */

function DatePickerDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 360 }}>
      <DatePicker
        label="Select a date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
}

function DatePickerDisabledDemo() {
  return (
    <DatePicker label="Disabled" disabled defaultValue={dayjs()} />
  );
}

function DatePickerViewsDemo() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 360 }}>
      <DatePicker
        label="Month & Year only"
        views={['month', 'year']}
        defaultValue={dayjs()}
      />
      <DatePicker
        label="Year only"
        views={['year']}
        defaultValue={dayjs()}
      />
    </Box>
  );
}

function StaticDatePickerDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ maxWidth: 360 }}>
      <StaticDatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
}

function DateCalendarDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ maxWidth: 340 }}>
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
}

registerComponent({
  id: 'date-picker',
  name: 'Date Picker',
  description: 'Date selection components with calendar popover. Supports various views (day, month, year), validation, and both interactive and static modes. Uses the design system\'s gradient + shadow styling for selected states.',
  category: 'inputs',
  importStatement: `import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';`,
  examples: [
    {
      name: 'Sizes',
      code: `<DatePicker
  label="Small"
  slotProps={{ textField: { size: 'small' } }}
  defaultValue={dayjs()}
/>
<DatePicker
  label="Medium"
  defaultValue={dayjs()}
/>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <DatePicker label="Small" slotProps={{ textField: { size: 'small' } }} defaultValue={dayjs()} />
          <DatePicker label="Medium" defaultValue={dayjs()} />
        </Box>
      ),
    },
    {
      name: 'Default',
      code: `<DatePicker
  label="Select a date"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,
      render: () => <DatePickerDemo />,
    },
    {
      name: 'Custom Views',
      code: `<DatePicker
  label="Month & Year only"
  views={['month', 'year']}
  defaultValue={dayjs()}
/>
<DatePicker
  label="Year only"
  views={['year']}
  defaultValue={dayjs()}
/>`,
      render: () => <DatePickerViewsDemo />,
    },
    {
      name: 'Disabled',
      code: `<DatePicker label="Disabled" disabled defaultValue={dayjs()} />`,
      render: () => <DatePickerDisabledDemo />,
    },
    {
      name: 'Inline Calendar',
      code: `<DateCalendar
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,
      render: () => <DateCalendarDemo />,
    },
    {
      name: 'Static (Embedded)',
      code: `<StaticDatePicker
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,
      render: () => <StaticDatePickerDemo />,
    },
  ],
  props: [
    { name: 'value', type: 'Dayjs | null', description: 'The selected date value' },
    { name: 'onChange', type: '(value: Dayjs | null) => void', description: 'Callback fired when the value changes' },
    { name: 'defaultValue', type: 'Dayjs', description: 'Default value for uncontrolled usage' },
    { name: 'label', type: 'string', description: 'Label for the text field' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the picker is disabled' },
    { name: 'views', type: "('day' | 'month' | 'year')[]", description: 'Array of views available for selection' },
    { name: 'disablePast', type: 'boolean', default: 'false', description: 'Disable dates before today' },
    { name: 'disableFuture', type: 'boolean', default: 'false', description: 'Disable dates after today' },
    { name: 'minDate', type: 'Dayjs', description: 'Minimum selectable date' },
    { name: 'maxDate', type: 'Dayjs', description: 'Maximum selectable date' },
  ],
});


/* ─── Time Picker ─── */

function TimePickerDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ maxWidth: 360 }}>
      <TimePicker
        label="Select a time"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
}

function TimePickerSecondsDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ maxWidth: 360 }}>
      <TimePicker
        label="With seconds"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        views={['hours', 'minutes', 'seconds']}
      />
    </Box>
  );
}

function TimePickerDisabledDemo() {
  return (
    <Box sx={{ maxWidth: 360 }}>
      <TimePicker label="Disabled" disabled defaultValue={dayjs()} />
    </Box>
  );
}

registerComponent({
  id: 'time-picker',
  name: 'Time Picker',
  description: 'Time selection components with clock popover or digital input. Supports hours, minutes, and seconds views. Uses the design system\'s gradient styling for selected clock numbers.',
  category: 'inputs',
  importStatement: `import { TimePicker } from '@mui/x-date-pickers/TimePicker';`,
  examples: [
    {
      name: 'Sizes',
      code: `<TimePicker label="Small" slotProps={{ textField: { size: 'small' } }} defaultValue={dayjs()} />
<TimePicker label="Medium" defaultValue={dayjs()} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <TimePicker label="Small" slotProps={{ textField: { size: 'small' } }} defaultValue={dayjs()} />
          <TimePicker label="Medium" defaultValue={dayjs()} />
        </Box>
      ),
    },
    {
      name: 'Default',
      code: `<TimePicker
  label="Select a time"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,
      render: () => <TimePickerDemo />,
    },
    {
      name: 'With Seconds',
      code: `<TimePicker
  label="With seconds"
  value={value}
  onChange={(newValue) => setValue(newValue)}
  views={['hours', 'minutes', 'seconds']}
/>`,
      render: () => <TimePickerSecondsDemo />,
    },
    {
      name: 'Disabled',
      code: `<TimePicker label="Disabled" disabled defaultValue={dayjs()} />`,
      render: () => <TimePickerDisabledDemo />,
    },
  ],
  props: [
    { name: 'value', type: 'Dayjs | null', description: 'The selected time value' },
    { name: 'onChange', type: '(value: Dayjs | null) => void', description: 'Callback fired when the value changes' },
    { name: 'defaultValue', type: 'Dayjs', description: 'Default value for uncontrolled usage' },
    { name: 'label', type: 'string', description: 'Label for the text field' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the picker is disabled' },
    { name: 'views', type: "('hours' | 'minutes' | 'seconds')[]", description: 'Array of views available' },
    { name: 'ampm', type: 'boolean', description: 'Use 12-hour or 24-hour format' },
  ],
});


/* ─── DateTime Picker ─── */

function DateTimePickerDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ maxWidth: 360 }}>
      <DateTimePicker
        label="Select date & time"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </Box>
  );
}

function DateTimePickerDisablePastDemo() {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <Box sx={{ maxWidth: 360 }}>
      <DateTimePicker
        label="Future only"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        disablePast
      />
    </Box>
  );
}

function DateTimePickerDisabledDemo() {
  return (
    <Box sx={{ maxWidth: 360 }}>
      <DateTimePicker label="Disabled" disabled defaultValue={dayjs()} />
    </Box>
  );
}

registerComponent({
  id: 'datetime-picker',
  name: 'Date Time Picker',
  description: 'Combined date and time selection in a single input. Switches between calendar and clock views. The design system applies consistent gradient styling across all picker views.',
  category: 'inputs',
  importStatement: `import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';`,
  examples: [
    {
      name: 'Sizes',
      code: `<DateTimePicker label="Small" slotProps={{ textField: { size: 'small' } }} defaultValue={dayjs()} />
<DateTimePicker label="Medium" defaultValue={dayjs()} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <DateTimePicker label="Small" slotProps={{ textField: { size: 'small' } }} defaultValue={dayjs()} />
          <DateTimePicker label="Medium" defaultValue={dayjs()} />
        </Box>
      ),
    },
    {
      name: 'Default',
      code: `<DateTimePicker
  label="Select date & time"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>`,
      render: () => <DateTimePickerDemo />,
    },
    {
      name: 'Disable Past',
      code: `<DateTimePicker
  label="Future only"
  value={value}
  onChange={(newValue) => setValue(newValue)}
  disablePast
/>`,
      render: () => <DateTimePickerDisablePastDemo />,
    },
    {
      name: 'Disabled',
      code: `<DateTimePicker label="Disabled" disabled defaultValue={dayjs()} />`,
      render: () => <DateTimePickerDisabledDemo />,
    },
  ],
  props: [
    { name: 'value', type: 'Dayjs | null', description: 'The selected date-time value' },
    { name: 'onChange', type: '(value: Dayjs | null) => void', description: 'Callback fired when the value changes' },
    { name: 'defaultValue', type: 'Dayjs', description: 'Default value for uncontrolled usage' },
    { name: 'label', type: 'string', description: 'Label for the text field' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the picker is disabled' },
    { name: 'disablePast', type: 'boolean', default: 'false', description: 'Disable past dates and times' },
    { name: 'disableFuture', type: 'boolean', default: 'false', description: 'Disable future dates and times' },
    { name: 'views', type: "('year' | 'month' | 'day' | 'hours' | 'minutes')[]", description: 'Available views' },
  ],
});

/* ═══════════════════════════════════════════════════════════════════════
   NAVIGATION COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Sidebar Demo helpers ─── */

function SidebarBasicDemo() {
  const [active, setActive] = useState('Dashboard');
  return (
    <Box sx={{ height: 480, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'clip' }}>
      <AppSidebar
        logo={<Typography variant="h6" sx={{ fontWeight: 500 }}>Lochting</Typography>}
        showSearch
        sections={[
          {
            title: 'Overview',
            items: [
              { label: 'Dashboard', icon: 'dashboard', active: active === 'Dashboard', onClick: () => setActive('Dashboard') },
              { label: 'Notifications', icon: 'notifications', badge: 3, active: active === 'Notifications', onClick: () => setActive('Notifications') },
              { label: 'Analytics', icon: 'analytics', active: active === 'Analytics', onClick: () => setActive('Analytics') },
            ],
          },
          {
            title: 'Content',
            items: [
              { label: 'Products', icon: 'inventory_2', active: active === 'Products', onClick: () => setActive('Products') },
              { label: 'Media', icon: 'image', active: active === 'Media', onClick: () => setActive('Media') },
              { label: 'Categories', icon: 'category', expandable: true, active: active === 'Categories', onClick: () => setActive('Categories') },
            ],
          },
          {
            title: 'Channels',
            items: [
              { label: 'Webshops', icon: 'storefront', active: active === 'Webshops', onClick: () => setActive('Webshops') },
              { label: 'Presentations', icon: 'slideshow', active: active === 'Presentations', onClick: () => setActive('Presentations') },
            ],
          },
        ]}
      />
    </Box>
  );
}

function SidebarWithExtraNavDemo() {
  const [active, setActive] = useState('Countries & languages');
  const [expanded, setExpanded] = useState<string | null>('Localisation');
  return (
    <Box sx={{ height: 520, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'clip', display: 'flex' }}>
      <AppSidebar
        logo={<Typography variant="h6" sx={{ fontWeight: 500 }}>Lochting</Typography>}
        showSearch
        expandedItem={expanded}
        onExpandedChange={setExpanded}
        sections={[
          {
            title: 'Overview',
            items: [
              { label: 'Dashboard', icon: 'dashboard', onClick: () => { setActive('Dashboard'); setExpanded(null); } },
              { label: 'Notifications', icon: 'notifications', badge: 3, onClick: () => { setActive('Notifications'); setExpanded(null); } },
            ],
          },
          {
            title: 'Settings',
            items: [
              {
                label: 'Localisation',
                icon: 'language',
                children: [
                  { label: 'Countries & languages', icon: 'public', active: active === 'Countries & languages', onClick: () => setActive('Countries & languages') },
                  { label: 'CMS', icon: 'article', active: active === 'CMS', onClick: () => setActive('CMS') },
                  { label: 'CMS Tags', icon: 'label', active: active === 'CMS Tags', onClick: () => setActive('CMS Tags') },
                  { label: 'Quality labels', icon: 'verified', active: active === 'Quality labels', onClick: () => setActive('Quality labels') },
                  { label: 'Search synonyms', icon: 'search', active: active === 'Search synonyms', onClick: () => setActive('Search synonyms') },
                  { label: 'Sources & settings', icon: 'tune', active: active === 'Sources & settings', onClick: () => setActive('Sources & settings') },
                  { label: 'Translation management', icon: 'translate', active: active === 'Translation management', onClick: () => setActive('Translation management') },
                ],
              },
              {
                label: 'Users & roles',
                icon: 'group',
                children: [
                  { label: 'Users', icon: 'person', active: active === 'Users', onClick: () => setActive('Users') },
                  { label: 'Roles', icon: 'admin_panel_settings', active: active === 'Roles', onClick: () => setActive('Roles') },
                  { label: 'Permissions', icon: 'lock', active: active === 'Permissions', onClick: () => setActive('Permissions') },
                ],
              },
              { label: 'General', icon: 'settings', onClick: () => { setActive('General'); setExpanded(null); } },
            ],
          },
        ]}
      />
    </Box>
  );
}

function SidebarMinimalDemo() {
  const [active, setActive] = useState('Home');
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const isDark = effects.mode === 'dark';
  const activeBg = isDark ? c.brand500 : c.brand100;
  const activeItemSx = {
    '&.Mui-selected': {
      background: activeBg,
      backgroundColor: activeBg,
      color: isDark ? c.brand200 : c.brand450,
      border: '1px solid transparent',
      boxShadow: 'none',
      borderRadius: '12px',
      '&:hover': {
        background: activeBg,
        backgroundColor: activeBg,
        filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
      },
      '& .MuiListItemIcon-root': {
        color: isDark ? c.brand200 : c.brand450,
      },
    },
  };

  return (
    <Box sx={{ height: 320, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'clip' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          '& .MuiDrawer-paper': { width: 240, position: 'relative', height: '100%' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">My App</Typography>
        </Box>
        <List disablePadding sx={{ px: 1 }}>
          <ListSubheader disableSticky>Main</ListSubheader>
          {['Home', 'Settings', 'Profile'].map((label) => (
            <ListItemButton
              key={label}
              selected={active === label}
              onClick={() => setActive(label)}
              sx={{ my: 0.25, ...activeItemSx }}
            >
              <ListItemIcon>
                <Icon name={label === 'Home' ? 'home' : label === 'Settings' ? 'settings' : 'person'} size={20} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

function SidebarWithBadgesDemo() {
  const [active, setActive] = useState('Inbox');
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const isDark = effects.mode === 'dark';
  const activeBg = isDark ? c.brand500 : c.brand100;
  const activeItemSx = {
    '&.Mui-selected': {
      background: activeBg,
      backgroundColor: activeBg,
      color: isDark ? c.brand200 : c.brand450,
      border: '1px solid transparent',
      boxShadow: 'none',
      borderRadius: '12px',
      '&:hover': {
        background: activeBg,
        backgroundColor: activeBg,
        filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
      },
      '& .MuiListItemIcon-root': {
        color: isDark ? c.brand200 : c.brand450,
      },
    },
  };

  return (
    <Box sx={{ height: 360, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'clip' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 256,
          '& .MuiDrawer-paper': { width: 256, position: 'relative', height: '100%' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Mail</Typography>
        </Box>
        <List disablePadding sx={{ px: 1 }}>
          <ListSubheader disableSticky>Folders</ListSubheader>
          {[
            { label: 'Inbox', icon: 'inbox', badge: 12 },
            { label: 'Sent', icon: 'send' },
            { label: 'Drafts', icon: 'draft', badge: 2 },
            { label: 'Spam', icon: 'report', badge: 99 },
            { label: 'Trash', icon: 'delete' },
          ].map((item) => (
            <ListItemButton
              key={item.label}
              selected={active === item.label}
              onClick={() => setActive(item.label)}
              sx={{ my: 0.25, ...activeItemSx }}
            >
              <ListItemIcon>
                <Icon name={item.icon} size={20} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
              {item.badge != null && (
                <Chip label={item.badge} size="small" color="primary" variant="outlined" sx={{ height: 22, minWidth: 22, fontSize: '0.7rem', fontWeight: 500 }} />
              )}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

function ContextSidebarDemo() {
  const [activeMode, setActiveMode] = useState<string>('design-system');
  const [active, setActive] = useState('Design Rules');
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const isDark = effects.mode === 'dark';
  const activeBg = isDark ? c.brand500 : c.brand100;
  const activeColor = isDark ? c.brand200 : c.brand450;
  const hoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const stripBg = isDark ? c.bgDeep : c.bgSunken;
  const activeItemSx = {
    borderRadius: '12px',
    '&.Mui-selected': {
      background: activeBg, backgroundColor: activeBg, color: activeColor,
      border: '1px solid transparent', boxShadow: 'none', borderRadius: '12px',
      '&:hover': { background: activeBg, backgroundColor: activeBg, filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)' },
      '& .MuiListItemIcon-root': { color: activeColor },
    },
  };

  const modes = [
    { id: 'components', label: 'Components', icon: 'widgets' },
    { id: 'theme', label: 'Theme', icon: 'palette' },
    { id: 'design-system', label: 'Design System', icon: 'design_services' },
    { id: 'playground', label: 'Playground', icon: 'science' },
    { id: 'prototypes', label: 'Prototypes', icon: 'article' },
  ];

  const contextItems: Record<string, { label: string; sections: { title?: string; items: { label: string; icon: string }[] }[] }> = {
    components: { label: 'COMPONENTS', sections: [{ title: 'ACTIONS', items: [{ label: 'Button', icon: 'smart_button' }, { label: 'Toggle Button', icon: 'toggle_on' }] }, { title: 'INPUTS', items: [{ label: 'TextField', icon: 'input' }, { label: 'Select', icon: 'arrow_drop_down_circle' }] }] },
    theme: { label: 'THEME', sections: [{ items: [{ label: 'Overview', icon: 'dashboard' }, { label: 'Colors & Palettes', icon: 'palette' }, { label: 'Typography', icon: 'text_fields' }] }] },
    'design-system': { label: 'DESIGN SYSTEM', sections: [{ items: [{ label: 'Overview', icon: 'dashboard' }, { label: 'Design Rules', icon: 'rule' }, { label: 'Patterns', icon: 'pattern' }, { label: 'Consistency', icon: 'verified' }] }, { title: 'STYLE CONTROL', items: [{ label: 'Style Overrides', icon: 'tune' }, { label: 'Exception Registry', icon: 'playlist_remove' }] }] },
    playground: { label: 'PLAYGROUND', sections: [{ items: [{ label: 'Overview', icon: 'dashboard' }, { label: 'Component Lab', icon: 'science' }] }] },
    prototypes: { label: 'PROTOTYPES', sections: [{ items: [{ label: 'Overview', icon: 'dashboard' }, { label: 'Medipim SaaS', icon: 'web' }] }] },
  };

  const ctx = contextItems[activeMode];

  return (
    <Box sx={{ height: 460, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'clip', display: 'flex' }}>
      {/* ── Mode Strip (icon rail) ── */}
      <Box sx={{
        width: 56, flexShrink: 0, height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'stretch', bgcolor: stripBg, borderRight: '1px solid', borderColor: 'divider',
      }}>
        {/* Logo */}
        <Box sx={{ width: '100%', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <svg width="16" height="24" viewBox="0 0 22 32" fill="none">
            <path d="M21.828 4.656c-.084-1.753-.817-3.334-2.49-3.988l-.015-.01-.04-.015a.605.605 0 0 0-.118-.05l-.038-.01c-1.77-.72-3.652-.808-5.446-.07-1.957.804-3.524 2.315-4.8 3.973-3.069 3.998-4.859 9.11-5.64 14.059-.404 2.567-.555 5.196-.105 7.77-1.074 1.364-2.063 2.718-3.087 4.044-.513.666.404 1.61.925.937 1.035-1.344 2.037-2.711 3.025-4.088.087-.01.171-.036.248-.077 2.611-1.388 5.081-3.03 7.376-4.9 1.105-.895 2.17-1.842 3.195-2.839.945-.928 1.954-1.89 2.72-2.975 1.245-1.811 2.257-3.774 3.01-5.841.692-1.86 1.267-3.914 1.17-5.92ZM17.736 1.5c-1.956 1.959-2.941 3.903-3.958 5.833-.297-1.834-.551-3.668-.816-5.494A8.814 8.814 0 0 1 17.736 1.5ZM12.739 2.526c.313 2.189.609 4.38 1.001 6.555.008.04.02.08.038.118-.737 1.358-1.49 2.706-2.258 4.045-.594-2.437-1.522-4.797-2.026-7.26a.494.494 0 0 0-.047-.152 14.868 14.868 0 0 1 3.292-3.306ZM6.059 12.765a31.64 31.64 0 0 1 2.402-5.396c.641 2.538 1.608 4.997 2.074 7.563-1.817 3.077-3.732 6.093-5.746 9.048-.178.26-.364.512-.543.764-.411-4.004.516-8.243 1.813-11.976v-.003ZM11.281 20.9a44.685 44.685 0 0 1-5.478 3.886c1.256-1.827 2.474-3.679 3.652-5.556 1.46-.116 2.9-.398 4.351-.611A41.35 41.35 0 0 1 11.28 20.9Zm5.315-5.295a9.32 9.32 0 0 1-1.264 1.5c-1.674.153-3.327.51-4.996.711.014-1.661 1.002-3.343 1.964-5.043 1.736-.136 3.465-.352 5.2-.503a24.174 24.174 0 0 1-1.904 3.335Zm2.748-5.292a10.7 10.7 0 0 1-.242.591h-.042c-1.659.129-3.312.332-4.968.483.547-.987 1.086-1.98 1.614-2.977 1.132-2.133 2.225-4.287 3.278-6.462.176.503 1.522 1.785 1.534 2.999.017 1.836-.528 3.668-1.174 5.369v-.003Z" fill={c.contentPrimary} />
          </svg>
        </Box>
        {modes.map(mode => {
          const isActive = activeMode === mode.id;
          return (
            <Tooltip key={mode.id} title={mode.label} placement="right" arrow>
              <Box
                onClick={() => { setActiveMode(mode.id); setActive(contextItems[mode.id].sections[0].items[0].label); }}
                sx={{
                  width: '100%', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  color: isActive ? activeColor : 'text.secondary',
                  bgcolor: isActive ? activeBg : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease-out, color 0.15s ease-out',
                  '&:hover': { bgcolor: isActive ? activeBg : hoverBg },
                }}
              >
                {isActive && (
                  <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, bgcolor: activeColor }} />
                )}
                <Icon name={mode.icon} size={32} />
              </Box>
            </Tooltip>
          );
        })}
        <Box sx={{ flex: 1 }} />
        <Divider />
        <Tooltip title="Settings" placement="right" arrow>
          <Box
            sx={{
              width: '100%', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'text.secondary', cursor: 'pointer',
              '&:hover': { bgcolor: hoverBg },
            }}
          >
            <Icon name="settings" size={32} />
          </Box>
        </Tooltip>
      </Box>

      {/* ── Context Panel ── */}
      <Box sx={{ width: 220, height: '100%', bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography variant="overline" sx={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', color: 'text.secondary' }}>
            {ctx.label}
          </Typography>
        </Box>
        {ctx.sections.map((section, si) => (
          <List
            key={si}
            disablePadding
            sx={{ px: 1 }}
            subheader={section.title ? <ListSubheader disableSticky sx={{ fontSize: '0.6875rem', lineHeight: '28px', mt: 1, fontWeight: 500, letterSpacing: '0.08em' }}>{section.title}</ListSubheader> : undefined}
          >
            {section.items.map(item => (
              <ListItemButton
                key={item.label}
                selected={active === item.label}
                onClick={() => setActive(item.label)}
                sx={{ my: 0.25, ...activeItemSx }}
              >
                <ListItemIcon sx={{ minWidth: 28 }}><Icon name={item.icon} size={18} /></ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.8125rem' }} />
              </ListItemButton>
            ))}
          </List>
        ))}
      </Box>
    </Box>
  );
}

function NavItemStatesDemo() {
  const { effects } = useBrand();
  const isDark = effects.mode === 'dark';
  const hoverBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  return (
    <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Inactive */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.65rem' }}>
          Default
        </Typography>
        <List disablePadding sx={{ width: 220, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 1 }}>
          <ListItemButton>
            <ListItemIcon><Icon name="dashboard" size={20} /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
      </Box>

      {/* Hover */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.65rem' }}>
          Hover
        </Typography>
        <List disablePadding sx={{ width: 220, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 1 }}>
          <ListItemButton sx={{ bgcolor: hoverBg }}>
            <ListItemIcon><Icon name="analytics" size={20} /></ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </List>
      </Box>

      {/* Active / Selected — uses MUI theme override from navigation.ts */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.65rem' }}>
          Active
        </Typography>
        <List disablePadding sx={{ width: 220, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 1 }}>
          <ListItemButton selected>
            <ListItemIcon><Icon name="home" size={20} /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}

registerComponent({
  id: 'sidebar',
  name: 'Sidebar',
  description: 'Application sidebar navigation using MUI Drawer, List, ListSubheader, and ListItemButton. The theme applies the design system\'s gradient active state, uppercase section headers, and subtle sidebar shadow automatically.',
  category: 'navigation',
  importStatement: `import { Drawer, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// Or use the pre-built component:
import { AppSidebar } from './components/AppSidebar';`,
  examples: [
    {
      name: 'Nav Item States',
      code: `// Active state styling (from Sidebar.tsx)
const activeBg = isDark ? brand.colors.brand500 : brand.colors.brand100;
const activeColor = isDark ? brand.colors.brand200 : brand.colors.brand450;

<ListItemButton>                          {/* Default */}
  <ListItemIcon><Icon name="dashboard" /></ListItemIcon>
  <ListItemText primary="Dashboard" />
</ListItemButton>

<ListItemButton sx={{ bgcolor: 'action.hover' }}>  {/* Hover */}
  <ListItemIcon><Icon name="analytics" /></ListItemIcon>
  <ListItemText primary="Analytics" />
</ListItemButton>

<ListItemButton selected sx={{            {/* Active */}
  '&.Mui-selected': {
    background: activeBg,
    color: activeColor,
    borderRadius: '12px',
    boxShadow: 'none',
    '& .MuiListItemIcon-root': { color: activeColor },
  },
}}>
  <ListItemIcon><Icon name="home" /></ListItemIcon>
  <ListItemText primary="Home" />
</ListItemButton>`,
      render: () => <NavItemStatesDemo />,
    },
    {
      name: 'AppSidebar Component',
      code: `<AppSidebar
  logo={<Typography variant="h6" sx={{ fontWeight: 500 }}>Lochting</Typography>}
  showSearch
  sections={[
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', icon: 'dashboard', active: true },
        { label: 'Notifications', icon: 'notifications', badge: 3 },
        { label: 'Analytics', icon: 'analytics' },
      ],
    },
    {
      title: 'Content',
      items: [
        { label: 'Products', icon: 'inventory_2' },
        { label: 'Media', icon: 'image' },
        { label: 'Categories', icon: 'category', expandable: true },
      ],
    },
  ]}
/>`,
      render: () => <SidebarBasicDemo />,
    },
    {
      name: 'Minimal MUI Drawer',
      code: `<Drawer variant="permanent" sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}>
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">My App</Typography>
  </Box>
  <List disablePadding sx={{ px: 1 }}>
    <ListSubheader disableSticky>Main</ListSubheader>
    <ListItemButton selected>
      <ListItemIcon><Icon name="home" size={20} /></ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon><Icon name="settings" size={20} /></ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </List>
</Drawer>`,
      render: () => <SidebarMinimalDemo />,
    },
    {
      name: 'With SubNav (ExtraNav)',
      code: `<AppSidebar
  logo={<Typography variant="h6" sx={{ fontWeight: 500 }}>Lochting</Typography>}
  showSearch
  expandedItem="Localisation"
  onExpandedChange={(label) => console.log('Expanded:', label)}
  sections={[
    {
      title: 'Settings',
      items: [
        {
          label: 'Localisation',
          icon: 'language',
          children: [
            { label: 'Countries & languages', icon: 'public', active: true },
            { label: 'CMS', icon: 'article' },
            { label: 'CMS Tags', icon: 'label' },
            { label: 'Quality labels', icon: 'verified' },
            { label: 'Translation management', icon: 'translate' },
          ],
        },
        {
          label: 'Users & roles',
          icon: 'group',
          children: [
            { label: 'Users', icon: 'person' },
            { label: 'Roles', icon: 'admin_panel_settings' },
          ],
        },
      ],
    },
  ]}
/>`,
      render: () => <SidebarWithExtraNavDemo />,
    },
    {
      name: 'With Badges',
      code: `<ListItemButton selected>
  <ListItemIcon><Icon name="inbox" size={20} /></ListItemIcon>
  <ListItemText primary="Inbox" />
  <Chip label={12} size="small" color="primary" variant="outlined"
    sx={{ height: 22, minWidth: 22, fontSize: '0.7rem', fontWeight: 500 }} />
</ListItemButton>`,
      render: () => <SidebarWithBadgesDemo />,
    },
    {
      name: 'Context Sidebar (ModeStrip + Panel)',
      code: `{/* Two-column sidebar: icon rail (bgSunken) + context panel (bgElevated) */}
<Box sx={{ display: 'flex', height: '100%' }}>
  {/* Mode Strip — 48px icon rail */}
  <Box sx={{ width: 48, bgcolor: bgSunken, borderRight: '1px solid', borderColor: 'divider',
    display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1, gap: 0.5 }}>
    <Tooltip title="Components" placement="right" arrow>
      <IconButton sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: activeBg, color: activeColor }}>
        <Icon name="widgets" size={22} fill />
      </IconButton>
    </Tooltip>
    <Tooltip title="Theme" placement="right" arrow>
      <IconButton sx={{ width: 40, height: 40, borderRadius: '12px', color: 'text.secondary' }}>
        <Icon name="palette" size={22} />
      </IconButton>
    </Tooltip>
  </Box>

  {/* Context Panel — mode-specific navigation */}
  <Box sx={{ width: 240, bgcolor: 'background.paper', borderRight: '1px solid', borderColor: 'divider' }}>
    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
      <Typography variant="overline">COMPONENTS</Typography>
    </Box>
    <List disablePadding sx={{ px: 1 }}>
      <ListItemButton selected sx={{
        borderRadius: '12px',
        '&.Mui-selected': { bgcolor: brand100, color: brand450,
          border: '1px solid transparent', borderRadius: '12px', boxShadow: 'none' },
      }}>
        <ListItemIcon sx={{ minWidth: 28 }}><Icon name="smart_button" size={18} /></ListItemIcon>
        <ListItemText primary="Button" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
      </ListItemButton>
    </List>
  </Box>
</Box>`,
      render: () => <ContextSidebarDemo />,
    },
  ],
  props: [
    { name: 'sections', type: 'SidebarSection[]', description: 'Array of navigation sections, each with a title and items' },
    { name: 'logo', type: 'ReactNode', description: 'Content to render in the logo/header area' },
    { name: 'width', type: 'number', default: '256', description: 'Sidebar width in pixels' },
    { name: 'extraNavWidth', type: 'number', default: '256', description: 'Width of the extra sub-navigation panel when expanded' },
    { name: 'showSearch', type: 'boolean', default: 'true', description: 'Whether to show the search field' },
    { name: 'searchPlaceholder', type: 'string', default: '"Search..."', description: 'Placeholder text for the search field' },
    { name: 'onSearch', type: '(query: string) => void', description: 'Callback when search value changes' },
    { name: 'onCollapse', type: '() => void', description: 'Callback for collapse button (shows button when provided)' },
    { name: 'expandedItem', type: 'string | null', description: 'Currently expanded parent item label (controlled mode)' },
    { name: 'onExpandedChange', type: '(label: string | null) => void', description: 'Callback when a parent item is expanded/collapsed (controlled mode)' },
    { name: 'footer', type: 'ReactNode', description: 'Content to render at the bottom of the sidebar' },
    { name: 'children (on SidebarItem)', type: 'SidebarItem[]', description: 'Sub-navigation items shown in the ExtraNav panel when this item is expanded' },
  ],
});

/* ─── TopBar Demo helpers ─── */

function TopBarBasicDemo() {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <AppTopBar
        breadcrumbs={[
          { label: 'Home', onClick: () => {} },
          { label: 'Products', hasDropdown: true, onClick: () => {} },
          { label: 'Edit Product' },
        ]}
        actions={
          <TopBarActions
            utilityActions={[
              { icon: 'support_agent', label: 'Support' },
              { icon: 'language', label: 'Language' },
            ]}
            notificationActions={[
              { icon: 'newspaper', label: 'News', badge: 0 },
              { icon: 'notifications', label: 'Notifications', badge: 0 },
            ]}
            avatarInitials="OP"
          />
        }
      />
    </Box>
  );
}

function TopBarMinimalDemo() {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton size="small" sx={{ width: 32, height: 32 }}>
            <Icon name="arrow_back" size={18} />
          </IconButton>
          <IconButton size="small" sx={{ width: 32, height: 32 }}>
            <Icon name="arrow_forward" size={18} />
          </IconButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Breadcrumbs separator="/" sx={{ flex: 1 }}>
            <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', color: 'text.secondary', border: 'none', background: 'none' }}>
              Home
            </Link>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary' }}>
              Dashboard
            </Typography>
          </Breadcrumbs>
          <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function TopBarNoBreadcrumbsDemo() {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <AppTopBar
        showNavigation={false}
        breadcrumbs={[{ label: 'Application' }]}
        actions={
          <TopBarActions
            notificationActions={[
              { icon: 'notifications', label: 'Notifications', badge: 5 },
            ]}
            avatarInitials="JD"
          />
        }
      />
    </Box>
  );
}

registerComponent({
  id: 'top-bar',
  name: 'Top Bar',
  description: 'Application top bar using MUI AppBar, Toolbar, Breadcrumbs, and Avatar. Includes back/forward navigation, breadcrumb path, and right-side action icons with notification badges.',
  category: 'navigation',
  importStatement: `import { AppBar, Toolbar, Breadcrumbs, Link, Typography, IconButton, Avatar, Badge, Divider } from '@mui/material';
// Or use the pre-built components:
import { AppTopBar, TopBarActions } from './components/AppTopBar';`,
  examples: [
    {
      name: 'Full Top Bar',
      code: `<AppTopBar
  breadcrumbs={[
    { label: 'Home', onClick: () => {} },
    { label: 'Products', hasDropdown: true, onClick: () => {} },
    { label: 'Edit Product' },
  ]}
  actions={
    <TopBarActions
      utilityActions={[
        { icon: 'support_agent', label: 'Support' },
        { icon: 'language', label: 'Language' },
      ]}
      notificationActions={[
        { icon: 'newspaper', label: 'News', badge: 0 },
        { icon: 'notifications', label: 'Notifications', badge: 0 },
      ]}
      avatarInitials="OP"
    />
  }
/>`,
      render: () => <TopBarBasicDemo />,
    },
    {
      name: 'Minimal AppBar',
      code: `<AppBar position="static" elevation={0}>
  <Toolbar>
    <IconButton size="small"><Icon name="arrow_back" size={18} /></IconButton>
    <IconButton size="small"><Icon name="arrow_forward" size={18} /></IconButton>
    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
    <Breadcrumbs separator="/" sx={{ flex: 1 }}>
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
        Home
      </Link>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary' }}>
        Dashboard
      </Typography>
    </Breadcrumbs>
    <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
  </Toolbar>
</AppBar>`,
      render: () => <TopBarMinimalDemo />,
    },
    {
      name: 'Simple (no navigation)',
      code: `<AppTopBar
  showNavigation={false}
  breadcrumbs={[{ label: 'Application' }]}
  actions={
    <TopBarActions
      notificationActions={[{ icon: 'notifications', label: 'Notifications', badge: 5 }]}
      avatarInitials="JD"
    />
  }
/>`,
      render: () => <TopBarNoBreadcrumbsDemo />,
    },
  ],
  props: [
    { name: 'breadcrumbs', type: 'BreadcrumbItem[]', description: 'Array of breadcrumb items. Last item is rendered as current page (bold text).' },
    { name: 'showNavigation', type: 'boolean', default: 'true', description: 'Show back/forward navigation buttons' },
    { name: 'onBack', type: '() => void', description: 'Callback for back navigation button' },
    { name: 'onForward', type: '() => void', description: 'Callback for forward navigation button' },
    { name: 'actions', type: 'ReactNode', description: 'Content for the right-side action area (icons, avatar, etc.)' },
  ],
});

/* ─── Breadcrumbs Demo helpers ─── */

function BreadcrumbsBasicDemo() {
  return (
    <Breadcrumbs separator="/">
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer' }}>
        Home
      </Link>
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer' }}>
        Products
      </Link>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary' }}>
        Widget Pro
      </Typography>
    </Breadcrumbs>
  );
}

function BreadcrumbsWithDropdownDemo() {
  return (
    <Breadcrumbs separator="/">
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.25 }}>
        Home
        <Icon name="keyboard_arrow_down" size={16} />
      </Link>
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.25 }}>
        Channels
        <Icon name="keyboard_arrow_down" size={16} />
      </Link>
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.25 }}>
        Webshops
        <Icon name="keyboard_arrow_down" size={16} />
      </Link>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 0.25 }}>
        Shop Settings
        <Icon name="keyboard_arrow_down" size={16} />
      </Typography>
    </Breadcrumbs>
  );
}

function BreadcrumbsCustomSeparatorDemo() {
  return (
    <Breadcrumbs separator={<Icon name="chevron_right" size={16} />}>
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer' }}>
        Dashboard
      </Link>
      <Link component="button" underline="hover" sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none', cursor: 'pointer' }}>
        Reports
      </Link>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary' }}>
        Monthly
      </Typography>
    </Breadcrumbs>
  );
}

registerComponent({
  id: 'breadcrumbs',
  name: 'Breadcrumbs',
  description: 'Navigation breadcrumbs showing the current page hierarchy. Styled with the design system\'s typography and color tokens. Supports custom separators and dropdown indicators.',
  category: 'navigation',
  importStatement: `import { Breadcrumbs, Link, Typography } from '@mui/material';`,
  examples: [
    {
      name: 'Default',
      code: `<Breadcrumbs separator="/">
  <Link component="button" underline="hover"
    sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none' }}>
    Home
  </Link>
  <Link component="button" underline="hover"
    sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.secondary', border: 'none', background: 'none' }}>
    Products
  </Link>
  <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary' }}>
    Widget Pro
  </Typography>
</Breadcrumbs>`,
      render: () => <BreadcrumbsBasicDemo />,
    },
    {
      name: 'With Dropdowns',
      code: `<Breadcrumbs separator="/">
  <Link component="button" underline="hover"
    sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
    Channels
    <Icon name="keyboard_arrow_down" size={16} />
  </Link>
  <Typography sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.25 }}>
    Shop Settings
    <Icon name="keyboard_arrow_down" size={16} />
  </Typography>
</Breadcrumbs>`,
      render: () => <BreadcrumbsWithDropdownDemo />,
    },
    {
      name: 'Chevron Separator',
      code: `<Breadcrumbs separator={<Icon name="chevron_right" size={16} />}>
  <Link component="button" underline="hover" sx={{ color: 'text.secondary' }}>
    Dashboard
  </Link>
  <Link component="button" underline="hover" sx={{ color: 'text.secondary' }}>
    Reports
  </Link>
  <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>Monthly</Typography>
</Breadcrumbs>`,
      render: () => <BreadcrumbsCustomSeparatorDemo />,
    },
  ],
  props: [
    { name: 'separator', type: 'ReactNode', default: '"/"', description: 'Custom separator between breadcrumb items' },
    { name: 'maxItems', type: 'number', description: 'Maximum breadcrumb items to show before collapsing' },
    { name: 'itemsBeforeCollapse', type: 'number', default: '1', description: 'Items to show before the collapsed items' },
    { name: 'itemsAfterCollapse', type: 'number', default: '1', description: 'Items to show after the collapsed items' },
  ],
});

/* ─── Full Layout Demo ─── */

function FullLayoutDemo() {
  const [active, setActive] = useState('Products');
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <Box sx={{ height: 500, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', display: 'flex' }}>
      {/* Sidebar */}
      <AppSidebar
        width={220}
        extraNavWidth={220}
        logo={<Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>App</Typography>}
        showSearch={false}
        expandedItem={expanded}
        onExpandedChange={setExpanded}
        sections={[
          {
            title: 'Menu',
            items: [
              { label: 'Dashboard', icon: 'dashboard', active: active === 'Dashboard', onClick: () => { setActive('Dashboard'); setExpanded(null); } },
              { label: 'Products', icon: 'inventory_2', active: active === 'Products', onClick: () => { setActive('Products'); setExpanded(null); } },
              { label: 'Orders', icon: 'receipt_long', badge: 5, active: active === 'Orders', onClick: () => { setActive('Orders'); setExpanded(null); } },
              {
                label: 'Settings',
                icon: 'settings',
                children: [
                  { label: 'General', icon: 'tune', active: active === 'General', onClick: () => setActive('General') },
                  { label: 'Users', icon: 'group', active: active === 'Users', onClick: () => setActive('Users') },
                  { label: 'Billing', icon: 'payment', active: active === 'Billing', onClick: () => setActive('Billing') },
                ],
              },
            ],
          },
        ]}
      />
      {/* Main area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppTopBar
          breadcrumbs={[
            { label: 'Home', onClick: () => { setActive('Dashboard'); setExpanded(null); } },
            ...(expanded ? [{ label: expanded, onClick: () => {} }] : []),
            { label: active },
          ]}
          onBack={() => {}}
          actions={
            <TopBarActions
              notificationActions={[
                { icon: 'notifications', label: 'Notifications', badge: 0 },
              ]}
              avatarInitials="OL"
            />
          }
        />
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <Typography variant="h5" gutterBottom>{active}</Typography>
          <Typography color="text.secondary">
            {expanded
              ? `Viewing "${active}" under "${expanded}". Click the arrow in the sub-nav header to collapse the panel.`
              : `This is the ${active.toLowerCase()} page. Click "Settings" in the sidebar to see the ExtraNav panel slide in.`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

registerComponent({
  id: 'app-layout',
  name: 'App Layout',
  description: 'Complete application layout combining AppSidebar and AppTopBar. Demonstrates how the sidebar, top bar, breadcrumbs, and content area work together as a full application shell.',
  category: 'navigation',
  importStatement: `import { AppSidebar } from './components/AppSidebar';
import { AppTopBar, TopBarActions } from './components/AppTopBar';`,
  examples: [
    {
      name: 'Full Layout',
      code: `<Box sx={{ display: 'flex', height: '100vh' }}>
  <AppSidebar
    logo={<Typography variant="h6">App</Typography>}
    sections={[
      {
        title: 'Menu',
        items: [
          { label: 'Dashboard', icon: 'dashboard', active: true },
          { label: 'Products', icon: 'inventory_2' },
          { label: 'Orders', icon: 'receipt_long', badge: 5 },
          { label: 'Settings', icon: 'settings' },
        ],
      },
    ]}
  />
  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <AppTopBar
      breadcrumbs={[
        { label: 'Home', onClick: () => {} },
        { label: 'Dashboard' },
      ]}
      actions={
        <TopBarActions
          notificationActions={[{ icon: 'notifications', label: 'Notifications', badge: 0 }]}
          avatarInitials="OL"
        />
      }
    />
    <Box sx={{ flex: 1, p: 3 }}>
      {/* Page content */}
    </Box>
  </Box>
</Box>`,
      render: () => <FullLayoutDemo />,
    },
  ],
  props: [
    { name: 'AppSidebar', type: 'component', description: 'See Sidebar component for props' },
    { name: 'AppTopBar', type: 'component', description: 'See Top Bar component for props' },
    { name: 'TopBarActions', type: 'component', description: 'Pre-built right-side actions with utility icons, notification badges, and avatar' },
  ],
});

// ─── Multi-select ───

const MULTI_SELECT_OPTIONS: MultiSelectOption[] = [
  {
    id: 'europe',
    label: 'Europe',
    children: [
      {
        id: 'benelux',
        label: 'Benelux',
        children: [
          { id: 'be', label: 'Belgium' },
          { id: 'nl', label: 'Netherlands' },
          { id: 'lu', label: 'Luxembourg' },
        ],
      },
      {
        id: 'dach',
        label: 'DACH',
        children: [
          { id: 'de', label: 'Germany' },
          { id: 'at', label: 'Austria' },
          { id: 'ch', label: 'Switzerland' },
        ],
      },
      { id: 'fr', label: 'France' },
      { id: 'es', label: 'Spain' },
      { id: 'it', label: 'Italy' },
    ],
  },
  {
    id: 'americas',
    label: 'Americas',
    children: [
      { id: 'us', label: 'United States' },
      { id: 'ca', label: 'Canada' },
      { id: 'br', label: 'Brazil' },
    ],
  },
  {
    id: 'asia',
    label: 'Asia',
    children: [
      { id: 'jp', label: 'Japan' },
      { id: 'kr', label: 'South Korea' },
      { id: 'cn', label: 'China' },
    ],
  },
];

function MultiSelectBasicDemo() {
  const [value, setValue] = useState<string[]>(['be', 'nl']);
  return <MultiSelect options={MULTI_SELECT_OPTIONS} value={value} onChange={setValue} label="Countries" fullWidth />;
}

function MultiSelectEmptyDemo() {
  const [value, setValue] = useState<string[]>([]);
  return <MultiSelect options={MULTI_SELECT_OPTIONS} value={value} onChange={setValue} placeholder="Choose regions..." fullWidth />;
}

registerComponent({
  id: 'multi-select',
  name: 'Multi-select',
  description: 'Advanced multi-select dropdown with hierarchical sublevels, search filtering, and select all / select none controls. Built with MUI Popover, Checkbox, and Collapse.',
  category: 'inputs',
  importStatement: `import { MultiSelect } from '../components/MultiSelect';
import type { MultiSelectOption } from '../components/MultiSelect';`,
  examples: [
    {
      name: 'Sizes',
      code: `<MultiSelect options={OPTIONS} value={['be']} onChange={setValue} label="Small" size="small" fullWidth />
<MultiSelect options={OPTIONS} value={['be']} onChange={setValue} label="Medium" fullWidth />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <MultiSelect
            options={MULTI_SELECT_OPTIONS}
            value={['be']}
            onChange={() => {}}
            label="Small"
            size="small"
            fullWidth
          />
          <MultiSelect
            options={MULTI_SELECT_OPTIONS}
            value={['be']}
            onChange={() => {}}
            label="Medium"
            fullWidth
          />
        </Box>
      ),
    },
    {
      name: 'With pre-selected values',
      code: `const OPTIONS: MultiSelectOption[] = [
  {
    id: 'europe', label: 'Europe',
    children: [
      {
        id: 'benelux', label: 'Benelux',
        children: [
          { id: 'be', label: 'Belgium' },
          { id: 'nl', label: 'Netherlands' },
          { id: 'lu', label: 'Luxembourg' },
        ],
      },
      { id: 'fr', label: 'France' },
    ],
  },
];

const [value, setValue] = useState(['be', 'nl']);

<MultiSelect
  options={OPTIONS}
  value={value}
  onChange={setValue}
  label="Countries"
  fullWidth
/>`,
      render: () => <MultiSelectBasicDemo />,
    },
    {
      name: 'Empty state',
      code: `<MultiSelect
  options={OPTIONS}
  value={[]}
  onChange={setValue}
  placeholder="Choose regions..."
  fullWidth
/>`,
      render: () => <MultiSelectEmptyDemo />,
    },
    {
      name: 'Disabled',
      code: `<MultiSelect options={OPTIONS} value={['be']} onChange={() => {}} label="Disabled" disabled fullWidth />`,
      render: () => (
        <MultiSelect
          options={MULTI_SELECT_OPTIONS}
          value={['be']}
          onChange={() => {}}
          label="Disabled"
          disabled
          fullWidth
        />
      ),
    },
  ],
  props: [
    { name: 'options', type: 'MultiSelectOption[]', description: 'Nested option tree. Each option has id, label, and optional children array.' },
    { name: 'value', type: 'string[]', description: 'Array of selected leaf option IDs' },
    { name: 'onChange', type: '(selected: string[]) => void', description: 'Callback when selection changes' },
    { name: 'label', type: 'string', description: 'Label for the trigger field' },
    { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder when nothing is selected' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the component' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width' },
    { name: 'maxChips', type: 'number', default: '3', description: 'Max chips shown before collapsing to +N count' },
    { name: 'size', type: '"small" | "medium"', default: '"medium"', description: 'Size of the trigger field' },
  ],
});

// ─── Date Range Picker ───

function DateRangeBasicDemo() {
  return (
    <DateRangePicker
      localeText={{ start: 'Start date', end: 'End date' }}
    />
  );
}

function DateRangeControlledDemo() {
  const [value, setValue] = useState<[typeof dayjs.Dayjs | null, typeof dayjs.Dayjs | null]>([
    dayjs('2026-03-01'),
    dayjs('2026-03-15'),
  ] as any);
  return (
    <DateRangePicker
      value={value as any}
      onChange={(newValue) => setValue(newValue as any)}
      localeText={{ start: 'Check-in', end: 'Check-out' }}
    />
  );
}

function DateRangeStaticDemo() {
  return (
    <StaticDateRangePicker
      defaultValue={[dayjs('2026-03-05'), dayjs('2026-03-20')] as any}
      slotProps={{ actionBar: { actions: [] } }}
    />
  );
}

registerComponent({
  id: 'date-range-picker',
  name: 'Date Range Picker',
  description: 'Lets users select a date range with a dual-calendar picker. Based on MUI X Date Pickers Pro. Supports controlled/uncontrolled values, shortcuts, and multiple calendar months.',
  category: 'inputs',
  importStatement: `import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';`,
  examples: [
    {
      name: 'Basic',
      code: `<DateRangePicker
  localeText={{ start: 'Start date', end: 'End date' }}
/>`,
      render: () => <DateRangeBasicDemo />,
    },
    {
      name: 'Controlled',
      code: `const [value, setValue] = useState([
  dayjs('2026-03-01'),
  dayjs('2026-03-15'),
]);

<DateRangePicker
  value={value}
  onChange={(newValue) => setValue(newValue)}
  localeText={{ start: 'Check-in', end: 'Check-out' }}
/>`,
      render: () => <DateRangeControlledDemo />,
    },
    {
      name: 'Static (inline calendar)',
      code: `<StaticDateRangePicker
  defaultValue={[dayjs('2026-03-05'), dayjs('2026-03-20')]}
  slotProps={{ actionBar: { actions: [] } }}
/>`,
      render: () => <DateRangeStaticDemo />,
    },
    {
      name: 'Disabled',
      code: `<DateRangePicker disabled localeText={{ start: 'Start', end: 'End' }} />`,
      render: () => (
        <DateRangePicker disabled localeText={{ start: 'Start', end: 'End' }} />
      ),
    },
  ],
  props: [
    { name: 'value', type: 'DateRange<Dayjs>', description: 'The selected date range [start, end]' },
    { name: 'onChange', type: '(value: DateRange<Dayjs>) => void', description: 'Callback when range changes' },
    { name: 'defaultValue', type: 'DateRange<Dayjs>', description: 'Default value for uncontrolled mode' },
    { name: 'localeText', type: '{ start: string; end: string }', description: 'Labels for start/end fields' },
    { name: 'calendars', type: '1 | 2 | 3', default: '2', description: 'Number of calendar months to display' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker' },
    { name: 'readOnly', type: 'boolean', default: 'false', description: 'Read-only mode' },
    { name: 'minDate', type: 'Dayjs', description: 'Minimum selectable date' },
    { name: 'maxDate', type: 'Dayjs', description: 'Maximum selectable date' },
  ],
});

// ─── Advanced Table ───

interface SampleRow {
  [key: string]: unknown;
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const SAMPLE_ROWS: SampleRow[] = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
  { id: 4, name: 'Diana Wilson', email: 'diana@example.com', role: 'Editor', status: 'Active', joined: '2024-04-05' },
  { id: 5, name: 'Eve Thompson', email: 'eve@example.com', role: 'Admin', status: 'Active', joined: '2024-05-18' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Pending', joined: '2024-06-22' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', joined: '2024-07-14' },
  { id: 8, name: 'Henry Brown', email: 'henry@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-08-30' },
];

const TABLE_COLUMNS: ColumnDef<SampleRow>[] = [
  { id: 'name', label: 'Name', width: 180, minWidth: 120, getValue: r => r.name },
  { id: 'email', label: 'Email', width: 220, minWidth: 150, getValue: r => r.email },
  { id: 'role', label: 'Role', width: 120, minWidth: 80, getValue: r => r.role },
  {
    id: 'status', label: 'Status', width: 120, minWidth: 80, getValue: r => r.status,
    renderCell: (row) => (
      <Chip
        label={row.status}
        size="small"
        color={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'default'}
        variant="outlined"
      />
    ),
  },
  { id: 'joined', label: 'Joined', width: 130, minWidth: 100, getValue: r => r.joined },
];

const TABLE_ACTIONS: RowAction<SampleRow>[] = [
  { icon: 'visibility', label: 'View', onClick: () => {} },
  { icon: 'edit', label: 'Edit', onClick: () => {} },
  { icon: 'delete', label: 'Delete', onClick: () => {}, color: 'error.main' },
];

registerComponent({
  id: 'advanced-table',
  name: 'Advanced Table',
  description: 'Feature-rich data table with sortable columns, inline filter popups, resizable column widths, row selection, and a fixed multi-action column on the right side.',
  category: 'data-display',
  importStatement: `import { AdvancedTable } from '../components/AdvancedTable';
import type { ColumnDef, RowAction } from '../components/AdvancedTable';`,
  examples: [
    {
      name: 'Full featured',
      code: `const columns: ColumnDef<User>[] = [
  { id: 'name', label: 'Name', width: 180, getValue: r => r.name },
  { id: 'email', label: 'Email', width: 220, getValue: r => r.email },
  { id: 'role', label: 'Role', width: 120, getValue: r => r.role },
  {
    id: 'status', label: 'Status', width: 120,
    renderCell: (row) => <Chip label={row.status} size="small" />,
  },
  { id: 'joined', label: 'Joined', width: 130, getValue: r => r.joined },
];

const actions: RowAction<User>[] = [
  { icon: 'visibility', label: 'View', onClick: (row) => {} },
  { icon: 'edit', label: 'Edit', onClick: (row) => {} },
  { icon: 'delete', label: 'Delete', onClick: (row) => {}, color: 'error.main' },
];

<AdvancedTable
  columns={columns}
  rows={users}
  getRowId={(r) => r.id}
  actions={actions}
  selectable
/>`,
      render: () => (
        <AdvancedTable
          columns={TABLE_COLUMNS}
          rows={SAMPLE_ROWS}
          getRowId={r => r.id}
          actions={TABLE_ACTIONS}
          selectable
        />
      ),
    },
    {
      name: 'Without actions',
      code: `<AdvancedTable
  columns={columns}
  rows={users}
  getRowId={(r) => r.id}
/>`,
      render: () => (
        <AdvancedTable<SampleRow>
          columns={TABLE_COLUMNS}
          rows={SAMPLE_ROWS}
          getRowId={r => r.id}
        />
      ),
    },
    {
      name: 'Elevated',
      code: `<AdvancedTable
  columns={columns}
  rows={users}
  getRowId={(r) => r.id}
  actions={actions}
  selectable
  elevated
/>`,
      render: () => (
        <AdvancedTable<SampleRow>
          columns={TABLE_COLUMNS}
          rows={SAMPLE_ROWS}
          getRowId={r => r.id}
          actions={TABLE_ACTIONS}
          selectable
          elevated
        />
      ),
    },
    {
      name: 'Dense',
      code: `<AdvancedTable
  columns={columns}
  rows={users}
  getRowId={(r) => r.id}
  actions={actions}
  selectable
  dense
/>`,
      render: () => (
        <AdvancedTable<SampleRow>
          columns={TABLE_COLUMNS}
          rows={SAMPLE_ROWS}
          getRowId={r => r.id}
          actions={TABLE_ACTIONS}
          selectable
          dense
        />
      ),
    },
  ],
  props: [
    { name: 'columns', type: 'ColumnDef<T>[]', description: 'Column definitions with id, label, width, sortable, filterable, renderCell, getValue' },
    { name: 'rows', type: 'T[]', description: 'Array of data rows' },
    { name: 'getRowId', type: '(row: T) => string | number', description: 'Unique key accessor for each row' },
    { name: 'actions', type: 'RowAction<T>[]', description: 'Array of row actions shown in the fixed right column. Each has icon, label, onClick, and optional color.' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Enable row selection checkboxes' },
    { name: 'dense', type: 'boolean', default: 'false', description: 'Dense padding mode' },
    { name: 'elevated', type: 'boolean', default: 'false', description: 'Elevated card wrapper with drop shadow' },
  ],
});
