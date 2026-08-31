import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#151519' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8E8E95' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#151519' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2A2A30' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#33333A' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#173D43' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
];

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
    <MapView
      accessibilityLabel="Карта кофеен Small Talk"
      customMapStyle={darkMapStyle}
      initialRegion={{ latitude: 43.1944, longitude: 46.8766, latitudeDelta: 0.024, longitudeDelta: 0.04 }}
      mapPadding={{ top: 24, right: 20, bottom: 24, left: 20 }}
      pitchEnabled={false}
      rotateEnabled={false}
      showsCompass={false}
      showsPointsOfInterests={false}
      style={StyleSheet.absoluteFill}
    >
      {shops.map((shop, index) => {
        const active = selectedId === shop.id;
        return (
          <Marker key={shop.id} coordinate={shop.coordinate} onPress={() => onSelect(shop)} tracksViewChanges={false}>
            <View style={[styles.pin, active && styles.pinActive]}>
              <Text style={[styles.pinText, active && styles.pinTextActive]}>{index + 1}</Text>
            </View>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  pin: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#242429', borderWidth: 1, borderColor: 'rgba(255,255,255,0.34)', alignItems: 'center', justifyContent: 'center' },
  pinActive: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.orange, borderWidth: 3, borderColor: colors.white },
  pinText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13 },
  pinTextActive: { fontSize: 16 },
});
