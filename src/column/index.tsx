import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface ColumnProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Column({ style, children }: ColumnProps) {
  return <View style={[{ flexDirection: 'column' }, style]}>{children}</View>;
}
