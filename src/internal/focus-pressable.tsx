import React from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { useFocusRing } from './focus';

export interface FocusPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
}

/** `Pressable` that shows a focus ring while it holds D-pad / keyboard focus. */
export function FocusPressable({ style, onFocus, onBlur, ...rest }: FocusPressableProps) {
  const { ring, handlers } = useFocusRing();
  return (
    <Pressable
      {...rest}
      onFocus={(e) => {
        handlers.onFocus();
        onFocus?.(e);
      }}
      onBlur={(e) => {
        handlers.onBlur();
        onBlur?.(e);
      }}
      style={[style, ring]}
    />
  );
}
