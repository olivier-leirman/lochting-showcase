import { Box, Typography, Divider } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { PRIMITIVES } from '../../theme/tokens/primitives';
import { CodeBlock } from '../blocks/CodeBlock';

/* ── Radius entries ── */
const RADIUS_SCALE = Object.entries(PRIMITIVES.radius).map(([token, px]) => ({
  token,
  px: px as number,
}));

/* ── Component sizing entries ── */
const COMPONENT_SIZES = Object.entries(PRIMITIVES.component).map(([token, px]) => ({
  token,
  px: px as number,
}));

/* ── Radius swatch ── */
function RadiusSwatch({ token, px, brandColor }: { token: string; px: number; brandColor: string }) {
  const resolvedRadius = px > 200 ? 24 : px; // show round as 24px visually for the swatch
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 0.75 }}>
      <Typography
        variant="body2"
        sx={{ width: 64, fontFamily: 'monospace', fontWeight: 600, flexShrink: 0, textAlign: 'right' }}
      >
        {token}
      </Typography>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: `${resolvedRadius}px`,
          border: `2px solid ${brandColor}`,
          bgcolor: `${brandColor}14`,
          flexShrink: 0,
          transition: 'border-radius 0.2s ease',
        }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 48 }}>
        {px === 1000 ? 'round (1000px)' : `${px} px`}
      </Typography>
    </Box>
  );
}

/* ── Component size bar row ── */
function SizeRow({ token, px, brandColor }: { token: string; px: number; brandColor: string }) {
  const label = token
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 0.75 }}>
      <Typography
        variant="body2"
        sx={{ width: 160, fontFamily: 'monospace', fontWeight: 600, flexShrink: 0, textAlign: 'right', fontSize: '0.75rem' }}
      >
        {token}
      </Typography>
      <Box
        sx={{
          width: Math.max(px, 4),
          height: 20,
          borderRadius: 0.5,
          bgcolor: brandColor,
          opacity: 0.7,
          transition: 'width 0.2s ease',
          flexShrink: 0,
        }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary', minWidth: 48 }}>
        {px} px
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
        {label}
      </Typography>
    </Box>
  );
}

