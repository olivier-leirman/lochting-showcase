import { forwardRef, useId } from 'react';
import { Checkbox } from '@base-ui/react/checkbox';
import './BwCheckbox.css';

export interface BwCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  id?: string;
}

export const BwCheckbox = forwardRef<HTMLButtonElement, BwCheckboxProps>(function BwCheckbox(
  { checked, defaultChecked, onCheckedChange, label, disabled, indeterminate, className = '', id: idProp },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <label htmlFor={id} className={`bw-checkbox ${disabled ? 'bw-checkbox--disabled' : ''} ${className}`}>
      <Checkbox.Root
        ref={ref}
        id={id}
        checked={indeterminate ? 'mixed' : checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(val) => onCheckedChange?.(val === true)}
        disabled={disabled}
        className="bw-checkbox__root"
      >
        <Checkbox.Indicator className="bw-checkbox__indicator">
          {indeterminate ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label && <span className="bw-checkbox__label">{label}</span>}
    </label>
  );
});
