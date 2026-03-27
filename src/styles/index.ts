export type { StyleDefinition } from './types';

export { FLAT_STYLE } from './flat.style';
export { NEUMORPHISM_STYLE } from './neumorphism.style';
export { GLASSMORPHISM_STYLE } from './glassmorphism.style';
export { BRUTALISM_STYLE } from './brutalism.style';
export { SOFT_MINIMAL_STYLE } from './soft-minimal.style';

import { FLAT_STYLE } from './flat.style';
import { NEUMORPHISM_STYLE } from './neumorphism.style';
import { GLASSMORPHISM_STYLE } from './glassmorphism.style';
import { BRUTALISM_STYLE } from './brutalism.style';
import { SOFT_MINIMAL_STYLE } from './soft-minimal.style';
import type { StyleDefinition } from './types';

/** All available style definitions */
export const ALL_STYLES: StyleDefinition[] = [
  FLAT_STYLE,
  NEUMORPHISM_STYLE,
  GLASSMORPHISM_STYLE,
  BRUTALISM_STYLE,
  SOFT_MINIMAL_STYLE,
];

/** Lookup by id */
export const STYLES_BY_ID: Record<string, StyleDefinition> = Object.fromEntries(
  ALL_STYLES.map((s) => [s.id, s]),
);

/** Default style — used when no style is explicitly selected */
export const DEFAULT_STYLE = NEUMORPHISM_STYLE;
