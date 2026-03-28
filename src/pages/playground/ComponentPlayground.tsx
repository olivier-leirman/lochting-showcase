import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  TextField,
  Chip,
  Divider,
  alpha,
  Fab,
  Tooltip,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { COMPONENT_REGISTRY, type ComponentDoc } from '../../showcase/registry';
import { config } from '../../config';
import { AcceptToLibraryDialog } from './AcceptToLibraryDialog';

/* ── Canvas background presets ── */

const BG_STYLES = {
  light: { bgcolor: 'background.default' },
  dark: { bgcolor: '#1a1a2e' },
  checker: {
    backgroundImage: `linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
      linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
      linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)`,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  },
} as const;

type CanvasBg = keyof typeof BG_STYLES;

const BG_ICONS: Record<CanvasBg, string> = {
  light: 'light_mode',
  dark: 'dark_mode',
  checker: 'grid_on',
};

/* ── Helpers ── */

function groupByCategory(docs: ComponentDoc[]): Record<string, ComponentDoc[]> {
  const groups: Record<string, ComponentDoc[]> = {};
  for (const doc of docs) {
    (groups[doc.category] ??= []).push(doc);
  }
  return groups;
}

function buildPrompt(
  brandName: string,
  styleName: string | null,
  componentName: string | null,
  rules: typeof config.designRules.rules,
): string {
  const lines = [
    '# Component Variant Generation Prompt',
    '',
    `**Brand:** ${brandName}`,
    `**Style:** ${styleName ?? 'Brand default'}`,
    componentName ? `**Component:** ${componentName}` : '',
    '',
    '## Active Design Rules',
    ...rules.map(r => `- [${r.enforcement.toUpperCase()}] ${r.rule}`),
    '',
    '## Instructions',
    'Generate 3 visual variants of the component above that:',
    '1. Respect all design rules listed',
    '2. Stay within the active brand palette',
    '3. Explore different visual treatments while keeping functionality identical',
    '',
    'Return each variant as a standalone React component using MUI `sx` prop styling.',
  ];
  return lines.filter(l => l !== undefined).join('\n');
}

/* ── Component ── */

