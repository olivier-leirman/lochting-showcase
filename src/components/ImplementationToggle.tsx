import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import type { ImplementationLayer } from '../showcase/registry';

export type ImplementationView = ImplementationLayer | 'both';

interface ImplementationToggleProps {
  value: ImplementationView;
  onChange: (view: ImplementationView) => void;
  /** Only show if both layers exist */
  availableLayers: ImplementationLayer[];
}

export function ImplementationToggle({ value, onChange, availableLayers }: ImplementationToggleProps) {
  // Don't render if only one implementation exists
  if (availableLayers.length < 2) return null;

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, val) => val && onChange(val as ImplementationView)}
      size="small"
    >
      <ToggleButton value="mui" sx={{ textTransform: 'none', px: 2, gap: 0.5 }}>
        <Typography component="span" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
          MUI Core
        </Typography>
      </ToggleButton>
      <ToggleButton value="base" sx={{ textTransform: 'none', px: 2, gap: 0.5 }}>
        <Typography component="span" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
          Base UI
        </Typography>
      </ToggleButton>
      <ToggleButton value="both" sx={{ textTransform: 'none', px: 2, gap: 0.5 }}>
        <Typography component="span" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
          Both
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
