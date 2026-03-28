import { useState, useMemo } from 'react';
import { Box, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUnifiedRegistry, type UnifiedComponent } from '../../showcase/registry';
import { Icon } from '../../components/Icon';
import { SearchField } from '../../components/SearchField';
const SORT_ORDER: Record<string, string[]> = {
  actions: ['button', 'button-group', 'toggle-button', 'toggle-chip'],
  inputs: ['textfield', 'search-field', 'select', 'autocomplete', 'multi-select', 'checkbox', 'radio', 'switch', 'slider', 'date-picker', 'time-picker', 'datetime-picker', 'date-range-picker'],
  'data-display': ['table', 'advanced-table', 'chip', 'badge', 'icon'],
  feedback: ['alert', 'dialog', 'progress'],
  surfaces: ['card', 'accordion'],
  navigation: ['tabs', 'breadcrumbs', 'pagination', 'stepper', 'sidebar', 'top-bar', 'app-layout'],
};

const CATEGORIES = [
  { key: 'actions', label: 'Actions', icon: 'touch_app' },
  { key: 'inputs', label: 'Inputs', icon: 'input' },
  { key: 'data-display', label: 'Data Display', icon: 'table_chart' },
  { key: 'feedback', label: 'Feedback', icon: 'feedback' },
  { key: 'surfaces', label: 'Surfaces', icon: 'layers' },
  { key: 'navigation', label: 'Navigation', icon: 'menu' },
];

function sortByOrder(items: UnifiedComponent[], category: string) {
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

export function ComponentsSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const isActive = (path: string) => location.pathname === path;

  const unified = useMemo(() => getUnifiedRegistry(), []);

  const categoryGroups = useMemo(() =>
    CATEGORIES.map(cat => ({
      ...cat,
      items: sortByOrder(
        unified.filter(c => c.category === cat.key),
        cat.key,
      ),
    })).filter(g => g.items.length > 0),
  [unified]);

  // Flat search results
  const searchResults = useMemo(() => {
    if (!q) return null;
    const all = [
      { label: 'All Components', path: '/components', icon: 'grid_view' },
      { label: 'Experimental', path: '/components/experimental', icon: 'new_releases' },
      ...unified.map(c => ({ label: c.name, path: `/components/${c.id}`, icon: undefined as string | undefined })),
    ];
    return all.filter(item => item.label.toLowerCase().includes(q));
  }, [q, unified]);

  return (
    <Box sx={{ px: 1 }}>
      {/* Search */}
      <Box sx={{ px: 1, pb: 1 }}>
        <SearchField
          placeholder="Filter components..."
          size="small"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>

      {searchResults ? (
        /* Search results */
        <List disablePadding>
          {searchResults.map(item => {
            const active = isActive(item.path);
            return (
              <ListItemButton
                key={item.path}
                selected={active}
                onClick={() => { navigate(item.path); setQuery(''); }}
                sx={{ my: 0.25 }}
              >
                {item.icon && <ListItemIcon sx={{ minWidth: 28 }}><Icon name={item.icon} size={18} filled={active} /></ListItemIcon>}
                <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.8125rem' }} />
              </ListItemButton>
            );
          })}
        </List>
      ) : (
        /* Normal navigation */
        <>
          <List disablePadding>
            <ListItemButton
              selected={isActive('/components')}
              onClick={() => navigate('/components')}
              sx={{ my: 0.25 }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}><Icon name="grid_view" size={18} filled={isActive('/components')} /></ListItemIcon>
              <ListItemText primary="All Components" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
            </ListItemButton>
            <ListItemButton
              selected={isActive('/components/experimental')}
              onClick={() => navigate('/components/experimental')}
              sx={{ my: 0.25 }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}><Icon name="new_releases" size={18} filled={isActive('/components/experimental')} /></ListItemIcon>
              <ListItemText primary="Experimental" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
            </ListItemButton>
          </List>

          {categoryGroups.map(group => (
            <List
              key={group.key}
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ fontSize: '0.6875rem', lineHeight: '28px', mt: 0.5 }}>
                  {group.label}
                </ListSubheader>
              }
            >
              {group.items.map(comp => (
                <ListItemButton
                  key={comp.id}
                  selected={isActive(`/components/${comp.id}`)}
                  onClick={() => navigate(`/components/${comp.id}`)}
                  sx={{ my: 0.25, pl: 2 }}
                >
                  <ListItemText primary={comp.name} primaryTypographyProps={{ fontSize: '0.8125rem' }} />
                </ListItemButton>
              ))}
            </List>
          ))}
        </>
      )}
    </Box>
  );
}
