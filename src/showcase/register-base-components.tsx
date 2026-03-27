import { useState } from 'react';
import {
  BaseTokenProvider, BwButton, BwCard, BwCardHeader, BwCardContent, BwCardActions,
  BwInput, BwCheckbox, BwSwitch, BwChip, BwAlert, BwSelect, BwTabs, BwDialog,
} from '../components/base';
import { Icon } from '../components/Icon';
import { registerComponent } from './registry';

/* ═══════════════════════════════════════════════════════════════════
   Base UI Component Registrations — [Base] tagged dual-layer components
   ═══════════════════════════════════════════════════════════════════ */

/* ─── BwButton [Base] ─── */

registerComponent({
  id: 'bw-button',
  name: 'BwButton [Base]',
  description: 'Headless button built on Base UI, styled entirely via CSS custom properties. Zero MUI dependency — uses the same brand tokens for visual parity.',
  category: 'actions',
  importStatement: `import { BwButton } from '../components/base';`,
  examples: [
    {
      name: 'Variants',
      code: `<BaseTokenProvider>
  <BwButton variant="contained">Contained</BwButton>
  <BwButton variant="outlined">Outlined</BwButton>
  <BwButton variant="text">Text</BwButton>
</BaseTokenProvider>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <BwButton variant="contained">Contained</BwButton>
            <BwButton variant="outlined">Outlined</BwButton>
            <BwButton variant="text">Text</BwButton>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Sizes',
      code: `<BwButton size="small">Small (40px)</BwButton>
<BwButton size="medium">Medium (48px)</BwButton>
<BwButton size="large">Large (56px)</BwButton>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <BwButton size="small">Small (40px)</BwButton>
            <BwButton size="medium">Medium (48px)</BwButton>
            <BwButton size="large">Large (56px)</BwButton>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'With Icons',
      code: `<BwButton startIcon={<Icon name="add" size={18} />}>Add Product</BwButton>
<BwButton variant="outlined" endIcon={<Icon name="arrow_forward" size={18} />}>Next Step</BwButton>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <BwButton startIcon={<Icon name="add" size={18} />}>Add Product</BwButton>
            <BwButton variant="outlined" endIcon={<Icon name="arrow_forward" size={18} />}>Next Step</BwButton>
            <BwButton variant="contained" color="error" startIcon={<Icon name="delete" size={18} />}>Delete</BwButton>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'States',
      code: `<BwButton disabled>Disabled</BwButton>
<BwButton fullWidth>Full Width</BwButton>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
            <BwButton disabled>Disabled</BwButton>
            <BwButton fullWidth>Full Width Button</BwButton>
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'variant', type: "'contained' | 'outlined' | 'text'", default: "'contained'", description: 'Visual style of the button' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Button height: 40px / 48px / 56px' },
    { name: 'color', type: "'primary' | 'error'", default: "'primary'", description: 'Color scheme' },
    { name: 'startIcon', type: 'ReactNode', description: 'Icon rendered before button text' },
    { name: 'endIcon', type: 'ReactNode', description: 'Icon rendered after button text' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Take full container width' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  ],
});

/* ─── BwCard [Base] ─── */

registerComponent({
  id: 'bw-card',
  name: 'BwCard [Base]',
  description: 'Pure CSS card component with variant support. No MUI dependency — consumes brand tokens via CSS custom properties for visual parity with MUI Card.',
  category: 'surfaces',
  importStatement: `import { BwCard, BwCardHeader, BwCardContent, BwCardActions } from '../components/base';`,
  examples: [
    {
      name: 'Variants',
      code: `<BwCard variant="elevated">Elevated</BwCard>
<BwCard variant="outlined">Outlined</BwCard>
<BwCard variant="filled">Filled</BwCard>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {(['elevated', 'outlined', 'filled'] as const).map((v) => (
              <BwCard key={v} variant={v}>
                <BwCardHeader>
                  <strong style={{ textTransform: 'capitalize' }}>{v}</strong>
                </BwCardHeader>
                <BwCardContent>
                  <span style={{ fontSize: '0.875rem', color: 'var(--bw-content-secondary)' }}>
                    Card content with {v} variant styling
                  </span>
                </BwCardContent>
              </BwCard>
            ))}
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Composition',
      code: `<BwCard variant="elevated">
  <BwCardHeader>Product Details</BwCardHeader>
  <BwCardContent>Paracetamol 500mg — OTC</BwCardContent>
  <BwCardActions>
    <BwButton variant="text" size="small">Edit</BwButton>
    <BwButton variant="contained" size="small">View</BwButton>
  </BwCardActions>
</BwCard>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ maxWidth: 360 }}>
            <BwCard variant="elevated">
              <BwCardHeader>
                <strong>Product Details</strong>
              </BwCardHeader>
              <BwCardContent>
                <div style={{ fontSize: '0.875rem' }}>
                  <div>Paracetamol 500mg</div>
                  <div style={{ color: 'var(--bw-content-secondary)', fontSize: '0.8125rem', marginTop: 4 }}>
                    CNK 0012345 &middot; OTC &middot; &euro;8.50
                  </div>
                </div>
              </BwCardContent>
              <BwCardActions>
                <BwButton variant="text" size="small">Edit</BwButton>
                <BwButton variant="contained" size="small">View</BwButton>
              </BwCardActions>
            </BwCard>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Interactive',
      code: `<BwCard interactive variant="outlined">
  <BwCardContent>Click me — I have hover effects</BwCardContent>
</BwCard>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 500 }}>
            <BwCard interactive variant="outlined">
              <BwCardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="inventory_2" size={20} />
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>Products</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--bw-content-secondary)' }}>142 items</div>
                  </div>
                </div>
              </BwCardContent>
            </BwCard>
            <BwCard interactive variant="outlined">
              <BwCardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="shopping_cart" size={20} />
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>Orders</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--bw-content-secondary)' }}>23 pending</div>
                  </div>
                </div>
              </BwCardContent>
            </BwCard>
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'variant', type: "'elevated' | 'outlined' | 'filled'", default: "'elevated'", description: 'Visual style — elevated has shadow, outlined has border, filled uses brand tint' },
    { name: 'interactive', type: 'boolean', default: 'false', description: 'Enable hover/press effects and pointer cursor' },
  ],
});

/* ─── BwInput [Base] ─── */

registerComponent({
  id: 'bw-input',
  name: 'BwInput [Base]',
  description: 'Headless input built on Base UI Input, styled via CSS custom properties. Supports labels, helper text, error states, and adornments.',
  category: 'inputs',
  importStatement: `import { BwInput } from '../components/base';`,
  examples: [
    {
      name: 'Basic',
      code: `<BwInput label="Product Name" placeholder="Enter product name..." />
<BwInput label="Price" placeholder="0.00" startAdornment="€" />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <BwInput label="Product Name" placeholder="Enter product name..." />
            <BwInput
              label="Price"
              placeholder="0.00"
              startAdornment={<span style={{ color: 'var(--bw-content-secondary)' }}>&euro;</span>}
            />
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Sizes',
      code: `<BwInput size="small" placeholder="Small (40px)" />
<BwInput size="medium" placeholder="Medium (48px)" />
<BwInput size="large" placeholder="Large (56px)" />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
            <BwInput size="small" placeholder="Small (40px)" />
            <BwInput size="medium" placeholder="Medium (48px)" />
            <BwInput size="large" placeholder="Large (56px)" />
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'States',
      code: `<BwInput label="Email" helperText="We'll never share your email" />
<BwInput label="CNK Code" error helperText="Invalid CNK format" defaultValue="ABC" />
<BwInput label="Disabled" disabled defaultValue="Cannot edit" />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <BwInput label="Email" helperText="We'll never share your email" placeholder="pharmacist@example.com" />
            <BwInput label="CNK Code" error helperText="Invalid CNK format" defaultValue="ABC" />
            <BwInput label="Disabled" disabled defaultValue="Cannot edit" />
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'With Adornments',
      code: `<BwInput startAdornment={<Icon name="search" size={18} />} placeholder="Search products..." />
<BwInput label="Website" startAdornment="https://" endAdornment=".com" />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
            <BwInput
              startAdornment={<Icon name="search" size={18} />}
              placeholder="Search products..."
              fullWidth
            />
            <BwInput
              label="Website"
              startAdornment={<span style={{ fontSize: '0.8125rem', color: 'var(--bw-content-secondary)' }}>https://</span>}
              endAdornment={<span style={{ fontSize: '0.8125rem', color: 'var(--bw-content-secondary)' }}>.com</span>}
              fullWidth
            />
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'label', type: 'string', description: 'Field label displayed above the input' },
    { name: 'helperText', type: 'string', description: 'Helper text displayed below the input' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state — red border and helper text' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Input height: 40px / 48px / 56px' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Take full container width' },
    { name: 'startAdornment', type: 'ReactNode', description: 'Content before the input (icon, text prefix)' },
    { name: 'endAdornment', type: 'ReactNode', description: 'Content after the input (icon, text suffix)' },
  ],
});

/* ─── BwCheckbox [Base] ─── */

registerComponent({
  id: 'bw-checkbox',
  name: 'BwCheckbox [Base]',
  description: 'Headless checkbox built on Base UI, styled via CSS custom properties. Supports checked, indeterminate, and disabled states.',
  category: 'inputs',
  importStatement: `import { BwCheckbox } from '../components/base';`,
  examples: [
    {
      name: 'Basic',
      code: `<BwCheckbox label="Accept terms and conditions" />
<BwCheckbox label="Subscribe to newsletter" defaultChecked />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <BwCheckbox label="Accept terms and conditions" />
            <BwCheckbox label="Subscribe to newsletter" defaultChecked />
            <BwCheckbox label="Enable notifications" />
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'States',
      code: `<BwCheckbox label="Indeterminate" indeterminate />
<BwCheckbox label="Disabled" disabled />
<BwCheckbox label="Disabled Checked" disabled defaultChecked />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <BwCheckbox label="Indeterminate" indeterminate />
            <BwCheckbox label="Disabled" disabled />
            <BwCheckbox label="Disabled Checked" disabled defaultChecked />
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
    { name: 'defaultChecked', type: 'boolean', description: 'Initial checked state (uncontrolled)' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback when checked state changes' },
    { name: 'label', type: 'string', description: 'Label text displayed next to the checkbox' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show indeterminate (mixed) state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  ],
});

/* ─── BwSwitch [Base] ─── */

registerComponent({
  id: 'bw-switch',
  name: 'BwSwitch [Base]',
  description: 'Toggle switch built on Base UI, styled via CSS custom properties. Available in small and medium sizes.',
  category: 'inputs',
  importStatement: `import { BwSwitch } from '../components/base';`,
  examples: [
    {
      name: 'Basic',
      code: `<BwSwitch label="Enable dark mode" />
<BwSwitch label="Auto-sync" defaultChecked />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BwSwitch label="Enable dark mode" />
            <BwSwitch label="Auto-sync products" defaultChecked />
            <BwSwitch label="Push notifications" />
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Sizes & States',
      code: `<BwSwitch size="medium" label="Medium (default)" />
<BwSwitch size="small" label="Small" />
<BwSwitch disabled label="Disabled" />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <BwSwitch size="medium" label="Medium (default)" defaultChecked />
            <BwSwitch size="small" label="Small" defaultChecked />
            <BwSwitch disabled label="Disabled" />
            <BwSwitch disabled defaultChecked label="Disabled On" />
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'checked', type: 'boolean', description: 'Controlled checked state' },
    { name: 'defaultChecked', type: 'boolean', description: 'Initial state (uncontrolled)' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Change callback' },
    { name: 'label', type: 'string', description: 'Label text' },
    { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: 'Track size' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  ],
});

/* ─── BwChip [Base] ─── */

registerComponent({
  id: 'bw-chip',
  name: 'BwChip [Base]',
  description: 'Chip/tag component styled via CSS custom properties. Supports filled, outlined, and soft variants with 5 color options.',
  category: 'data-display',
  importStatement: `import { BwChip } from '../components/base';`,
  examples: [
    {
      name: 'Variants',
      code: `<BwChip variant="filled">Filled</BwChip>
<BwChip variant="outlined">Outlined</BwChip>
<BwChip variant="soft">Soft</BwChip>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <BwChip variant="filled">Filled</BwChip>
            <BwChip variant="outlined">Outlined</BwChip>
            <BwChip variant="soft">Soft</BwChip>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Colors',
      code: `<BwChip color="default">Default</BwChip>
<BwChip color="primary">Primary</BwChip>
<BwChip color="success">Success</BwChip>
<BwChip color="warning">Warning</BwChip>
<BwChip color="error">Error</BwChip>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['default', 'primary', 'success', 'warning', 'error'] as const).map((c) => (
                <BwChip key={c} variant="filled" color={c}>{c}</BwChip>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['default', 'primary', 'success', 'warning', 'error'] as const).map((c) => (
                <BwChip key={c} variant="soft" color={c}>{c}</BwChip>
              ))}
            </div>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Interactive',
      code: `<BwChip clickable>Clickable</BwChip>
<BwChip onDelete={() => {}}>Deletable</BwChip>
<BwChip icon={<Icon name="local_pharmacy" size={14} />} color="primary" variant="soft">Pharmacy</BwChip>`,
      render: () => {
        function ChipDemo() {
          const [chips, setChips] = useState(['React', 'TypeScript', 'Base UI']);
          return (
            <BaseTokenProvider>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <BwChip icon={<Icon name="local_pharmacy" size={14} />} color="primary" variant="soft">Pharmacy</BwChip>
                {chips.map((c) => (
                  <BwChip key={c} variant="outlined" onDelete={() => setChips((prev) => prev.filter((x) => x !== c))}>{c}</BwChip>
                ))}
                <BwChip size="small" variant="soft" color="success">Small</BwChip>
              </div>
            </BaseTokenProvider>
          );
        }
        return <ChipDemo />;
      },
    },
  ],
  props: [
    { name: 'variant', type: "'filled' | 'outlined' | 'soft'", default: "'filled'", description: 'Visual style' },
    { name: 'color', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Color scheme' },
    { name: 'size', type: "'small' | 'medium'", default: "'medium'", description: 'Chip height: 24px / 32px' },
    { name: 'icon', type: 'ReactNode', description: 'Icon slot before label' },
    { name: 'onDelete', type: '() => void', description: 'Show delete button and call on click' },
    { name: 'clickable', type: 'boolean', default: 'false', description: 'Enable pointer cursor and focus ring' },
  ],
});

/* ─── BwAlert [Base] ─── */

registerComponent({
  id: 'bw-alert',
  name: 'BwAlert [Base]',
  description: 'Alert/banner component styled via CSS custom properties. Supports 4 severities and 3 variants with default icons.',
  category: 'feedback',
  importStatement: `import { BwAlert } from '../components/base';`,
  examples: [
    {
      name: 'Severities (Soft)',
      code: `<BwAlert severity="info">Sync will start in 5 minutes.</BwAlert>
<BwAlert severity="success">Products imported successfully.</BwAlert>
<BwAlert severity="warning">Stock levels are running low.</BwAlert>
<BwAlert severity="error">Failed to connect to supplier API.</BwAlert>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
            <BwAlert severity="info">Sync will start in 5 minutes.</BwAlert>
            <BwAlert severity="success">Products imported successfully.</BwAlert>
            <BwAlert severity="warning">Stock levels are running low.</BwAlert>
            <BwAlert severity="error">Failed to connect to supplier API.</BwAlert>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Variants',
      code: `<BwAlert variant="soft" severity="info">Soft variant</BwAlert>
<BwAlert variant="filled" severity="info">Filled variant</BwAlert>
<BwAlert variant="outlined" severity="info">Outlined variant</BwAlert>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
            <BwAlert variant="soft" severity="success">Soft — light tinted background</BwAlert>
            <BwAlert variant="filled" severity="success">Filled — solid color background</BwAlert>
            <BwAlert variant="outlined" severity="success">Outlined — colored border</BwAlert>
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'With Actions',
      code: `<BwAlert severity="warning" onClose={() => {}}>Dismissible alert</BwAlert>
<BwAlert severity="error" action={<BwButton size="small" variant="text" color="error">Retry</BwButton>}>Connection failed</BwAlert>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
            <BwAlert severity="warning" onClose={() => {}}>
              This alert can be dismissed by clicking the close button.
            </BwAlert>
            <BwAlert
              severity="error"
              action={<BwButton size="small" variant="text" color="error">Retry</BwButton>}
            >
              Connection to supplier API failed. Check your network settings.
            </BwAlert>
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'severity', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Alert severity level' },
    { name: 'variant', type: "'filled' | 'outlined' | 'soft'", default: "'soft'", description: 'Visual style' },
    { name: 'icon', type: 'ReactNode', description: 'Custom icon (defaults to severity-based icon)' },
    { name: 'action', type: 'ReactNode', description: 'Action element (button) on the right side' },
    { name: 'onClose', type: '() => void', description: 'Show close button and call on click' },
  ],
});

/* ─── BwSelect [Base] ─── */

registerComponent({
  id: 'bw-select',
  name: 'BwSelect [Base]',
  description: 'Dropdown select built on Base UI Select, styled via CSS custom properties. Supports label, helper text, error states, and portal-based popup.',
  category: 'inputs',
  importStatement: `import { BwSelect } from '../components/base';`,
  examples: [
    {
      name: 'Basic',
      code: `<BwSelect
  label="Category"
  options={[
    { value: 'otc', label: 'OTC' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'supplement', label: 'Supplement' },
  ]}
/>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <BwSelect
              label="Category"
              placeholder="Choose category..."
              options={[
                { value: 'otc', label: 'OTC' },
                { value: 'prescription', label: 'Prescription' },
                { value: 'supplement', label: 'Supplement' },
                { value: 'medical-device', label: 'Medical Device' },
              ]}
            />
            <BwSelect
              label="Status"
              defaultValue="active"
              options={[
                { value: 'active', label: 'Active' },
                { value: 'draft', label: 'Draft' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
          </div>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Sizes & States',
      code: `<BwSelect size="small" options={...} />
<BwSelect error helperText="Required" options={...} />
<BwSelect disabled options={...} />`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
            <BwSelect size="small" label="Small" placeholder="Small select" options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} />
            <BwSelect size="large" label="Large" placeholder="Large select" options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} />
            <BwSelect error helperText="This field is required" label="With Error" placeholder="Select..." options={[{ value: '1', label: 'Option 1' }]} />
            <BwSelect disabled label="Disabled" defaultValue="1" options={[{ value: '1', label: 'Cannot change' }]} />
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'options', type: 'BwSelectOption[]', description: 'Array of { value, label, disabled? } objects' },
    { name: 'value', type: 'string', description: 'Controlled selected value' },
    { name: 'defaultValue', type: 'string', description: 'Initial value (uncontrolled)' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Change callback' },
    { name: 'label', type: 'string', description: 'Field label' },
    { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text' },
    { name: 'helperText', type: 'string', description: 'Helper text below the field' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Error state' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Trigger height' },
    { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Take full container width' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
  ],
});

/* ─── BwTabs [Base] ─── */

registerComponent({
  id: 'bw-tabs',
  name: 'BwTabs [Base]',
  description: 'Tab navigation built on Base UI Tabs, styled via CSS custom properties. Available in underline, contained (segmented), and pills variants.',
  category: 'navigation',
  importStatement: `import { BwTabs } from '../components/base';`,
  examples: [
    {
      name: 'Variants',
      code: `<BwTabs variant="underline" tabs={[...]} />
<BwTabs variant="contained" tabs={[...]} />
<BwTabs variant="pills" tabs={[...]} />`,
      render: () => {
        const sampleTabs = [
          { value: 'overview', label: 'Overview', content: <p style={{ margin: 0, fontSize: '0.875rem' }}>Product overview content goes here.</p> },
          { value: 'details', label: 'Details', content: <p style={{ margin: 0, fontSize: '0.875rem' }}>Detailed specifications and attributes.</p> },
          { value: 'stock', label: 'Stock', content: <p style={{ margin: 0, fontSize: '0.875rem' }}>Stock levels across warehouses.</p> },
        ];
        return (
          <BaseTokenProvider>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--bw-content-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Underline</div>
                <BwTabs variant="underline" tabs={sampleTabs} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--bw-content-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contained</div>
                <BwTabs variant="contained" tabs={sampleTabs} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--bw-content-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pills</div>
                <BwTabs variant="pills" tabs={sampleTabs} />
              </div>
            </div>
          </BaseTokenProvider>
        );
      },
    },
    {
      name: 'Disabled Tab',
      code: `<BwTabs tabs={[
  { value: 'active', label: 'Active' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]} />`,
      render: () => (
        <BaseTokenProvider>
          <BwTabs
            variant="underline"
            tabs={[
              { value: 'products', label: 'Products', content: <p style={{ margin: 0, fontSize: '0.875rem' }}>Product list here.</p> },
              { value: 'categories', label: 'Categories', content: <p style={{ margin: 0, fontSize: '0.875rem' }}>Category tree here.</p> },
              { value: 'import', label: 'Import', disabled: true, content: <p style={{ margin: 0, fontSize: '0.875rem' }}>Coming soon.</p> },
            ]}
          />
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'tabs', type: 'BwTabItem[]', description: 'Array of { value, label, content, disabled? }' },
    { name: 'value', type: 'string', description: 'Controlled active tab' },
    { name: 'defaultValue', type: 'string', description: 'Initial tab (defaults to first)' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Change callback' },
    { name: 'variant', type: "'underline' | 'contained' | 'pills'", default: "'underline'", description: 'Tab bar visual style' },
  ],
});

/* ─── BwDialog [Base] ─── */

registerComponent({
  id: 'bw-dialog',
  name: 'BwDialog [Base]',
  description: 'Modal dialog built on Base UI Dialog, styled via CSS custom properties. Supports title, description, content, actions, and portal-based rendering.',
  category: 'feedback',
  importStatement: `import { BwDialog } from '../components/base';`,
  examples: [
    {
      name: 'Basic',
      code: `<BwDialog
  trigger={<BwButton>Open Dialog</BwButton>}
  title="Delete Product"
  description="Are you sure? This action cannot be undone."
>
  <p>The product and all associated data will be permanently removed.</p>
</BwDialog>`,
      render: () => (
        <BaseTokenProvider>
          <BwDialog
            trigger={<BwButton variant="outlined">Open Dialog</BwButton>}
            title="Delete Product"
            description="Are you sure you want to delete this product? This action cannot be undone."
            actions={
              <>
                <BwButton variant="text">Cancel</BwButton>
                <BwButton variant="contained" color="error">Delete</BwButton>
              </>
            }
          >
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--bw-content-secondary)' }}>
              The product <strong>Paracetamol 500mg (CNK 0012345)</strong> and all associated
              data including stock records and price history will be permanently removed.
            </p>
          </BwDialog>
        </BaseTokenProvider>
      ),
    },
    {
      name: 'Sizes',
      code: `<BwDialog size="small" title="Small">...</BwDialog>
<BwDialog size="medium" title="Medium">...</BwDialog>
<BwDialog size="large" title="Large">...</BwDialog>`,
      render: () => (
        <BaseTokenProvider>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['small', 'medium', 'large'] as const).map((s) => (
              <BwDialog
                key={s}
                size={s}
                trigger={<BwButton variant="outlined" size="small">{s}</BwButton>}
                title={`${s.charAt(0).toUpperCase() + s.slice(1)} Dialog`}
                description={`This is a ${s} dialog (${s === 'small' ? '400' : s === 'medium' ? '560' : '720'}px wide).`}
                actions={<BwButton variant="contained" size="small">Got it</BwButton>}
              >
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Dialog content goes here. The width is fixed but height adapts to content.
                </p>
              </BwDialog>
            ))}
          </div>
        </BaseTokenProvider>
      ),
    },
  ],
  props: [
    { name: 'open', type: 'boolean', description: 'Controlled open state' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open/close callback' },
    { name: 'trigger', type: 'ReactNode', description: 'Element that opens the dialog on click' },
    { name: 'title', type: 'string', description: 'Dialog title in the header' },
    { name: 'description', type: 'string', description: 'Description text below title' },
    { name: 'children', type: 'ReactNode', description: 'Main content area' },
    { name: 'actions', type: 'ReactNode', description: 'Footer actions (buttons)' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Dialog width: 400/560/720px' },
  ],
});
