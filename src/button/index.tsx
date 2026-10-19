import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useFocusRing } from '../internal/focus';
import { useBlocksColors } from '../theme';

export interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Button({ label, variant = 'primary', onPress, disabled, style, children }: ButtonProps) {
  const c = useBlocksColors();
  const { ring, handlers } = useFocusRing();
  const bg = variant === 'primary' ? c.primary : variant === 'danger' ? c.danger : undefined;
  const fg = variant === 'primary' || variant === 'danger' ? c.onPrimary : c.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      {...handlers}
      style={({ pressed }) => [
        styles.base,
        bg ? { backgroundColor: bg } : null,
        variant === 'outline' ? { borderWidth: 1, borderColor: c.primary } : null,
        (pressed || disabled) && { opacity: disabled ? 0.5 : 0.7 },
        ring,
        style,
      ]}
    >
      {children ?? <Text style={[styles.label, { color: fg }]}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  label: { fontWeight: '600', fontSize: 16 },
});
