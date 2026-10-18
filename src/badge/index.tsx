import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface BadgeProps {
  label?: string;
  tone?: 'primary' | 'success' | 'danger' | 'neutral';
  style?: StyleProp<ViewStyle>;
}

/** Small pill with a short text or count. */
export function Badge({ label, tone = 'primary', style }: BadgeProps) {
  const c = useBlocksColors();
  const bg = tone === 'primary' ? c.primary : tone === 'success' ? c.success : tone === 'danger' ? c.danger : c.border;
  const fg = tone === 'neutral' ? c.text : c.onPrimary;
  return (
    <View style={[styles.base, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', minWidth: 22, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, alignItems: 'center' },
  label: { fontSize: 12, fontWeight: '700' },
});
