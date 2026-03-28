import { Box, Button, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';

const PLAYGROUND_ITEMS = [
  { label: 'Component Playground', icon: 'science', path: '/playground/component' },
  { label: 'Theme Playground', icon: 'tune', path: '/playground/theme' },
  { label: 'Style Showcase', icon: 'brush', path: '/playground/showcase' },
];

export function PlaygroundSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* New Session button */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Icon name="add" size={18} />}
          onClick={() => navigate('/playground/component')}
          sx={{ textTransform: 'none', fontWeight: 500, fontSize: '0.8125rem' }}
        >
          New Session
        </Button>
      </Box>

      <List disablePadding sx={{ px: 1 }}>
        {PLAYGROUND_ITEMS.map(item => {
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
          <ListSubheader disableSticky sx={{ fontSize: '0.6875rem', lineHeight: '28px', mt: 0.5 }}>
            Recent Sessions
          </ListSubheader>
        }
      >
        <Typography variant="body2" sx={{ px: 2, py: 1, color: 'text.disabled', fontSize: '0.75rem' }}>
          No recent sessions
        </Typography>
      </List>
    </>
  );
}
