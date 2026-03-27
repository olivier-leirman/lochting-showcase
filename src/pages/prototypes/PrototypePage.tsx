import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export function PrototypePage() {
  const { id } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Prototype — {id}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Migrated prototype view.
      </Typography>
    </Box>
  );
}
