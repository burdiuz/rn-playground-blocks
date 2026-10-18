import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface TabProps {
  title: string;
  children?: React.ReactNode;
}

/** One page of `Tabs`; only its `title` and children are used. */
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export interface TabsProps {
  /** Index of the page shown first. */
  initial?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Tab strip above the page of the selected `Tab`. */
export function Tabs({ initial = 0, style, children }: TabsProps) {
  const c = useBlocksColors();
  const tabs = React.Children.toArray(children).filter(
    (ch): ch is React.ReactElement<TabProps> => React.isValidElement(ch) && ch.type === Tab,
  );
  const [index, setIndex] = useState(initial);
  const current = Math.min(index, Math.max(0, tabs.length - 1));
  return (
    <View style={[styles.root, style]}>
      <View style={[styles.strip, { borderBottomColor: c.border }]}>
        {tabs.map((t, i) => (
          <Pressable
            key={t.key ?? i}
            onPress={() => setIndex(i)}
            style={[styles.tab, i === current && { borderBottomColor: c.primary }]}
          >
            <Text style={[styles.title, { color: i === current ? c.primary : c.mutedText }]}>{t.props.title}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.page}>{tabs[current]}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 8 },
  strip: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  title: { fontWeight: '600' },
  page: { gap: 8 },
});
