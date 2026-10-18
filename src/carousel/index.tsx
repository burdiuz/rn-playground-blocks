import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface CarouselProps {
  /** Height of the pages. */
  height?: number;
  dots?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Horizontally paged children, one per page, with position dots. */
export function Carousel({ height = 160, dots = true, style, children }: CarouselProps) {
  const c = useBlocksColors();
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);
  const pages = React.Children.toArray(children);
  return (
    <View style={[styles.root, style]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height }}
        onMomentumScrollEnd={(e) => width && setPage(Math.round(e.nativeEvent.contentOffset.x / width))}
      >
        {pages.map((p, i) => (
          <View key={i} style={{ width, height }}>
            {p}
          </View>
        ))}
      </ScrollView>
      {dots && pages.length > 1 ? (
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === page ? c.primary : c.border }]} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 8 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
