import { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { getPrototypesByPlatform } from '../../prototypes/prototype-registry';

export function PrototypesSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const groups = getPrototypesByPlatform();

  const isActive = (path: string) => location.pathname === path;
  const isActivePrefix = (prefix: string) => location.pathname.startsWith(prefix);

  // Track expanded folders
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(() => {
    // Auto-expand folder containing current route
    const expanded = new Set<string>();
    for (const group of groups) {
      for (const folder of group.folders) {
        for (const proto of folder.prototypes) {
          if (location.pathname.includes(proto.id)) {
            expanded.add(`${group.platformId}-${folder.name}`);
          }
        }
      }
    }
    return expanded;
  });

  const toggleFolder = (key: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      <Box sx={{ px: 2, pb: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Icon name="add" size={18} />}
          onClick={() => navigate('/prototypes')}
          sx={{ textTransform: 'none', fontWeight: 500, fontSize: '0.8125rem' }}
        >
          New Prototype
        </Button>
      </Box>

      <List disablePadding sx={{ px: 1 }}>
        {/* Overview */}
        <ListItemButton
          selected={isActive('/prototypes')}
          onClick={() => navigate('/prototypes')}
          sx={{ my: 0.25 }}
        >
          <ListItemIcon sx={{ minWidth: 28 }}>
            <Icon name="dashboard" size={18} filled={isActive('/prototypes')} />
          </ListItemIcon>
          <ListItemText primary="Overview" primaryTypographyProps={{ fontSize: '0.8125rem' }} />
        </ListItemButton>

        {/* Per-platform groups */}
        {groups.map((group) => {
          const hasItems = group.folders.length > 0 || group.ungrouped.length > 0;
          const platformPrefix = `/prototypes/${group.platformId}`;

          return (
            <Box key={group.platformId}>
              <ListSubheader
                disableSticky
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: '32px',
                  mt: 1,
                  px: 1,
                  color: 'text.secondary',
                }}
              >
                {group.platformName}
              </ListSubheader>

              {!hasItems && (
                <ListItemButton disabled sx={{ opacity: 0.5, my: 0.25 }}>
                  <ListItemText
                    primary="No prototypes"
                    primaryTypographyProps={{ fontSize: '0.75rem', fontStyle: 'italic' }}
                  />
                </ListItemButton>
              )}

              {/* Folders */}
              {group.folders.map((folder) => {
                const folderKey = `${group.platformId}-${folder.name}`;
                const isExpanded = expandedFolders.has(folderKey);
                const folderActive = folder.prototypes.some((p) =>
                  isActivePrefix(`${platformPrefix}/${p.id}`),
                );

                return (
                  <Box key={folderKey}>
                    <ListItemButton
                      onClick={() => toggleFolder(folderKey)}
                      sx={{ my: 0.25 }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <Icon
                          name={isExpanded ? 'folder_open' : 'folder'}
                          size={18}
                          filled={folderActive}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={folder.name}
                        primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: folderActive ? 500 : 400 }}
                      />
                      <Icon
                        name={isExpanded ? 'expand_less' : 'expand_more'}
                        size={16}
                      />
                    </ListItemButton>

                    <Collapse in={isExpanded}>
                      {folder.prototypes.map((proto) => {
                        const path = `${platformPrefix}/${proto.id}`;
                        const active = isActive(path);
                        return (
                          <ListItemButton
                            key={proto.id}
                            selected={active}
                            onClick={() => navigate(path)}
                            sx={{ my: 0.25, pl: 5 }}
                          >
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <Icon name={proto.icon} size={16} filled={active} />
                            </ListItemIcon>
                            <ListItemText
                              primary={proto.name}
                              primaryTypographyProps={{ fontSize: '0.75rem' }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </Collapse>
                  </Box>
                );
              })}

              {/* Ungrouped */}
              {group.ungrouped.map((proto) => {
                const path = `${platformPrefix}/${proto.id}`;
                const active = isActive(path);
                return (
                  <ListItemButton
                    key={proto.id}
                    selected={active}
                    onClick={() => navigate(path)}
                    sx={{ my: 0.25 }}
                  >
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Icon name={proto.icon} size={18} filled={active} />
                    </ListItemIcon>
                    <ListItemText
                      primary={proto.name}
                      primaryTypographyProps={{ fontSize: '0.8125rem' }}
                    />
                  </ListItemButton>
                );
              })}
            </Box>
          );
        })}
      </List>
    </>
  );
}
