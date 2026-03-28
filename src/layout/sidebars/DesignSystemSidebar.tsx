import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const MAIN_ITEMS = [
  { label: 'Overview', icon: 'dashboard', path: '/design-system' },
  { label: 'Design Rules', icon: 'rule', path: '/design-system/rules' },
  { label: 'Patterns', icon: 'pattern', path: '/design-system/patterns' },
  { label: 'Consistency', icon: 'verified', path: '/design-system/consistency' },
  { label: 'QA Report', icon: 'bug_report', path: '/design-system/qa' },
];

const STYLE_CONTROL_ITEMS = [
  { label: 'Style Overrides', icon: 'tune', path: '/design-system/overrides' },
  { label: 'Exception Registry', icon: 'playlist_remove', path: '/design-system/exceptions' },
];

export function DesignSystemSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <List disablePadding sx={{ px: 1 }}>
        {MAIN_ITEMS.map(item => {
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

      <List
        disablePadding
        sx={{ px: 1 }}
        subheader={
          <ListSubheader disableSticky sx={{ fontSize: '0.6875rem', lineHeight: '28px', mt: 1, fontWeight: 500, letterSpacing: '0.08em' }}>
            STYLE CONTROL
          </ListSubheader>
        }
      >
        {STYLE_CONTROL_ITEMS.map(item => {
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
