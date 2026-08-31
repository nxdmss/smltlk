import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { colors } from '../theme';

export default function BrandMark({ size = 34, style, inverted = false }: { size?: number; inverted?: boolean; style?: StyleProp<TextStyle> }) {
  const fg = inverted ? colors.white : colors.red;
  return (
    <View style={styles.wrap}>
      <Text style={[styles.quotes, { color: fg, fontSize: size, lineHeight: size }, style]}>””</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 28,
  },
  quotes: {
    fontWeight: '900',
    letterSpacing: -4,
    textAlign: 'center',
  },
});
