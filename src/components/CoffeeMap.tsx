import { load } from '@2gis/mapgl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { CoffeeShop } from '../data/locations';
import { colors, fonts } from '../theme';
import { twoDigits } from '../utils';

const MAP_KEY = process.env.EXPO_PUBLIC_2GIS_KEY;
const MAP_STYLE_ID = process.env.EXPO_PUBLIC_2GIS_STYLE_ID;

type MarkerEntry = {
  marker: any;
  element: HTMLElement;
  id: string;
};

function setMarkerState(element: HTMLElement, active: boolean) {
  element.style.width = active ? '48px' : '42px';
  element.style.height = active ? '48px' : '42px';
  element.style.borderRadius = '4px';
  element.style.background = active ? colors.aqua : colors.red;
  element.style.border = '0';
  element.style.boxShadow = 'none';
  element.style.color = active ? '#070708' : colors.white;
  element.style.transform = active ? 'translateY(-3px)' : 'translateY(0)';
}

function createPin(index: number, active: boolean) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Small Talk ${index + 1}`);
  button.textContent = twoDigits(index + 1);
  button.style.padding = '0';
  button.style.margin = '0';
  button.style.cursor = 'pointer';
  button.style.fontFamily = fonts.bold;
  button.style.fontWeight = '700';
  button.style.fontSize = '10px';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.transition = '160ms ease';
  button.style.outline = 'none';
  setMarkerState(button, active);
  return button;
}

function applyDarkFallback(containerId: string) {
  if (MAP_STYLE_ID) return;
  const root = document.getElementById(containerId);
  root?.querySelectorAll('canvas').forEach((canvas) => {
    canvas.style.filter =
      'brightness(.28) saturate(.38) contrast(1.12) hue-rotate(2deg)';
  });
}

export default function CoffeeMap({
  shops,
  selectedId,
  onSelect,
}: {
  shops: CoffeeShop[];
  selectedId: string;
  onSelect: (shop: CoffeeShop) => void;
}) {
  const mapRef = useRef<any>(null);
  const markerRefs = useRef<MarkerEntry[]>([]);
  const onSelectRef = useRef(onSelect);
  const [error, setError] = useState('');

  const containerId = useRef(
    `small-talk-2gis-${Math.random().toString(36).slice(2)}`,
  );

  const center = useMemo<[number, number]>(() => {
    const longitude =
      shops.reduce((sum, shop) => sum + shop.coordinate.longitude, 0) /
      shops.length;
    const latitude =
      shops.reduce((sum, shop) => sum + shop.coordinate.latitude, 0) /
      shops.length;
    return [longitude, latitude];
  }, [shops]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let cancelled = false;

    if (!MAP_KEY) {
      setError('Не найден EXPO_PUBLIC_2GIS_KEY');
      return;
    }

    load('https://mapgl.2gis.com/api/js/v1')
      .then((mapglAPI) => {
        if (cancelled) return;

        const map = new mapglAPI.Map(containerId.current, {
          key: MAP_KEY,
          center,
          styleZoom: 14.4,
          ...(MAP_STYLE_ID ? { style: MAP_STYLE_ID } : {}),
          zoomControl: false,
          trafficControl: false,
          floorControl: false,
          scaleControl: false,
          copyright: 'bottomRight',
          defaultBackgroundColor: '#070708',
          graphicsPreset: 'light',
          styleState: {
            trafficOn: false,
            parkingOn: false,
            immersiveRoadsOn: false,
            terrainEnabled: false,
          },
        } as any);

        map.setControlsLayoutPadding({
          top: 82,
          right: 8,
          bottom: 8,
          left: 8,
        });

        if (!MAP_STYLE_ID) {
          const apply = () => applyDarkFallback(containerId.current);
          setTimeout(apply, 100);
          setTimeout(apply, 450);
          setTimeout(apply, 1100);
          map.on?.('styleload', apply);
        }

        mapRef.current = map;

        markerRefs.current = shops.map((shop, index) => {
          const element = createPin(index, shop.id === selectedId);
          element.addEventListener('click', (event) => {
            event.stopPropagation();
            onSelectRef.current(shop);
          });

          const marker = new mapglAPI.HtmlMarker(map, {
            coordinates: [
              shop.coordinate.longitude,
              shop.coordinate.latitude,
            ],
            html: element,
            anchor: [24, 48],
            interactive: true,
            zIndex: shop.id === selectedId ? 20 : 10,
          });

          return { marker, element, id: shop.id };
        });
      })
      .catch((reason) => {
        console.error('2GIS MapGL init error', reason);
        setError('Карта 2ГИС не загрузилась. Проверь интернет и API-ключ.');
      });

    return () => {
      cancelled = true;
      markerRefs.current.forEach(({ marker }) => marker.destroy());
      markerRefs.current = [];
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, [center, shops]);

  useEffect(() => {
    const selectedShop = shops.find((shop) => shop.id === selectedId);

    markerRefs.current.forEach(({ element, id, marker }) => {
      const active = id === selectedId;
      setMarkerState(element, active);
      marker.setZIndex?.(active ? 20 : 10);
    });

    if (selectedShop && mapRef.current) {
      mapRef.current.setCenter(
        [
          selectedShop.coordinate.longitude,
          selectedShop.coordinate.latitude,
        ],
        { duration: 280 },
      );
    }
  }, [selectedId, shops]);

  return (
    <View style={s.mapWrap}>
      <View nativeID={containerId.current} style={StyleSheet.absoluteFill} />

      {error ? (
        <View style={s.error}>
          <Text style={s.errorTitle}>2ГИС</Text>
          <Text style={s.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  mapWrap: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#070708',
  },
  error: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#070708',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  errorTitle: {
    color: colors.red,
    fontFamily: fonts.black,
    fontSize: 28,
    lineHeight: 32,
  },
  errorText: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 8,
  },
});
