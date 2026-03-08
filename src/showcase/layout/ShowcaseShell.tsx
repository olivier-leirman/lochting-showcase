import { Box, AppBar, Toolbar, Breadcrumbs, Link, Typography, IconButton, Divider, Badge, Avatar } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Icon } from '../../components/Icon';
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
  const breadcrumbs = useBreadcrumbs();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
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

            {/* Right side actions */}
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton size="small" sx={{ width: 32, height: 32 }}>
              <Icon name="support_agent" size={20} />
            </IconButton>
            <IconButton size="small" sx={{ width: 32, height: 32 }}>
              <Icon name="language" size={20} />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <IconButton size="small" sx={{ width: 32, height: 32 }}>
              <Badge variant="dot" color="primary">
                <Icon name="newspaper" size={20} />
              </Badge>
            </IconButton>
            <IconButton size="small" sx={{ width: 32, height: 32 }}>
              <Badge variant="dot" color="primary">
                <Icon name="notifications" size={20} />
              </Badge>
            </IconButton>
            <Avatar sx={{ width: 32, height: 32, ml: 1 }}>OL</Avatar>
          </Toolbar>
        </AppBar>

        {/* ── Main content ── */}
        <Box
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
