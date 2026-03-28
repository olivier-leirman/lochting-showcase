import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const MAIN_ITEMS = [
  { label: 'Overview', icon: 'dashboard', path: '/theme' },
  { label: 'Colors & Palettes', icon: 'palette', path: '/theme/colors' },
  { label: 'Typography', icon: 'text_fields', path: '/theme/typography' },
  { label: 'Spacing & Sizing', icon: 'space_bar', path: '/theme/spacing' },
  { label: 'Effects', icon: 'auto_awesome', path: '/theme/effects' },
  { label: 'Icons', icon: 'category', path: '/theme/icons' },
  { label: 'Brand Identity', icon: 'fingerprint', path: '/theme/identity/medipim/flat', prefix: true },
];

const STYLE_ITEMS = [
  { label: 'Style Variants', icon: 'style', path: '/theme/styles' },
  { label: 'Style Creator', icon: 'brush', path: '/theme/styles/creator' },
];

export function ThemeSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;
  const isActivePrefix = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      <List disablePadding sx={{ px: 1 }}>
        {MAIN_ITEMS.map(item => {
          const active = item.prefix ? isActivePrefix(item.path) : isActive(item.path);
          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{ my: 0.25 }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}><Icon name={item.icon} size={18} filled={active} /></ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.8125rem' }} />
            </ListItemButton>
          );
        })}
      </List>

      <List
        disablePadding
        sx={{ px: 1 }}
        subheader={
          <ListSubheader disableSticky sx={{ fontSize: '0.6875rem', lineHeight: '28px', mt: 1, fontWeight: 500, letterSpacing: '0.08em' }}>
            STYLES
          </ListSubheader>
        }
      >
        {STYLE_ITEMS.map(item => {
          const active = isActive(item.path);
          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{ my: 0.25 }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}><Icon name={item.icon} size={18} filled={active} /></ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.8125rem' }} />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
}
