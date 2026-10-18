import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

/** Empty 16×16 square; resize through `style`. */
export function Spacer({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View style={[{ width: 16, height: 16 }, style]} />;
}
