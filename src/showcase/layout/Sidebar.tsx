import { useState, useMemo } from 'react';
import { Drawer, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPONENT_REGISTRY } from '../registry';
import { Icon } from '../../components/Icon';
import { SearchField } from '../../components/SearchField';
import { useBrand } from '../../theme/brand-context';

const NAV_SECTIONS = [
  { title: 'Overview', items: [{ label: 'Home', icon: 'home', path: '/' }, { label: 'Getting Started', icon: 'play_arrow', path: '/getting-started' }] },
  { title: 'Tokens', items: [{ label: 'Colors', icon: 'palette', path: '/tokens/colors' }, { label: 'Typography', icon: 'text_fields', path: '/tokens/typography' }, { label: 'Spacing', icon: 'space_bar', path: '/tokens/spacing' }, { label: 'Sizing', icon: 'straighten', path: '/tokens/sizing' }, { label: 'Effects', icon: 'auto_awesome', path: '/tokens/effects' }] },
];

/** Desired display order per category (components not listed sort to end alphabetically) */
const SORT_ORDER: Record<string, string[]> = {
  actions: ['button', 'button-group', 'toggle-button', 'toggle-chip'],
  inputs: ['textfield', 'search-field', 'select', 'autocomplete', 'multi-select', 'checkbox', 'radio', 'switch', 'slider', 'date-picker', 'time-picker', 'datetime-picker', 'date-range-picker'],
  'data-display': ['table', 'advanced-table', 'chip', 'badge', 'icon'],
  feedback: ['alert', 'dialog', 'progress'],
  surfaces: ['card', 'accordion'],
  navigation: ['tabs', 'breadcrumbs', 'pagination', 'stepper', 'sidebar', 'top-bar', 'app-layout'],
};

function sortByOrder(items: typeof COMPONENT_REGISTRY, category: string) {
  const order = SORT_ORDER[category] ?? [];
  return [...items].sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    if (ai >= 0 && bi >= 0) return ai - bi;
    if (ai >= 0) return -1;
    if (bi >= 0) return 1;
    return a.name.localeCompare(b.name);
  });
}

const SIDEBAR_WIDTH = 260;

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const isDark = effects.mode === 'dark';
  const [query, setQuery] = useState('');
  const q = query.toLowerCase().trim();

  /** Build all navigable items (static + registry) for filtering */
  const allItems = useMemo(() => {
    const staticItems = NAV_SECTIONS.flatMap(s =>
      s.items.map(i => ({ label: i.label, path: i.path, icon: i.icon, section: s.title })),
    );
    const registryItems = COMPONENT_REGISTRY.map(comp => ({
      label: comp.name,
      path: `/components/${comp.id}`,
      icon: undefined as string | undefined,
      section: comp.category,
    }));
    return [...staticItems, ...registryItems];
  }, []);

  const actionComponents = sortByOrder(COMPONENT_REGISTRY.filter(c => c.category === 'actions'), 'actions');
  const inputComponents = sortByOrder(COMPONENT_REGISTRY.filter(c => c.category === 'inputs'), 'inputs');
  const displayComponents = sortByOrder(COMPONENT_REGISTRY.filter(c => c.category === 'data-display'), 'data-display');
  const feedbackComponents = sortByOrder(COMPONENT_REGISTRY.filter(c => c.category === 'feedback'), 'feedback');
  const surfaceComponents = sortByOrder(COMPONENT_REGISTRY.filter(c => c.category === 'surfaces'), 'surfaces');
  const navComponents = sortByOrder(COMPONENT_REGISTRY.filter(c => c.category === 'navigation'), 'navigation');

  /** Filtered results when searching */
  const searchResults = useMemo(() => {
    if (!q) return [];
    return allItems.filter(item => item.label.toLowerCase().includes(q));
  }, [q, allItems]);

  const isActive = (path: string) => location.pathname === path;

  /** Active nav item style — matches chip colorPrimary (brand weak) */
  const activeBg = isDark ? c.brand500 : c.brand100;
  const activeItemSx = {
    '&.Mui-selected': {
      background: activeBg,
      backgroundColor: activeBg,
      color: isDark ? c.brand200 : c.brand450,
      border: `1px solid ${activeBg}`,
      boxShadow: effects.shadows.chipBrand,
      borderRadius: '12px',
      '&:hover': {
        background: activeBg,
        backgroundColor: activeBg,
        filter: isDark ? 'brightness(1.12)' : 'brightness(0.97)',
      },
      '& .MuiListItemIcon-root': {
        color: isDark ? c.brand200 : c.brand450,
      },
    },
  };

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
        <SearchField
          placeholder="Search..."
          shortcut="⌘ S"
          globalShortcut="meta+s"
          size="small"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchResults.length > 0) {
              navigate(searchResults[0].path);
              setQuery('');
            }
            if (e.key === 'Escape') {
              setQuery('');
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
      </Box>

      {/* ── Nav content ── */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 1 }}>
        {q ? (
          /* ── Search results ── */
          <List disablePadding subheader={<ListSubheader disableSticky>Results</ListSubheader>}>
            {searchResults.length === 0 ? (
              <Typography variant="body2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
                No results found
              </Typography>
            ) : (
              searchResults.map(item => (
                <ListItemButton
                  key={item.path}
                  selected={isActive(item.path)}
                  onClick={() => { navigate(item.path); setQuery(''); }}
                  sx={{ my: 0.25, ...activeItemSx }}
                >
                  {item.icon && (
                    <ListItemIcon>
                      <Icon name={item.icon} size={20} />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))
            )}
          </List>
        ) : (
          /* ── Normal navigation ── */
          <>
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
                    sx={{ my: 0.25, ...activeItemSx }}
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
              { title: 'Actions', items: actionComponents },
              { title: 'Inputs', items: inputComponents },
              { title: 'Data Display', items: displayComponents },
              { title: 'Feedback', items: feedbackComponents },
              { title: 'Surfaces', items: surfaceComponents },
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
                    sx={{ my: 0.25, ...activeItemSx }}
                  >
                    <ListItemText primary={comp.name} />
                  </ListItemButton>
                ))}
              </List>
            ))}
          </>
        )}
      </Box>
    </Drawer>
  );
}
