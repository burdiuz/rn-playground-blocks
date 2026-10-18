import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';
import { progressFraction } from './fraction';

export interface ProgressProps {
  value?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
}

/** Determinate progress bar. */
export function Progress({ value = 0, max = 100, style }: ProgressProps) {
  const c = useBlocksColors();
  return (
    <View style={[styles.track, { backgroundColor: c.border }, style]}>
      <View style={[styles.fill, { backgroundColor: c.primary, width: `${progressFraction(value, max) * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
