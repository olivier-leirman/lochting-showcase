import type { ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrandProvider, useBrand } from '../theme/brand-context';

/** Inner wrapper that consumes BrandProvider and provides MUI ThemeProvider */
function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useBrand();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

/** Full provider wrapper for tests */
function AllProviders({ children }: { children: ReactNode }) {
  return (
    <BrandProvider>
      <ThemeWrapper>{children}</ThemeWrapper>
    </BrandProvider>
  );
}

/** Custom render that wraps component in BrandProvider + ThemeProvider */
export function renderWithProviders(ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllProviders, ...options });
}
