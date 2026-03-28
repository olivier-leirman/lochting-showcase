import { type ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Breadcrumbs,
  Link,
  Typography,
  Badge,
  Avatar,
  Box,
  Tooltip,
  type AppBarProps,
} from '@mui/material';
import { Icon } from './Icon';

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Click handler — omit for the current (last) crumb */
  onClick?: () => void;
  /** Whether this crumb has a dropdown indicator */
  hasDropdown?: boolean;
}

export interface AppTopBarProps {
  /** Breadcrumb path items */
  breadcrumbs?: BreadcrumbItem[];
  /** Show back/forward navigation buttons (default: true) */
  showNavigation?: boolean;
  /** Callback for back navigation */
  onBack?: () => void;
  /** Callback for forward navigation */
  onForward?: () => void;
  /** Content for the right-side action area (icons, avatar, etc.) */
  actions?: ReactNode;
  /** Additional AppBar props */
  appBarProps?: Partial<AppBarProps>;
}

export function AppTopBar({
  breadcrumbs = [],
  showNavigation = true,
  onBack,
  onForward,
  actions,
  appBarProps,
}: AppTopBarProps) {
  return (
    <AppBar position="static" elevation={0} {...appBarProps}>
      <Toolbar>
        {/* ── Back/Forward navigation ── */}
        {showNavigation && (
          <>
            <Tooltip title="Go back">
              <span>
                <IconButton
                  size="small"
                  onClick={onBack}
                  disabled={!onBack}
                  aria-label="Go back"
                  sx={{ width: 32, height: 32 }}
                >
                  <Icon name="arrow_back" size={18} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Go forward">
              <span>
                <IconButton
                  size="small"
                  onClick={onForward}
                  disabled={!onForward}
                  aria-label="Go forward"
                  sx={{ width: 32, height: 32 }}
                >
                  <Icon name="arrow_forward" size={18} />
                </IconButton>
              </span>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          </>
        )}

        {/* ── Breadcrumbs ── */}
        <Breadcrumbs separator="/" sx={{ flex: 1 }}>
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            if (isLast) {
              return (
                <Typography
                  key={crumb.label}
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.25,
                  }}
                >
                  {crumb.label}
                  {crumb.hasDropdown && (
                    <Icon name="keyboard_arrow_down" size={16} />
                  )}
                </Typography>
              );
            }
            return (
              <Link
                key={crumb.label}
                component="button"
                underline="hover"
                onClick={crumb.onClick}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.25,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                }}
              >
                {crumb.label}
                {crumb.hasDropdown && (
                  <Icon name="keyboard_arrow_down" size={16} />
                )}
              </Link>
            );
          })}
        </Breadcrumbs>

        {/* ── Right side actions ── */}
        {actions}
      </Toolbar>
    </AppBar>
  );
}

/* ─── Pre-built action bar matching the Figma design ─── */

export interface TopBarAction {
  /** Material Symbols icon name */
  icon: string;
  /** Tooltip label */
  label: string;
  /** Badge count (dot = 0, number = count, undefined = none) */
  badge?: number;
  /** Click handler */
  onClick?: () => void;
}

export interface TopBarActionsProps {
  /** Utility action icons (support, language, etc.) */
  utilityActions?: TopBarAction[];
  /** Notification action icons (news, notifications, etc.) */
  notificationActions?: TopBarAction[];
  /** User avatar initials */
  avatarInitials?: string;
  /** Avatar click handler */
  onAvatarClick?: () => void;
}

export function TopBarActions({
  utilityActions = [],
  notificationActions = [],
  avatarInitials = 'OP',
  onAvatarClick,
}: TopBarActionsProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {utilityActions.length > 0 && (
        <>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          {utilityActions.map((action) => (
            <Tooltip key={action.icon} title={action.label}>
              <IconButton
                size="small"
                onClick={action.onClick}
                aria-label={action.label}
                sx={{ width: 32, height: 32 }}
              >
                <Icon name={action.icon} size={20} />
              </IconButton>
            </Tooltip>
          ))}
        </>
      )}

      {notificationActions.length > 0 && (
        <>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          {notificationActions.map((action) => (
            <Tooltip key={action.icon} title={action.label}>
              <IconButton
                size="small"
                onClick={action.onClick}
                aria-label={action.label}
                sx={{ width: 32, height: 32 }}
              >
                {action.badge != null ? (
                  <Badge
                    variant={action.badge === 0 ? 'dot' : 'standard'}
                    badgeContent={action.badge || undefined}
                    color="primary"
                  >
                    <Icon name={action.icon} size={20} />
                  </Badge>
                ) : (
                  <Icon name={action.icon} size={20} />
                )}
              </IconButton>
            </Tooltip>
          ))}
        </>
      )}

      {/* ── User avatar ── */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', ml: 1, cursor: 'pointer' }}
        onClick={onAvatarClick}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {avatarInitials}
        </Avatar>
        <Icon name="keyboard_arrow_down" size={16} color="inherit" sx={{ ml: -0.25, opacity: 0.5 }} />
      </Box>
    </Box>
  );
}
