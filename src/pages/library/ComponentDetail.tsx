import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, Chip } from '@mui/material';
import { getComponent } from '../../showcase/registry';
import { Icon } from '../../components/Icon';
import { PreviewTab } from './tabs/PreviewTab';
import { DocsTab } from './tabs/DocsTab';
import { ExamplesTab } from './tabs/ExamplesTab';
import { CodeTab } from './tabs/CodeTab';
import { StylesTab } from './tabs/StylesTab';

const TAB_KEYS = ['preview', 'docs', 'examples', 'code', 'styles'] as const;
type TabKey = typeof TAB_KEYS[number];

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'preview', label: 'Preview', icon: 'visibility' },
  { key: 'docs', label: 'Documentation', icon: 'description' },
  { key: 'examples', label: 'Examples', icon: 'view_carousel' },
  { key: 'code', label: 'Code', icon: 'code' },
  { key: 'styles', label: 'Styles', icon: 'palette' },
];

function formatCategory(category: string): string {
  return category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const doc = getComponent(id ?? '');

  const activeTab = useMemo(() => {
    const param = searchParams.get('tab') as TabKey | null;
    return TAB_KEYS.includes(param as TabKey) ? (param as TabKey) : 'preview';
  }, [searchParams]);

  const tabIndex = TAB_KEYS.indexOf(activeTab);

  const handleTabChange = (_: unknown, newIndex: number) => {
    const key = TAB_KEYS[newIndex];
    setSearchParams(key === 'preview' ? {} : { tab: key });
  };

  if (!doc) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Icon name="error_outline" size={48} />
        <Typography variant="h5" sx={{ mt: 2 }}>Component not found</Typography>
        <Typography color="text.secondary">No component registered with id "{id}"</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Typography variant="h4" fontWeight={700}>
            {doc.name}
          </Typography>
          <Chip
            label="MUI"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.6875rem', height: 22 }}
          />
          <Chip
            label={formatCategory(doc.category)}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontSize: '0.6875rem', height: 22 }}
          />
        </Box>
        <Typography color="text.secondary">
          {doc.description}
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 3,
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            minHeight: 44,
            gap: 0.75,
          },
        }}
      >
        {TABS.map(t => (
          <Tab
            key={t.key}
            icon={<Icon name={t.icon} size={18} />}
            iconPosition="start"
            label={t.label}
          />
        ))}
      </Tabs>

      {/* Tab content */}
      <Box>
        {activeTab === 'preview' && <PreviewTab doc={doc} />}
        {activeTab === 'docs' && <DocsTab doc={doc} />}
        {activeTab === 'examples' && <ExamplesTab doc={doc} />}
        {activeTab === 'code' && <CodeTab doc={doc} />}
        {activeTab === 'styles' && <StylesTab doc={doc} />}
      </Box>
    </Box>
  );
}
