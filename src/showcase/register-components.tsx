import { useState } from 'react';
import { Button, Checkbox, Switch, Slider, Radio, RadioGroup, FormControlLabel, TextField, Select, MenuItem, Chip, Badge, ToggleButton, ToggleButtonGroup, IconButton, FormControl, InputLabel, Box } from '@mui/material';
import { Icon } from '../components/Icon';
import { registerComponent } from './registry';

// ─── Button ───
registerComponent({
  id: 'button',
  name: 'Button',
  description: 'Buttons trigger actions. The primary button uses a brand gradient with layered shadows for a premium tactile feel.',
  category: 'inputs',
  importStatement: `import { Button } from '@mui/material';`,
  examples: [
    {
      name: 'Primary',
      code: `<Button variant="contained" color="primary">Primary</Button>`,
      render: () => <Button variant="contained" color="primary">Primary</Button>,
    },
    {
      name: 'Secondary (Outlined)',
      code: `<Button variant="outlined">Secondary</Button>`,
      render: () => <Button variant="outlined">Secondary</Button>,
    },
    {
      name: 'Tertiary (Text)',
      code: `<Button variant="text">Tertiary</Button>`,
      render: () => <Button variant="text">Tertiary</Button>,
    },
    {
      name: 'All Variants',
      code: `<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined">Secondary</Button>
<Button variant="text">Tertiary</Button>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="outlined">Secondary</Button>
          <Button variant="text">Tertiary</Button>
        </Box>
      ),
    },
    {
      name: 'Icon Buttons',
      code: `<IconButton color="primary"><Icon name="add" /></IconButton>
<IconButton><Icon name="search" /></IconButton>`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="primary"><Icon name="add" /></IconButton>
          <IconButton><Icon name="search" /></IconButton>
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
    { name: 'step', type: 'number', default: '1', description: 'Step increment' },
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
  ],
  props: [
    { name: 'label', type: 'string', description: 'The label text' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text' },
    { name: 'value', type: 'string', description: 'The input value' },
    { name: 'error', type: 'boolean', default: 'false', description: 'If true, shows error state' },
    { name: 'helperText', type: 'string', description: 'Helper text below the input' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the input is disabled' },
    { name: 'size', type: '"small" | "medium"', default: '"medium"', description: 'The size of the input' },
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
  description: 'Chips use a brand-tinted background with subtle inner shadows. Available in multiple color variants.',
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
      name: 'With Icon & Delete',
      code: `<Chip label="Tag" color="primary" icon={<Icon name="add" size={16} />} />
<Chip label="Removable" color="primary" onDelete={() => {}} />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label="Tag" color="primary" size="small" icon={<Icon name="add" size={16} />} />
          <Chip label="Removable" color="primary" size="small" onDelete={() => {}} />
        </Box>
      ),
    },
  ],
  props: [
    { name: 'label', type: 'string', description: 'The chip label' },
    { name: 'color', type: '"primary" | "secondary" | "error" | ...', default: '"default"', description: 'The color variant' },
    { name: 'size', type: '"small" | "medium"', default: '"medium"', description: 'The chip size' },
    { name: 'icon', type: 'ReactNode', description: 'Icon element' },
    { name: 'onDelete', type: '() => void', description: 'If set, shows a delete icon' },
  ],
});

// ─── Badge ───
registerComponent({
  id: 'badge',
  name: 'Badge',
  description: 'Badges use the primary brand gradient for a pill-shaped notification indicator.',
  category: 'data-display',
  importStatement: `import { Badge } from '@mui/material';`,
  examples: [
    {
      name: 'Basic',
      code: `<Badge badgeContent={4} color="primary">
  <Icon name="notifications" />
</Badge>`,
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
  description: 'A segmented control with a sunken container. The active segment elevates with a secondary gradient and shadow.',
  category: 'inputs',
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
  ],
  props: [
    { name: 'value', type: 'string | string[]', description: 'The selected value(s)' },
    { name: 'exclusive', type: 'boolean', default: 'false', description: 'If true, only one button can be selected' },
    { name: 'onChange', type: '(event, value) => void', description: 'Callback when selection changes' },
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
      code: `<Icon name="favorite" />          {/* outline */}
<Icon name="favorite" filled />   {/* filled */}
<Icon name="star" />
<Icon name="star" filled />`,
      render: () => (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Icon name="favorite" />
          <Icon name="favorite" filled />
          <Icon name="star" />
          <Icon name="star" filled />
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
  ],
  props: [
    { name: 'name', type: 'string', description: 'The Material Symbols icon name, e.g. "search", "notifications"' },
    { name: 'size', type: 'number', default: '24', description: 'Icon size in pixels' },
    { name: 'color', type: 'string', default: '"inherit"', description: 'CSS color or theme color' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'If true, uses the filled variant' },
    { name: 'sx', type: 'SxProps', description: 'Additional MUI sx styles' },
  ],
});
