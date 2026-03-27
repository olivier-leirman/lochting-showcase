import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { CodeBlock } from '../../../showcase/blocks/CodeBlock';
import { useBrand } from '../../../theme/brand-context';

export function DocsTab({ doc }: { doc: ComponentDoc }) {
  const { brand } = useBrand();
  const sw = brand.typography.strongWeight ?? 600;

  return (
    <Box>
      {/* Description */}
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        {doc.description}
      </Typography>

      {/* Import */}
      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>Import</Typography>
      <CodeBlock code={doc.importStatement} language="tsx" />

      {/* Props Table */}
      {doc.props.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>Props</Typography>
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
                    <TableCell>
                      <Chip
                        label={p.name}
                        size="small"
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          height: 24,
                          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'warning.main' }}>
                      {p.type}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {p.default ?? '—'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>
                      {p.description}
                    </TableCell>
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
