import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

/** Label above a control and an error line below it. */
export function Field({ label, error, style, children }: { label?: string; error?: string; style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  const c = useBlocksColors();
  return (
    <View style={[styles.field, style]}>
      {label ? <Text style={[styles.label, { color: c.mutedText }]}>{label}</Text> : null}
      {children}
      {error ? <Text style={[styles.error, { color: c.danger }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 4 },
  label: { fontSize: 14, fontWeight: '600' },
  error: { fontSize: 12 },
});
