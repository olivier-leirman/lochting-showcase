import { TextField, InputAdornment, Box, Typography, type TextFieldProps } from '@mui/material';
import { Icon } from './Icon';

export interface SearchFieldProps extends Omit<TextFieldProps, 'variant'> {
  /** Keyboard shortcut label to display (e.g. "⌘ S") */
  shortcut?: string;
}

export function SearchField({ shortcut, placeholder = 'Search...', size = 'small', ...rest }: SearchFieldProps) {
  return (
    <TextField
      placeholder={placeholder}
      size={size}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Icon name="search" size={20} color="inherit" sx={{ opacity: 0.5 }} />
            </InputAdornment>
          ),
          endAdornment: shortcut ? (
            <InputAdornment position="end">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.25,
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    color: 'text.secondary',
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}
                >
                  {shortcut}
                </Typography>
              </Box>
            </InputAdornment>
          ) : undefined,
        },
      }}
      {...rest}
    />
  );
}
