import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/render-with-providers';
import { BaseTokenProvider } from './BaseTokenProvider';
import { BwAlert } from './BwAlert';

function renderAlert(props: React.ComponentProps<typeof BwAlert>) {
  return renderWithProviders(
    <BaseTokenProvider>
      <BwAlert {...props} />
    </BaseTokenProvider>,
  );
}

describe('BwAlert', () => {
  it('renders with children', () => {
    renderAlert({ severity: 'info', children: 'Heads up!' });
    expect(screen.getByText('Heads up!')).toBeInTheDocument();
  });

  it('renders all severity levels', () => {
    const { unmount } = renderAlert({ severity: 'error', children: 'Error' });
    expect(screen.getByText('Error')).toBeInTheDocument();
    unmount();

    renderAlert({ severity: 'success', children: 'Success' });
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('renders close button when onClose provided', () => {
    const onClose = vi.fn();
    renderAlert({ severity: 'warning', children: 'Warning', onClose });
    const closeBtn = screen.getByRole('button');
    expect(closeBtn).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    renderAlert({ severity: 'info', children: 'Info', onClose });
    await userEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders action slot', () => {
    renderAlert({
      severity: 'info',
      children: 'With action',
      action: <button>Undo</button>,
    });
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });
});
