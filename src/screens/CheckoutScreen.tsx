import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeader from '../components/AppHeader';
import GlassPanel from '../components/GlassPanel';
import ScreenScrollView from '../components/ScreenScrollView';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import { styles } from '../styles';
import { colors } from '../theme';
import type { CartSummary } from '../types';
import { rubles } from '../utils';

const pickupTimes = ['через 10 мин', 'через 20 мин', 'через 30 мин'] as const;

export default function CheckoutScreen({
  location,
  summary,
  pickupTime,
  onTimeChange,
  onBack,
  onPay,
}: {
  location: CoffeeShop;
  summary: CartSummary;
  pickupTime: string;
  onTimeChange: (time: string) => void;
  onBack: () => void;
  onPay: () => void;
}) {
  return (
    <View style={styles.flex}>
      <ScreenScrollView screenKey="checkout" contentContainerStyle={styles.pageContentWithBar}>
        <AppHeader title="оформление" onBack={onBack} />
        <Text style={styles.checkoutHeading}>самовывоз</Text>
        <GlassPanel style={styles.checkoutCard}>
          <View style={styles.locationNumber}>
            <Text style={styles.locationNumberText}>
              {coffeeShops.findIndex((shop) => shop.id === location.id) + 1}
            </Text>
          </View>
          <View style={styles.locationCopy}>
            <Text style={styles.locationAddress}>{location.address}</Text>
            <Text style={styles.locationSchedule}>заказ будет ждать у стойки</Text>
          </View>
        </GlassPanel>

        <Text style={styles.checkoutHeading}>когда приготовить?</Text>
        <View style={styles.timeGrid}>
          {pickupTimes.map((time) => (
            <Pressable
              key={time}
              accessibilityRole="radio"
              accessibilityState={{ selected: pickupTime === time }}
              onPress={() => onTimeChange(time)}
              style={[styles.timeChip, pickupTime === time && styles.timeChipActive]}
            >
              <Text style={[styles.timeChipText, pickupTime === time && styles.timeChipTextActive]}>
                {time}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.checkoutHeading}>предоплата</Text>
        <GlassPanel style={styles.paymentCard}>
          <LinearGradient colors={[colors.aqua, '#47A9C5']} style={styles.cardIcon}>
            <Text style={styles.cardIconText}>▰</Text>
          </LinearGradient>
          <View style={styles.locationCopy}>
            <Text style={styles.paymentTitle}>банковская карта</Text>
            <Text style={styles.paymentSubtitle}>демо · деньги не списываются</Text>
          </View>
          <Text style={styles.locationArrow}>›</Text>
        </GlassPanel>
        <Text style={styles.paymentNotice}>
          Заказ попадёт бариста только после успешной оплаты.
        </Text>

        <GlassPanel style={styles.summaryCard}>
          <View style={styles.summaryColumn}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>товары</Text>
              <Text style={styles.summaryValue}>{rubles(summary.total)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotalRow]}>
              <Text style={styles.summaryTotalLabel}>к оплате</Text>
              <Text style={styles.summaryTotalValue}>{rubles(summary.total)}</Text>
            </View>
          </View>
        </GlassPanel>
      </ScreenScrollView>
      <View style={styles.bottomAction}>
        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={onPay}>
          <Text style={styles.primaryButtonText}>оплатить</Text>
          <Text style={styles.primaryButtonText}>{rubles(summary.total)}</Text>
        </Pressable>
      </View>
    </View>
  );
}
