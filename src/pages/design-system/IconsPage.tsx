import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  Chip,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { config } from '../../config';

/* ── Icon grid data ── */
const ICON_NAMES = [
  'home', 'search', 'settings', 'person', 'favorite', 'star', 'edit', 'delete',
  'add', 'close', 'check', 'arrow_back', 'arrow_forward', 'menu', 'more_vert',
  'visibility', 'notifications', 'email', 'phone', 'calendar_today', 'schedule',
  'place', 'shopping_cart', 'payment', 'inventory', 'category', 'local_pharmacy',
  'medical_services', 'health_and_safety', 'science', 'palette', 'code',
  'bug_report', 'speed', 'tune', 'filter_list', 'sort', 'download', 'upload',
  'share', 'link',
];

/* ── Icon rules from design-rules config ── */
const ICON_RULES = config.designRules.rules.filter((r) => r.category.includes('ICON'));

export function IconsPage() {
  const [search, setSearch] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = useMemo(
    () => ICON_NAMES.filter((name) => name.includes(search.toLowerCase().replace(/\s+/g, '_'))),
    [search],
  );

  const handleCopyIcon = (name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 1500);
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2.5rem' }}>Icons</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Material Symbols icon library. All icons follow a consistent visual style across Medipim and Lochting.
      </Typography>

      {/* ══════════════════════════════════════════════════
          Section 1: Configuration
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="tune" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Default Configuration
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        All icons use Google Material Symbols with these defaults. Deviations must be registered as exceptions.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {[
          { label: 'Weight', value: '300', icon: 'line_weight' },
          { label: 'Style', value: 'Outlined', icon: 'check_box_outline_blank' },
          { label: 'Family', value: 'Rounded', icon: 'rounded_corner' },
        ].map((item) => (
          <Card
            key={item.label}
            variant="outlined"
            sx={{
              flex: '1 1 160px',
              maxWidth: 220,
              p: 2.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Icon name={item.icon} size={32} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {item.label}
            </Typography>
            <Chip label={item.value} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          p: 3,
          mb: 4,
          borderRadius: 3,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Icon name="local_pharmacy" size={28} />
          <Icon name="inventory" size={28} />
          <Icon name="shopping_cart" size={28} />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Example icons rendered with weight 300, outlined, rounded at 28px.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 2: Icon Browser
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="grid_view" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Icon Browser
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Common icons used across Medipim and Lochting. Click to copy the icon name.
      </Typography>

      <TextField
        placeholder="Search icons..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon name="search" size={20} color="text.secondary" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3, maxWidth: 360, width: '100%' }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 1.5,
          mb: 4,
        }}
      >
        {filteredIcons.map((name) => (
          <Card
            key={name}
            variant="outlined"
            onClick={() => handleCopyIcon(name)}
            sx={{
              p: 1.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                borderColor: 'primary.main',
              },
            }}
          >
            <Icon name={name} size={24} />
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.65rem',
                textAlign: 'center',
                lineHeight: 1.3,
                color: copiedIcon === name ? 'primary.main' : 'text.secondary',
                fontWeight: copiedIcon === name ? 700 : 400,
                wordBreak: 'break-all',
              }}
            >
              {copiedIcon === name ? 'Copied!' : name}
            </Typography>
          </Card>
        ))}
      </Box>

      {filteredIcons.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Icon name="search_off" size={40} color="text.disabled" />
          <Typography variant="body2" sx={{ mt: 1 }}>
            No icons match "{search}"
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 3: Exception Registry
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="rule" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Exception Registry
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        These components deviate from the default icon configuration for documented reasons.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {ICON_RULES.map((rule) => (
          <Card key={rule.id} variant="outlined">
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip
                  label={rule.enforcement}
                  size="small"
                  color={rule.enforcement === 'error' ? 'error' : 'warning'}
                  sx={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase' }}
                />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {rule.rule}
                </Typography>
              </Box>

              {rule.exceptions.length > 0 && (
                <Box
                  component="table"
                  sx={{
                    width: '100%',
                    mt: 1.5,
                    borderCollapse: 'collapse',
                    '& th, & td': {
                      textAlign: 'left',
                      py: 0.75,
                      px: 1.5,
                      fontSize: '0.8rem',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    },
                    '& th': {
                      fontWeight: 600,
                      color: 'text.secondary',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    },
                  }}
                >
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Override</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rule.exceptions.map((ex, i) => (
                      <tr key={i}>
                        <td><strong>{ex.component}</strong></td>
                        <td>
                          <Chip
                            label={ex.override}
                            size="small"
                            variant="outlined"
                            sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                          />
                        </td>
                        <td style={{ opacity: 0.7 }}>{ex.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              )}
            </Box>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 4: Do's and Don'ts
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="checklist" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Do's and Don'ts
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Quick reference for correct icon usage.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Do's */}
        <Card
          variant="outlined"
          sx={{
            flex: '1 1 320px',
            borderColor: 'success.main',
            borderWidth: 2,
          }}
        >
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Icon name="check_circle" size={20} filled color="success.main" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'success.main' }}>
                Do
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon name="settings" size={24} />
                <Typography variant="body2">Use weight 300 for all standard icons.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Icon name="home" size={24} />
                  <Icon name="search" size={24} />
                  <Icon name="person" size={24} />
                </Box>
                <Typography variant="body2">Keep consistent sizing within contexts.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon name="favorite" size={24} filled />
                <Typography variant="body2">Use filled variant only for active/selected states.</Typography>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* Don'ts */}
        <Card
          variant="outlined"
          sx={{
            flex: '1 1 320px',
            borderColor: 'error.main',
            borderWidth: 2,
          }}
        >
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Icon name="cancel" size={20} filled color="error.main" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'error.main' }}>
                Don't
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Icon name="settings" size={18} />
                  <Icon name="settings" size={28} />
                  <Icon name="settings" size={14} />
                </Box>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  Mix icon sizes randomly within the same context.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Icon name="home" size={24} filled />
                  <Icon name="search" size={24} />
                  <Icon name="person" size={24} filled />
                </Box>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  Mix filled and outlined icons in the same group.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon name="delete" size={24} color="error.main" />
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  Use weight 400 or sharp unless in the exception registry.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
