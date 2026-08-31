import {
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import CoffeeMap from './src/components/CoffeeMap';
import { coffeeShops } from './src/data/locations';
import type { CoffeeShop } from './src/data/locations';
import { categories, menu } from './src/data/menu';
import type { Product } from './src/data/menu';
import { productImages } from './src/data/productImages';
import { colors } from './src/theme';

type Screen = 'locations' | 'menu' | 'cart' | 'checkout' | 'success';
type CartItem = {
  key: string;
  productId: string;
  name: string;
  details: string;
  unitPrice: number;
  quantity: number;
};
type CartSummary = { quantity: number; total: number };

const rubles = (value: number) => value + ' ₽';
const pickupTimes = ['через 10 мин', 'через 20 мин', 'через 30 мин'] as const;
const seasonalProduct = menu.find((item) => item.id === 'matcha-strawberry') ?? menu[0];

function AmbientBackground() {
  const movement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(movement, { toValue: 1, duration: 5200, useNativeDriver: true }),
        Animated.timing(movement, { toValue: 0, duration: 5200, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [movement]);

  const transform = {
    transform: [
      { translateX: movement.interpolate({ inputRange: [0, 1], outputRange: [-18, 28] }) },
      { translateY: movement.interpolate({ inputRange: [0, 1], outputRange: [-8, 36] }) },
      { scale: movement.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1.12] }) },
    ],
  };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient colors={['#08080A', '#101014', '#08080A']} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.ambientOrange, transform]} />
      <Animated.View style={[styles.ambientAqua, transform]} />
    </View>
  );
}

function GlassPanel({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return (
    <View style={[styles.glassPanel, style]}>
      <BlurView intensity={32} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.glassContent}>{children}</View>
    </View>
  );
}

function ScreenScrollView({
  children,
  screenKey,
  contentContainerStyle,
}: PropsWithChildren<{ screenKey: string; contentContainerStyle: StyleProp<ViewStyle> }>) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS === 'web') (document.activeElement as HTMLElement | null)?.blur();
    const reset = () => scrollRef.current?.scrollTo({ y: 0, animated: false });
    const frame = requestAnimationFrame(reset);
    const timer = setTimeout(reset, 120);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [screenKey]);

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={contentContainerStyle} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <View style={[styles.brandMark, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.brandMarkText, { fontSize: size * 0.48 }]}>””</Text>
    </View>
  );
}

function AppHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" style={styles.headerCircle} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>
      ) : (
        <View style={styles.logoRow}>
          <BrandMark />
          <View>
            <Text style={styles.wordmark}>small talk</Text>
            <Text style={styles.wordmarkSub}>COFFEE · KIZILYURT</Text>
          </View>
        </View>
      )}
      {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
      <View style={styles.headerCircle}><Text style={styles.headerDots}>••</Text></View>
    </View>
  );
}

function ProductVisual({ product, hero = false }: { product: Product; hero?: boolean }) {
  return (
    <View style={[styles.productVisual, { backgroundColor: product.artColor }, hero && styles.productVisualHero]}>
      <LinearGradient colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0)']} style={StyleSheet.absoluteFill} />
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={productImages[product.id]}
        style={[styles.productImage, hero && styles.productImageHero]}
      />
    </View>
  );
}

