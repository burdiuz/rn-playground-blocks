import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface FlowProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Flow({ style, children }: FlowProps) {
  return <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>{children}</View>;
}
