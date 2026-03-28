import { Box, Typography, Paper } from '@mui/material';
import { Icon } from '../../components/Icon';

export function ExceptionRegistryPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={500}>Exception Registry</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        Documented exceptions to design rules — approved deviations with rationale.
      </Typography>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Icon name="exception" size={48} sx={{ color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Coming Soon</Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          Track and document approved exceptions to design rules, with context on why each deviation exists.
        </Typography>
      </Paper>
    </Box>
  );
}
