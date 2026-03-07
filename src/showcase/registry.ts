import type { ReactNode } from 'react';

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
  category: 'inputs' | 'data-display' | 'navigation';
  importStatement: string;
  examples: ComponentExample[];
  props: ComponentProp[];
}

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
