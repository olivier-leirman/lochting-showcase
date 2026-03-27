import { BaseTokenProvider, BwButton, BwCard, BwCardHeader, BwCardContent, BwCardActions, BwInput } from '../components/base';
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
