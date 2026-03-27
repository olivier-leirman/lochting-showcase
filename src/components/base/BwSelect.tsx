import { useId } from 'react';
import { Select } from '@base-ui/react/select';
import './BwSelect.css';

export interface BwSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BwSelectProps {
  options: BwSelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export function BwSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  placeholder = 'Select...',
  helperText,
  error = false,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  className = '',
  id: idProp,
}: BwSelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  const wrapperClasses = [
    'bw-select',
    `bw-select--${size}`,
    fullWidth && 'bw-select--full-width',
    error && 'bw-select--error',
    disabled && 'bw-select--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className="bw-select__label">
          {label}
        </label>
      )}
      <Select.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled}>
        <Select.Trigger id={id} className="bw-select__trigger">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="bw-select__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className="bw-select__positioner" sideOffset={4}>
            <Select.Popup className="bw-select__popup">
              {options.map((opt) => (
                <Select.Item key={opt.value} value={opt.value} disabled={opt.disabled} className="bw-select__item">
                  <Select.ItemIndicator className="bw-select__item-indicator">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Select.ItemIndicator>
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {helperText && (
        <span className={`bw-select__helper ${error ? 'bw-select__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}
