import { Box, Typography, Divider } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { CodeBlock } from '../blocks/CodeBlock';

interface SwatchProps {
  name: string;
  token: string;
  value: string;
}

function Swatch({ name, token, value }: SwatchProps) {
  const { brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;
  const isTransparent = value.includes('rgba') || value.includes('hsla');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          bgcolor: value,
          border: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
          ...(isTransparent && {
            backgroundImage: `linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)`,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              bgcolor: value,
            },
          }),
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: sw }}>{name}</Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          {token}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', flexShrink: 0 }}>
        {value}
      </Typography>
    </Box>
  );
}

export function ColorsPage() {
  const { brand } = useBrand();
  const c = brand.colors;

  const sections = [
    {
      title: 'Brand',
      swatches: [
        { name: 'Brand 100', token: 'brand100', value: c.brand100 },
        { name: 'Brand 200', token: 'brand200', value: c.brand200 },
        { name: 'Brand 300', token: 'brand300', value: c.brand300 },
        { name: 'Brand 400 (Primary)', token: 'brand400', value: c.brand400 },
        { name: 'Brand 450', token: 'brand450', value: c.brand450 },
        { name: 'Brand 500', token: 'brand500', value: c.brand500 },
      ],
    },
    {
      title: 'Backgrounds',
      swatches: [
        { name: 'Base', token: 'bgBase', value: c.bgBase },
        { name: 'Elevated', token: 'bgElevated', value: c.bgElevated },
        { name: 'Sunken', token: 'bgSunken', value: c.bgSunken },
        { name: 'Sunken Deep', token: 'bgSunkenDeep', value: c.bgSunkenDeep },
        { name: 'Sunken Deeper', token: 'bgSunkenDeeper', value: c.bgSunkenDeeper },
        { name: 'Surface', token: 'bgSurface', value: c.bgSurface },
        { name: 'Surface Secondary', token: 'bgSurfaceSecondary', value: c.bgSurfaceSecondary },
        { name: 'Subtle', token: 'bgSubtle', value: c.bgSubtle },
      ],
    },
    {
      title: 'Content',
      swatches: [
        { name: 'Primary', token: 'contentPrimary', value: c.contentPrimary },
        { name: 'Secondary', token: 'contentSecondary', value: c.contentSecondary },
        { name: 'Tertiary', token: 'contentTertiary', value: c.contentTertiary },
        { name: 'Spot', token: 'contentSpot', value: c.contentSpot },
        { name: 'Stay Light', token: 'contentStayLight', value: c.contentStayLight },
      ],
    },
    {
      title: 'Borders',
      swatches: [
        { name: 'Default', token: 'borderDefault', value: c.borderDefault },
        { name: 'Weak', token: 'borderWeak', value: c.borderWeak },
        { name: 'Strongest', token: 'borderStrongest', value: c.borderStrongest },
      ],
    },
    {
      title: 'Feedback',
      swatches: [
        { name: 'Error', token: 'error.bgDefault', value: c.error.bgDefault },
        { name: 'Error Content', token: 'error.contentStrong', value: c.error.contentStrong },
        { name: 'Error Bg', token: 'error.bgWeakest', value: c.error.bgWeakest },
        { name: 'Warning', token: 'warning.bgDefault', value: c.warning.bgDefault },
        { name: 'Warning Content', token: 'warning.contentStrong', value: c.warning.contentStrong },
        { name: 'Info', token: 'info.bgDefault', value: c.info.bgDefault },
        { name: 'Info Content', token: 'info.contentStrong', value: c.info.contentStrong },
        { name: 'Success', token: 'success.bgDefault', value: c.success.bgDefault },
        { name: 'Success Content', token: 'success.contentStrong', value: c.success.contentStrong },
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>Colors</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        Color tokens for the <strong>{brand.name}</strong> brand. Switch brands in the sidebar to see different palettes.
      </Typography>
      <CodeBlock
        code={`import { useBrand } from './theme/brand-context';\nconst { brand } = useBrand();\n// brand.colors.brand400 → "${c.brand400}"`}
        language="tsx"
      />

      <Divider sx={{ my: 4 }} />

      {sections.map((section, i) => (
        <Box key={section.title} sx={{ mb: i < sections.length - 1 ? 4 : 0 }}>
          <Typography variant="h5" sx={{ mb: 1, fontFamily: 'inherit' }}>{section.title}</Typography>
          {section.swatches.map(s => (
            <Swatch key={s.token} name={s.name} token={`colors.${s.token}`} value={s.value} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
