import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export default function AmbientBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.paper }]} />
      <View style={styles.redDisc} />
      <View style={styles.blackBar} />
      <View style={styles.paperDisc} />
    </View>
  );
}

const styles = StyleSheet.create({
  redDisc: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: colors.red, right: -160, top: 105, opacity: 0.11 },
  blackBar: { position: 'absolute', width: 190, height: 22, backgroundColor: colors.black, left: -100, top: 420, transform: [{ rotate: '-18deg' }], opacity: 0.06 },
  paperDisc: { position: 'absolute', width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: colors.black, left: -105, bottom: 60, opacity: 0.06 },
});
