import { describe, expect, it } from '@jest/globals';

import { contrast, generatePalette, parseHex } from './palette';

describe('generatePalette', () => {
  it('derives all ten roles', () => {
    const p = generatePalette('#2563EB', 'light');
    expect(Object.keys(p).sort()).toEqual(['accent', 'background', 'border', 'danger', 'mutedText', 'onPrimary', 'primary', 'success', 'surface', 'text']);
    expect(p.primary).toBe('#2563EB');
  });

  it('keeps text readable on the background in both modes', () => {
    for (const mode of ['light', 'dark'] as const) {
      const p = generatePalette('#DB2777', mode);
      expect(contrast(p.text, p.background)).toBeGreaterThan(7);
      expect(contrast(p.onPrimary, p.primary)).toBeGreaterThan(3);
    }
  });

  it('falls back to indigo for an invalid base', () => {
    expect(generatePalette('nope', 'light').primary).toBe('#4F46E5');
    expect(parseHex('#abc')).toEqual([170, 187, 204]);
  });
});
