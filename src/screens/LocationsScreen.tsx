import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BrandMark from '../components/BrandMark';
import CoffeeMap from '../components/CoffeeMap';
import { coffeeShops } from '../data/locations';
import type { CoffeeShop } from '../data/locations';
import {
  colors,
  fonts,
  radii,
  spacing,
  typography,
} from '../theme';
import { twoDigits } from '../utils';

type ViewMode = 'map' | 'list';

export default function LocationsScreen({
  selected,
  onSelect,
  onContinue,
}: {
  selected: CoffeeShop;
  onSelect: (shop: CoffeeShop) => void;
  onContinue: () => void;
}) {
  const [mode, setMode] = useState<ViewMode>('map');
  const [panelOpen, setPanelOpen] = useState(false);
  const [hasPickedLocation, setHasPickedLocation] = useState(false);

  const selectedIndex =
    coffeeShops.findIndex(
      (shop) => shop.id === selected.id,
    ) + 1;

  const chooseShop = (shop: CoffeeShop) => {
    setHasPickedLocation(true);
    onSelect(shop);
    setPanelOpen(true);
  };

  const toggleMode = () => {
    setMode((current) =>
      current === 'map' ? 'list' : 'map',
    );
    setPanelOpen(false);
  };

  return (
    <View style={s.page}>
      {mode === 'map' ? (
        <View style={StyleSheet.absoluteFill}>
          <CoffeeMap
            shops={coffeeShops}
            selectedId={hasPickedLocation ? selected.id : ''}
            onSelect={chooseShop}
          />
        </View>
      ) : (
        <View style={s.listBackground}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.listContent}
          >
            <Text style={s.listKicker}>
              SMLTLK · 04 ТОЧКИ
            </Text>

            <Text style={s.listTitle}>
              выбери адрес
            </Text>

            <View style={s.addressList}>
              {coffeeShops.map(
                (shop, index) => {
                  const active =
                    hasPickedLocation &&
                    selected.id === shop.id;

                  return (
                    <Pressable
                      key={shop.id}
                      onPress={() =>
                        chooseShop(shop)
                      }
                      style={[
                        s.listRow,
                        active &&
                          s.listRowActive,
                      ]}
                    >
                      <Text
                        style={[
                          s.listNo,
                          active &&
                            s.listNoActive,
                        ]}
                      >
                        {twoDigits(index + 1)}
                      </Text>

                      <View style={s.listCopy}>
                        <Text
                          numberOfLines={1}
                          style={s.listAddress}
                        >
                          {shop.address}
                        </Text>

                        <Text style={s.listTime}>
                          {shop.schedule}
                        </Text>
                      </View>

                      <Text style={s.listArrow}>
                        →
                      </Text>
                    </Pressable>
                  );
                },
              )}
            </View>
          </ScrollView>
        </View>
      )}

      <View pointerEvents="none" style={s.mapLogo}>
        <BrandMark width={48} />
      </View>

      <Pressable
        accessibilityLabel={mode === 'map' ? 'Открыть список точек' : 'Открыть карту'}
        onPress={toggleMode}
        style={s.modeButton}
      >
        <Text style={s.modeButtonText}>
          {mode === 'map' ? 'список' : 'карта'}
        </Text>
      </Pressable>

      {panelOpen ? (
        <View style={s.locationSheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.sheetScrollContent}
          >
            <View style={s.sheetTop}>
              <View>
                <Text style={s.sheetKicker}>
                  SMALL TALK · ТОЧКА {twoDigits(selectedIndex)}
                </Text>

                <Text style={s.shopAddress}>
                  {selected.address}
                </Text>
              </View>

              <Pressable
                accessibilityLabel="Закрыть"
                onPress={() => setPanelOpen(false)}
                hitSlop={8}
                style={s.close}
              >
                <Text style={s.closeText}>×</Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.photoStrip}
            >
              <PhotoSlot
                index="01"
                title="ФАСАД"
                hint="ТУТ ФОТО ТОЧКИ · 4:5"
                tone="orange"
              />

              <PhotoSlot
                index="02"
                title="ИНТЕРЬЕР"
                hint="ТУТ ВЕРТИКАЛЬНОЕ ФОТО · 4:5"
                tone="dark"
              />

              <PhotoSlot
                index="03"
                title="БАР"
                hint="ТУТ ВЕРТИКАЛЬНОЕ ФОТО · 4:5"
                tone="aqua"
              />
            </ScrollView>

            <View style={s.infoBlock}>
              <View style={s.infoRow}>
                <Text style={s.infoLabel}>режим работы</Text>
                <Text style={s.infoValue}>
                  {selected.schedule}
                </Text>
              </View>

              <View style={s.infoRow}>
                <Text style={s.infoLabel}>телефон</Text>
                <Text style={s.infoValue}>
                  {selected.phone}
                </Text>
              </View>

              <View style={s.infoRow}>
                <Text style={s.infoLabel}>формат</Text>
                <Text style={s.infoValue}>самовывоз</Text>
              </View>
            </View>

            <Text style={s.commercialNote}>
              Выбери эту точку, собери заказ и забери его без ожидания у кассы.
            </Text>
          </ScrollView>

          <View style={s.sheetFooter}>
            <Pressable
              onPress={onContinue}
              style={s.primary}
            >
              <Text style={s.primaryText}>
                заказать здесь
              </Text>

              <Text style={s.primaryArrow}>→</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View
          pointerEvents="none"
          style={s.hint}
        >
          <Text style={s.hintText}>
            {mode === 'map'
              ? 'выбери точку на карте'
              : 'выбери адрес'}
          </Text>
        </View>
      )}
    </View>
  );
}

