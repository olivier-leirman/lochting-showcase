import { Box, Typography, Card, Chip, Button, Tooltip, alpha } from '@mui/material';
import { Icon } from './Icon';
import { useBrand } from '../theme/brand-context';
import type { StyleDefinition } from '../styles';

export function StyleSwitcher() {
  const {
    availableStyleDefinitions,
    activeStyleDefinitionId,
    setStyleDefinition,
    styleProfile,
  } = useBrand();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
        gap: 2,
      }}
    >
      {/* Brand Default card */}
      <StyleCard
        name="Brand Default"
        description={`Uses the brand's built-in style profile: ${styleProfile.label}`}
        isActive={activeStyleDefinitionId === null}
        onClick={() => setStyleDefinition(null)}
        radius={styleProfile.radius.md}
        shadowIntensity={styleProfile.shadows.intensity}
        hasBlur={styleProfile.surface.blur > 0}
      />

      {/* Style Definition cards */}
      {availableStyleDefinitions.map((style) => (
        <StyleCard
          key={style.id}
          name={style.name}
          description={style.description}
          isActive={activeStyleDefinitionId === style.id}
          onClick={() => setStyleDefinition(style.id)}
          radius={style.borderRadius.md}
          shadowIntensity={style.shadows.intensity}
          hasBlur={style.surface.blur > 0}
          style={style}
        />
      ))}
    </Box>
  );
}

/* ── Internal card component ── */

interface StyleCardProps {
  name: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  radius: number;
  shadowIntensity: number;
  hasBlur: boolean;
  style?: StyleDefinition;
}

function StyleCard({
  name,
  description,
  isActive,
  onClick,
  radius,
  shadowIntensity,
  hasBlur,
}: StyleCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: isActive ? 'primary.main' : 'divider',
        bgcolor: isActive
          ? (theme) => alpha(theme.palette.primary.main, 0.04)
          : 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: isActive ? 'primary.main' : 'text.disabled',
          transform: 'translateY(-1px)',
        },
      }}
    >
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" sx={{ fontSize: '1rem' }}>
          {name}
        </Typography>
        {isActive && (
          <Chip
            label="Active"
            size="small"
            color="primary"
            icon={<Icon name="check_circle" size={16} filled />}
            sx={{ height: 24, '& .MuiChip-label': { px: 1 } }}
          />
        )}
      </Box>

      {/* Description */}
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, minHeight: 32 }}>
        {description}
      </Typography>

      {/* Mini preview elements */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/* Mini button preview */}
        <Tooltip title={`Radius: ${radius}px`} arrow>
          <Button
            variant="contained"
            size="small"
            disableRipple
            sx={{
              minWidth: 0,
              px: 1.5,
              py: 0.5,
              fontSize: 11,
              borderRadius: `${radius}px`,
              pointerEvents: 'none',
              boxShadow: shadowIntensity > 0 ? 1 : 0,
            }}
          >
            Btn
          </Button>
        </Tooltip>

        {/* Mini card outline preview */}
        <Tooltip title={hasBlur ? 'Glass surface' : `Shadow intensity: ${shadowIntensity}`} arrow>
          <Box
            sx={{
              width: 40,
              height: 28,
              borderRadius: `${radius}px`,
              border: '1.5px solid',
              borderColor: 'divider',
              bgcolor: hasBlur
                ? (theme) => alpha(theme.palette.background.paper, 0.6)
                : 'background.paper',
              backdropFilter: hasBlur ? 'blur(4px)' : 'none',
              boxShadow: shadowIntensity > 1
                ? 2
                : shadowIntensity > 0
                  ? 1
                  : 0,
            }}
          />
        </Tooltip>

        {/* Mini text field outline preview */}
        <Tooltip title="Input preview" arrow>
          <Box
            sx={{
              width: 48,
              height: 28,
              borderRadius: `${Math.min(radius, 8)}px`,
              border: '1.5px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
              display: 'flex',
              alignItems: 'center',
              px: 0.5,
            }}
          >
            <Box
              sx={{
                width: '60%',
                height: 2,
                borderRadius: 1,
                bgcolor: 'text.disabled',
              }}
            />
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
}
