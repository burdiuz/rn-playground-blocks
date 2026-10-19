import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useFocusRing } from '../internal/focus';
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
          <TabButton key={t.key ?? i} title={t.props.title} active={i === current} onPress={() => setIndex(i)} />
        ))}
      </View>
      <View style={styles.page}>{tabs[current]}</View>
    </View>
  );
}

function TabButton({ title, active, onPress }: { title: string; active: boolean; onPress: () => void }) {
  const c = useBlocksColors();
  const { ring, handlers } = useFocusRing();
  return (
    <Pressable onPress={onPress} {...handlers} style={[styles.tab, active && { borderBottomColor: c.primary }, ring]}>
      <Text style={[styles.title, { color: active ? c.primary : c.mutedText }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { gap: 8 },
  strip: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  title: { fontWeight: '600' },
  page: { gap: 8 },
});
