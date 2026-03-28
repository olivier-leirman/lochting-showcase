import {
  Box,
  Typography,
  Divider,
  Button,
  alpha,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Icon } from '../../components/Icon';
import { StyleSwitcher } from '../../components/StyleSwitcher';
import { useBrand } from '../../theme/brand-context';
import { createBrandTheme } from '../../theme/create-brand-theme';
import { ALL_STYLES } from '../../styles';

export function StyleVariantsPage() {
  const { platforms, colorMode, activeStyleDefinitionId } = useBrand();

  // Flatten all brand style variants from platforms
  const allBrands = platforms.flatMap((p) =>
    p.styles.map((s) => ({ platformName: p.name, ...s })),
  );

  return (
    <Box sx={{ p: 4, maxWidth: 1200 }}>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Icon name="style" size={28} color="inherit" />
          <Typography variant="h4" fontWeight={500}>
            Style Variants
          </Typography>
        </Box>
        <Typography color="text.secondary">
          Explore visual treatment styles across all brands. Each style defines surface treatments,
          border radii, shadow character, and component styling independently from brand colors.
        </Typography>
      </Box>

      {/* Section 1: Global Style Override */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" fontWeight={500} sx={{ mb: 0.5 }}>
          Global Style Override
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Select a style to override the brand's built-in profile globally.
          Choose "Brand Default" to revert.
        </Typography>
        <StyleSwitcher />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section 2: Brand x Style Matrix */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Icon name="grid_view" size={22} color="inherit" />
          <Typography variant="h5" fontWeight={500}>
            Brand &times; Style Matrix
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Every brand paired with every style definition. The highlighted cell indicates the
          currently active combination.
        </Typography>

        {/* Matrix table */}
        <Box
          sx={{
            overflowX: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              '& th, & td': {
                p: 1.5,
                borderBottom: '1px solid',
                borderRight: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
                verticalAlign: 'middle',
                '&:last-child': { borderRight: 'none' },
              },
              '& thead th': {
                bgcolor: 'background.default',
                fontWeight: 500,
                fontSize: 13,
                whiteSpace: 'nowrap',
              },
              '& tbody tr:last-child td': { borderBottom: 'none' },
            }}
          >
            <thead>
              <tr>
                <Box component="th" sx={{ width: 140, textAlign: 'left !important' }}>
                  <Typography variant="caption" fontWeight={500}>
                    Style / Brand
                  </Typography>
                </Box>
                {allBrands.map((brand) => (
                  <th key={brand.id}>
                    <Typography variant="caption" fontWeight={500}>
                      {brand.platformName}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ fontSize: 11 }}
                    >
                      {brand.label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Brand Default row */}
              <tr>
                <Box component="td" sx={{ textAlign: 'left !important', bgcolor: 'background.default' }}>
                  <Typography variant="body2" fontWeight={500}>
                    Brand Default
                  </Typography>
                </Box>
                {allBrands.map((brand) => {
                  const isActive = activeStyleDefinitionId === null;
                  const { theme } = createBrandTheme(brand.tokens, colorMode);
                  return (
                    <td key={`default-${brand.id}`}>
                      <ThemeProvider theme={theme}>
                        <MatrixCell isActive={isActive} />
                      </ThemeProvider>
                    </td>
                  );
                })}
              </tr>

              {/* Style definition rows */}
              {ALL_STYLES.map((style) => (
                <tr key={style.id}>
                  <Box
                    component="td"
                    sx={{ textAlign: 'left !important', bgcolor: 'background.default' }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {style.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: 11, display: 'block' }}
                    >
                      r:{style.borderRadius.md}px &middot; s:{style.shadows.intensity}
                    </Typography>
                  </Box>
                  {allBrands.map((brand) => {
                    const isActive = activeStyleDefinitionId === style.id;
                    const { theme } = createBrandTheme(brand.tokens, colorMode, style);
                    return (
                      <td key={`${style.id}-${brand.id}`}>
                        <ThemeProvider theme={theme}>
                          <MatrixCell isActive={isActive} />
                        </ThemeProvider>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/* ── Matrix cell with mini button ── */

function MatrixCell({ isActive }: { isActive: boolean }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        p: 0.5,
        borderRadius: 1,
        bgcolor: isActive ? (t) => alpha(t.palette.primary.main, 0.08) : 'transparent',
        border: isActive ? '1.5px solid' : '1.5px solid transparent',
        borderColor: isActive ? 'primary.main' : 'transparent',
      }}
    >
      <Button
        variant="contained"
        size="small"
        disableRipple
        sx={{
          minWidth: 0,
          px: 1.5,
          py: 0.5,
          fontSize: 11,
          pointerEvents: 'none',
        }}
      >
        Button
      </Button>
    </Box>
  );
}
