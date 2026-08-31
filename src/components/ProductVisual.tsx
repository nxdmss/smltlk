import { Image, StyleSheet, View } from 'react-native';
import type { Product } from '../data/menu';
import { productImages } from '../data/productImages';
import { colors } from '../theme';

export default function ProductVisual({ product, hero = false }: { product: Product; hero?: boolean }) {
  return (
    <View style={[styles.visual, { backgroundColor: product.artColor }, hero && styles.hero]}>
      <View style={styles.graphicOne} />
      <View style={styles.graphicTwo} />
      <Image resizeMode="contain" source={productImages[product.id]} style={[styles.image, hero && styles.imageHero]} />
    </View>
  );
}

const styles = StyleSheet.create({
  visual: { height: 176, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  hero: { height: 260 },
  graphicOne: { position: 'absolute', width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: 'rgba(255,255,255,0.22)', right: -20, top: -30 },
  graphicTwo: { position: 'absolute', width: 96, height: 96, backgroundColor: 'rgba(255,255,255,0.12)', left: -18, bottom: -18, transform: [{ rotate: '18deg' }] },
  image: { width: '90%', height: '116%', transform: [{ translateY: 12 }] },
  imageHero: { width: '118%', height: '148%', transform: [{ translateX: 8 }, { translateY: 10 }] },
});
