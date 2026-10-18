import React from 'react';
import { Text as RNText, type StyleProp, type TextStyle } from 'react-native';

import { useBlocksColors, type ColorRole } from '../theme';

export interface TextProps {
  variant?: 'heading' | 'body' | 'caption';
  color?: ColorRole;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const SIZE = { heading: { fontSize: 24, fontWeight: '700' }, body: { fontSize: 16 }, caption: { fontSize: 14 } } as const;

export function Text({ variant = 'body', color, style, children }: TextProps) {
  const c = useBlocksColors();
  const role = color ?? (variant === 'caption' ? 'mutedText' : 'text');
  return <RNText style={[SIZE[variant], { color: c[role] }, style]}>{children}</RNText>;
}
