import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { FocusPressable } from '../internal/focus-pressable';
import { stepPage } from '../internal/focus-style';
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
  const ref = useRef<ScrollView>(null);
  const pages = React.Children.toArray(children);
  // D-pad / keyboard paging: the dots row doubles as ‹ › controls, since swipes are not available there.
  const go = (delta: number) => {
    const next = stepPage(page, delta, pages.length);
    if (next === null) return;
    ref.current?.scrollTo({ x: next * width, animated: true });
    setPage(next);
  };
  return (
    <View style={[styles.root, style]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <ScrollView
        ref={ref}
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
          <FocusPressable accessibilityRole="button" accessibilityLabel="Previous page" onPress={() => go(-1)} style={styles.arrow}>
            <Text style={{ color: page > 0 ? c.primary : c.border, fontSize: 20 }}>‹</Text>
          </FocusPressable>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === page ? c.primary : c.border }]} />
          ))}
          <FocusPressable accessibilityRole="button" accessibilityLabel="Next page" onPress={() => go(1)} style={styles.arrow}>
            <Text style={{ color: page < pages.length - 1 ? c.primary : c.border, fontSize: 20 }}>›</Text>
          </FocusPressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 8 },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  arrow: { minWidth: 32, minHeight: 32, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
