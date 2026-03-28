import { useMemo } from 'react';
import { ThemeProvider, Box, Typography, Chip, Button, alpha } from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { useBrand } from '../../../theme/brand-context';
import { createBrandTheme } from '../../../theme/create-brand-theme';
import { ALL_STYLES, type StyleDefinition } from '../../../styles';

export function StylesTab({ doc }: { doc: ComponentDoc }) {
  const { sourceBrand, colorMode, activeStyleDefinitionId, setStyleDefinition } = useBrand();

  const firstExample = doc.examples[0];

  // Pre-build themes for each style definition
  const styleThemes = useMemo(
    () =>
      ALL_STYLES.map((style) => ({
        style,
        theme: createBrandTheme(sourceBrand, colorMode, style).theme,
      })),
    [sourceBrand, colorMode],
  );

  if (!firstExample) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No examples available for {doc.name}.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 3,
      }}
    >
      {styleThemes.map(({ style, theme }) => {
        const isActive = activeStyleDefinitionId === style.id;

        return (
          <Box
            key={style.id}
            sx={{
              border: '1px solid',
              borderColor: isActive ? 'primary.main' : 'divider',
              borderWidth: isActive ? 2 : 1,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: isActive
                ? (t) => `0 0 0 3px ${alpha(t.palette.primary.main, 0.12)}`
                : 'none',
            }}
          >
            {/* Card header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                px: 2,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  {style.name}
                </Typography>
                <Chip
                  label={style.description}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.6875rem', height: 22, maxWidth: 160 }}
                />
                {isActive && (
                  <Chip
                    label="Active"
                    size="small"
                    color="primary"
                    sx={{ fontSize: '0.6875rem', height: 22 }}
                  />
                )}
              </Box>
            </Box>

            {/* Card body — live component preview wrapped in per-style ThemeProvider */}
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 160,
                  bgcolor: 'background.default',
                }}
              >
                {firstExample.render()}
              </Box>
            </ThemeProvider>

            {/* Card footer — set as active button */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                size="small"
                variant={isActive ? 'outlined' : 'text'}
                disabled={isActive}
                onClick={() => setStyleDefinition(style.id)}
                sx={{ textTransform: 'none', fontSize: '0.75rem' }}
              >
                {isActive ? 'Currently Active' : 'Set as Active'}
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
