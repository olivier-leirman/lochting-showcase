import type { StyleDefinition } from './types';

/**
 * Rule-based style generator — maps a text prompt to a complete StyleDefinition.
 *
 * Detects keywords in the prompt to determine:
 * - Surface treatment (glass, flat, textured)
 * - Shadow character (none, soft, dramatic, inset)
 * - Border radius (sharp, rounded, pill)
 * - Interaction feel (snappy, gentle, bouncy)
 * - Component treatments (gradient, solid, glass, outline)
 */

/* ── Keyword detection ── */

function has(prompt: string, ...keywords: string[]): boolean {
  const lower = prompt.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function score(prompt: string, ...keywords: string[]): number {
  const lower = prompt.toLowerCase();
  return keywords.reduce((n, k) => n + (lower.includes(k) ? 1 : 0), 0);
}

/* ── Preset fragments ── */

const SURFACE_GLASS = {
  blur: 16,
  cardBg: 'rgba(255, 255, 255, 0.40)',
  cardBorder: '1px solid rgba(255, 255, 255, 0.50)',
  inputBg: 'rgba(255, 255, 255, 0.25)',
};

const SURFACE_FLAT = {
  blur: 0,
  cardBg: '',
  cardBorder: '',
  inputBg: '',
};

const SURFACE_SOFT = {
  blur: 0,
  cardBg: '',
  cardBorder: '1px solid',
  inputBg: '',
};

/* ── Main generator ── */

export function generateStyleFromPrompt(prompt: string): StyleDefinition {
  const id = `custom-${Date.now()}`;

  // Detect surface style
  const isGlass = has(prompt, 'glass', 'frost', 'translucent', 'blur', 'transparent', 'acrylic');
  const isFlat = has(prompt, 'flat', 'minimal', 'clean', 'simple', 'plain');
  const isBrutal = has(prompt, 'brutal', 'bold', 'raw', 'heavy', 'stark', 'industrial');
  const isNeu = has(prompt, 'neumorphi', 'clay', 'extrud', 'soft shadow', 'tactile', 'squishy');
  const isSoft = has(prompt, 'soft', 'gentle', 'airy', 'calm', 'zen', 'subtle', 'light');
  const isPremium = has(prompt, 'premium', 'luxury', 'elegant', 'refined', 'polished', 'sophisticated');

  // Surface
  const surface = isGlass ? { ...SURFACE_GLASS }
    : isFlat || isBrutal ? { ...SURFACE_FLAT }
    : { ...SURFACE_SOFT };

  if (isGlass && has(prompt, 'heavy', 'strong', 'thick')) {
    surface.blur = 24;
    surface.cardBg = 'rgba(255, 255, 255, 0.55)';
  }

  // Border radius
  const sharpScore = score(prompt, 'sharp', 'angular', 'square', 'hard', 'brutal', 'geometric');
  const roundScore = score(prompt, 'round', 'pill', 'circular', 'soft', 'gentle', 'organic', 'blob');
  const borderRadius = sharpScore > roundScore
    ? { mode: 'absolute' as const, sm: 0, md: 0, lg: 2 }
    : roundScore > 1
      ? { mode: 'absolute' as const, sm: 16, md: 24, lg: 32 }
      : isSoft || isPremium
        ? { mode: 'absolute' as const, sm: 10, md: 16, lg: 24 }
        : { mode: 'absolute' as const, sm: 8, md: 12, lg: 16 };

  // Shadows
  const shadows = {
    useInset: isNeu,
    intensity: isBrutal ? 2 : isFlat ? 0 : isSoft ? 0.6 : isPremium ? 1.2 : 1,
    brandTinted: isGlass || isPremium,
  };

  // Elevation
  const elevation = isFlat
    ? { none: 'none', low: 'none', medium: 'none', high: 'none' }
    : isBrutal
      ? {
          none: 'none',
          low: '3px 3px 0 rgba(0,0,0,0.25)',
          medium: '5px 5px 0 rgba(0,0,0,0.3)',
          high: '8px 8px 0 rgba(0,0,0,0.35)',
        }
      : isNeu
        ? {
            none: 'none',
            low: '4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.8)',
            medium: '6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.8)',
            high: '8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.9)',
          }
        : isSoft
          ? {
              none: 'none',
              low: '0 1px 4px rgba(0,0,0,0.04)',
              medium: '0 2px 8px rgba(0,0,0,0.06)',
              high: '0 4px 16px rgba(0,0,0,0.08)',
            }
          : {
              none: 'none',
              low: '0 2px 8px rgba(0,0,0,0.06)',
              medium: '0 4px 16px rgba(0,0,0,0.08)',
              high: '0 8px 32px rgba(0,0,0,0.12)',
            };

  // Interaction
  const interaction: StyleDefinition['interaction'] = {
    hoverEffect: isGlass ? 'glow' : isBrutal ? 'darken' : isSoft ? 'opacity-shift' : 'lift',
    activeEffect: isBrutal ? 'none' : 'scale-down',
    focusRing: isBrutal ? 'outline-dashed' : isGlass ? 'glow' : isSoft ? 'ring-3px-offset' : 'ring-2px-brand',
    transitionDuration: isBrutal ? '0.1s' : isSoft ? '0.3s' : '0.2s',
    transitionEasing: isSoft ? 'cubic-bezier(0.25, 0.1, 0.25, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // Component treatments
  const buttonPrimary: StyleDefinition['buttonPrimary'] =
    isGlass ? 'glass' : isBrutal ? 'outline-bold' : isFlat ? 'flat' : isPremium ? 'gradient' : 'solid';
  const buttonSecondary: StyleDefinition['buttonSecondary'] =
    isGlass ? 'glass' : isBrutal ? 'ghost' : isFlat ? 'flat' : 'outlined-flat';
  const cardTreatment: StyleDefinition['cardTreatment'] =
    isGlass ? 'glass' : isBrutal ? 'bordered' : isFlat ? 'flat' : isNeu ? 'inset' : 'elevated';
  const inputTreatment: StyleDefinition['inputTreatment'] =
    isGlass ? 'glass' : isBrutal ? 'bordered' : isFlat ? 'underline' : 'outlined';

  // Build name from prompt
  const name = prompt.length > 40 ? prompt.slice(0, 37) + '...' : prompt;

  const style: StyleDefinition = {
    id,
    name: `Custom: ${name}`,
    description: prompt,
    surface,
    elevation,
    interaction,
    borderRadius,
    shadows,
    buttonPrimary,
    buttonSecondary,
    cardTreatment,
    inputTreatment,
  };

  // Glass extras
  if (isGlass) {
    style.cardExtra = {
      backdropFilter: `blur(${surface.blur}px)`,
      WebkitBackdropFilter: `blur(${surface.blur}px)`,
    };
    style.inputExtra = {
      backdropFilter: `blur(${Math.round(surface.blur * 0.75)}px)`,
      WebkitBackdropFilter: `blur(${Math.round(surface.blur * 0.75)}px)`,
    };
  }

  // Brutal extras
  if (isBrutal) {
    style.cardExtra = { border: '3px solid currentColor' };
  }

  return style;
}

/** Export a StyleDefinition as a TypeScript string */
export function exportStyleAsTypeScript(style: StyleDefinition): string {
  const varName = style.id.toUpperCase().replace(/[^A-Z0-9]/g, '_') + '_STYLE';
  return `import type { StyleDefinition } from './types';

export const ${varName}: StyleDefinition = ${JSON.stringify(style, null, 2)};
`;
}

/** Create a blank style as starting point */
export function createBlankStyle(): StyleDefinition {
  return {
    id: `custom-${Date.now()}`,
    name: 'New Custom Style',
    description: '',
    surface: { blur: 0, cardBg: '', cardBorder: '', inputBg: '' },
    elevation: {
      none: 'none',
      low: '0 2px 8px rgba(0,0,0,0.06)',
      medium: '0 4px 16px rgba(0,0,0,0.08)',
      high: '0 8px 32px rgba(0,0,0,0.12)',
    },
    interaction: {
      hoverEffect: 'lift',
      activeEffect: 'scale-down',
      focusRing: 'ring-2px-brand',
      transitionDuration: '0.2s',
      transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    borderRadius: { mode: 'absolute', sm: 8, md: 12, lg: 16 },
    shadows: { useInset: false, intensity: 1, brandTinted: false },
    buttonPrimary: 'solid',
    buttonSecondary: 'outlined-flat',
    cardTreatment: 'elevated',
    inputTreatment: 'outlined',
  };
}
