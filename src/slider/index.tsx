import RNSlider from '@react-native-community/slider';
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { useBlocksColors } from '../theme';

export interface SliderProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
}

export function Slider({ label, value, min = 0, max = 100, step = 1, onValueChange, style }: SliderProps) {
  const c = useBlocksColors();
  const v = Number(value ?? min) || 0;
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.head}>
        <Text style={[styles.label, { color: c.mutedText }]}>{label}</Text>
        <Text style={[styles.value, { color: c.mutedText }]}>{v}</Text>
      </View>
      <RNSlider
        style={styles.slider}
        value={v}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={onValueChange}
        minimumTrackTintColor={c.primary}
        maximumTrackTintColor={c.border}
        thumbTintColor={c.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 4 },
  head: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 14, fontWeight: '600' },
  value: { fontSize: 14 },
  slider: { height: 32 },
});
