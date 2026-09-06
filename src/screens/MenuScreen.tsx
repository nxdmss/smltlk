import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BrandMark from '../components/BrandMark';
import ProductVisual from '../components/ProductVisual';
import ScreenScrollView from '../components/ScreenScrollView';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import {
  categories,
  menu,
  type MenuCategory,
  type Product,
} from '../data/menu';
import {
  colors,
  fonts,
  layout,
  radii,
  spacing,
  typography,
} from '../theme';
import type {
  ActiveOrder,
  CartSummary,
} from '../types';
import { rubles, twoDigits } from '../utils';

export default function MenuScreen({
  selectedLocation,
  activeCategory,
  onCategoryChange,
  onLocations,
  onOpenProduct,
  onCart,
  cartSummary,
  activeOrder,
  onOpenOrder,
}: {
  selectedLocation: CoffeeShop;
  activeCategory: MenuCategory;
  onCategoryChange: (id: MenuCategory) => void;
  onLocations: () => void;
  onOpenProduct: (product: Product) => void;
  onCart: () => void;
  cartSummary: CartSummary;
  activeOrder: ActiveOrder | null;
  onOpenOrder: () => void;
}) {
  const products = useMemo(
    () =>
      activeCategory === 'popular'
        ? menu.filter(
            (product) => product.popular,
          )
        : menu.filter(
            (product) =>
              product.category === activeCategory,
          ),
    [activeCategory],
  );

  const seasonal =
    menu.find(
      (product) =>
        product.id === 'matcha-strawberry',
    ) ?? menu[0];

  const shopNumber = twoDigits(
    coffeeShops.findIndex(
      (shop) =>
        shop.id === selectedLocation.id,
    ) + 1,
  );

  const orderReady =
    activeOrder?.status === 'готов';

  return (
    <View style={s.screen}>
      <ScreenScrollView
        screenKey="menu"
        contentContainerStyle={s.page}
      >
        <View style={s.topBar}>
          <View style={s.logoSlot}>
            <BrandMark width={48} />
          </View>

          <View style={s.orderSlot}>
            {activeOrder ? (
              <Pressable
                onPress={onOpenOrder}
                hitSlop={8}
                style={s.orderLink}
              >
                <Text style={s.orderLabel}>
                  заказ{' '}
                  <Text style={s.orderNumber}>
                    {activeOrder.id}
                  </Text>
                </Text>

                <Text
                  style={[
                    s.orderStatus,
                    orderReady &&
                      s.orderStatusReady,
                  ]}
                >
                  {activeOrder.status}
                </Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable
            onPress={onLocations}
            hitSlop={8}
            style={s.location}
          >
            <View style={s.locationCopy}>
              <Text style={s.locationLabel}>
                {shopNumber}
              </Text>

              <Text
                numberOfLines={2}
                style={s.locationAddress}
              >
                {selectedLocation.address}
              </Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() =>
            onOpenProduct(seasonal)
          }
          style={s.hero}
        >
          <View style={s.heroCopy}>
            <Text style={s.heroKicker}>
              сезонное
            </Text>

            <Text style={s.heroTitle}>
              матча{`\n`}клубника
            </Text>

            <Text
              numberOfLines={2}
              style={s.heroDescription}
            >
              зелёная матча · молоко · клубника
            </Text>

            <View style={s.heroPriceBox}>
              <Text style={s.heroPrice}>
                {rubles(seasonal.sizes[0].price)}
              </Text>
            </View>
          </View>

          <View style={s.heroVisual}>
            <ProductVisual
              product={seasonal}
              hero
            />
          </View>
        </Pressable>

        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>
            меню
          </Text>

          <Text style={s.sectionCount}>
            {twoDigits(products.length)} позиций
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.categories}
        >
          {categories.map((category) => {
            const active =
              category.id === activeCategory;

            return (
              <Pressable
                key={category.id}
                onPress={() =>
                  onCategoryChange(category.id)
                }
                style={[
                  s.category,
                  active &&
                    s.categoryActive,
                ]}
              >
                <Text
                  style={[
                    s.categoryText,
                    active &&
                      s.categoryTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={s.grid}>
          {products.map((product) => (
            <Pressable
              key={product.id}
              onPress={() =>
                onOpenProduct(product)
              }
              style={s.card}
            >
              <ProductVisual
                product={product}
              />

              <View style={s.cardCopy}>
                <Text
                  numberOfLines={2}
                  style={s.cardName}
                >
                  {product.name}
                </Text>

                <Text
                  numberOfLines={2}
                  style={s.cardDescription}
                >
                  {product.description}
                </Text>

                <View style={s.cardFooter}>
                  <Text style={s.cardPrice}>
                    от{' '}
                    {rubles(
                      product.sizes[0].price,
                    )}
                  </Text>

                  <View style={s.plus}>
                    <Text style={s.plusText}>
                      +
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScreenScrollView>

      {cartSummary.quantity > 0 ? (
        <Pressable
          onPress={onCart}
          style={s.cartBar}
        >
          <View style={s.cartCount}>
            <Text style={s.cartCountText}>
              {cartSummary.quantity}
            </Text>
          </View>

          <Text style={s.cartLabel}>
            корзина
          </Text>

          <Text style={s.cartTotal}>
            {rubles(cartSummary.total)}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
  },

  page: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: 118,
  },

  topBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },

  logoSlot: {
    width: 62,
    flexShrink: 0,
    alignItems: 'flex-start',
  },

  orderSlot: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  orderLink: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxs,
    paddingVertical: spacing.xxs,
  },

  orderLabel: {
    color: colors.muted,
    ...typography.eyebrow,
    letterSpacing: 0.55,
  },

  orderNumber: {
    color: colors.aqua,
    textDecorationLine: 'underline',
  },

  orderStatus: {
    color: colors.red,
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.55,
    textTransform: 'uppercase',
    marginTop: 2,
  },

  orderStatusReady: {
    color: colors.aqua,
  },

  location: {
    width: 150,
    flexShrink: 0,
    minHeight: 42,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  locationCopy: {
    width: '100%',
    minWidth: 0,
    alignItems: 'flex-end',
  },

  locationLabel: {
    color: colors.red,
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 3,
  },

  locationAddress: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    lineHeight: 13,
    textAlign: 'right',
  },

  hero: {
    height: 234,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.control,
    marginBottom: spacing.xl,
  },

  heroCopy: {
    width: '52%',
    backgroundColor: colors.red,
    justifyContent: 'center',
    padding: spacing.md,
  },

  heroKicker: {
    color: colors.white,
    ...typography.eyebrow,
    opacity: 0.78,
  },

  heroTitle: {
    color: colors.white,
    fontFamily: fonts.black,
    fontSize: 31,
    lineHeight: 30,
    letterSpacing: -1.5,
    marginTop: spacing.xs,
  },

  heroDescription: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 14,
    opacity: 0.88,
    marginTop: spacing.sm,
  },

  heroPriceBox: {
    alignSelf: 'flex-start',
    backgroundColor: colors.black,
    borderRadius: radii.sharp,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },

  heroPrice: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 13,
  },

  heroVisual: {
    width: '48%',
    height: '100%',
    backgroundColor: colors.paper,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  sectionTitle: {
    color: colors.text,
    ...typography.titleMedium,
    fontSize: 32,
    lineHeight: 34,
  },

  sectionCount: {
    color: colors.muted,
    ...typography.eyebrow,
    letterSpacing: 0.65,
  },

  categories: {
    gap: spacing.xs,
    paddingRight: spacing.xl,
    paddingBottom: spacing.md,
  },

  category: {
    minHeight: 38,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },

  categoryActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },

  categoryText: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 13,
  },

  categoryTextActive: {
    color: colors.black,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.sm,
  },

  card: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    overflow: 'hidden',
  },

  cardCopy: {
    minHeight: 122,
    padding: spacing.sm,
  },

  cardName: {
    minHeight: 38,
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.2,
  },

  cardDescription: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 9.5,
    lineHeight: 13,
    marginTop: spacing.xxs,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    marginTop: 'auto',
    paddingTop: spacing.xs,
  },

  cardPrice: {
    flexShrink: 1,
    color: colors.muted,
    fontFamily: fonts.semibold,
    fontSize: 9,
    lineHeight: 12,
  },

  plus: {
    width: 30,
    height: 30,
    flexShrink: 0,
    backgroundColor: colors.red,
    borderRadius: radii.sharp,
    alignItems: 'center',
    justifyContent: 'center',
  },

  plusText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 21,
  },

  cartBar: {
    position: 'absolute',
    left: layout.screenPadding,
    right: layout.screenPadding,
    bottom: layout.screenPadding,
    minHeight: 60,
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },

  cartCount: {
    width: 42,
    height: 42,
    backgroundColor: colors.red,
    borderRadius: radii.sharp,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartCountText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 15,
  },

  cartLabel: {
    flex: 1,
    color: colors.text,
    ...typography.bodyStrong,
    fontSize: 14,
    marginLeft: spacing.sm,
  },

  cartTotal: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 15,
  },
});
