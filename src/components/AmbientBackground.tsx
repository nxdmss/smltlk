import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../styles';

export default function AmbientBackground() {
  const movement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(movement, { toValue: 1, duration: 5200, useNativeDriver: true }),
        Animated.timing(movement, { toValue: 0, duration: 5200, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [movement]);

  const transform = {
    transform: [
      { translateX: movement.interpolate({ inputRange: [0, 1], outputRange: [-18, 28] }) },
      { translateY: movement.interpolate({ inputRange: [0, 1], outputRange: [-8, 36] }) },
      { scale: movement.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.12] }) },
    ],
  };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient colors={['#08080A', '#101014', '#08080A']} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.ambientOrange, transform]} />
      <Animated.View style={[styles.ambientAqua, transform]} />
    </View>
  );
}
