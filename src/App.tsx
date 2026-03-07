import { ThemeProvider, CssBaseline } from '@mui/material';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BrandProvider, useBrand } from './theme/brand-context';
import { ShowcaseShell } from './showcase/layout/ShowcaseShell';
import { HomePage } from './showcase/pages/HomePage';
import { GettingStartedPage } from './showcase/pages/GettingStartedPage';
import { ComponentPage } from './showcase/pages/ComponentPage';
import { ColorsPage } from './showcase/pages/ColorsPage';
import { EffectsPage } from './showcase/pages/EffectsPage';

// Register all component docs
import './showcase/register-components';

function ThemedApp() {
  const { theme } = useBrand();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route element={<ShowcaseShell />}>
            <Route index element={<HomePage />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="tokens/colors" element={<ColorsPage />} />
            <Route path="tokens/effects" element={<EffectsPage />} />
            <Route path="components/:id" element={<ComponentPage />} />
          </Route>
        </Routes>
      </HashRouter>
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
