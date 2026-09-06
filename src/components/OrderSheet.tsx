import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  colors,
  fonts,
  layout,
  radii,
  spacing,
  typography,
} from '../theme';
import type { ActiveOrder } from '../types';
import { rubles } from '../utils';

export default function OrderSheet({
  order,
  visible,
  onClose,
}: {
  order: ActiveOrder | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!order) return null;

  const ready = order.status === 'готов';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.backdrop}>
        <Pressable
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />

        <View style={s.sheet}>
          <View style={s.topRow}>
            <Pressable
              accessibilityLabel="Закрыть заказ"
              onPress={onClose}
              style={s.close}
            >
              <Text style={s.closeText}>×</Text>
            </Pressable>

            <View style={s.addressCorner}>
              <Text style={s.addressLabel}>точка</Text>
              <Text numberOfLines={2} style={s.address}>
                {order.address}
              </Text>
            </View>
          </View>

          <View style={s.orderFocus}>
            <Text style={s.eyebrow}>заказ</Text>
            <Text style={s.orderId}>{order.id}</Text>
            <Text
              style={[
                s.status,
                ready && s.statusReady,
              ]}
            >
              {order.status}
            </Text>
          </View>

          <View style={s.pickupRow}>
            <Text style={s.metaLabel}>забрать</Text>
            <Text style={s.metaValue}>{order.pickupTime}</Text>
          </View>

          <Text style={s.sectionLabel}>состав заказа</Text>

          <ScrollView
            style={s.items}
            showsVerticalScrollIndicator={false}
          >
            {order.items.map((item) => (
              <View key={item.key} style={s.itemRow}>
                <View style={s.itemCopy}>
                  <Text style={s.itemName}>
                    {item.quantity} × {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={s.itemDetails}
                  >
                    {item.details}
                  </Text>
                </View>

                <Text style={s.itemPrice}>
                  {rubles(item.unitPrice * item.quantity)}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={s.totalRow}>
            <Text style={s.totalLabel}>
              итого · {order.quantity}
            </Text>
            <Text style={s.total}>{rubles(order.total)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  sheet: {
    width: '100%',
    maxWidth: layout.maxWidth,
    maxHeight: '82%',
    backgroundColor: colors.panel,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },

  topRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  close: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 22,
    lineHeight: 22,
  },

  addressCorner: {
    width: '60%',
    alignItems: 'flex-end',
  },

  addressLabel: {
    color: colors.aqua,
    ...typography.eyebrow,
  },

  address: {
    color: colors.muted,
    ...typography.caption,
    textAlign: 'right',
    marginTop: 3,
  },

  orderFocus: {
    minHeight: 146,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },

  eyebrow: {
    color: colors.muted,
    ...typography.eyebrow,
  },

  orderId: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.7,
    marginTop: spacing.xxs,
  },

  status: {
    color: colors.red,
    fontFamily: fonts.black,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.5,
    textTransform: 'uppercase',
    marginTop: spacing.xs,
  },

  statusReady: {
    color: colors.aqua,
  },

  pickupRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },

  metaLabel: {
    color: colors.muted,
    ...typography.caption,
  },

  metaValue: {
    color: colors.text,
    ...typography.bodyStrong,
  },

  sectionLabel: {
    color: colors.muted,
    ...typography.eyebrow,
    marginTop: spacing.md,
    marginBottom: spacing.xxs,
  },

  items: {
    maxHeight: 190,
  },

  itemRow: {
    minHeight: 56,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },

  itemCopy: {
    flex: 1,
    minWidth: 0,
  },

  itemName: {
    color: colors.text,
    ...typography.bodyStrong,
  },

  itemDetails: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 9,
    lineHeight: 12,
    marginTop: 2,
  },

  itemPrice: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 10,
    lineHeight: 13,
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    marginTop: spacing.xxs,
  },

  totalLabel: {
    color: colors.muted,
    ...typography.body,
  },

  total: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
  },
});
