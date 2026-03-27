import { useState } from 'react';
import { Box, Typography, IconButton, Collapse, Slide, Divider, alpha } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useInspector, type InspectedGroup, type InspectedProperty } from '../showcase/context/inspector-context';
import { formatColor } from '../showcase/utils/style-extraction';

const SIDEBAR_WIDTH = 300;

/* ── Color Swatch ── */
function ColorSwatch({ color }: { color: string }) {
  return (
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: 0.5,
        flexShrink: 0,
        border: '1px solid',
        borderColor: 'divider',
        background: color,
      }}
    />
  );
}

/* ── Token Badge ── */
function TokenBadge({ name }: { name: string }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: '0.675rem',
        fontFamily: 'monospace',
        fontWeight: 600,
        color: 'primary.main',
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
        px: 0.75,
        py: 0.125,
        borderRadius: 0.75,
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </Typography>
  );
}

/* ── Property Row ── */
function PropertyRow({ item }: { item: InspectedProperty }) {
  const isLong = item.value.length > 50;
  const display = item.isColor ? formatColor(item.value) : item.value;

  return (
    <Box sx={{ display: 'flex', alignItems: isLong ? 'flex-start' : 'center', gap: 1, py: 0.375, pl: 0.5 }}>
      <Typography
        variant="body2"
        sx={{ fontSize: '0.7rem', color: 'text.secondary', width: 80, flexShrink: 0 }}
      >
        {item.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flex: 1, minWidth: 0, flexWrap: 'wrap' }}>
        {item.isColor && <ColorSwatch color={item.value} />}
        {item.tokenName ? (
          <>
            <TokenBadge name={item.tokenName} />
            <Typography
              variant="body2"
              sx={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'text.disabled' }}
            >
              ({display})
            </Typography>
          </>
        ) : (
          <Typography
            variant="body2"
            title={item.value}
            sx={{
              fontSize: '0.7rem',
              fontFamily: 'monospace',
              color: 'text.primary',
              ...(isLong
                ? { wordBreak: 'break-all', lineHeight: 1.5 }
                : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
            }}
          >
            {display}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/* ── Section (collapsible group) ── */
const SECTION_ICONS: Record<string, string> = {
  Layout: '📐',
  Spacing: '↔',
  Fill: '🎨',
  Stroke: '▭',
  Typography: 'Aa',
  Effects: '✦',
};

function Section({ group, defaultExpanded = true }: { group: InspectedGroup; defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 0.75,
          px: 1,
          '&:hover': { bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03) },
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.7rem', width: 16, textAlign: 'center', opacity: 0.5 }}>
            {SECTION_ICONS[group.label] ?? '•'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3px' }}
          >
            {group.label}
          </Typography>
        </Box>
        <ExpandMoreIcon
          sx={{
            fontSize: 16,
            color: 'text.disabled',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ pl: 3, pr: 1, pb: 1 }}>
          {group.items.map((item, j) => (
            <PropertyRow key={j} item={item} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

/* ── Main Sidebar ── */
export function InspectorSidebar() {
  const { selectedElement, selectedLabel, selectedGroups, clearSelection } = useInspector();
  const isOpen = !!selectedElement;

  return (
    <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          height: '100%',
          borderLeft: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            minHeight: 52,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedLabel ?? 'Inspector'}
            </Typography>
          </Box>
          <IconButton size="small" onClick={clearSelection} sx={{ ml: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Sections */}
        <Box sx={{ flex: 1, overflow: 'auto', py: 0.5 }}>
          {selectedGroups.map((group, i) => (
            <Box key={i}>
              <Section group={group} />
              {i < selectedGroups.length - 1 && <Divider sx={{ mx: 1 }} />}
            </Box>
          ))}
        </Box>

        {/* Footer hint */}
        <Box sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>
            Press <strong>Esc</strong> to deselect · <strong>I</strong> to toggle inspector
          </Typography>
        </Box>
      </Box>
    </Slide>
  );
}

export { SIDEBAR_WIDTH as INSPECTOR_WIDTH };
