import { forwardRef } from 'react';
import './BwCard.css';

export interface BwCardProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: 'elevated' | 'outlined' | 'filled';
  interactive?: boolean;
}

export const BwCard = forwardRef<HTMLDivElement, BwCardProps>(function BwCard(
  { variant = 'elevated', interactive = false, className = '', children, ...props },
  ref,
) {
  const classes = [
    'bw-card',
    `bw-card--${variant}`,
    interactive && 'bw-card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

/* Sub-components */
export function BwCardHeader({
  className = '',
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`bw-card__header ${className}`} {...props}>
      {children}
    </div>
  );
}

export function BwCardContent({
  className = '',
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`bw-card__content ${className}`} {...props}>
      {children}
    </div>
  );
}

export function BwCardActions({
  className = '',
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`bw-card__actions ${className}`} {...props}>
      {children}
    </div>
  );
}
