import { Pressable, StyleSheet, Text, View } from 'react-native';
import BrandMark from './BrandMark';
import { colors } from '../theme';

export default function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.leftBlock}>
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
        ) : (
          <BrandMark size={34} />
        )}
      </View>

      <View style={styles.center}>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <>
            <Text style={styles.wordmark}>small talk</Text>
            <Text style={styles.sub}>COFFEE · KIZILYURT</Text>
          </>
        )}
      </View>

      <View style={styles.rightBlock} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  leftBlock: {
    width: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightBlock: {
    width: 42,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  wordmark: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.8,
    textTransform: 'lowercase',
  },
  sub: {
    color: colors.muted,
    fontFamily: 'IBMPlexMono_600SemiBold',
    fontSize: 7.5,
    letterSpacing: 1.1,
    marginTop: 2,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  back: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
  },
  backText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
});
