import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import CoffeeMap from '../components/CoffeeMap';
import ScreenScrollView from '../components/ScreenScrollView';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

export default function LocationsScreen({ selected, onSelect, onContinue }: { selected: CoffeeShop; onSelect: (shop: CoffeeShop) => void; onContinue: () => void }) {
  const selectedIndex = coffeeShops.findIndex((shop) => shop.id === selected.id) + 1;
  return (
    <ScreenScrollView screenKey="locations" contentContainerStyle={s.page}>
      <AppHeader />
      <Text style={s.kicker}>4 КОФЕЙНИ · КИЗИЛЮРТ · САМОВЫВОЗ</Text>
      <Text style={s.title}>выбери{`\n`}точку.</Text>
      <Text style={s.subtitle}>Настоящая карта 2ГИС. Реальные филиалы Small Talk Coffee.</Text>
      <View style={s.mapFrame}><CoffeeMap shops={coffeeShops} selectedId={selected.id} onSelect={onSelect} /></View>
      <View style={s.selectedCard}><View style={s.selectedNo}><Text style={s.selectedNoText}>0{selectedIndex}</Text></View><View style={s.selectedCopy}><Text style={s.selectedName}>{selected.name}</Text><Text style={s.selectedAddress}>{selected.address}</Text><Text style={s.selectedMeta}>сегодня · {selected.schedule}</Text></View></View>
      <View style={s.sectionHead}><Text style={s.sectionTitle}>точки</Text><Text style={s.sectionMeta}>НАЖМИ, ЧТОБЫ ВЫБРАТЬ</Text></View>
      {coffeeShops.map((shop, index) => {
        const active = selected.id === shop.id;
        return <Pressable key={shop.id} onPress={() => onSelect(shop)} style={[s.location, active && s.locationActive]}><Text style={[s.locationNo, active && s.locationNoActive]}>0{index + 1}</Text><View style={{ flex: 1 }}><Text style={s.locationAddress}>{shop.address}</Text><Text style={s.locationTime}>{shop.schedule}</Text></View><Text style={s.arrow}>↗</Text></Pressable>;
      })}
      <Pressable onPress={onContinue} style={s.primary}><Text style={s.primaryText}>открыть меню</Text><Text style={s.primaryText}>→</Text></Pressable>
    </ScreenScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 18, paddingBottom: 34 },
  kicker: { color: colors.aqua, fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.35, marginBottom: 8 },
  title: { color: colors.text, fontSize: 48, lineHeight: 46, fontWeight: '900', letterSpacing: -3.0 },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 10, marginBottom: 18, maxWidth: 360 },
  mapFrame: { height: 350, borderWidth: 1, borderColor: colors.line, overflow: 'hidden', marginBottom: 12 },
  selectedCard: { borderWidth: 1, borderColor: colors.line, backgroundColor: colors.panel, minHeight: 84, flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 26 },
  selectedNo: { width: 50, height: 50, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' },
  selectedNoText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 14 },
  selectedCopy: { flex: 1, marginLeft: 12 },
  selectedName: { color: colors.aqua, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1 },
  selectedAddress: { color: colors.text, fontSize: 15, fontWeight: '900', marginTop: 4 },
  selectedMeta: { color: colors.muted, fontFamily: 'IBMPlexMono_500Medium', fontSize: 8.5, marginTop: 4 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sectionTitle: { color: colors.text, fontSize: 33, fontWeight: '900', letterSpacing: -1.7 },
  sectionMeta: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 7.5, letterSpacing: 1 },
  location: { minHeight: 64, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.panel, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, marginBottom: 8 },
  locationActive: { backgroundColor: '#171311', borderColor: colors.red },
  locationNo: { color: colors.aqua, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11, width: 32 },
  locationNoActive: { color: colors.white },
  locationAddress: { color: colors.text, fontSize: 14, fontWeight: '900' },
  locationTime: { color: colors.muted, fontFamily: 'IBMPlexMono_500Medium', fontSize: 8.5, marginTop: 3 },
  arrow: { color: colors.text, fontSize: 22 },
  primary: { minHeight: 60, backgroundColor: colors.red, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 14 },
  primaryText: { color: colors.white, fontSize: 16, fontWeight: '900' },
});
