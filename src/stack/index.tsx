import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export interface StackProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Layers its children, each next one over the previous, and every one takes the whole container.
 * The first child sets the container's size (unless `style` gives one); the rest are laid over it.
 */
export function Stack({ style, children }: StackProps) {
  const layers = React.Children.toArray(children);
  return (
    <View style={style}>
      {layers.map((layer, i) =>
        i === 0 ? (
          <View key={i} style={styles.base}>
            {layer}
          </View>
        ) : (
          <View key={i} style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {layer}
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({ base: { flexGrow: 1 } });
