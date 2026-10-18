import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  const c = useBlocksColors();
  return <View style={[{ height: 1, alignSelf: 'stretch', backgroundColor: c.border }, style]} />;
}
