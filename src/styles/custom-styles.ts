import type { StyleDefinition } from './types';
import { ALL_STYLES } from './index';

const STORAGE_KEY = 'bw-custom-styles';

/** Read custom styles from localStorage */
export function loadCustomStyles(): StyleDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StyleDefinition[];
  } catch {
    return [];
  }
}

/** Save/upsert a custom style */
export function saveCustomStyle(style: StyleDefinition): void {
  const existing = loadCustomStyles();
  const idx = existing.findIndex((s) => s.id === style.id);
  if (idx >= 0) {
    existing[idx] = style;
  } else {
    existing.push(style);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/** Delete a custom style by id */
export function deleteCustomStyle(id: string): void {
  const existing = loadCustomStyles().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/** Get all styles: built-in + custom */
export function getAllStyles(): StyleDefinition[] {
  return [...ALL_STYLES, ...loadCustomStyles()];
}

/** Build lookup map for all styles */
export function getAllStylesById(): Record<string, StyleDefinition> {
  return Object.fromEntries(getAllStyles().map((s) => [s.id, s]));
}
