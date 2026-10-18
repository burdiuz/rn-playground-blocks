import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface ListProps<T = unknown> {
  /** Non-arrays render nothing. */
  items?: T[] | null;
  style?: StyleProp<ViewStyle>;
  children: (item: T, index: number) => React.ReactNode;
}

/** Renders `children(item, index)` for every element. */
export function List<T = unknown>({ items, style, children }: ListProps<T>) {
  return (
    <View style={style}>
      {(Array.isArray(items) ? items : []).map((item, index) => (
        <View key={index}>{children(item, index)}</View>
      ))}
    </View>
  );
}
