import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Chip, Avatar, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { SearchField } from '../../components/SearchField';
import { ToggleChip, ToggleChipGroup } from '../../components/ToggleChip';
import { useBrand } from '../../theme/brand-context';
import { COMPONENT_REGISTRY, getComponentsByCategory } from '../registry';
import type { BrandTokens } from '../../theme/types';

/** Resolve the strong font-weight for the current brand */
function sw(brand: BrandTokens) { return brand.typography.strongWeight ?? 600; }

/* ─── Component icon mapping ─── */

const COMPONENT_ICONS: Record<string, string> = {
  button: 'smart_button', 'button-group': 'view_column', 'toggle-button': 'toggle_on', 'toggle-chip': 'filter_alt',
  textfield: 'text_fields', 'search-field': 'search', select: 'arrow_drop_down_circle', autocomplete: 'auto_awesome',
  'multi-select': 'checklist', checkbox: 'check_box', radio: 'radio_button_checked', switch: 'toggle_on',
  slider: 'linear_scale', 'date-picker': 'calendar_today', 'time-picker': 'schedule', 'datetime-picker': 'event',
  'date-range-picker': 'date_range',
  table: 'table_chart', 'advanced-table': 'table_view', chip: 'label', badge: 'notifications', icon: 'emoji_symbols',
  alert: 'warning', dialog: 'open_in_new', progress: 'hourglass_top',
  card: 'crop_landscape', accordion: 'expand_more',
  tabs: 'tab', breadcrumbs: 'chevron_right', pagination: 'more_horiz', stepper: 'linear_scale',
  sidebar: 'side_navigation', 'top-bar': 'web_asset', 'app-layout': 'dashboard',
};

const CATEGORY_LABELS: Record<string, string> = {
  actions: 'Actions', inputs: 'Inputs', 'data-display': 'Data Display',
  feedback: 'Feedback', surfaces: 'Surfaces', navigation: 'Navigation',
};
const CATEGORY_ORDER = ['actions', 'inputs', 'data-display', 'feedback', 'surfaces', 'navigation'];

/* ─── Mini stat card ─── */

function StatCard({ icon, value, label, change, brand }: {
  icon: string; value: string; label: string; change?: string; brand: BrandTokens;
}) {
  const c = brand.colors;
  const isPositive = change?.startsWith('+');
  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 2,
      p: 2,
      border: '1px solid',
      borderColor: c.borderDefault,
      flex: 1,
      minWidth: 140,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: 1.5,
          bgcolor: c.brand100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={18} color={c.brand400} />
        </Box>
        {change && (
          <Chip
            label={change}
            size="small"
            sx={{
              fontSize: '0.7rem',
              height: 22,
              bgcolor: isPositive ? c.success.bgWeakest : c.error.bgWeakest,
              color: isPositive ? c.success.contentStrong : c.error.contentStrong,
              fontWeight: sw(brand),
            }}
          />
        )}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: c.contentPrimary, fontFamily: 'inherit', lineHeight: 1.2 }}>
        {value}
      </Typography>
      <Typography variant="caption" sx={{ color: c.contentTertiary }}>
        {label}
      </Typography>
    </Box>
  );
}

/* ─── Chart placeholder (decorative SVG) ─── */

function ChartPlaceholder({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 2,
      border: '1px solid',
      borderColor: c.borderDefault,
      p: 3,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary, mb: 0.5 }}>
        Revenue Overview
      </Typography>
      <Typography variant="caption" sx={{ color: c.contentTertiary, mb: 2, display: 'block' }}>
        Monthly revenue for the current quarter
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 120, mt: 2 }}>
        {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              height: `${h}%`,
              borderRadius: '4px 4px 0 0',
              background: i >= 10 ? c.brand200 : c.brand400,
              opacity: i >= 10 ? 0.5 : 0.15 + (i * 0.07),
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 1 },
            }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
          <Typography key={m} variant="caption" sx={{ color: c.contentTertiary, fontSize: '0.6rem', flex: 1, textAlign: 'center' }}>
            {m}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

