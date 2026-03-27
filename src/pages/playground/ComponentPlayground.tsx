import { Box, Typography } from '@mui/material';

export function ComponentPlayground() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Component Playground</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Experiment with components in an interactive sandbox.
      </Typography>
    </Box>
  );
}
