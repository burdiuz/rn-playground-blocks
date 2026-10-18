import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface PanelProps {
  title?: string;
  open?: boolean;
  onToggle?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Collapsible section; the owner keeps `open`. */
export function Panel({ title, open = false, onToggle, style, children }: PanelProps) {
  const c = useBlocksColors();
  return (
    <View style={[styles.panel, { borderColor: c.border, backgroundColor: c.surface }, style]}>
      <Pressable style={styles.head} onPress={onToggle}>
        <Text style={[styles.title, { color: c.text }]}>{title}</Text>
        <Text style={[styles.arrow, { color: c.mutedText }]}>{open ? '▾' : '▸'}</Text>
      </Pressable>
      {open ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderRadius: 8, borderWidth: 1 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  arrow: { fontSize: 16 },
  body: { padding: 12, gap: 8 },
});
