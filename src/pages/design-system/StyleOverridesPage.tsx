import { Box, Typography, Paper } from '@mui/material';
import { Icon } from '../../components/Icon';

export function StyleOverridesPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={500}>Style Overrides</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Per-component style overrides that deviate from the active StyleDefinition.
      </Typography>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Icon name="tune" size={48} sx={{ color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Coming Soon</Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          Define component-level style overrides that take precedence over the global style definition.
        </Typography>
      </Paper>
    </Box>
  );
}
