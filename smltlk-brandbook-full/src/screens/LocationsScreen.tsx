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
      <Text style={s.title}>где{`\n`}встретимся?</Text>
      <View style={s.statement}><Text style={s.statementText}>кофе — повод для разговора.</Text><Text style={s.statementNo}>01</Text></View>
      <View style={s.mapFrame}><CoffeeMap shops={coffeeShops} selectedId={selected.id} onSelect={onSelect} /></View>
      <View style={s.selectedCard}>
        <View style={s.selectedNo}><Text style={s.selectedNoText}>0{selectedIndex}</Text></View>
        <View style={s.selectedCopy}><Text style={s.selectedName}>{selected.name}</Text><Text style={s.selectedAddress}>{selected.address}</Text><Text style={s.selectedMeta}>сегодня · {selected.schedule}</Text></View>
      </View>
      <View style={s.sectionHead}><Text style={s.sectionTitle}>точки</Text><Text style={s.sectionMeta}>НАЖМИ, ЧТОБЫ ВЫБРАТЬ</Text></View>
      {coffeeShops.map((shop, index) => {
        const active = selected.id === shop.id;
        return <Pressable key={shop.id} onPress={() => onSelect(shop)} style={[s.location, active && s.locationActive]}>
          <Text style={[s.locationNo, active && s.locationNoActive]}>0{index + 1}</Text>
          <View style={{ flex: 1 }}><Text style={[s.locationAddress, active && s.locationTextActive]}>{shop.address}</Text><Text style={[s.locationTime, active && s.locationTextActive]}>{shop.schedule}</Text></View>
          <Text style={[s.arrow, active && s.locationTextActive]}>↗</Text>
        </Pressable>;
      })}
      <Pressable onPress={onContinue} style={s.primary}><Text style={s.primaryText}>открыть меню</Text><Text style={s.primaryText}>→</Text></Pressable>
    </ScreenScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 18, paddingBottom: 34 },
  kicker: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.35, marginBottom: 8 },
  title: { color: colors.black, fontSize: 52, lineHeight: 48, fontWeight: '900', letterSpacing: -3.2 },
  statement: { marginTop: 18, marginBottom: 20, minHeight: 62, backgroundColor: colors.black, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 },
  statementText: { color: colors.white, fontSize: 13, fontWeight: '800' }, statementNo: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13 },
  mapFrame: { height: 350, borderWidth: 1.5, borderColor: colors.black, overflow: 'hidden', marginBottom: 10 },
  selectedCard: { borderWidth: 1.5, borderColor: colors.black, backgroundColor: colors.white, minHeight: 86, flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 28 },
  selectedNo: { width: 54, height: 54, borderRadius: 16, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' }, selectedNoText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 14 },
  selectedCopy: { flex: 1, marginLeft: 12 }, selectedName: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1 }, selectedAddress: { color: colors.black, fontSize: 15, fontWeight: '900', marginTop: 4 }, selectedMeta: { color: colors.muted, fontFamily: 'IBMPlexMono_500Medium', fontSize: 8.5, marginTop: 4 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }, sectionTitle: { color: colors.black, fontSize: 33, fontWeight: '900', letterSpacing: -1.7 }, sectionMeta: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 7.5, letterSpacing: 1 },
  location: { minHeight: 68, borderTopWidth: 1.5, borderColor: colors.black, flexDirection: 'row', alignItems: 'center', gap: 12 }, locationActive: { backgroundColor: colors.red, borderTopColor: colors.red, paddingHorizontal: 10 },
  locationNo: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11, width: 32 }, locationNoActive: { color: colors.white }, locationAddress: { color: colors.black, fontSize: 14, fontWeight: '900' }, locationTime: { color: colors.muted, fontFamily: 'IBMPlexMono_500Medium', fontSize: 8.5, marginTop: 3 }, locationTextActive: { color: colors.white }, arrow: { color: colors.black, fontSize: 22 },
  primary: { minHeight: 64, borderRadius: 18, backgroundColor: colors.black, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 20 }, primaryText: { color: colors.white, fontSize: 16, fontWeight: '900' },
});
