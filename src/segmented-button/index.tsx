import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Field } from '../internal/field';
import { useBlocksColors } from '../theme';

export interface SegmentedOption {
  label: string;
  value: string;
}

export interface SegmentedButtonProps {
  label?: string;
  options: SegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

/** Connected row of options, exactly one selected. */
export function SegmentedButton({ label, options, value, onChange, error, style }: SegmentedButtonProps) {
  const c = useBlocksColors();
  return (
    <Field label={label} error={error} style={style}>
      <View style={[styles.row, { borderColor: c.primary }]}>
        {options.map((o, i) => {
          const on = o.value === value;
          return (
            <Pressable
              key={o.value}
              onPress={() => onChange?.(o.value)}
              style={[styles.item, i > 0 && { borderLeftWidth: 1, borderLeftColor: c.primary }, on && { backgroundColor: c.primary }]}
            >
              <Text style={[styles.text, { color: on ? c.onPrimary : c.primary }]}>{o.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </Field>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  item: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center' },
  text: { fontWeight: '600' },
});
