import { useState, useCallback, useRef, useMemo, type ReactNode, type MouseEvent } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Menu,
  Checkbox,
  Typography,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Icon } from './Icon';

/* ── Types ── */

export type SortDirection = 'asc' | 'desc' | null;

export interface ColumnDef<T = Record<string, unknown>> {
  /** Unique column key */
  id: string;
  /** Header label */
  label: string;
  /** Minimum width in px */
  minWidth?: number;
  /** Default width in px */
  width?: number;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is filterable */
  filterable?: boolean;
  /** Custom cell renderer */
  renderCell?: (row: T) => ReactNode;
  /** Accessor for the raw value (used for sorting/filtering) */
  getValue?: (row: T) => string | number;
  /** Text align */
  align?: 'left' | 'center' | 'right';
}

export interface RowAction<T = Record<string, unknown>> {
  icon: string;
  label: string;
  onClick: (row: T) => void;
  color?: string;
}

export interface AdvancedTableProps<T = Record<string, unknown>> {
  columns: ColumnDef<T>[];
  rows: T[];
  /** Unique key accessor for each row */
  getRowId: (row: T) => string | number;
  /** Fixed actions column on the right */
  actions?: RowAction<T>[];
  /** Enable row selection checkboxes */
  selectable?: boolean;
  /** Dense padding */
  dense?: boolean;
  /** Elevated card wrapper with shadow */
  elevated?: boolean;
}

/* ── Column Resize Handle ── */

function ResizeHandle({ onResize }: { onResize: (delta: number) => void }) {
  const startX = useRef(0);

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startX.current = e.clientX;

    const handleMouseMove = (me: globalThis.MouseEvent) => {
      const delta = me.clientX - startX.current;
      startX.current = me.clientX;
      onResize(delta);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <Box
      onMouseDown={handleMouseDown}
      sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 6,
        cursor: 'col-resize',
        '&:hover': { bgcolor: 'primary.main', opacity: 0.3 },
        zIndex: 1,
      }}
    />
  );
}

/* ── Filter Popover ── */

function ColumnFilter({
  anchorEl,
  onClose,
  filterValue,
  onFilterChange,
  columnLabel,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  columnLabel: string;
}) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <Box sx={{ px: 2, py: 1, minWidth: 220 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Filter: {columnLabel}
        </Typography>
        <TextField
          size="small"
          fullWidth
          autoFocus
          placeholder="Type to filter..."
          value={filterValue}
          onChange={e => onFilterChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="filter_list" size={16} />
                </InputAdornment>
              ),
              endAdornment: filterValue ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onFilterChange('')} aria-label="Clear filter">
                    <Icon name="close" size={14} />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />
      </Box>
    </Menu>
  );
}

/* ── Main Component ── */

