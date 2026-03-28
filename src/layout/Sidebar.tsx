import { useState, useMemo, useCallback } from 'react';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPONENT_REGISTRY } from '../showcase/registry';
import { AppSidebar, type SidebarSection, type SidebarItem } from '../components/AppSidebar';

// ── Desired display order per component category ──

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

// ── Category configuration ──

const CATEGORIES = [
  { key: 'actions', label: 'Actions', icon: 'touch_app' },
  { key: 'inputs', label: 'Inputs', icon: 'input' },
  { key: 'data-display', label: 'Data Display', icon: 'table_chart' },
  { key: 'feedback', label: 'Feedback', icon: 'feedback' },
  { key: 'surfaces', label: 'Surfaces', icon: 'layers' },
  { key: 'navigation', label: 'Navigation', icon: 'menu' },
];

// ── Flat search index ──

interface SearchableItem {
  label: string;
  path: string;
  icon?: string;
}

const STATIC_ITEMS: SearchableItem[] = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'Getting Started', path: '/getting-started', icon: 'play_arrow' },
  { label: 'All Components', path: '/components', icon: 'grid_view' },
  { label: 'Experimental', path: '/components/experimental', icon: 'new_releases' },
  { label: 'Colors & Palettes', path: '/theme/colors', icon: 'palette' },
  { label: 'Typography', path: '/theme/typography', icon: 'text_fields' },
  { label: 'Spacing & Sizing', path: '/theme/spacing', icon: 'space_bar' },
  { label: 'Effects', path: '/theme/effects', icon: 'auto_awesome' },
  { label: 'Icons', path: '/theme/icons', icon: 'category' },
  { label: 'Design Rules', path: '/design-system/rules', icon: 'rule' },
  { label: 'Patterns', path: '/design-system/patterns', icon: 'pattern' },
  { label: 'Style Variants', path: '/theme/styles', icon: 'style' },
  { label: 'Style Creator', path: '/theme/styles/creator', icon: 'brush' },
  { label: 'Brand Identity', path: '/theme/identity/medipim/flat', icon: 'fingerprint' },
  { label: 'Consistency', path: '/design-system/consistency', icon: 'verified' },
  { label: 'QA Report', path: '/design-system/qa', icon: 'bug_report' },
  { label: 'Component Playground', path: '/playground/component', icon: 'science' },
  { label: 'Theme Playground', path: '/playground/theme', icon: 'tune' },
  { label: 'Style Showcase', path: '/playground/showcase', icon: 'brush' },
  { label: 'Medipim SaaS', path: '/prototypes/medipim-saas', icon: 'desktop_windows' },
];

// ── localStorage persistence ──

const EXPANDED_KEY = 'bw-sidebar-expanded';
const COLLAPSED_KEY = 'bw-sidebar-collapsed';

function loadExpanded(): string | null {
  try {
    return localStorage.getItem(EXPANDED_KEY);
  } catch {
    return null;
  }
}

function saveExpanded(label: string | null) {
  try {
    if (label) {
      localStorage.setItem(EXPANDED_KEY, label);
    } else {
      localStorage.removeItem(EXPANDED_KEY);
    }
  } catch {
    // Silently fail
  }
}

function loadCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function saveCollapsed(collapsed: boolean) {
  try {
    localStorage.setItem(COLLAPSED_KEY, String(collapsed));
  } catch {
    // Silently fail
  }
}

