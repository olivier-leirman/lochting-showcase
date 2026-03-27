import { Box, Typography } from '@mui/material';

export function PatternsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Patterns</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Reusable UI patterns and component compositions.
      </Typography>
    </Box>
  );
}
