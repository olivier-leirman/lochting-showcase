import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrandProvider, useBrand } from './theme/brand-context';
import { InspectorProvider } from './showcase/context/inspector-context';
import { ConfigProvider } from './config/use-config';
import { AppShell } from './layout/AppShell';

// Pages — Home
import { HomePage } from './pages/home/HomePage';
import { GettingStartedPage } from './pages/getting-started/GettingStartedPage';

// Pages — Design System (existing, moved)
import { ColorsPage } from './pages/design-system/ColorsPage';
import { EffectsPage } from './pages/design-system/EffectsPage';
import { TypographyPage } from './pages/design-system/TypographyPage';
import { SpacingPage } from './pages/design-system/SpacingPage';
import { SizingPage } from './pages/design-system/SizingPage';
import { StyleShowcasePage } from './pages/design-system/StyleShowcasePage';

// Pages — Library (existing, moved)
import { ComponentPage } from './pages/library/ComponentPage';

// New pages — Library
import { LibraryOverview } from './pages/library/LibraryOverview';
import { ComponentDetail } from './pages/library/ComponentDetail';
import { ExperimentalReview } from './pages/library/ExperimentalReview';

// New pages — Design System
import { IconsPage } from './pages/design-system/IconsPage';
import { PatternsPage } from './pages/design-system/PatternsPage';
import { DesignRulesPage } from './pages/design-system/DesignRulesPage';
import { StyleVariantsPage } from './pages/design-system/StyleVariantsPage';
import { InspirationBoardPage } from './pages/design-system/InspirationBoardPage';
import { BrandIdentityPage } from './pages/design-system/BrandIdentityPage';
import { ThemePlayground } from './pages/design-system/ThemePlayground';
import { ConsistencyPage } from './pages/design-system/ConsistencyPage';
import { StyleCreatorPage } from './pages/design-system/StyleCreatorPage';

// New pages — Playground
import { ComponentPlayground } from './pages/playground/ComponentPlayground';
import { PlaygroundSession } from './pages/playground/PlaygroundSession';

// New pages — Prototypes
import { PrototypePage } from './pages/prototypes/PrototypePage';

// Register all component docs
import './showcase/register-components';
import './showcase/register-base-components';

function ThemedApp() {
  const { theme } = useBrand();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InspectorProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                {/* Home */}
                <Route index element={<HomePage />} />
                <Route path="getting-started" element={<GettingStartedPage />} />

                {/* Library */}
                <Route path="library" element={<LibraryOverview />} />
                <Route path="library/:id" element={<ComponentDetail />} />
                <Route path="library/:id/explore" element={<ComponentPlayground />} />
                <Route path="library/experimental" element={<ExperimentalReview />} />

                {/* Design System — Tokens */}
                <Route path="design-system/colors" element={<ColorsPage />} />
                <Route path="design-system/typography" element={<TypographyPage />} />
                <Route path="design-system/spacing" element={<SpacingPage />} />
                <Route path="design-system/sizing" element={<SizingPage />} />
                <Route path="design-system/effects" element={<EffectsPage />} />

                {/* Design System — New */}
                <Route path="design-system/icons" element={<IconsPage />} />
                <Route path="design-system/patterns" element={<PatternsPage />} />
                <Route path="design-system/rules" element={<DesignRulesPage />} />
                <Route path="design-system/styles" element={<StyleVariantsPage />} />
                <Route path="design-system/styles/:style/board" element={<InspirationBoardPage />} />
                <Route path="design-system/identity/:brand/:style" element={<BrandIdentityPage />} />
                <Route path="design-system/playground" element={<ThemePlayground />} />
                <Route path="design-system/consistency" element={<ConsistencyPage />} />
                <Route path="design-system/style-creator" element={<StyleCreatorPage />} />
                <Route path="design-system/style-creator/:id" element={<StyleCreatorPage />} />

                {/* Style showcase (legacy) */}
                <Route path="style-showcase" element={<StyleShowcasePage />} />

                {/* Playground */}
                <Route path="playground" element={<ComponentPlayground />} />
                <Route path="playground/:session" element={<PlaygroundSession />} />

                {/* Prototypes */}
                <Route path="prototypes/:id" element={<PrototypePage />} />

                {/* Legacy routes (backwards compat) */}
                <Route path="tokens/colors" element={<ColorsPage />} />
                <Route path="tokens/effects" element={<EffectsPage />} />
                <Route path="tokens/typography" element={<TypographyPage />} />
                <Route path="tokens/spacing" element={<SpacingPage />} />
                <Route path="tokens/sizing" element={<SizingPage />} />
                <Route path="components/:id" element={<ComponentPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </InspectorProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <BrandProvider>
        <ThemedApp />
      </BrandProvider>
    </ConfigProvider>
  );
}
