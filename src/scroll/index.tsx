import React from 'react';
import { ScrollView, type StyleProp, type ViewStyle } from 'react-native';

export interface ScrollProps {
  direction?: 'vertical' | 'horizontal';
  /** Style of the ScrollView itself (takes the remaining space by default). */
  style?: StyleProp<ViewStyle>;
  /** Style of the scrolled content (padding, gap…). */
  contentStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Scroll({ direction = 'vertical', style, contentStyle, children }: ScrollProps) {
  return (
    <ScrollView horizontal={direction === 'horizontal'} style={[{ flex: 1 }, style]} contentContainerStyle={contentStyle}>
      {children}
    </ScrollView>
  );
}
