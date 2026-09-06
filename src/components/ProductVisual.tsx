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

  return (
    <View
      style={[
        hero ? s.hero : s.card,
        { backgroundColor },
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
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.paper,
  },

  cardImage: {
    width: '92%',
    height: '94%',
    transform: [{ translateY: 6 }],
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
