import { Box, Typography } from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { Icon } from '../../../components/Icon';

export function StylesTab({ doc }: { doc: ComponentDoc }) {
  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Icon name="palette" size={48} />
      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        Style Variants
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Style variants for {doc.name} will be available when the Brand × Style system is active (Fase 4).
      </Typography>
      <Typography color="text.disabled" sx={{ mt: 1, fontSize: '0.8125rem' }}>
        View all styles side-by-side: Flat, Neumorphism, Glassmorphism, Brutalism, Soft/Minimal.
      </Typography>
    </Box>
  );
}
