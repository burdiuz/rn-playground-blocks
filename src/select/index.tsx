import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Field } from '../internal/field';
import { useBlocksColors } from '../theme';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'dropdown' | 'radio' | 'chips';
  placeholder?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

export function Select({ label, options, value, onChange, variant = 'dropdown', placeholder = 'Select…', error, style }: SelectProps) {
  const c = useBlocksColors();
  const [open, setOpen] = useState(false);
  let body: React.ReactNode;
  if (variant === 'radio') {
    body = (
      <View style={styles.column}>
        {options.map((o) => (
          <Pressable key={o.value} style={styles.radio} onPress={() => onChange?.(o.value)}>
            <Text style={[styles.mark, { color: c.primary }]}>{value === o.value ? '◉' : '○'}</Text>
            <Text style={[styles.text, { color: c.text }]}>{o.label}</Text>
          </Pressable>
        ))}
      </View>
    );
  } else if (variant === 'chips') {
    body = (
      <View style={styles.chips}>
        {options.map((o) => {
          const on = value === o.value;
          return (
            <Pressable
              key={o.value}
              style={[styles.chip, { borderColor: on ? c.primary : c.border, backgroundColor: on ? c.primary : c.surface }]}
              onPress={() => onChange?.(o.value)}
            >
              <Text style={[styles.text, { color: on ? c.onPrimary : c.text }]}>{o.label}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  } else {
    body = (
      <>
        <Pressable style={[styles.chip, styles.dropdown, { backgroundColor: c.surface, borderColor: c.border }]} onPress={() => setOpen((v) => !v)}>
          <Text style={[styles.text, { color: c.text }]}>{options.find((o) => o.value === value)?.label ?? placeholder}</Text>
          <Text style={[styles.text, { color: c.mutedText }]}>{open ? '▴' : '▾'}</Text>
        </Pressable>
        {open && (
          <View style={[styles.menu, { backgroundColor: c.surface, borderColor: c.border }]}>
            {options.map((o) => (
              <Pressable
                key={o.value}
                style={styles.option}
                onPress={() => {
                  onChange?.(o.value);
                  setOpen(false);
                }}
              >
                <Text style={[styles.text, { color: c.text }]}>{o.label}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </>
    );
  }
  return <Field label={label} error={error} style={style}>{body}</Field>;
}

const styles = StyleSheet.create({
  column: { gap: 8 },
  radio: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mark: { fontSize: 20 },
  text: { fontSize: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menu: { borderRadius: 8, borderWidth: 1 },
  option: { paddingHorizontal: 12, paddingVertical: 12 },
});
