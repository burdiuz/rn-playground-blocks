import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Sheet } from '../internal/sheet';

export interface MenuProps {
  /** Text of the trigger button (used when there is no `icon`). */
  label?: string;
  /** Glyph string or element for an icon-button trigger. */
  icon?: React.ReactNode;
  title?: string;
  side?: 'left' | 'right';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Style of the drawer panel. */
  style?: StyleProp<ViewStyle>;
  /** Style of the trigger. */
  triggerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** A button (or icon button) that opens a side drawer holding the menu items. */
export function Menu({ label = 'Menu', icon, title, side = 'left', open = false, onOpenChange, style, triggerStyle, children }: MenuProps) {
  const show = () => onOpenChange?.(true);
  return (
    <View style={{ alignSelf: 'flex-start' }}>
      {icon ? (
        <IconButton icon={icon} label={label} onPress={show} style={triggerStyle} />
      ) : (
        <Button label={label} variant="outline" onPress={show} style={triggerStyle} />
      )}
      <Sheet
        visible={open}
        onClose={() => onOpenChange?.(false)}
        title={title}
        style={style}
        outer={{ flexDirection: side === 'right' ? 'row-reverse' : 'row' }}
        panel={{ width: 288, height: '100%', padding: 16, paddingTop: 40, gap: 12 }}
      >
        {children}
      </Sheet>
    </View>
  );
}
