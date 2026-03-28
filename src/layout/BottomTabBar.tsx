import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useBrand } from '../theme/brand-context';
import type { Mode } from './ModeStrip';

const TABS: { mode: Mode; label: string; icon: string }[] = [
  { mode: 'home', label: 'Home', icon: 'home' },
  { mode: 'components', label: 'Components', icon: 'widgets' },
  { mode: 'theme', label: 'Theme', icon: 'palette' },
  { mode: 'design-system', label: 'Design', icon: 'design_services' },
  { mode: 'playground', label: 'Playground', icon: 'science' },
];

const MODE_PATHS: Record<string, string> = {
  home: '/',
  components: '/components',
  theme: '/theme',
  'design-system': '/design-system',
  playground: '/playground',
};

export const BOTTOM_BAR_HEIGHT = '3.5rem';

interface BottomTabBarProps {
  activeMode: Mode;
}

export function BottomTabBar({ activeMode }: BottomTabBarProps) {
  const navigate = useNavigate();
  const { brand } = useBrand();
  const c = brand.colors;

  const activeIndex = TABS.findIndex((t) => t.mode === activeMode);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderTop: '1px solid',
        borderColor: 'divider',
        pb: 'env(safe-area-inset-bottom)',
        bgcolor: 'background.paper',
        display: { xs: 'block', md: 'none' },
      }}
    >
      <BottomNavigation
        value={activeIndex >= 0 ? activeIndex : 0}
        onChange={(_, newIndex) => {
          const tab = TABS[newIndex];
          if (tab) {
            const stored = localStorage.getItem(`bw-ds-last-path-${tab.mode}`);
            navigate(stored ?? MODE_PATHS[tab.mode] ?? '/');
          }
        }}
        showLabels
        sx={{
          height: BOTTOM_BAR_HEIGHT,
          bgcolor: 'background.paper',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            px: 0.5,
            py: 0.75,
            color: 'text.secondary',
            '&.Mui-selected': {
              color: c.brand500,
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.625rem',
            '&.Mui-selected': {
              fontSize: '0.625rem',
            },
          },
        }}
      >
        {TABS.map((tab, i) => (
          <BottomNavigationAction
            key={tab.mode}
            label={tab.label}
            icon={<Icon name={tab.icon} size={22} filled={activeIndex === i} />}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
