import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Avatar, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { getComponentsByCategory } from '../registry';
import type { BrandTokens } from '../../theme/types';

function sw(brand: BrandTokens) { return brand.typography.strongWeight ?? 600; }

/* ─── Component icon mapping (for component grid) ─── */
const COMPONENT_ICONS: Record<string, string> = {
  button: 'smart_button', 'button-group': 'view_column', 'toggle-button': 'toggle_on', 'toggle-chip': 'filter_alt',
  textfield: 'text_fields', 'search-field': 'search', select: 'arrow_drop_down_circle', autocomplete: 'auto_awesome',
  'multi-select': 'checklist', checkbox: 'check_box', radio: 'radio_button_checked', switch: 'toggle_on',
  slider: 'linear_scale', 'date-picker': 'calendar_today', 'time-picker': 'schedule', 'datetime-picker': 'event',
  'date-range-picker': 'date_range',
  table: 'table_chart', 'advanced-table': 'table_view', chip: 'label', badge: 'notifications', icon: 'emoji_symbols',
  alert: 'warning', dialog: 'open_in_new', progress: 'hourglass_top',
  card: 'crop_landscape', accordion: 'expand_more',
  tabs: 'tab', breadcrumbs: 'chevron_right', pagination: 'more_horiz', stepper: 'linear_scale',
  sidebar: 'side_navigation', 'top-bar': 'web_asset', 'app-layout': 'dashboard',
};

const CATEGORY_LABELS: Record<string, string> = {
  actions: 'Actions', inputs: 'Inputs', 'data-display': 'Data Display',
  feedback: 'Feedback', surfaces: 'Surfaces', navigation: 'Navigation',
};
const CATEGORY_ORDER = ['actions', 'inputs', 'data-display', 'feedback', 'surfaces', 'navigation'];

/* ════════════════════════════════════════════════════════════════════
   SECTION: Hero
   ════════════════════════════════════════════════════════════════════ */

