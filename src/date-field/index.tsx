import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Field } from '../internal/field';
import { useBlocksColors } from '../theme';

export interface DateFieldProps {
  label?: string;
  /** `YYYY-MM-DD`. */
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function DateField({ label, value = '', onChange, placeholder = 'YYYY-MM-DD', error, style }: DateFieldProps) {
  const c = useBlocksColors();
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date();
  const pick = (_e: unknown, d?: Date) => {
    if (d) onChange?.(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  };
  return (
    <Field label={label} error={error} style={style}>
      {Platform.OS === 'ios' ? (
        <DateTimePicker value={parsed} mode="date" display="compact" onChange={pick} />
      ) : (
        <Pressable
          style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, backgroundColor: c.surface, borderColor: c.border }}
          onPress={() => DateTimePickerAndroid.open({ value: parsed, mode: 'date', onChange: pick })}
        >
          <Text style={{ color: value ? c.text : c.mutedText, fontSize: 16 }}>{value || placeholder}</Text>
        </Pressable>
      )}
    </Field>
  );
}
