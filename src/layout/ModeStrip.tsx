import { Box, Tooltip, Divider, Typography } from '@mui/material';
import { Icon } from '../components/Icon';
import { useBrand } from '../theme/brand-context';

export type Mode = 'home' | 'components' | 'theme' | 'design-system' | 'playground' | 'prototypes';

export const MODES: { id: Mode; label: string; shortLabel: string; icon: string }[] = [
  { id: 'home', label: 'Home', shortLabel: 'Home', icon: 'home' },
  { id: 'components', label: 'Components', shortLabel: 'Components', icon: 'widgets' },
  { id: 'theme', label: 'Theme', shortLabel: 'Theme', icon: 'palette' },
  { id: 'design-system', label: 'Design System', shortLabel: 'Design', icon: 'design_services' },
  { id: 'playground', label: 'Playground', shortLabel: 'Playground', icon: 'science' },
  { id: 'prototypes', label: 'Prototypes', shortLabel: 'Prototypes', icon: 'article' },
];

/** Derive active mode from the current URL pathname */
export function getModeFromPath(pathname: string): Mode {
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/theme')) return 'theme';
  if (pathname.startsWith('/design-system')) return 'design-system';
  if (pathname.startsWith('/playground')) return 'playground';
  if (pathname.startsWith('/prototypes')) return 'prototypes';
  return 'home'; // default — root and unknown paths
}

interface ModeStripProps {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
  onSettingsClick?: () => void;
}

export const STRIP_WIDTH = '6rem'; // 96px

/* ── Platform Logo SVGs ── */

function LochtingLogo({ color, bgColor }: { color: string; bgColor: string }) {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
      <path d="M3.53497 12.2267C4.26918 9.46273 5.0909 6.64905 6.7971 4.27663C8.50331 1.9042 11.2747 0.0016716 14.2858 0.0016716C15.2449 -0.0220888 16.1935 0.207811 17.0362 0.668321C18.7481 1.66734 19.4405 3.67111 19.8419 5.54307C21.4339 12.9412 21.335 30.2091 10.9913 32.7954C-0.725782 35.7218 2.11789 17.5504 3.53497 12.2267Z" fill={bgColor} />
      <path d="M27.2848 6.4102C27.1802 4.21924 26.2634 2.24221 24.173 1.42466L24.1539 1.4132L24.1026 1.39409C24.0512 1.37499 24.0094 1.34825 23.9561 1.33106L23.9086 1.3196C21.6964 0.417999 19.3435 0.309118 17.1009 1.23173C14.6548 2.23648 12.6956 4.12563 11.1016 6.19817C7.26503 11.1952 5.02813 17.5847 4.05235 23.7717C3.54638 26.9808 3.35807 30.2663 3.9211 33.4849C2.70374 35.1888 1.46737 36.8812 0.187242 38.5392C-0.453772 39.3721 0.704609 40.5525 1.35513 39.7102C2.64858 38.0311 3.90208 36.3215 5.13656 34.6004C5.24497 34.5885 5.35016 34.5561 5.44661 34.5049C8.71057 32.7692 11.7983 30.7181 14.6662 28.3809C16.0484 27.2616 17.3799 26.0786 18.6606 24.8319C19.8419 23.6724 21.103 22.469 22.0597 21.1128C23.6168 18.8491 24.881 16.3959 25.8221 13.8121C26.6876 11.4874 27.4066 8.92016 27.2848 6.4102ZM22.17 2.46379C20.9755 4.91263 19.7429 7.343 18.4723 9.7549C18.1014 7.4627 17.7838 5.1705 17.4528 2.88785C18.9343 2.22283 20.5945 2.07359 22.17 2.46379ZM15.9235 3.74743C16.3153 6.48279 16.6843 9.22197 17.1751 11.9401C17.1846 11.991 17.2006 12.0404 17.2226 12.0872C16.302 13.7847 15.3611 15.4701 14.3999 17.1434C13.658 14.0967 12.4978 11.1474 11.8682 8.06822C11.856 8.00246 11.8362 7.93836 11.8092 7.87721C12.9212 6.26255 14.3151 4.86339 15.9235 3.74743ZM7.57318 16.5456C8.36127 14.2076 9.36686 11.9494 10.5766 9.80075C11.3774 12.9735 12.5872 16.047 13.1692 19.2542C10.8981 23.1012 8.50394 26.8713 5.9868 30.5643C5.76425 30.889 5.5322 31.2042 5.30775 31.5194C4.79418 26.5147 5.95258 21.2159 7.57318 16.5494V16.5456ZM14.1012 26.7153C11.9451 28.507 9.65587 30.1309 7.25361 31.5728C8.82349 29.2896 10.3452 26.9744 11.8187 24.6275C13.6428 24.4823 15.4441 24.1308 17.2569 23.8634C16.2411 24.8548 15.1912 25.8118 14.1012 26.7191V26.7153ZM20.7454 20.0966C20.2667 20.7612 19.7383 21.3883 19.1647 21.9723C17.0724 22.1634 15.0067 22.6103 12.92 22.8606C14.1881 20.7836 15.4232 18.6824 16.6254 16.557C18.7957 16.387 20.9565 16.1177 23.1249 15.9286C22.4521 17.385 21.656 18.7808 20.7454 20.1004V20.0966ZM24.1806 13.4816C24.0874 13.7281 23.9771 13.9726 23.8781 14.2209H23.8249C21.7516 14.3813 19.6859 14.6354 17.6145 14.8245C18.2992 13.5905 18.9719 12.3502 19.6326 11.1035C21.0478 8.43689 22.4135 5.74419 23.7298 3.02538C25.2001 3.65383 25.6319 5.25646 25.6471 6.77504C25.668 9.06915 24.9871 11.3594 24.1806 13.4855V13.4816Z" fill={color} />
    </svg>
  );
}

