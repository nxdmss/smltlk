import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { Platform, SafeAreaView, View } from 'react-native';

import AmbientBackground from './src/components/AmbientBackground';
import ProductSheet from './src/components/ProductSheet';
import { coffeeShops } from './src/data/locations';
import type { Product } from './src/data/menu';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import MenuScreen from './src/screens/MenuScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import { styles } from './src/styles';
import type { CartItem, Screen } from './src/types';

export default function App() {
  const [fontsLoaded] = useFonts({ IBMPlexMono_400Regular, IBMPlexMono_500Medium, IBMPlexMono_600SemiBold, IBMPlexMono_700Bold });
  const [screen, setScreen] = useState<Screen>('locations');
  const [selectedLocation, setSelectedLocation] = useState(coffeeShops[0]);
  const [activeCategory, setActiveCategory] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const [altMilk, setAltMilk] = useState(false);
  const [syrup, setSyrup] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pickupTime, setPickupTime] = useState('через 20 мин');

  const cartSummary = useMemo(() => ({ quantity: cart.reduce((sum, item) => sum + item.quantity, 0), total: cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) }), [cart]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const reset = () => {
      (document.activeElement as HTMLElement | null)?.blur();
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    reset();
    const timer = setTimeout(reset, 200);
    return () => clearTimeout(timer);
  }, [screen]);

  if (!fontsLoaded) return <View style={styles.loading} />;

  const openProduct = (product: Product) => {
    setSelectedProduct(product); setSelectedSize(0); setAltMilk(false); setSyrup(false);
  };
  const addSelectedProduct = () => {
    if (!selectedProduct) return;
    const size = selectedProduct.sizes[selectedSize];
    const extras = [altMilk ? 'альтернативное молоко' : '', syrup ? 'сироп' : ''].filter(Boolean);
    const key = `${selectedProduct.id}-${selectedSize}-${altMilk}-${syrup}`;
    const unitPrice = size.price + (altMilk ? 90 : 0) + (syrup ? 30 : 0);
    setCart(current => {
      const existing = current.find(item => item.key === key);
      if (existing) return current.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { key, productId: selectedProduct.id, name: selectedProduct.name, details: [size.label, ...extras].join(' · '), unitPrice, quantity: 1 }];
    });
    setSelectedProduct(null);
  };
  const changeQuantity = (key: string, delta: number) => setCart(current => current.map(item => item.key === key ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));

  let content;
  if (screen === 'locations') content = <LocationsScreen selected={selectedLocation} onSelect={setSelectedLocation} onContinue={() => setScreen('menu')} />;
  else if (screen === 'menu') content = <MenuScreen selectedLocation={selectedLocation} activeCategory={activeCategory} onCategoryChange={setActiveCategory} onLocations={() => setScreen('locations')} onOpenProduct={openProduct} onCart={() => setScreen('cart')} cartSummary={cartSummary} />;
  else if (screen === 'cart') content = <CartScreen items={cart} summary={cartSummary} location={selectedLocation} onBack={() => setScreen('menu')} onLocations={() => setScreen('locations')} onQuantityChange={changeQuantity} onCheckout={() => setScreen('checkout')} />;
  else if (screen === 'checkout') content = <CheckoutScreen location={selectedLocation} summary={cartSummary} pickupTime={pickupTime} onTimeChange={setPickupTime} onBack={() => setScreen('cart')} onPay={() => setScreen('success')} />;
  else content = <SuccessScreen location={selectedLocation} pickupTime={pickupTime} onNewOrder={() => { setCart([]); setScreen('locations'); }} />;

  return <SafeAreaView style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.appShell}><AmbientBackground />{content}</View>
    <ProductSheet product={selectedProduct} selectedSize={selectedSize} altMilk={altMilk} syrup={syrup} onSizeChange={setSelectedSize} onAltMilkChange={() => setAltMilk(v => !v)} onSyrupChange={() => setSyrup(v => !v)} onClose={() => setSelectedProduct(null)} onAdd={addSelectedProduct} />
  </SafeAreaView>;
}
