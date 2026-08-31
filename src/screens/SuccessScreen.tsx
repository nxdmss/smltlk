import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import BrandMark from '../components/BrandMark';
import type { CoffeeShop } from '../data/locations';
import { styles } from '../styles';

export default function SuccessScreen({
  location,
  pickupTime,
  onNewOrder,
}: {
  location: CoffeeShop;
  pickupTime: string;
  onNewOrder: () => void;
}) {
  return (
    <LinearGradient colors={['#FF5A20', '#E22E0E', '#9F1608']} style={styles.successPage}>
      <View style={styles.successGlow} />
      <View style={styles.successMark}>
        <BrandMark size={76} />
      </View>
      <Text style={styles.successEyebrow}>ORDER ST-104 · PAID</Text>
      <Text style={styles.successTitle}>уже{'\n'}готовим!</Text>
      <Text style={styles.successText}>Забери заказ {pickupTime} по адресу</Text>
      <Text style={styles.successAddress}>{location.address}</Text>
      <View style={styles.statusTrack}>
        <View style={styles.statusTrackFilled} />
      </View>
      <View style={styles.statusLabels}>
        <Text style={styles.statusActive}>принят</Text>
        <Text style={styles.statusMuted}>готовится</Text>
        <Text style={styles.statusMuted}>готов</Text>
      </View>
      <Pressable accessibilityRole="button" style={styles.successButton} onPress={onNewOrder}>
        <Text style={styles.successButtonText}>на главный экран</Text>
      </Pressable>
    </LinearGradient>
  );
}
