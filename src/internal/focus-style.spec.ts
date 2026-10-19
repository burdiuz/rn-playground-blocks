import { describe, it, expect } from '@jest/globals';

import { focusRingStyle, scaled, stepPage } from './focus-style';

describe('focusRingStyle', () => {
  it('is null when not focused', () => {
    expect(focusRingStyle(false, '#000')).toBeNull();
  });
  it('draws an outline in the given colour', () => {
    expect(focusRingStyle(true, '#123')).toMatchObject({ outlineColor: '#123', outlineWidth: 3 });
  });
  it('scales the ring width', () => {
    expect(focusRingStyle(true, '#123', 1.5)).toMatchObject({ outlineWidth: 5 });
  });
});

describe('stepPage', () => {
  it('moves within bounds', () => {
    expect(stepPage(0, 1, 3)).toBe(1);
    expect(stepPage(2, -1, 3)).toBe(1);
  });
  it('returns null at the ends', () => {
    expect(stepPage(0, -1, 3)).toBeNull();
    expect(stepPage(2, 1, 3)).toBeNull();
    expect(stepPage(0, 1, 1)).toBeNull();
  });
});

describe('scaled', () => {
  it('rounds to whole dp', () => {
    expect(scaled(44, 1.5)).toBe(66);
    expect(scaled(10, 1.25)).toBe(13);
  });
});
