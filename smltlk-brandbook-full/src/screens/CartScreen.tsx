import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import ProductVisual from '../components/ProductVisual';
import ScreenScrollView from '../components/ScreenScrollView';
import type { CoffeeShop } from '../data/locations';
import { menu } from '../data/menu';
import { colors } from '../theme';
import type { CartItem, CartSummary } from '../types';
import { rubles } from '../utils';

export default function CartScreen({ items, summary, location, onBack, onLocations, onQuantityChange, onCheckout }: { items: CartItem[]; summary: CartSummary; location: CoffeeShop; onBack: () => void; onLocations: () => void; onQuantityChange: (key: string, delta: number) => void; onCheckout: () => void }) {
  return <View style={{ flex: 1 }}>
    <ScreenScrollView screenKey="cart" contentContainerStyle={s.page}>
      <AppHeader title="корзина" onBack={onBack}/>
      <Text style={s.kicker}>ЗАКАЗ / САМОВЫВОЗ</Text><Text style={s.title}>почти{`\n`}готово.</Text>
      <Pressable onPress={onLocations} style={s.location}><Text style={s.locationTag}>PICK UP</Text><View style={{ flex: 1 }}><Text style={s.locationLabel}>ТОЧКА</Text><Text style={s.locationAddress}>{location.address}</Text></View><Text style={s.change}>сменить</Text></Pressable>
      <View style={s.items}>{items.map(item => { const product = menu.find(p => p.id === item.productId) ?? menu[0]; return <View key={item.key} style={s.item}>
        <View style={s.thumb}><ProductVisual product={product}/></View>
        <View style={s.copy}><Text style={s.itemName}>{item.name}</Text><Text style={s.details}>{item.details}</Text><Text style={s.price}>{rubles(item.unitPrice * item.quantity)}</Text></View>
        <View style={s.counter}><Pressable onPress={() => onQuantityChange(item.key, -1)} style={s.counterButton}><Text style={s.counterButtonText}>−</Text></Pressable><Text style={s.counterValue}>{item.quantity}</Text><Pressable onPress={() => onQuantityChange(item.key, 1)} style={s.counterButton}><Text style={s.counterButtonText}>+</Text></Pressable></View>
      </View>; })}</View>
      <View style={s.summary}><View style={s.row}><Text style={s.summaryLabel}>напитки · {summary.quantity}</Text><Text style={s.summaryValue}>{rubles(summary.total)}</Text></View><View style={s.row}><Text style={s.summaryLabel}>самовывоз</Text><Text style={s.free}>0 ₽</Text></View><View style={[s.row, s.totalRow]}><Text style={s.totalLabel}>итого</Text><Text style={s.totalValue}>{rubles(summary.total)}</Text></View></View>
    </ScreenScrollView>
    <View style={s.bottom}><Pressable onPress={onCheckout} style={s.primary}><Text style={s.primaryText}>к оформлению</Text><Text style={s.primaryText}>{rubles(summary.total)}</Text></Pressable></View>
  </View>;
}
const s = StyleSheet.create({
  page: { padding: 18, paddingBottom: 120 }, kicker: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.3 }, title: { color: colors.black, fontSize: 48, lineHeight: 45, fontWeight: '900', letterSpacing: -2.8, marginTop: 7, marginBottom: 20 },
  location: { minHeight: 72, borderWidth: 1.5, borderColor: colors.black, flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10, marginBottom: 18 }, locationTag: { backgroundColor: colors.red, color: colors.white, paddingHorizontal: 9, paddingVertical: 17, fontFamily: 'IBMPlexMono_700Bold', fontSize: 7 }, locationLabel: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8 }, locationAddress: { color: colors.black, fontSize: 13, fontWeight: '900', marginTop: 3 }, change: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8 },
  items: { gap: 10 }, item: { minHeight: 140, borderWidth: 1.5, borderColor: colors.black, backgroundColor: colors.white, flexDirection: 'row', padding: 8 }, thumb: { width: 106, overflow: 'hidden' }, copy: { flex: 1, padding: 9 }, itemName: { color: colors.black, fontSize: 16, fontWeight: '900' }, details: { color: colors.muted, fontSize: 10.5, lineHeight: 15, marginTop: 5 }, price: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11, marginTop: 'auto' }, counter: { alignItems: 'center', justifyContent: 'center', gap: 5 }, counterButton: { width: 34, height: 34, borderWidth: 1.5, borderColor: colors.black, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }, counterButtonText: { color: colors.black, fontSize: 19 }, counterValue: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11 },
  summary: { borderWidth: 1.5, borderColor: colors.black, padding: 15, marginTop: 18, backgroundColor: colors.paper }, row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }, summaryLabel: { color: colors.muted, fontSize: 12 }, summaryValue: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11 }, free: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11 }, totalRow: { borderTopWidth: 1.5, borderColor: colors.black, marginTop: 6, paddingTop: 14 }, totalLabel: { color: colors.black, fontSize: 18, fontWeight: '900' }, totalValue: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 17 },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 18, backgroundColor: colors.paper }, primary: { minHeight: 62, borderRadius: 18, backgroundColor: colors.black, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 }, primaryText: { color: colors.white, fontSize: 15, fontWeight: '900' },
});
