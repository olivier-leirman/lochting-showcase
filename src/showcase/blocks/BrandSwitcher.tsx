import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useBrand } from '../../theme/brand-context';

export function BrandSwitcher() {
  const { brandId, setBrand, availableBrands } = useBrand();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        Brand
      </Typography>
      <ToggleButtonGroup
        value={brandId}
        exclusive
        onChange={(_, val) => val && setBrand(val)}
        size="small"
        sx={{ '& .MuiToggleButtonGroup-root': { p: 0.5 } }}
      >
        {availableBrands.map(b => (
          <ToggleButton key={b.id} value={b.id} sx={{ px: 2, py: 0.5, fontSize: '0.8rem' }}>
            {b.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
