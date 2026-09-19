import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BrandMark from '../components/BrandMark';
import type { CoffeeShop } from '../data/locations';
import {
  colors,
  fonts,
  layout,
  radii,
  spacing,
  typography,
} from '../theme';

export default function SuccessScreen({
  location,
  pickupTime,
  orderId,
  onNewOrder,
}: {
  location: CoffeeShop;
  pickupTime: string;
  orderId: string;
  onNewOrder: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        s.page,
        {
          paddingTop: insets.top + layout.screenPadding,
          paddingBottom: insets.bottom + layout.screenPadding,
        },
      ]}
    >
      <View style={s.top}>
        <BrandMark width={50} />

        <View style={s.addressCorner}>
          <Text style={s.addressLabel}>
            точка
          </Text>

          <Text
            numberOfLines={2}
            style={s.address}
          >
            {location.address}
          </Text>
        </View>
      </View>

      <View style={s.center}>
        <Text style={s.orderLabel}>
          заказ
        </Text>

        <Text style={s.orderId}>
          {orderId}
        </Text>

        <Text style={s.status}>
          готовится
        </Text>

        <View style={s.rule} />

        <Text style={s.pickupLabel}>
          забрать
        </Text>

        <Text style={s.pickup}>
          {pickupTime}
        </Text>
      </View>

      <Pressable
        onPress={onNewOrder}
        style={s.button}
      >
        <Text style={s.buttonText}>
          на главный экран
        </Text>

        <Text style={s.buttonArrow}>
          →
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: layout.screenPadding,

  },

  top: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

  },

  addressCorner: {
    width: '58%',
    alignItems: 'flex-end',

  },

  addressLabel: {
    color: colors.aqua,
    ...typography.body,
  },

  address: {
    color: colors.muted,
    ...typography.caption,
textAlign: 'right',
    marginTop: 3,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xxxl,

  },

  orderLabel: {
    color: colors.muted,
    ...typography.eyebrow,
  },

  orderId: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.9,
    marginTop: spacing.xxs,

  },

  status: {
    color: colors.red,
    fontFamily: fonts.black,
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: -2.1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: spacing.sm,

  },

  rule: {
    width: 64,
    height: 1,
    backgroundColor: colors.red,
    marginVertical: spacing.xl,

  },

  pickupLabel: {
    color: colors.muted,
    ...typography.body,
  },

  pickup: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 23,
    marginTop: spacing.xxs,

  },

  button: {
    minHeight: layout.buttonHeight,
    backgroundColor: colors.red,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,

  },

  buttonText: {
    color: colors.white,
    ...typography.button,
  },

  buttonArrow: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 22,

  },
});
