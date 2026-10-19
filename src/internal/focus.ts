import { useCallback, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';

import { useBlocksColors, useBlocksScale } from '../theme';
import { focusRingStyle } from './focus-style';

/**
 * Focus feedback for a `Pressable` (D-pad / hardware keyboard).
 * Spread `handlers` on the Pressable and add `ring` to its style.
 */
export function useFocusRing(): { focused: boolean; ring: ViewStyle | null; handlers: { onFocus: () => void; onBlur: () => void } } {
  const color = useBlocksColors().text;
  const scale = useBlocksScale();
  const [focused, setFocused] = useState(false);
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);
  const ring = useMemo(() => focusRingStyle(focused, color, scale), [focused, color, scale]);
  return { focused, ring, handlers: { onFocus, onBlur } };
}
