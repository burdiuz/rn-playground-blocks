import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export type StaticAlign = 'start' | 'center' | 'end' | 'fill';

export interface StaticProps {
  /** Placement along the horizontal axis. `fill` (default) takes the whole width. */
  horizontal?: StaticAlign;
  /** Placement along the vertical axis. `fill` (default) takes the whole height. */
  vertical?: StaticAlign;
  /** Distance from the left/right edges, in px. */
  marginX?: number;
  /** Distance from the top/bottom edges, in px. */
  marginY?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const FLEX = { start: 'flex-start', center: 'center', end: 'flex-end', fill: 'stretch' } as const;

/**
 * Pins its content to a spot of the container: e.g. `horizontal="end" vertical="end" marginX={20} marginY={20}`
 * puts it in the bottom-right corner, 20 px from the edges; `fill` on both axes (the default) takes the whole container.
 * Takes the remaining space of its parent (`flexGrow: 1`) so there is room to place the content in.
 */
export function Static({ horizontal = 'fill', vertical = 'fill', marginX = 0, marginY = 0, style, children }: StaticProps) {
  const inner: ViewStyle = {
    marginHorizontal: marginX,
    marginVertical: marginY,
    alignSelf: FLEX[horizontal],
    ...(vertical === 'fill' ? { flexGrow: 1 } : null),
  };
  return (
    <View
      style={[
        {
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: vertical === 'fill' ? 'flex-start' : FLEX[vertical],
        },
        style,
      ]}
    >
      <View style={inner}>{children}</View>
    </View>
  );
}

