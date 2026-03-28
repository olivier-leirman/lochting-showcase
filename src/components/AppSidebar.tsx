import { type ReactNode, useState, useCallback } from 'react';
import {
  Drawer,
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  type DrawerProps,
} from '@mui/material';
import { Icon } from './Icon';
import { SearchField } from './SearchField';
import { useBrand } from '../theme/brand-context';

/** Build the active nav item styles from current brand tokens */
function useActiveItemSx() {
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const isDark = effects.mode === 'dark';
  const activeBg = isDark ? c.brand500 : c.brand100;

  return {
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
}

export interface SidebarItem {
  /** Display label */
  label: string;
  /** Material Symbols icon name */
  icon?: string;
  /** Whether this item is currently active/selected */
  active?: boolean;
  /** Badge count (notification indicator) */
  badge?: number | string;
  /** Whether this item has children (shows expand arrow) */
  expandable?: boolean;
  /** Sub-navigation items (shown in the ExtraNav panel) */
  children?: SidebarItem[];
  /** Click handler */
  onClick?: () => void;
}

export interface SidebarSection {
  /** Section title (rendered as uppercase subheader) */
  title: string;
  /** Navigation items in this section */
  items: SidebarItem[];
}

export interface AppSidebarProps {
  /** Content to render in the logo area */
  logo?: ReactNode;
  /** Navigation sections */
  sections: SidebarSection[];
  /** Width of the main sidebar column (default: 256) */
  width?: number;
  /** Width of the collapsed sidebar (default: 64) */
  collapsedWidth?: number;
  /** Width of the extra nav panel (default: 256) */
  extraNavWidth?: number;
  /** Whether to show the search field */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Callback when search value changes */
  onSearch?: (query: string) => void;
  /** Whether the sidebar is collapsed (controlled) */
  collapsed?: boolean;
  /** Callback when collapse state changes (controlled) */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Footer content (rendered at bottom of sidebar) */
  footer?: ReactNode;
  /** Currently expanded parent item label (controlled mode) */
  expandedItem?: string | null;
  /** Callback when a parent item is expanded/collapsed (controlled mode) */
  onExpandedChange?: (label: string | null) => void;
  /** Additional Drawer props */
  drawerProps?: Partial<DrawerProps>;
}

const COLLAPSED_WIDTH = 64;

export function AppSidebar({
  logo,
  sections,
  width = 256,
  collapsedWidth = COLLAPSED_WIDTH,
  extraNavWidth = 256,
  showSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  footer,
  expandedItem: controlledExpandedItem,
  onExpandedChange,
  drawerProps,
}: AppSidebarProps) {
  const activeItemSx = useActiveItemSx();

  // Internal collapsed state for uncontrolled mode
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const setCollapsed = useCallback(
    (value: boolean) => {
      if (onCollapsedChange) {
        onCollapsedChange(value);
      } else {
        setInternalCollapsed(value);
      }
    },
    [onCollapsedChange],
  );

  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState<string | null>(null);

  // Use controlled value if provided, otherwise use internal state
  const expandedItem = controlledExpandedItem !== undefined ? controlledExpandedItem : internalExpanded;
  const setExpandedItem = useCallback(
    (label: string | null) => {
      if (onExpandedChange) {
        onExpandedChange(label);
      } else {
        setInternalExpanded(label);
      }
    },
    [onExpandedChange],
  );

  // Find the expanded item and its children
  const expandedData = expandedItem
    ? sections.flatMap((s) => s.items).find((item) => item.label === expandedItem && item.children?.length)
    : null;

  const hasExtraNav = !!expandedData && !collapsed;
  const currentWidth = collapsed ? collapsedWidth : width;
  const totalWidth = hasExtraNav ? currentWidth + extraNavWidth : currentWidth;

  const handleItemClick = (item: SidebarItem) => {
    if (item.children?.length) {
      if (collapsed) {
        // Expand sidebar first, then open ExtraNav
        setCollapsed(false);
        setExpandedItem(item.label);
      } else {
        // Toggle the extra nav
        setExpandedItem(expandedItem === item.label ? null : item.label);
      }
    }
    item.onClick?.();
  };

  /** Called when a child item in ExtraNav is clicked */
  const handleExtraNavItemClick = (item: SidebarItem) => {
    item.onClick?.();
    // Close ExtraNav after navigating
    setExpandedItem(null);
  };

  const handleToggleCollapse = () => {
    if (!collapsed) {
      // Collapsing — also close ExtraNav
      setExpandedItem(null);
    }
    setCollapsed(!collapsed);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: totalWidth,
        flexShrink: 0,
        transition: 'width 0.25s ease',
        height: '100%',
      }}
    >
      {/* ── Main sidebar column ── */}
      <Drawer
        variant="permanent"
        {...drawerProps}
        sx={{
          width: currentWidth,
          flexShrink: 0,
          transition: 'width 0.25s ease',
          '& .MuiDrawer-paper': {
            width: currentWidth,
            position: 'relative',
            height: '100%',
            transition: 'width 0.25s ease',
            overflowX: 'hidden',
          },
          ...drawerProps?.sx,
        }}
      >
        {/* ── Logo area ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            px: collapsed ? 1 : 2,
            py: 1.5,
            minHeight: 48,
          }}
        >
          {collapsed ? (
            <Tooltip title="Expand sidebar" placement="right">
              <IconButton size="small" onClick={handleToggleCollapse}>
                <Icon name="left_panel_open" size={20} />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              {logo ?? <Box sx={{ flex: 1 }} />}
              <Tooltip title="Collapse sidebar">
                <IconButton size="small" onClick={handleToggleCollapse} sx={{ ml: 'auto' }}>
                  <Icon name="left_panel_close" size={20} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>

        {/* ── Search ── */}
        {showSearch && !collapsed && (
          <Box sx={{ px: 2, pb: 1 }}>
            <SearchField
              placeholder={searchPlaceholder}
              shortcut="⌘ S"
              size="small"
              onChange={(e) => onSearch?.(e.target.value)}
              fullWidth
            />
          </Box>
        )}

        {/* ── Navigation sections ── */}
        <Box sx={{ flex: 1, overflow: 'auto', px: collapsed ? 0.5 : 1 }}>
          {sections.map((section) => (
            <List
              key={section.title}
              disablePadding
              subheader={
                section.title ? (
                  collapsed ? (
                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider', my: 1, mx: 1 }} />
                  ) : (
                    <ListSubheader disableSticky>
                      {section.title}
                    </ListSubheader>
                  )
                ) : undefined
              }
            >
              {section.items.map((item) => (
                <Tooltip
                  key={item.label}
                  title={collapsed ? item.label : ''}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    selected={item.active || expandedItem === item.label}
                    onClick={() => handleItemClick(item)}
                    sx={{
                      my: 0.25,
                      justifyContent: collapsed ? 'center' : undefined,
                      px: collapsed ? 1.5 : undefined,
                      minHeight: collapsed ? 44 : undefined,
                      ...activeItemSx,
                    }}
                  >
                    {item.icon && (
                      <ListItemIcon sx={{ minWidth: collapsed ? 0 : undefined }}>
                        <Icon name={item.icon} size={20} />
                      </ListItemIcon>
                    )}
                    {!collapsed && <ListItemText primary={item.label} />}
                    {!collapsed && item.badge != null && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          height: 22,
                          minWidth: 22,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                        }}
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {!collapsed && (item.expandable || item.children?.length) && (
                      <Icon
                        name="keyboard_arrow_right"
                        size={18}
                        sx={{
                          transition: 'opacity 0.15s ease',
                          opacity: expandedItem === item.label ? 1 : 0.5,
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              ))}
            </List>
          ))}
        </Box>

        {/* ── Footer ── */}
        {footer && !collapsed && (
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            {footer}
          </Box>
        )}
      </Drawer>

      {/* ── ExtraNav panel (second column) ── */}
      <Collapse
        orientation="horizontal"
        in={hasExtraNav}
        timeout={250}
        unmountOnExit
      >
        <ExtraNavPanel
          width={extraNavWidth}
          parentLabel={expandedData?.label ?? ''}
          items={expandedData?.children ?? []}
          onCollapse={() => setExpandedItem(null)}
          onItemClick={handleExtraNavItemClick}
        />
      </Collapse>
    </Box>
  );
}

/* ─── ExtraNav Panel (second sidebar column) ─── */

interface ExtraNavPanelProps {
  /** Width of the panel */
  width: number;
  /** Parent item label (shown as section header) */
  parentLabel: string;
  /** Child navigation items */
  items: SidebarItem[];
  /** Collapse handler */
  onCollapse: () => void;
  /** Item click handler (navigates + closes panel) */
  onItemClick: (item: SidebarItem) => void;
}

function ExtraNavPanel({ width, parentLabel, items, onCollapse, onItemClick }: ExtraNavPanelProps) {
  const activeItemSx = useActiveItemSx();

  return (
    <Box
      sx={{
        width,
        height: '100%',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Spacer to align with logo area ── */}
      <Box sx={{ minHeight: 48 }} />

      {/* ── Sub-navigation ── */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 1, py: 1 }}>
        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pr: 1,
              }}
            >
              {parentLabel}
              <IconButton
                size="small"
                onClick={onCollapse}
                sx={{ width: 28, height: 28 }}
              >
                <Icon name="keyboard_arrow_left" size={18} />
              </IconButton>
            </ListSubheader>
          }
        >
          {items.map((item) => (
            <ListItemButton
              key={item.label}
              selected={item.active}
              onClick={() => onItemClick(item)}
              sx={{ my: 0.25, ...activeItemSx }}
            >
              {item.icon && (
                <ListItemIcon>
                  <Icon name={item.icon} size={20} />
                </ListItemIcon>
              )}
              <ListItemText primary={item.label} />
              {item.badge != null && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    height: 22,
                    minWidth: 22,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                  color="primary"
                  variant="outlined"
                />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
