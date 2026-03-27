import { Dialog } from '@base-ui/react/dialog';
import './BwDialog.css';

export interface BwDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function BwDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  actions,
  size = 'medium',
  className = '',
}: BwDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger className="bw-dialog__trigger">{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Backdrop className="bw-dialog__backdrop" />
        <Dialog.Popup className={`bw-dialog__popup bw-dialog__popup--${size} ${className}`}>
          <div className="bw-dialog__header">
            {title && <Dialog.Title className="bw-dialog__title">{title}</Dialog.Title>}
            <Dialog.Close className="bw-dialog__close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="bw-dialog__description">{description}</Dialog.Description>
          )}
          <div className="bw-dialog__content">{children}</div>
          {actions && <div className="bw-dialog__actions">{actions}</div>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
