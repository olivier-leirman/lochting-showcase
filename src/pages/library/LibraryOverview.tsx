import { useState, useMemo } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, Chip, TextField, InputAdornment, ToggleButton, ToggleButtonGroup, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUnifiedRegistry, type UnifiedComponent } from '../../showcase/registry';
import { Icon } from '../../components/Icon';
import { ToggleChip, ToggleChipGroup } from '../../components/ToggleChip';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'actions', label: 'Actions' },
  { key: 'inputs', label: 'Inputs' },
  { key: 'data-display', label: 'Data Display' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'surfaces', label: 'Surfaces' },
  { key: 'navigation', label: 'Navigation' },
] as const;

type LayerFilter = 'both' | 'mui' | 'base';

const LAYER_FILTERS: { key: LayerFilter; label: string }[] = [
  { key: 'both', label: 'Both' },
  { key: 'mui', label: 'MUI' },
  { key: 'base', label: 'Base UI' },
];

const CATEGORY_ICONS: Record<string, string> = {
  actions: 'touch_app',
  inputs: 'input',
  'data-display': 'table_chart',
  feedback: 'feedback',
  surfaces: 'layers',
  navigation: 'menu',
};

function formatCategory(category: string): string {
  return category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getLayerLabel(comp: UnifiedComponent): string {
  if (comp.layers.length === 2) return 'Both';
  return comp.layers[0] === 'base' ? 'Base UI' : 'MUI';
}

function getLayerColor(comp: UnifiedComponent): 'primary' | 'secondary' | 'success' {
  if (comp.layers.length === 2) return 'success';
  return comp.layers[0] === 'base' ? 'secondary' : 'primary';
}

function ComponentCard({ comp }: { comp: UnifiedComponent }) {
  const navigate = useNavigate();
  // Get first example from the preferred implementation (MUI first, then Base)
  const doc = comp.implementations.mui ?? comp.implementations.base;
  const firstExample = doc?.examples[0];

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: 'border-color 0.2s ease-out, box-shadow 0.2s ease-out',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/components/${comp.id}`)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        {/* Mini preview area */}
        <Box
          sx={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
            borderBottom: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            px: 2,
            '& > *': {
              transform: 'scale(0.85)',
              pointerEvents: 'none',
            },
          }}
        >
          {firstExample ? (
            <Box sx={{ maxWidth: '100%', maxHeight: '100%' }}>
              {firstExample.render()}
            </Box>
          ) : (
            <Icon name={CATEGORY_ICONS[comp.category] ?? 'widgets'} size={40} />
          )}
        </Box>

        {/* Info area */}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={500} noWrap>
              {comp.name}
            </Typography>
            <Chip
              label={getLayerLabel(comp)}
              size="small"
              color={getLayerColor(comp)}
              variant="outlined"
              sx={{ fontSize: '0.625rem', height: 20, '& .MuiChip-label': { px: 0.75 } }}
            />
          </Box>
          <Chip
            icon={<Icon name={CATEGORY_ICONS[comp.category] ?? 'widgets'} size={14} />}
            label={formatCategory(comp.category)}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: 'flex-start', fontSize: '0.6875rem', height: 24 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 'auto',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.75rem',
              lineHeight: 1.5,
            }}
          >
            {comp.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function LibraryOverview() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [layerFilter, setLayerFilter] = useState<LayerFilter>('both');

  const unified = useMemo(() => getUnifiedRegistry(), []);

  const filtered = useMemo(() => {
    let items = [...unified];

    // Category filter
    if (category !== 'all') {
      items = items.filter(c => c.category === category);
    }

    // Layer filter — 'both' shows all, 'mui'/'base' filters to that layer
    if (layerFilter === 'mui') {
      items = items.filter(c => c.layers.includes('mui'));
    } else if (layerFilter === 'base') {
      items = items.filter(c => c.layers.includes('base'));
    }

    // Search filter
    const q = search.toLowerCase().trim();
    if (q) {
      items = items.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [search, category, layerFilter, unified]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: unified.length };
    for (const comp of unified) {
      map[comp.category] = (map[comp.category] ?? 0) + 1;
    }
    return map;
  }, [unified]);

  const layerCounts = useMemo(() => {
    const map: Record<string, number> = { both: unified.length, mui: 0, base: 0 };
    for (const comp of unified) {
      if (comp.layers.includes('mui')) map.mui++;
      if (comp.layers.includes('base')) map.base++;
    }
    return map;
  }, [unified]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="h4" fontWeight={500}>
            Component Library
          </Typography>
          <ToggleButtonGroup
            value={layerFilter}
            exclusive
            onChange={(_, val) => val && setLayerFilter(val)}
            size="medium"
          >
            {LAYER_FILTERS.map(f => (
              <ToggleButton key={f.key} value={f.key} sx={{ textTransform: 'none', px: 2, gap: 0.5 }}>
                {f.label}
                <Typography component="span" sx={{ fontSize: '0.6875rem', color: 'text.disabled', ml: 0.5 }}>
                  {layerCounts[f.key] ?? 0}
                </Typography>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Browse {unified.length} components across {CATEGORIES.length - 1} categories.
          Each component supports brand switching and style variants.
        </Typography>
      </Box>

      {/* Filter bar */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder="Search components..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="search" size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
        <ToggleChipGroup value={category} exclusive onChange={(val) => setCategory(val as string)}>
          {CATEGORIES.map(cat => (
            <ToggleChip
              key={cat.key}
              value={cat.key}
              label={cat.label}
              count={counts[cat.key] ?? 0}
            />
          ))}
        </ToggleChipGroup>
      </Box>

      {/* Component grid */}
      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Icon name="search_off" size={48} />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No components found matching "{search}"
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 3,
          }}
        >
          {filtered.map(comp => (
            <ComponentCard key={comp.id} comp={comp} />
          ))}
        </Box>
      )}
    </Box>
  );
}
