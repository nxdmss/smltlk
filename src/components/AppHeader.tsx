import { Pressable, Text, View } from 'react-native';

import { styles } from '../styles';
import BrandMark from './BrandMark';

export default function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          style={styles.headerCircle}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.logoRow}>
          <BrandMark />
          <View>
            <Text style={styles.wordmark}>small talk</Text>
            <Text style={styles.wordmarkSub}>COFFEE · KIZILYURT</Text>
          </View>
        </View>
      )}
      {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
      <View style={styles.headerCircle}>
        <Text style={styles.headerDots}>••</Text>
      </View>
    </View>
  );
}
