import { Box, Typography, Card, Button, Chip, Divider, alpha } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useBrand } from '../../theme/brand-context';
import { Icon } from '../../components/Icon';

export function BrandIdentityPage() {
  const { brand: _brand, style: _style } = useParams();
  const { brand, sourceBrand, styleProfile, activeStyleDefinition } = useBrand();

  const c = brand.colors;
  const brandName = sourceBrand.name;
  const styleLabel = activeStyleDefinition?.name ?? styleProfile.label;

  return (
    <Box sx={{ p: 4, maxWidth: 1200 }}>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Icon name="palette" size={28} color="inherit" />
          <Typography variant="h4" fontWeight={500}>
            {brandName} &mdash; {styleLabel}
          </Typography>
        </Box>
        <Typography color="text.secondary">
          Complete brand identity overview showing colors, typography, and component compositions.
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ── Section 1: Hero ── */}
      <Box sx={{ mb: 5 }}>
        <SectionHeader icon="auto_awesome" label="Hero" />
        <Box
          sx={{
            background: `linear-gradient(135deg, ${c.brand400} 0%, ${c.brand450} 100%)`,
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circle */}
          <Box
            sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.08)',
            }}
          />
          <Typography
            variant="h2"
            sx={{ fontWeight: 500, mb: 1, color: 'inherit', position: 'relative' }}
          >
            Welcome to {brandName}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 400, mb: 4, opacity: 0.85, color: 'inherit', maxWidth: 520, position: 'relative' }}
          >
            A modern platform built with care for pharmacy professionals and their patients.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, position: 'relative' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#fff',
                color: c.brand450,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                fontWeight: 500,
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ── Section 2: Card Compositions ── */}
      <Box sx={{ mb: 5 }}>
        <SectionHeader icon="dashboard" label="Card Compositions" />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {/* Product Card */}
          <Card sx={{ overflow: 'hidden' }}>
            {/* Image placeholder */}
            <Box
              sx={{
                height: 160,
                bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="image" size={48} color={c.brand300} />
            </Box>
            <Box sx={{ p: 2.5 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Pharma Product
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1 }}>
                Ibuprofen 400mg
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="primary.main" sx={{ fontSize: '1.1rem' }}>
                  &euro;8.95
                </Typography>
                <Button variant="contained" size="small">
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </Card>

          {/* Notification Card */}
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: (t) => alpha(t.palette.info.main, 0.12),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name="notifications" size={22} color={c.info.bgDefault} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                  New order received
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                  Order #4821 has been placed by Apotheek De Linde. Contains 12 items worth
                  &euro;234.50.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon name="schedule" size={14} color={c.contentTertiary} />
                  <Typography variant="caption" color="text.secondary">
                    2 min ago
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Stats Card */}
          <Card sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ mb: 1, display: 'block' }}>
              Monthly Revenue
            </Typography>
            <Typography variant="h3" fontWeight={500} sx={{ mb: 1 }}>
              &euro;42,850
            </Typography>
            <Chip
              icon={<Icon name="trending_up" size={16} filled />}
              label="+12.4% vs last month"
              size="small"
              color="success"
              sx={{ height: 26, '& .MuiChip-label': { fontSize: 12 } }}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 0.5, alignItems: 'flex-end', height: 48 }}>
              {[35, 48, 40, 55, 62, 58, 72, 68, 80, 75, 90, 85].map((h, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: 0.5,
                    bgcolor: (t) =>
                      i >= 10
                        ? t.palette.primary.main
                        : alpha(t.palette.primary.main, 0.25),
                  }}
                />
              ))}
            </Box>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ── Section 3: Color Usage ── */}
      <Box sx={{ mb: 5 }}>
        <SectionHeader icon="format_paint" label="Color Usage" />

        {/* Brand scale */}
        <Typography variant="body2" fontWeight={500} sx={{ mb: 1.5 }}>
          Brand Scale
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {(
            [
              { label: 'brand100', color: c.brand100 },
              { label: 'brand200', color: c.brand200 },
              { label: 'brand300', color: c.brand300 },
              { label: 'brand400', color: c.brand400 },
              { label: 'brand450', color: c.brand450 },
              { label: 'brand500', color: c.brand500 },
            ] as const
          ).map(({ label, color }) => (
            <ColorSwatch key={label} label={label} color={color} />
          ))}
        </Box>

        {/* Background colors */}
        <Typography variant="body2" fontWeight={500} sx={{ mb: 1.5 }}>
          Backgrounds
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          <ColorSwatch label="bgBase" color={c.bgBase} bordered />
          <ColorSwatch label="bgElevated" color={c.bgElevated} bordered />
          <ColorSwatch label="bgSunken" color={c.bgSunken} bordered />
        </Box>

        {/* Content colors */}
        <Typography variant="body2" fontWeight={500} sx={{ mb: 1.5 }}>
          Content
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <ColorSwatch label="contentPrimary" color={c.contentPrimary} />
          <ColorSwatch label="contentSecondary" color={c.contentSecondary} />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* ── Section 4: Typography Showcase ── */}
      <Box>
        <SectionHeader icon="text_fields" label="Typography Showcase" />
        <Card sx={{ p: 3 }}>
          <Typography variant="h1" gutterBottom>
            Heading 1 &mdash; Display
          </Typography>
          <Typography variant="h2" gutterBottom>
            Heading 2 &mdash; Display
          </Typography>
          <Typography variant="h3" gutterBottom>
            Heading 3 &mdash; Display
          </Typography>
          <Typography variant="h4" gutterBottom>
            Heading 4
          </Typography>
          <Typography variant="h5" gutterBottom>
            Heading 5
          </Typography>
          <Typography variant="h6" gutterBottom>
            Heading 6
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" gutterBottom>
            Body 1 &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="body2" gutterBottom color="text.secondary">
            Body 2 &mdash; Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Caption &mdash; Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label="Chip Label" size="small" />
            <Button variant="contained" size="small">
              Button Text
            </Button>
            <Button variant="outlined" size="small">
              Outlined
            </Button>
            <Button variant="text" size="small">
              Text Button
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Display font: <strong>{sourceBrand.typography.displayFont}</strong> &middot; Body
              font: <strong>{sourceBrand.typography.bodyFont}</strong>
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

/* ── Helper components ── */

function SectionHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Icon name={icon} size={20} />
      <Typography variant="h5" fontWeight={500}>
        {label}
      </Typography>
    </Box>
  );
}

function ColorSwatch({
  label,
  color,
  bordered = false,
}: {
  label: string;
  color: string;
  bordered?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 1.5,
          bgcolor: color,
          border: bordered ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.7 }}>
        {color}
      </Typography>
    </Box>
  );
}
