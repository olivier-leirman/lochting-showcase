import { resolveToken, type TokenMap } from '../../theme/token-resolver';

/* ── Types ── */

export interface InspectedProperty {
  name: string;
  value: string;
  tokenName?: string;
  isColor?: boolean;
}

export interface InspectedGroup {
  label: string;
  items: InspectedProperty[];
}

/* ── Skip lists ── */

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

/* ── Helpers ── */

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

export function formatColor(value: string): string {
  const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (!m) return value;
  const [, r, g, b, a] = m;
  const hex = `#${[r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
  if (a !== undefined && parseFloat(a) < 1) {
    return `${hex} / ${Math.round(parseFloat(a) * 100)}%`;
  }
  return hex;
}

/* ── Element label extraction ── */

export function getElementLabel(el: Element): string | null {
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

/** Find the nearest MUI root element from a target, within a container */
export function findMuiElement(target: Element, container: Element): Element | null {
  let el: Element | null = target;
  while (el && el !== container) {
    if (getElementLabel(el)) return el;
    el = el.parentElement;
  }
  return null;
}

/* ── Style extraction with token resolution ── */

export function extractStyleGroups(el: Element, tokenMap?: TokenMap): InspectedGroup[] {
  const s = window.getComputedStyle(el);
  const groups: InspectedGroup[] = [];

  const resolve = (value: string) => tokenMap ? resolveToken(value, tokenMap) ?? undefined : undefined;

  // ─ Layout ─
  {
    const items: InspectedProperty[] = [];
    const display = s.display;
    if (display) items.push({ name: 'Display', value: display });
    if (s.height && s.height !== '0px' && s.height !== 'auto')
      items.push({ name: 'Height', value: s.height, tokenName: resolve(s.height) });
    if (s.width && s.width !== '0px' && s.width !== 'auto') {
      const isInline = display.includes('inline');
      items.push({ name: 'Width', value: isInline ? `fit-content (${s.width})` : s.width, tokenName: resolve(s.width) });
    }
    if (s.minWidth && s.minWidth !== '0px' && s.minWidth !== 'auto')
      items.push({ name: 'Min width', value: s.minWidth });
    if (s.maxWidth && s.maxWidth !== 'none')
      items.push({ name: 'Max width', value: s.maxWidth });
    if (items.length) groups.push({ label: 'Layout', items });
  }

  // ─ Spacing ─
  {
    const items: InspectedProperty[] = [];
    const padding = formatShorthand(s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft);
    if (padding !== '0px') items.push({ name: 'Padding', value: padding, tokenName: resolve(padding) });
    const margin = formatShorthand(s.marginTop, s.marginRight, s.marginBottom, s.marginLeft);
    if (margin !== '0px') items.push({ name: 'Margin', value: margin, tokenName: resolve(margin) });
    if (s.gap && s.gap !== 'normal' && s.gap !== '0px')
      items.push({ name: 'Gap', value: s.gap, tokenName: resolve(s.gap) });
    if (items.length) groups.push({ label: 'Spacing', items });
  }

  // ─ Fill ─
  {
    const items: InspectedProperty[] = [];
    const bg = s.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent')
      items.push({ name: 'Background', value: bg, isColor: true, tokenName: resolve(bg) });
    const grad = s.backgroundImage;
    if (grad && grad !== 'none')
      items.push({ name: 'Gradient', value: grad, isColor: true, tokenName: resolve(grad) });
    if (items.length) groups.push({ label: 'Fill', items });
  }

  // ─ Stroke ─
  {
    const items: InspectedProperty[] = [];
    const radius = formatShorthand(
      s.borderTopLeftRadius, s.borderTopRightRadius,
      s.borderBottomRightRadius, s.borderBottomLeftRadius,
    );
    if (radius !== '0px') items.push({ name: 'Radius', value: radius, tokenName: resolve(radius) });
    if (s.borderTopStyle !== 'none' && s.borderTopWidth !== '0px') {
      const bw = formatShorthand(
        s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth,
      );
      items.push({ name: 'Width', value: bw });
      items.push({ name: 'Style', value: s.borderTopStyle });
      items.push({ name: 'Color', value: s.borderTopColor, isColor: true, tokenName: resolve(s.borderTopColor) });
    }
    if (items.length) groups.push({ label: 'Stroke', items });
  }

  // ─ Typography ─
  {
    const items: InspectedProperty[] = [];
    if (s.fontFamily) {
      const primary = s.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
      items.push({ name: 'Font', value: primary });
    }
    if (s.fontSize) items.push({ name: 'Size', value: s.fontSize, tokenName: resolve(s.fontSize) });
    if (s.fontWeight) items.push({ name: 'Weight', value: s.fontWeight, tokenName: resolve(s.fontWeight) });
    if (s.lineHeight) items.push({ name: 'Line height', value: s.lineHeight });
    if (s.letterSpacing && s.letterSpacing !== 'normal')
      items.push({ name: 'Letter spacing', value: s.letterSpacing });
    if (s.textTransform && s.textTransform !== 'none')
      items.push({ name: 'Transform', value: s.textTransform });
    if (s.color) items.push({ name: 'Color', value: s.color, isColor: true, tokenName: resolve(s.color) });
    if (items.length) groups.push({ label: 'Typography', items });
  }

  // ─ Effects ─
  {
    const items: InspectedProperty[] = [];
    if (s.boxShadow && s.boxShadow !== 'none')
      items.push({ name: 'Box shadow', value: s.boxShadow, tokenName: resolve(s.boxShadow) });
    if (s.opacity !== '1') items.push({ name: 'Opacity', value: s.opacity });
    if (s.filter && s.filter !== 'none') items.push({ name: 'Filter', value: s.filter });
    if (items.length) groups.push({ label: 'Effects', items });
  }

  return groups;
}
