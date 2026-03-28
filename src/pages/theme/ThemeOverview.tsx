import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';

const THEME_SECTIONS = [
  { label: 'Colors & Palettes', icon: 'palette', path: '/theme/colors', description: 'Brand colors, system colors, and accent palettes' },
  { label: 'Typography', icon: 'text_fields', path: '/theme/typography', description: 'Font families, sizes, weights, and line heights' },
  { label: 'Spacing & Sizing', icon: 'space_bar', path: '/theme/spacing', description: '4-8pt grid, component sizing, and layout spacing' },
  { label: 'Effects', icon: 'auto_awesome', path: '/theme/effects', description: 'Shadows, gradients, and visual treatments' },
  { label: 'Icons', icon: 'category', path: '/theme/icons', description: 'Material Symbols library and usage guidelines' },
  { label: 'Brand Identity', icon: 'fingerprint', path: '/theme/identity/medipim/flat', description: 'Full brand showcase per platform and style' },
];

const STYLE_SECTIONS = [
  { label: 'Style Variants', icon: 'style', path: '/theme/styles', description: 'Visual styles: Flat, Neumorphism, Glass, Brutalism, Soft' },
  { label: 'Style Creator', icon: 'brush', path: '/theme/styles/creator', description: 'Create and customize visual style definitions' },
];

export function ThemeOverview() {
  const navigate = useNavigate();
  const { currentPlatform, currentStyle } = useBrand();

  return (
    <Box>
      <Typography variant="h4" fontWeight={500}>Theme</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Design tokens and visual foundation for <strong>{currentPlatform.name}</strong> — {currentStyle.label}.
      </Typography>

      <Grid container spacing={2}>
        {THEME_SECTIONS.map(section => (
          <Grid key={section.path} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              onClick={() => navigate(section.path)}
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
              }}
            >
              <Icon name={section.icon} size={28} sx={{ color: 'primary.main', mb: 1.5 }} />
              <Typography fontWeight={500}>{section.label}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {section.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="overline"
        sx={{ display: 'block', mt: 5, mb: 2, fontWeight: 500, letterSpacing: '0.08em', color: 'text.secondary' }}
      >
        STYLES
      </Typography>

      <Grid container spacing={2}>
        {STYLE_SECTIONS.map(section => (
          <Grid key={section.path} size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              onClick={() => navigate(section.path)}
              sx={{
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
              }}
            >
              <Icon name={section.icon} size={28} sx={{ color: 'primary.main', mb: 1.5 }} />
              <Typography fontWeight={500}>{section.label}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {section.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
