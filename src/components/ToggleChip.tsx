import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { Icon } from './Icon';
import { useBrand } from '../theme/brand-context';
import { createEffects } from '../theme/tokens/effects';
import { PRIMITIVES } from '../theme/tokens/primitives';

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
  const { brand } = useBrand();
  const c = brand.colors;
  const fx = createEffects(brand);

  return (
    <Box
      component="button"
      role="option"
      aria-selected={selected}
      onClick={() => onClick?.(value)}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        height: 'auto',
        borderRadius: `${PRIMITIVES.radius.round}px`,
        px: 1.5,
        py: 0.5,
        cursor: 'pointer',
        fontFamily: brand.typography.bodyFont,
        fontSize: PRIMITIVES.fontSize.sm,
        fontWeight: PRIMITIVES.fontWeight.regular,
        letterSpacing: '0.4px',
        lineHeight: '24px',
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.15s ease',
        ...(selected
          ? {
              backgroundColor: c.brand100,
              color: c.brand450,
              border: `1px solid ${c.brand100}`,
              boxShadow: fx.shadows.chipBrand,
            }
          : {
              background: fx.gradients.secondary,
              color: c.contentSecondary,
              border: `1px solid ${c.borderDefault}`,
              boxShadow: [
                'inset 0px 4px 4px 0px rgba(252, 252, 255, 0.12)',
                'inset 0px -4px 4px 0px rgba(158, 157, 160, 0.08)',
              ].join(', '),
            }),
        '&:hover': {
          filter: selected ? 'brightness(0.97)' : 'brightness(0.98)',
        },
        ...((sx ?? {}) as Record<string, unknown>),
      }}
    >
      {icon && (
        <Icon
          name={icon}
          size={18}
          color={selected ? c.brand450 : c.contentSecondary}
        />
      )}
      <Box component="span" sx={{ px: 1 }}>{label}</Box>
      {count !== undefined && (
        <Box component="span" sx={{ pr: 0.5 }}>{count}</Box>
      )}
    </Box>
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
