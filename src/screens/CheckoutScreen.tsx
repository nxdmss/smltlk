import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppHeader from '../components/AppHeader';
import ScreenScrollView from '../components/ScreenScrollView';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import {
  colors,
  fonts,
  layout,
  radii,
  spacing,
  typography,
} from '../theme';
import type { CartSummary } from '../types';
import { rubles, twoDigits } from '../utils';

const pickupTimes = [
  'через 10 мин',
  'через 20 мин',
  'через 30 мин',
];

export default function CheckoutScreen({
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
  const shopNumber = twoDigits(
    coffeeShops.findIndex(
      (shop) => shop.id === location.id,
    ) + 1,
  );

  return (
    <View style={s.screen}>
      <ScreenScrollView
        screenKey="checkout"
        contentContainerStyle={s.page}
      >
        <AppHeader
          title="оформление"
          onBack={onBack}
          compact
        />

        <View style={s.locationRow}>
          <Text style={s.locationNo}>
            {shopNumber}
          </Text>

          <Text
            numberOfLines={1}
            style={s.locationAddress}
          >
            {location.address}
          </Text>
        </View>

        <Text style={s.sectionLabel}>
          когда приготовить
        </Text>

        <View style={s.timeGrid}>
          {pickupTimes.map((time) => {
            const active =
              time === pickupTime;

            return (
              <Pressable
                key={time}
                onPress={() =>
                  onTimeChange(time)
                }
                style={[
                  s.time,
                  active && s.timeActive,
                ]}
              >
                <Text
                  style={[
                    s.timeText,
                    active &&
                      s.timeTextActive,
                  ]}
                >
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={s.sectionLabel}>
          оплата
        </Text>

        <View style={s.payment}>
          <View style={s.paymentCopy}>
            <Text style={s.paymentTitle}>
              банковская карта
            </Text>

            <Text style={s.paymentMeta}>
              демо · деньги не списываются
            </Text>
          </View>

          <Text style={s.paymentMark}>
            VISA / МИР
          </Text>
        </View>

        <Text style={s.notice}>
          После подтверждения оплаты заказ
          сразу появится у бариста.
        </Text>

        <View style={s.summary}>
          <View style={s.row}>
            <Text style={s.label}>
              товары
            </Text>

            <Text style={s.value}>
              {rubles(summary.total)}
            </Text>
          </View>

          <View
            style={[
              s.row,
              s.totalRow,
            ]}
          >
            <Text style={s.totalLabel}>
              к оплате
            </Text>

            <Text style={s.totalValue}>
              {rubles(summary.total)}
            </Text>
          </View>
        </View>
      </ScreenScrollView>

      <View style={s.bottom}>
        <Pressable
          onPress={onPay}
          style={s.primary}
        >
          <Text style={s.primaryText}>
            оплатить
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
    minHeight: 46,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  locationNo: {
    color: colors.aqua,
    ...typography.eyebrow,
    width: 28,
  },

  locationAddress: {
    flex: 1,
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 13,
  },

  sectionLabel: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.35,
    marginBottom: spacing.xs,
  },

  timeGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },

  time: {
    flex: 1,
    minHeight: 58,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxs,
  },

  timeActive: {
    backgroundColor: colors.red,
    borderColor: colors.red,
  },

  timeText: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 9,
    lineHeight: 12,
    textAlign: 'center',
  },

  timeTextActive: {
    color: colors.white,
  },

  payment: {
    minHeight: 72,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },

  paymentCopy: {
    flex: 1,
  },

  paymentTitle: {
    color: colors.text,
    ...typography.bodyStrong,
    fontSize: 14,
  },

  paymentMeta: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 9,
    lineHeight: 12,
    marginTop: 3,
  },

  paymentMark: {
    color: colors.aqua,
    ...typography.eyebrow,
    letterSpacing: 0.45,
  },

  notice: {
    color: colors.muted,
    ...typography.body,
    fontSize: 10,
    lineHeight: 15,
    marginTop: spacing.xs,
  },

  summary: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxs,
  },

  label: {
    color: colors.muted,
    ...typography.body,
  },

  value: {
    color: colors.text,
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
    color: colors.red,
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

  primaryText: {
    color: colors.white,
    ...typography.button,
  },
});
