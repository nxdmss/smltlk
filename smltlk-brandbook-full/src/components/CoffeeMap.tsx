import { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

const TILE = 256;
const ZOOM = 14;
const world = 2 ** ZOOM;

function project(latitude: number, longitude: number) {
  const x = ((longitude + 180) / 360) * world;
  const latRad = (latitude * Math.PI) / 180;
  const y = (1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * world;
  return { x, y };
}

export default function CoffeeMap({ shops, selectedId, onSelect }: { shops: CoffeeShop[]; selectedId: string; onSelect: (shop: CoffeeShop) => void }) {
  const [size, setSize] = useState({ width: 480, height: 350 });
  const center = useMemo(() => ({
    latitude: shops.reduce((sum, s) => sum + s.coordinate.latitude, 0) / shops.length,
    longitude: shops.reduce((sum, s) => sum + s.coordinate.longitude, 0) / shops.length,
  }), [shops]);
  const centerPx = project(center.latitude, center.longitude);
  const baseX = Math.floor(centerPx.x);
  const baseY = Math.floor(centerPx.y);
  const tiles = [] as Array<{ x: number; y: number }>;
  for (let dx = -2; dx <= 2; dx += 1) for (let dy = -2; dy <= 2; dy += 1) tiles.push({ x: baseX + dx, y: baseY + dy });

  return (
    <View
      style={styles.map}
      onLayout={(event: any) => setSize({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })}
    >
      {tiles.map((tile) => (
        <Image
          key={`${tile.x}-${tile.y}`}
          source={{ uri: `https://tile.openstreetmap.org/${ZOOM}/${tile.x}/${tile.y}.png` }}
          style={{ position: 'absolute', width: TILE, height: TILE, left: (tile.x - centerPx.x) * TILE + size.width / 2, top: (tile.y - centerPx.y) * TILE + size.height / 2 }}
        />
      ))}
      <View pointerEvents="none" style={styles.tint} />
      {shops.map((shop, index) => {
        const p = project(shop.coordinate.latitude, shop.coordinate.longitude);
        const active = selectedId === shop.id;
        return (
          <Pressable
            key={shop.id}
            accessibilityRole="button"
            accessibilityLabel={`Выбрать ${shop.address}`}
            onPress={() => onSelect(shop)}
            style={[styles.pinWrap, { left: (p.x - centerPx.x) * TILE + size.width / 2 - 22, top: (p.y - centerPx.y) * TILE + size.height / 2 - 44 }]}
          >
            <View style={[styles.pin, active && styles.pinActive]}><Text style={[styles.pinText, active && styles.pinTextActive]}>{index + 1}</Text></View>
            <View style={[styles.pinTail, active && styles.pinTailActive]} />
          </Pressable>
        );
      })}
      <View style={styles.mapLabel}><Text style={styles.mapLabelText}>REAL MAP · OPENSTREETMAP</Text></View>
      <Text style={styles.attribution}>© OpenStreetMap contributors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, overflow: 'hidden', backgroundColor: '#E9E5DD' },
  tint: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(244,240,232,0.18)' },
  pinWrap: { position: 'absolute', width: 44, height: 52, alignItems: 'center' },
  pin: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.black, borderWidth: 2, borderColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  pinActive: { backgroundColor: colors.red, width: 44, height: 44, borderRadius: 14, borderColor: colors.black },
  pinText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 12 },
  pinTextActive: { fontSize: 15 },
  pinTail: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 9, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: colors.black, marginTop: -1 },
  pinTailActive: { borderTopColor: colors.red },
  mapLabel: { position: 'absolute', left: 12, top: 12, backgroundColor: colors.black, paddingHorizontal: 10, paddingVertical: 7 },
  mapLabelText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 7.5, letterSpacing: 1 },
  attribution: { position: 'absolute', right: 8, bottom: 6, color: '#333', backgroundColor: 'rgba(255,255,255,0.78)', paddingHorizontal: 4, fontSize: 7 },
});
