import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { FocusPressable } from './focus-pressable';
import { useBlocksColors } from '../theme';

/** Shared overlay for `Modal` and `Drawer`. */
export function Sheet({ visible, onClose, title, panel, outer, style, animation = 'fade', children }: {
  visible: boolean;
  onClose?: () => void;
  title?: string;
  panel: ViewStyle;
  outer: ViewStyle;
  style?: StyleProp<ViewStyle>;
  animation?: 'fade' | 'slide';
  children?: React.ReactNode;
}) {
  const c = useBlocksColors();
  return (
    <Modal visible={visible} transparent animationType={animation} onRequestClose={onClose}>
      <Pressable style={[styles.overlay, outer]} onPress={onClose} focusable={false}>
        <Pressable style={[panel, { backgroundColor: c.surface, borderColor: c.border }, style]} onPress={() => {}} focusable={false}>
          <View style={styles.head}>
            <Text style={[styles.title, { color: c.text }]}>{title}</Text>
            <FocusPressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" hasTVPreferredFocus style={styles.closeBtn}>
              <Text style={[styles.close, { color: c.mutedText }]}>✕</Text>
            </FocusPressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '700' },
  close: { fontSize: 20 },
  closeBtn: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
});
