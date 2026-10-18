import type { BlocksColors } from './theme';

export type Palette = BlocksColors;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** `#rgb` / `#rrggbb` → [r, g, b] (0–255), or null when invalid. */
export function parseHex(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

function toHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('').toUpperCase();
}

/** [r,g,b] 0–255 → [h 0–360, s 0–100, l 0–100]. */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l * 100];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  return [(h * 60 + 360) % 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  const hn = ((h % 360) + 360) % 360;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;
  const [r, g, b] =
    hn < 60 ? [c, x, 0] : hn < 120 ? [x, c, 0] : hn < 180 ? [0, c, x] : hn < 240 ? [0, x, c] : hn < 300 ? [x, 0, c] : [c, 0, x];
  return toHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/** WCAG relative luminance of a hex colour. */
export function luminance(hex: string): number {
  const rgb = parseHex(hex) ?? [0, 0, 0];
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio (1–21). */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const DARK_INK = '#111827';
const LIGHT_INK = '#FFFFFF';

/** White or near-black, whichever reads better on `bg`. */
export function readableOn(bg: string): string {
  return contrast(bg, LIGHT_INK) >= contrast(bg, DARK_INK) ? LIGHT_INK : DARK_INK;
}

/**
 * Derives the colour roles from one base colour. Same hue throughout, lightness ramps per role;
 * the accent is split-complementary (+150°). An invalid base falls back to a neutral indigo.
 */
export function generatePalette(base: string, mode: 'light' | 'dark'): Palette {
  const rgb = parseHex(base) ?? parseHex('#4F46E5')!;
  const [h, s0, l0] = rgbToHsl(...rgb);
  const tint = (k: number, max: number) => clamp(s0 * k, 0, max);
  const accentS = clamp(s0, 45, 85);

  if (mode === 'light') {
    const primary = toHex(...rgb);
    return {
      primary,
      onPrimary: readableOn(primary),
      background: hslToHex(h, tint(0.3, 25), 97),
      surface: '#FFFFFF',
      text: hslToHex(h, tint(0.3, 25), 14),
      mutedText: hslToHex(h, tint(0.15, 15), 40),
      border: hslToHex(h, tint(0.2, 20), 88),
      accent: hslToHex(h + 150, accentS, 45),
      danger: '#DC2626',
      success: '#16A34A',
    };
  }
  const primary = hslToHex(h, s0, Math.max(l0, 62));
  return {
    primary,
    onPrimary: readableOn(primary),
    background: hslToHex(h, tint(0.3, 25), 9),
    surface: hslToHex(h, tint(0.3, 25), 14),
    text: hslToHex(h, tint(0.2, 15), 94),
    mutedText: hslToHex(h, tint(0.15, 15), 68),
    border: hslToHex(h, tint(0.25, 20), 24),
    accent: hslToHex(h + 150, accentS, 62),
    danger: '#F87171',
    success: '#4ADE80',
  };
}
