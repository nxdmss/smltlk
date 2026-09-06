import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppHeader from '../components/AppHeader';
import ScreenScrollView from '../components/ScreenScrollView';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import { menu } from '../data/menu';
import { productImages } from '../data/productImages';
import {
  colors,
  fonts,
  layout,
  radii,
  spacing,
  typography,
} from '../theme';
import type {
  CartItem,
  CartSummary,
} from '../types';
import { rubles, twoDigits } from '../utils';

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
  onQuantityChange: (
    key: string,
    delta: number,
  ) => void;
  onCheckout: () => void;
}) {
  const shopNumber = twoDigits(
    coffeeShops.findIndex(
      (shop) => shop.id === location.id,
    ) + 1,
  );

  return (
    <View style={s.screen}>
      <ScreenScrollView
        screenKey="cart"
        contentContainerStyle={s.page}
      >
        <AppHeader
          title="корзина"
          onBack={onBack}
          compact
        />

        <Pressable
          onPress={onLocations}
          style={s.locationRow}
        >
          <Text style={s.locationText}>
            {shopNumber} · {location.address}
          </Text>

          <Text style={s.change}>
            сменить
          </Text>
        </Pressable>

        <View style={s.items}>
          {items.map((item) => {
            const product =
              menu.find(
                (candidate) =>
                  candidate.id ===
                  item.productId,
              ) ?? menu[0];

            return (
              <View
                key={item.key}
                style={s.item}
              >
                <View style={s.thumb}>
                  <Image
                    source={
                      productImages[product.id]
                    }
                    resizeMode="contain"
                    style={s.thumbImage}
                  />
                </View>

                <View style={s.itemCopy}>
                  <Text
                    numberOfLines={1}
                    style={s.itemName}
                  >
                    {item.name}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={s.itemDetails}
                  >
                    {item.details}
                  </Text>

                  <View style={s.itemBottom}>
                    <Text style={s.itemPrice}>
                      {rubles(
                        item.unitPrice *
                          item.quantity,
                      )}
                    </Text>

                    <View style={s.counter}>
                      <Pressable
                        accessibilityLabel="Уменьшить количество"
                        onPress={() =>
                          onQuantityChange(
                            item.key,
                            -1,
                          )
                        }
                        style={s.counterButton}
                      >
                        <Text
                          style={
                            s.counterButtonText
                          }
                        >
                          −
                        </Text>
                      </Pressable>

                      <Text style={s.counterValue}>
                        {item.quantity}
                      </Text>

                      <Pressable
                        accessibilityLabel="Увеличить количество"
                        onPress={() =>
                          onQuantityChange(
                            item.key,
                            1,
                          )
                        }
                        style={s.counterButton}
                      >
                        <Text
                          style={
                            s.counterButtonText
                          }
                        >
                          +
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={s.summary}>
          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>
              напитки · {summary.quantity}
            </Text>

            <Text style={s.summaryValue}>
              {rubles(summary.total)}
            </Text>
          </View>

          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>
              самовывоз
            </Text>

            <Text style={s.free}>
              0 ₽
            </Text>
          </View>

          <View
            style={[
              s.summaryRow,
              s.totalRow,
            ]}
          >
            <Text style={s.totalLabel}>
              итого
            </Text>

            <Text style={s.totalValue}>
              {rubles(summary.total)}
            </Text>
          </View>
        </View>
      </ScreenScrollView>

      <View style={s.bottom}>
        <Pressable
          disabled={summary.quantity === 0}
          onPress={onCheckout}
          style={[
            s.primary,
            summary.quantity === 0 &&
              s.primaryDisabled,
          ]}
        >
          <Text style={s.primaryText}>
            к оформлению
          </Text>

          <Text style={s.primaryText}>
            {rubles(summary.total)}
          </Text>
        </Pressable>
      </View>
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
    paddingBottom: 116,
  },

  locationRow: {
    minHeight: 42,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  locationText: {
    flex: 1,
    minWidth: 0,
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 13,
  },

  change: {
    color: colors.aqua,
    ...typography.eyebrow,
    letterSpacing: 0.55,
  },

  items: {
    gap: spacing.xs,
  },

  item: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    flexDirection: 'row',
    gap: spacing.xs,
    padding: 7,
  },

  thumb: {
    width: 78,
    height: 88,
    backgroundColor: colors.paper,
    borderRadius: radii.sharp,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },

  thumbImage: {
    width: 72,
    height: 82,
    transform: [{ translateY: 3 }],
  },

  itemCopy: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 3,
  },

  itemName: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.2,
  },

  itemDetails: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 9.5,
    lineHeight: 13,
    marginTop: 3,
  },

  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    marginTop: 'auto',
  },

  itemPrice: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 10.5,
    lineHeight: 13,
  },

  counter: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.sharp,
    backgroundColor: colors.panelStrong,
  },

  counterButton: {
    width: 30,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterButtonText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 18,
  },

  counterValue: {
    minWidth: 24,
    textAlign: 'center',
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 13,
  },

  summary: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxs,
  },

  summaryLabel: {
    color: colors.muted,
    ...typography.body,
  },

  summaryValue: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
  },

  free: {
    color: colors.aqua,
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    marginTop: spacing.xs,
    paddingTop: spacing.sm,
  },

  totalLabel: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
  },

  totalValue: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
  },

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: layout.screenPadding,
    backgroundColor: 'rgba(7,7,8,0.96)',
  },

  primary: {
    minHeight: layout.buttonHeight,
    backgroundColor: colors.red,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },

  primaryDisabled: {
    opacity: 0.45,
  },

  primaryText: {
    color: colors.white,
    ...typography.button,
  },
});
