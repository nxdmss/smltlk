import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

export default function CoffeeMap({ shops, selectedId, onSelect }: { shops: CoffeeShop[]; selectedId: string; onSelect: (shop: CoffeeShop) => void }) {
  const latitude = shops.reduce((sum, s) => sum + s.coordinate.latitude, 0) / shops.length;
  const longitude = shops.reduce((sum, s) => sum + s.coordinate.longitude, 0) / shops.length;
  return (
    <MapView style={StyleSheet.absoluteFillObject} initialRegion={{ latitude, longitude, latitudeDelta: 0.018, longitudeDelta: 0.032 }}>
      {shops.map((shop, index) => {
        const active = selectedId === shop.id;
        return (
          <Marker key={shop.id} coordinate={shop.coordinate} onPress={() => onSelect(shop)}>
            <View style={[styles.pin, active && styles.pinActive]}><Text style={styles.pinText}>{index + 1}</Text></View>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  pin: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.black, borderWidth: 2, borderColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  pinActive: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.red, borderColor: colors.black },
  pinText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13 },
});
