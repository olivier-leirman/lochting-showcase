import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useBrand } from '../../theme/brand-context';
import { ToggleChip, ToggleChipGroup } from '../../components/ToggleChip';

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
          <ToggleChipGroup value={styleId} exclusive onChange={(val) => setStyle(val as string)}>
            {currentPlatform.styles.map(s => (
              <ToggleChip
                key={s.id}
                value={s.id}
                label={s.label}
              />
            ))}
          </ToggleChipGroup>
        </>
      )}
    </Box>
  );
}
