import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Badge,
  Divider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  alpha,
} from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { Icon } from '../../../components/Icon';
import { useBrand } from '../../../theme/brand-context';
import { useMedipimProducts, useMedipimCategories } from '../../../data/hooks';
import { useLochtingOrders, useLochtingCustomers, useLochtingNotifications } from '../../../data/hooks';

interface CaseStudy {
  id: string;
  platform: 'medipim' | 'lochting';
  title: string;
  description: string;
  render: () => React.ReactNode;
}

/* ── Medipim Case Studies ── */

function MedipimProductTable() {
  const products = useMedipimProducts().slice(0, 5);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Product Catalog</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField size="small" placeholder="Search products..." slotProps={{ input: { startAdornment: <Icon name="search" size={18} /> } }} sx={{ width: 240 }} />
          <Button variant="contained" startIcon={<Icon name="add" size={18} />}>Add Product</Button>
        </Box>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>CNK</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.75rem' }}>
                      {p.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>{p.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{p.supplier}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{p.cnk}</Typography></TableCell>
                <TableCell><Chip label={p.category} size="small" variant="outlined" /></TableCell>
                <TableCell align="right"><Typography variant="body2">&euro;{p.price.toFixed(2)}</Typography></TableCell>
                <TableCell align="right">
                  <Typography variant="body2" color={p.stock < 20 ? 'error.main' : 'text.primary'} fontWeight={p.stock < 20 ? 500 : 400}>
                    {p.stock}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={p.requiresPrescription ? 'Rx' : 'OTC'}
                    size="small"
                    color={p.requiresPrescription ? 'warning' : 'success'}
                    sx={{ fontSize: '0.6875rem', height: 22 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small"><Icon name="more_vert" size={18} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function MedipimProductForm() {
  const categories = useMedipimCategories();
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Edit Product</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <TextField label="Product Name" defaultValue="Dafalgan 1g" fullWidth />
        <TextField label="CNK Code" defaultValue="0012345" fullWidth />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select defaultValue={categories[0]?.id ?? ''} label="Category">
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Price" type="number" defaultValue="8.50" fullWidth slotProps={{ input: { startAdornment: <Typography color="text.secondary" sx={{ mr: 0.5 }}>&euro;</Typography> } }} />
        <TextField label="Stock" type="number" defaultValue="142" fullWidth />
        <TextField label="Supplier" defaultValue="Bristol-Myers Squibb" fullWidth />
        <Box sx={{ gridColumn: '1 / -1' }}>
          <TextField label="Description" multiline rows={3} defaultValue="Paracetamol 1g tabletten. Pijnstillend en koortsverlagend." fullWidth />
        </Box>
        <Box sx={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Active" />
          <FormControlLabel control={<Switch />} label="Requires Prescription" />
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" startIcon={<Icon name="save" size={18} />}>Save Product</Button>
      </Box>
    </Box>
  );
}

function MedipimCategoryCards() {
  const categories = useMedipimCategories();
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Categories</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        {categories.map((c) => (
          <Card key={c.id} variant="outlined">
            <CardContent sx={{ pb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Avatar sx={{ bgcolor: (t) => alpha(t.palette.primary.main, 0.1), color: 'primary.main', width: 40, height: 40 }}>
                  <Icon name={c.icon} size={22} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={500}>{c.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{c.productCount} products</Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 1.5 }}>
              <Button size="small">View Products</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

/* ── Lochting Case Studies ── */

function LochtingOrderDashboard() {
  const orders = useLochtingOrders().slice(0, 5);
  const statusColor: Record<string, 'default' | 'warning' | 'info' | 'success' | 'error'> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Recent Orders</Typography>
        <ToggleButtonGroup size="small" exclusive value="all">
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
          <ToggleButton value="shipped">Shipped</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {orders.map((o) => (
        <Box key={o.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Avatar sx={{ bgcolor: (t) => alpha(t.palette.primary.main, 0.1), color: 'primary.main', width: 36, height: 36 }}>
            <Icon name="receipt_long" size={20} />
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={500}>{o.orderNumber}</Typography>
              <Chip label={o.status} size="small" color={statusColor[o.status] ?? 'default'} sx={{ fontSize: '0.6875rem', height: 22 }} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {o.pharmacyName} &middot; {o.items.length} items
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={500}>&euro;{o.total.toFixed(2)}</Typography>
          <Tooltip title="View order">
            <IconButton size="small"><Icon name="chevron_right" size={18} /></IconButton>
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
}

function LochtingCustomerList() {
  const customers = useLochtingCustomers().slice(0, 4);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Pharmacy Customers</Typography>
        <Button size="small" startIcon={<Icon name="person_add" size={18} />}>Add Customer</Button>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 2 }}>
        {customers.map((c) => (
          <Card key={c.id} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.875rem' }}>
                  {c.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={500}>{c.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{c.pharmacyName}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Orders</Typography>
                  <Typography variant="body2" fontWeight={500}>{c.totalOrders}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Total Spent</Typography>
                  <Typography variant="body2" fontWeight={500}>&euro;{c.totalSpent.toFixed(0)}</Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 1.5 }}>
              <Button size="small">View Profile</Button>
              <Button size="small">Orders</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

function LochtingNotificationCenter() {
  const notifications = useLochtingNotifications();
  const typeIcon: Record<string, string> = {
    order: 'shopping_cart',
    stock: 'inventory',
    system: 'settings',
    promotion: 'campaign',
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="h6">Notifications</Typography>
          <Badge badgeContent={notifications.filter((n) => !n.read).length} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6875rem' } }}>
            <Icon name="notifications" size={20} />
          </Badge>
        </Box>
        <Button size="small">Mark all read</Button>
      </Box>
      {notifications.slice(0, 5).map((n) => (
        <Box
          key={n.id}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            py: 1.5,
            px: 1.5,
            borderRadius: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: n.read ? 'transparent' : (t) => alpha(t.palette.primary.main, 0.04),
          }}
        >
          <Avatar sx={{ bgcolor: (t) => alpha(t.palette.primary.main, 0.1), color: 'primary.main', width: 32, height: 32 }}>
            <Icon name={typeIcon[n.type] ?? n.icon} size={18} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" fontWeight={n.read ? 400 : 500}>{n.title}</Typography>
            <Typography variant="caption" color="text.secondary">{n.message}</Typography>
          </Box>
          {!n.read && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mt: 0.75, flexShrink: 0 }} />}
        </Box>
      ))}
    </Box>
  );
}

/* ── Shared Case Study: Stock Health ── */

function StockHealthOverview() {
  const products = useMedipimProducts();
  const low = products.filter((p) => p.stock < 20);
  const healthy = products.filter((p) => p.stock >= 50);
  const total = products.length;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Stock Health</Typography>
      <Alert severity={low.length > 2 ? 'warning' : 'success'} sx={{ mb: 2 }}>
        {low.length} of {total} products are running low on stock
      </Alert>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 2 }}>
        {[
          { label: 'Critical', count: low.length, color: 'error.main' },
          { label: 'Medium', count: total - low.length - healthy.length, color: 'warning.main' },
          { label: 'Healthy', count: healthy.length, color: 'success.main' },
        ].map((s) => (
          <Card key={s.label} variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" fontWeight={500} color={s.color}>{s.count}</Typography>
              <Typography variant="caption" color="text.secondary">{s.label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box>
        {low.map((p) => (
          <Box key={p.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }}>{p.name}</Typography>
            <Typography variant="body2" color="error.main" fontWeight={500}>{p.stock} left</Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min((p.stock / 100) * 100, 100)}
              color="error"
              sx={{ width: 100, height: 6, borderRadius: 3 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ── Main ── */

function buildCaseStudies(componentCategory: string): CaseStudy[] {
  const studies: CaseStudy[] = [];

  // Always add platform-relevant studies based on component category
  if (['data-display', 'surfaces', 'actions'].includes(componentCategory)) {
    studies.push(
      { id: 'mp-table', platform: 'medipim', title: 'Product Catalog', description: 'Medipim PIM product table with search, filtering, and actions', render: () => <MedipimProductTable /> },
      { id: 'lo-orders', platform: 'lochting', title: 'Order Dashboard', description: 'Lochting pharmacy order overview with status filtering', render: () => <LochtingOrderDashboard /> },
    );
  }

  if (['inputs', 'actions'].includes(componentCategory)) {
    studies.push(
      { id: 'mp-form', platform: 'medipim', title: 'Product Editor', description: 'Medipim product editing form with validation', render: () => <MedipimProductForm /> },
    );
  }

  if (['surfaces', 'data-display', 'navigation'].includes(componentCategory)) {
    studies.push(
      { id: 'mp-categories', platform: 'medipim', title: 'Category Overview', description: 'Medipim category cards with product counts', render: () => <MedipimCategoryCards /> },
      { id: 'lo-customers', platform: 'lochting', title: 'Customer Cards', description: 'Lochting pharmacy customer profiles', render: () => <LochtingCustomerList /> },
    );
  }

  if (['feedback', 'data-display', 'navigation'].includes(componentCategory)) {
    studies.push(
      { id: 'lo-notifications', platform: 'lochting', title: 'Notification Center', description: 'Lochting notification feed with read/unread states', render: () => <LochtingNotificationCenter /> },
      { id: 'stock-health', platform: 'medipim', title: 'Stock Health', description: 'Cross-platform inventory monitoring dashboard', render: () => <StockHealthOverview /> },
    );
  }

  // Fallback: always show at least some studies
  if (studies.length === 0) {
    studies.push(
      { id: 'mp-table', platform: 'medipim', title: 'Product Catalog', description: 'Medipim PIM product table', render: () => <MedipimProductTable /> },
      { id: 'lo-orders', platform: 'lochting', title: 'Order Dashboard', description: 'Lochting pharmacy orders', render: () => <LochtingOrderDashboard /> },
    );
  }

  return studies;
}

export function InContextTab({ doc }: { doc: ComponentDoc }) {
  const { platformId } = useBrand();
  const studies = buildCaseStudies(doc.category);
  const [activePlatform, setActivePlatform] = useState<'all' | 'medipim' | 'lochting'>(
    platformId === 'medipim' ? 'medipim' : platformId === 'lochting' ? 'lochting' : 'all',
  );

  const filtered = activePlatform === 'all' ? studies : studies.filter((s) => s.platform === activePlatform);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={500}>
            Real-World Context
          </Typography>
          <Typography variant="body2" color="text.secondary">
            See how {doc.name} components work in actual Medipim &amp; Lochting interfaces
          </Typography>
        </Box>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={activePlatform}
          onChange={(_, v) => v && setActivePlatform(v)}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="medipim">Medipim</ToggleButton>
          <ToggleButton value="lochting">Lochting</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Case Study Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {filtered.map((study) => (
          <Card key={study.id} variant="outlined">
            <Box
              sx={{
                px: 2.5,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Chip
                label={study.platform === 'medipim' ? 'Medipim' : 'Lochting'}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontSize: '0.6875rem', height: 22 }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight={500}>{study.title}</Typography>
                <Typography variant="caption" color="text.secondary">{study.description}</Typography>
              </Box>
            </Box>
            <CardContent sx={{ p: 3 }}>
              {study.render()}
            </CardContent>
          </Card>
        ))}
      </Box>

      {filtered.length === 0 && (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Icon name="search_off" size={40} />
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            No case studies available for this platform filter.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
