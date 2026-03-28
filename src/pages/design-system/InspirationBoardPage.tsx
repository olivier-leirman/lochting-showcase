import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  Divider,
  alpha,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { STYLES_BY_ID } from '../../styles';
import {
  loadBoard,
  saveBoard,
  addImages,
  removeImage,
  fileToBoardImage,
  urlToBoardImage,
  type InspirationBoard,
  type BoardImage,
} from '../../inspiration/board-store';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export function InspirationBoardPage() {
  const { style } = useParams();
  const navigate = useNavigate();
  const { brand, effects } = useBrand();
  const c = brand.colors;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const styleId = style ?? 'flat';
  const styleDef = STYLES_BY_ID[styleId];
  const styleName = styleDef?.name ?? style ?? 'Unknown';

  // ── State ──
  const [board, setBoard] = useState<InspirationBoard>(() => loadBoard(styleId));
  const [dragOver, setDragOver] = useState(false);
  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingMeta, setEditingMeta] = useState(false);
  const [metaName, setMetaName] = useState(board.name);
  const [metaDesc, setMetaDesc] = useState(board.description);

  // Reload board when style changes
  useEffect(() => {
    const b = loadBoard(styleId);
    setBoard(b);
    setMetaName(b.name);
    setMetaDesc(b.description);
  }, [styleId]);

  // ── Handlers ──
  const processFiles = useCallback(
    async (files: File[]) => {
      const valid = files.filter(
        (f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_SIZE,
      );
      if (valid.length === 0) return;
      setLoading(true);
      try {
        const images = await Promise.all(valid.map(fileToBoardImage));
        const updated = addImages(styleId, images);
        setBoard(updated);
      } finally {
        setLoading(false);
      }
    },
    [styleId],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (const item of Array.from(items)) {
        if (item.kind === 'file' && ACCEPTED_TYPES.includes(item.type)) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        e.preventDefault();
        processFiles(files);
      }
    },
    [processFiles],
  );

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    processFiles(files);
    e.target.value = '';
  };

  const handleUrlImport = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    try {
      const img = await urlToBoardImage(urlInput.trim());
      const updated = addImages(styleId, [img]);
      setBoard(updated);
      setUrlInput('');
      setUrlDialogOpen(false);
    } catch {
      // Silently fail — could add snackbar later
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (imageId: string) => {
    const updated = removeImage(styleId, imageId);
    setBoard(updated);
  };

  const handleSaveMeta = () => {
    const updated = { ...board, name: metaName, description: metaDesc };
    saveBoard(updated);
    setBoard(updated);
    setEditingMeta(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            Inspiration Board — {styleName}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, maxWidth: 600 }}>
            Collect visual references and mood images that define the{' '}
            <strong>{styleName}</strong> direction. These feed the AI style extraction pipeline.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Icon name="auto_awesome" size={18} />}
          onClick={() => navigate(style ? `/theme/styles/creator/${style}` : '/theme/styles/creator')}
        >
          Generate Style
        </Button>
      </Box>

      {/* Board metadata */}
      <Card variant="outlined" sx={{ mb: 4, p: 3 }}>
        {editingMeta ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Board Name"
              size="small"
              value={metaName}
              onChange={(e) => setMetaName(e.target.value)}
              placeholder={`${styleName} Inspiration`}
            />
            <TextField
              label="Description"
              size="small"
              multiline
              rows={2}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              placeholder="Visual direction notes, mood keywords, references..."
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="contained" onClick={handleSaveMeta}>
                Save
              </Button>
              <Button size="small" onClick={() => setEditingMeta(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="body1" fontWeight={500}>
                {board.name || `${styleName} Inspiration`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {board.description || 'Add a description for this board...'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={`${board.images.length} image${board.images.length !== 1 ? 's' : ''}`}
                size="small"
                icon={<Icon name="photo_library" size={16} />}
              />
              <IconButton size="small" onClick={() => setEditingMeta(true)}>
                <Icon name="edit" size={18} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Card>

      {/* Upload zone */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        multiple
        hidden
        onChange={handleFileInput}
      />
      <Box
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          border: '2px dashed',
          borderColor: dragOver ? c.brand400 : c.borderDefault,
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
          bgcolor: dragOver ? alpha(c.brand100, 0.5) : alpha(c.brand100, 0.2),
          transition: 'border-color 0.2s, background 0.2s',
          cursor: 'pointer',
          '&:hover': {
            borderColor: c.brand300,
            bgcolor: alpha(c.brand100, 0.4),
          },
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: c.brand100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1.5,
          }}
        >
          <Icon name={loading ? 'hourglass_empty' : 'cloud_upload'} size={24} color={c.brand500} />
        </Box>
        <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
          {loading ? 'Processing...' : 'Drag & drop images, paste from clipboard, or click to browse'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG, JPG, WebP up to 10 MB
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Icon name="link" size={16} />}
          onClick={(e) => {
            e.stopPropagation();
            setUrlDialogOpen(true);
          }}
        >
          Import from URL
        </Button>
      </Box>

      {/* URL import dialog */}
      <Dialog open={urlDialogOpen} onClose={() => setUrlDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Import Image from URL</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            placeholder="https://example.com/image.png"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUrlImport()}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUrlDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUrlImport} disabled={!urlInput.trim() || loading}>
            {loading ? 'Importing...' : 'Import'}
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ mb: 4 }} />

      {/* Image gallery */}
      <Typography variant="h6" fontWeight={500} sx={{ mb: 0.5 }}>
        Image Gallery
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {board.images.length === 0
          ? 'No images yet. Upload some visual references to get started.'
          : `${board.images.length} reference${board.images.length !== 1 ? 's' : ''} collected for this style direction.`}
      </Typography>

      {board.images.length > 0 ? (
        <Box
          sx={{
            columnCount: { xs: 1, sm: 2, md: 3 },
            columnGap: 2,
            mb: 5,
          }}
        >
          {board.images.map((img) => (
            <ImageCard
              key={img.id}
              image={img}
              onRemove={handleRemoveImage}
              borderColor={c.borderWeak}
              hoverBorder={c.brand300}
              shadow={effects.shadows.secondaryButton}
              hoverShadow={effects.shadows.secondaryButtonHover}
            />
          ))}
        </Box>
      ) : (
        <Card
          variant="outlined"
          sx={{ textAlign: 'center', py: 6, mb: 5 }}
        >
          <Icon name="add_photo_alternate" size={48} color={c.contentTertiary} />
          <Typography variant="body1" fontWeight={500} sx={{ mt: 2, color: c.contentSecondary }}>
            Start building your inspiration board
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Drag images here, paste from clipboard, or use the upload zone above.
          </Typography>
        </Card>
      )}

      <Divider sx={{ mb: 4 }} />

      {/* Style Direction */}
      <Typography variant="h6" fontWeight={500} sx={{ mb: 0.5 }}>
        Style Direction
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {styleDef
          ? 'Preview of the style definition linked to this board.'
          : 'No style direction yet. Upload images and generate with AI to create one.'}
      </Typography>

      {styleDef ? (
        <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" fontWeight={500} sx={{ mb: 1.5 }}>
            {styleDef.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {styleDef.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {[
              { label: 'Surface', value: styleDef.surface.blur > 0 ? 'Glass / Blur' : 'Solid' },
              { label: 'Radius', value: `${styleDef.borderRadius.sm}/${styleDef.borderRadius.md}/${styleDef.borderRadius.lg}px` },
              { label: 'Shadows', value: styleDef.shadows.intensity },
              { label: 'Button', value: styleDef.buttonPrimary },
              { label: 'Card', value: styleDef.cardTreatment },
              { label: 'Input', value: styleDef.inputTreatment },
            ].map((item) => (
              <Chip
                key={item.label}
                label={`${item.label}: ${item.value}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>

          <Box
            sx={{
              bgcolor: alpha(c.brand100, 0.4),
              borderRadius: 2,
              p: 2,
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: c.contentSecondary,
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}
          >
{`// Style Properties
{
  borderRadius: { sm: ${styleDef.borderRadius.sm}, md: ${styleDef.borderRadius.md}, lg: ${styleDef.borderRadius.lg} },
  buttonPrimary: "${styleDef.buttonPrimary}",
  cardTreatment: "${styleDef.cardTreatment}",
  inputTreatment: "${styleDef.inputTreatment}",
  shadows: { intensity: "${styleDef.shadows.intensity}", brandTinted: ${styleDef.shadows.brandTinted} }
}`}
          </Box>
        </Card>
      ) : (
        <Card variant="outlined" sx={{ textAlign: 'center', py: 5, mb: 3 }}>
          <Icon name="description" size={40} color={c.contentTertiary} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            Generate a style direction from your inspiration images using AI.
          </Typography>
        </Card>
      )}

      <Button
        variant="contained"
        startIcon={<Icon name="auto_awesome" size={18} />}
        onClick={() => navigate(style ? `/theme/styles/creator/${style}` : '/theme/styles/creator')}
      >
        Generate with AI
      </Button>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Analyzes uploaded images using AI vision to extract visual patterns, then generates a
        complete style direction with concrete theme values.
      </Typography>
    </Box>
  );
}

/* ── Image Card ── */

function ImageCard({
  image,
  onRemove,
  borderColor,
  hoverBorder,
  shadow,
  hoverShadow,
}: {
  image: BoardImage;
  onRemove: (id: string) => void;
  borderColor: string;
  hoverBorder: string;
  shadow: string;
  hoverShadow: string;
}) {
  return (
    <Card
      sx={{
        breakInside: 'avoid',
        mb: 2,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor,
        boxShadow: shadow,
        position: 'relative',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: hoverShadow,
          borderColor: hoverBorder,
          '& .img-overlay': { opacity: 1 },
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={image.dataUrl}
          alt={image.name}
          sx={{
            width: '100%',
            display: 'block',
          }}
        />
        <Box
          className="img-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.4)',
            opacity: 0,
            transition: 'opacity 0.2s',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            p: 1,
          }}
        >
          <Tooltip title="Remove image">
            <IconButton
              size="small"
              onClick={() => onRemove(image.id)}
              sx={{ color: '#fff', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' } }}
            >
              <Icon name="close" size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, py: 1 }}>
        <Typography variant="caption" color="text.secondary" noWrap>
          {image.name}
        </Typography>
      </Box>
    </Card>
  );
}