export function SizingPage() {
  const { brand } = useBrand();
  const c = brand.colors;
  const sw = brand.typography.strongWeight ?? 600;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>Sizing</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        Border radii, responsive breakpoints, and component sizing primitives. All values are defined centrally
        in <code>PRIMITIVES</code> for consistency across the design system.
      </Typography>
      <CodeBlock
        code={`import { PRIMITIVES } from './theme/tokens/primitives';\n\nPRIMITIVES.radius.md    // 12 px — buttons, inputs\nPRIMITIVES.radius.round // 1000 px — pills, chips\nPRIMITIVES.component.buttonHeight // 48 px`}
        language="tsx"
      />

      <Divider sx={{ my: 4 }} />

      {/* ── Border Radius ── */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: sw }}>Border Radius</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        A progressive radius scale from sharp corners to fully rounded pills.
      </Typography>

      <Box sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 3,
        mb: 4,
      }}>
        {RADIUS_SCALE.map(({ token, px }) => (
          <RadiusSwatch key={token} token={token} px={px} brandColor={c.brand400} />
        ))}
      </Box>

      {/* Radius reference table */}
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': { textAlign: 'left', py: 1, px: 2, borderBottom: '1px solid', borderColor: 'divider', fontSize: '0.875rem' },
          '& th': { fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
          mb: 4,
        }}
      >
        <thead>
          <tr>
            <th>Token</th>
            <th>Pixels</th>
            <th>Common usage</th>
          </tr>
        </thead>
        <tbody>
          {[
            { token: 'none', px: 0, usage: 'Sharp corners, resets' },
            { token: 'xs', px: 4, usage: 'Checkboxes, small elements' },
            { token: 'sm', px: 8, usage: 'Calendar days, small cards' },
            { token: 'md', px: 12, usage: 'Buttons, inputs, cards' },
            { token: 'lg', px: 16, usage: 'Picker poppers, large cards' },
            { token: 'xl', px: 24, usage: 'Modals, dialogs' },
            { token: 'round', px: 1000, usage: 'Chips, pills, switches, badges' },
          ].map(row => (
            <tr key={row.token}>
              <td><code>radius.{row.token}</code></td>
              <td><strong>{row.px}</strong> px</td>
              <td style={{ color: 'inherit', opacity: 0.7 }}>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── Breakpoints ── */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: sw }}>Breakpoints</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Standard responsive breakpoints aligned with MUI defaults. Use with <code>theme.breakpoints.up()</code>,
        the <code>sx</code> prop breakpoint keys, or directly via <code>PRIMITIVES.breakpoints</code>.
      </Typography>

      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': { textAlign: 'left', py: 1, px: 2, borderBottom: '1px solid', borderColor: 'divider', fontSize: '0.875rem' },
          '& th': { fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
          mb: 4,
        }}
      >
        <thead>
          <tr>
            <th>Token</th>
            <th>Min-width</th>
            <th>Target</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {[
            { token: 'xs', px: 0, target: 'Small phones', usage: 'sx={{ xs: 12 }}' },
            { token: 'sm', px: 600, target: 'Large phones / small tablets', usage: 'sx={{ sm: 6 }}' },
            { token: 'md', px: 900, target: 'Tablets', usage: 'sx={{ md: 4 }}' },
            { token: 'lg', px: 1200, target: 'Laptops / desktops', usage: 'sx={{ lg: 3 }}' },
            { token: 'xl', px: 1536, target: 'Large desktops', usage: 'sx={{ xl: 2 }}' },
          ].map(row => (
            <tr key={row.token}>
              <td><code>breakpoints.{row.token}</code></td>
              <td><strong>{row.px}</strong> px</td>
              <td>{row.target}</td>
              <td style={{ color: 'inherit', opacity: 0.7 }}><code>{row.usage}</code></td>
            </tr>
          ))}
        </tbody>
      </Box>

      <CodeBlock
        code={`// In sx prop\n<Box sx={{ display: { xs: 'block', md: 'flex' } }} />\n\n// In styled components\ntheme.breakpoints.up('md')   // @media (min-width: 900px)\ntheme.breakpoints.down('sm') // @media (max-width: 599.95px)\ntheme.breakpoints.between('sm', 'lg')`}
        language="tsx"
      />

      <Divider sx={{ my: 4 }} />

      {/* ── Component Sizes ── */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: sw }}>Component Sizes</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Fixed sizing tokens for interactive components. These ensure consistent touch targets and visual
        proportions across the design system.
      </Typography>

      <Box sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        p: 3,
        mb: 4,
      }}>
        {COMPONENT_SIZES.map(({ token, px }) => (
          <SizeRow key={token} token={token} px={px} brandColor={c.brand400} />
        ))}
      </Box>

      {/* Component sizes reference table */}
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': { textAlign: 'left', py: 1, px: 2, borderBottom: '1px solid', borderColor: 'divider', fontSize: '0.875rem' },
          '& th': { fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
        }}
      >
        <thead>
          <tr>
            <th>Token</th>
            <th>Pixels</th>
            <th>Component</th>
          </tr>
        </thead>
        <tbody>
          {[
            { token: 'buttonHeight', px: 48, component: 'Primary / secondary buttons (default)' },
            { token: 'buttonHeightSm', px: 40, component: 'Small buttons' },
            { token: 'utilityButtonSize', px: 32, component: 'Icon buttons, utility actions' },
            { token: 'checkboxSize', px: 20, component: 'Checkbox icons' },
            { token: 'radioDotSize', px: 8, component: 'Radio button inner dot' },
            { token: 'switchWidth', px: 44, component: 'Switch track width' },
            { token: 'switchHeight', px: 20, component: 'Switch track height' },
            { token: 'switchThumbSize', px: 16, component: 'Switch thumb diameter' },
            { token: 'sliderTrackHeight', px: 12, component: 'Slider track height' },
            { token: 'sliderThumbSize', px: 20, component: 'Slider thumb diameter' },
            { token: 'chipHeight', px: 24, component: 'Chip (small)' },
            { token: 'chipHeightLg', px: 40, component: 'Chip (medium)' },
            { token: 'badgeSize', px: 24, component: 'Badge diameter' },
            { token: 'inputHeight', px: 48, component: 'Input fields (default)' },
            { token: 'inputHeightSm', px: 40, component: 'Input fields (small)' },
          ].map(row => (
            <tr key={row.token}>
              <td><code>component.{row.token}</code></td>
              <td><strong>{row.px}</strong> px</td>
              <td style={{ color: 'inherit', opacity: 0.7 }}>{row.component}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
