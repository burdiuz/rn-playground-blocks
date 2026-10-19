import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { resolveColors } from './internal/resolve-colors';
import { generatePalette } from './palette';

export { generatePalette, parseHex, readableOn, contrast, luminance } from './palette';

/** Colour roles every block reads. Pass your own values through `BlocksThemeProvider`. */
export interface BlocksColors {
  primary: string;
  onPrimary: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  accent: string;
  danger: string;
  success: string;
}

export type ColorRole = keyof BlocksColors;

export const lightColors: BlocksColors = {
  primary: '#4F46E5',
  onPrimary: '#FFFFFF',
  background: '#FFFFFF',
  surface: '#F4F4F8',
  text: '#16161D',
  mutedText: '#6B6B7B',
  border: '#D9D9E3',
  accent: '#E5A046',
  danger: '#DC2626',
  success: '#16A34A',
};

export const darkColors: BlocksColors = {
  primary: '#818CF8',
  onPrimary: '#0F0F1A',
  background: '#0F0F14',
  surface: '#1A1A22',
  text: '#F2F2F7',
  mutedText: '#9A9AAD',
  border: '#33333F',
  accent: '#F0B46A',
  danger: '#F87171',
  success: '#4ADE80',
};

const ThemeContext = createContext<BlocksColors>(lightColors);
const ScaleContext = createContext(1);

export type ColorMode = 'light' | 'dark' | 'auto';

/** Turns a base colour into colour roles; roles it leaves out fall back to the defaults. */
export type PaletteFunction = (base: string, mode: 'light' | 'dark') => Partial<BlocksColors>;

export interface BlocksThemeProps {
  /** Base colour (`#rgb` / `#rrggbb`); the ten roles are derived from it at runtime with `generatePalette`. */
  base?: string;
  /** `auto` follows the device colour scheme. Default `auto`. */
  mode?: ColorMode;
  /** Replaces `generatePalette` when `base` is given. Define it outside the component (or memoize it), or the palette is recomputed on every render. */
  palette?: PaletteFunction;
  /** Explicit roles; take precedence over `base`. */
  colors?: Partial<BlocksColors>;
  /** Multiplies control sizes and the focus ring (e.g. `1.5` for a TV viewed from a distance). Default `1`. */
  scale?: number;
  children?: React.ReactNode;
}

/** Provides the colour roles: generated from `base` + `mode`, or the defaults, with `colors` laid over them. */
export function BlocksThemeProvider({ base, mode = 'auto', palette = generatePalette, colors, scale = 1, children }: BlocksThemeProps) {
  const scheme = useColorScheme();
  const dark = mode === 'dark' || (mode === 'auto' && scheme === 'dark');
  const value = useMemo(() => {
    return resolveColors<BlocksColors>(dark ? darkColors : lightColors, base, dark ? 'dark' : 'light', palette, colors);
  }, [base, dark, palette, colors]);
  return (
    <ThemeContext.Provider value={value}>
      <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>
    </ThemeContext.Provider>
  );
}

/** Current colours (light defaults when no provider is mounted). */
export function useBlocksColors(): BlocksColors {
  return useContext(ThemeContext);
}

/** Size multiplier from the provider (`1` when none is mounted). */
export function useBlocksScale(): number {
  return useContext(ScaleContext);
}
