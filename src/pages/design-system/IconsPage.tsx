import { Box, Typography } from '@mui/material';

export function IconsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Icons</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Material Symbols icon library — weight 300, outlined, rounded.
      </Typography>
    </Box>
  );
}
