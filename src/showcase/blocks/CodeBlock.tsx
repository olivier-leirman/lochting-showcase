import { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../components/Icon';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyToClipboard } from '../../utils/copy-to-clipboard';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
      <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
        <IconButton
          size="small"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            color: 'grey.400',
            bgcolor: 'rgba(255,255,255,0.08)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
          }}
        >
          {copied ? <Icon name="check" size={18} /> : <Icon name="content_copy" size={18} />}
        </IconButton>
      </Tooltip>
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        customStyle={{
          margin: 0,
          padding: '20px',
          borderRadius: 8,
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </Box>
  );
}
