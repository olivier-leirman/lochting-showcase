import { Box, Typography, Divider } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { PRIMITIVES } from '../../theme/tokens/primitives';
import { CodeBlock } from '../../showcase/blocks/CodeBlock';

/* ── Spacing scale entries (exclude 'base'), sorted by px value ── */
const SPACING_SCALE = Object.entries(PRIMITIVES.spacing)
  .filter(([key]) => key !== 'base')
  .map(([token, px]) => ({ token, px: px as number }))
  .sort((a, b) => a.px - b.px);

/* ── Single bar row ── */
function SpacingRow({ token, px, brandColor }: { token: string; px: number; brandColor: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 0.75 }}>
      <Typography
        variant="body2"
        sx={{ width: 56, fontFamily: 'monospace', fontWeight: 500, flexShrink: 0, textAlign: 'right' }}
      >
        {token}
      </Typography>
      <Box
        sx={{
          width: Math.max(px, 2),
          height: 20,
          borderRadius: 0.5,
          bgcolor: brandColor,
          opacity: px === 0 ? 0.2 : 0.7,
          transition: 'width 0.2s ease',
          flexShrink: 0,
        }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 48 }}>
        {px} px
      </Typography>
    </Box>
  );
}

export function SpacingPage() {
  const { brand } = useBrand();
  const c = brand.colors;
  const sw = brand.typography.strongWeight ?? 600;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>Spacing</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        A 4 px base grid system. All spacing values are multiples of 4 px, ensuring consistent rhythm across the UI.
        The multiplier token (e.g.&nbsp;<code>2</code>) maps to <code>2 &times; 4 = 8 px</code>.
      </Typography>
      <CodeBlock
        code={`import { PRIMITIVES } from './theme/tokens/primitives';\n\n// Use the tokens directly\nPRIMITIVES.spacing['4']  // 16 px\nPRIMITIVES.spacing['8']  // 32 px\n\n// Or use MUI's sx shorthand (1 unit = 8 px by default)\n<Box sx={{ p: 2, mt: 4, gap: 3 }} />`}
        language="tsx"
      />

      <Divider sx={{ my: 4 }} />

      {/* ── Scale visual ── */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: sw }}>Scale</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Base unit: <strong>4 px</strong>. Multiply the token value by 4 to get the pixel value.
      </Typography>

      <Box sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 3,
        mb: 4,
      }}>
        {SPACING_SCALE.map(({ token, px }) => (
          <SpacingRow key={token} token={token} px={px} brandColor={c.brand400} />
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── Reference table ── */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: sw }}>Reference</Typography>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': { textAlign: 'left', py: 1, px: 2, borderBottom: '1px solid', borderColor: 'divider', fontSize: '0.875rem' },
          '& th': { fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
        }}
      >
        <thead>
          <tr>
            <th>Token</th>
            <th>Pixels</th>
            <th>Rem</th>
            <th>Common usage</th>
          </tr>
        </thead>
        <tbody>
          {[
            { token: '0', px: 0, usage: 'Reset' },
            { token: '0.5', px: 2, usage: 'Tight insets, divider gaps' },
            { token: '1', px: 4, usage: 'Icon gaps, compact padding' },
            { token: '1.5', px: 6, usage: 'Small chip padding' },
            { token: '2', px: 8, usage: 'Default gap, card padding (sm)' },
            { token: '3', px: 12, usage: 'Input padding, medium gaps' },
            { token: '4', px: 16, usage: 'Card padding, section gaps' },
            { token: '5', px: 20, usage: 'Larger section gaps' },
            { token: '6', px: 24, usage: 'Component margin, group spacing' },
            { token: '8', px: 32, usage: 'Section spacing, page margins' },
            { token: '10', px: 40, usage: 'Large section dividers' },
            { token: '12', px: 48, usage: 'Page header spacing' },
            { token: '16', px: 64, usage: 'Hero section padding' },
            { token: '20', px: 80, usage: 'Large page sections' },
            { token: '24', px: 96, usage: 'Maximum section spacing' },
          ].map(row => (
            <tr key={row.token}>
              <td><code>spacing['{row.token}']</code></td>
              <td><strong>{row.px}</strong> px</td>
              <td>{(row.px / 16).toFixed(row.px % 16 === 0 ? 0 : 3)} rem</td>
              <td style={{ color: 'inherit', opacity: 0.7 }}>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
