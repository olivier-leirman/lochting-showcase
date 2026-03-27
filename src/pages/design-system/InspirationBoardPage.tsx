import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, Chip, Divider, alpha } from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { STYLES_BY_ID } from '../../styles';

const PLACEHOLDER_CARDS = [
  { label: 'Surface Treatment', gradient: [0, 1] },
  { label: 'Shadow Example', gradient: [1, 2] },
  { label: 'Color Palette', gradient: [2, 3] },
  { label: 'Button Style', gradient: [3, 4] },
  { label: 'Card Layout', gradient: [0, 3] },
  { label: 'Typography Feel', gradient: [1, 4] },
  { label: 'Interaction Pattern', gradient: [2, 0] },
  { label: 'Spacing Rhythm', gradient: [4, 1] },
] as const;

export function InspirationBoardPage() {
  const { style } = useParams();
  const { brand, effects } = useBrand();
  const c = brand.colors;

  const styleDef = style ? STYLES_BY_ID[style] : undefined;
  const styleName = styleDef?.name ?? style ?? 'Unknown';

  // Brand palette for gradients
  const palette = [
    c.brand100,
    c.brand200,
    c.brand300,
    c.brand400,
    c.brand500,
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 960, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentPrimary, mb: 1 }}>
        Inspiration Board — {styleName}
      </Typography>
      <Typography variant="body1" sx={{ color: c.contentSecondary, mb: 5, maxWidth: 600 }}>
        Collect visual references, mood images, and style cues that define the{' '}
        <strong>{styleName}</strong> direction. These images feed the AI style extraction pipeline.
      </Typography>

      {/* ─── Section 1: Upload Zone ─── */}
      <Typography variant="h6" sx={{ fontWeight: 600, color: c.contentPrimary, mb: 2 }}>
        Upload Zone
      </Typography>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: c.borderDefault,
          borderRadius: 3,
          p: 5,
          textAlign: 'center',
          bgcolor: alpha(c.brand100, 0.3),
          transition: 'border-color 0.2s, background 0.2s',
          cursor: 'pointer',
          '&:hover': {
            borderColor: c.brand300,
            bgcolor: alpha(c.brand100, 0.5),
          },
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: c.brand100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <Icon name="cloud_upload" size={28} color={c.brand400} />
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 600, color: c.contentPrimary, mb: 0.5 }}>
          Drag &amp; drop images, paste from clipboard, or click to browse
        </Typography>
        <Typography variant="body2" sx={{ color: c.contentTertiary, mb: 3 }}>
          Supports PNG, JPG, WebP up to 10 MB
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Icon name="upload" size={18} />}
          >
            Upload
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon name="link" size={18} />}
          >
            Paste URL
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* ─── Section 2: Image Gallery ─── */}
      <Typography variant="h6" sx={{ fontWeight: 600, color: c.contentPrimary, mb: 0.5 }}>
        Image Gallery
      </Typography>
      <Typography variant="body2" sx={{ color: c.contentSecondary, mb: 3 }}>
        {PLACEHOLDER_CARDS.length} references collected for this style direction.
      </Typography>

      <Box
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3 },
          columnGap: 3,
          mb: 5,
        }}
      >
        {PLACEHOLDER_CARDS.map((card, idx) => {
          const c1 = palette[card.gradient[0]];
          const c2 = palette[card.gradient[1]];
          // Vary heights for masonry effect
          const heights = [180, 240, 200, 260, 220, 190, 250, 210];
          const h = heights[idx % heights.length];

          return (
            <Card
              key={card.label}
              sx={{
                breakInside: 'avoid',
                mb: 3,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: c.borderWeak,
                boxShadow: effects.shadows.secondaryButton,
                transition: 'box-shadow 0.2s, border-color 0.2s',
                '&:hover': {
                  boxShadow: effects.shadows.secondaryButtonHover,
                  borderColor: c.brand300,
                },
              }}
            >
              <Box
                sx={{
                  height: h,
                  background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="image" size={32} color={alpha('#ffffff', 0.5)} />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: c.contentPrimary, fontSize: '0.8rem' }}
                >
                  {card.label}
                </Typography>
                <Chip
                  label={styleName}
                  size="small"
                  sx={{
                    mt: 1,
                    fontSize: '0.65rem',
                    height: 20,
                    bgcolor: c.brand100,
                    color: c.brand450,
                  }}
                />
              </Box>
            </Card>
          );
        })}
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* ─── Section 3: Style Direction ─── */}
      <Typography variant="h6" sx={{ fontWeight: 600, color: c.contentPrimary, mb: 0.5 }}>
        Style Direction
      </Typography>
      <Typography variant="body2" sx={{ color: c.contentSecondary, mb: 3 }}>
        Based on the images above, an AI will generate a style direction document with visual
        characteristics, interaction principles, and MUI translation values.
      </Typography>

      <Box
        sx={{
          bgcolor: c.bgElevated,
          border: '1px solid',
          borderColor: c.borderDefault,
          borderRadius: 3,
          p: 4,
          mb: 3,
        }}
      >
        {/* Placeholder markdown-like preview */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: c.contentPrimary, mb: 2, fontSize: '1rem' }}
        >
          Style Direction: {styleName}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: c.contentSecondary, lineHeight: 1.8, mb: 2 }}
        >
          <strong>Visual Character:</strong> {styleDef?.description ?? 'No description available yet. Upload images and generate with AI to create the style direction.'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          {[
            { label: 'Surface', value: 'Translucent layers with frosted glass effect' },
            { label: 'Elevation', value: 'Layered shadows with soft ambient light' },
            { label: 'Borders', value: 'Subtle 1px borders with low opacity' },
            { label: 'Radius', value: 'Medium rounding (8–16px)' },
            { label: 'Motion', value: 'Gentle easing, 200–300ms transitions' },
          ].map((item) => (
            <Box key={item.label} sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={item.label}
                size="small"
                sx={{
                  fontSize: '0.65rem',
                  height: 22,
                  bgcolor: c.brand100,
                  color: c.brand400,
                  fontWeight: 600,
                  minWidth: 72,
                }}
              />
              <Typography variant="body2" sx={{ color: c.contentSecondary, fontSize: '0.8rem' }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            bgcolor: alpha(c.brand100, 0.5),
            borderRadius: 2,
            p: 2.5,
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: c.contentSecondary,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
{`// MUI Translation (generated)
{
  shape: { borderRadius: 12 },
  shadows: { card: '0 2px 8px rgba(0,0,0,0.06)' },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { backdropFilter: 'blur(12px)' }
      }
    }
  }
}`}
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<Icon name="auto_awesome" size={18} />}
        sx={{ mb: 2 }}
      >
        Generate with AI
      </Button>
      <Typography variant="caption" sx={{ display: 'block', color: c.contentTertiary }}>
        Analyzes uploaded images using AI vision to extract visual patterns, then generates a
        complete style direction document with concrete MUI theme values.
      </Typography>
    </Box>
  );
}