export function AdvancedTable<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowId,
  actions,
  selectable = false,
  dense = false,
  elevated = false,
}: AdvancedTableProps<T>) {
  // Column widths state
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach(col => {
      widths[col.id] = col.width ?? 150;
    });
    return widths;
  });

  // Sort state
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  // Filter state
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [filterColId, setFilterColId] = useState<string | null>(null);

  // Selection state
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  // Resize handler
  const handleResize = useCallback((colId: string, delta: number) => {
    setColWidths(prev => ({
      ...prev,
      [colId]: Math.max((columns.find(c => c.id === colId)?.minWidth ?? 60), (prev[colId] ?? 150) + delta),
    }));
  }, [columns]);

  // Sort handler
  const handleSort = (colId: string) => {
    if (sortCol === colId) {
      setSortDir(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortCol(null);
    } else {
      setSortCol(colId);
      setSortDir('asc');
    }
  };

  // Filter handler
  const handleFilterClick = (e: MouseEvent<HTMLElement>, colId: string) => {
    e.stopPropagation();
    setFilterAnchor(e.currentTarget);
    setFilterColId(colId);
  };

  // Process rows: filter → sort
  const processedRows = useMemo(() => {
    let result = [...rows];

    // Apply filters
    Object.entries(filters).forEach(([colId, filterVal]) => {
      if (!filterVal) return;
      const col = columns.find(c => c.id === colId);
      if (!col) return;
      const q = filterVal.toLowerCase();
      result = result.filter(row => {
        const val = col.getValue ? col.getValue(row) : (row[colId] ?? '');
        return String(val).toLowerCase().includes(q);
      });
    });

    // Apply sort
    if (sortCol && sortDir) {
      const col = columns.find(c => c.id === sortCol);
      if (col) {
        result.sort((a, b) => {
          const aVal = col.getValue ? col.getValue(a) : (a[sortCol] ?? '');
          const bVal = col.getValue ? col.getValue(b) : (b[sortCol] ?? '');
          const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
          return sortDir === 'asc' ? cmp : -cmp;
        });
      }
    }

    return result;
  }, [rows, filters, sortCol, sortDir, columns]);

  // Selection helpers
  const allSelected = processedRows.length > 0 && processedRows.every(r => selected.has(getRowId(r)));
  const someSelected = processedRows.some(r => selected.has(getRowId(r))) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(processedRows.map(r => getRowId(r))));
    }
  };

  const handleSelectRow = (id: string | number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Active filters indicator */}
      {activeFilterCount > 0 && (
        <Box sx={{ mb: 1, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="caption" color="text.secondary">Active filters:</Typography>
          {Object.entries(filters).filter(([, v]) => v).map(([colId, val]) => {
            const col = columns.find(c => c.id === colId);
            return (
              <Chip
                key={colId}
                label={`${col?.label}: "${val}"`}
                size="small"
                color="secondary"
                onDelete={() => setFilters(prev => ({ ...prev, [colId]: '' }))}
              />
            );
          })}
          <Chip
            label="Clear all"
            size="small"
            variant="outlined"
            onClick={() => setFilters({})}
          />
        </Box>
      )}

      <TableContainer component={Paper} sx={{
        overflow: 'auto',
        ...(elevated && {
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.04)',
          borderRadius: 3,
          border: 'none',
        }),
      }}>
        <Table size={dense ? 'small' : 'medium'} sx={{ tableLayout: 'fixed', minWidth: 'max-content' }}>
          <TableHead>
            <TableRow>
              {/* Selection checkbox */}
              {selectable && (
                <TableCell padding="checkbox" sx={{ width: 48 }}>
                  <Checkbox
                    size="small"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}

              {/* Data columns */}
              {columns.map(col => (
                <TableCell
                  key={col.id}
                  align={col.align ?? 'left'}
                  sx={{
                    width: colWidths[col.id],
                    minWidth: col.minWidth ?? 60,
                    position: 'relative',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* Sort button */}
                    {col.sortable !== false && (
                      <Tooltip title="Sort">
                        <IconButton
                          size="small"
                          onClick={() => handleSort(col.id)}
                          aria-label={`Sort by ${col.label}`}
                          sx={{
                            width: 24,
                            height: 24,
                          }}
                        >
                          <Icon
                            name={
                              sortCol === col.id && sortDir === 'desc'
                                ? 'arrow_downward'
                                : 'arrow_upward'
                            }
                            size={14}
                          />
                        </IconButton>
                      </Tooltip>
                    )}

                    {/* Label */}
                    <Typography
                      variant="inherit"
                      sx={{
                        flex: 1,
                        cursor: col.sortable !== false ? 'pointer' : 'default',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      onClick={() => col.sortable !== false && handleSort(col.id)}
                    >
                      {col.label}
                    </Typography>

                    {/* Filter button */}
                    {col.filterable !== false && (
                      <Tooltip title="Filter">
                        <IconButton
                          size="small"
                          onClick={e => handleFilterClick(e, col.id)}
                          aria-label={`Filter ${col.label}`}
                          sx={{
                            width: 24,
                            height: 24,
                            color: filters[col.id] ? 'primary.main' : undefined,
                          }}
                        >
                          <Icon name="filter_list" size={14} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>

                  {/* Resize handle */}
                  <ResizeHandle onResize={delta => handleResize(col.id, delta)} />
                </TableCell>
              ))}

              {/* Actions column */}
              {actions && actions.length > 0 && (
                <TableCell
                  align="center"
                  sx={{
                    width: actions.length * 40 + 16,
                    position: 'sticky',
                    right: 0,
                    zIndex: 3,
                    borderLeft: '1px solid',
                    borderLeftColor: 'divider',
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {processedRows.map(row => {
              const rowId = getRowId(row);
              const isSelected = selected.has(rowId);

              return (
                <TableRow key={rowId} hover selected={isSelected}>
                  {/* Selection checkbox */}
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowId)}
                      />
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {columns.map(col => (
                    <TableCell
                      key={col.id}
                      align={col.align ?? 'left'}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col.renderCell
                        ? col.renderCell(row)
                        : String(row[col.id] ?? '')}
                    </TableCell>
                  ))}

                  {/* Actions cell */}
                  {actions && actions.length > 0 && (
                    <TableCell
                      align="center"
                      sx={{
                        position: 'sticky',
                        right: 0,
                        zIndex: 1,
                        bgcolor: 'background.paper',
                        borderLeft: '1px solid',
                        borderLeftColor: 'divider',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        {actions.map(action => (
                          <Tooltip key={action.label} title={action.label}>
                            <IconButton
                              size="small"
                              onClick={() => action.onClick(row)}
                              aria-label={action.label}
                              sx={{ width: 32, height: 32, color: action.color }}
                            >
                              <Icon name={action.icon} size={18} />
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}

            {processedRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography color="text.secondary">No data to display</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Filter menu */}
      {filterColId && (
        <ColumnFilter
          anchorEl={filterAnchor}
          onClose={() => { setFilterAnchor(null); setFilterColId(null); }}
          filterValue={filters[filterColId] ?? ''}
          onFilterChange={val => setFilters(prev => ({ ...prev, [filterColId]: val }))}
          columnLabel={columns.find(c => c.id === filterColId)?.label ?? ''}
        />
      )}
    </Box>
  );
}
