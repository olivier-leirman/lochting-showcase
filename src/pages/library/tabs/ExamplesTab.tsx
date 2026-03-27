import { Box, Typography } from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { PreviewCodeTabs } from '../../../showcase/blocks/PreviewCodeTabs';

export function ExamplesTab({ doc }: { doc: ComponentDoc }) {
  if (doc.examples.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No examples available for {doc.name}.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {doc.examples.map((ex, i) => (
        <Box key={i}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            {ex.name}
          </Typography>
          <PreviewCodeTabs preview={ex.render()} code={ex.code} />
        </Box>
      ))}
    </Box>
  );
}
