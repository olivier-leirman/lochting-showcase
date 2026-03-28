import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, ToggleButton, ToggleButtonGroup, IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { getPrototype } from '../../prototypes/prototype-registry';

type ViewMode = 'single' | 'responsive';

interface Breakpoint {
  label: string;
  icon: string;
  width: number;
}

const BREAKPOINTS: Breakpoint[] = [
  { label: 'Desktop', icon: 'desktop_windows', width: 1280 },
  { label: 'Tablet', icon: 'tablet', width: 768 },
  { label: 'Mobile', icon: 'phone_iphone', width: 375 },
];

export function PrototypePage() {
  const { platformId, prototypeId } = useParams();
  const navigate = useNavigate();
  const { brand } = useBrand();
  const c = brand.colors;

  const proto = prototypeId ? getPrototype(prototypeId) : undefined;
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);

  // Measure available canvas width for scale calculation
  const measureCanvas = useCallback(() => {
    if (canvasRef.current) {
      setCanvasWidth(canvasRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measureCanvas();
    window.addEventListener('resize', measureCanvas);
    return () => window.removeEventListener('resize', measureCanvas);
  }, [measureCanvas]);

  if (!proto) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Icon name="error_outline" size={48} color={c.contentTertiary} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
          Prototype not found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          No prototype with id "{prototypeId}" in the registry.
        </Typography>
      </Box>
    );
  }

  const Component = proto.component;

  // Calculate scale for responsive frames
  const gap = 24;
  const totalNativeWidth = BREAKPOINTS.reduce((sum, bp) => sum + bp.width, 0) + gap * (BREAKPOINTS.length - 1);
  const responsiveScale = canvasWidth > 0 ? Math.min(1, canvasWidth / totalNativeWidth) : 0.4;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pb: 2,
          mb: 2,
          borderBottom: '1px solid',
          borderColor: c.borderWeak,
          flexShrink: 0,
        }}
      >
        <Tooltip title="Back to overview">
          <IconButton size="small" onClick={() => navigate(`/prototypes`)}>
            <Icon name="arrow_back" size={20} />
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body1" fontWeight={500} noWrap>
            {proto.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {proto.platform === 'medipim' ? 'Medipim' : 'Lochting'}
            {proto.folder ? ` / ${proto.folder}` : ''}
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, val) => val && setViewMode(val)}
          size="small"
        >
          <ToggleButton value="single" sx={{ textTransform: 'none', px: 2 }}>
            <Icon name="crop_free" size={16} sx={{ mr: 0.5 }} />
            Single
          </ToggleButton>
          <ToggleButton value="responsive" sx={{ textTransform: 'none', px: 2 }}>
            <Icon name="devices" size={16} sx={{ mr: 0.5 }} />
            Responsive
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Canvas area */}
      <Box
        ref={canvasRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        {viewMode === 'single' ? (
          /* ── Single view: full-width render ── */
          <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
            <Component />
          </Box>
        ) : (
          /* ── Responsive view: 3 breakpoints side by side ── */
          <Box
            sx={{
              display: 'flex',
              gap: `${gap * responsiveScale}px`,
              transformOrigin: 'top left',
              width: totalNativeWidth,
              transform: `scale(${responsiveScale})`,
              mb: `${-totalNativeWidth * (1 - responsiveScale) * 0.5}px`, // Compensate for scale
            }}
          >
            {BREAKPOINTS.map((bp) => (
              <DeviceFrame key={bp.label} breakpoint={bp} colors={c}>
                <Component />
              </DeviceFrame>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* ── Device Frame ── */

function DeviceFrame({
  breakpoint,
  colors: c,
  children,
}: {
  breakpoint: Breakpoint;
  colors: ReturnType<typeof useBrand>['brand']['colors'];
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ width: breakpoint.width, flexShrink: 0 }}>
      {/* Frame label */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          mb: 1,
          px: 0.5,
        }}
      >
        <Icon name={breakpoint.icon} size={14} color={c.contentTertiary} />
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
          {breakpoint.label} — {breakpoint.width}px
        </Typography>
      </Box>

      {/* Frame container */}
      <Box
        sx={{
          width: breakpoint.width,
          border: '1px solid',
          borderColor: c.borderDefault,
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: c.bgDefault,
        }}
      >
        <Box sx={{ width: breakpoint.width, overflow: 'hidden' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
