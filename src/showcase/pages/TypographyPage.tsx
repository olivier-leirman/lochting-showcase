import { Box, Typography, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { CodeBlock } from '../blocks/CodeBlock';
import { PRIMITIVES } from '../../theme/tokens/primitives';

/* ─── Type specimen row ─── */

interface TypeRowProps {
  /** Visual label (e.g. "h1", "body2 strong") */
  label: string;
  /** MUI Typography variant to render */
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
  /** Extra sx overrides applied to the specimen */
  sx?: Record<string, unknown>;
  /** Text to display (default: "The quick brown fox jumps over the lazy dog") */
  text?: string;
  /** Font family name to show in the info column */
  fontFamily: string;
  /** Font size (rem string) */
  fontSize: string;
  /** Font weight */
  fontWeight: number;
  /** Strong weight for label */
  strongWeight: number;
}

function TypeRow({ label, variant, sx, text, fontFamily, fontSize, fontWeight, strongWeight }: TypeRowProps) {
  const sample = text ?? 'The quick brown fox jumps over the lazy dog';

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 0.5 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: strongWeight,
            fontFamily: 'monospace',
            color: 'primary.main',
            minWidth: 120,
            flexShrink: 0,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: 'monospace', color: 'text.secondary' }}
        >
          {fontFamily} · {fontSize} · {fontWeight}
        </Typography>
      </Box>
      <Typography
        variant={variant}
        sx={{
          // Reset margins that heading variants add by default
          m: 0,
          ...sx,
        }}
      >
        {sample}
      </Typography>
    </Box>
  );
}

/* ─── Font specimen card ─── */

interface FontCardProps {
  name: string;
  family: string;
  usage: string;
  strongWeight: number;
}

function FontCard({ name, family, usage, strongWeight }: FontCardProps) {
  return (
    <Box
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        flex: 1,
        minWidth: 240,
      }}
    >
      <Typography
        sx={{
          fontFamily: family,
          fontSize: '2rem',
          fontWeight: 400,
          mb: 1,
          lineHeight: 1.2,
        }}
      >
        Aa Bb Cc
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: strongWeight, mb: 0.25 }}>
        {name}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
        {family}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
        {usage}
      </Typography>
    </Box>
  );
}

/* ─── Page ─── */

