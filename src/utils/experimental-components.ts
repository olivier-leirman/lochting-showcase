/**
 * Experimental Components — localStorage CRUD
 *
 * Manages draft components that have been "accepted" from the Playground
 * but not yet permanently committed to register-components.tsx.
 */

export type ExperimentalStatus = 'draft' | 'review' | 'accepted';

export interface ExperimentalComponent {
  id: string;
  name: string;
  description: string;
  category: 'actions' | 'inputs' | 'data-display' | 'feedback' | 'surfaces' | 'navigation';
  status: ExperimentalStatus;
  /** The registry component ID this experiment is based on */
  sourceComponentId: string;
  /** Playground session that originated this experiment */
  originSessionId?: string;
  /** Brand context when accepted */
  brandId: string;
  /** Style definition ID when accepted (null = brand default) */
  styleDefinitionId: string | null;
  /** Designer notes */
  notes: string[];
  /** ISO timestamp */
  createdAt: string;
  updatedAt: string;
  /** Optional tags for organizing */
  tags: string[];
}

const STORAGE_KEY = 'bw-experimental-components';

export function loadExperimentalComponents(): ExperimentalComponent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getExperimentalComponent(id: string): ExperimentalComponent | null {
  return loadExperimentalComponents().find((c) => c.id === id) ?? null;
}

export function saveExperimentalComponent(component: ExperimentalComponent): void {
  const existing = loadExperimentalComponents();
  const idx = existing.findIndex((c) => c.id === component.id);
  component.updatedAt = new Date().toISOString();
  if (idx >= 0) {
    existing[idx] = component;
  } else {
    existing.push(component);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function deleteExperimentalComponent(id: string): void {
  const existing = loadExperimentalComponents().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function updateExperimentalStatus(id: string, status: ExperimentalStatus): void {
  const component = getExperimentalComponent(id);
  if (component) {
    component.status = status;
    saveExperimentalComponent(component);
  }
}

export function createExperimentalComponent(
  data: Omit<ExperimentalComponent, 'id' | 'createdAt' | 'updatedAt'>,
): ExperimentalComponent {
  const now = new Date().toISOString();
  const component: ExperimentalComponent = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  saveExperimentalComponent(component);
  return component;
}

export function getExperimentalByStatus(status: ExperimentalStatus): ExperimentalComponent[] {
  return loadExperimentalComponents().filter((c) => c.status === status);
}
