import { useEffect } from 'react';
import { Box, Typography, Fade, Drawer } from '@mui/material';
import { useLocation } from 'react-router-dom';
import type { Mode } from './ModeStrip';
import { MODES } from './ModeStrip';
import { ComponentsSidebar } from './sidebars/ComponentsSidebar';
import { ThemeSidebar } from './sidebars/ThemeSidebar';
import { DesignSystemSidebar } from './sidebars/DesignSystemSidebar';
import { PlaygroundSidebar } from './sidebars/PlaygroundSidebar';
import { PrototypesSidebar } from './sidebars/PrototypesSidebar';
import { useResponsive } from './useResponsive';

interface ContextSidebarProps {
  mode: Mode;
  collapsed: boolean;
  /** Mobile drawer open state — controlled by AppShell */
  drawerOpen?: boolean;
  /** Close the mobile drawer */
  onDrawerClose?: () => void;
}

export const SIDEBAR_WIDTH = '15rem'; // 240px

const SIDEBAR_MAP: Partial<Record<Mode, React.ComponentType>> = {
  components: ComponentsSidebar,
  theme: ThemeSidebar,
  'design-system': DesignSystemSidebar,
  playground: PlaygroundSidebar,
  prototypes: PrototypesSidebar,
};

function SidebarContent({ mode }: { mode: Mode }) {
  const modeInfo = MODES.find(m => m.id === mode);
  const Content = SIDEBAR_MAP[mode];
  if (!Content) return null;

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Mode header */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography
          variant="overline"
          sx={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'text.secondary',
          }}
        >
          {modeInfo?.label}
        </Typography>
      </Box>

      {/* Mode-specific content */}
      <Fade in key={mode} timeout={150}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Content />
        </Box>
      </Fade>
    </Box>
  );
}

export function ContextSidebar({ mode, collapsed, drawerOpen, onDrawerClose }: ContextSidebarProps) {
  const { isDesktop } = useResponsive();
  const location = useLocation();
  const SidebarComp = SIDEBAR_MAP[mode];
  const hidden = !SidebarComp || collapsed;

  // Close drawer on navigation
  useEffect(() => {
    if (drawerOpen && onDrawerClose) {
      onDrawerClose();
    }
    // Only trigger on path change, not on the callbacks themselves
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Desktop: inline sidebar with animated width
  if (isDesktop) {
    return (
      <Box
        sx={{
          width: hidden ? 0 : SIDEBAR_WIDTH,
          flexShrink: 0,
          height: '100%',
          overflow: 'hidden',
          transition: 'width 200ms ease-out',
          borderRight: hidden ? 'none' : '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {SidebarComp && <SidebarContent mode={mode} />}
      </Box>
    );
  }

  // Mobile/Tablet: drawer overlay
  return (
    <Drawer
      variant="temporary"
      open={drawerOpen ?? false}
      onClose={onDrawerClose}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          bgcolor: 'background.paper',
        },
      }}
    >
      {SidebarComp && <SidebarContent mode={mode} />}
    </Drawer>
  );
}
