import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface ToggleProps {
  label?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  variant?: 'switch' | 'checkbox';
  style?: StyleProp<ViewStyle>;
}

export function Toggle({ label, value = false, onValueChange, variant = 'switch', style }: ToggleProps) {
  const c = useBlocksColors();
  if (variant === 'checkbox') {
    return (
      <Pressable style={[styles.checkbox, style]} onPress={() => onValueChange?.(!value)}>
        <Text style={[styles.mark, { color: c.primary }]}>{value ? '☑' : '☐'}</Text>
        {label ? <Text style={[styles.label, { color: c.text }]}>{label}</Text> : null}
      </Pressable>
    );
  }
  return (
    <View style={[styles.row, style]}>
      {label ? <Text style={[styles.label, { color: c.text }]}>{label}</Text> : null}
      <Switch value={!!value} onValueChange={onValueChange} trackColor={{ true: c.primary, false: undefined }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  checkbox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mark: { fontSize: 20 },
  label: { fontSize: 16 },
});
