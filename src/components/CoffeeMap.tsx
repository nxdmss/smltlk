import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

export default function CoffeeMap({
  shops,
  selectedId,
  onSelect,
}: {
  shops: CoffeeShop[];
  selectedId: string;
  onSelect: (shop: CoffeeShop) => void;
}) {
  return (
    <LinearGradient colors={['#253B3D', '#11181B', '#101012']} style={styles.map}>
      <View style={styles.water} />
      <View style={[styles.road, styles.roadOne]} />
      <View style={[styles.road, styles.roadTwo]} />
      <View style={[styles.road, styles.roadThree]} />
      <Text style={styles.city}>КИЗИЛЮРТ · WEB PREVIEW</Text>
      {shops.map((shop, index) => {
        const active = selectedId === shop.id;
        return (
          <Pressable
            key={shop.id}
            accessibilityRole="button"
            accessibilityLabel={`Выбрать кофейню ${shop.address}`}
            onPress={() => onSelect(shop)}
            style={[styles.pinWrap, shop.mapPosition]}
          >
            <View style={[styles.pin, active && styles.pinActive]}>
              <Text style={[styles.pinText, active && styles.pinTextActive]}>{index + 1}</Text>
            </View>
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, overflow: 'hidden' },
  water: { position: 'absolute', width: 90, height: 500, backgroundColor: '#21484F', top: -70, left: '58%', borderRadius: 60, transform: [{ rotate: '20deg' }] },
  road: { position: 'absolute', height: 9, borderRadius: 9, backgroundColor: 'rgba(255,255,255,0.13)' },
  roadOne: { width: 560, top: 94, left: -65, transform: [{ rotate: '-14deg' }] },
  roadTwo: { width: 540, top: 238, left: -45, transform: [{ rotate: '11deg' }] },
  roadThree: { width: 400, top: 170, left: -130, transform: [{ rotate: '71deg' }] },
  city: { position: 'absolute', left: 16, bottom: 16, color: 'rgba(255,255,255,0.42)', fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 9, letterSpacing: 1.2 },
  pinWrap: { position: 'absolute' },
  pin: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#242429', borderWidth: 1, borderColor: 'rgba(255,255,255,0.28)', alignItems: 'center', justifyContent: 'center' },
  pinActive: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.orange, borderColor: colors.white, borderWidth: 3, shadowColor: colors.orange, shadowOpacity: 0.6, shadowRadius: 14 },
  pinText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13 },
  pinTextActive: { fontSize: 16 },
});
