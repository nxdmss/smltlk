import { Image, StyleSheet, View } from 'react-native';

import type { Product } from '../data/menu';
import { productImages } from '../data/productImages';
import { colors, productSurfaces } from '../theme';

export default function ProductVisual({
  product,
  hero = false,
}: {
  product: Product;
  hero?: boolean;
}) {
  const backgroundColor = productSurfaces[product.category];

  const catalogBackgroundColor =
    product.category === 'classic' ||
    product.category === 'not-coffee'
      ? colors.aqua
      : colors.red;

  return (
    <View
      style={[
        hero ? s.hero : s.card,
        {
          backgroundColor: hero
            ? backgroundColor
            : catalogBackgroundColor,
        },
      ]}
    >
      <Image
        resizeMode="contain"
        source={productImages[product.id]}
        style={hero ? s.heroImage : s.cardImage}
      />
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 54,
  },

  cardImage: {
    width: '82%',
    height: '100%',
    transform: [{ translateY: -2 }],
  },

  hero: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.paper,
  },

  heroImage: {
    width: '142%',
    height: '142%',
    transform: [{ translateX: 4 }, { translateY: 12 }],
  },
});