function MedipimLogo({ color }: { color: string; }) {
  return (
    <svg width="36" height="16" viewBox="0 0 181 82" fill="none">
      <path d="M107.305.039c.297-.027.602-.014.899-.004 3.286.111 6.57 1.456 9.185 3.405 11.035 8.222 19.904 30.742 24.72 43.452 2.508 6.613 5.892 17.949 10.584 22.922 5.143 5.45 12.672 5.314 19.59 5.177 2.839-.056 5.704-.094 8.542-.013v5.955l-35.682.343-8.974.004c-3.171 0-6.207.007-9.36-.456-5.963-.853-11.933-4.691-15.006-9.9-2.567-4.352-4.069-9.407-5.784-14.14-1.986-5.544-4.045-11.062-6.177-16.551a286.92 286.92 0 0 0-3.127-7.705c-.431-1.037-1.377-3.045-1.595-4.037.49-1.888 2.28-5.508 3.296-7.229 1.943 3.683 4.283 9.368 5.829 13.279 1.652 4.132 3.246 8.287 4.782 12.465 1.279 3.643 2.586 7.276 3.922 10.897 1.346 3.65 2.653 7.824 4.981 10.965 6.074 8.196 16.879 6.169 25.718 6.505 1.716.064 3.984-.232 5.647.033-.987-1.06-2.43-2.525-3.316-3.975-4.922-8.061-7.643-17.771-11.151-26.478-4.629-11.537-10.516-25.709-19.131-34.81-1.692-1.79-4.933-3.865-7.484-3.803-7.285.178-12.096 10.553-14.743 16.161-4.114 8.717-6.946 17.549-10.43 26.538-2.949 7.607-5.668 16.517-11.389 22.606C60.858 81.691 41.397 81.039 27.651 81.054L1.077 80.824c-.182-1.567-.09-4.292-.108-5.992 12.826-.232 33.321 2.343 40.758-11.245 2.136-3.903 3.956-8.924 5.392-13.132l5.575-16.613c3.28-9.539 7.717-22.703 15.288-29.773 2.54-2.372 6.47-4.236 10.017-3.969 5.165.388 8.826 3.315 12.063 7.153a23.05 23.05 0 0 1 2.514 3.222l.103.114c.497-1.082 1.546-2.41 2.316-3.326 3.402-4.052 6.963-6.713 12.31-7.225ZM39.185 74.955c4.134-.134 7.658-.482 11.73-1.027 15.29-2.856 18.098-6.484 23.654-20.35 3.222-8.043 6.028-16.657 9.262-24.638.808-2.009 1.652-4.002 2.532-5.981.576-1.277 2.502-5.14 2.68-6.16-2.09-3.897-7.19-11.996-12.224-11.57-6.81 1.333-10.712 10.523-13.282 16.271-4.426 9.9-7.276 20.472-10.911 30.667-1.726 4.897-4.135 11.47-6.997 14.787a15.81 15.81 0 0 1-6.444 6.001Z" fill={color} />
    </svg>
  );
}

export function ModeStrip({ activeMode, onModeChange, onSettingsClick }: ModeStripProps) {
  const { brand, effects, platformId } = useBrand();
  const c = brand.colors;
  const isDark = effects.mode === 'dark';
  const gradient = effects.gradients.primary;

  const activeBg = isDark ? `${c.brand500}` : `${c.brand100}`;
  const activeColor = isDark ? c.brand200 : c.brand450;
  const hoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const stripBg = isDark ? c.bgDeep : c.bgSunken;

  return (
    <Box
      sx={{
        width: STRIP_WIDTH,
        flexShrink: 0,
        height: '100%',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'stretch',
        bgcolor: stripBg,
        borderRight: '1px solid',
        borderColor: 'divider',
        py: 1,
      }}
    >
      {/* Platform logo — click to go home */}
      <Box
        onClick={() => onModeChange('home')}
        sx={{
          width: '100%',
          height: '4.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
          transition: 'opacity 0.15s ease-out',
        }}
      >
        <Box sx={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {platformId === 'medipim' ? (
            <MedipimLogo color={c.contentPrimary} />
          ) : (
            <LochtingLogo color={c.contentPrimary} bgColor={c.brand100} />
          )}
        </Box>
      </Box>

      {/* 2.5rem gap between logo and tabs */}
      <Box sx={{ height: '2.5rem', flexShrink: 0 }} />

      {/* Mode icons with labels */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {MODES.map(mode => {
          const isActive = activeMode === mode.id;
          return (
            <Box
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              sx={{
                width: '100%',
                height: '6rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                position: 'relative',
                color: isActive ? activeColor : 'text.secondary',
                bgcolor: isActive ? activeBg : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease-out, color 0.15s ease-out',
                '&:hover': { bgcolor: isActive ? activeBg : hoverBg },
                // Gradient indicator (matches tab indicator style)
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 3,
                  height: isActive ? '100%' : 0,
                  borderRadius: '0 3px 3px 0',
                  background: gradient,
                  transition: 'height 0.2s ease-out',
                },
              }}
            >
              <Icon name={mode.icon} size={28} filled={isActive} />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: '0.17px',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                {mode.shortLabel}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Separator + Settings */}
      <Divider />
      <Box
        onClick={onSettingsClick}
        sx={{
          width: '100%',
          height: 96,
          pl: 1,
          pr: 0.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          color: 'text.secondary',
          cursor: 'pointer',
          '&:hover': { bgcolor: hoverBg },
        }}
      >
        <Icon name="settings" size={28} />
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: '0.17px',
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          Settings
        </Typography>
      </Box>
    </Box>
  );
}
