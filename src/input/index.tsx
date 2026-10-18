import React from 'react';
import { StyleSheet, TextInput, type StyleProp, type ViewStyle } from 'react-native';

import { Field } from '../internal/field';
import { useBlocksColors } from '../theme';

export interface InputProps {
  label?: string;
  value?: string | number;
  onChangeText?: (text: string) => void;
  kind?: 'text' | 'number' | 'password' | 'multiline';
  placeholder?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

export function Input({ label, value, onChangeText, kind = 'text', placeholder, error, style }: InputProps) {
  const c = useBlocksColors();
  return (
    <Field label={label} error={error} style={style}>
      <TextInput
        value={value === undefined || value === null ? '' : String(value)}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={c.mutedText}
        keyboardType={kind === 'number' ? 'numeric' : 'default'}
        secureTextEntry={kind === 'password'}
        multiline={kind === 'multiline'}
        textAlignVertical={kind === 'multiline' ? 'top' : 'auto'}
        style={[styles.input, kind === 'multiline' && styles.multiline, { backgroundColor: c.surface, borderColor: c.border, color: c.text }]}
      />
    </Field>
  );
}

const styles = StyleSheet.create({
  input: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, fontSize: 16 },
  multiline: { minHeight: 96 },
});
