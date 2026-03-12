import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrandProvider, useBrand } from './theme/brand-context';
import { ShowcaseShell } from './showcase/layout/ShowcaseShell';
import { HomePage } from './showcase/pages/HomePage';
import { GettingStartedPage } from './showcase/pages/GettingStartedPage';
import { ComponentPage } from './showcase/pages/ComponentPage';
import { ColorsPage } from './showcase/pages/ColorsPage';
import { EffectsPage } from './showcase/pages/EffectsPage';
import { TypographyPage } from './showcase/pages/TypographyPage';
import { SpacingPage } from './showcase/pages/SpacingPage';
import { SizingPage } from './showcase/pages/SizingPage';

// Register all component docs
import './showcase/register-components';

function ThemedApp() {
  const { theme } = useBrand();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HashRouter>
          <Routes>
            <Route element={<ShowcaseShell />}>
              <Route index element={<HomePage />} />
              <Route path="getting-started" element={<GettingStartedPage />} />
              <Route path="tokens/colors" element={<ColorsPage />} />
              <Route path="tokens/effects" element={<EffectsPage />} />
              <Route path="tokens/typography" element={<TypographyPage />} />
              <Route path="tokens/spacing" element={<SpacingPage />} />
              <Route path="tokens/sizing" element={<SizingPage />} />
              <Route path="components/:id" element={<ComponentPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <ThemedApp />
    </BrandProvider>
  );
}
