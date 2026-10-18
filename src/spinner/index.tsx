import React from 'react';
import { ActivityIndicator, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface SpinnerProps {
  size?: 'small' | 'large';
  style?: StyleProp<ViewStyle>;
}

/** Indeterminate progress indicator. */
export function Spinner({ size = 'large', style }: SpinnerProps) {
  const c = useBlocksColors();
  return <ActivityIndicator size={size} color={c.primary} style={style} />;
}
