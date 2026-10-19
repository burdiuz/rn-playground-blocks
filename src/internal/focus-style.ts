import type { ViewStyle } from 'react-native';

/** Thickness of the focus ring in dp (before the theme scale). */
export const FOCUS_RING_WIDTH = 3;

/** Outline drawn around a focused control; an outline takes no layout space, so focus never shifts neighbours. */
export function focusRingStyle(focused: boolean, color: string, scale = 1): ViewStyle | null {
  if (!focused) return null;
  return { outlineWidth: Math.round(FOCUS_RING_WIDTH * scale), outlineColor: color, outlineStyle: 'solid', outlineOffset: 2 };
}

/** Next page of a pager moved by a D-pad step, clamped to the ends; `null` when it cannot move. */
export function stepPage(page: number, delta: number, count: number): number | null {
  const next = Math.max(0, Math.min(count - 1, page + delta));
  return next === page ? null : next;
}

/** Scale applied to a base size, rounded to whole dp. */
export function scaled(value: number, scale: number): number {
  return Math.round(value * scale);
}
