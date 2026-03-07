import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPONENT_REGISTRY } from '../registry';
import { BrandSwitcher } from '../blocks/BrandSwitcher';
import { useBrand } from '../../theme/brand-context';

const NAV_SECTIONS = [
  { title: 'Overview', items: [{ label: 'Home', path: '/' }, { label: 'Getting Started', path: '/getting-started' }] },
  { title: 'Tokens', items: [{ label: 'Colors', path: '/tokens/colors' }, { label: 'Effects', path: '/tokens/effects' }] },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;

  const inputComponents = COMPONENT_REGISTRY.filter(c => c.category === 'inputs');
  const displayComponents = COMPONENT_REGISTRY.filter(c => c.category === 'data-display');
  const navComponents = COMPONENT_REGISTRY.filter(c => c.category === 'navigation');

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        height: '100vh',
        overflow: 'auto',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2.5, pb: 2 }}>
        <Typography variant="h3" sx={{ fontSize: '1.5rem', mb: 4 }}>
          Design System
        </Typography>
        <BrandSwitcher />
      </Box>

      {NAV_SECTIONS.map(section => (
        <Box key={section.title} sx={{ px: 1, pt: 2 }}>
          <Typography variant="caption" sx={{ px: 1.5, fontWeight: sw, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
            {section.title}
          </Typography>
          <List dense disablePadding>
            {section.items.map(item => (
              <ListItemButton
                key={item.path}
                selected={isActive(item.path)}
                onClick={() => navigate(item.path)}
                sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, minHeight: 36 }}
              >
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.85rem' }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}

      {[
        { title: 'Inputs', items: inputComponents },
        { title: 'Data Display', items: displayComponents },
        { title: 'Navigation', items: navComponents },
      ].filter(s => s.items.length > 0).map(section => (
        <Box key={section.title} sx={{ px: 1, pt: 2 }}>
          <Typography variant="caption" sx={{ px: 1.5, fontWeight: sw, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
            {section.title}
          </Typography>
          <List dense disablePadding>
            {section.items.map(comp => (
              <ListItemButton
                key={comp.id}
                selected={isActive(`/components/${comp.id}`)}
                onClick={() => navigate(`/components/${comp.id}`)}
                sx={{ borderRadius: 1.5, mx: 0.5, my: 0.25, minHeight: 36 }}
              >
                <ListItemText primary={comp.name} primaryTypographyProps={{ fontSize: '0.85rem' }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}

      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
