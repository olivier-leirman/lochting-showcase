import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const DS_SECTIONS = [
  { label: 'Design Rules', icon: 'rule', path: '/design-system/rules', description: 'Spacing grids, icon conventions, and component rules' },
  { label: 'Patterns', icon: 'pattern', path: '/design-system/patterns', description: 'Reusable UI patterns and interaction guidelines' },
  { label: 'Consistency', icon: 'verified', path: '/design-system/consistency', description: 'Cross-brand consistency checker and audit' },
  { label: 'QA Report', icon: 'bug_report', path: '/design-system/qa', description: 'Quality assurance report and issue tracker' },
];

const STYLE_CONTROL_SECTIONS = [
  { label: 'Style Overrides', icon: 'tune', path: '/design-system/overrides', description: 'Per-component style overrides that deviate from the active style' },
  { label: 'Exception Registry', icon: 'playlist_remove', path: '/design-system/exceptions', description: 'Documented exceptions to design rules with rationale' },
];

export function DesignSystemHub() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" fontWeight={500}>Design System</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Rules, patterns, and quality tools that keep the system consistent.
      </Typography>

      <Grid container spacing={2}>
        {DS_SECTIONS.map(section => (
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
        STYLE CONTROL
      </Typography>

      <Grid container spacing={2}>
        {STYLE_CONTROL_SECTIONS.map(section => (
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
