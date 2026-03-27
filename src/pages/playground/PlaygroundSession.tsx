import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export function PlaygroundSession() {
  const { session } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>Playground Session</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Session: {session}
      </Typography>
    </Box>
  );
}
