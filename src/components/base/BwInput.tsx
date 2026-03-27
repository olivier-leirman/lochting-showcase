import { forwardRef, useId } from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import './BwInput.css';

export interface BwInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const BwInput = forwardRef<HTMLInputElement, BwInputProps>(function BwInput(
  {
    label,
    helperText,
    error = false,
    size = 'medium',
    fullWidth = false,
    startAdornment,
    endAdornment,
    className = '',
    id: idProp,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  const wrapperClasses = [
    'bw-input-wrapper',
    `bw-input-wrapper--${size}`,
    fullWidth && 'bw-input-wrapper--full-width',
    error && 'bw-input-wrapper--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={id} className="bw-input__label">
          {label}
        </label>
      )}
      <div className="bw-input__field-wrapper">
        {startAdornment && (
          <span className="bw-input__adornment bw-input__adornment--start">{startAdornment}</span>
        )}
        <BaseInput ref={ref} id={id} className="bw-input__field" {...props} />
        {endAdornment && (
          <span className="bw-input__adornment bw-input__adornment--end">{endAdornment}</span>
        )}
      </div>
      {helperText && (
        <span className={`bw-input__helper ${error ? 'bw-input__helper--error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
});
