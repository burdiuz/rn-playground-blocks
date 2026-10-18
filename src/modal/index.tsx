import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { Sheet } from '../internal/sheet';

export interface ModalProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  /** Style of the dialog panel. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Centered dialog; the owner keeps `visible`. */
export function Modal({ visible = false, onClose, title, style, children }: ModalProps) {
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title={title}
      style={style}
      outer={{ alignItems: 'center', justifyContent: 'center', padding: 24 }}
      panel={{ width: '100%', borderRadius: 12, borderWidth: 1, padding: 16, gap: 12 }}
    >
      {children}
    </Sheet>
  );
}
