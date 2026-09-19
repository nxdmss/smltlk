import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { Product } from '../data/menu';
import { productImages } from '../data/productImages';
import {
  colors,
  fonts,
  layout,
  productSurfaces,
  radii,
  spacing,
  typography,
} from '../theme';
import { rubles } from '../utils';

export default function ProductSheet({
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
  const total = product
    ? product.sizes[selectedSize].price +
      (altMilk ? 90 : 0) +
      (syrup ? 30 : 0)
    : 0;

  return (
    <Modal
      transparent
      visible={Boolean(product)}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={s.backdrop}>
        <Pressable
          accessibilityLabel="Закрыть"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />

        {product ? (
          <View style={s.sheet}>
            <View style={s.handle} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={s.scrollContent}
            >
              <View style={s.hero}>
                <View
                  style={[
                    s.visual,
                    {
                      backgroundColor:
                        productSurfaces[product.category],
                    },
                  ]}
                >
                  <Image
                    source={productImages[product.id]}
                    resizeMode="contain"
                    style={s.visualImage}
                  />
                </View>

                <View style={s.heroCopy}>
                  <View style={s.heroTop}>
                    <Text style={s.eyebrow}>напиток</Text>

                    <Pressable
                      accessibilityLabel="Закрыть"
                      onPress={onClose}
                      style={s.close}
                    >
                      <Text style={s.closeText}>×</Text>
                    </Pressable>
                  </View>

                  <Text style={s.title}>{product.name}</Text>

                  <Text
                    numberOfLines={3}
                    style={s.description}
                  >
                    {product.description}
                  </Text>
                </View>
              </View>

              <View style={s.section}>
                <Text style={s.sectionLabel}>размер</Text>

                <View style={s.sizeList}>
                  {product.sizes.map((size, index) => {
                    const active = index === selectedSize;

                    return (
                      <Pressable
                        key={size.label}
                        onPress={() => onSizeChange(index)}
                        style={[
                          s.sizeCard,
                          active && s.sizeCardActive,
                        ]}
                      >
                        <Text
                          style={[
                            s.sizeName,
                            active && s.sizeNameActive,
                          ]}
                        >
                          {size.label}
                        </Text>

                        <Text
                          style={[
                            s.sizePrice,
                            active && s.sizePriceActive,
                          ]}
                        >
                          {rubles(size.price)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={s.section}>
                <Text style={s.sectionLabel}>добавки</Text>

                <View style={s.extras}>
                  <ExtraRow
                    title="альтернативное молоко"
                    hint="овсяное / кокосовое"
                    price="+90 ₽"
                    active={altMilk}
                    onPress={onAltMilkChange}
                  />

                  <ExtraRow
                    title="сироп"
                    hint="ваниль / карамель"
                    price="+30 ₽"
                    active={syrup}
                    onPress={onSyrupChange}
                  />
                </View>
              </View>
            </ScrollView>

            <Pressable onPress={onAdd} style={s.cta}>
              <Text style={s.ctaText}>в корзину</Text>
              <Text style={s.ctaText}>{rubles(total)}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

function ExtraRow({
  title,
  hint,
  price,
  active,
  onPress,
}: {
  title: string;
  hint: string;
  price: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[s.extraRow, active && s.extraRowActive]}
    >
      <View style={s.extraCopy}>
        <Text
          style={[
            s.extraTitle,
            active && s.extraTitleActive,
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            s.extraHint,
            active && s.extraHintActive,
          ]}
        >
          {hint}
        </Text>
      </View>

      <Text
        style={[
          s.extraPrice,
          active && s.extraPriceActive,
        ]}
      >
        {active ? '✓' : price}
      </Text>
    </Pressable>
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
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },

  handle: {
    width: 44,
    height: 3,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },

  scrollContent: {
    paddingBottom: spacing.xs,
  },

  hero: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },

  visual: {
    width: 104,
    height: 126,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },

  visualImage: {
    width: 98,
    height: 116,
    transform: [{ translateY: 4 }],
  },

  heroCopy: {
    flex: 1,
    minWidth: 0,
    minHeight: 126,
  },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },

  eyebrow: {
    color: colors.aqua,
    ...typography.eyebrow,
    marginTop: 3,
  },

  close: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panelSoft,
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

  title: {
    color: colors.text,
    ...typography.titleMedium,
    fontSize: 24,
    lineHeight: 26,
    marginTop: spacing.xxs,
  },

  description: {
    color: colors.muted,
    ...typography.body,
    fontSize: 11,
    lineHeight: 15,
    marginTop: spacing.xs,
  },

  section: {
    marginBottom: spacing.md,
  },

  sectionLabel: {
    color: colors.muted,
    ...typography.eyebrow,
    marginBottom: spacing.xs,
  },

  sizeList: {
    flexDirection: 'row',
    gap: spacing.xs,
  },

  sizeCard: {
    flex: 1,
    minHeight: 58,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panelSoft,
    borderRadius: radii.control,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'space-between',
  },

  sizeCardActive: {
    backgroundColor: colors.paper,
    borderColor: colors.paper,
  },

  sizeName: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 15,
  },

  sizeNameActive: {
    color: colors.black,
  },

  sizePrice: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 13,
  },

  sizePriceActive: {
    color: colors.black,
  },

  extras: {
    gap: spacing.xs,
  },

  extraRow: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panelSoft,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  extraRowActive: {
    borderColor: colors.aqua,
  },

  extraCopy: {
    flex: 1,
    minWidth: 0,
  },

  extraTitle: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 15,
  },

  extraTitleActive: {
    color: colors.aqua,
  },

  extraHint: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 9,
    lineHeight: 12,
    marginTop: 2,
  },

  extraHintActive: {
    color: colors.muted,
  },

  extraPrice: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 13,
  },

  extraPriceActive: {
    color: colors.aqua,
  },

  cta: {
    minHeight: layout.buttonHeight,
    backgroundColor: colors.red,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },

  ctaText: {
    color: colors.white,
    ...typography.button,
  },
});
