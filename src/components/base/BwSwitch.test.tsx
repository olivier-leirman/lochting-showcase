import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/render-with-providers';
import { BaseTokenProvider } from './BaseTokenProvider';
import { BwSwitch } from './BwSwitch';

function renderSwitch(props: React.ComponentProps<typeof BwSwitch> = {}) {
  return renderWithProviders(
    <BaseTokenProvider>
      <BwSwitch {...props} />
    </BaseTokenProvider>,
  );
}

describe('BwSwitch', () => {
  it('renders with a label', () => {
    renderSwitch({ label: 'Dark mode' });
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    renderSwitch({ label: 'Toggle' });
    const switchEl = screen.getByRole('switch');
    expect(switchEl).not.toBeChecked();
  });

  it('calls onCheckedChange when toggled', async () => {
    const onChange = vi.fn();
    renderSwitch({ label: 'Toggle', onCheckedChange: onChange });
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  it('respects disabled state', () => {
    renderSwitch({ label: 'Disabled', disabled: true });
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });
});
