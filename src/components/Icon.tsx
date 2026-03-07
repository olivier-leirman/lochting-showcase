import { Box, type SxProps, type Theme } from '@mui/material';

export interface IconProps {
  /** The Material Symbols icon name, e.g. "search", "notifications", "add" */
  name: string;
  /** Size in pixels (default: 24) */
  size?: number;
  /** Color — accepts any CSS color or MUI theme color path */
  color?: string;
  /** Whether the icon is filled (default: false = outline) */
  filled?: boolean;
  /** Additional sx styles */
  sx?: SxProps<Theme>;
}

export function Icon({ name, size = 24, color, filled = false, sx }: IconProps) {
  return (
    <Box
      component="span"
      className="material-symbols-rounded"
      sx={{
        fontFamily: '"Material Symbols Rounded"',
        fontWeight: 200,
        fontStyle: 'normal',
        fontSize: size,
        lineHeight: 1,
        letterSpacing: 'normal',
        textTransform: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        direction: 'ltr',
        WebkitFontSmoothing: 'antialiased',
        fontFeatureSettings: '"liga"',
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 200, 'GRAD' 0, 'opsz' ${size}`,
        color: color ?? 'inherit',
        width: size,
        height: size,
        ...((sx ?? {}) as Record<string, unknown>),
      }}
    >
      {name}
    </Box>
  );
}
