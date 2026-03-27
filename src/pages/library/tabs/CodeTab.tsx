import { Box, Typography, Button } from '@mui/material';
import type { ComponentDoc } from '../../../showcase/registry';
import { CodeBlock } from '../../../showcase/blocks/CodeBlock';
import { Icon } from '../../../components/Icon';
import { copyToClipboard } from '../../../utils/copy-to-clipboard';

export function CodeTab({ doc }: { doc: ComponentDoc }) {
  const basicUsage = doc.examples[0]?.code ?? '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Import Statement */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Import</Typography>
          <Button
            size="small"
            startIcon={<Icon name="content_copy" size={16} />}
            onClick={() => copyToClipboard(doc.importStatement)}
            sx={{ textTransform: 'none' }}
          >
            Copy
          </Button>
        </Box>
        <CodeBlock code={doc.importStatement} language="tsx" />
      </Box>

      {/* Basic Usage */}
      {basicUsage && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Basic Usage</Typography>
            <Button
              size="small"
              startIcon={<Icon name="content_copy" size={16} />}
              onClick={() => copyToClipboard(basicUsage)}
              sx={{ textTransform: 'none' }}
            >
              Copy
            </Button>
          </Box>
          <CodeBlock code={basicUsage} language="tsx" />
        </Box>
      )}

      {/* TypeScript Props Interface */}
      {doc.props.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>TypeScript Interface</Typography>
          <CodeBlock
            code={generatePropsInterface(doc)}
            language="tsx"
          />
        </Box>
      )}
    </Box>
  );
}

function generatePropsInterface(doc: ComponentDoc): string {
  const lines = [`interface ${doc.name.replace(/\s/g, '')}Props {`];
  for (const p of doc.props) {
    const optional = p.default ? '?' : '';
    lines.push(`  /** ${p.description} */`);
    lines.push(`  ${p.name}${optional}: ${p.type};`);
  }
  lines.push('}');
  return lines.join('\n');
}