// ── Sidebar component ──

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  // Expanded group state — persisted in localStorage
  const [expandedItem, setExpandedItem] = useState<string | null>(loadExpanded);
  // Collapsed state — persisted in localStorage
  const [collapsed, setCollapsed] = useState(loadCollapsed);

  const handleExpandedChange = useCallback((label: string | null) => {
    setExpandedItem(label);
    saveExpanded(label);
  }, []);

  const handleCollapsedChange = useCallback((value: boolean) => {
    setCollapsed(value);
    saveCollapsed(value);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  /** Navigate and clear search */
  const go = useCallback((path: string) => {
    navigate(path);
    setQuery('');
  }, [navigate]);

  /** Build the full searchable index (static + components) */
  const searchIndex = useMemo(() => [
    ...STATIC_ITEMS,
    ...COMPONENT_REGISTRY.map(comp => ({
      label: comp.name,
      path: `/components/${comp.id}`,
    })),
  ], []);

  /** Build the normal navigation sections */
  const normalSections: SidebarSection[] = useMemo(() => {
    // ── Top items ──
    const topItems: SidebarItem[] = [
      { label: 'Home', icon: 'home', active: isActive('/'), onClick: () => go('/') },
      { label: 'Getting Started', icon: 'play_arrow', active: isActive('/getting-started'), onClick: () => go('/getting-started') },
    ];

    // ── Components section ──
    const componentItems: SidebarItem[] = [
      { label: 'All Components', icon: 'grid_view', active: isActive('/components'), onClick: () => go('/components') },
      { label: 'Experimental', icon: 'new_releases', active: isActive('/components/experimental'), onClick: () => go('/components/experimental') },
      ...CATEGORIES.map(cat => {
        const items = sortByOrder(
          COMPONENT_REGISTRY.filter(c => c.category === cat.key),
          cat.key,
        );
        if (items.length === 0) return null;
        return {
          label: cat.label,
          icon: cat.icon,
          children: items.map(comp => ({
            label: comp.name,
            active: isActive(`/components/${comp.id}`),
            onClick: () => go(`/components/${comp.id}`),
          })),
        };
      }).filter(Boolean) as SidebarItem[],
    ];

    // ── Theme section ──
    const themeItems: SidebarItem[] = [
      { label: 'Colors & Palettes', icon: 'palette', active: isActive('/theme/colors'), onClick: () => go('/theme/colors') },
      { label: 'Typography', icon: 'text_fields', active: isActive('/theme/typography'), onClick: () => go('/theme/typography') },
      { label: 'Spacing & Sizing', icon: 'space_bar', active: isActive('/theme/spacing'), onClick: () => go('/theme/spacing') },
      { label: 'Effects', icon: 'auto_awesome', active: isActive('/theme/effects'), onClick: () => go('/theme/effects') },
      { label: 'Icons', icon: 'category', active: isActive('/theme/icons'), onClick: () => go('/theme/icons') },
      { label: 'Brand Identity', icon: 'fingerprint', active: location.pathname.startsWith('/theme/identity'), onClick: () => go('/theme/identity/medipim/flat') },
    ];

    // ── Design System section ──
    const dsItems: SidebarItem[] = [
      { label: 'Design Rules', icon: 'rule', active: isActive('/design-system/rules'), onClick: () => go('/design-system/rules') },
      { label: 'Patterns', icon: 'pattern', active: isActive('/design-system/patterns'), onClick: () => go('/design-system/patterns') },
      { label: 'Style Variants', icon: 'style', active: isActive('/theme/styles'), onClick: () => go('/theme/styles') },
      { label: 'Style Creator', icon: 'brush', active: isActive('/theme/styles/creator'), onClick: () => go('/theme/styles/creator') },
      { label: 'Consistency', icon: 'verified', active: isActive('/design-system/consistency'), onClick: () => go('/design-system/consistency') },
      { label: 'QA Report', icon: 'bug_report', active: isActive('/design-system/qa'), onClick: () => go('/design-system/qa') },
    ];

    // ── Playground section ──
    const playgroundItems: SidebarItem[] = [
      { label: 'Component Playground', icon: 'science', active: isActive('/playground/component'), onClick: () => go('/playground/component') },
      { label: 'Theme Playground', icon: 'tune', active: isActive('/playground/theme'), onClick: () => go('/playground/theme') },
      { label: 'Style Showcase', icon: 'brush', active: isActive('/playground/showcase'), onClick: () => go('/playground/showcase') },
    ];

    // ── Prototypes section ──
    const prototypeItems: SidebarItem[] = [
      { label: 'Medipim SaaS', icon: 'desktop_windows', active: isActive('/prototypes/medipim-saas'), onClick: () => go('/prototypes/medipim-saas') },
    ];

    return [
      { title: '', items: topItems },
      { title: 'Components', items: componentItems },
      { title: 'Theme', items: themeItems },
      { title: 'Design System', items: dsItems },
      { title: 'Playground', items: playgroundItems },
      { title: 'Prototypes', items: prototypeItems },
    ];
  }, [location.pathname, go]); // eslint-disable-line react-hooks/exhaustive-deps

  /** Build search results as a flat section */
  const searchSections: SidebarSection[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const matches = searchIndex.filter(item => item.label.toLowerCase().includes(q));
    return [{
      title: 'Results',
      items: matches.length > 0
        ? matches.map(item => ({
            label: item.label,
            icon: item.icon,
            active: isActive(item.path),
            onClick: () => go(item.path),
          }))
        : [{ label: 'No results found', icon: 'search_off' }],
    }];
  }, [query, searchIndex, location.pathname, go]); // eslint-disable-line react-hooks/exhaustive-deps

  const isSearching = query.trim().length > 0;

  return (
    <AppSidebar
      logo={
        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          Design System
        </Typography>
      }
      showSearch
      searchPlaceholder="Search..."
      onSearch={setQuery}
      collapsed={collapsed}
      onCollapsedChange={handleCollapsedChange}
      expandedItem={isSearching ? null : expandedItem}
      onExpandedChange={handleExpandedChange}
      width={260}
      extraNavWidth={240}
      sections={isSearching ? searchSections : normalSections}
    />
  );
}
