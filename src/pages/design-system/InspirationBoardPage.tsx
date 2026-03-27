import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export function InspirationBoardPage() {
  const { style } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Inspiration Board — {style}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Visual references and mood board for the {style} style direction.
      </Typography>
    </Box>
  );
}
