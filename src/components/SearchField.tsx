import { forwardRef, useEffect, useRef, useCallback } from 'react';
import { TextField, InputAdornment, Box, Typography, type TextFieldProps } from '@mui/material';
import { Icon } from './Icon';

export interface SearchFieldProps extends Omit<TextFieldProps, 'variant'> {
  /** Keyboard shortcut label to display (e.g. "⌘ S") */
  shortcut?: string;
  /** Register a global keyboard shortcut that focuses this field.
   *  Format: modifier+key, e.g. "meta+s", "meta+k", "ctrl+k" */
  globalShortcut?: string;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField({ shortcut, globalShortcut, placeholder = 'Search...', size = 'small', ...rest }, forwardedRef) {
    const internalRef = useRef<HTMLInputElement>(null);
    // Use forwarded ref if provided, otherwise internal
    const inputRef = (forwardedRef as React.RefObject<HTMLInputElement>) || internalRef;

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (!globalShortcut) return;
      const [mod, key] = globalShortcut.toLowerCase().split('+');
      const modMatch =
        (mod === 'meta' && e.metaKey) ||
        (mod === 'ctrl' && e.ctrlKey) ||
        (mod === 'alt' && e.altKey);
      if (modMatch && e.key.toLowerCase() === key) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }, [globalShortcut, inputRef]);

    useEffect(() => {
      if (!globalShortcut) return;
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [globalShortcut, handleKeyDown]);

    return (
      <TextField
        inputRef={inputRef}
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
  },
);
