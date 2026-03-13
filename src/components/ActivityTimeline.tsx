import { Box, Typography } from '@mui/material';
import { useBrand } from '../theme/brand-context.tsx';

export interface TimelineEntry {
  time: string;
  text: string;
}

interface ActivityTimelineProps {
  entries: TimelineEntry[];
  title?: string;
}

export function ActivityTimeline({ entries, title }: ActivityTimelineProps) {
  const { brand } = useBrand();
  const c = brand.colors;

  if (entries.length === 0) return null;

  return (
    <Box sx={{ mt: 3 }}>
      {title && (
        <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: c.contentPrimary }}>
          {title}
        </Typography>
      )}
      {entries.map((entry, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{
              width: 10, height: 10, borderRadius: '50%',
              bgcolor: c.brand400, flexShrink: 0, mt: 0.5,
            }} />
            {i < entries.length - 1 && (
              <Box sx={{ width: 2, flex: 1, bgcolor: c.borderDefault, minHeight: 20 }} />
            )}
          </Box>
          <Box sx={{ pb: 2 }}>
            <Typography variant="caption" sx={{ color: c.contentTertiary, display: 'block', mb: 0.25 }}>
              {entry.time}
            </Typography>
            <Typography variant="body2" sx={{ color: c.contentPrimary }}>
              {entry.text}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
