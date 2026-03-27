import { useState } from 'react';
import { Box, Typography, Collapse, IconButton, alpha } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/* ── Types ── */

interface PropertyItem {
  name: string;
  value: string;
  isColor?: boolean;
}

interface PropertyGroup {
  label: string;
  items: PropertyItem[];
}

export interface ExtractedElement {
  label: string;
  groups: PropertyGroup[];
}

/* ── Extraction helpers ── */

const BASE_SKIP = new Set([
  'ButtonBase', 'InputBase', 'FormControl', 'FormGroup', 'FormLabel',
  'FormHelperText', 'InputAdornment', 'Backdrop', 'Modal', 'Popper',
  'Popover', 'SvgIcon', 'Ripple', 'TouchRipple', 'Typography',
  'ListItemText', 'ListItemIcon', 'ListItemSecondaryAction',
]);

const LAYOUT_SKIP = new Set([
  'Box', 'Stack', 'Grid', 'Grid2', 'Container', 'Toolbar',
]);

const MODIFIER_SKIP = new Set([
  'root', 'focusVisible', 'disabled', 'error', 'fullWidth',
  'hiddenLabel', 'adornedStart', 'adornedEnd', 'notchedOutline',
  'input', 'select', 'icon', 'placeholder', 'multiline', 'animated',
  'positionEnd', 'positionStart', 'action', 'content', 'label',
  'startDecorator', 'endDecorator', 'wrapper', 'track', 'thumb',
  'switchBase', 'checked', 'focusHighlight', 'expanded', 'region',
  'vertical', 'horizontal',
]);

const MAX_ELEMENTS = 20;

function getVisibleText(el: Element): string {
  let text = '';
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? '';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const child = node as Element;
      const cls = child.className ?? '';
      if (
        typeof cls === 'string' &&
        (cls.includes('MuiSvgIcon') || cls.includes('material-symbols') || cls.includes('MuiIcon-root'))
      ) return;
      text += getVisibleText(child);
    }
  });
  return text.trim().replace(/\s+/g, ' ');
}

function formatShorthand(a: string, b: string, c: string, d: string): string {
  if (a === b && b === c && c === d) return a;
  if (a === c && b === d) return `${a} ${b}`;
  if (b === d) return `${a} ${b} ${c}`;
  return `${a} ${b} ${c} ${d}`;
}

