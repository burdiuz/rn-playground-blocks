import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { Sheet } from '../internal/sheet';

export interface BottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  /** Style of the sheet panel. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Panel sliding up from the bottom edge, above everything else; the owner keeps `visible`. */
export function BottomSheet({ visible = false, onClose, title, style, children }: BottomSheetProps) {
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title={title}
      style={style}
      animation="slide"
      outer={{ justifyContent: 'flex-end' }}
      panel={{ width: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderTopWidth: 1, padding: 16, paddingBottom: 28, gap: 12, maxHeight: '85%' }}
    >
      {children}
    </Sheet>
  );
}
