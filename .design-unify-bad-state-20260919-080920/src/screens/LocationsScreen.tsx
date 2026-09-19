import {
  useState,
  useRef,
  } from 'react'; import {   Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  const sheetPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.dy > 8 &&
        Math.abs(gesture.dy) > Math.abs(gesture.dx),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 46 || gesture.vy > 0.7) {
          closePanel();
        }
      },
    }),
  ).current;

  const selectedIndex =
    coffeeShops.findIndex(
      (shop) => shop.id === selected.id,
    ) + 1;

  const chooseShop = (shop: CoffeeShop) => {
    setHasPickedLocation(true);
    onSelect(shop);
    setPanelOpen(mode === 'map');
  };

  const closePanel = () => {
    setPanelOpen(false);
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
            onMapPress={closePanel}
          />
        </View>
      ) : (
        <View style={s.listBackground}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              s.listContent,
              {
                paddingTop: insets.top + 74,
                paddingBottom: insets.bottom + 34,
              },
            ]}
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
                    <View key={shop.id}>
                    <Pressable
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
                      {active ? (
                        <View style={s.listDetail}>
                          <View style={s.listDetailTop}>
                            <View>
                              <Text style={s.listDetailKicker}>
                                ТОЧКА ВЫБРАНА
                              </Text>

                              <Text style={s.listDetailTitle}>
                                забрать отсюда
                              </Text>
                            </View>

                            <View style={s.listDetailCode}>
                              <Text style={s.listDetailCodeText}>
                                ST-{twoDigits(index + 1)}
                              </Text>
                            </View>
                          </View>

                          <View style={s.listDetailMeta}>
                            <View style={s.listDetailMetaCell}>
                              <Text style={s.listDetailMetaLabel}>
                                режим
                              </Text>
                              <Text
                                numberOfLines={1}
                                style={s.listDetailMetaValue}
                              >
                                {shop.schedule}
                              </Text>
                            </View>

                            <View style={s.listDetailDivider} />

                            <View style={s.listDetailMetaCell}>
                              <Text style={s.listDetailMetaLabel}>
                                формат
                              </Text>
                              <Text style={s.listDetailMetaValue}>
                                самовывоз
                              </Text>
                            </View>
                          </View>

                          <Pressable
                            onPress={onContinue}
                            style={s.listDetailAction}
                          >
                            <Text style={s.listDetailActionText}>
                              заказать здесь
                            </Text>

                            <View style={s.listDetailActionArrow}>
                              <Text style={s.listDetailActionArrowText}>
                                →
                              </Text>
                            </View>
                          </Pressable>
                        </View>
                      ) : null}
                    </View>
                  );
                },
              )}
            </View>
          </ScrollView>
        </View>
      )}

      <View
        pointerEvents="none"
        style={[
          s.mapLogo,
          { top: insets.top + 14 },
        ]}
      >
        <BrandMark width={48} />
      </View>

      <Pressable
        accessibilityLabel={mode === 'map' ? 'Открыть список точек' : 'Открыть карту'}
        onPress={toggleMode}
        style={[
          s.modeButton,
          { top: insets.top + 16 },
        ]}
      >
        <Text style={s.modeButtonText}>
          {mode === 'map' ? 'список' : 'карта'}
        </Text>
      </Pressable>

      {panelOpen ? (
        <View
          style={[
            s.locationSheet,
            { bottom: insets.bottom + 12 },
          ]}
        >
          <View
            {...sheetPanResponder.panHandlers}
            style={s.dragZone}
          >
            <View style={s.dragHandle} />
          </View>
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
          style={[
            s.hint,
            { bottom: insets.bottom + 18 },
          ]}
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
    margin: 0,
    padding: 0,

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
    ...typography.caption,
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
    borderColor: 'rgba(11,12,13,0.12)',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,

  },

  modeButtonText: {
    color: colors.text,
    ...typography.button,
textTransform: 'uppercase',
  },

  hint: {
    position: 'absolute',
    left: 18,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderWidth: 1,
    borderColor: 'rgba(11,12,13,0.10)',
    borderRadius: radii.control,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,

  },

  hintText: {
    color: colors.muted,
    ...typography.body,
  },

  locationSheet: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    maxHeight: '74%',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.sheet,
    overflow: 'hidden',
    zIndex: 40,

  },

  sheetScrollContent: {
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,

  },

  sheetKicker: {
    color: colors.aqua,
    ...typography.eyebrow,
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
    ...typography.caption,
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
    minHeight: 34,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.control,
    backgroundColor: colors.bg,
    flexShrink: 0,

  },

  closeText: {
    color: colors.text,
    ...typography.body,
textTransform: 'uppercase',
  },

  shopAddress: {
    maxWidth: 360,
    color: colors.text,
    ...typography.caption,
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
    ...typography.body,
  },

  infoValue: {
    maxWidth: '60%',
    color: colors.text,
    ...typography.control,
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

  dragZone: {
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,

  },


  dragHandle: {
    width: 46,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(11,12,13,0.20)',

  },


  hintHidden: {
    display: 'none',

  },


  listDetail: {
    marginBottom: spacing.sm,
    backgroundColor: colors.aqua,
    borderRadius: radii.control,
    padding: spacing.md,
    overflow: 'hidden',

  },

  listDetailTop: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,

  },

  listDetailKicker: {
    color: colors.black,
    ...typography.eyebrow,
opacity: 0.62,
  },

  listDetailTitle: {
    color: colors.black,
    fontFamily: fonts.black,
    fontSize: 24,
    lineHeight: 27,
    letterSpacing: -0.8,
    marginTop: 4,

  },

  listDetailCode: {
    minWidth: 58,
    height: 30,
    paddingHorizontal: 8,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sharp,

  },

  listDetailCodeText: {
    color: colors.white,
    ...typography.eyebrow,
  },

  listDetailMeta: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.18)',
    marginTop: spacing.sm,

  },

  listDetailMetaCell: {
    flex: 1,
    minWidth: 0,
    paddingTop: 10,
    paddingRight: 10,

  },

  listDetailDivider: {
    width: 1,
    backgroundColor: colors.lineOnColor,
    marginTop: 10,
    marginRight: 10,

  },

  listDetailMetaLabel: {
    color: colors.black,
    ...typography.body,
textTransform: 'uppercase',
    opacity: 0.52,
  },

  listDetailMetaValue: {
    color: colors.black,
    ...typography.control,
marginTop: 4,
  },

  listDetailAction: {
    minHeight: 54,
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    borderRadius: radii.sharp,
    overflow: 'hidden',

  },

  listDetailActionText: {
    flex: 1,
    color: colors.white,
    ...typography.button,
paddingHorizontal: 14,
  },

  listDetailActionArrow: {
    width: 54,
    alignSelf: 'stretch',
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',

  },

  listDetailActionArrowText: {
    color: colors.white,
    ...typography.body,
  },

});
