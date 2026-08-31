import { Image, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import type { Product } from '../data/menu';
import { productImages } from '../data/productImages';
import { styles } from '../styles';

export default function ProductVisual({ product, hero = false }: { product: Product; hero?: boolean }) {
  return (
    <View style={[styles.productVisual, { backgroundColor: product.artColor }, hero && styles.productVisualHero]}>
      <LinearGradient colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0)']} style={StyleSheet.absoluteFill} />
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={productImages[product.id]}
        style={[styles.productImage, hero && styles.productImageHero]}
      />
    </View>
  );
}
