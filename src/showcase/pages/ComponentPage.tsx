import { useParams } from 'react-router-dom';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getComponent } from '../registry';
import { PreviewCodeTabs } from '../blocks/PreviewCodeTabs';
import { CodeBlock } from '../blocks/CodeBlock';
import { useBrand } from '../../theme/brand-context';

export function ComponentPage() {
  const { id } = useParams<{ id: string }>();
  const doc = getComponent(id ?? '');
  const { brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;

  if (!doc) {
    return <Typography>Component not found: {id}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>
        {doc.name}
      </Typography>
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
