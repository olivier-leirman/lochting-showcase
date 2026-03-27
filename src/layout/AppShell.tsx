import { useRef, useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Breadcrumbs, Link, Typography, IconButton, Divider, Tooltip, alpha, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { InspectorSidebar } from './InspectorSidebar';
import { Icon } from '../components/Icon';
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
  const { colorMode, toggleColorMode, platforms, platformId, setPlatform, currentPlatform, currentStyle } = useBrand();
  const { inspectorEnabled, toggleInspector, selectedElement: _selectedElement, clearSelection } = useInspector();
  const mainRef = useRef<HTMLDivElement>(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);

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

            {/* Right side: inspector toggle + account switcher */}
            <Tooltip title={inspectorEnabled ? 'Disable inspector (I)' : 'Enable inspector (I)'}>
              <IconButton
                onClick={toggleInspector}
                size="small"
                sx={{
                  mr: 1.5,
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

            {/* Account switcher */}
            <Box
              onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                px: 1.5,
                py: 0.75,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'background 0.15s, border-color 0.15s',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                  color: '#fff',
                }}
              >
                {platformId === 'medipim' ? 'MP' : 'LO'}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.2 }}>
                  {currentPlatform.name}
                </Typography>
                <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', lineHeight: 1.2 }}>
                  {currentStyle.label}
                </Typography>
              </Box>
              <Icon name="expand_more" size={18} sx={{ color: 'text.secondary', ml: 0.5 }} />
            </Box>

            <Menu
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={() => setAccountMenuAnchor(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              slotProps={{ paper: { sx: { minWidth: 220, mt: 1 } } }}
            >
              {/* Platform switch */}
              {platforms.map((p) => (
                <MenuItem
                  key={p.id}
                  selected={p.id === platformId}
                  onClick={() => { setPlatform(p.id); setAccountMenuAnchor(null); }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.7rem', fontWeight: 700, bgcolor: p.styles[0].tokens.colors.brand400, color: '#fff', opacity: p.id === platformId ? 1 : 0.5 }}>
                      {p.id === 'medipim' ? 'MP' : 'LO'}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={p.name}
                    primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: p.id === platformId ? 600 : 400 }}
                  />
                  {p.id === platformId && <Icon name="check" size={18} sx={{ color: 'primary.main' }} />}
                </MenuItem>
              ))}

              <Divider sx={{ my: 0.5 }} />

              {/* Style variants link */}
              <MenuItem onClick={() => { navigate('/design-system/colors'); setAccountMenuAnchor(null); }}>
                <ListItemIcon><Icon name="palette" size={20} /></ListItemIcon>
                <ListItemText
                  primary="Style Variants"
                  secondary={currentStyle.label}
                  primaryTypographyProps={{ fontSize: '0.8125rem' }}
                  secondaryTypographyProps={{ fontSize: '0.6875rem' }}
                />
                <Icon name="arrow_forward" size={16} sx={{ color: 'text.disabled' }} />
              </MenuItem>

              <Divider sx={{ my: 0.5 }} />

              {/* Dark mode toggle */}
              <MenuItem onClick={(e) => { e.stopPropagation(); toggleColorMode(); }}>
                <ListItemIcon>
                  <Icon name={colorMode === 'light' ? 'dark_mode' : 'light_mode'} size={20} />
                </ListItemIcon>
                <ListItemText
                  primary="Dark Mode"
                  primaryTypographyProps={{ fontSize: '0.8125rem' }}
                />
                <Switch
                  size="small"
                  checked={colorMode === 'dark'}
                  onChange={toggleColorMode}
                  onClick={(e) => e.stopPropagation()}
                />
              </MenuItem>
            </Menu>
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
