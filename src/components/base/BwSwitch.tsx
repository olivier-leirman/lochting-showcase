import { forwardRef, useId } from 'react';
import { Switch } from '@base-ui/react/switch';
import './BwSwitch.css';

export interface BwSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium';
  className?: string;
  id?: string;
}

export const BwSwitch = forwardRef<HTMLButtonElement, BwSwitchProps>(function BwSwitch(
  { checked, defaultChecked, onCheckedChange, label, disabled, size = 'medium', className = '', id: idProp },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <label
      htmlFor={id}
      className={`bw-switch ${disabled ? 'bw-switch--disabled' : ''} ${className}`}
    >
      <Switch.Root
        ref={ref}
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`bw-switch__root bw-switch__root--${size}`}
      >
        <Switch.Thumb className="bw-switch__thumb" />
      </Switch.Root>
      {label && <span className="bw-switch__label">{label}</span>}
    </label>
  );
});
