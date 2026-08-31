import { StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/menu';
import { colors } from '../theme';

export default function ProductVisual({ product, hero = false }: { product: Product; hero?: boolean }) {
  const dark = product.artColor === colors.black;
  return (
    <View style={[styles.visual, { backgroundColor: product.artColor }, hero && styles.hero]}>
      <Text style={[styles.code, dark && styles.lightText]}>ST/{product.code}</Text>
      <View style={[styles.disc, hero && styles.discHero, { backgroundColor: product.drinkColor }]} />
      <View style={[styles.cup, hero && styles.cupHero, dark && styles.cupLight]}>
        <View style={[styles.liquid, { backgroundColor: product.drinkColor }]} />
        <View style={[styles.handle, dark && styles.handleLight]} />
      </View>
      <Text style={[styles.talk, dark && styles.lightText]}>TALK{hero ? ' / COFFEE' : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  visual: { height: 166, overflow: 'hidden', padding: 12, justifyContent: 'center', alignItems: 'center' },
  hero: { height: 265, borderWidth: 1.5, borderColor: colors.black },
  code: { position: 'absolute', left: 11, top: 10, color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1 },
  talk: { position: 'absolute', right: 10, bottom: 9, color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 7.5, letterSpacing: 1.1 },
  lightText: { color: colors.white },
  disc: { width: 94, height: 94, borderRadius: 47, opacity: 0.92 },
  discHero: { width: 150, height: 150, borderRadius: 75 },
  cup: { position: 'absolute', width: 70, height: 62, borderRadius: 7, borderWidth: 3, borderColor: colors.black, backgroundColor: colors.paper, alignItems: 'center', paddingTop: 7 },
  cupHero: { width: 108, height: 92, borderRadius: 10, borderWidth: 4, paddingTop: 10 },
  cupLight: { borderColor: colors.white, backgroundColor: colors.paper },
  liquid: { width: '72%', height: '37%', borderRadius: 999 },
  handle: { position: 'absolute', width: 24, height: 30, borderWidth: 3, borderColor: colors.black, borderLeftWidth: 0, right: -24, top: 13, borderTopRightRadius: 15, borderBottomRightRadius: 15 },
  handleLight: { borderColor: colors.white },
});
