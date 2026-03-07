import { useState, useRef } from 'react';
import { Button, ButtonGroup, Checkbox, Switch, Slider, Radio, RadioGroup, FormControlLabel, TextField, Select, MenuItem, Chip, Badge, ToggleButton, ToggleButtonGroup, IconButton, FormControl, InputLabel, Box, Typography, Popper, Grow, Paper, ClickAwayListener, MenuList } from '@mui/material';
import { Icon } from '../components/Icon';
import { ToggleChip, ToggleChipGroup } from '../components/ToggleChip';
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
        <IconBg icon="star" iconColor={c.brand400} bg={c.brand100} />
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
        <IconBg icon="star" iconColor={c.contentStayLight} bg={c.brand400} />
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
        <IconBg icon="settings" iconColor={c.contentStayLight} bg={c.contentSecondary} />
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
  category: 'inputs',
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
  ],
  props: [
    { name: 'label', type: 'string', description: 'The chip label' },
    { name: 'color', type: '"primary" | "secondary" | "error" | ...', default: '"default"', description: 'The color variant' },
    { name: 'size', type: '"small" | "medium"', default: '"medium"', description: 'The chip size' },
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
  const options = ['Create order', 'Create draft', 'Create template'];

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button>{options[selectedIndex]}</Button>
        <Button
          size="small"
          onClick={() => setOpen(prev => !prev)}
          sx={{ px: '6px !important', minWidth: '0 !important' }}
        >
          <Icon name={open ? 'expand_less' : 'expand_more'} size={20} />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal sx={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
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
          size="small"
          onClick={() => setOpen(prev => !prev)}
          sx={{ px: '6px !important', minWidth: '0 !important' }}
        >
          <Icon name={open ? 'expand_less' : 'expand_more'} size={20} />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal sx={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
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
  category: 'inputs',
  importStatement: `import { Button, ButtonGroup } from '@mui/material';`,
  examples: [
    {
      name: 'Primary Group',
      code: `<ButtonGroup variant="contained">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>`,
      render: () => (
        <ButtonGroup variant="contained">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      ),
    },
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
  <Button>Create order</Button>
  <Button size="small" onClick={handleToggle}>
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
  <Button size="small" onClick={handleToggle}>
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
  category: 'inputs',
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
      code: `<Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'brand100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Icon name="star" size={18} color="brand400" />
</Box>`,
      render: () => <IconBgSoftDemo />,
    },
    {
      name: 'With Background (Bright)',
      code: `<Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'brand400', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Icon name="star" size={18} color="white" />
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