function HeroSection({ brand }: { brand: BrandTokens }) {
  const { effects } = useBrand();
  const c = brand.colors;
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 6, maxWidth: 680, mx: 'auto' }}>
      <Chip
        label="Design System v2.0"
        size="small"
        sx={{
          mb: 3,
          bgcolor: c.brand100,
          color: c.brand450,
          fontWeight: sw(brand),
          fontSize: '0.75rem',
          px: 1,
        }}
        icon={<Icon name="auto_awesome" size={14} color={c.brand400} />}
      />
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2rem', md: '2.75rem' },
          fontWeight: 700,
          lineHeight: 1.15,
          mb: 2,
          color: c.contentPrimary,
        }}
      >
        Build beautiful apps with{' '}
        <Box
          component="span"
          sx={{
            background: effects.gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          premium components
        </Box>
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: c.contentSecondary, mb: 4, maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}
      >
        A modern component library built on MUI with layered shadows, brand gradients, and a tactile feel.
        Switch brands, toggle dark mode, inspect tokens.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/getting-started')}
          endIcon={<Icon name="arrow_forward" size={18} />}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/tokens/colors')}
          startIcon={<Icon name="palette" size={18} />}
        >
          Explore Tokens
        </Button>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: Stats bar
   ════════════════════════════════════════════════════════════════════ */

function StatsBar({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const stats = [
    { value: '40+', label: 'Components' },
    { value: '2', label: 'Brands' },
    { value: '50+', label: 'Tokens' },
    { value: '100%', label: 'Accessible' },
  ];
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 3,
        py: 4,
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: c.borderDefault,
      }}
    >
      {stats.map(s => (
        <Box key={s.label} sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: c.brand400, lineHeight: 1.2 }}>
            {s.value}
          </Typography>
          <Typography variant="caption" sx={{ color: c.contentTertiary }}>
            {s.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: Feature cards
   ════════════════════════════════════════════════════════════════════ */

function FeatureCards({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const { effects } = useBrand();

  const features = [
    {
      icon: 'palette',
      title: 'Design Tokens',
      desc: 'Semantic colors, spacing, typography, and effects — all from Figma, all brand-switchable.',
    },
    {
      icon: 'layers',
      title: 'Layered Shadows',
      desc: 'Multi-layer box shadows with insets create depth and a premium tactile feel.',
    },
    {
      icon: 'dark_mode',
      title: 'Dark Mode Ready',
      desc: 'Explicit dark overrides from Figma — no algorithmic guessing. Pixel-perfect in both modes.',
    },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
      {features.map(f => (
        <Box
          key={f.title}
          sx={{
            bgcolor: c.bgElevated,
            borderRadius: 3,
            p: 3.5,
            border: '1px solid',
            borderColor: c.borderWeak,
            boxShadow: effects.shadows.secondaryButton,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:hover': { borderColor: c.brand300, boxShadow: effects.shadows.secondaryButtonHover },
          }}
        >
          <Box
            sx={{
              width: 44, height: 44, borderRadius: 2,
              background: effects.gradients.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: 2.5,
            }}
          >
            <Icon name={f.icon} size={22} color={c.contentStayLight} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: sw(brand), mb: 1, color: c.contentPrimary, fontSize: '1rem' }}>
            {f.title}
          </Typography>
          <Typography variant="body2" sx={{ color: c.contentSecondary, lineHeight: 1.65 }}>
            {f.desc}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: Dashboard Preview (embedded mini-dashboard)
   ════════════════════════════════════════════════════════════════════ */

function MiniStatCard({ icon, value, label, change, brand }: {
  icon: string; value: string; label: string; change?: string; brand: BrandTokens;
}) {
  const c = brand.colors;
  const isPositive = change?.startsWith('+');
  return (
    <Box sx={{ bgcolor: c.bgElevated, borderRadius: 2, p: 2, border: '1px solid', borderColor: c.borderDefault, flex: 1, minWidth: 100 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: c.brand100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={16} color={c.brand400} />
        </Box>
        {change && (
          <Chip label={change} size="small" sx={{
            fontSize: '0.6rem', height: 18, fontWeight: sw(brand),
            bgcolor: isPositive ? c.success.bgWeakest : c.error.bgWeakest,
            color: isPositive ? c.success.contentStrong : c.error.contentStrong,
          }} />
        )}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, color: c.contentPrimary, lineHeight: 1.2, fontSize: '1.1rem' }}>{value}</Typography>
      <Typography variant="caption" sx={{ color: c.contentTertiary, fontSize: '0.65rem' }}>{label}</Typography>
    </Box>
  );
}

function DashboardPreview({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const { effects } = useBrand();

  const rows = [
    { name: 'Sarah Chen', avatar: 'SC', action: 'Updated product catalog', status: 'Completed' },
    { name: 'Marcus Webb', avatar: 'MW', action: 'Created new campaign', status: 'Active' },
    { name: 'Elena Rossi', avatar: 'ER', action: 'Submitted order #4821', status: 'Pending' },
  ];

  const statusColor = (s: string) => s === 'Completed' ? 'success' : s === 'Active' ? 'primary' : 'warning';

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentPrimary, mb: 1 }}>
          Components in action
        </Typography>
        <Typography variant="body2" sx={{ color: c.contentSecondary, maxWidth: 480, mx: 'auto' }}>
          See how stat cards, charts, tables, chips, and avatars come together in a real dashboard context.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: c.bgBase,
          borderRadius: 3,
          border: '1px solid',
          borderColor: c.borderDefault,
          boxShadow: effects.shadows.sidebar,
          overflow: 'hidden',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {/* Stats row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          <MiniStatCard icon="trending_up" value="2,847" label="Active users" change="+12.5%" brand={brand} />
          <MiniStatCard icon="inventory_2" value="14.2k" label="Products" change="+3.1%" brand={brand} />
          <MiniStatCard icon="payments" value="$48.2k" label="Revenue" change="+8.7%" brand={brand} />
          <MiniStatCard icon="shopping_cart" value="1,423" label="Orders" change="+5.2%" brand={brand} />
        </Box>

        {/* Chart bars */}
        <Box sx={{ bgcolor: c.bgElevated, borderRadius: 2, border: '1px solid', borderColor: c.borderDefault, p: 2.5 }}>
          <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary, mb: 0.5, fontSize: '0.8rem' }}>
            Revenue Overview
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 80, mt: 1.5 }}>
            {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
              <Box key={i} sx={{
                flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0',
                background: i >= 10 ? c.brand200 : c.brand400,
                opacity: i >= 10 ? 0.5 : 0.2 + (i * 0.07),
              }} />
            ))}
          </Box>
        </Box>

        {/* Activity table */}
        <Box sx={{ bgcolor: c.bgElevated, borderRadius: 2, border: '1px solid', borderColor: c.borderDefault }}>
          <Box sx={{ px: 2.5, py: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary, fontSize: '0.8rem' }}>
              Recent Activity
            </Typography>
          </Box>
          <TableContainer sx={{ border: 'none' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '0.7rem' }}>User</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem' }}>Action</TableCell>
                  <TableCell sx={{ fontSize: '0.7rem' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.name}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.6rem', bgcolor: c.brand100, color: c.brand500 }}>{r.avatar}</Avatar>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{r.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{r.action}</Typography></TableCell>
                    <TableCell><Chip label={r.status} size="small" color={statusColor(r.status) as any} sx={{ fontSize: '0.6rem', height: 20 }} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: Testimonials
   ════════════════════════════════════════════════════════════════════ */

function TestimonialSection({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const { effects } = useBrand();

  const testimonials = [
    { quote: 'The token system made our design-dev handoff seamless. We ship UI 3x faster now.', name: 'Sarah Chen', role: 'Lead Designer', avatar: 'SC' },
    { quote: 'Switching brands for our white-label product takes minutes, not weeks. Game changer.', name: 'Marcus Webb', role: 'CTO', avatar: 'MW' },
    { quote: 'The layered shadows and gradients give our SaaS a premium feel our competitors lack.', name: 'Elena Rossi', role: 'Product Manager', avatar: 'ER' },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentPrimary, mb: 1 }}>
          Loved by teams
        </Typography>
        <Typography variant="body2" sx={{ color: c.contentSecondary }}>
          See what builders say about working with the design system.
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {testimonials.map(t => (
          <Box
            key={t.name}
            sx={{
              bgcolor: c.bgElevated,
              borderRadius: 3,
              p: 3,
              border: '1px solid',
              borderColor: c.borderWeak,
              boxShadow: effects.shadows.secondaryButton,
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
            }}
          >
            <Icon name="format_quote" size={24} color={c.brand300} />
            <Typography variant="body2" sx={{ color: c.contentPrimary, lineHeight: 1.7, flex: 1 }}>
              {t.quote}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 36, height: 36, fontSize: '0.75rem', bgcolor: c.brand100, color: c.brand500 }}>{t.avatar}</Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary, fontSize: '0.8rem' }}>
                  {t.name}
                </Typography>
                <Typography variant="caption" sx={{ color: c.contentTertiary, fontSize: '0.7rem' }}>
                  {t.role}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: Component Grid (condensed)
   ════════════════════════════════════════════════════════════════════ */

function ComponentGrid({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const { effects } = useBrand();
  const navigate = useNavigate();

  // Show top 3 categories only
  const topCategories = CATEGORY_ORDER.slice(0, 3);

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentPrimary, mb: 1 }}>
          40+ production-ready components
        </Typography>
        <Typography variant="body2" sx={{ color: c.contentSecondary, maxWidth: 480, mx: 'auto' }}>
          From buttons to advanced tables — every component follows the token system and supports brand switching.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {topCategories.map(cat => {
          const components = getComponentsByCategory(cat).slice(0, 4);
          if (!components.length) return null;
          return (
            <Box key={cat}>
              <Typography variant="caption" sx={{
                fontWeight: sw(brand), mb: 2, display: 'block', color: c.contentTertiary,
                letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem',
              }}>
                {CATEGORY_LABELS[cat]}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                {components.map(comp => (
                  <Box
                    key={comp.id}
                    onClick={() => navigate(`/components/${comp.id}`)}
                    sx={{
                      bgcolor: c.bgElevated,
                      borderRadius: 2,
                      p: 2,
                      border: '1px solid',
                      borderColor: c.borderWeak,
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                      '&:hover': { borderColor: c.brand300, boxShadow: effects.shadows.secondaryButtonHover },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{
                      width: 32, height: 32, borderRadius: 1.5,
                      bgcolor: c.brand100,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon name={COMPONENT_ICONS[comp.id] ?? 'widgets'} size={16} color={c.brand400} />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary, fontSize: '0.8rem' }}>
                      {comp.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/components/button')}
          endIcon={<Icon name="arrow_forward" size={18} />}
        >
          View All Components
        </Button>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: Progress / Token coverage
   ════════════════════════════════════════════════════════════════════ */

function TokenCoverage({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;

  const items = [
    { label: 'Color tokens', value: 92 },
    { label: 'Typography', value: 100 },
    { label: 'Spacing', value: 100 },
    { label: 'Effects', value: 85 },
    { label: 'Dark mode', value: 95 },
  ];

  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 3,
      p: 4,
      border: '1px solid',
      borderColor: c.borderDefault,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: c.contentPrimary, fontSize: '1rem' }}>
            Token Coverage
          </Typography>
          <Typography variant="caption" sx={{ color: c.contentTertiary }}>
            Design system implementation progress
          </Typography>
        </Box>
        <Chip label="94% overall" size="small" sx={{ bgcolor: c.success.bgWeakest, color: c.success.contentStrong, fontWeight: 600, fontSize: '0.7rem' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => (
          <Box key={item.label}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontSize: '0.75rem', color: c.contentSecondary }}>{item.label}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.75rem', fontWeight: 600, color: c.contentPrimary }}>{item.value}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={item.value}
              sx={{ height: 6, borderRadius: 1 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION: CTA
   ════════════════════════════════════════════════════════════════════ */

function CTASection({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const { effects } = useBrand();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 4,
        borderRadius: 3,
        background: effects.gradients.primary,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: c.contentStayLight, mb: 1 }}>
        Ready to build?
      </Typography>
      <Typography variant="body2" sx={{ color: c.contentStayLight, opacity: 0.85, mb: 4, maxWidth: 420, mx: 'auto' }}>
        Explore the full component library, switch brands, toggle dark mode, and inspect every token.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/components/button')}
          sx={{
            bgcolor: c.contentStayLight,
            color: c.brand500,
            '&:hover': { bgcolor: c.contentStayLight, filter: 'brightness(0.95)' },
            boxShadow: 'none',
          }}
          endIcon={<Icon name="arrow_forward" size={18} />}
        >
          Browse Components
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/tokens/colors')}
          sx={{
            borderColor: 'rgba(255,255,255,0.4)',
            color: c.contentStayLight,
            '&:hover': { borderColor: c.contentStayLight, bgcolor: 'rgba(255,255,255,0.08)' },
          }}
          startIcon={<Icon name="palette" size={18} />}
        >
          Design Tokens
        </Button>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN HOME PAGE
   ════════════════════════════════════════════════════════════════════ */

export function HomePage() {
  const { brand } = useBrand();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <HeroSection brand={brand} />
      <StatsBar brand={brand} />
      <FeatureCards brand={brand} />
      <DashboardPreview brand={brand} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, alignItems: 'start' }}>
        <TokenCoverage brand={brand} />
        <TestimonialSection brand={brand} />
      </Box>
      <ComponentGrid brand={brand} />
      <CTASection brand={brand} />
    </Box>
  );
}