function LocationsScreen({
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
      <Text style={styles.displaySubtitle}>Выбери кофейню — покажем её меню и приготовим заказ к твоему приезду.</Text>

      <View style={styles.mapFrame}>
        <CoffeeMap shops={coffeeShops} selectedId={selected.id} onSelect={onSelect} />
        <View pointerEvents="none" style={styles.mapTopBadge}>
          <Text style={styles.mapTopBadgeText}>LIVE MAP</Text>
          <View style={styles.liveDot} />
        </View>
      </View>

      <GlassPanel style={styles.selectedLocationCard}>
        <View style={styles.locationNumber}><Text style={styles.locationNumberText}>{selectedIndex}</Text></View>
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
              <Text style={[styles.locationRowIndex, active && styles.locationRowIndexActive]}>0{index + 1}</Text>
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

function MenuScreen({
  selectedLocation,
  activeCategory,
  onCategoryChange,
  onLocations,
  onOpenProduct,
  onCart,
  cartSummary,
}: {
  selectedLocation: CoffeeShop;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  onLocations: () => void;
  onOpenProduct: (product: Product) => void;
  onCart: () => void;
  cartSummary: CartSummary;
}) {
  const products = useMemo(
    () => activeCategory === 'popular'
      ? menu.filter((item) => item.popular)
      : menu.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <View style={styles.flex}>
      <ScreenScrollView screenKey="menu" contentContainerStyle={styles.pageContentWithBar}>
        <AppHeader />
        <Pressable accessibilityRole="button" onPress={onLocations}>
          <GlassPanel style={styles.pickupCard}>
            <View style={styles.pickupPin}><Text style={styles.pickupPinText}>⌖</Text></View>
            <View style={styles.locationCopy}>
              <Text style={styles.pickupEyebrow}>САМОВЫВОЗ · ~12 МИН</Text>
              <Text numberOfLines={1} style={styles.pickupAddress}>{selectedLocation.address}</Text>
            </View>
            <Text style={styles.locationArrow}>›</Text>
          </GlassPanel>
        </Pressable>

        <Pressable accessibilityRole="button" onPress={() => onOpenProduct(seasonalProduct)} style={styles.heroPressable}>
          <LinearGradient colors={['#FF5A20', '#E93612', '#B91E08']} style={styles.hero}>
            <View style={styles.heroGlow} />
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>DROP 01 · NEW</Text>
              <Text style={styles.heroTitle}>матча{'\n'}клубника</Text>
              <Text style={styles.heroDescription}>зелёная матча · молоко · клубника</Text>
              <View style={styles.heroPricePill}><Text style={styles.heroPrice}>370 ₽</Text></View>
            </View>
            <View style={styles.heroProduct}>
              <Image source={productImages['matcha-strawberry']} resizeMode="contain" style={styles.heroImage} />
            </View>
          </LinearGradient>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>меню</Text>
          <Text style={styles.sectionCounter}>{products.length.toString().padStart(2, '0')} ITEMS</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
          {categories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <Pressable
                key={category.id}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => onCategoryChange(category.id)}
                style={[styles.categoryChip, active && styles.categoryChipActive]}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.grid}>
          {products.map((product) => (
            <Pressable
              key={product.id}
              accessibilityRole="button"
              accessibilityLabel={product.name + ', от ' + rubles(product.sizes[0].price)}
              onPress={() => onOpenProduct(product)}
              style={({ pressed }) => [styles.productCard, pressed && styles.pressed]}
            >
              <ProductVisual product={product} />
              <View style={styles.productCopy}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>от {rubles(product.sizes[0].price)}</Text>
                  <View style={styles.addButton}><Text style={styles.addButtonText}>+</Text></View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScreenScrollView>

      {cartSummary.quantity > 0 ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Открыть корзину" style={styles.cartBarWrap} onPress={onCart}>
          <GlassPanel style={styles.cartBar}>
            <View style={styles.cartCount}><Text style={styles.cartCountText}>{cartSummary.quantity}</Text></View>
            <Text style={styles.cartLabel}>корзина</Text>
            <Text style={styles.cartTotal}>{rubles(cartSummary.total)}</Text>
          </GlassPanel>
        </Pressable>
      ) : null}
    </View>
  );
}

function ProductSheet({
  product,
  selectedSize,
  altMilk,
  syrup,
  onSizeChange,
  onAltMilkChange,
  onSyrupChange,
  onClose,
  onAdd,
}: {
  product: Product | null;
  selectedSize: number;
  altMilk: boolean;
  syrup: boolean;
  onSizeChange: (index: number) => void;
  onAltMilkChange: () => void;
  onSyrupChange: () => void;
  onClose: () => void;
  onAdd: () => void;
}) {
  const selectedPrice = product ? product.sizes[selectedSize].price + (altMilk ? 90 : 0) + (syrup ? 30 : 0) : 0;
  return (
    <Modal animationType="slide" transparent visible={Boolean(product)} onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <Pressable accessibilityLabel="Закрыть карточку" style={styles.modalDismiss} onPress={onClose} />
        {product ? (
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <ProductVisual product={product} hero />
              <View style={styles.sheetHeader}>
                <View style={styles.sheetTitleWrap}>
                  <Text style={styles.sheetKicker}>CUSTOMIZE YOUR DRINK</Text>
                  <Text style={styles.sheetTitle}>{product.name}</Text>
                  <Text style={styles.sheetDescription}>{product.description}</Text>
                </View>
                <Pressable accessibilityRole="button" accessibilityLabel="Закрыть" style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>

              <Text style={styles.optionTitle}>размер</Text>
              <View style={styles.optionRow}>
                {product.sizes.map((size, index) => (
                  <Pressable
                    key={size.label + '-' + size.price}
                    accessibilityRole="button"
                    accessibilityState={{ selected: selectedSize === index }}
                    onPress={() => onSizeChange(index)}
                    style={[styles.option, selectedSize === index && styles.optionActive]}
                  >
                    <Text style={styles.optionLabel}>{size.label}</Text>
                    <Text style={styles.optionPrice}>{rubles(size.price)}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.optionTitle}>добавить</Text>
              <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: altMilk }} style={styles.extraRow} onPress={onAltMilkChange}>
                <Text style={styles.extraLabel}>альтернативное молоко</Text>
                <View style={[styles.check, altMilk && styles.checkActive]}><Text style={styles.checkText}>{altMilk ? '✓' : '+90'}</Text></View>
              </Pressable>
              <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: syrup }} style={styles.extraRow} onPress={onSyrupChange}>
                <Text style={styles.extraLabel}>сироп</Text>
                <View style={[styles.check, syrup && styles.checkActive]}><Text style={styles.checkText}>{syrup ? '✓' : '+30'}</Text></View>
              </Pressable>
            </ScrollView>
            <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onAdd}>
              <Text style={styles.primaryButtonText}>добавить</Text>
              <Text style={styles.primaryButtonText}>{rubles(selectedPrice)}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

function CartScreen({
  items,
  summary,
  location,
  onBack,
  onLocations,
  onQuantityChange,
  onCheckout,
}: {
  items: CartItem[];
  summary: CartSummary;
  location: CoffeeShop;
  onBack: () => void;
  onLocations: () => void;
  onQuantityChange: (key: string, delta: number) => void;
  onCheckout: () => void;
}) {
  return (
    <View style={styles.flex}>
      <ScreenScrollView screenKey="cart" contentContainerStyle={styles.pageContentWithBar}>
        <AppHeader title="корзина" onBack={onBack} />
        <Pressable accessibilityRole="button" onPress={onLocations}>
          <GlassPanel style={styles.pickupCard}>
            <View style={styles.pickupPin}><Text style={styles.pickupPinText}>⌖</Text></View>
            <View style={styles.locationCopy}>
              <Text style={styles.pickupEyebrow}>ТОЧКА САМОВЫВОЗА</Text>
              <Text numberOfLines={1} style={styles.pickupAddress}>{location.address}</Text>
            </View>
            <Text style={styles.changeText}>сменить</Text>
          </GlassPanel>
        </Pressable>

        <View style={styles.cartItems}>
          {items.map((item) => {
            const product = menu.find((entry) => entry.id === item.productId) ?? menu[0];
            return (
              <GlassPanel key={item.key} style={styles.cartItem}>
                <View style={styles.cartThumb}><Image source={productImages[product.id]} resizeMode="contain" style={styles.cartThumbImage} /></View>
                <View style={styles.cartItemCopy}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemDetails}>{item.details}</Text>
                  <Text style={styles.cartItemPrice}>{rubles(item.unitPrice * item.quantity)}</Text>
                </View>
                <View style={styles.counter}>
                  <Pressable accessibilityRole="button" accessibilityLabel={'Уменьшить ' + item.name} style={styles.counterButton} onPress={() => onQuantityChange(item.key, -1)}><Text style={styles.counterText}>−</Text></Pressable>
                  <Text style={styles.counterValue}>{item.quantity}</Text>
                  <Pressable accessibilityRole="button" accessibilityLabel={'Увеличить ' + item.name} style={styles.counterButton} onPress={() => onQuantityChange(item.key, 1)}><Text style={styles.counterText}>+</Text></Pressable>
                </View>
              </GlassPanel>
            );
          })}
        </View>

        <GlassPanel style={styles.summaryCard}>
          <View style={styles.summaryColumn}>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>напитки · {summary.quantity}</Text><Text style={styles.summaryValue}>{rubles(summary.total)}</Text></View>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>самовывоз</Text><Text style={styles.freeText}>0 ₽</Text></View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}><Text style={styles.summaryTotalLabel}>итого</Text><Text style={styles.summaryTotalValue}>{rubles(summary.total)}</Text></View>
          </View>
        </GlassPanel>
      </ScreenScrollView>
      <View style={styles.bottomAction}>
        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onCheckout}>
          <Text style={styles.primaryButtonText}>к оформлению</Text><Text style={styles.primaryButtonText}>{rubles(summary.total)}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function CheckoutScreen({
  location,
  summary,
  pickupTime,
  onTimeChange,
  onBack,
  onPay,
}: {
  location: CoffeeShop;
  summary: CartSummary;
  pickupTime: string;
  onTimeChange: (time: string) => void;
  onBack: () => void;
  onPay: () => void;
}) {
  return (
    <View style={styles.flex}>
      <ScreenScrollView screenKey="checkout" contentContainerStyle={styles.pageContentWithBar}>
        <AppHeader title="оформление" onBack={onBack} />
        <Text style={styles.checkoutHeading}>самовывоз</Text>
        <GlassPanel style={styles.checkoutCard}>
          <View style={styles.locationNumber}><Text style={styles.locationNumberText}>{coffeeShops.findIndex((shop) => shop.id === location.id) + 1}</Text></View>
          <View style={styles.locationCopy}><Text style={styles.locationAddress}>{location.address}</Text><Text style={styles.locationSchedule}>заказ будет ждать у стойки</Text></View>
        </GlassPanel>

        <Text style={styles.checkoutHeading}>когда приготовить?</Text>
        <View style={styles.timeGrid}>
          {pickupTimes.map((time) => (
            <Pressable
              key={time}
              accessibilityRole="radio"
              accessibilityState={{ selected: pickupTime === time }}
              onPress={() => onTimeChange(time)}
              style={[styles.timeChip, pickupTime === time && styles.timeChipActive]}
            >
              <Text style={[styles.timeChipText, pickupTime === time && styles.timeChipTextActive]}>{time}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.checkoutHeading}>предоплата</Text>
        <GlassPanel style={styles.paymentCard}>
          <LinearGradient colors={[colors.aqua, '#47A9C5']} style={styles.cardIcon}><Text style={styles.cardIconText}>▰</Text></LinearGradient>
          <View style={styles.locationCopy}><Text style={styles.paymentTitle}>банковская карта</Text><Text style={styles.paymentSubtitle}>демо · деньги не списываются</Text></View>
          <Text style={styles.locationArrow}>›</Text>
        </GlassPanel>
        <Text style={styles.paymentNotice}>Заказ попадёт бариста только после успешной оплаты.</Text>

        <GlassPanel style={styles.summaryCard}>
          <View style={styles.summaryColumn}>
            <View style={styles.summaryRow}><Text style={styles.summaryLabel}>товары</Text><Text style={styles.summaryValue}>{rubles(summary.total)}</Text></View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}><Text style={styles.summaryTotalLabel}>к оплате</Text><Text style={styles.summaryTotalValue}>{rubles(summary.total)}</Text></View>
          </View>
        </GlassPanel>
      </ScreenScrollView>
      <View style={styles.bottomAction}>
        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onPay}><Text style={styles.primaryButtonText}>оплатить</Text><Text style={styles.primaryButtonText}>{rubles(summary.total)}</Text></Pressable>
      </View>
    </View>
  );
}

function SuccessScreen({ location, pickupTime, onNewOrder }: { location: CoffeeShop; pickupTime: string; onNewOrder: () => void }) {
  return (
    <LinearGradient colors={['#FF5A20', '#E22E0E', '#9F1608']} style={styles.successPage}>
      <View style={styles.successGlow} />
      <View style={styles.successMark}><BrandMark size={76} /></View>
      <Text style={styles.successEyebrow}>ORDER ST-104 · PAID</Text>
      <Text style={styles.successTitle}>уже{'\n'}готовим!</Text>
      <Text style={styles.successText}>Забери заказ {pickupTime} по адресу</Text>
      <Text style={styles.successAddress}>{location.address}</Text>
      <View style={styles.statusTrack}><View style={styles.statusTrackFilled} /></View>
      <View style={styles.statusLabels}><Text style={styles.statusActive}>принят</Text><Text style={styles.statusMuted}>готовится</Text><Text style={styles.statusMuted}>готов</Text></View>
      <Pressable accessibilityRole="button" style={styles.successButton} onPress={onNewOrder}><Text style={styles.successButtonText}>на главный экран</Text></Pressable>
    </LinearGradient>
  );
}

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

  const cartSummary = useMemo(() => ({
    quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
    total: cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  }), [cart]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const resetWebScroll = () => {
      (document.activeElement as HTMLElement | null)?.blur();
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.querySelectorAll<HTMLElement>('*').forEach((element) => {
        if (element.scrollTop > 0) element.scrollTop = 0;
      });
    };
    resetWebScroll();
    const timer = setTimeout(resetWebScroll, 300);
    return () => clearTimeout(timer);
  }, [screen]);

  if (!fontsLoaded) return <View style={styles.loading} />;

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(0);
    setAltMilk(false);
    setSyrup(false);
  };

  const addSelectedProduct = () => {
    if (!selectedProduct) return;
    const size = selectedProduct.sizes[selectedSize];
    const extras = [altMilk ? 'альтернативное молоко' : '', syrup ? 'сироп' : ''].filter(Boolean);
    const key = selectedProduct.id + '-' + selectedSize + '-' + altMilk + '-' + syrup;
    const unitPrice = size.price + (altMilk ? 90 : 0) + (syrup ? 30 : 0);
    setCart((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { key, productId: selectedProduct.id, name: selectedProduct.name, details: [size.label, ...extras].join(' · '), unitPrice, quantity: 1 }];
    });
    setSelectedProduct(null);
  };

  const changeQuantity = (key: string, delta: number) => {
    setCart((current) => current.map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  };

  let content;
  if (screen === 'locations') {
    content = <LocationsScreen selected={selectedLocation} onSelect={setSelectedLocation} onContinue={() => setScreen('menu')} />;
  } else if (screen === 'menu') {
    content = <MenuScreen selectedLocation={selectedLocation} activeCategory={activeCategory} onCategoryChange={setActiveCategory} onLocations={() => setScreen('locations')} onOpenProduct={openProduct} onCart={() => setScreen('cart')} cartSummary={cartSummary} />;
  } else if (screen === 'cart') {
    content = <CartScreen items={cart} summary={cartSummary} location={selectedLocation} onBack={() => setScreen('menu')} onLocations={() => setScreen('locations')} onQuantityChange={changeQuantity} onCheckout={() => setScreen('checkout')} />;
  } else if (screen === 'checkout') {
    content = <CheckoutScreen location={selectedLocation} summary={cartSummary} pickupTime={pickupTime} onTimeChange={setPickupTime} onBack={() => setScreen('cart')} onPay={() => setScreen('success')} />;
  } else {
    content = <SuccessScreen location={selectedLocation} pickupTime={pickupTime} onNewOrder={() => { setCart([]); setScreen('locations'); }} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.appShell}>
        <AmbientBackground />
        {content}
      </View>
      <ProductSheet product={selectedProduct} selectedSize={selectedSize} altMilk={altMilk} syrup={syrup} onSizeChange={setSelectedSize} onAltMilkChange={() => setAltMilk((value) => !value)} onSyrupChange={() => setSyrup((value) => !value)} onClose={() => setSelectedProduct(null)} onAdd={addSelectedProduct} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  loading: { flex: 1, backgroundColor: colors.ink },
  safeArea: { flex: 1, backgroundColor: colors.ink },
  appShell: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', backgroundColor: colors.ink, overflow: 'hidden' },
  ambientOrange: { position: 'absolute', width: 320, height: 320, borderRadius: 160, backgroundColor: '#7A210C', opacity: 0.23, right: -180, top: 60 },
  ambientAqua: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: '#07535A', opacity: 0.18, left: -170, top: 540 },
  pageContent: { padding: 18, paddingBottom: 34 },
  pageContentWithBar: { padding: 18, paddingBottom: 120 },
  glassPanel: { overflow: 'hidden', borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass, borderRadius: 24 },
  glassContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  header: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  headerTitle: { color: colors.white, fontSize: 21, fontWeight: '900', letterSpacing: -0.8 },
  headerCircle: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center' },
  headerDots: { color: colors.white, fontSize: 14, letterSpacing: 1 },
  backButtonText: { color: colors.white, fontSize: 34, lineHeight: 36, transform: [{ translateY: -2 }] },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wordmark: { color: colors.white, fontSize: 23, fontWeight: '900', letterSpacing: -1 },
  wordmarkSub: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 7.5, letterSpacing: 1.4, marginTop: 2 },
  brandMark: { backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: colors.white, fontWeight: '900', letterSpacing: -6, transform: [{ translateX: -2 }, { translateY: -2 }] },
  eyebrow: { color: colors.orange, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 10, letterSpacing: 1.4, marginBottom: 10 },
  displayTitle: { color: colors.white, fontSize: 46, lineHeight: 48, fontWeight: '900', letterSpacing: -2.5 },
  displaySubtitle: { color: colors.muted, fontSize: 14, lineHeight: 21, maxWidth: 390, marginTop: 10, marginBottom: 22 },
  mapFrame: { height: 340, borderRadius: 30, overflow: 'hidden', borderWidth: 1, borderColor: colors.glassBorder, marginBottom: 12, backgroundColor: colors.surface },
  mapTopBadge: { position: 'absolute', left: 14, top: 14, minHeight: 30, borderRadius: 15, backgroundColor: 'rgba(8,8,10,0.78)', paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 7 },
  mapTopBadgeText: { color: colors.white, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 8, letterSpacing: 1.2 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.lime },
  selectedLocationCard: { minHeight: 82, padding: 13, marginBottom: 28 },
  locationNumber: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  locationNumberText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 16 },
  locationCopy: { flex: 1, marginLeft: 12, minWidth: 0 },
  locationName: { color: colors.white, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' },
  locationAddress: { color: colors.white, fontSize: 15, fontWeight: '800', marginTop: 3 },
  locationSchedule: { color: colors.aqua, fontFamily: 'IBMPlexMono_500Medium', fontSize: 9, marginTop: 5 },
  locationArrow: { color: colors.white, fontSize: 24, marginLeft: 8 },
  sectionLabel: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 10, letterSpacing: 1.4, marginBottom: 10 },
  locationList: { gap: 8 },
  locationRow: { minHeight: 58, borderRadius: 18, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 },
  locationRowActive: { borderColor: colors.orange, backgroundColor: 'rgba(255,75,24,0.12)' },
  locationRowIndex: { width: 38, color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 11 },
  locationRowIndexActive: { color: colors.orange },
  locationRowAddress: { flex: 1, color: colors.white, fontSize: 13, fontWeight: '700' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1, borderColor: colors.muted },
  radioActive: { borderWidth: 5, borderColor: colors.orange },
  primaryButton: { minHeight: 62, borderRadius: 21, backgroundColor: colors.orange, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 14, shadowColor: colors.orange, shadowOpacity: 0.25, shadowRadius: 20, shadowOffset: { width: 0, height: 8 } },
  primaryButtonText: { color: colors.white, fontSize: 16, fontWeight: '900' },
  primaryButtonArrow: { color: colors.white, fontSize: 24 },
  pickupCard: { minHeight: 72, padding: 12, marginBottom: 14 },
  pickupPin: { width: 44, height: 44, borderRadius: 15, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  pickupPinText: { color: colors.white, fontSize: 23 },
  pickupEyebrow: { color: colors.aqua, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 8, letterSpacing: 1, marginBottom: 4 },
  pickupAddress: { color: colors.white, fontSize: 14, fontWeight: '800' },
  changeText: { color: colors.orange, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 9 },
  heroPressable: { borderRadius: 30, overflow: 'hidden', marginBottom: 32 },
  hero: { height: 284, overflow: 'hidden', flexDirection: 'row' },
  heroGlow: { position: 'absolute', width: 210, height: 210, borderRadius: 105, backgroundColor: 'rgba(255,255,255,0.16)', right: -65, top: -75 },
  heroCopy: { width: '59%', padding: 22, zIndex: 2 },
  heroEyebrow: { color: 'rgba(255,255,255,0.78)', fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.3, marginBottom: 18 },
  heroTitle: { color: colors.white, fontSize: 39, lineHeight: 37, fontWeight: '900', letterSpacing: -2.2 },
  heroDescription: { color: 'rgba(255,255,255,0.72)', fontSize: 11, lineHeight: 16, marginTop: 11, maxWidth: 150 },
  heroPricePill: { alignSelf: 'flex-start', backgroundColor: colors.white, borderRadius: 99, paddingHorizontal: 13, paddingVertical: 9, marginTop: 16 },
  heroPrice: { color: colors.ink, fontFamily: 'IBMPlexMono_700Bold', fontSize: 12 },
  heroProduct: { position: 'absolute', width: '58%', height: '120%', right: -34, bottom: -34, transform: [{ rotate: '7deg' }] },
  heroImage: { width: '100%', height: '100%' },
  sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { color: colors.white, fontSize: 34, fontWeight: '900', letterSpacing: -1.8 },
  sectionCounter: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 9, letterSpacing: 1 },
  categories: { gap: 8, paddingRight: 18, marginBottom: 18 },
  categoryChip: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 99 },
  categoryChipActive: { backgroundColor: colors.white, borderColor: colors.white },
  categoryText: { color: colors.white, fontFamily: 'IBMPlexMono_500Medium', fontSize: 11 },
  categoryTextActive: { color: colors.ink, fontFamily: 'IBMPlexMono_700Bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  productCard: { width: '48.5%', borderRadius: 24, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, overflow: 'hidden' },
  pressed: { opacity: 0.76, transform: [{ scale: 0.985 }] },
  productVisual: { height: 164, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  productVisualHero: { height: 260, borderRadius: 28, marginBottom: 18 },
  productImage: { width: '100%', height: '126%', transform: [{ translateY: 13 }] },
  productImageHero: { height: '116%', width: '82%', transform: [{ translateY: 12 }] },
  productCopy: { padding: 13, paddingTop: 12 },
  productName: { minHeight: 40, color: colors.white, fontSize: 16, lineHeight: 19, fontWeight: '800' },
  productFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  productPrice: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 10 },
  addButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: colors.white, fontSize: 22, lineHeight: 24 },
  cartBarWrap: { position: 'absolute', left: 18, right: 18, bottom: 18 },
  cartBar: { minHeight: 66, borderRadius: 23, backgroundColor: 'rgba(24,24,28,0.84)', padding: 11 },
  cartCount: { width: 42, height: 42, borderRadius: 15, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  cartCountText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13 },
  cartLabel: { flex: 1, color: colors.white, fontSize: 16, fontWeight: '800', marginLeft: 12 },
  cartTotal: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end', alignItems: 'center' },
  modalDismiss: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  sheet: { width: '100%', maxWidth: 520, maxHeight: '94%', backgroundColor: '#111114', borderTopLeftRadius: 34, borderTopRightRadius: 34, padding: 18, paddingTop: 10, borderWidth: 1, borderColor: colors.glassBorder },
  sheetHandle: { width: 42, height: 5, borderRadius: 3, backgroundColor: '#48484E', alignSelf: 'center', marginBottom: 14 },
  sheetHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  sheetTitleWrap: { flex: 1 },
  sheetKicker: { color: colors.orange, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 8, letterSpacing: 1.2, marginBottom: 7 },
  sheetTitle: { color: colors.white, fontSize: 31, lineHeight: 34, fontWeight: '900', letterSpacing: -1.4 },
  sheetDescription: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  closeButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.glassStrong, alignItems: 'center', justifyContent: 'center' },
  closeButtonText: { color: colors.white, fontSize: 27, lineHeight: 29 },
  optionTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginTop: 22, marginBottom: 10 },
  optionRow: { flexDirection: 'row', gap: 8 },
  option: { flex: 1, minHeight: 70, borderRadius: 19, backgroundColor: colors.glass, padding: 12, borderWidth: 1, borderColor: colors.glassBorder },
  optionActive: { borderColor: colors.orange, backgroundColor: 'rgba(255,75,24,0.12)' },
  optionLabel: { color: colors.white, fontSize: 13, fontWeight: '800' },
  optionPrice: { color: colors.muted, fontFamily: 'IBMPlexMono_500Medium', fontSize: 10, marginTop: 5 },
  extraRow: { minHeight: 62, borderRadius: 19, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 8 },
  extraLabel: { color: colors.white, fontSize: 14, fontWeight: '700' },
  check: { minWidth: 46, height: 34, borderRadius: 17, backgroundColor: colors.glassStrong, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 9 },
  checkActive: { backgroundColor: colors.aqua },
  checkText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11 },
  cartItems: { gap: 10, marginBottom: 18 },
  cartItem: { minHeight: 142, padding: 10 },
  cartThumb: { width: 105, height: 120, borderRadius: 18, backgroundColor: '#34343A', overflow: 'hidden' },
  cartThumbImage: { width: '100%', height: '120%' },
  cartItemCopy: { flex: 1, alignSelf: 'stretch', padding: 8, paddingLeft: 13 },
  cartItemName: { color: colors.white, fontSize: 17, fontWeight: '900' },
  cartItemDetails: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 5 },
  cartItemPrice: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 13, marginTop: 'auto' },
  counter: { alignItems: 'center', gap: 5 },
  counterButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.glassStrong, alignItems: 'center', justifyContent: 'center' },
  counterText: { color: colors.white, fontSize: 20, lineHeight: 22 },
  counterValue: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 12 },
  summaryCard: { padding: 18, marginTop: 10 },
  summaryColumn: { flex: 1 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  summaryLabel: { color: colors.muted, fontSize: 13 },
  summaryValue: { color: colors.white, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 12 },
  freeText: { color: colors.aqua, fontFamily: 'IBMPlexMono_700Bold', fontSize: 11 },
  summaryTotalRow: { borderTopWidth: 1, borderTopColor: colors.glassBorder, paddingTop: 14, marginTop: 5 },
  summaryTotalLabel: { color: colors.white, fontSize: 18, fontWeight: '900' },
  summaryTotalValue: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 18 },
  bottomAction: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 18, paddingTop: 6, backgroundColor: 'rgba(11,11,13,0.96)' },
  checkoutHeading: { color: colors.white, fontSize: 21, fontWeight: '900', letterSpacing: -0.7, marginTop: 10, marginBottom: 10 },
  checkoutCard: { minHeight: 78, padding: 13 },
  timeGrid: { flexDirection: 'row', gap: 8 },
  timeChip: { flex: 1, minHeight: 62, borderRadius: 19, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBorder, alignItems: 'center', justifyContent: 'center' },
  timeChipActive: { backgroundColor: colors.white, borderColor: colors.white },
  timeChipText: { color: colors.white, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 9, textAlign: 'center' },
  timeChipTextActive: { color: colors.ink },
  paymentCard: { minHeight: 80, padding: 13 },
  cardIcon: { width: 50, height: 50, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  cardIconText: { color: colors.ink, fontSize: 24 },
  paymentTitle: { color: colors.white, fontSize: 15, fontWeight: '900' },
  paymentSubtitle: { color: colors.muted, fontFamily: 'IBMPlexMono_500Medium', fontSize: 8.5, marginTop: 4 },
  paymentNotice: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 9, paddingHorizontal: 4 },
  successPage: { flex: 1, padding: 28, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  successGlow: { position: 'absolute', width: 420, height: 420, borderRadius: 210, backgroundColor: 'rgba(255,255,255,0.10)', top: -180, right: -160 },
  successMark: { width: 104, height: 104, borderRadius: 52, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  successEyebrow: { color: 'rgba(255,255,255,0.72)', fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.5 },
  successTitle: { color: colors.white, fontSize: 52, lineHeight: 49, fontWeight: '900', letterSpacing: -3, textAlign: 'center', marginTop: 10 },
  successText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', marginTop: 18 },
  successAddress: { color: colors.white, fontSize: 17, fontWeight: '900', textAlign: 'center', marginTop: 7 },
  statusTrack: { width: '100%', height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.28)', marginTop: 36, overflow: 'hidden' },
  statusTrackFilled: { width: '22%', height: '100%', backgroundColor: colors.white, borderRadius: 3 },
  statusLabels: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  statusActive: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 9 },
  statusMuted: { color: 'rgba(255,255,255,0.64)', fontFamily: 'IBMPlexMono_500Medium', fontSize: 9 },
  successButton: { minHeight: 60, width: '100%', borderRadius: 21, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginTop: 42 },
  successButtonText: { color: colors.ink, fontSize: 15, fontWeight: '900' },
});
