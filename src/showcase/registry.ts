import type { ReactNode } from 'react';

export type ImplementationLayer = 'mui' | 'base';

export interface ComponentExample {
  name: string;
  code: string;
  render: () => ReactNode;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  description: string;
  category: 'actions' | 'inputs' | 'data-display' | 'feedback' | 'surfaces' | 'navigation';
  importStatement: string;
  examples: ComponentExample[];
  props: ComponentProp[];
  /** Which layer this registration belongs to */
  layer?: ImplementationLayer;
}

/**
 * A unified component entry that may have MUI, Base UI, or both implementations.
 */
export interface UnifiedComponent {
  /** Canonical ID (e.g. 'button', not 'bw-button') */
  id: string;
  /** Display name without [Base]/[MUI] suffix */
  name: string;
  description: string;
  category: ComponentDoc['category'];
  /** Which implementations are available */
  implementations: Partial<Record<ImplementationLayer, ComponentDoc>>;
  /** Available layers */
  layers: ImplementationLayer[];
}

// ── Raw registry (all individual registrations) ──

export const COMPONENT_REGISTRY: ComponentDoc[] = [];

export function registerComponent(doc: ComponentDoc) {
  const idx = COMPONENT_REGISTRY.findIndex(d => d.id === doc.id);
  if (idx >= 0) COMPONENT_REGISTRY[idx] = doc;
  else COMPONENT_REGISTRY.push(doc);
}

export function getComponent(id: string): ComponentDoc | undefined {
  return COMPONENT_REGISTRY.find(d => d.id === id);
}

export function getComponentsByCategory(cat: string): ComponentDoc[] {
  return COMPONENT_REGISTRY.filter(d => d.category === cat);
}

// ── Base UI → MUI ID mapping ──

const BASE_TO_MUI_MAP: Record<string, string> = {
  'bw-button': 'button',
  'bw-card': 'card',
  'bw-input': 'textfield',
  'bw-checkbox': 'checkbox',
  'bw-switch': 'switch',
  'bw-chip': 'chip',
  'bw-alert': 'alert',
  'bw-select': 'select',
  'bw-tabs': 'tabs',
  'bw-dialog': 'dialog',
};

// ── Unified registry (computed from raw registrations) ──

let _unifiedCache: UnifiedComponent[] | null = null;

/**
 * Returns the unified component list where MUI + Base UI pairs are merged
 * into a single entry. Call after all registrations are done.
 */
export function getUnifiedRegistry(): UnifiedComponent[] {
  if (_unifiedCache) return _unifiedCache;

  const map = new Map<string, UnifiedComponent>();

  for (const doc of COMPONENT_REGISTRY) {
    const isBase = doc.id.startsWith('bw-');
    const layer: ImplementationLayer = doc.layer ?? (isBase ? 'base' : 'mui');
    const canonicalId = isBase ? (BASE_TO_MUI_MAP[doc.id] ?? doc.id) : doc.id;
    // Clean name: remove [Base] or [MUI] suffix
    const cleanName = doc.name.replace(/\s*\[(Base|MUI)\]\s*$/i, '');

    const existing = map.get(canonicalId);
    if (existing) {
      existing.implementations[layer] = doc;
      if (!existing.layers.includes(layer)) existing.layers.push(layer);
      // Prefer MUI description/name if available (it's usually more complete)
      if (layer === 'mui') {
        existing.name = cleanName;
        existing.description = doc.description;
      }
    } else {
      map.set(canonicalId, {
        id: canonicalId,
        name: cleanName,
        description: doc.description,
        category: doc.category,
        implementations: { [layer]: doc },
        layers: [layer],
      });
    }
  }

  _unifiedCache = Array.from(map.values());
  return _unifiedCache;
}

/** Invalidate the unified cache (call if registrations change at runtime) */
export function invalidateUnifiedCache() {
  _unifiedCache = null;
}

/** Get a unified component by canonical ID */
export function getUnifiedComponent(id: string): UnifiedComponent | undefined {
  return getUnifiedRegistry().find(c => c.id === id);
}