function PhotoSlot({
  index,
  title,
  hint,
  tone,
}: {
  index: string;
  title: string;
  hint: string;
  tone: 'orange' | 'dark' | 'aqua';
}) {
  return (
    <View
      style={[
        s.photoSlot,
        tone === 'orange' && s.photoSlotOrange,
        tone === 'dark' && s.photoSlotDark,
        tone === 'aqua' && s.photoSlotAqua,
      ]}
    >
      <View style={s.photoSlotTop}>
        <Text
          style={[
            s.photoSlotIndex,
            tone === 'aqua' && s.photoSlotTextDark,
          ]}
        >
          {index}
        </Text>

        <Text
          style={[
            s.photoSlotRatio,
            tone === 'aqua' && s.photoSlotTextDark,
          ]}
        >
          4:5
        </Text>
      </View>

      <View>
        <Text
          style={[
            s.photoSlotTitle,
            tone === 'aqua' && s.photoSlotTextDark,
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            s.photoSlotHint,
            tone === 'aqua' && s.photoSlotTextDarkMuted,
          ]}
        >
          {hint}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },

  listBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.bg,
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 92,
    paddingBottom: 42,
  },

  listKicker: {
    color: colors.aqua,
    ...typography.eyebrow,
  },

  listTitle: {
    color: colors.text,
    ...typography.titleLarge,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },

  addressList: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },

  listRow: {
    minHeight: 76,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  listRowActive: {
    borderTopColor: colors.red,
  },

  listNo: {
    width: 34,
    color: colors.muted,
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 13,
  },

  listNoActive: {
    color: colors.red,
  },

  listCopy: {
    flex: 1,
    minWidth: 0,
  },

  listAddress: {
    color: colors.text,
    ...typography.bodyStrong,
    fontSize: 14,
  },

  listTime: {
    color: colors.muted,
    ...typography.caption,
    fontSize: 9,
    lineHeight: 12,
    marginTop: 3,
  },

  listArrow: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 22,
  },

  mapLogo: {
    position: 'absolute',
    top: 14,
    left: 16,
    zIndex: 30,
  },

  modeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    minWidth: 104,
    height: 42,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    backgroundColor: 'rgba(7,7,8,0.94)',
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },

  modeButtonText: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 9,
    lineHeight: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  hint: {
    position: 'absolute',
    left: 18,
    bottom: 22,
    backgroundColor: 'rgba(7,7,8,0.84)',
    borderRadius: radii.control,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  hintText: {
    color: colors.muted,
    ...typography.eyebrow,
    letterSpacing: 0.8,
  },

  locationSheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    maxHeight: '74%',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.sheet,
    overflow: 'hidden',
    zIndex: 40,
  },

  sheetScrollContent: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },

  sheetKicker: {
    color: colors.aqua,
    ...typography.eyebrow,
    letterSpacing: 0.75,
  },

  photoStrip: {
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingRight: spacing.md,
  },

  photoSlot: {
    width: 142,
    height: 178,
    borderRadius: radii.control,
    padding: spacing.sm,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  photoSlotOrange: {
    backgroundColor: colors.red,
  },

  photoSlotDark: {
    backgroundColor: colors.panelStrong,
    borderWidth: 1,
    borderColor: colors.line,
  },

  photoSlotAqua: {
    backgroundColor: colors.aqua,
  },

  photoSlotTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  photoSlotIndex: {
    color: colors.white,
    ...typography.eyebrow,
  },

  photoSlotRatio: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 8,
    lineHeight: 10,
    opacity: 0.72,
  },

  photoSlotTitle: {
    color: colors.white,
    fontFamily: fonts.black,
    fontSize: 19,
    lineHeight: 21,
    letterSpacing: -0.6,
  },

  photoSlotHint: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 7.5,
    lineHeight: 10,
    letterSpacing: 0.45,
    marginTop: 4,
    opacity: 0.72,
  },

  photoSlotTextDark: {
    color: colors.black,
  },

  photoSlotTextDarkMuted: {
    color: colors.black,
    opacity: 0.56,
  },

  sheetTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },

  close: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 21,
    lineHeight: 21,
  },

  shopAddress: {
    maxWidth: 360,
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.7,
    marginTop: spacing.xxs,
  },

  infoBlock: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },

  infoRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },

  infoLabel: {
    color: colors.muted,
    ...typography.eyebrow,
    letterSpacing: 0.6,
  },

  infoValue: {
    maxWidth: '60%',
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'right',
  },

  commercialNote: {
    color: colors.muted,
    ...typography.body,
    fontSize: 10.5,
    lineHeight: 15,
    marginTop: spacing.md,
  },

  sheetFooter: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.panel,
  },

  primary: {
    minHeight: 54,
    backgroundColor: colors.red,
    borderRadius: radii.control,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },

  primaryText: {
    color: colors.white,
    ...typography.button,
  },

  primaryArrow: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 22,
  },
});