/* ─── Recent Activity Table ─── */

const ACTIVITY_DATA = [
  { name: 'Sarah Chen', avatar: 'SC', action: 'Updated product catalog', date: 'Mar 12, 2026', status: 'Completed' },
  { name: 'Marcus Webb', avatar: 'MW', action: 'Created new campaign', date: 'Mar 11, 2026', status: 'Active' },
  { name: 'Elena Rossi', avatar: 'ER', action: 'Submitted order #4821', date: 'Mar 11, 2026', status: 'Pending' },
  { name: 'James Park', avatar: 'JP', action: 'Published blog post', date: 'Mar 10, 2026', status: 'Completed' },
  { name: 'Aisha Patel', avatar: 'AP', action: 'Updated pricing tier', date: 'Mar 10, 2026', status: 'Active' },
];

function ActivityTable({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const statusColor = (s: string) => {
    if (s === 'Completed') return 'success';
    if (s === 'Active') return 'primary';
    return 'warning';
  };
  return (
    <Box sx={{
      bgcolor: c.bgElevated,
      borderRadius: 2,
      border: '1px solid',
      borderColor: c.borderDefault,
    }}>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: sw(brand), color: c.contentPrimary }}>
          Recent Activity
        </Typography>
      </Box>
      <TableContainer sx={{ borderRadius: 0, border: 'none' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ACTIVITY_DATA.map((row) => (
              <TableRow key={row.name + row.action}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.7rem', bgcolor: c.brand100, color: c.brand500 }}>{row.avatar}</Avatar>
                    <Typography variant="body2">{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: c.contentSecondary }}>{row.date}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={row.status} size="small" color={statusColor(row.status) as any} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

/* ─── Tasks Tab ─── */

const TASKS_DATA = [
  { task: 'Design checkout flow', assignee: 'Sarah Chen', avatar: 'SC', priority: 'High', due: 'Mar 15, 2026', status: 'In Progress' },
  { task: 'Update product API', assignee: 'Marcus Webb', avatar: 'MW', priority: 'High', due: 'Mar 14, 2026', status: 'In Progress' },
  { task: 'Write onboarding docs', assignee: 'Elena Rossi', avatar: 'ER', priority: 'Medium', due: 'Mar 18, 2026', status: 'To Do' },
  { task: 'Fix cart calculations', assignee: 'James Park', avatar: 'JP', priority: 'High', due: 'Mar 13, 2026', status: 'In Review' },
  { task: 'Add search filters', assignee: 'Aisha Patel', avatar: 'AP', priority: 'Medium', due: 'Mar 20, 2026', status: 'To Do' },
  { task: 'Optimize image loading', assignee: 'Sarah Chen', avatar: 'SC', priority: 'Low', due: 'Mar 22, 2026', status: 'To Do' },
  { task: 'Setup CI/CD pipeline', assignee: 'Marcus Webb', avatar: 'MW', priority: 'Medium', due: 'Mar 19, 2026', status: 'Completed' },
  { task: 'Audit accessibility', assignee: 'Elena Rossi', avatar: 'ER', priority: 'Low', due: 'Mar 25, 2026', status: 'To Do' },
];

function TasksTab({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const [filter, setFilter] = useState<string | string[]>('all');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filteredTasks = filter === 'all'
    ? TASKS_DATA
    : TASKS_DATA.filter(t => t.status === filter);

  const priorityColor = (p: string) => {
    if (p === 'High') return 'error';
    if (p === 'Medium') return 'warning';
    return 'info';
  };

  const statusColor = (s: string) => {
    if (s === 'Completed') return 'success';
    if (s === 'In Progress') return 'primary';
    if (s === 'In Review') return 'warning';
    return 'default';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Toolbar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <SearchField placeholder="Search tasks..." sx={{ width: 240 }} />
        <ToggleChipGroup value={filter} exclusive onChange={setFilter}>
          <ToggleChip value="all" label="All" count={TASKS_DATA.length} />
          <ToggleChip value="In Progress" label="In Progress" icon="pending" count={TASKS_DATA.filter(t => t.status === 'In Progress').length} />
          <ToggleChip value="Completed" label="Completed" icon="check_circle" count={TASKS_DATA.filter(t => t.status === 'Completed').length} />
        </ToggleChipGroup>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained" startIcon={<Icon name="add" size={20} />}>
          Add Task
        </Button>
      </Box>

      {/* Table */}
      <TableContainer sx={{
        bgcolor: c.bgElevated,
        borderRadius: 2,
        border: '1px solid',
        borderColor: c.borderDefault,
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.task}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: sw(brand) }}>{row.task}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.7rem', bgcolor: c.brand100, color: c.brand500 }}>{row.avatar}</Avatar>
                    <Typography variant="body2">{row.assignee}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={row.priority} size="small" color={priorityColor(row.priority) as any} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: c.contentSecondary }}>{row.due}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={row.status} size="small" color={statusColor(row.status) as any} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredTasks.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </TableContainer>
    </Box>
  );
}

/* ─── Components Tab ─── */

function ComponentsTab({ brand }: { brand: BrandTokens }) {
  const c = brand.colors;
  const { effects } = useBrand();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {CATEGORY_ORDER.map(cat => {
        const components = getComponentsByCategory(cat);
        if (components.length === 0) return null;
        return (
          <Box key={cat}>
            <Typography variant="caption" sx={{
              fontWeight: sw(brand), mb: 2, display: 'block', color: 'text.secondary',
              letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.65rem',
            }}>
              {CATEGORY_LABELS[cat]}
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}>
              {components.map(comp => (
                <Box
                  key={comp.id}
                  onClick={() => navigate(`/components/${comp.id}`)}
                  sx={{
                    bgcolor: c.bgElevated,
                    borderRadius: 2,
                    p: 2.5,
                    border: '1px solid',
                    borderColor: c.borderWeak,
                    boxShadow: effects.shadows.secondaryButton,
                    cursor: 'pointer',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    '&:hover': {
                      borderColor: c.brand300,
                      boxShadow: effects.shadows.secondaryButtonHover,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                      width: 36, height: 36, borderRadius: 1.5,
                      bgcolor: c.brand100,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon name={COMPONENT_ICONS[comp.id] ?? 'widgets'} size={18} color={c.brand400} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: sw(brand), color: c.contentPrimary }}>
                      {comp.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{
                    color: c.contentSecondary,
                    fontSize: '0.8rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.4em',
                  }}>
                    {comp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

/* ─── Main Home Page ─── */

export function HomePage() {
  const { brand } = useBrand();
  const c = brand.colors;
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2.5rem' }}>
        Design System
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 600 }}>
        A modern component library built on MUI with gradients, layered shadows, and a premium tactile feel.
      </Typography>

      {/* ─── Tab Bar ─── */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Dashboard" icon={<Icon name="dashboard" size={18} />} iconPosition="start" />
          <Tab label="Tasks" icon={<Icon name="task_alt" size={18} />} iconPosition="start" />
          <Tab label="Components" icon={<Icon name="widgets" size={18} />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* ─── Dashboard Tab ─── */}
      {tab === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Stat Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}>
            <StatCard icon="trending_up" value="2,847" label="Active users" change="+12.5%" brand={brand} />
            <StatCard icon="inventory_2" value="14.2k" label="Products" change="+3.1%" brand={brand} />
            <StatCard icon="payments" value="$48.2k" label="Revenue" change="+8.7%" brand={brand} />
            <StatCard icon="shopping_cart" value="1,423" label="Orders" change="+5.2%" brand={brand} />
          </Box>

          {/* Chart */}
          <ChartPlaceholder brand={brand} />

          {/* Recent Activity */}
          <ActivityTable brand={brand} />
        </Box>
      )}

      {/* ─── Tasks Tab ─── */}
      {tab === 1 && <TasksTab brand={brand} />}

      {/* ─── Components Tab ─── */}
      {tab === 2 && <ComponentsTab brand={brand} />}
    </Box>
  );
}
