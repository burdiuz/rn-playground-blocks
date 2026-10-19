/** Layers colour roles: defaults, then the palette function's result (only with a `base`), then explicit overrides. */
export function resolveColors<C extends object>(
  defaults: C,
  base: string | undefined,
  mode: 'light' | 'dark',
  palette: (base: string, mode: 'light' | 'dark') => Partial<C>,
  overrides?: Partial<C>,
): C {
  const roles = base ? { ...defaults, ...palette(base, mode) } : defaults;
  return overrides ? { ...roles, ...overrides } : roles;
}
