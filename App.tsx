import {
  GolosText_400Regular,
  GolosText_500Medium,
  GolosText_600SemiBold,
  GolosText_700Bold,
  GolosText_900Black,
} from '@expo-google-fonts/golos-text';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Platform,
  SafeAreaView,
  View,
} from 'react-native';

import AmbientBackground from './src/components/AmbientBackground';
import OrderSheet from './src/components/OrderSheet';
import ProductSheet from './src/components/ProductSheet';
import { coffeeShops } from './src/data/locations';
import type {
  MenuCategory,
  Product,
} from './src/data/menu';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import MenuScreen from './src/screens/MenuScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import { styles } from './src/styles';
import type {
  ActiveOrder,
  CartItem,
  Screen,
} from './src/types';

const DEFAULT_PICKUP_TIME = 'через 20 мин';
const FIRST_DEMO_ORDER = 104;

export default function App() {
  const [fontsLoaded] = useFonts({
    GolosText_400Regular,
    GolosText_500Medium,
    GolosText_600SemiBold,
    GolosText_700Bold,
    GolosText_900Black,
  });

  const [screen, setScreen] =
    useState<Screen>('locations');

  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState(coffeeShops[0]);

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<MenuCategory>('popular');

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<Product | null>(null);

  const [selectedSize, setSelectedSize] =
    useState(0);

  const [altMilk, setAltMilk] =
    useState(false);

  const [syrup, setSyrup] =
    useState(false);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [pickupTime, setPickupTime] =
    useState(DEFAULT_PICKUP_TIME);

  const [activeOrder, setActiveOrder] =
    useState<ActiveOrder | null>(null);

  const [
    orderSheetOpen,
    setOrderSheetOpen,
  ] = useState(false);

  const [
    nextOrderNumber,
    setNextOrderNumber,
  ] = useState(FIRST_DEMO_ORDER);

  const cartSummary = useMemo(
    () => ({
      quantity: cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0,
      ),

      total: cart.reduce(
        (sum, item) =>
          sum +
          item.unitPrice *
            item.quantity,
        0,
      ),
    }),
    [cart],
  );

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const resetScroll = () => {
      (
        document.activeElement as
          | HTMLElement
          | null
      )?.blur();

      window.scrollTo({
        top: 0,
        behavior:
          'instant' as ScrollBehavior,
      });
    };

    resetScroll();

    const timer = setTimeout(
      resetScroll,
      180,
    );

    return () => clearTimeout(timer);
  }, [screen]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading} />
    );
  }

  const openProduct = (
    product: Product,
  ) => {
    setSelectedProduct(product);
    setSelectedSize(0);
    setAltMilk(false);
    setSyrup(false);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const addSelectedProduct = () => {
    if (!selectedProduct) return;

    const size =
      selectedProduct.sizes[
        selectedSize
      ];

    const extras = [
      altMilk
        ? 'альтернативное молоко'
        : '',
      syrup ? 'сироп' : '',
    ].filter(Boolean);

    const key = [
      selectedProduct.id,
      selectedSize,
      altMilk,
      syrup,
    ].join('-');

    const unitPrice =
      size.price +
      (altMilk ? 90 : 0) +
      (syrup ? 30 : 0);

    setCart((current) => {
      const existing =
        current.find(
          (item) => item.key === key,
        );

      if (existing) {
        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...current,
        {
          key,
          productId:
            selectedProduct.id,
          name: selectedProduct.name,
          details: [
            size.label,
            ...extras,
          ].join(' · '),
          unitPrice,
          quantity: 1,
        },
      ];
    });

    closeProduct();
  };

  const changeQuantity = (
    key: string,
    delta: number,
  ) => {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key
            ? {
                ...item,
                quantity:
                  item.quantity +
                  delta,
              }
            : item,
        )
        .filter(
          (item) =>
            item.quantity > 0,
        ),
    );
  };

  const createOrder = () => {
    const id = `ST-${String(
      nextOrderNumber,
    ).padStart(3, '0')}`;

    setActiveOrder({
      id,
      status: 'готовится',
      items: cart.map((item) => ({
        ...item,
      })),
      quantity: cartSummary.quantity,
      total: cartSummary.total,
      address:
        selectedLocation.address,
      pickupTime,
    });

    setNextOrderNumber(
      (value) => value + 1,
    );

    setScreen('success');
  };

  const returnToMenu = () => {
    setCart([]);
    setScreen('menu');
  };

  let content;

  switch (screen) {
    case 'locations':
      content = (
        <LocationsScreen
          selected={selectedLocation}
          onSelect={
            setSelectedLocation
          }
          onContinue={() =>
            setScreen('menu')
          }
        />
      );
      break;

    case 'menu':
      content = (
        <MenuScreen
          selectedLocation={
            selectedLocation
          }
          activeCategory={
            activeCategory
          }
          onCategoryChange={
            setActiveCategory
          }
          onLocations={() =>
            setScreen('locations')
          }
          onOpenProduct={openProduct}
          onCart={() =>
            setScreen('cart')
          }
          cartSummary={cartSummary}
          activeOrder={activeOrder}
          onOpenOrder={() =>
            setOrderSheetOpen(true)
          }
        />
      );
      break;

    case 'cart':
      content = (
        <CartScreen
          items={cart}
          summary={cartSummary}
          location={selectedLocation}
          onBack={() =>
            setScreen('menu')
          }
          onLocations={() =>
            setScreen('locations')
          }
          onQuantityChange={
            changeQuantity
          }
          onCheckout={() =>
            setScreen('checkout')
          }
        />
      );
      break;

    case 'checkout':
      content = (
        <CheckoutScreen
          location={selectedLocation}
          summary={cartSummary}
          pickupTime={pickupTime}
          onTimeChange={
            setPickupTime
          }
          onBack={() =>
            setScreen('cart')
          }
          onPay={createOrder}
        />
      );
      break;

    case 'success':
      content = (
        <SuccessScreen
          location={selectedLocation}
          pickupTime={pickupTime}
          orderId={
            activeOrder?.id ??
            'ST-104'
          }
          onNewOrder={returnToMenu}
        />
      );
      break;
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <StatusBar style="light" />

      <View style={styles.appShell}>
        <AmbientBackground />
        {content}
      </View>

      <ProductSheet
        product={selectedProduct}
        selectedSize={selectedSize}
        altMilk={altMilk}
        syrup={syrup}
        onSizeChange={setSelectedSize}
        onAltMilkChange={() =>
          setAltMilk(
            (current) => !current,
          )
        }
        onSyrupChange={() =>
          setSyrup(
            (current) => !current,
          )
        }
        onClose={closeProduct}
        onAdd={addSelectedProduct}
      />

      <OrderSheet
        order={activeOrder}
        visible={orderSheetOpen}
        onClose={() =>
          setOrderSheetOpen(false)
        }
      />
    </SafeAreaView>
  );
}
