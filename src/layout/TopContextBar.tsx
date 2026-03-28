import { Box, AppBar, Toolbar, Breadcrumbs, Link, Typography, IconButton, Divider, Tooltip, alpha, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBrand } from '../theme/brand-context';
import { useInspector } from '../showcase/context/inspector-context';
import { getComponent } from '../showcase/registry';
import { useState } from 'react';
import { useResponsive } from './useResponsive';

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

  // Components pages
  if (path === '/components') return [{ label: 'Components' }];
  if (path === '/components/experimental') return [{ label: 'Components', path: '/components' }, { label: 'Experimental' }];
  if (path.startsWith('/components/')) {
    const id = path.split('/')[2] ?? '';
    const comp = getComponent(id);
    const categoryLabel = comp ? formatCategory(comp.category) : 'Components';
    return [{ label: 'Components', path: '/components' }, { label: categoryLabel }, { label: comp?.name ?? id }];
  }

  // Theme pages
  if (path === '/theme') return [{ label: 'Theme' }];
  if (path.startsWith('/theme/identity/')) {
    return [{ label: 'Theme', path: '/theme' }, { label: 'Brand Identity' }];
  }
  if (path.startsWith('/theme/styles/creator')) {
    return [{ label: 'Theme', path: '/theme' }, { label: 'Styles', path: '/theme/styles' }, { label: 'Style Creator' }];
  }
  if (path.startsWith('/theme/styles/') && path.includes('/board')) {
    const style = path.split('/')[3];
    return [{ label: 'Theme', path: '/theme' }, { label: 'Styles', path: '/theme/styles' }, { label: formatCategory(style ?? '') }];
  }
  if (path === '/theme/styles') {
    return [{ label: 'Theme', path: '/theme' }, { label: 'Style Variants' }];
  }
  if (path.startsWith('/theme/')) {
    const segment = path.replace('/theme/', '');
    const label = segment.split('/')[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return [{ label: 'Theme', path: '/theme' }, { label }];
  }

  // Design System pages
  if (path === '/design-system') return [{ label: 'Design System' }];
  if (path.startsWith('/design-system/')) {
    const segment = path.replace('/design-system/', '');
    const label = segment.split('/')[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return [{ label: 'Design System', path: '/design-system' }, { label }];
  }

  // Playground pages
  if (path === '/playground') return [{ label: 'Playground' }];
  if (path.startsWith('/playground/')) {
    const segment = path.replace('/playground/', '');
    const label = segment.split('/')[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return [{ label: 'Playground', path: '/playground' }, { label }];
  }

  // Prototypes pages
  if (path === '/prototypes') return [{ label: 'Prototypes' }];
  if (path.startsWith('/prototypes/')) {
    const id = path.split('/').pop() ?? '';
    return [{ label: 'Prototypes', path: '/prototypes' }, { label: formatCategory(id) }];
  }

  return [{ label: 'Home' }];
}

interface TopContextBarProps {
  onMenuClick?: () => void;
}

export function TopContextBar({ onMenuClick }: TopContextBarProps) {
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();
  const { colorMode, toggleColorMode, platforms, platformId, setPlatform, currentPlatform, currentStyle } = useBrand();
  const { inspectorEnabled, toggleInspector } = useInspector();
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const { isDesktop } = useResponsive();

  // Last breadcrumb = current page title (for mobile)
  const currentTitle = breadcrumbs[breadcrumbs.length - 1]?.label ?? 'Home';

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        {/* Mobile: hamburger menu */}
        {!isDesktop && (
          <IconButton
            size="small"
            onClick={onMenuClick}
            aria-label="Open menu"
            sx={{ width: '2rem', height: '2rem', mr: 1 }}
          >
            <Icon name="menu" size={20} />
          </IconButton>
        )}

        {/* Desktop: Back/Forward */}
        {isDesktop && (
          <>
            <Tooltip title="Go back">
              <IconButton size="small" onClick={() => navigate(-1)} aria-label="Go back" sx={{ width: '2rem', height: '2rem' }}>
                <Icon name="arrow_back" size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Go forward">
              <IconButton size="small" onClick={() => navigate(1)} aria-label="Go forward" sx={{ width: '2rem', height: '2rem' }}>
                <Icon name="arrow_forward" size={18} />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          </>
        )}

        {/* Breadcrumbs (desktop) / Page title (mobile) */}
        {isDesktop ? (
          <Breadcrumbs separator="/" sx={{ flex: 1, '& .MuiBreadcrumbs-separator': { color: 'text.disabled' } }}>
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              if (isLast) {
                return (
                  <Typography
                    key={crumb.label}
                    sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'text.primary', lineHeight: 1.5 }}
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
        ) : (
          <Typography
            sx={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: 'text.primary', lineHeight: 1.5 }}
            noWrap
          >
            {currentTitle}
          </Typography>
        )}

        {/* Inspector toggle — desktop only */}
        {isDesktop && (
          <Tooltip title={inspectorEnabled ? 'Disable inspector (I)' : 'Enable inspector (I)'}>
            <IconButton
              onClick={toggleInspector}
              size="small"
              aria-label={inspectorEnabled ? 'Disable inspector' : 'Enable inspector'}
              sx={{
                mr: 1.5,
                width: '2.25rem',
                height: '2.25rem',
                border: '1px solid',
                borderColor: inspectorEnabled ? 'primary.main' : 'divider',
                borderRadius: 2,
                bgcolor: inspectorEnabled ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'transparent',
              }}
            >
              <Icon name="select_all" size={18} />
            </IconButton>
          </Tooltip>
        )}

        {/* Account switcher */}
        <Box
          onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, md: 1 },
            cursor: 'pointer',
            px: { xs: 0.75, md: 1.5 },
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
              width: '1.75rem',
              height: '1.75rem',
              fontSize: '0.7rem',
              fontWeight: 500,
              bgcolor: currentPlatform.styles[0].tokens.colors.brand450,
              color: '#fff',
            }}
          >
            {platformId === 'medipim' ? 'MP' : 'LO'}
          </Avatar>
          {/* Hide text on mobile, show on desktop */}
          <Box sx={{ minWidth: 0, display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, lineHeight: 1.2 }}>
              {currentPlatform.name}
            </Typography>
            <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', lineHeight: 1.2 }}>
              {currentStyle.label}
            </Typography>
          </Box>
          <Icon name="expand_more" size={18} sx={{ color: 'text.secondary', ml: 0.5, display: { xs: 'none', sm: 'block' } }} />
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
                <Avatar sx={{ width: '1.75rem', height: '1.75rem', fontSize: '0.7rem', fontWeight: 500, bgcolor: p.styles[0].tokens.colors.brand450, color: '#fff' }}>
                  {p.id === 'medipim' ? 'MP' : 'LO'}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={p.name}
                primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: p.id === platformId ? 500 : 400 }}
              />
              {p.id === platformId && <Icon name="check" size={18} sx={{ color: 'primary.main' }} />}
            </MenuItem>
          ))}

          <Divider sx={{ my: 0.5 }} />

          {/* Style variants link */}
          <MenuItem onClick={() => { navigate('/theme/styles'); setAccountMenuAnchor(null); }}>
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
  );
}
