import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import ProductVisual from '../components/ProductVisual';
import ScreenScrollView from '../components/ScreenScrollView';
import type { CoffeeShop } from '../data/locations';
import { categories, menu } from '../data/menu';
import type { Product } from '../data/menu';
import { colors } from '../theme';
import type { CartSummary } from '../types';
import { rubles } from '../utils';

export default function MenuScreen({ selectedLocation, activeCategory, onCategoryChange, onLocations, onOpenProduct, onCart, cartSummary }: { selectedLocation: CoffeeShop; activeCategory: string; onCategoryChange: (id: string) => void; onLocations: () => void; onOpenProduct: (p: Product) => void; onCart: () => void; cartSummary: CartSummary }) {
  const products = useMemo(() => activeCategory === 'popular' ? menu.filter(p => p.popular) : menu.filter(p => p.category === activeCategory), [activeCategory]);
  const seasonal = menu.find(p => p.id === 'matcha-strawberry') ?? menu[0];
  return <View style={{ flex: 1 }}>
    <ScreenScrollView screenKey="menu" contentContainerStyle={s.page}>
      <AppHeader />
      <Pressable onPress={onLocations} style={s.pickup}><View style={s.pickupTag}><Text style={s.pickupTagText}>PICK UP</Text></View><View style={{ flex: 1 }}><Text style={s.pickupLabel}>ЗАБРАТЬ В</Text><Text numberOfLines={1} style={s.pickupAddress}>{selectedLocation.address}</Text></View><Text style={s.pickupArrow}>↗</Text></Pressable>
      <Pressable onPress={() => onOpenProduct(seasonal)} style={s.hero}>
        <View style={s.heroCopy}><Text style={s.heroKicker}>NEW / 12</Text><Text style={s.heroTitle}>матча{`\n`}клубника</Text><Text style={s.heroDesc}>зелёная матча · молоко · клубника</Text><View style={s.heroPrice}><Text style={s.heroPriceText}>370 ₽</Text></View></View>
        <View style={s.heroArt}><ProductVisual product={seasonal} /></View>
      </Pressable>
      <View style={s.titleRow}><Text style={s.menuTitle}>меню</Text><Text style={s.count}>{String(products.length).padStart(2, '0')} ПОЗИЦИЙ</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.categories}>{categories.map(cat => { const active = cat.id === activeCategory; return <Pressable key={cat.id} onPress={() => onCategoryChange(cat.id)} style={[s.chip, active && s.chipActive]}><Text style={[s.chipText, active && s.chipTextActive]}>{cat.label}</Text></Pressable>; })}</ScrollView>
      <View style={s.grid}>{products.map(product => <Pressable key={product.id} onPress={() => onOpenProduct(product)} style={s.card}>
        <ProductVisual product={product}/><View style={s.cardCopy}><Text style={s.cardCode}>ST/{product.code}</Text><Text style={s.cardName}>{product.name}</Text><View style={s.cardFooter}><Text style={s.cardPrice}>от {rubles(product.sizes[0].price)}</Text><View style={s.plus}><Text style={s.plusText}>+</Text></View></View></View>
      </Pressable>)}</View>
    </ScreenScrollView>
    {cartSummary.quantity > 0 ? <Pressable onPress={onCart} style={s.cartBar}><View style={s.cartCount}><Text style={s.cartCountText}>{cartSummary.quantity}</Text></View><Text style={s.cartText}>корзина</Text><Text style={s.cartTotal}>{rubles(cartSummary.total)}</Text></Pressable> : null}
  </View>;
}

const s = StyleSheet.create({
  page: { padding: 18, paddingBottom: 120 },
  pickup: { borderWidth: 1.5, borderColor: colors.black, minHeight: 72, flexDirection: 'row', alignItems: 'center', padding: 10, gap: 10, marginBottom: 14 }, pickupTag: { width: 54, height: 50, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' }, pickupTagText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, transform: [{ rotate: '-90deg' }] }, pickupLabel: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1 }, pickupAddress: { color: colors.black, fontWeight: '900', fontSize: 14, marginTop: 4 }, pickupArrow: { color: colors.black, fontSize: 22 },
  hero: { height: 286, backgroundColor: colors.red, borderWidth: 1.5, borderColor: colors.black, flexDirection: 'row', overflow: 'hidden', marginBottom: 30 }, heroCopy: { width: '58%', padding: 18, zIndex: 2 }, heroKicker: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.3 }, heroTitle: { color: colors.white, fontSize: 38, lineHeight: 36, fontWeight: '900', letterSpacing: -2.3, marginTop: 18 }, heroDesc: { color: colors.white, opacity: 0.82, fontSize: 10.5, lineHeight: 15, marginTop: 10 }, heroPrice: { alignSelf: 'flex-start', backgroundColor: colors.black, paddingHorizontal: 12, paddingVertical: 8, marginTop: 16 }, heroPriceText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11 }, heroArt: { position: 'absolute', right: -20, bottom: -10, width: '56%', height: '82%', transform: [{ rotate: '6deg' }], borderWidth: 1.5, borderColor: colors.black },
  titleRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }, menuTitle: { color: colors.black, fontSize: 36, fontWeight: '900', letterSpacing: -2 }, count: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 8, letterSpacing: 1 },
  categories: { gap: 8, paddingRight: 18, marginBottom: 18 }, chip: { borderWidth: 1.5, borderColor: colors.black, borderRadius: 99, paddingHorizontal: 14, paddingVertical: 10 }, chipActive: { backgroundColor: colors.black }, chipText: { color: colors.black, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 10 }, chipTextActive: { color: colors.white },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 }, card: { width: '48.5%', borderWidth: 1.5, borderColor: colors.black, backgroundColor: colors.white, overflow: 'hidden' }, cardCopy: { padding: 11 }, cardCode: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 7.5, letterSpacing: 1 }, cardName: { minHeight: 42, color: colors.black, fontSize: 16, lineHeight: 19, fontWeight: '900', marginTop: 5 }, cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }, cardPrice: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 9 }, plus: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' }, plusText: { color: colors.white, fontSize: 21, lineHeight: 23 },
  cartBar: { position: 'absolute', left: 18, right: 18, bottom: 18, minHeight: 64, borderRadius: 18, backgroundColor: colors.black, flexDirection: 'row', alignItems: 'center', padding: 10 }, cartCount: { width: 44, height: 44, borderRadius: 13, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' }, cartCountText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 12 }, cartText: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '900', marginLeft: 12 }, cartTotal: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 12 },
});
