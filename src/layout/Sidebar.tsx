import { useState, useMemo } from 'react';
import { Drawer, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Collapse } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPONENT_REGISTRY } from '../showcase/registry';
import { Icon } from '../components/Icon';
import { SearchField } from '../components/SearchField';
import { useBrand } from '../theme/brand-context';

// ── Navigation structure ──

interface NavItem {
  label: string;
  icon?: string;
  path: string;
}

interface NavGroup {
  label: string;
  icon: string;
  children: NavItem[];
}

type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry;
}

const LIBRARY_SECTIONS: NavEntry[] = [
  { label: 'Overview', icon: 'grid_view', path: '/library' },
  { label: 'Experimental', icon: 'science', path: '/library/experimental' },
];

const DESIGN_SYSTEM_SECTIONS: NavEntry[] = [
  { label: 'Colors & Palettes', icon: 'palette', path: '/design-system/colors' },
  { label: 'Typography', icon: 'text_fields', path: '/design-system/typography' },
  { label: 'Spacing & Sizing', icon: 'space_bar', path: '/design-system/spacing' },
  { label: 'Effects', icon: 'auto_awesome', path: '/design-system/effects' },
  { label: 'Icons', icon: 'category', path: '/design-system/icons' },
  { label: 'Patterns', icon: 'pattern', path: '/design-system/patterns' },
  { label: 'Design Rules', icon: 'rule', path: '/design-system/rules' },
  { label: 'Style Variants', icon: 'style', path: '/design-system/styles' },
  { label: 'Brand Identity', icon: 'fingerprint', path: '/design-system/identity/medipim/flat' },
  { label: 'Theme Playground', icon: 'tune', path: '/design-system/playground' },
  { label: 'Consistency', icon: 'verified', path: '/design-system/consistency' },
  { label: 'Style Creator', icon: 'brush', path: '/design-system/style-creator' },
];

/** Desired display order per category */
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

/** Build component category groups for the Library section */
function useComponentGroups(): NavGroup[] {
  return useMemo(() => {
    const categories = [
      { key: 'actions', label: 'Actions', icon: 'touch_app' },
      { key: 'inputs', label: 'Inputs', icon: 'input' },
      { key: 'data-display', label: 'Data Display', icon: 'table_chart' },
      { key: 'feedback', label: 'Feedback', icon: 'feedback' },
      { key: 'surfaces', label: 'Surfaces', icon: 'layers' },
      { key: 'navigation', label: 'Navigation', icon: 'menu' },
    ];

    return categories
      .map(cat => {
        const items = sortByOrder(
          COMPONENT_REGISTRY.filter(c => c.category === cat.key),
          cat.key,
        );
        return {
          label: cat.label,
          icon: cat.icon,
          children: items.map(comp => ({
            label: comp.name,
            path: `/components/${comp.id}`,
          })),
        };
      })
      .filter(g => g.children.length > 0);
  }, []);
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

  const componentGroups = useComponentGroups();

  // Track which collapsible groups are open
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  /** Build all navigable items for search filtering */
  const allItems = useMemo(() => {
    const staticItems = [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'Getting Started', path: '/getting-started', icon: 'play_arrow' },
      ...DESIGN_SYSTEM_SECTIONS.filter((e): e is NavItem => !isGroup(e)).map(i => ({ label: i.label, path: i.path, icon: i.icon })),
    ];
    const registryItems = COMPONENT_REGISTRY.map(comp => ({
      label: comp.name,
      path: `/components/${comp.id}`,
      icon: undefined as string | undefined,
    }));
    return [...staticItems, ...registryItems];
  }, []);

  const searchResults = useMemo(() => {
    if (!q) return [];
    return allItems.filter(item => item.label.toLowerCase().includes(q));
  }, [q, allItems]);

  const isActive = (path: string) => location.pathname === path;

  /** Check if any child in a group is active */
  const isGroupActive = (group: NavGroup) => group.children.some(child => isActive(child.path));

  /** Active nav item style */
  const activeBg = isDark ? c.brand500 : c.brand100;
  const activeItemSx = {
    '&.Mui-selected': {
      background: activeBg,
      backgroundColor: activeBg,
      color: isDark ? c.brand200 : c.brand450,
      border: '1px solid transparent',
      boxShadow: 'none',
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

  /** Render a single nav item */
  const renderItem = (item: NavItem, indent = false) => (
    <ListItemButton
      key={item.path}
      selected={isActive(item.path)}
      onClick={() => { navigate(item.path); setQuery(''); }}
      sx={{ my: 0.25, pl: indent ? 4 : undefined, ...activeItemSx }}
    >
      {item.icon && (
        <ListItemIcon>
          <Icon name={item.icon} size={20} />
        </ListItemIcon>
      )}
      <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: indent ? '0.8125rem' : undefined }} />
    </ListItemButton>
  );

  /** Render a collapsible group */
  const renderGroup = (group: NavGroup) => {
    const isOpen = openGroups[group.label] ?? isGroupActive(group);
    return (
      <Box key={group.label}>
        <ListItemButton
          onClick={() => toggleGroup(group.label)}
          sx={{ my: 0.25 }}
        >
          <ListItemIcon>
            <Icon name={group.icon} size={20} />
          </ListItemIcon>
          <ListItemText primary={group.label} />
          <Icon name={isOpen ? 'expand_less' : 'expand_more'} size={18} />
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List disablePadding>
            {group.children.map(child => renderItem(child, true))}
          </List>
        </Collapse>
      </Box>
    );
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
      <Box sx={{ flex: 1, overflow: 'auto', px: '8px' }}>
        {q ? (
          /* ── Search results ── */
          <List disablePadding subheader={<ListSubheader disableSticky>Results</ListSubheader>}>
            {searchResults.length === 0 ? (
              <Typography variant="body2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
                No results found
              </Typography>
            ) : (
              searchResults.map(item => renderItem(item))
            )}
          </List>
        ) : (
          /* ── Normal navigation ── */
          <>
            {/* Home */}
            <List disablePadding>
              {renderItem({ label: 'Home', icon: 'home', path: '/' })}
              {renderItem({ label: 'Getting Started', icon: 'play_arrow', path: '/getting-started' })}
            </List>

            {/* Library */}
            <List
              disablePadding
              subheader={<ListSubheader disableSticky>Library</ListSubheader>}
            >
              {LIBRARY_SECTIONS.map(entry =>
                isGroup(entry) ? renderGroup(entry) : renderItem(entry),
              )}
              {componentGroups.map(group => renderGroup(group))}
            </List>

            {/* Design System */}
            <List
              disablePadding
              subheader={<ListSubheader disableSticky>Design System</ListSubheader>}
            >
              {DESIGN_SYSTEM_SECTIONS.map(entry =>
                isGroup(entry) ? renderGroup(entry) : renderItem(entry),
              )}
            </List>

            {/* Playground */}
            <List
              disablePadding
              subheader={<ListSubheader disableSticky>Playground</ListSubheader>}
            >
              {renderItem({ label: 'Component Playground', icon: 'science', path: '/playground' })}
              {renderItem({ label: 'Style Showcase', icon: 'brush', path: '/style-showcase' })}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
}
