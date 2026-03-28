import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import { getComponent, getUnifiedComponent, type ComponentDoc } from '../../showcase/registry';
import { ImplementationToggle, type ImplementationView } from '../../components/ImplementationToggle';
import { PreviewCodeTabs } from '../../showcase/blocks/PreviewCodeTabs';
import { CodeBlock } from '../../showcase/blocks/CodeBlock';
import { useBrand } from '../../theme/brand-context';

function ComponentSection({ doc, label }: { doc: ComponentDoc; label?: string }) {
  const { brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;

  return (
    <Box>
      {label && (
        <Typography
          variant="overline"
          sx={{ display: 'block', mb: 2, fontWeight: 500, letterSpacing: '0.08em', color: 'text.secondary' }}
        >
          {label}
        </Typography>
      )}

      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        {doc.description}
      </Typography>
      <CodeBlock code={doc.importStatement} language="tsx" />

      <Divider sx={{ my: 4 }} />

      {/* Examples */}
      {doc.examples.map((ex, i) => (
        <Box key={i} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>
            {ex.name}
          </Typography>
          <PreviewCodeTabs preview={ex.render()} code={ex.code} />
        </Box>
      ))}

      {/* Props Table */}
      {doc.props.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>
            API Reference
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: sw }}>Prop</TableCell>
                  <TableCell sx={{ fontWeight: sw }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: sw }}>Default</TableCell>
                  <TableCell sx={{ fontWeight: sw }}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doc.props.map(p => (
                  <TableRow key={p.name}>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'primary.main' }}>{p.name}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.type}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.default ?? '—'}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{p.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export function ComponentPage() {
  const { id } = useParams<{ id: string }>();
  const [implView, setImplView] = useState<ImplementationView>('mui');

  // Try unified first, fall back to raw registry
  const unified = getUnifiedComponent(id ?? '');
  const rawDoc = getComponent(id ?? '');

  // Determine what to show
  const doc = unified
    ? (unified.implementations[implView === 'both' ? 'mui' : implView] ?? unified.implementations.mui ?? unified.implementations.base)
    : rawDoc;

  if (!doc && !unified) {
    return <Typography>Component not found: {id}</Typography>;
  }

  const displayName = unified?.name ?? doc?.name ?? id;
  const hasBothLayers = unified ? unified.layers.length === 2 : false;

  return (
    <Box>
      {/* Header with Implementation Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Typography variant="h1" sx={{ fontSize: '2.5rem' }}>
          {displayName}
        </Typography>
        {hasBothLayers && unified && (
          <ImplementationToggle
            value={implView}
            onChange={setImplView}
            availableLayers={unified.layers}
          />
        )}
      </Box>

      {/* Content based on view */}
      {implView === 'both' && unified && unified.implementations.mui && unified.implementations.base ? (
        // Side-by-side comparison
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <ComponentSection doc={unified.implementations.mui} label="MUI CORE" />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <ComponentSection doc={unified.implementations.base} label="BASE UI" />
          </Grid>
        </Grid>
      ) : (
        // Single implementation view
        doc && <ComponentSection doc={doc} />
      )}
    </Box>
  );
}