export function ComponentPlayground() {
  const navigate = useNavigate();
  const {
    platforms,
    currentPlatform,
    setPlatform,
    currentStyle,
    brand,
    availableStyleDefinitions,
    activeStyleDefinition,
    setStyleDefinition,
  } = useBrand();

  const [canvasBg, setCanvasBg] = useState<CanvasBg>('light');
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [assetPanelOpen, setAssetPanelOpen] = useState(false);
  const [variantPanelOpen, setVariantPanelOpen] = useState(false);
  const [assetSearch, setAssetSearch] = useState('');
  const [promptText, setPromptText] = useState('');
  const [showGeneratedPrompt, setShowGeneratedPrompt] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [acceptSnack, setAcceptSnack] = useState(false);

  /* Derived */
  const activeComponent = useMemo(
    () => COMPONENT_REGISTRY.find(c => c.id === activeComponentId) ?? null,
    [activeComponentId],
  );

  const filteredRegistry = useMemo(() => {
    if (!assetSearch.trim()) return COMPONENT_REGISTRY;
    const q = assetSearch.toLowerCase();
    return COMPONENT_REGISTRY.filter(
      c => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q),
    );
  }, [assetSearch]);

  const groupedComponents = useMemo(() => groupByCategory(filteredRegistry), [filteredRegistry]);

  const generatedPrompt = useMemo(
    () =>
      buildPrompt(
        brand.name,
        activeStyleDefinition?.name ?? currentStyle.label,
        activeComponent?.name ?? null,
        config.designRules.rules,
      ),
    [brand.name, activeStyleDefinition, currentStyle.label, activeComponent],
  );

  const cycleBg = () => {
    const keys: CanvasBg[] = ['light', 'dark', 'checker'];
    setCanvasBg(keys[(keys.indexOf(canvasBg) + 1) % keys.length]);
  };

  const handleSelectComponent = (id: string) => {
    setActiveComponentId(id);
    setAssetPanelOpen(false);
  };

  /* ── Render ── */

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* ── Floating Toolbar ── */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          py: 1.5,
          backdropFilter: 'blur(16px)',
          bgcolor: t => alpha(t.palette.background.paper, 0.8),
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {/* Back button */}
        <Tooltip title="Back to Library">
          <IconButton size="small" onClick={() => navigate('/components')}>
            <Icon name="arrow_back" size={20} />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Brand switcher */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {platforms.map(p => (
            <Button
              key={p.id}
              size="small"
              variant={currentPlatform.id === p.id ? 'contained' : 'outlined'}
              onClick={() => setPlatform(p.id)}
              sx={{
                textTransform: 'none',
                minWidth: 'auto',
                px: 1.5,
                py: 0.5,
                fontSize: '0.8125rem',
                borderRadius: 2,
              }}
            >
              {p.name}
            </Button>
          ))}
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Style switcher */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Tooltip title="Brand default">
            <Chip
              label="Default"
              size="small"
              variant={!activeStyleDefinition ? 'filled' : 'outlined'}
              color={!activeStyleDefinition ? 'primary' : 'default'}
              onClick={() => setStyleDefinition(null)}
              sx={{ fontSize: '0.75rem', height: 28 }}
            />
          </Tooltip>
          {availableStyleDefinitions.map(sd => (
            <Tooltip key={sd.id} title={sd.description ?? sd.name}>
              <Chip
                label={sd.name}
                size="small"
                variant={activeStyleDefinition?.id === sd.id ? 'filled' : 'outlined'}
                color={activeStyleDefinition?.id === sd.id ? 'primary' : 'default'}
                onClick={() => setStyleDefinition(sd.id)}
                sx={{ fontSize: '0.75rem', height: 28 }}
              />
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Canvas background toggle */}
        <Tooltip title={`Background: ${canvasBg}`}>
          <IconButton size="small" onClick={cycleBg}>
            <Icon name={BG_ICONS[canvasBg]} size={20} />
          </IconButton>
        </Tooltip>

        {/* Accept to Library */}
        {activeComponent && (
          <Tooltip title="Accept to Library">
            <Button
              size="small"
              variant="outlined"
              startIcon={<Icon name="library_add" size={18} />}
              onClick={() => setAcceptDialogOpen(true)}
              sx={{ textTransform: 'none', fontSize: '0.8125rem', borderRadius: 2, px: 1.5 }}
            >
              Accept
            </Button>
          </Tooltip>
        )}

        {/* Variant generator toggle */}
        <Tooltip title="Variant Generator">
          <IconButton
            size="small"
            onClick={() => setVariantPanelOpen(v => !v)}
            sx={{
              color: variantPanelOpen ? 'primary.main' : undefined,
            }}
          >
            <Icon name="auto_awesome" size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Canvas Area ── */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          transition: 'background 0.3s ease',
          ...BG_STYLES[canvasBg],
        }}
      >
        {/* FAB — Asset Loader toggle */}
        <Tooltip title="Add a component">
          <Fab
            color="primary"
            size="medium"
            onClick={() => setAssetPanelOpen(true)}
            sx={{ position: 'absolute', bottom: 32, left: 32, zIndex: 11 }}
          >
            <Icon name="add" size={24} />
          </Fab>
        </Tooltip>

        {/* Canvas content */}
        {activeComponent ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100%',
              p: 6,
            }}
          >
            <Chip
              label={activeComponent.name}
              size="small"
              color="primary"
              variant="outlined"
              onDelete={() => setActiveComponentId(null)}
              sx={{ mb: 3 }}
            />

            {/* Render first example if available */}
            {activeComponent.examples.length > 0 ? (
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: canvasBg === 'dark' ? alpha('#fff', 0.05) : alpha('#000', 0.02),
                  border: 1,
                  borderColor: canvasBg === 'dark' ? alpha('#fff', 0.1) : 'divider',
                  minWidth: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                {activeComponent.examples.map((ex, i) => (
                  <Box key={i} sx={{ width: '100%' }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: 'block' }}
                    >
                      {ex.name}
                    </Typography>
                    {ex.render()}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" variant="body2">
                No examples registered for this component yet.
              </Typography>
            )}
          </Box>
        ) : (
          /* Empty state */
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100%',
              gap: 2,
              opacity: 0.5,
              py: 16,
            }}
          >
            <Icon
              name="widgets"
              size={56}
              color={canvasBg === 'dark' ? '#ffffff' : undefined}
            />
            <Typography
              variant="h6"
              fontWeight={500}
              sx={{ color: canvasBg === 'dark' ? '#ffffff' : 'text.secondary' }}
            >
              Click + to add a component
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: canvasBg === 'dark' ? alpha('#fff', 0.6) : 'text.disabled' }}
            >
              Use the floating button at the bottom-left to browse the component registry.
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Left Panel: Asset Loader ── */}
      <Drawer
        anchor="left"
        open={assetPanelOpen}
        onClose={() => setAssetPanelOpen(false)}
        PaperProps={{
          sx: { width: 340, p: 0, borderRight: 1, borderColor: 'divider' },
        }}
      >
        <Box sx={{ p: 2.5, pb: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2 }}>
            Asset Loader
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search components..."
            value={assetSearch}
            onChange={e => setAssetSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="search" size={18} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />
        </Box>

        <Divider />

        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {Object.keys(groupedComponents).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6, opacity: 0.5 }}>
              <Icon name="inventory_2" size={40} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {COMPONENT_REGISTRY.length === 0
                  ? 'No components registered yet.'
                  : 'No results found.'}
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedComponents).map(([category, docs]) => (
              <Box key={category} sx={{ mb: 2.5 }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 0.5, letterSpacing: 1.2, fontSize: '0.65rem' }}
                >
                  {category.replace(/-/g, ' ')}
                </Typography>
                {docs.map(doc => (
                  <Button
                    key={doc.id}
                    fullWidth
                    onClick={() => handleSelectComponent(doc.id)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      px: 1.5,
                      py: 0.75,
                      mb: 0.25,
                      borderRadius: 2,
                      color: 'text.primary',
                      bgcolor:
                        activeComponentId === doc.id
                          ? t => alpha(t.palette.primary.main, 0.1)
                          : 'transparent',
                      '&:hover': {
                        bgcolor: t => alpha(t.palette.primary.main, 0.06),
                      },
                    }}
                  >
                    <Icon name="widgets" size={18} />
                    <Box sx={{ ml: 1, textAlign: 'left' }}>
                      <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.3 }}>
                        {doc.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: 'block',
                          lineHeight: 1.2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: 220,
                        }}
                      >
                        {doc.description}
                      </Typography>
                    </Box>
                  </Button>
                ))}
              </Box>
            ))
          )}
        </Box>
      </Drawer>

      {/* ── Right Panel: Variant Generator ── */}
      <Drawer
        anchor="right"
        open={variantPanelOpen}
        onClose={() => setVariantPanelOpen(false)}
        PaperProps={{
          sx: { width: 400, p: 0, borderLeft: 1, borderColor: 'divider' },
        }}
      >
        <Box sx={{ p: 2.5, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Icon name="auto_awesome" size={22} />
            <Typography variant="subtitle1" fontWeight={500}>
              Variant Generator
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            placeholder="Describe the variant you want to generate..."
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Icon name="code" size={18} />}
            onClick={() => setShowGeneratedPrompt(prev => !prev)}
            sx={{ textTransform: 'none', mb: 2 }}
          >
            {showGeneratedPrompt ? 'Hide' : 'Generate'} Context Prompt
          </Button>
        </Box>

        {showGeneratedPrompt && (
          <>
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" fontWeight={500} color="text.secondary">
                  Ready-to-paste prompt
                </Typography>
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    size="small"
                    onClick={() => {
                      const fullPrompt = promptText
                        ? `${generatedPrompt}\n\n## Additional Context\n${promptText}`
                        : generatedPrompt;
                      navigator.clipboard.writeText(fullPrompt);
                    }}
                  >
                    <Icon name="content_copy" size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: t => alpha(t.palette.text.primary, 0.04),
                  border: 1,
                  borderColor: 'divider',
                  maxHeight: 280,
                  overflow: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {promptText
                  ? `${generatedPrompt}\n\n## Additional Context\n${promptText}`
                  : generatedPrompt}
              </Box>
            </Box>
          </>
        )}

        <Divider />

        {/* Variants section */}
        <Box sx={{ p: 2.5, flex: 1, overflow: 'auto' }}>
          <Typography variant="caption" fontWeight={500} color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
            Variants
          </Typography>

          {[1, 2, 3].map(i => (
            <Box
              key={i}
              sx={{
                p: 2.5,
                mb: 1.5,
                borderRadius: 2,
                border: '1px dashed',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 80,
                opacity: 0.4,
              }}
            >
              <Icon name="style" size={24} />
              <Typography variant="caption" sx={{ mt: 0.5 }}>
                Variant {i}
              </Typography>
            </Box>
          ))}
        </Box>
      </Drawer>

      {/* Accept to Library dialog */}
      {activeComponent && (
        <AcceptToLibraryDialog
          open={acceptDialogOpen}
          onClose={() => setAcceptDialogOpen(false)}
          component={activeComponent}
          onAccepted={() => setAcceptSnack(true)}
        />
      )}

      {/* Success snackbar */}
      <Snackbar
        open={acceptSnack}
        autoHideDuration={4000}
        onClose={() => setAcceptSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setAcceptSnack(false)}>
          Component accepted to Library! View it in Experimental Components.
        </Alert>
      </Snackbar>
    </Box>
  );
}
