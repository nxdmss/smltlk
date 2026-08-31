import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Product } from '../data/menu';
import { colors } from '../theme';
import { rubles } from '../utils';
import ProductVisual from './ProductVisual';

export default function ProductSheet({ product, selectedSize, altMilk, syrup, onSizeChange, onAltMilkChange, onSyrupChange, onClose, onAdd }: {
  product: Product | null; selectedSize: number; altMilk: boolean; syrup: boolean;
  onSizeChange: (index: number) => void; onAltMilkChange: () => void; onSyrupChange: () => void; onClose: () => void; onAdd: () => void;
}) {
  const price = product ? product.sizes[selectedSize].price + (altMilk ? 90 : 0) + (syrup ? 30 : 0) : 0;
  return (
    <Modal animationType="slide" transparent visible={Boolean(product)} onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Закрыть" />
        {product ? <View style={styles.sheet}>
          <View style={styles.handle} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProductVisual product={product} hero />
            <View style={styles.head}>
              <View style={{ flex: 1 }}><Text style={styles.kicker}>ST/{product.code} · СОБЕРИ СВОЙ</Text><Text style={styles.title}>{product.name}</Text><Text style={styles.description}>{product.description}</Text></View>
              <Pressable onPress={onClose} style={styles.close}><Text style={styles.closeText}>×</Text></Pressable>
            </View>
            <Text style={styles.label}>РАЗМЕР</Text>
            <View style={styles.row}>{product.sizes.map((size, index) => <Pressable key={size.label} onPress={() => onSizeChange(index)} style={[styles.option, index === selectedSize && styles.optionActive]}><Text style={[styles.optionName, index === selectedSize && styles.optionNameActive]}>{size.label}</Text><Text style={[styles.optionPrice, index === selectedSize && styles.optionNameActive]}>{rubles(size.price)}</Text></Pressable>)}</View>
            <Text style={styles.label}>ДОБАВИТЬ</Text>
            <Pressable onPress={onAltMilkChange} style={[styles.extra, altMilk && styles.extraActive]}><Text style={[styles.extraText, altMilk && styles.extraTextActive]}>альтернативное молоко</Text><Text style={[styles.extraPrice, altMilk && styles.extraTextActive]}>{altMilk ? '✓' : '+90 ₽'}</Text></Pressable>
            <Pressable onPress={onSyrupChange} style={[styles.extra, syrup && styles.extraActive]}><Text style={[styles.extraText, syrup && styles.extraTextActive]}>сироп</Text><Text style={[styles.extraPrice, syrup && styles.extraTextActive]}>{syrup ? '✓' : '+30 ₽'}</Text></Pressable>
          </ScrollView>
          <Pressable onPress={onAdd} style={styles.add}><Text style={styles.addText}>добавить</Text><Text style={styles.addText}>{rubles(price)}</Text></Pressable>
        </View> : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.68)', justifyContent: 'flex-end', alignItems: 'center' },
  sheet: { width: '100%', maxWidth: 520, maxHeight: '94%', backgroundColor: colors.paper, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 18, borderWidth: 1.5, borderColor: colors.black },
  handle: { width: 52, height: 5, borderRadius: 3, backgroundColor: colors.black, alignSelf: 'center', marginBottom: 14 },
  head: { flexDirection: 'row', gap: 12, marginTop: 18 }, kicker: { color: colors.red, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1.2 },
  title: { color: colors.black, fontSize: 32, lineHeight: 34, fontWeight: '900', letterSpacing: -1.6, marginTop: 5 },
  description: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  close: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' }, closeText: { color: colors.white, fontSize: 26, lineHeight: 28 },
  label: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 9, letterSpacing: 1.4, marginTop: 22, marginBottom: 9 },
  row: { flexDirection: 'row', gap: 8 }, option: { flex: 1, minHeight: 70, borderRadius: 16, borderWidth: 1.5, borderColor: colors.black, padding: 12, justifyContent: 'space-between' }, optionActive: { backgroundColor: colors.black },
  optionName: { color: colors.black, fontWeight: '800', fontSize: 12 }, optionNameActive: { color: colors.white }, optionPrice: { color: colors.muted, fontFamily: 'IBMPlexMono_600SemiBold', fontSize: 10 },
  extra: { minHeight: 58, borderWidth: 1.5, borderColor: colors.black, borderRadius: 16, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }, extraActive: { backgroundColor: colors.red, borderColor: colors.red }, extraText: { color: colors.black, fontWeight: '800', fontSize: 13 }, extraTextActive: { color: colors.white }, extraPrice: { color: colors.black, fontFamily: 'IBMPlexMono_700Bold', fontSize: 10 },
  add: { minHeight: 62, borderRadius: 18, backgroundColor: colors.red, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, marginTop: 14 }, addText: { color: colors.white, fontSize: 16, fontWeight: '900' },
});
