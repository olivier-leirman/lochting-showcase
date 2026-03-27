import { Box, ToggleButton, ToggleButtonGroup, Typography, Chip, alpha } from '@mui/material';
import { useBrand } from '../../theme/brand-context';

/**
 * Two-level brand switcher:
 *  Top row  → Platform (Lochting / Medipim)
 *  Bottom row → Style variants within the active platform
 */
export function BrandSwitcher() {
  const {
    platforms,
    platformId,
    setPlatform,
    currentPlatform,
    styleId,
    setStyle,
  } = useBrand();

  const hasMultipleStyles = currentPlatform.styles.length > 1;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Platform toggle */}
      <ToggleButtonGroup
        value={platformId}
        exclusive
        onChange={(_, val) => val && setPlatform(val)}
        size="small"
      >
        {platforms.map(p => (
          <ToggleButton key={p.id} value={p.id} sx={{ px: 2, py: 0.5, fontSize: '0.8rem' }}>
            {p.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Style variants — only show when platform has multiple styles */}
      {hasMultipleStyles && (
        <>
          <Typography variant="caption" sx={{ color: 'text.disabled', mx: 0.5 }}>/</Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {currentPlatform.styles.map(s => (
              <Chip
                key={s.id}
                label={s.label}
                size="small"
                variant={s.id === styleId ? 'filled' : 'outlined'}
                color={s.id === styleId ? 'primary' : 'default'}
                onClick={() => setStyle(s.id)}
                sx={{
                  fontSize: '0.75rem',
                  height: 26,
                  cursor: 'pointer',
                  ...(s.id === styleId
                    ? {}
                    : {
                        '&:hover': {
                          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        },
                      }),
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
