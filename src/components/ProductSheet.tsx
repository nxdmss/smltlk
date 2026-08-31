import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

import type { Product } from '../data/menu';
import { styles } from '../styles';
import { rubles } from '../utils';
import ProductVisual from './ProductVisual';

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
  const selectedPrice = product
    ? product.sizes[selectedSize].price + (altMilk ? 90 : 0) + (syrup ? 30 : 0)
    : 0;

  return (
    <Modal animationType="slide" transparent visible={Boolean(product)} onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <Pressable accessibilityLabel="Закрыть карточку" style={styles.modalDismiss} onPress={onClose} />
        {product ? (
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <ProductVisual product={product} hero />
              <View style={styles.sheetHeader}>
                <View style={styles.sheetTitleWrap}>
                  <Text style={styles.sheetKicker}>CUSTOMIZE YOUR DRINK</Text>
                  <Text style={styles.sheetTitle}>{product.name}</Text>
                  <Text style={styles.sheetDescription}>{product.description}</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Закрыть"
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>

              <Text style={styles.optionTitle}>размер</Text>
              <View style={styles.optionRow}>
                {product.sizes.map((size, index) => (
                  <Pressable
                    key={size.label + '-' + size.price}
                    accessibilityRole="button"
                    accessibilityState={{ selected: selectedSize === index }}
                    onPress={() => onSizeChange(index)}
                    style={[styles.option, selectedSize === index && styles.optionActive]}
                  >
                    <Text style={styles.optionLabel}>{size.label}</Text>
                    <Text style={styles.optionPrice}>{rubles(size.price)}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.optionTitle}>добавить</Text>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: altMilk }}
                style={styles.extraRow}
                onPress={onAltMilkChange}
              >
                <Text style={styles.extraLabel}>альтернативное молоко</Text>
                <View style={[styles.check, altMilk && styles.checkActive]}>
                  <Text style={styles.checkText}>{altMilk ? '✓' : '+90'}</Text>
                </View>
              </Pressable>
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: syrup }}
                style={styles.extraRow}
                onPress={onSyrupChange}
              >
                <Text style={styles.extraLabel}>сироп</Text>
                <View style={[styles.check, syrup && styles.checkActive]}>
                  <Text style={styles.checkText}>{syrup ? '✓' : '+30'}</Text>
                </View>
              </Pressable>
            </ScrollView>
            <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onAdd}>
              <Text style={styles.primaryButtonText}>добавить</Text>
              <Text style={styles.primaryButtonText}>{rubles(selectedPrice)}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
