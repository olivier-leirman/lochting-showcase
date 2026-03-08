import { Drawer, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Box, Typography, IconButton, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPONENT_REGISTRY } from '../registry';
import { BrandSwitcher } from '../blocks/BrandSwitcher';
import { Icon } from '../../components/Icon';
import { SearchField } from '../../components/SearchField';
import { useBrand } from '../../theme/brand-context';

const NAV_SECTIONS = [
  { title: 'Overview', items: [{ label: 'Home', icon: 'home', path: '/' }, { label: 'Getting Started', icon: 'play_arrow', path: '/getting-started' }] },
  { title: 'Tokens', items: [{ label: 'Colors', icon: 'palette', path: '/tokens/colors' }, { label: 'Effects', icon: 'auto_awesome', path: '/tokens/effects' }, { label: 'Typography', icon: 'text_fields', path: '/tokens/typography' }] },
];

const SIDEBAR_WIDTH = 260;

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useBrand();

  const inputComponents = COMPONENT_REGISTRY.filter(c => c.category === 'inputs');
  const displayComponents = COMPONENT_REGISTRY.filter(c => c.category === 'data-display');
  const navComponents = COMPONENT_REGISTRY.filter(c => c.category === 'navigation');

  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          position: 'relative',
          height: '100%',
        },
      }}
    >
      {/* ── Logo / header ── */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h3" sx={{ fontSize: '1.5rem', mb: 2 }}>
          Design System
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <BrandSwitcher />
          <Tooltip title={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton
              onClick={toggleColorMode}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                width: 36,
                height: 36,
              }}
            >
              <Icon name={colorMode === 'light' ? 'dark_mode' : 'light_mode'} size={18} />
            </IconButton>
          </Tooltip>
        </Box>
        <SearchField placeholder="Search..." shortcut="⌘ K" size="small" fullWidth />
      </Box>

      {/* ── Static nav sections ── */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 1 }}>
        {NAV_SECTIONS.map(section => (
          <List
            key={section.title}
            disablePadding
            subheader={
              <ListSubheader disableSticky>
                {section.title}
              </ListSubheader>
            }
          >
            {section.items.map(item => (
              <ListItemButton
                key={item.path}
                selected={isActive(item.path)}
                onClick={() => navigate(item.path)}
                sx={{ my: 0.25 }}
              >
                <ListItemIcon>
                  <Icon name={item.icon} size={20} />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        ))}

        {/* ── Component registry sections ── */}
        {[
          { title: 'Inputs', items: inputComponents },
          { title: 'Data Display', items: displayComponents },
          { title: 'Navigation', items: navComponents },
        ].filter(s => s.items.length > 0).map(section => (
          <List
            key={section.title}
            disablePadding
            subheader={
              <ListSubheader disableSticky>
                {section.title}
              </ListSubheader>
            }
          >
            {section.items.map(comp => (
              <ListItemButton
                key={comp.id}
                selected={isActive(`/components/${comp.id}`)}
                onClick={() => navigate(`/components/${comp.id}`)}
                sx={{ my: 0.25 }}
              >
                <ListItemText primary={comp.name} />
              </ListItemButton>
            ))}
          </List>
        ))}
      </Box>
    </Drawer>
  );
}
