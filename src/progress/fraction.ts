/** Fraction (0–1) of `value` within `0..max`; anything not finite counts as 0. */
export function progressFraction(value: number | undefined, max = 100): number {
  const v = Number(value);
  const m = Number(max);
  if (!Number.isFinite(v) || !Number.isFinite(m) || m <= 0) return 0;
  return Math.min(1, Math.max(0, v / m));
}
