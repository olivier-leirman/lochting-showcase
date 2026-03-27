import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../showcase/blocks/CodeBlock';

export function GettingStartedPage() {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 4, fontSize: '2.5rem' }}>
        Getting Started
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Import the theme and wrap your app — all MUI components get the design system look automatically.
      </Typography>

      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'inherit' }}>
        1. Install dependencies
      </Typography>
      <CodeBlock code={`npm install @mui/material @emotion/react @emotion/styled`} language="bash" />

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: 'inherit' }}>
        2. Import and apply the theme
      </Typography>
      <CodeBlock
        code={`import { ThemeProvider, CssBaseline } from '@mui/material';
import { createBrandTheme } from './theme/create-brand-theme';
import { LOCHTING } from './theme/tokens/lochting';

const { theme } = createBrandTheme(LOCHTING);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
      />

      <Typography variant="h5" sx={{ mt: 4, mb: 2, fontFamily: 'inherit' }}>
        3. Use standard MUI components
      </Typography>
      <CodeBlock
        code={`import { Button, TextField, Switch } from '@mui/material';

// That's it! The gradient/shadow system is applied automatically.
<Button variant="contained" color="primary">Click me</Button>
<TextField label="Email" />
<Switch defaultChecked />`}
      />
    </Box>
  );
}