export function TypographyPage() {
  const { brand, fontPresetIndex, setFontPreset, fontPresets } = useBrand();
  const t = brand.typography;
  const p = PRIMITIVES;
  const sw = t.strongWeight ?? p.fontWeight.semibold;
  const hw = t.headingWeight ?? p.fontWeight.semibold;

  const displayFont = t.displayFont.split(',')[0].replace(/"/g, '');
  const bodyFont = t.bodyFont.split(',')[0].replace(/"/g, '');

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>Typography</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        The <strong>{brand.name}</strong> type system uses <strong>{displayFont}</strong> for display headings and <strong>{bodyFont}</strong> for
        UI text. The scale ranges from 12px (caption) to 56px (h1).
      </Typography>
      <CodeBlock
        code={`// Typography is built into the MUI theme\n<Typography variant="h1">Display heading</Typography>\n<Typography variant="body1">Body text</Typography>\n<Typography variant="body2" sx={{ fontWeight: ${sw} }}>Strong text</Typography>`}
        language="tsx"
      />

      <Divider sx={{ my: 4 }} />

      {/* ── Font families ── */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Font Families</Typography>
      {fontPresets.length > 1 && (
        <ToggleButtonGroup
          value={fontPresetIndex}
          exclusive
          onChange={(_, val) => val !== null && setFontPreset(val)}
          size="small"
          sx={{ mb: 3 }}
        >
          {fontPresets.map((preset, i) => (
            <ToggleButton key={i} value={i} sx={{ px: 2, py: 0.5, fontSize: '0.8rem' }}>
              {preset.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <FontCard
          name={displayFont}
          family={t.displayFont}
          usage="Display headings (h1–h3)"
          strongWeight={sw}
        />
        <FontCard
          name={bodyFont}
          family={t.bodyFont}
          usage="UI headings (h4–h6), body, captions, buttons"
          strongWeight={sw}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── Headings ── */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Headings</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        h1–h3 use the display font ({displayFont}), h4–h6 use the body font ({bodyFont}) at weight {hw}.
      </Typography>

      <TypeRow label="h1" variant="h1" fontFamily={displayFont} fontSize={p.fontSize['5xl']} fontWeight={p.fontWeight.regular} strongWeight={sw} />
      <TypeRow label="h2" variant="h2" fontFamily={displayFont} fontSize={p.fontSize['4xl']} fontWeight={p.fontWeight.regular} strongWeight={sw} />
      <TypeRow label="h3" variant="h3" fontFamily={displayFont} fontSize={p.fontSize['3xl']} fontWeight={p.fontWeight.regular} strongWeight={sw} />
      <TypeRow label="h4" variant="h4" fontFamily={bodyFont} fontSize={p.fontSize['2xl']} fontWeight={hw} strongWeight={sw} />
      <TypeRow label="h5" variant="h5" fontFamily={bodyFont} fontSize={p.fontSize.xl} fontWeight={hw} strongWeight={sw} />
      <TypeRow label="h6" variant="h6" fontFamily={bodyFont} fontSize={p.fontSize.lg} fontWeight={hw} strongWeight={sw} />

      <Divider sx={{ my: 4 }} />

      {/* ── Body ── */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Body</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Body text uses {bodyFont}. The "Strong" weight ({sw}) is used for emphasis and labels.
      </Typography>

      <TypeRow label="body1" variant="body1" fontFamily={bodyFont} fontSize={p.fontSize.md} fontWeight={p.fontWeight.regular} strongWeight={sw} />
      <TypeRow label="body1 strong" variant="body1" sx={{ fontWeight: sw }} fontFamily={bodyFont} fontSize={p.fontSize.md} fontWeight={sw} strongWeight={sw} />
      <TypeRow label="body2" variant="body2" fontFamily={bodyFont} fontSize={p.fontSize.sm} fontWeight={p.fontWeight.regular} strongWeight={sw} />
      <TypeRow label="body2 strong" variant="body2" sx={{ fontWeight: sw }} fontFamily={bodyFont} fontSize={p.fontSize.sm} fontWeight={sw} strongWeight={sw} />

      <Divider sx={{ my: 4 }} />

      {/* ── Caption & Button ── */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Caption & Button</Typography>

      <TypeRow label="caption" variant="caption" fontFamily={bodyFont} fontSize={p.fontSize.xs} fontWeight={p.fontWeight.regular} strongWeight={sw} />
      <TypeRow label="caption strong" variant="caption" sx={{ fontWeight: sw }} fontFamily={bodyFont} fontSize={p.fontSize.xs} fontWeight={sw} strongWeight={sw} />
      <TypeRow label="button" variant="button" fontFamily={bodyFont} fontSize={p.fontSize.sm} fontWeight={sw} strongWeight={sw} text="Button Label" />

      <Divider sx={{ my: 4 }} />

      {/* ── Type scale reference ── */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Type Scale</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        All font sizes from the primitives token system.
      </Typography>

      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            textAlign: 'left',
            py: 1,
            px: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontSize: p.fontSize.sm,
          },
          '& th': {
            fontWeight: sw,
            color: 'text.secondary',
            fontSize: p.fontSize.xs,
          },
        }}
      >
        <thead>
          <tr>
            <th>Token</th>
            <th>Size</th>
            <th>Usage</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {([
            { token: 'xs', size: p.fontSize.xs, usage: 'Caption', px: '12px' },
            { token: 'sm', size: p.fontSize.sm, usage: 'Body 2, Button', px: '14px' },
            { token: 'md', size: p.fontSize.md, usage: 'Body 1', px: '16px' },
            { token: 'lg', size: p.fontSize.lg, usage: 'h6', px: '18px' },
            { token: 'xl', size: p.fontSize.xl, usage: 'h5', px: '22px' },
            { token: '2xl', size: p.fontSize['2xl'], usage: 'h4', px: '28px' },
            { token: '3xl', size: p.fontSize['3xl'], usage: 'h3', px: '32px' },
            { token: '4xl', size: p.fontSize['4xl'], usage: 'h2', px: '40px' },
            { token: '5xl', size: p.fontSize['5xl'], usage: 'h1', px: '56px' },
          ] as const).map(row => (
            <tr key={row.token}>
              <td><Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>fontSize.{row.token}</Typography></td>
              <td><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{row.size} ({row.px})</Typography></td>
              <td><Typography variant="body2">{row.usage}</Typography></td>
              <td><Typography sx={{ fontSize: row.size }}>Aa</Typography></td>
            </tr>
          ))}
        </tbody>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── Weight reference ── */}
      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>Font Weights</Typography>

      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            textAlign: 'left',
            py: 1,
            px: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontSize: p.fontSize.sm,
          },
          '& th': {
            fontWeight: sw,
            color: 'text.secondary',
            fontSize: p.fontSize.xs,
          },
        }}
      >
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Usage</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {([
            { token: 'regular', value: p.fontWeight.regular, usage: 'Body text, display headings (h1–h3)' },
            { token: 'medium', value: p.fontWeight.medium, usage: 'Available for subtle emphasis' },
            { token: 'semibold', value: p.fontWeight.semibold, usage: `UI headings (h4–h6), strong text, buttons` },
            { token: 'bold', value: p.fontWeight.bold, usage: 'Available for heavy emphasis' },
          ] as const).map(row => (
            <tr key={row.token}>
              <td><Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>fontWeight.{row.token}</Typography></td>
              <td><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{row.value}</Typography></td>
              <td><Typography variant="body2">{row.usage}</Typography></td>
              <td><Typography sx={{ fontWeight: row.value }}>{bodyFont} {row.value}</Typography></td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
