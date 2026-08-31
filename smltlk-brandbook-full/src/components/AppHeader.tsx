import { Pressable, StyleSheet, Text, View } from 'react-native';
import BrandMark from './BrandMark';
import { colors } from '../theme';

export default function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.brandRow}>
          <BrandMark />
          <View>
            <Text style={styles.wordmark}>small talk</Text>
            <Text style={styles.sub}>COFFEE · KIZILYURT</Text>
          </View>
        </View>
      )}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.menu}><View style={styles.menuLine}/><View style={styles.menuLine}/></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  wordmark: { color: colors.black, fontSize: 24, fontWeight: '900', letterSpacing: -1.4 },
  sub: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 7.5, letterSpacing: 1.2, marginTop: 1 },
  title: { color: colors.black, fontSize: 20, fontWeight: '900', letterSpacing: -0.8 },
  back: { width: 44, height: 44, borderWidth: 1.5, borderColor: colors.black, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  backText: { color: colors.black, fontSize: 21, fontWeight: '900' },
  menu: { width: 44, height: 44, borderWidth: 1.5, borderColor: colors.black, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 5 },
  menuLine: { width: 17, height: 2, backgroundColor: colors.black, borderRadius: 2 },
});
