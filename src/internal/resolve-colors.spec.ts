import { describe, it, expect } from '@jest/globals';

import { resolveColors } from './resolve-colors';

const defaults = { primary: 'd1', text: 'd2', border: 'd3' };

describe('resolveColors', () => {
  it('returns the defaults without a base and never calls the palette', () => {
    let called = false;
    const out = resolveColors(defaults, undefined, 'light', () => ((called = true), {}));
    expect(out).toEqual(defaults);
    expect(called).toBe(false);
  });
  it('passes base and mode to the palette function', () => {
    const seen: unknown[] = [];
    resolveColors(defaults, '#123456', 'dark', (b, m) => (seen.push(b, m), {}));
    expect(seen).toEqual(['#123456', 'dark']);
  });
  it('fills roles the palette leaves out from the defaults', () => {
    expect(resolveColors(defaults, '#fff', 'light', () => ({ primary: 'p' }))).toEqual({ primary: 'p', text: 'd2', border: 'd3' });
  });
  it('lets explicit overrides win over the palette', () => {
    expect(resolveColors(defaults, '#fff', 'light', () => ({ primary: 'p', text: 't' }), { primary: 'o' })).toEqual({ primary: 'o', text: 't', border: 'd3' });
  });
});
