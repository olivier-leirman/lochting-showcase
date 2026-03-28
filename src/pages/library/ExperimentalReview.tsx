import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  alpha,
  Divider,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { getComponent } from '../../showcase/registry';
import {
  loadExperimentalComponents,
  saveExperimentalComponent,
  deleteExperimentalComponent,
  type ExperimentalComponent,
  type ExperimentalStatus,
} from '../../utils/experimental-components';

const STATUS_CONFIG: Record<ExperimentalStatus, { label: string; color: 'default' | 'warning' | 'success'; icon: string }> = {
  draft: { label: 'Draft', color: 'default', icon: 'edit_note' },
  review: { label: 'In Review', color: 'warning', icon: 'rate_review' },
  accepted: { label: 'Accepted', color: 'success', icon: 'check_circle' },
};

function ExperimentalCard({
  experiment,
  onUpdate,
  onDelete,
}: {
  experiment: ExperimentalComponent;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}) {
  const { brand } = useBrand();
  const c = brand.colors;
  const sourceComponent = getComponent(experiment.sourceComponentId);
  const statusConfig = STATUS_CONFIG[experiment.status];
  const [editingNote, setEditingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleStatusChange = (newStatus: ExperimentalStatus) => {
    experiment.status = newStatus;
    saveExperimentalComponent(experiment);
    onUpdate();
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      experiment.notes.push(newNote.trim());
      saveExperimentalComponent(experiment);
      setNewNote('');
      setEditingNote(false);
      onUpdate();
    }
  };

  const handleDeleteNote = (idx: number) => {
    experiment.notes.splice(idx, 1);
    saveExperimentalComponent(experiment);
    onUpdate();
  };

  const timeSince = (date: string) => {
    const now = Date.now();
    const then = new Date(date).getTime();
    const hours = Math.floor((now - then) / 3600000);
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Card
      variant="outlined"
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              {experiment.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
              {experiment.description}
            </Typography>
          </Box>
          <Tooltip title="Delete experiment">
            <IconButton size="small" onClick={() => onDelete(experiment.id)}>
              <Icon name="delete" size={18} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Meta chips */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          <Chip
            icon={<Icon name={statusConfig.icon} size={14} />}
            label={statusConfig.label}
            size="small"
            color={statusConfig.color}
          />
          {sourceComponent && (
            <Chip
              icon={<Icon name="widgets" size={14} />}
              label={sourceComponent.name}
              size="small"
              variant="outlined"
            />
          )}
          <Chip
            icon={<Icon name="palette" size={14} />}
            label={experiment.brandId}
            size="small"
            variant="outlined"
          />
          {experiment.styleDefinitionId && (
            <Chip
              icon={<Icon name="style" size={14} />}
              label={experiment.styleDefinitionId}
              size="small"
              variant="outlined"
            />
          )}
          <Typography variant="caption" color="text.disabled" sx={{ ml: 'auto', alignSelf: 'center' }}>
            {timeSince(experiment.createdAt)}
          </Typography>
        </Box>

        {/* Tags */}
        {experiment.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {experiment.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.65rem', height: 22 }} />
            ))}
          </Box>
        )}

        {/* Notes */}
        {(experiment.notes.length > 0 || editingNote) && (
          <>
            <Divider />
            <Box>
              <Typography variant="caption" fontWeight={500} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Notes
              </Typography>
              {experiment.notes.map((note, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: 0.75,
                    p: 1,
                    borderRadius: 1,
                    bgcolor: (t) => alpha(t.palette.text.primary, 0.03),
                  }}
                >
                  <Typography variant="body2" sx={{ flex: 1, fontSize: '0.8125rem' }}>
                    {note}
                  </Typography>
                  <IconButton size="small" onClick={() => handleDeleteNote(idx)}>
                    <Icon name="close" size={14} />
                  </IconButton>
                </Box>
              ))}
              {editingNote && (
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Add a note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); handleAddNote(); }
                      if (e.key === 'Escape') setEditingNote(false);
                    }}
                    autoFocus
                  />
                  <Button size="small" variant="contained" onClick={handleAddNote} sx={{ minWidth: 'auto', px: 1.5 }}>
                    <Icon name="add" size={18} />
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pt: 0.5 }}>
          <ToggleButtonGroup
            value={experiment.status}
            exclusive
            onChange={(_, val) => val && handleStatusChange(val)}
            size="small"
          >
            <ToggleButton value="draft" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>
              Draft
            </ToggleButton>
            <ToggleButton value="review" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>
              Review
            </ToggleButton>
            <ToggleButton value="accepted" sx={{ textTransform: 'none', px: 1.5, fontSize: '0.75rem' }}>
              Accepted
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ flex: 1 }} />

          <Tooltip title="Add note">
            <IconButton size="small" onClick={() => setEditingNote(true)}>
              <Icon name="note_add" size={18} />
            </IconButton>
          </Tooltip>

          {sourceComponent && (
            <Tooltip title="View in Library">
              <Button
                size="small"
                variant="text"
                startIcon={<Icon name="open_in_new" size={16} />}
                href={`/components/${sourceComponent.id}`}
                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
              >
                View Source
              </Button>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export function ExperimentalReview() {
  const [version, setVersion] = useState(0);
  const [filter, setFilter] = useState<ExperimentalStatus | 'all'>('all');
  const [snack, setSnack] = useState<string | null>(null);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const experiments = loadExperimentalComponents();
  void version; // trigger re-render

  const filtered = filter === 'all' ? experiments : experiments.filter((e) => e.status === filter);

  const counts = {
    all: experiments.length,
    draft: experiments.filter((e) => e.status === 'draft').length,
    review: experiments.filter((e) => e.status === 'review').length,
    accepted: experiments.filter((e) => e.status === 'accepted').length,
  };

  const handleDelete = (id: string) => {
    deleteExperimentalComponent(id);
    setSnack('Experiment deleted');
    refresh();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Icon name="science" size={28} />
          <Typography variant="h4" fontWeight={500}>
            Experimental Components
          </Typography>
        </Box>
        <Typography color="text.secondary">
          Components promoted from the Playground. Review, refine, and accept them into the production library.
        </Typography>
      </Box>

      {/* Filter bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, val) => val && setFilter(val)}
          size="small"
        >
          <ToggleButton value="all" sx={{ textTransform: 'none', px: 2 }}>
            All <Chip label={counts.all} size="small" sx={{ ml: 0.75, height: 20, fontSize: '0.65rem' }} />
          </ToggleButton>
          <ToggleButton value="draft" sx={{ textTransform: 'none', px: 2 }}>
            Drafts <Chip label={counts.draft} size="small" sx={{ ml: 0.75, height: 20, fontSize: '0.65rem' }} />
          </ToggleButton>
          <ToggleButton value="review" sx={{ textTransform: 'none', px: 2 }}>
            In Review <Chip label={counts.review} size="small" sx={{ ml: 0.75, height: 20, fontSize: '0.65rem' }} />
          </ToggleButton>
          <ToggleButton value="accepted" sx={{ textTransform: 'none', px: 2 }}>
            Accepted <Chip label={counts.accepted} size="small" sx={{ ml: 0.75, height: 20, fontSize: '0.65rem' }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Cards */}
      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Icon name="science" size={56} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
            {experiments.length === 0
              ? 'No experiments yet'
              : 'No experiments match this filter'}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 420, mx: 'auto' }}>
            {experiments.length === 0
              ? 'Open the Component Playground, explore a component with different brands and styles, then click "Accept to Library" to promote it here.'
              : 'Try selecting a different status filter above.'}
          </Typography>
          {experiments.length === 0 && (
            <Button
              variant="contained"
              startIcon={<Icon name="science" size={18} />}
              href="/playground/component"
              sx={{ mt: 3, textTransform: 'none' }}
            >
              Open Playground
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map((experiment) => (
            <ExperimentalCard
              key={experiment.id}
              experiment={experiment}
              onUpdate={refresh}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      )}

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnack(null)}>
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
