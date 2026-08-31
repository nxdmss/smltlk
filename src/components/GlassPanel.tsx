import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

import { styles } from '../styles';

export default function GlassPanel({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return (
    <View style={[styles.glassPanel, style]}>
      <BlurView intensity={32} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.glassContent}>{children}</View>
    </View>
  );
}
