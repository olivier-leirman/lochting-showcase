import { forwardRef } from 'react';
import './BwAlert.css';

export interface BwAlertProps extends React.ComponentPropsWithoutRef<'div'> {
  severity?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'filled' | 'outlined' | 'soft';
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v4M10 7h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3l8 14H2L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 9v3M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export const BwAlert = forwardRef<HTMLDivElement, BwAlertProps>(function BwAlert(
  { severity = 'info', variant = 'soft', icon, action, onClose, children, className = '', ...props },
  ref,
) {
  const classes = [
    'bw-alert',
    `bw-alert--${severity}`,
    `bw-alert--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role="alert" className={classes} {...props}>
      <span className="bw-alert__icon">{icon ?? DEFAULT_ICONS[severity]}</span>
      <div className="bw-alert__content">{children}</div>
      {action && <div className="bw-alert__action">{action}</div>}
      {onClose && (
        <button type="button" className="bw-alert__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
});
