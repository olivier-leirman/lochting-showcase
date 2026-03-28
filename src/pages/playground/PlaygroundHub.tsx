import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const PLAYGROUND_SECTIONS = [
  { label: 'Component Playground', icon: 'science', path: '/playground/component', description: 'Experiment with components in isolation' },
  { label: 'Theme Playground', icon: 'tune', path: '/playground/theme', description: 'Live theme editor with real-time preview' },
  { label: 'Style Showcase', icon: 'brush', path: '/playground/showcase', description: 'Compare all style variants side by side' },
  { label: 'Sessions', icon: 'history', path: '/playground/sessions', description: 'Browse and resume saved playground sessions' },
];

export function PlaygroundHub() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" fontWeight={500}>Playground</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Experiment, prototype, and explore design variants.
      </Typography>

      <Grid container spacing={2}>
        {PLAYGROUND_SECTIONS.map(section => (
          <Grid key={section.path} size={{ xs: 12, sm: 6 }}>
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
