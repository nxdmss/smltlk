import { Text, View } from 'react-native';

import { styles } from '../styles';

export default function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <View style={[styles.brandMark, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.brandMarkText, { fontSize: size * 0.48 }]}>””</Text>
    </View>
  );
}
