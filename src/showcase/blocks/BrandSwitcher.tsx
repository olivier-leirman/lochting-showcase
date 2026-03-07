import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useBrand } from '../../theme/brand-context';

export function BrandSwitcher() {
  const { brandId, setBrand, availableBrands } = useBrand();

  return (
    <ToggleButtonGroup
      value={brandId}
      exclusive
      onChange={(_, val) => val && setBrand(val)}
      size="small"
    >
      {availableBrands.map(b => (
        <ToggleButton key={b.id} value={b.id} sx={{ px: 2, py: 0.5, fontSize: '0.8rem' }}>
          {b.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
