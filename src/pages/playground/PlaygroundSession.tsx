import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { getSession, deleteSession } from '../../utils/playground-sessions';
import { COMPONENT_REGISTRY } from '../../showcase/registry';

export function PlaygroundSession() {
  const { session: sessionId } = useParams();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const session = sessionId ? getSession(sessionId) : null;

  if (!session) {
    return (
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 8,
        }}
      >
        <Icon name="error_outline" size={48} color="text.secondary" />
        <Typography variant="h5" fontWeight={500}>
          Session not found
        </Typography>
        <Typography color="text.secondary">
          The session "{sessionId}" does not exist or has been deleted.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Icon name="arrow_back" size={20} />}
          onClick={() => navigate('/playground/component')}
          sx={{ mt: 2 }}
        >
          Back to Playground
        </Button>
      </Box>
    );
  }

  const activeComponent = session.activeComponentId
    ? COMPONENT_REGISTRY.find((c) => c.id === session.activeComponentId)
    : null;

  const formattedDate = new Date(session.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteSession(session.id);
    navigate('/playground/component');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 960, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={500}>
            {session.name}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {formattedDate}
          </Typography>
        </Box>
        <Button
          variant="text"
          startIcon={<Icon name="arrow_back" size={20} />}
          onClick={() => navigate('/playground/component')}
        >
          All Sessions
        </Button>
      </Box>

      {/* Description */}
      {session.description && (
        <Typography sx={{ mb: 3 }} color="text.secondary">
          {session.description}
        </Typography>
      )}

      {/* Brand & Style chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip
          icon={<Icon name="palette" size={18} />}
          label={`Brand: ${session.brandId}`}
          variant="outlined"
          size="small"
        />
        {session.styleId && (
          <Chip
            icon={<Icon name="style" size={18} />}
            label={`Style: ${session.styleId}`}
            variant="outlined"
            size="small"
          />
        )}
        {session.activeComponentId && (
          <Chip
            icon={<Icon name="widgets" size={18} />}
            label={`Component: ${session.activeComponentId}`}
            variant="outlined"
            size="small"
          />
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Active component preview */}
      {activeComponent && (
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Active Component
            </Typography>
            <Typography variant="h6" fontWeight={500} gutterBottom>
              {activeComponent.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {activeComponent.description}
            </Typography>
            {activeComponent.examples.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {activeComponent.examples[0].render()}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Variant Notes */}
      {session.variantNotes.length > 0 && (
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Variant Notes
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {session.variantNotes.map((note, i) => (
                <Box component="li" key={i} sx={{ mb: 0.5 }}>
                  <Typography variant="body2">{note}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<Icon name="play_arrow" size={20} />}
          onClick={() => navigate(`/playground/component?resume=${session.id}`)}
        >
          Continue in Playground
        </Button>
        <Button
          variant={confirmDelete ? 'contained' : 'outlined'}
          color="error"
          startIcon={<Icon name="delete" size={20} />}
          onClick={handleDelete}
        >
          {confirmDelete ? 'Confirm Delete' : 'Delete Session'}
        </Button>
        {confirmDelete && (
          <Button variant="text" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}