function formatColor(value: string): string {
  const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (!m) return value;
  const [, r, g, b, a] = m;
  const hex = `#${[r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
  if (a !== undefined && parseFloat(a) < 1) {
    return `${hex} / ${Math.round(parseFloat(a) * 100)}%`;
  }
  return hex;
}

function getElementLabel(el: Element): string | null {
  const classes = Array.from(el.classList);
  const rootClasses = classes.filter(c => c.endsWith('-root') && c.startsWith('Mui'));
  if (!rootClasses.length) return null;

  const names = rootClasses
    .map(c => c.match(/^Mui(\w+)-root$/)?.[1] ?? '')
    .filter(Boolean);
  const specific = names.filter(n => !BASE_SKIP.has(n) && !LAYOUT_SKIP.has(n));
  const name = specific[0] ?? names.find(n => !LAYOUT_SKIP.has(n));
  if (!name) return null;

  const prefix = `Mui${name}-`;
  const mods: string[] = [];

  for (const cls of classes) {
    if (!cls.startsWith(prefix)) continue;
    const mod = cls.substring(prefix.length);
    if (MODIFIER_SKIP.has(mod)) continue;

    if (mod.startsWith('size')) {
      mods.push(mod.charAt(4).toLowerCase() + mod.slice(5));
    } else if (mod.startsWith('color')) {
      mods.push(mod.charAt(5).toLowerCase() + mod.slice(6));
    } else if (
      /^(contained|outlined|text|filled|standard)(Primary|Secondary|Success|Error|Warning|Info)?$/.test(mod)
    ) {
      const parts = mod.match(/^(contained|outlined|text|filled|standard)(\w*)$/);
      if (parts?.[1]) mods.push(parts[1]);
      if (parts?.[2]) mods.push(parts[2].toLowerCase());
    } else if (/^(elevation\d|rounded|square|dense|small|medium|large|head|body|footer)$/.test(mod)) {
      mods.push(mod);
    }
  }

  const textContent = getVisibleText(el).slice(0, 24);
  const parts = [name, ...new Set(mods)];
  let label = parts.join(' · ');
  if (textContent && textContent.length > 1 && textContent.length <= 24) {
    label += ` — "${textContent}"`;
  }

  return label;
}

function extractStyleGroups(el: Element): PropertyGroup[] {
  const s = window.getComputedStyle(el);
  const groups: PropertyGroup[] = [];

  // ─ Spacing ─
  {
    const items: PropertyItem[] = [];
    const padding = formatShorthand(s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft);
    if (padding !== '0px') items.push({ name: 'Padding', value: padding });
    const margin = formatShorthand(s.marginTop, s.marginRight, s.marginBottom, s.marginLeft);
    if (margin !== '0px') items.push({ name: 'Margin', value: margin });
    if (s.gap && s.gap !== 'normal' && s.gap !== '0px') items.push({ name: 'Gap', value: s.gap });
    if (items.length) groups.push({ label: 'Spacing', items });
  }

  // ─ Size ─
  {
    const items: PropertyItem[] = [];
    const display = s.display;
    const isInline = display.includes('inline');
    if (s.height && s.height !== '0px' && s.height !== 'auto')
      items.push({ name: 'Height', value: s.height });
    if (s.width && s.width !== '0px' && s.width !== 'auto') {
      items.push({ name: 'Width', value: isInline ? `fit-content (${s.width})` : s.width });
    }
    if (s.minWidth && s.minWidth !== '0px' && s.minWidth !== 'auto')
      items.push({ name: 'Min width', value: s.minWidth });
    if (s.maxWidth && s.maxWidth !== 'none')
      items.push({ name: 'Max width', value: s.maxWidth });
    if (display) items.push({ name: 'Display', value: display });
    if (items.length) groups.push({ label: 'Size', items });
  }

  // ─ Colors ─
  {
    const items: PropertyItem[] = [];
    if (s.color) items.push({ name: 'Text', value: s.color, isColor: true });
    const bg = s.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent')
      items.push({ name: 'Background', value: bg, isColor: true });
    const grad = s.backgroundImage;
    if (grad && grad !== 'none') items.push({ name: 'Gradient', value: grad, isColor: true });
    if (items.length) groups.push({ label: 'Colors', items });
  }

  // ─ Border ─
  {
    const items: PropertyItem[] = [];
    const radius = formatShorthand(
      s.borderTopLeftRadius, s.borderTopRightRadius,
      s.borderBottomRightRadius, s.borderBottomLeftRadius,
    );
    if (radius !== '0px') items.push({ name: 'Radius', value: radius });
    if (s.borderTopStyle !== 'none' && s.borderTopWidth !== '0px') {
      const bw = formatShorthand(
        s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth,
      );
      items.push({ name: 'Width', value: bw });
      items.push({ name: 'Style', value: s.borderTopStyle });
      items.push({ name: 'Color', value: s.borderTopColor, isColor: true });
    }
    if (items.length) groups.push({ label: 'Border', items });
  }

  // ─ Effects ─
  {
    const items: PropertyItem[] = [];
    if (s.boxShadow && s.boxShadow !== 'none')
      items.push({ name: 'Box shadow', value: s.boxShadow });
    if (s.opacity !== '1') items.push({ name: 'Opacity', value: s.opacity });
    if (s.filter && s.filter !== 'none') items.push({ name: 'Filter', value: s.filter });
    if (items.length) groups.push({ label: 'Effects', items });
  }

  // ─ Typography ─
  {
    const items: PropertyItem[] = [];
    if (s.fontFamily) {
      const primary = s.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
      items.push({ name: 'Font', value: primary });
    }
    if (s.fontSize) items.push({ name: 'Size', value: s.fontSize });
    if (s.fontWeight) items.push({ name: 'Weight', value: s.fontWeight });
    if (s.lineHeight) items.push({ name: 'Line height', value: s.lineHeight });
    if (s.letterSpacing && s.letterSpacing !== 'normal')
      items.push({ name: 'Letter spacing', value: s.letterSpacing });
    if (s.textTransform && s.textTransform !== 'none')
      items.push({ name: 'Transform', value: s.textTransform });
    if (items.length) groups.push({ label: 'Typography', items });
  }

  return groups;
}

export function extractProperties(container: HTMLElement): ExtractedElement[] {
  const all = container.querySelectorAll('[class*="Mui"][class*="-root"]');
  const results: ExtractedElement[] = [];
  const seen = new Set<Element>();

  all.forEach(el => {
    if (seen.has(el) || results.length >= MAX_ELEMENTS) return;
    const label = getElementLabel(el);
    if (!label) return;
    seen.add(el);
    results.push({ label, groups: extractStyleGroups(el) });
  });

  return results;
}

/* ── Display Components ── */

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

function PropertyRow({ item }: { item: PropertyItem }) {
  const isLong = item.value.length > 60;
  const display = item.isColor ? formatColor(item.value) : item.value;

  return (
    <Box sx={{ display: 'flex', alignItems: isLong ? 'flex-start' : 'center', gap: 1, py: 0.25, pl: 1 }}>
      <Typography
        variant="body2"
        sx={{ fontSize: '0.75rem', color: 'text.secondary', width: 110, flexShrink: 0 }}
      >
        {item.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, flex: 1, minWidth: 0 }}>
        {item.isColor && <ColorSwatch color={item.value} />}
        <Typography
          variant="body2"
          title={item.value}
          sx={{
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            color: 'text.primary',
            ...(isLong
              ? { wordBreak: 'break-all', lineHeight: 1.5 }
              : { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
          }}
        >
          {display}
        </Typography>
      </Box>
    </Box>
  );
}

function ElementCard({ element, defaultExpanded }: { element: ExtractedElement; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, overflow: 'hidden' }}>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          cursor: 'pointer',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) },
          transition: 'background-color 0.15s',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {element.label}
        </Typography>
        <IconButton
          size="small"
          sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
        >
          <ExpandMoreIcon fontSize="small" />
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {element.groups.map((group, i) => (
            <Box key={i}>
              <Typography
                variant="overline"
                sx={{ fontSize: '0.65rem', color: 'text.disabled', letterSpacing: 1.5, lineHeight: 2 }}
              >
                {group.label}
              </Typography>
              {group.items.map((item, j) => (
                <PropertyRow key={j} item={item} />
              ))}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export function PropertiesPanel({ elements }: { elements: ExtractedElement[] }) {
  if (elements.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No component elements detected. View the Preview tab first.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="caption" sx={{ color: 'text.disabled', px: 0.5 }}>
        {elements.length} element{elements.length !== 1 ? 's' : ''} detected
      </Typography>
      {elements.map((el, i) => (
        <ElementCard key={i} element={el} defaultExpanded={elements.length <= 4} />
      ))}
    </Box>
  );
}
