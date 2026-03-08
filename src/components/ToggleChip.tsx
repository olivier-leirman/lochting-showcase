import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Box, Chip, type SxProps, type Theme } from '@mui/material';
import { Icon } from './Icon';

/* ─── ToggleChip ─── */

export interface ToggleChipProps {
  /** Chip label text */
  label: string;
  /** Unique value for selection tracking */
  value: string;
  /** Optional count badge shown after the label */
  count?: number;
  /** Material Symbols icon name shown before the label */
  icon?: string;
  /** Whether the chip is currently selected (managed by ToggleChipGroup) */
  selected?: boolean;
  /** Click handler (managed by ToggleChipGroup) */
  onClick?: (value: string) => void;
  /** Additional sx styles */
  sx?: SxProps<Theme>;
}

export function ToggleChip({ label, value, count, icon, selected, onClick, sx }: ToggleChipProps) {
  const displayLabel = count !== undefined ? `${label}  ${count}` : label;

  return (
    <Chip
      label={displayLabel}
      size="medium"
      clickable
      color={selected ? 'primary' : 'secondary'}
      icon={icon ? <Icon name={icon} size={18} /> : undefined}
      onClick={() => onClick?.(value)}
      role="option"
      aria-selected={selected}
      sx={sx}
    />
  );
}

/* ─── ToggleChipGroup ─── */

export interface ToggleChipGroupProps {
  children: ReactNode;
  /** Selected value(s). String for exclusive, string[] for multi-select. */
  value: string | string[];
  /** If true, only one chip can be selected at a time */
  exclusive?: boolean;
  /** Callback when selection changes */
  onChange: (value: string | string[]) => void;
  /** Additional sx styles */
  sx?: SxProps<Theme>;
}

export function ToggleChipGroup({ children, value, exclusive, onChange, sx }: ToggleChipGroupProps) {
  const handleClick = (chipValue: string) => {
    if (exclusive) {
      onChange(chipValue);
    } else {
      const arr = Array.isArray(value) ? value : [value];
      if (arr.includes(chipValue)) {
        onChange(arr.filter((v) => v !== chipValue));
      } else {
        onChange([...arr, chipValue]);
      }
    }
  };

  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && 'value' in child.props) {
      const chipValue = (child as ReactElement<ToggleChipProps>).props.value;
      const isSelected = exclusive
        ? value === chipValue
        : Array.isArray(value) && value.includes(chipValue);
      return cloneElement(child as ReactElement<ToggleChipProps>, {
        selected: isSelected,
        onClick: handleClick,
      });
    }
    return child;
  });

  return (
    <Box
      role="listbox"
      sx={{
        display: 'flex',
        gap: 0.5,
        flexWrap: 'wrap',
        alignItems: 'center',
        ...((sx ?? {}) as Record<string, unknown>),
      }}
    >
      {enhancedChildren}
    </Box>
  );
}
