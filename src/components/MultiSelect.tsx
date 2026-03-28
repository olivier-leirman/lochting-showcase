import { useState, useMemo, useCallback, useRef } from 'react';
import {
  Box,
  TextField,
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Chip,
  InputAdornment,
  Divider,
  Collapse,
  Button,
  IconButton,
} from '@mui/material';
import { Icon } from './Icon';

/* ── Types ── */

export interface MultiSelectOption {
  id: string;
  label: string;
  children?: MultiSelectOption[];
}

export interface MultiSelectProps {
  /** Nested option tree */
  options: MultiSelectOption[];
  /** Currently selected option IDs */
  value: string[];
  /** Callback when selection changes */
  onChange: (selected: string[]) => void;
  /** Placeholder for the trigger field */
  placeholder?: string;
  /** Label for the trigger field */
  label?: string;
  /** Disable the component */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Max chips shown in trigger before collapsing to count */
  maxChips?: number;
  /** Size of the trigger field */
  size?: 'small' | 'medium';
}

/* ── Helpers ── */

/** Collect all leaf IDs from an option tree */
function collectLeafIds(options: MultiSelectOption[]): string[] {
  const ids: string[] = [];
  for (const opt of options) {
    if (opt.children?.length) {
      ids.push(...collectLeafIds(opt.children));
    } else {
      ids.push(opt.id);
    }
  }
  return ids;
}

/** Build a flat lookup map id→label */
function buildLabelMap(options: MultiSelectOption[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const opt of options) {
    map.set(opt.id, opt.label);
    if (opt.children?.length) {
      for (const [k, v] of buildLabelMap(opt.children)) {
        map.set(k, v);
      }
    }
  }
  return map;
}

/** Filter options tree by search query */
function filterOptions(options: MultiSelectOption[], query: string): MultiSelectOption[] {
  if (!query) return options;
  const q = query.toLowerCase();
  const result: MultiSelectOption[] = [];
  for (const opt of options) {
    const labelMatch = opt.label.toLowerCase().includes(q);
    if (opt.children?.length) {
      const filteredChildren = filterOptions(opt.children, query);
      if (labelMatch || filteredChildren.length > 0) {
        result.push({ ...opt, children: labelMatch ? opt.children : filteredChildren });
      }
    } else if (labelMatch) {
      result.push(opt);
    }
  }
  return result;
}

/* ── Sublevel item ── */

interface OptionItemProps {
  option: MultiSelectOption;
  selected: Set<string>;
  onToggle: (id: string, children?: MultiSelectOption[]) => void;
  depth: number;
  search: string;
}

function OptionItem({ option, selected, onToggle, depth, search }: OptionItemProps) {
  const hasChildren = Boolean(option.children?.length);
  const [open, setOpen] = useState(true);

  const childIds = useMemo(
    () => (hasChildren ? collectLeafIds(option.children!) : []),
    [hasChildren, option.children],
  );
  const allChildrenSelected = childIds.length > 0 && childIds.every(id => selected.has(id));
  const someChildrenSelected = childIds.length > 0 && childIds.some(id => selected.has(id)) && !allChildrenSelected;
  const isLeafSelected = !hasChildren && selected.has(option.id);

  return (
    <>
      <ListItemButton
        sx={{ pl: 2 + depth * 2.5, py: 0.5, minHeight: 36 }}
        onClick={() => {
          if (hasChildren) {
            onToggle(option.id, option.children);
          } else {
            onToggle(option.id);
          }
        }}
        dense
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          <Checkbox
            edge="start"
            size="small"
            checked={hasChildren ? allChildrenSelected : isLeafSelected}
            indeterminate={someChildrenSelected}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          primary={option.label}
          primaryTypographyProps={{ fontSize: '0.875rem' }}
        />
        {hasChildren && (
          <IconButton
            size="small"
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            sx={{ p: 0.25 }}
          >
            <Icon name={open ? 'expand_less' : 'expand_more'} size={18} />
          </IconButton>
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open}>
          {option.children!.map(child => (
            <OptionItem
              key={child.id}
              option={child}
              selected={selected}
              onToggle={onToggle}
              depth={depth + 1}
              search={search}
            />
          ))}
        </Collapse>
      )}
    </>
  );
}

