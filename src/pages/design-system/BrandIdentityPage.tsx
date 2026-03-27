import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export function BrandIdentityPage() {
  const { brand, style } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Brand Identity</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {brand} × {style} — complete brand identity overview.
      </Typography>
    </Box>
  );
}
