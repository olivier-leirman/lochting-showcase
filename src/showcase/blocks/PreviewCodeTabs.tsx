import { useState, useRef, type ReactNode } from 'react';
import { Box, Tab, Tabs, alpha } from '@mui/material';
import { CodeBlock } from './CodeBlock';
import { useInspectOverlay } from '../hooks/useInspectOverlay';
import { useInspector } from '../context/inspector-context';

interface PreviewCodeTabsProps {
  preview: ReactNode;
  code: string;
}

export function PreviewCodeTabs({ preview, code }: PreviewCodeTabsProps) {
  const [tab, setTab] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const { inspectorEnabled } = useInspector();
  const { hoverRect, hoverLabel, selectionRect } = useInspectOverlay(previewRef);

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          minHeight: 40,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          borderRadius: '8px 8px 0 0',
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
      <Box
        ref={previewRef}
        sx={{
          display: tab === 0 ? 'flex' : 'none',
          p: 4,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          minHeight: 120,
          position: 'relative',
          borderRadius: '0 0 8px 8px',
          cursor: inspectorEnabled ? 'crosshair' : 'default',
        }}
      >
        {preview}

        {/* Hover overlay */}
        {inspectorEnabled && hoverRect && (
          <Box
            sx={{
              position: 'absolute',
              top: hoverRect.top,
              left: hoverRect.left,
              width: hoverRect.width,
              height: hoverRect.height,
              border: '1.5px dashed',
              borderColor: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              borderRadius: 0.5,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {hoverLabel && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: 0,
                  px: 0.75,
                  py: 0.125,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontSize: '0.6rem',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  borderRadius: '3px 3px 0 0',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.5,
                }}
              >
                {hoverLabel}
              </Box>
            )}
          </Box>
        )}

        {/* Selection overlay */}
        {selectionRect && (
          <Box
            sx={{
              position: 'absolute',
              top: selectionRect.top,
              left: selectionRect.left,
              width: selectionRect.width,
              height: selectionRect.height,
              border: '2px solid',
              borderColor: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
              borderRadius: 0.5,
              pointerEvents: 'none',
              zIndex: 11,
            }}
          />
        )}
      </Box>
      <Box sx={{ display: tab === 1 ? 'block' : 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
        <CodeBlock code={code} />
      </Box>
    </Box>
  );
}
