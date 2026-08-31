import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';

import AppHeader from '../components/AppHeader';
import GlassPanel from '../components/GlassPanel';
import ProductVisual from '../components/ProductVisual';
import ScreenScrollView from '../components/ScreenScrollView';
import { categories, menu } from '../data/menu';
import type { Product } from '../data/menu';
import { productImages } from '../data/productImages';
import type { CoffeeShop } from '../data/locations';
import { styles } from '../styles';
import type { CartSummary } from '../types';
import { rubles } from '../utils';

const seasonalProduct = menu.find((item) => item.id === 'matcha-strawberry') ?? menu[0];

export default function MenuScreen({
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
    () =>
      activeCategory === 'popular'
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
            <View style={styles.pickupPin}>
              <Text style={styles.pickupPinText}>⌖</Text>
            </View>
            <View style={styles.locationCopy}>
              <Text style={styles.pickupEyebrow}>САМОВЫВОЗ · ~12 МИН</Text>
              <Text numberOfLines={1} style={styles.pickupAddress}>
                {selectedLocation.address}
              </Text>
            </View>
            <Text style={styles.locationArrow}>›</Text>
          </GlassPanel>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => onOpenProduct(seasonalProduct)}
          style={styles.heroPressable}
        >
          <LinearGradient colors={['#FF5A20', '#E93612', '#B91E08']} style={styles.hero}>
            <View style={styles.heroGlow} />
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>DROP 01 · NEW</Text>
              <Text style={styles.heroTitle}>матча{'\n'}клубника</Text>
              <Text style={styles.heroDescription}>зелёная матча · молоко · клубника</Text>
              <View style={styles.heroPricePill}>
                <Text style={styles.heroPrice}>370 ₽</Text>
              </View>
            </View>
            <View style={styles.heroProduct}>
              <Image
                source={productImages['matcha-strawberry']}
                resizeMode="contain"
                style={styles.heroImage}
              />
            </View>
          </LinearGradient>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>меню</Text>
          <Text style={styles.sectionCounter}>
            {products.length.toString().padStart(2, '0')} ITEMS
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
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
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                  {category.label}
                </Text>
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
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScreenScrollView>

      {cartSummary.quantity > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Открыть корзину"
          style={styles.cartBarWrap}
          onPress={onCart}
        >
          <GlassPanel style={styles.cartBar}>
            <View style={styles.cartCount}>
              <Text style={styles.cartCountText}>{cartSummary.quantity}</Text>
            </View>
            <Text style={styles.cartLabel}>корзина</Text>
            <Text style={styles.cartTotal}>{rubles(cartSummary.total)}</Text>
          </GlassPanel>
        </Pressable>
      ) : null}
    </View>
  );
}
