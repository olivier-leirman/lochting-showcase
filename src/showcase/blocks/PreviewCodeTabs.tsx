import { useState, type ReactNode } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { CodeBlock } from './CodeBlock';

interface PreviewCodeTabsProps {
  preview: ReactNode;
  code: string;
}

export function PreviewCodeTabs({ preview, code }: PreviewCodeTabsProps) {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          minHeight: 40,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          '& .MuiTab-root': {
            minHeight: 40,
            textTransform: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
          },
        }}
      >
        <Tab label="Preview" />
        <Tab label="Code" />
      </Tabs>
      <Box sx={{ display: tab === 0 ? 'flex' : 'none', p: 4, alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', minHeight: 120 }}>
        {preview}
      </Box>
      <Box sx={{ display: tab === 1 ? 'block' : 'none' }}>
        <CodeBlock code={code} />
      </Box>
    </Box>
  );
}
