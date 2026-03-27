import { useRef, useEffect } from 'react';
import { Box, AppBar, Toolbar, Breadcrumbs, Link, Typography, IconButton, Divider, Tooltip, alpha } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { InspectorSidebar } from './InspectorSidebar';
import { Icon } from '../components/Icon';
import { BrandSwitcher } from '../showcase/blocks/BrandSwitcher';
import { useBrand } from '../theme/brand-context';
import { useInspector } from '../showcase/context/inspector-context';
import { getComponent } from '../showcase/registry';

/** Format a category slug into a display label */
function formatCategory(category: string): string {
  return category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Build breadcrumb segments from the current route path */
function useBreadcrumbs() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/') return [{ label: 'Home' }];
  if (path === '/getting-started') return [{ label: 'Home', path: '/' }, { label: 'Getting Started' }];
  if (path === '/style-showcase') return [{ label: 'Home', path: '/' }, { label: 'Style Showcase' }];

  // Design system pages
  if (path.startsWith('/design-system/')) {
    const segment = path.replace('/design-system/', '');
    const label = segment.split('/')[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return [{ label: 'Home', path: '/' }, { label: 'Design System' }, { label }];
  }

  // Library pages
  if (path === '/library') return [{ label: 'Home', path: '/' }, { label: 'Library' }];
  if (path.startsWith('/library/')) {
    const id = path.split('/')[2] ?? '';
    const comp = getComponent(id);
    return [{ label: 'Home', path: '/' }, { label: 'Library', path: '/library' }, { label: comp?.name ?? id }];
  }

  // Playground
  if (path.startsWith('/playground')) return [{ label: 'Home', path: '/' }, { label: 'Playground' }];

  // Prototypes
  if (path.startsWith('/prototypes/')) {
    const id = path.split('/').pop() ?? '';
    return [{ label: 'Home', path: '/' }, { label: 'Prototypes' }, { label: id }];
  }

  // Legacy token routes
  if (path.startsWith('/tokens/')) {
    const token = path.split('/').pop() ?? '';
    const label = token.charAt(0).toUpperCase() + token.slice(1);
    return [{ label: 'Home', path: '/' }, { label: 'Design System' }, { label }];
  }

  // Legacy component routes
  if (path.startsWith('/components/')) {
    const id = path.split('/').pop() ?? '';
    const comp = getComponent(id);
    const categoryLabel = comp ? formatCategory(comp.category) : 'Components';
    return [{ label: 'Home', path: '/' }, { label: categoryLabel }, { label: comp?.name ?? id }];
  }

  return [{ label: 'Home', path: '/' }];
}

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();
  const { colorMode, toggleColorMode } = useBrand();
  const { inspectorEnabled, toggleInspector, selectedElement: _selectedElement, clearSelection } = useInspector();
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll content area to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  // Clear selection on route change
  useEffect(() => {
    clearSelection();
  }, [location.pathname, clearSelection]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', minWidth: 0 }}>
        {/* ── Top bar ── */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            {/* Back/Forward */}
            <IconButton size="small" onClick={() => navigate(-1)} sx={{ width: 32, height: 32 }}>
              <Icon name="arrow_back" size={18} />
            </IconButton>
            <IconButton size="small" onClick={() => navigate(1)} sx={{ width: 32, height: 32 }}>
              <Icon name="arrow_forward" size={18} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Breadcrumbs */}
            <Breadcrumbs separator="/" sx={{ flex: 1, '& .MuiBreadcrumbs-separator': { color: 'text.disabled' } }}>
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                if (isLast) {
                  return (
                    <Typography
                      key={crumb.label}
                      sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.5 }}
                    >
                      {crumb.label}
                    </Typography>
                  );
                }
                if (crumb.path) {
                  return (
                    <Link
                      key={crumb.label}
                      component="button"
                      underline="hover"
                      onClick={() => navigate(crumb.path!)}
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'text.secondary',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        lineHeight: 1.5,
                      }}
                    >
                      {crumb.label}
                    </Link>
                  );
                }
                return (
                  <Typography
                    key={crumb.label}
                    sx={{ fontSize: '0.875rem', fontWeight: 400, color: 'text.disabled', lineHeight: 1.5 }}
                  >
                    {crumb.label}
                  </Typography>
                );
              })}
            </Breadcrumbs>

            {/* Right side: inspector toggle + brand switcher + dark mode */}
            <Tooltip title={inspectorEnabled ? 'Disable inspector (I)' : 'Enable inspector (I)'}>
              <IconButton
                onClick={toggleInspector}
                size="small"
                sx={{
                  mr: 1,
                  width: 36,
                  height: 36,
                  border: '1px solid',
                  borderColor: inspectorEnabled ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  bgcolor: inspectorEnabled ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
                }}
              >
                <Icon name="select_all" size={18} />
              </IconButton>
            </Tooltip>
            <BrandSwitcher />
            <Tooltip title={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              <IconButton
                onClick={toggleColorMode}
                size="small"
                sx={{ ml: 1, width: 36, height: 36, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
              >
                <Icon name={colorMode === 'light' ? 'dark_mode' : 'light_mode'} size={18} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* ── Main content + Inspector ── */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <Box
            ref={mainRef}
            component="main"
            sx={{
              flex: 1,
              overflow: 'auto',
              px: { xs: 3, md: 6 },
              py: 5,
              minWidth: 0,
            }}
          >
            <Outlet />
          </Box>
          <InspectorSidebar />
        </Box>
      </Box>
    </Box>
  );
}
