import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrandProvider, useBrand } from './theme/brand-context';
import { InspectorProvider } from './showcase/context/inspector-context';
import { ConfigProvider } from './config/use-config';
import { AppShell } from './layout/AppShell';

// Pages — Home
import { HomePage } from './pages/home/HomePage';
import { GettingStartedPage } from './pages/getting-started/GettingStartedPage';

// Pages — Components (Library)
import { LibraryOverview } from './pages/library/LibraryOverview';
import { ComponentDetail } from './pages/library/ComponentDetail';
import { ExperimentalReview } from './pages/library/ExperimentalReview';
import { ComponentPage } from './pages/library/ComponentPage';

// Pages — Theme (tokens, identity)
import { ThemeOverview } from './pages/theme/ThemeOverview';
import { ColorsPage } from './pages/design-system/ColorsPage';
import { TypographyPage } from './pages/design-system/TypographyPage';
import { SpacingPage } from './pages/design-system/SpacingPage';
import { SizingPage } from './pages/design-system/SizingPage';
import { EffectsPage } from './pages/design-system/EffectsPage';
import { IconsPage } from './pages/design-system/IconsPage';
import { BrandIdentityPage } from './pages/design-system/BrandIdentityPage';

// Pages — Design System
import { DesignSystemHub } from './pages/design-system/DesignSystemHub';
import { DesignRulesPage } from './pages/design-system/DesignRulesPage';
import { PatternsPage } from './pages/design-system/PatternsPage';
import { StyleVariantsPage } from './pages/design-system/StyleVariantsPage';
import { InspirationBoardPage } from './pages/design-system/InspirationBoardPage';
import { ConsistencyPage } from './pages/design-system/ConsistencyPage';
import { StyleCreatorPage } from './pages/design-system/StyleCreatorPage';
import { QAReportPage } from './pages/design-system/QAReportPage';
import { StyleOverridesPage } from './pages/design-system/StyleOverridesPage';
import { ExceptionRegistryPage } from './pages/design-system/ExceptionRegistryPage';

// Pages — Playground
import { PlaygroundHub } from './pages/playground/PlaygroundHub';
import { ComponentPlayground } from './pages/playground/ComponentPlayground';
import { PlaygroundSession } from './pages/playground/PlaygroundSession';
import { StyleShowcasePage } from './pages/design-system/StyleShowcasePage';
import { ThemePlayground } from './pages/design-system/ThemePlayground';

// Pages — Prototypes
import { PrototypesOverview } from './pages/prototypes/PrototypesOverview';
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
                {/* ── Home ── */}
                <Route index element={<HomePage />} />
                <Route path="getting-started" element={<GettingStartedPage />} />

                {/* ── Components ── */}
                <Route path="components" element={<LibraryOverview />} />
                <Route path="components/experimental" element={<ExperimentalReview />} />
                <Route path="components/:id" element={<ComponentPage />} />
                <Route path="components/:id/detail" element={<ComponentDetail />} />
                <Route path="components/:id/explore" element={<ComponentPlayground />} />

                {/* ── Theme ── */}
                <Route path="theme" element={<ThemeOverview />} />
                <Route path="theme/colors" element={<ColorsPage />} />
                <Route path="theme/typography" element={<TypographyPage />} />
                <Route path="theme/spacing" element={<SpacingPage />} />
                <Route path="theme/sizing" element={<SizingPage />} />
                <Route path="theme/effects" element={<EffectsPage />} />
                <Route path="theme/icons" element={<IconsPage />} />
                <Route path="theme/styles" element={<StyleVariantsPage />} />
                <Route path="theme/styles/creator" element={<StyleCreatorPage />} />
                <Route path="theme/styles/creator/:id" element={<StyleCreatorPage />} />
                <Route path="theme/styles/:style/board" element={<InspirationBoardPage />} />
                <Route path="theme/identity/:brand/:style" element={<BrandIdentityPage />} />

                {/* ── Design System ── */}
                <Route path="design-system" element={<DesignSystemHub />} />
                <Route path="design-system/rules" element={<DesignRulesPage />} />
                <Route path="design-system/patterns" element={<PatternsPage />} />
                <Route path="design-system/consistency" element={<ConsistencyPage />} />
                <Route path="design-system/qa" element={<QAReportPage />} />
                <Route path="design-system/overrides" element={<StyleOverridesPage />} />
                <Route path="design-system/exceptions" element={<ExceptionRegistryPage />} />

                {/* ── Playground ── */}
                <Route path="playground" element={<PlaygroundHub />} />
                <Route path="playground/component" element={<ComponentPlayground />} />
                <Route path="playground/theme" element={<ThemePlayground />} />
                <Route path="playground/showcase" element={<StyleShowcasePage />} />
                <Route path="playground/sessions" element={<PlaygroundSession />} />
                <Route path="playground/sessions/:session" element={<PlaygroundSession />} />

                {/* ── Prototypes ── */}
                <Route path="prototypes" element={<PrototypesOverview />} />
                <Route path="prototypes/:platformId/:prototypeId" element={<PrototypePage />} />

                {/* ── Redirects (backwards compatibility) ── */}
                <Route path="library" element={<Navigate to="/components" replace />} />
                <Route path="library/experimental" element={<Navigate to="/components/experimental" replace />} />
                <Route path="library/:id" element={<Navigate to="/components/:id" replace />} />
                <Route path="design-system/colors" element={<Navigate to="/theme/colors" replace />} />
                <Route path="design-system/typography" element={<Navigate to="/theme/typography" replace />} />
                <Route path="design-system/spacing" element={<Navigate to="/theme/spacing" replace />} />
                <Route path="design-system/effects" element={<Navigate to="/theme/effects" replace />} />
                <Route path="design-system/icons" element={<Navigate to="/theme/icons" replace />} />
                <Route path="design-system/identity/:brand/:style" element={<Navigate to="/theme/identity/:brand/:style" replace />} />
                <Route path="design-system/styles" element={<Navigate to="/theme/styles" replace />} />
                <Route path="design-system/style-creator" element={<Navigate to="/theme/styles/creator" replace />} />
                <Route path="design-system/style-creator/:id" element={<Navigate to="/theme/styles/creator/:id" replace />} />
                <Route path="design-system/playground" element={<Navigate to="/playground/theme" replace />} />
                <Route path="style-showcase" element={<Navigate to="/playground/showcase" replace />} />
                <Route path="tokens/colors" element={<Navigate to="/theme/colors" replace />} />
                <Route path="tokens/effects" element={<Navigate to="/theme/effects" replace />} />
                <Route path="tokens/typography" element={<Navigate to="/theme/typography" replace />} />
                <Route path="tokens/spacing" element={<Navigate to="/theme/spacing" replace />} />
                <Route path="tokens/sizing" element={<Navigate to="/theme/sizing" replace />} />
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
