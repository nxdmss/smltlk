import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppHeader from './AppHeader';
import type { Product } from '../data/menu';
import { productImages } from '../data/productImages';
import {
  colors,
  layout,
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
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const compact = height < 760 || width < 360;

  if (!product) {
    return null;
  }

  const total =
    product.sizes[selectedSize].price +
    (altMilk ? 90 : 0) +
    (syrup ? 30 : 0);

  const productColor =
    product.category === 'classic' ||
    product.category === 'not-coffee'
      ? colors.aqua
      : colors.red;

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View
        style={[
          s.page,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={s.headerWrap}>
          <AppHeader
            title="напиток"
            onBack={onClose}
            compact
          />
        </View>

        <ScrollView
          style={s.scroll}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={[
            s.scrollContent,
            compact && s.scrollContentCompact,
          ]}
        >
          <View
            style={[
              s.visual,
              compact && s.visualCompact,
              {
                backgroundColor: productColor,
              },
            ]}
          >
            <Image
              source={productImages[product.id]}
              resizeMode="contain"
              style={[
                s.visualImage,
                compact && s.visualImageCompact,
              ]}
            />
          </View>

          <Text
            style={[
              s.title,
              compact && s.titleCompact,
            ]}
          >
            {product.name}
          </Text>

          <View style={s.rule} />

          <View style={s.section}>
            <Text style={s.sectionLabel}>
              РАЗМЕР
            </Text>

            <View style={s.sizeGrid}>
              {product.sizes.map((size, index) => {
                const active =
                  index === selectedSize;

                return (
                  <Pressable
                    key={size.label}
                    onPress={() =>
                      onSizeChange(index)
                    }
                    style={[
                      s.control,
                      active && s.controlActive,
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        s.controlTitle,
                        active &&
                          s.controlTitleActive,
                      ]}
                    >
                      {size.label}
                    </Text>

                    <Text
                      style={[
                        s.controlMeta,
                        active &&
                          s.controlMetaActive,
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
            <Text style={s.sectionLabel}>
              ДОБАВИТЬ
            </Text>

            <View style={s.extraGrid}>
              <Pressable
                onPress={onAltMilkChange}
                style={[
                  s.extra,
                  altMilk && s.extraActive,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    s.extraTitle,
                    altMilk &&
                      s.extraTitleActive,
                  ]}
                >
                  альт. молоко
                </Text>

                <Text
                  numberOfLines={2}
                  style={[
                    s.extraHint,
                    altMilk &&
                      s.extraHintActive,
                  ]}
                >
                  овсяное / кокосовое
                </Text>

                <Text
                  style={[
                    s.extraPrice,
                    altMilk &&
                      s.extraPriceActive,
                  ]}
                >
                  {altMilk
                    ? '✓ выбрано'
                    : '+90 ₽'}
                </Text>
              </Pressable>

              <Pressable
                onPress={onSyrupChange}
                style={[
                  s.extra,
                  syrup && s.extraActive,
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    s.extraTitle,
                    syrup &&
                      s.extraTitleActive,
                  ]}
                >
                  сироп
                </Text>

                <Text
                  numberOfLines={2}
                  style={[
                    s.extraHint,
                    syrup &&
                      s.extraHintActive,
                  ]}
                >
                  ваниль / карамель
                </Text>

                <Text
                  style={[
                    s.extraPrice,
                    syrup &&
                      s.extraPriceActive,
                  ]}
                >
                  {syrup
                    ? '✓ выбрано'
                    : '+30 ₽'}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionLabel}>
              СОСТАВ
            </Text>

            <View style={s.composition}>
              <Text style={s.description}>
                {product.description}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            s.bottomBar,
            {
              paddingBottom:
                Math.max(insets.bottom, 10),
            },
          ]}
        >
          <Pressable
            onPress={onAdd}
            style={s.cta}
          >
            <Text style={s.ctaText}>
              в корзину
            </Text>

            <Text style={s.ctaText}>
              {rubles(total)}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.bg,
  },

  headerWrap: {
    paddingHorizontal: layout.screenPadding,
  },

  scroll: {
    flex: 1,
    minHeight: 0,
  },

  scrollContent: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.lg,
  },

  scrollContentCompact: {
    paddingBottom: spacing.md,
  },

  visual: {
    height: 244,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },

  visualCompact: {
    height: 168,
    marginBottom: spacing.sm,
  },

  visualImage: {
    width: '80%',
    height: '94%',
  },

  visualImageCompact: {
    width: '72%',
    height: '92%',
  },

  title: {
    color: colors.text,
    ...typography.titleMedium,
    textTransform: 'lowercase',
  },

  titleCompact: {
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.8,
  },

  rule: {
    height: 1,
    backgroundColor: colors.line,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionLabel: {
    color: colors.text,
    ...typography.eyebrow,
    marginBottom: spacing.xs,
  },

  sizeGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
  },

  control: {
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
  },

  controlActive: {
    backgroundColor: colors.aqua,
    borderColor: colors.aqua,
  },

  controlTitle: {
    color: colors.text,
    ...typography.bodyStrong,
  },

  controlTitleActive: {
    color: colors.black,
  },

  controlMeta: {
    color: colors.muted,
    ...typography.caption,
    marginTop: 2,
  },

  controlMetaActive: {
    color: colors.black,
  },

  extraGrid: {
    flexDirection: 'row',
    gap: spacing.xs,
  },

  extra: {
    flex: 1,
    minWidth: 0,
    minHeight: 92,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },

  extraActive: {
    backgroundColor: colors.aqua,
    borderColor: colors.aqua,
  },

  extraTitle: {
    color: colors.text,
    ...typography.bodyStrong,
  },

  extraTitleActive: {
    color: colors.black,
  },

  extraHint: {
    color: colors.muted,
    ...typography.caption,
    marginTop: 3,
  },

  extraHintActive: {
    color: colors.black,
    opacity: 0.72,
  },

  extraPrice: {
    color: colors.text,
    ...typography.caption,
    fontFamily: typography.bodyStrong.fontFamily,
    marginTop: 'auto',
    paddingTop: spacing.xs,
  },

  extraPriceActive: {
    color: colors.black,
  },

  composition: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    borderRadius: radii.control,
    padding: spacing.sm,
  },

  description: {
    color: colors.muted,
    ...typography.body,
  },

  bottomBar: {
    flexShrink: 0,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    backgroundColor: colors.white,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
  },

  cta: {
    minHeight: layout.buttonHeight,
    backgroundColor: colors.black,
    borderRadius: radii.control,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  ctaText: {
    color: colors.white,
    ...typography.button,
  },
});
