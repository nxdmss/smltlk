import { Pressable, Text, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import GlassPanel from '../components/GlassPanel';
import ScreenScrollView from '../components/ScreenScrollView';
import CoffeeMap from '../components/CoffeeMap';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import { styles } from '../styles';

export default function LocationsScreen({
  selected,
  onSelect,
  onContinue,
}: {
  selected: CoffeeShop;
  onSelect: (shop: CoffeeShop) => void;
  onContinue: () => void;
}) {
  const selectedIndex = coffeeShops.findIndex((shop) => shop.id === selected.id) + 1;

  return (
    <ScreenScrollView screenKey="locations" contentContainerStyle={styles.pageContent}>
      <AppHeader />
      <Text style={styles.eyebrow}>ТОЛЬКО САМОВЫВОЗ · 4 ТОЧКИ</Text>
      <Text style={styles.displayTitle}>где заберёшь?</Text>
      <Text style={styles.displaySubtitle}>
        Выбери кофейню — покажем её меню и приготовим заказ к твоему приезду.
      </Text>

      <View style={styles.mapFrame}>
        <CoffeeMap shops={coffeeShops} selectedId={selected.id} onSelect={onSelect} />
        <View pointerEvents="none" style={styles.mapTopBadge}>
          <Text style={styles.mapTopBadgeText}>LIVE MAP</Text>
          <View style={styles.liveDot} />
        </View>
      </View>

      <GlassPanel style={styles.selectedLocationCard}>
        <View style={styles.locationNumber}>
          <Text style={styles.locationNumberText}>{selectedIndex}</Text>
        </View>
        <View style={styles.locationCopy}>
          <Text style={styles.locationName}>{selected.name}</Text>
          <Text style={styles.locationAddress}>{selected.address}</Text>
          <Text style={styles.locationSchedule}>открыто · {selected.schedule}</Text>
        </View>
        <Text style={styles.locationArrow}>↗</Text>
      </GlassPanel>

      <Text style={styles.sectionLabel}>ВСЕ КОФЕЙНИ</Text>
      <View style={styles.locationList}>
        {coffeeShops.map((shop, index) => {
          const active = selected.id === shop.id;
          return (
            <Pressable
              key={shop.id}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(shop)}
              style={[styles.locationRow, active && styles.locationRowActive]}
            >
              <Text style={[styles.locationRowIndex, active && styles.locationRowIndexActive]}>
                0{index + 1}
              </Text>
              <Text style={styles.locationRowAddress}>{shop.address}</Text>
              <View style={[styles.radio, active && styles.radioActive]} />
            </Pressable>
          );
        })}
      </View>

      <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onContinue}>
        <Text style={styles.primaryButtonText}>открыть меню</Text>
        <Text style={styles.primaryButtonArrow}>→</Text>
      </Pressable>
    </ScreenScrollView>
  );
}
