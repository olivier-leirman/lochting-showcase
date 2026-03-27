import { forwardRef } from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import './BwButton.css';

export interface BwButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'error';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const BwButton = forwardRef<HTMLButtonElement, BwButtonProps>(function BwButton(
  {
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    startIcon,
    endIcon,
    fullWidth = false,
    children,
    className = '',
    ...props
  },
  ref,
) {
  const classes = [
    'bw-button',
    `bw-button--${variant}`,
    `bw-button--${size}`,
    `bw-button--${color}`,
    fullWidth && 'bw-button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseButton ref={ref} className={classes} {...props}>
      {startIcon && <span className="bw-button__icon bw-button__icon--start">{startIcon}</span>}
      {children}
      {endIcon && <span className="bw-button__icon bw-button__icon--end">{endIcon}</span>}
    </BaseButton>
  );
});
