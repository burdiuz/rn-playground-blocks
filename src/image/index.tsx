import React from 'react';
import { Image as RNImage, type StyleProp, type ImageStyle } from 'react-native';

export interface ImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export function Image({ uri, style }: ImageProps) {
  return <RNImage source={{ uri }} resizeMode="cover" style={[{ width: '100%', height: 160 }, style]} />;
}
