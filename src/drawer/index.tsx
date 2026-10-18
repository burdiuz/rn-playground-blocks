import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { Sheet } from '../internal/sheet';

export interface DrawerProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  side?: 'left' | 'right';
  /** Style of the dialog panel. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** Side panel; the owner keeps `visible`. */
export function Drawer({ visible = false, onClose, title, side = 'left', style, children }: DrawerProps) {
  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      title={title}
      style={style}
      outer={{ flexDirection: side === 'right' ? 'row-reverse' : 'row' }}
      panel={{ width: 288, height: '100%', padding: 16, paddingTop: 40, gap: 12 }}
    >
      {children}
    </Sheet>
  );
}
