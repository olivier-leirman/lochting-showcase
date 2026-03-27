import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/render-with-providers';
import { BaseTokenProvider } from './BaseTokenProvider';
import { BwCheckbox } from './BwCheckbox';

function renderCheckbox(props: React.ComponentProps<typeof BwCheckbox> = {}) {
  return renderWithProviders(
    <BaseTokenProvider>
      <BwCheckbox {...props} />
    </BaseTokenProvider>,
  );
}

describe('BwCheckbox', () => {
  it('renders with a label', () => {
    renderCheckbox({ label: 'Accept terms' });
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    renderCheckbox({ label: 'Check me' });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('can be checked via defaultChecked', () => {
    renderCheckbox({ label: 'Pre-checked', defaultChecked: true });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onCheckedChange when clicked', async () => {
    const onChange = vi.fn();
    renderCheckbox({ label: 'Toggle', onCheckedChange: onChange });
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders as disabled', () => {
    renderCheckbox({ label: 'Disabled', disabled: true });
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-disabled', 'true');
  });
});
