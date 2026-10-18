import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface RowProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Row({ style, children }: RowProps) {
  return <View style={[{ flexDirection: 'row' }, style]}>{children}</View>;
}
