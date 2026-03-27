import { Box, Typography } from '@mui/material';

export function DesignRulesPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Design Rules</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Enforced design rules: spacing grid, icon usage, color contrast, component conventions.
      </Typography>
    </Box>
  );
}
