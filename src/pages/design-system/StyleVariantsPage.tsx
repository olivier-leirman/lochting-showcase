import { Box, Typography } from '@mui/material';

export function StyleVariantsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Style Variants</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Visual treatment styles: Flat, Neumorphism, Glassmorphism, Brutalism, Soft/Minimal.
      </Typography>
    </Box>
  );
}
