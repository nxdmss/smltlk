import { load } from '@2gis/mapgl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

const TWO_GIS_KEY = process.env.EXPO_PUBLIC_2GIS_KEY || '04bd0482-7668-4ae6-85c5-4895905a9e27';

type MarkerEntry = { marker: any; element: HTMLElement; id: string };

function setMarkerState(element: HTMLElement, active: boolean) {
  element.style.width = active ? '48px' : '40px';
  element.style.height = active ? '48px' : '40px';
  element.style.borderRadius = active ? '16px' : '13px';
  element.style.background = active ? colors.red : colors.black;
  element.style.border = `2px solid ${active ? colors.white : colors.line}`;
  element.style.boxShadow = active ? '0 10px 30px rgba(214,70,52,.45)' : '0 8px 18px rgba(0,0,0,.35)';
  element.style.transform = active ? 'translateY(-4px)' : 'translateY(0)';
}

function createPin(index: number, active: boolean) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Small Talk ${index + 1}`);
  button.textContent = String(index + 1);
  button.style.padding = '0';
  button.style.margin = '0';
  button.style.cursor = 'pointer';
  button.style.color = colors.white;
  button.style.fontFamily = 'IBM Plex Mono, monospace';
  button.style.fontWeight = '800';
  button.style.fontSize = '13px';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.transition = '160ms ease';
  button.style.outline = 'none';
  setMarkerState(button, active);
  return button;
}

export default function CoffeeMap({ shops, selectedId, onSelect }: { shops: CoffeeShop[]; selectedId: string; onSelect: (shop: CoffeeShop) => void; }) {
  const mapRef = useRef<any>(null);
  const markerRefs = useRef<MarkerEntry[]>([]);
  const [error, setError] = useState('');
  const containerId = useRef(`small-talk-2gis-${Math.random().toString(36).slice(2)}`);

  const center = useMemo<[number, number]>(() => {
    const longitude = shops.reduce((sum, shop) => sum + shop.coordinate.longitude, 0) / shops.length;
    const latitude = shops.reduce((sum, shop) => sum + shop.coordinate.latitude, 0) / shops.length;
    return [longitude, latitude];
  }, [shops]);

  useEffect(() => {
    let cancelled = false;
    if (!TWO_GIS_KEY) {
      setError('Не найден ключ 2ГИС');
      return;
    }

    load('https://mapgl.2gis.com/api/js/v1').then((mapglAPI) => {
      if (cancelled) return;
      const map = new mapglAPI.Map(containerId.current, {
        key: TWO_GIS_KEY,
        center,
        zoom: 14,
        zoomControl: 'bottomRight',
        scaleControl: true,
        trafficControl: 'topRight',
        copyright: 'bottomLeft',
      });
      map.setControlsLayoutPadding({ top: 12, right: 12, bottom: 12, left: 12 });
      mapRef.current = map;
      markerRefs.current = shops.map((shop, index) => {
        const element = createPin(index, shop.id === selectedId);
        element.addEventListener('click', (event) => {
          event.stopPropagation();
          onSelect(shop);
        });
        const marker = new mapglAPI.HtmlMarker(map, {
          coordinates: [shop.coordinate.longitude, shop.coordinate.latitude],
          html: element,
          anchor: [24, 48],
          interactive: true,
          zIndex: shop.id === selectedId ? 20 : 10,
        });
        return { marker, element, id: shop.id };
      });
    }).catch((reason) => {
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
  }, [center, onSelect, selectedId, shops]);

  useEffect(() => {
    const selectedShop = shops.find((shop) => shop.id === selectedId);
    markerRefs.current.forEach(({ element, id, marker }) => {
      const active = id === selectedId;
      setMarkerState(element, active);
      marker.setZIndex?.(active ? 20 : 10);
    });
    if (selectedShop && mapRef.current) {
      mapRef.current.setCenter([selectedShop.coordinate.longitude, selectedShop.coordinate.latitude], { duration: 280 });
    }
  }, [selectedId, shops]);

  return (
    <View style={styles.mapWrap}>
      <View nativeID={containerId.current} style={StyleSheet.absoluteFill} />
      {error ? <View style={styles.error}><Text style={styles.errorTitle}>2ГИС</Text><Text style={styles.errorText}>{error}</Text></View> : null}
      <View pointerEvents="none" style={styles.badge}><Text style={styles.badgeText}>2ГИС · LIVE MAP</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrap: { flex: 1, overflow: 'hidden', backgroundColor: '#EAE7E0' },
  badge: { position: 'absolute', left: 12, top: 12, backgroundColor: colors.black, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 8 },
  badgeText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1 },
  error: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#F0ECE5', alignItems: 'center', justifyContent: 'center', padding: 28 },
  errorTitle: { color: colors.red, fontSize: 28, fontWeight: '900' },
  errorText: { color: colors.black, fontSize: 12, textAlign: 'center', marginTop: 8 },
});
