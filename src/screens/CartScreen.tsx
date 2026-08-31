import { Image, Pressable, Text, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import GlassPanel from '../components/GlassPanel';
import ScreenScrollView from '../components/ScreenScrollView';
import { menu } from '../data/menu';
import { productImages } from '../data/productImages';
import type { CoffeeShop } from '../data/locations';
import { styles } from '../styles';
import type { CartItem, CartSummary } from '../types';
import { rubles } from '../utils';

export default function CartScreen({
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
            <View style={styles.pickupPin}>
              <Text style={styles.pickupPinText}>⌖</Text>
            </View>
            <View style={styles.locationCopy}>
              <Text style={styles.pickupEyebrow}>ТОЧКА САМОВЫВОЗА</Text>
              <Text numberOfLines={1} style={styles.pickupAddress}>
                {location.address}
              </Text>
            </View>
            <Text style={styles.changeText}>сменить</Text>
          </GlassPanel>
        </Pressable>

        <View style={styles.cartItems}>
          {items.map((item) => {
            const product = menu.find((entry) => entry.id === item.productId) ?? menu[0];
            return (
              <GlassPanel key={item.key} style={styles.cartItem}>
                <View style={styles.cartThumb}>
                  <Image
                    source={productImages[product.id]}
                    resizeMode="contain"
                    style={styles.cartThumbImage}
                  />
                </View>
                <View style={styles.cartItemCopy}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemDetails}>{item.details}</Text>
                  <Text style={styles.cartItemPrice}>
                    {rubles(item.unitPrice * item.quantity)}
                  </Text>
                </View>
                <View style={styles.counter}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={'Уменьшить ' + item.name}
                    style={styles.counterButton}
                    onPress={() => onQuantityChange(item.key, -1)}
                  >
                    <Text style={styles.counterText}>−</Text>
                  </Pressable>
                  <Text style={styles.counterValue}>{item.quantity}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={'Увеличить ' + item.name}
                    style={styles.counterButton}
                    onPress={() => onQuantityChange(item.key, 1)}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </Pressable>
                </View>
              </GlassPanel>
            );
          })}
        </View>

        <GlassPanel style={styles.summaryCard}>
          <View style={styles.summaryColumn}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>напитки · {summary.quantity}</Text>
              <Text style={styles.summaryValue}>{rubles(summary.total)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>самовывоз</Text>
              <Text style={styles.freeText}>0 ₽</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>итого</Text>
              <Text style={styles.summaryTotalValue}>{rubles(summary.total)}</Text>
            </View>
          </View>
        </GlassPanel>
      </ScreenScrollView>
      <View style={styles.bottomAction}>
        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onCheckout}>
          <Text style={styles.primaryButtonText}>к оформлению</Text>
          <Text style={styles.primaryButtonText}>{rubles(summary.total)}</Text>
        </Pressable>
      </View>
    </View>
  );
}
