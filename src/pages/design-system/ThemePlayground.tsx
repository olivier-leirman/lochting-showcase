import { Box, Typography } from '@mui/material';

export function ThemePlayground() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Theme Playground</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Experiment with token values, brand configurations, and style directions.
      </Typography>
    </Box>
  );
}
