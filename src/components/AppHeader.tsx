import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';
import BrandMark from './BrandMark';

export default function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <BrandMark width={52} />
        {onBack ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
        ) : null}
      </View>

      {title ? <Text style={styles.title}>{title}</Text> : <View style={styles.centerSpacer} />}
      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  left: {
    minWidth: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  back: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.8,
    textAlign: 'center',
    paddingTop: 4,
  },
  centerSpacer: {
    flex: 1,
  },
  rightSpacer: {
    width: 88,
  },
});
