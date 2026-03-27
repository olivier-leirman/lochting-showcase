import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import type { ComponentDoc } from '../../showcase/registry';
import {
  createExperimentalComponent,
  type ExperimentalStatus,
} from '../../utils/experimental-components';

interface AcceptToLibraryDialogProps {
  open: boolean;
  onClose: () => void;
  component: ComponentDoc;
  onAccepted?: () => void;
}

const CATEGORIES = [
  { value: 'actions', label: 'Actions' },
  { value: 'inputs', label: 'Inputs' },
  { value: 'data-display', label: 'Data Display' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'surfaces', label: 'Surfaces' },
  { value: 'navigation', label: 'Navigation' },
] as const;

export function AcceptToLibraryDialog({
  open,
  onClose,
  component,
  onAccepted,
}: AcceptToLibraryDialogProps) {
  const { brandId, activeStyleDefinitionId, activeStyleDefinition, currentStyle } = useBrand();

  const [name, setName] = useState(component.name);
  const [description, setDescription] = useState(component.description);
  const [category, setCategory] = useState(component.category);
  const [status, setStatus] = useState<ExperimentalStatus>('draft');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleAccept = () => {
    createExperimentalComponent({
      name,
      description,
      category,
      status,
      sourceComponentId: component.id,
      brandId,
      styleDefinitionId: activeStyleDefinitionId,
      notes: note.trim() ? [note.trim()] : [],
      tags,
    });
    onAccepted?.();
    onClose();
  };

  const styleName = activeStyleDefinition?.name ?? currentStyle.label;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="library_add" size={20} />
        </Box>
        Accept to Library
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '8px !important' }}>
        <Typography variant="body2" color="text.secondary">
          Promote <strong>{component.name}</strong> from the Playground to the Library as an
          experimental component. You can review and refine it before publishing.
        </Typography>

        {/* Context chip row */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            icon={<Icon name="palette" size={16} />}
            label={brandId}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Icon name="style" size={16} />}
            label={styleName}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Icon name="widgets" size={16} />}
            label={component.id}
            size="small"
            variant="outlined"
          />
        </Box>

        {/* Name & description */}
        <TextField
          label="Component Name"
          fullWidth
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          size="small"
          multiline
          minRows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Category & Status */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value as typeof category)}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as ExperimentalStatus)}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="review">Ready for Review</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Notes */}
        <TextField
          label="Notes (optional)"
          fullWidth
          size="small"
          multiline
          minRows={2}
          placeholder="Design decisions, observations, things to refine..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* Tags */}
        <Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              label="Tags"
              size="small"
              fullWidth
              placeholder="Press Enter to add"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button variant="outlined" size="small" onClick={handleAddTag} sx={{ minWidth: 'auto', px: 2 }}>
              <Icon name="add" size={18} />
            </Button>
          </Box>
          {tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => setTags(tags.filter((t) => t !== tag))}
                />
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleAccept}
          variant="contained"
          startIcon={<Icon name="library_add" size={18} />}
          disabled={!name.trim()}
        >
          Accept to Library
        </Button>
      </DialogActions>
    </Dialog>
  );
}
