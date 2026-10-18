import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface CardProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Card({ title, style, children }: CardProps) {
  const c = useBlocksColors();
  return (
    <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }, style]}>
      {title ? <Text style={[styles.title, { color: c.text }]}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, borderWidth: 1, padding: 16, gap: 8 },
  title: { fontSize: 18, fontWeight: '700' },
});
