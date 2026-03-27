import { forwardRef } from 'react';
import './BwChip.css';

export interface BwChipProps extends React.ComponentPropsWithoutRef<'span'> {
  variant?: 'filled' | 'outlined' | 'soft';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
  icon?: React.ReactNode;
  onDelete?: () => void;
  clickable?: boolean;
}

export const BwChip = forwardRef<HTMLSpanElement, BwChipProps>(function BwChip(
  {
    variant = 'filled',
    color = 'default',
    size = 'medium',
    icon,
    onDelete,
    clickable = false,
    children,
    className = '',
    onClick,
    ...props
  },
  ref,
) {
  const classes = [
    'bw-chip',
    `bw-chip--${variant}`,
    `bw-chip--${color}`,
    `bw-chip--${size}`,
    (clickable || onClick) && 'bw-chip--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} onClick={onClick} role={clickable || onClick ? 'button' : undefined} tabIndex={clickable || onClick ? 0 : undefined} {...props}>
      {icon && <span className="bw-chip__icon">{icon}</span>}
      <span className="bw-chip__label">{children}</span>
      {onDelete && (
        <button
          type="button"
          className="bw-chip__delete"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          aria-label="Remove"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
});
