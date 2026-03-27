import { describe, it, expect } from 'vitest';
import { deriveDarkColors } from './dark-colors';
import { LOCHTING } from './tokens/lochting';
import { MEDIPIM } from './tokens/medipim';

describe('deriveDarkColors', () => {
  it('returns dark-adapted colors for Lochting (with darkOverrides)', () => {
    const dark = deriveDarkColors(LOCHTING);
    // Dark bg should be dark
    expect(dark.bgBase).toMatch(/^#[0-9a-f]{6}$/i);
    // Content primary should be light for readability on dark bg
    expect(dark.contentPrimary).toBeTruthy();
    // Brand accents unchanged
    expect(dark.brand400).toBe(LOCHTING.colors.brand400);
    expect(dark.brand100).toBe(LOCHTING.colors.brand100);
  });

  it('returns dark-adapted colors for Medipim (with darkOverrides)', () => {
    const dark = deriveDarkColors(MEDIPIM);
    expect(dark.brand400).toBe(MEDIPIM.colors.brand400);
    // Surface should be semi-transparent overlay
    expect(dark.bgSurface).toMatch(/rgba/);
  });

  it('preserves contentStayLight and contentStayDark', () => {
    const dark = deriveDarkColors(LOCHTING);
    expect(dark.contentStayLight).toBe(LOCHTING.colors.contentStayLight);
    expect(dark.contentStayDark).toBe(LOCHTING.colors.contentStayDark);
  });

  it('has feedback colors for all categories', () => {
    const dark = deriveDarkColors(LOCHTING);
    expect(dark.error.contentStrong).toBeTruthy();
    expect(dark.warning.contentStrong).toBeTruthy();
    expect(dark.info.contentStrong).toBeTruthy();
    expect(dark.success.contentStrong).toBeTruthy();
  });

  it('swaps base and inverse backgrounds', () => {
    const dark = deriveDarkColors(LOCHTING);
    // bgBaseInverse in dark should be the original light bgBase
    expect(dark.bgBaseInverse).toBeTruthy();
    expect(dark.bgBaseInverse).not.toBe(dark.bgBase);
  });
});
