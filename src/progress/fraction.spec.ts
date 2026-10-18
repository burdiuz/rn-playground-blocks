import { describe, expect, it } from '@jest/globals';

import { progressFraction } from './fraction';

describe('progressFraction', () => {
  it('scales and clamps', () => {
    expect(progressFraction(50)).toBe(0.5);
    expect(progressFraction(5, 10)).toBe(0.5);
    expect(progressFraction(-3)).toBe(0);
    expect(progressFraction(300)).toBe(1);
  });
  it('treats bad input as empty', () => {
    expect(progressFraction(NaN)).toBe(0);
    expect(progressFraction(1, 0)).toBe(0);
  });
});
