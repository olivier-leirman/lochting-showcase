import { useRef, useEffect, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ModeStrip, getModeFromPath, type Mode } from './ModeStrip';
import { ContextSidebar } from './ContextSidebar';
import { TopContextBar } from './TopContextBar';
import { InspectorSidebar } from './InspectorSidebar';
import { BottomTabBar, BOTTOM_BAR_HEIGHT } from './BottomTabBar';
import { useInspector } from '../showcase/context/inspector-context';
import { useResponsive } from './useResponsive';

// ── localStorage persistence helpers ──

const LS_MODE = 'bw-ds-active-mode';
const LS_COLLAPSED_PREFIX = 'bw-ds-sidebar-collapsed-';
const LS_LAST_PATH_PREFIX = 'bw-ds-last-path-';

function loadMode(): Mode | null {
  try {
    const v = localStorage.getItem(LS_MODE);
    if (v && ['home', 'components', 'theme', 'design-system', 'playground', 'prototypes'].includes(v)) {
      return v as Mode;
    }
  } catch { /* ignore */ }
  return null;
}

function saveMode(mode: Mode) {
  try { localStorage.setItem(LS_MODE, mode); } catch { /* ignore */ }
}

function loadCollapsed(mode: Mode): boolean {
  try { return localStorage.getItem(LS_COLLAPSED_PREFIX + mode) === 'true'; } catch { return false; }
}

function saveCollapsed(mode: Mode, collapsed: boolean) {
  try { localStorage.setItem(LS_COLLAPSED_PREFIX + mode, String(collapsed)); } catch { /* ignore */ }
}

function loadLastPath(mode: Mode): string | null {
  try { return localStorage.getItem(LS_LAST_PATH_PREFIX + mode); } catch { return null; }
}

function saveLastPath(mode: Mode, path: string) {
  try { localStorage.setItem(LS_LAST_PATH_PREFIX + mode, path); } catch { /* ignore */ }
}

// ── Default landing paths per mode ──

const MODE_DEFAULT_PATHS: Record<Mode, string> = {
  home: '/',
  components: '/components',
  theme: '/theme',
  'design-system': '/design-system',
  playground: '/playground',
  prototypes: '/prototypes',
};

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearSelection } = useInspector();
  const { isDesktop } = useResponsive();
  const mainRef = useRef<HTMLDivElement>(null);

  // Derive mode from current URL
  const activeMode = getModeFromPath(location.pathname);

  // Track collapsed state per mode — initialize from localStorage
  const collapsedRef = useRef<Record<string, boolean>>({});
  if (Object.keys(collapsedRef.current).length === 0) {
    (['home', 'components', 'theme', 'design-system', 'playground', 'prototypes'] as Mode[]).forEach(m => {
      collapsedRef.current[m] = loadCollapsed(m);
    });
  }

  // Use state for current mode's collapsed (to trigger re-render)
  const [collapsed, setCollapsedState] = useCollapseState(activeMode, collapsedRef);

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Persist active mode
  useEffect(() => { saveMode(activeMode); }, [activeMode]);

  // Persist last path per mode
  useEffect(() => {
    if (location.pathname !== '/') {
      saveLastPath(activeMode, location.pathname);
    }
  }, [location.pathname, activeMode]);

  // Scroll content area to top on route change
  useEffect(() => { mainRef.current?.scrollTo(0, 0); }, [location.pathname]);

  // Clear inspector selection on route change
  useEffect(() => { clearSelection(); }, [location.pathname, clearSelection]);

  const handleModeChange = useCallback((mode: Mode) => {
    if (mode === activeMode) {
      // Toggle collapse on re-click
      const next = !collapsed;
      setCollapsedState(next);
      saveCollapsed(mode, next);
      collapsedRef.current[mode] = next;
    } else {
      // Home always goes to root; other modes restore last path
      const target = mode === 'home' ? '/' : (loadLastPath(mode) ?? MODE_DEFAULT_PATHS[mode]);
      navigate(target);
    }
  }, [activeMode, collapsed, navigate, setCollapsedState]);

  const handleSettingsClick = useCallback(() => {
    navigate('/getting-started');
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop: side strip navigation */}
      <ModeStrip
        activeMode={activeMode}
        onModeChange={handleModeChange}
        onSettingsClick={handleSettingsClick}
      />

      {/* Context sidebar — inline on desktop, drawer on mobile */}
      <ContextSidebar
        mode={activeMode}
        collapsed={collapsed}
        drawerOpen={drawerOpen}
        onDrawerClose={() => setDrawerOpen(false)}
      />

      {/* Main content area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', minWidth: 0 }}>
        <TopContextBar onMenuClick={() => setDrawerOpen(true)} />
        {/* Main content + Inspector */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <Box
            ref={mainRef}
            component="main"
            sx={{
              flex: 1,
              overflow: 'auto',
              px: { xs: 2, sm: 3, md: 6 },
              py: { xs: 3, md: 5 },
              pb: { xs: `calc(${BOTTOM_BAR_HEIGHT} + 1rem)`, md: 5 },
              minWidth: 0,
            }}
          >
            <Outlet />
          </Box>
          {/* Inspector — desktop only */}
          {isDesktop && <InspectorSidebar />}
        </Box>
      </Box>

      {/* Mobile/Tablet: bottom tab bar */}
      <BottomTabBar activeMode={activeMode} />
    </Box>
  );
}

// ── Small hook to manage collapse state that re-renders on change ──

function useCollapseState(
  activeMode: Mode,
  collapsedRef: React.RefObject<Record<string, boolean>>,
): [boolean, (v: boolean) => void] {
  const [, forceUpdate] = useState(0);

  const collapsed = collapsedRef.current?.[activeMode] ?? false;

  const setCollapsed = useCallback((v: boolean) => {
    if (collapsedRef.current) {
      collapsedRef.current[activeMode] = v;
    }
    forceUpdate(n => n + 1);
  }, [activeMode, collapsedRef]);

  return [collapsed, setCollapsed];
}