/* ── Main component ── */

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  fullWidth = false,
  maxChips = 3,
  size = 'medium',
}: MultiSelectProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedSet = useMemo(() => new Set(value), [value]);
  const labelMap = useMemo(() => buildLabelMap(options), [options]);
  const allLeafIds = useMemo(() => collectLeafIds(options), [options]);
  const filteredOptions = useMemo(() => filterOptions(options, search), [options, search]);

  const handleToggle = useCallback(
    (id: string, children?: MultiSelectOption[]) => {
      const next = new Set(value);
      if (children?.length) {
        // Parent toggle: select/deselect all leaves
        const leafIds = collectLeafIds(children);
        const allSelected = leafIds.every(lid => next.has(lid));
        if (allSelected) {
          leafIds.forEach(lid => next.delete(lid));
        } else {
          leafIds.forEach(lid => next.add(lid));
        }
      } else {
        // Leaf toggle
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      }
      onChange(Array.from(next));
    },
    [value, onChange],
  );

  const handleSelectAll = () => onChange([...allLeafIds]);
  const handleSelectNone = () => onChange([]);

  const allSelected = allLeafIds.length > 0 && allLeafIds.every(id => selectedSet.has(id));

  // Chips to display in trigger
  const displayChips = value.slice(0, maxChips);
  const overflowCount = value.length - maxChips;

  return (
    <Box ref={anchorRef} sx={{ width: fullWidth ? '100%' : 320, display: 'inline-flex' }}>
      {/* Trigger field */}
      <TextField
        label={label}
        placeholder={value.length === 0 ? placeholder : undefined}
        onClick={() => !disabled && setOpen(true)}
        fullWidth
        disabled={disabled}
        size={size}
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: value.length > 0 ? (
              <>
                {displayChips.map(id => (
                  <Chip
                    key={id}
                    label={labelMap.get(id) ?? id}
                    size="small"
                    color="secondary"
                    onDelete={(e) => { e.stopPropagation(); handleToggle(id); }}
                    sx={{ m: '2px' }}
                  />
                ))}
                {overflowCount > 0 && (
                  <Chip label={`+${overflowCount}`} size="small" variant="outlined" sx={{ m: '2px' }} />
                )}
              </>
            ) : undefined,
            endAdornment: (
              <InputAdornment position="end">
                <Icon name={open ? 'expand_less' : 'expand_more'} size={20} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          cursor: 'pointer',
          '& .MuiOutlinedInput-root': {
            cursor: 'pointer',
            paddingRight: '39px !important',
            '&.MuiInputBase-adornedStart': {
              flexWrap: 'wrap',
              padding: '5px 39px 5px 5px !important',
              '& .MuiOutlinedInput-input': {
                padding: '9px 4px 9px 5px',
                minWidth: 0,
                width: 0,
              },
            },
          },
          // Pin chevron to right center, independent of flex wrapping
          '& .MuiInputAdornment-positionEnd': {
            position: 'absolute',
            right: 9,
            top: '50%',
            transform: 'translateY(-50%)',
            m: 0,
          },
        }}
      />

      {/* Dropdown popover */}
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => { setOpen(false); setSearch(''); }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: anchorRef.current?.offsetWidth ?? 320,
              maxHeight: 400,
              mt: 0.5,
              borderRadius: 3,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        {/* Search */}
        <Box sx={{ px: 1.5, pt: 1.5, pb: 1 }}>
          <TextField
            placeholder="Search..."
            size="small"
            fullWidth
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="search" size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Select all / none */}
        <Box sx={{ px: 1.5, pb: 0.5, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="text"
            onClick={handleSelectAll}
            disabled={allSelected}
            sx={{ fontSize: '0.75rem', textTransform: 'none', minWidth: 0 }}
          >
            Select all
          </Button>
          <Button
            size="small"
            variant="text"
            onClick={handleSelectNone}
            disabled={value.length === 0}
            sx={{ fontSize: '0.75rem', textTransform: 'none', minWidth: 0 }}
          >
            Select none
          </Button>
          <Typography
            variant="caption"
            sx={{ ml: 'auto', alignSelf: 'center', color: 'text.secondary' }}
          >
            {value.length} selected
          </Typography>
        </Box>

        <Divider />

        {/* Options list */}
        <List dense sx={{ flex: 1, overflow: 'auto', py: 0.5 }}>
          {filteredOptions.length === 0 ? (
            <Typography sx={{ px: 2, py: 2, color: 'text.secondary', fontSize: '0.875rem' }}>
              No options found
            </Typography>
          ) : (
            filteredOptions.map(opt => (
              <OptionItem
                key={opt.id}
                option={opt}
                selected={selectedSet}
                onToggle={handleToggle}
                depth={0}
                search={search}
              />
            ))
          )}
        </List>
      </Popover>
    </Box>
  );
}
