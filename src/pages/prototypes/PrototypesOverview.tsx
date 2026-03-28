import { Box, Typography, Card, CardActionArea, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useBrand } from '../../theme/brand-context';
import { getPrototypesByPlatform, type PlatformGroup } from '../../prototypes/prototype-registry';

export function PrototypesOverview() {
  const navigate = useNavigate();
  const { brand } = useBrand();
  const c = brand.colors;
  const groups = getPrototypesByPlatform();

  return (
    <Box>
      <Typography variant="h4" fontWeight={500}>
        Prototypes
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 4 }}>
        Real-world application prototypes organized by project.
      </Typography>

      {groups.map((group) => (
        <PlatformSection key={group.platformId} group={group} navigate={navigate} colors={c} />
      ))}
    </Box>
  );
}

/* ── Platform Section ── */

function PlatformSection({
  group,
  navigate,
  colors: c,
}: {
  group: PlatformGroup;
  navigate: ReturnType<typeof useNavigate>;
  colors: ReturnType<typeof useBrand>['brand']['colors'];
}) {
  const totalCount = group.folders.reduce((sum, f) => sum + f.prototypes.length, 0) + group.ungrouped.length;

  return (
    <Box sx={{ mb: 5 }}>
      {/* Platform header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: c.brand100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={group.icon} size={20} color={c.brand500} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={500} sx={{ lineHeight: 1.2 }}>
            {group.platformName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {totalCount === 0 ? 'No prototypes yet' : `${totalCount} prototype${totalCount !== 1 ? 's' : ''}`}
          </Typography>
        </Box>
      </Box>

      {totalCount === 0 ? (
        <Card variant="outlined" sx={{ textAlign: 'center', py: 5 }}>
          <Icon name="web" size={40} color={c.contentTertiary} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
            No prototypes for {group.platformName} yet.
          </Typography>
        </Card>
      ) : (
        <>
          {/* Folders */}
          {group.folders.map((folder) => (
            <Box key={folder.name} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Icon name="folder" size={18} color={c.contentSecondary} />
                <Typography variant="body2" fontWeight={500} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>
                  {folder.name}
                </Typography>
                <Chip label={folder.prototypes.length} size="small" sx={{ height: 18, fontSize: '0.65rem' }} />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                {folder.prototypes.map((proto) => (
                  <Card key={proto.id} variant="outlined">
                    <CardActionArea onClick={() => navigate(`/prototypes/${group.platformId}/${proto.id}`)}>
                      <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Icon name={proto.icon} size={20} color={c.brand500} />
                          <Typography variant="body1" fontWeight={500}>
                            {proto.name}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          {proto.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          ))}

          {/* Ungrouped */}
          {group.ungrouped.length > 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {group.ungrouped.map((proto) => (
                <Card key={proto.id} variant="outlined">
                  <CardActionArea onClick={() => navigate(`/prototypes/${group.platformId}/${proto.id}`)}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Icon name={proto.icon} size={20} color={c.brand500} />
                        <Typography variant="body1" fontWeight={500}>
                          {proto.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {proto.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
