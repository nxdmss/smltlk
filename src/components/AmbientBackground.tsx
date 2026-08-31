import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export default function AmbientBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.bg }]} />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  glowTop: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.red,
    opacity: 0.12,
    right: -160,
    top: 70,
  },
  glowBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.redDeep,
    opacity: 0.14,
    left: -140,
    bottom: 40,
  },
  line: {
    position: 'absolute',
    width: 220,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    left: -40,
    top: 420,
    transform: [{ rotate: '-20deg' }],
  },
});
