import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface IconButtonProps {
  /** A glyph string (emoji or symbol such as `＋`, `☰`) or any element, e.g. an `@expo/vector-icons` icon. */
  icon: React.ReactNode;
  /** Accessibility label. */
  label?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Round button with a glyph instead of a text label. */
export function IconButton({ icon, label, variant = 'ghost', onPress, disabled, style }: IconButtonProps) {
  const c = useBlocksColors();
  const bg = variant === 'primary' ? c.primary : variant === 'danger' ? c.danger : undefined;
  const fg = variant === 'primary' || variant === 'danger' ? c.onPrimary : c.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label ?? (typeof icon === 'string' ? icon : undefined)}
      style={({ pressed }) => [
        styles.base,
        bg ? { backgroundColor: bg } : null,
        variant === 'outline' ? { borderWidth: 1, borderColor: c.primary } : null,
        (pressed || disabled) && { opacity: disabled ? 0.5 : 0.7 },
        style,
      ]}
    >
      {typeof icon === 'string' ? <Text style={[styles.icon, { color: fg }]}>{icon}</Text> : icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22 },
});
