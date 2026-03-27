import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/render-with-providers';
import { BaseTokenProvider } from './BaseTokenProvider';
import { BwButton } from './BwButton';

function renderButton(props: React.ComponentProps<typeof BwButton> = {}) {
  return renderWithProviders(
    <BaseTokenProvider>
      <BwButton {...props}>{props.children ?? 'Click me'}</BwButton>
    </BaseTokenProvider>,
  );
}

describe('BwButton', () => {
  it('renders with text content', () => {
    renderButton({ children: 'Save' });
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders all variants', () => {
    renderWithProviders(
      <BaseTokenProvider>
        <BwButton variant="contained">Contained</BwButton>
        <BwButton variant="outlined">Outlined</BwButton>
        <BwButton variant="text">Text</BwButton>
      </BaseTokenProvider>,
    );
    expect(screen.getByRole('button', { name: 'Contained' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Outlined' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Text' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    renderButton({ onClick, children: 'Click' });
    await userEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as disabled', () => {
    renderButton({ disabled: true, children: 'Disabled' });
    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect(btn).toBeDisabled();
  });

  it('renders with different sizes', () => {
    renderWithProviders(
      <BaseTokenProvider>
        <BwButton size="small">Small</BwButton>
        <BwButton size="medium">Medium</BwButton>
        <BwButton size="large">Large</BwButton>
      </BaseTokenProvider>,
    );
    expect(screen.getByRole('button', { name: 'Small' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Large' })).toBeInTheDocument();
  });
});
