import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Skeleton,
  CircularProgress,
  Divider,
  alpha,
} from '@mui/material';
import { Icon } from '../../components/Icon';
import { config } from '../../config';

/* ── Descriptions for each action level ── */
const ACTION_DESCRIPTIONS: Record<string, string> = {
  primary: 'Main call-to-action. Use for the single most important action on the screen.',
  secondary: 'Supporting action. Use alongside or as alternative to the primary action.',
  tertiary: 'Low-emphasis action. Use for optional or less important actions.',
  destructive: 'Irreversible or dangerous action. Use for delete, remove, or cancel operations.',
};

/* ── State descriptions & icons ── */
const STATE_META: Record<string, { icon: string; description: string }> = {
  hover: { icon: 'mouse', description: 'Background opacity shift on pointer enter.' },
  active: { icon: 'touch_app', description: 'Subtle scale-down to indicate press.' },
  focus: { icon: 'center_focus_strong', description: '2px ring in brand color for keyboard navigation.' },
  disabled: { icon: 'block', description: 'Reduced opacity (0.4) — no pointer events.' },
  loading: { icon: 'hourglass_empty', description: 'Spinner overlay, disabled interaction.' },
};

export function PatternsPage() {
  const { actionHierarchy, states, loading } = config.patterns;
  const [loadingDemo, setLoadingDemo] = useState(false);

  const handleLoadingDemo = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 1, fontSize: '2.5rem' }}>Patterns</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Reusable UI patterns and component compositions. These patterns ensure visual and
        behavioural consistency across Medipim and Lochting.
      </Typography>

      {/* ══════════════════════════════════════════════════
          Section 1: Action Hierarchy
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="touch_app" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Action Hierarchy
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Every screen should have a clear visual hierarchy of actions. Use these four levels consistently.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        {Object.entries(actionHierarchy).map(([level, pattern]) => (
          <Card
            key={level}
            variant="outlined"
            sx={{
              flex: '1 1 200px',
              minWidth: 200,
              maxWidth: 280,
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3 }}>
              <Button
                variant={pattern.variant as 'contained' | 'outlined' | 'text'}
                color={pattern.color as 'primary' | 'error'}
                sx={{ textTransform: 'capitalize', minWidth: 140 }}
              >
                {level} Action
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Chip
                  label={`${pattern.variant} / ${pattern.color}`}
                  size="small"
                  sx={{ mb: 1, fontFamily: 'monospace', fontSize: '0.75rem' }}
                />
                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', lineHeight: 1.5 }}>
                  {ACTION_DESCRIPTIONS[level]}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 2: States
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="toggle_on" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        States
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Interactive elements must communicate their current state clearly. Each state uses a specific visual treatment.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
          mb: 4,
        }}
      >
        {Object.entries(states).map(([state, token]) => (
          <Card
            key={state}
            variant="outlined"
            sx={{
              overflow: 'visible',
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 3 }}>
              <Icon name={STATE_META[state]?.icon ?? 'info'} size={20} color="text.secondary" />
              {/* Visual example button per state */}
              {state === 'hover' && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.85),
                    pointerEvents: 'none',
                  }}
                >
                  Hovered
                </Button>
              )}
              {state === 'active' && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ transform: 'scale(0.97)', pointerEvents: 'none' }}
                >
                  Pressed
                </Button>
              )}
              {state === 'focus' && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                    pointerEvents: 'none',
                  }}
                >
                  Focused
                </Button>
              )}
              {state === 'disabled' && (
                <Button variant="contained" size="small" disabled>
                  Disabled
                </Button>
              )}
              {state === 'loading' && (
                <Button
                  variant="contained"
                  size="small"
                  disabled
                  sx={{ pointerEvents: 'none', position: 'relative' }}
                >
                  <CircularProgress size={16} sx={{ color: 'inherit', mr: 1 }} />
                  Loading
                </Button>
              )}

              <Typography
                variant="subtitle2"
                sx={{ textTransform: 'capitalize', fontWeight: 700, mt: 0.5 }}
              >
                {state}
              </Typography>
              <Chip
                label={token}
                size="small"
                sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
              />
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.4 }}
              >
                {STATE_META[state]?.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ══════════════════════════════════════════════════
          Section 3: Loading Patterns
         ══════════════════════════════════════════════════ */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        <Icon name="hourglass_empty" size={20} sx={{ mr: 1, verticalAlign: 'text-bottom' }} />
        Loading Patterns
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Use the right loading indicator for the context: skeletons for content areas, spinners for actions.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Content loading = skeleton */}
        <Card variant="outlined" sx={{ flex: '1 1 320px', maxWidth: 480 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip label={loading.content} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Content Loading
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Use skeleton placeholders for content areas (cards, lists, text blocks) to preserve layout during load.
            </Typography>
            {/* Demo: skeleton card */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={16} />
                </Box>
              </Box>
              <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1, mb: 1 }} />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="75%" />
            </Box>
          </CardContent>
        </Card>

        {/* Action loading = spinner */}
        <Card variant="outlined" sx={{ flex: '1 1 320px', maxWidth: 480 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip label={loading.actions} size="small" color="primary" variant="outlined" sx={{ fontFamily: 'monospace' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Action Loading
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Use a spinner inside (or replacing) the button label for actions like submit, save, or delete.
            </Typography>
            {/* Demo: spinner button */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                disabled={loadingDemo}
                onClick={handleLoadingDemo}
                startIcon={loadingDemo ? <CircularProgress size={16} color="inherit" /> : <Icon name="save" size={18} />}
              >
                {loadingDemo ? 'Saving...' : 'Save Changes'}
              </Button>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {loadingDemo ? 'Spinner replaces icon during action' : 'Click to see loading state'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
