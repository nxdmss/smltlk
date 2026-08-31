import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import type { CoffeeShop } from '../data/locations';
import { colors } from '../theme';

const TWO_GIS_KEY = process.env.EXPO_PUBLIC_2GIS_KEY || '04bd0482-7668-4ae6-85c5-4895905a9e27';

function buildHtml(shops: CoffeeShop[]) {
  const points = shops.map((shop, index) => ({ id: shop.id, index: index + 1, longitude: shop.coordinate.longitude, latitude: shop.coordinate.latitude }));
  const center = {
    longitude: shops.reduce((sum, shop) => sum + shop.coordinate.longitude, 0) / shops.length,
    latitude: shops.reduce((sum, shop) => sum + shop.coordinate.latitude, 0) / shops.length,
  };

  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" /><style>
  html,body,#map{width:100%;height:100%;margin:0;padding:0;overflow:hidden;background:#eeeae3}
  *{box-sizing:border-box}.st-pin{width:40px;height:40px;border-radius:13px;border:2px solid #2A2E36;background:#0A0B0D;color:#F7F3EE;display:flex;align-items:center;justify-content:center;font:800 13px monospace;box-shadow:0 8px 18px rgba(0,0,0,.35);transition:160ms ease}
  .st-pin.active{width:48px;height:48px;border-radius:16px;border-color:#F7F3EE;background:#D64634;box-shadow:0 10px 30px rgba(214,70,52,.45);transform:translateY(-4px)}
  </style></head><body><div id="map"></div><script src="https://mapgl.2gis.com/api/js/v1"></script><script>
  const points = ${JSON.stringify(points)};
  const map = new mapgl.Map('map', { key: ${JSON.stringify(TWO_GIS_KEY)}, center: [${center.longitude}, ${center.latitude}], zoom: 14, zoomControl: 'bottomRight', scaleControl: true, trafficControl: 'topRight', copyright: 'bottomLeft' });
  map.setControlsLayoutPadding({top:12,right:12,bottom:12,left:12});
  const markers = {};
  points.forEach((point) => { const el = document.createElement('button'); el.type='button'; el.className='st-pin'; el.textContent=String(point.index); el.addEventListener('click',(event)=>{event.stopPropagation(); window.ReactNativeWebView.postMessage(point.id);}); const marker = new mapgl.HtmlMarker(map, { coordinates:[point.longitude, point.latitude], html: el, anchor:[24,48], interactive:true }); markers[point.id] = { marker, el, point }; });
  window.selectShop = function(id) { Object.keys(markers).forEach((key) => { markers[key].el.classList.toggle('active', key === id); }); const entry = markers[id]; if (entry) map.setCenter([entry.point.longitude, entry.point.latitude]); };
  </script></body></html>`;
}

export default function CoffeeMap({ shops, selectedId, onSelect }: { shops: CoffeeShop[]; selectedId: string; onSelect: (shop: CoffeeShop) => void; }) {
  const webRef = useRef<any>(null);
  const html = useMemo(() => buildHtml(shops), [shops]);

  const syncSelected = () => {
    webRef.current?.injectJavaScript(`window.selectShop && window.selectShop(${JSON.stringify(selectedId)}); true;`);
  };

  useEffect(syncSelected, [selectedId]);

  if (!TWO_GIS_KEY) {
    return <View style={styles.error}><Text style={styles.errorTitle}>2ГИС</Text><Text style={styles.errorText}>Не найден ключ 2ГИС</Text></View>;
  }

  return (
    <View style={styles.wrap}>
      <WebView ref={webRef} originWhitelist={['*']} source={{ html }} javaScriptEnabled domStorageEnabled onLoadEnd={syncSelected} onMessage={(event: any) => {
        const shop = shops.find((item) => item.id === event.nativeEvent.data);
        if (shop) onSelect(shop);
      }} style={styles.webview} />
      <View pointerEvents="none" style={styles.badge}><Text style={styles.badgeText}>2ГИС · LIVE MAP</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, overflow: 'hidden', backgroundColor: '#EAE7E0' },
  webview: { flex: 1, backgroundColor: '#EAE7E0' },
  badge: { position: 'absolute', left: 12, top: 12, backgroundColor: colors.black, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 8 },
  badgeText: { color: colors.white, fontFamily: 'IBMPlexMono_700Bold', fontSize: 8, letterSpacing: 1 },
  error: { flex: 1, backgroundColor: '#F0ECE5', alignItems: 'center', justifyContent: 'center', padding: 28 },
  errorTitle: { color: colors.red, fontSize: 28, fontWeight: '900' },
  errorText: { color: colors.black, fontSize: 12, textAlign: 'center', marginTop: 8 },
});
