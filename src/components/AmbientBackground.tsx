import { StyleSheet, View } from 'react-native';

import { colors } from '../theme';

export default function AmbientBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={s.base} />
      <View style={s.orangeGlow} />
      <View style={s.blueGlow} />
    </View>
  );
}

const s = StyleSheet.create({
  base: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.bg,
  },

  orangeGlow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.red,
    opacity: 0.055,
    top: 70,
    right: -190,
  },

  blueGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.aqua,
    opacity: 0.025,
    left: -170,
    bottom: 80,
  },
});
