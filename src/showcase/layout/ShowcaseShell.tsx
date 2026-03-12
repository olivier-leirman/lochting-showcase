import { useRef, useEffect } from 'react';
import { Box, AppBar, Toolbar, Breadcrumbs, Link, Typography, IconButton, Divider, Tooltip } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Icon } from '../../components/Icon';
import { BrandSwitcher } from '../blocks/BrandSwitcher';
import { useBrand } from '../../theme/brand-context';
import { getComponent } from '../registry';

/** Build breadcrumb segments from the current route path */
function useBreadcrumbs() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/') return [{ label: 'Home' }];
  if (path === '/getting-started') return [{ label: 'Home', path: '/' }, { label: 'Getting Started' }];
  if (path.startsWith('/tokens/')) {
    const token = path.split('/').pop() ?? '';
    const label = token.charAt(0).toUpperCase() + token.slice(1);
    return [{ label: 'Home', path: '/' }, { label: 'Tokens' }, { label }];
  }
  if (path.startsWith('/components/')) {
    const id = path.split('/').pop() ?? '';
    const comp = getComponent(id);
    return [{ label: 'Home', path: '/' }, { label: 'Components' }, { label: comp?.name ?? id }];
  }
  return [{ label: 'Home', path: '/' }];
}

export function ShowcaseShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();
  const { colorMode, toggleColorMode } = useBrand();
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll content area to top on route change
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
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
            <Breadcrumbs separator="/" sx={{ flex: 1 }}>
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                if (isLast) {
                  return (
                    <Typography
                      key={crumb.label}
                      sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.primary' }}
                    >
                      {crumb.label}
                    </Typography>
                  );
                }
                return (
                  <Link
                    key={crumb.label}
                    component="button"
                    underline="hover"
                    onClick={() => crumb.path && navigate(crumb.path)}
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'text.secondary',
                      cursor: crumb.path ? 'pointer' : 'default',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    {crumb.label}
                  </Link>
                );
              })}
            </Breadcrumbs>

            {/* Right side: brand switcher + dark mode */}
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

        {/* ── Main content ── */}
        <Box
          ref={mainRef}
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            px: { xs: 3, md: 6 },
            py: 5,
            maxWidth: 960,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
