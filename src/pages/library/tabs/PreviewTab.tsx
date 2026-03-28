import { useState, useRef, useMemo } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip, Typography, alpha, ThemeProvider, CssBaseline } from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { Icon } from '../../../components/Icon';
import { useInspectOverlay } from '../../../showcase/hooks/useInspectOverlay';
import { useInspector } from '../../../showcase/context/inspector-context';
import { useBrand } from '../../../theme/brand-context';
import { createBrandTheme } from '../../../theme/create-brand-theme';

type CanvasBg = 'light' | 'dark' | 'checker';
type CanvasPadding = 'tight' | 'comfortable' | 'spacious';

const PADDING_MAP: Record<CanvasPadding, number> = { tight: 2, comfortable: 4, spacious: 8 };

const BG_STYLES: Record<CanvasBg, object> = {
  light: { bgcolor: 'background.default' },
  dark: { bgcolor: '#1a1a2e' },
  checker: {
    backgroundImage: `linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
      linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
      linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)`,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  },
};

function CanvasPanel({
  doc,
  canvasBg,
  canvasPadding,
  label,
}: {
  doc: ComponentDoc;
  canvasBg: CanvasBg;
  canvasPadding: CanvasPadding;
  label?: string;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const { inspectorEnabled } = useInspector();
  const { hoverRect, hoverLabel, selectionRect } = useInspectOverlay(previewRef);
  const firstExample = doc.examples[0];

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {label && (
        <Typography
          variant="caption"
          sx={{ mb: 0.5, display: 'block', fontWeight: 500, color: 'text.secondary', textAlign: 'center' }}
        >
          {label}
        </Typography>
      )}
      <Box
        ref={previewRef}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: PADDING_MAP[canvasPadding],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          position: 'relative',
          cursor: inspectorEnabled ? 'crosshair' : 'default',
          ...BG_STYLES[canvasBg],
        }}
      >
        {firstExample ? firstExample.render() : (
          <Box sx={{ color: 'text.disabled' }}>No preview available</Box>
        )}

        {inspectorEnabled && hoverRect && (
          <Box
            sx={{
              position: 'absolute',
              top: hoverRect.top, left: hoverRect.left,
              width: hoverRect.width, height: hoverRect.height,
              border: '1.5px dashed', borderColor: 'primary.main',
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              borderRadius: 0.5, pointerEvents: 'none', zIndex: 10,
            }}
          >
            {hoverLabel && (
              <Box sx={{
                position: 'absolute', top: -20, left: 0, px: 0.75, py: 0.125,
                bgcolor: 'primary.main', color: 'primary.contrastText',
                fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 500,
                borderRadius: '3px 3px 0 0', whiteSpace: 'nowrap', lineHeight: 1.5,
              }}>
                {hoverLabel}
              </Box>
            )}
          </Box>
        )}
        {selectionRect && (
          <Box sx={{
            position: 'absolute',
            top: selectionRect.top, left: selectionRect.left,
            width: selectionRect.width, height: selectionRect.height,
            border: '2px solid', borderColor: 'primary.main',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
            borderRadius: 0.5, pointerEvents: 'none', zIndex: 11,
          }} />
        )}
      </Box>
    </Box>
  );
}

export function PreviewTab({ doc }: { doc: ComponentDoc }) {
  const [canvasBg, setCanvasBg] = useState<CanvasBg>('light');
  const [canvasPadding, setCanvasPadding] = useState<CanvasPadding>('comfortable');
  const [compareMode, setCompareMode] = useState(false);
  const { platforms, currentPlatform, currentStyle, effects } = useBrand();

  // Build a second brand theme for comparison
  const compareBrand = useMemo(() => {
    const otherPlatform = platforms.find(p => p.id !== currentPlatform.id);
    if (!otherPlatform) return null;
    const otherStyle = otherPlatform.styles[0];
    return {
      label: `${otherPlatform.name} — ${otherStyle.label}`,
      theme: createBrandTheme(otherStyle.tokens, effects.mode),
    };
  }, [platforms, currentPlatform, effects.mode]);

  return (
    <Box>
      {/* Canvas controls */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Tooltip title="Canvas background">
          <ToggleButtonGroup value={canvasBg} exclusive onChange={(_, v) => v && setCanvasBg(v)} size="small">
            <ToggleButton value="light" sx={{ px: 1.5 }}><Icon name="light_mode" size={16} /></ToggleButton>
            <ToggleButton value="dark" sx={{ px: 1.5 }}><Icon name="dark_mode" size={16} /></ToggleButton>
            <ToggleButton value="checker" sx={{ px: 1.5 }}><Icon name="grid_on" size={16} /></ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>

        <Tooltip title="Canvas padding">
          <ToggleButtonGroup value={canvasPadding} exclusive onChange={(_, v) => v && setCanvasPadding(v)} size="small">
            <ToggleButton value="tight" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>Tight</ToggleButton>
            <ToggleButton value="comfortable" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>Comfortable</ToggleButton>
            <ToggleButton value="spacious" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>Spacious</ToggleButton>
          </ToggleButtonGroup>
        </Tooltip>

        {compareBrand && (
          <Tooltip title="Compare with another brand side-by-side">
            <ToggleButtonGroup
              value={compareMode ? 'compare' : 'single'}
              exclusive
              onChange={(_, v) => v && setCompareMode(v === 'compare')}
              size="small"
            >
              <ToggleButton value="single" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>Single</ToggleButton>
              <ToggleButton value="compare" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem', gap: 0.5 }}>
                <Icon name="compare" size={16} /> Compare
              </ToggleButton>
            </ToggleButtonGroup>
          </Tooltip>
        )}
      </Box>

      {/* Canvas(es) */}
      {compareMode && compareBrand ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CanvasPanel
            doc={doc}
            canvasBg={canvasBg}
            canvasPadding={canvasPadding}
            label={`${currentPlatform.name} — ${currentStyle.label}`}
          />
          <ThemeProvider theme={compareBrand.theme}>
            <CanvasPanel
              doc={doc}
              canvasBg={canvasBg}
              canvasPadding={canvasPadding}
              label={compareBrand.label}
            />
          </ThemeProvider>
        </Box>
      ) : (
        <CanvasPanel doc={doc} canvasBg={canvasBg} canvasPadding={canvasPadding} />
      )}
    </Box>
  );
}
