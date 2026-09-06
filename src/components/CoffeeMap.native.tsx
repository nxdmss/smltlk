import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import type { CoffeeShop } from '../data/locations';
import { colors, fonts } from '../theme';

const MAP_KEY = process.env.EXPO_PUBLIC_2GIS_KEY;
const MAP_STYLE_ID = process.env.EXPO_PUBLIC_2GIS_STYLE_ID;

function buildHtml(shops: CoffeeShop[]) {
  const points = shops.map((shop, index) => ({
    id: shop.id,
    index: index + 1,
    longitude: shop.coordinate.longitude,
    latitude: shop.coordinate.latitude,
  }));

  const center = {
    longitude:
      shops.reduce((sum, shop) => sum + shop.coordinate.longitude, 0) /
      shops.length,
    latitude:
      shops.reduce((sum, shop) => sum + shop.coordinate.latitude, 0) /
      shops.length,
  };

  const styleOption = MAP_STYLE_ID
    ? `style: ${JSON.stringify(MAP_STYLE_ID)},`
    : '';

  const fallbackFilter = MAP_STYLE_ID
    ? ''
    : '#map canvas{filter:brightness(.28) saturate(.38) contrast(1.12) hue-rotate(2deg)}';

  return `<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
<style>
html,body,#map{width:100%;height:100%;margin:0;padding:0;overflow:hidden;background:#070708}
*{box-sizing:border-box}
${fallbackFilter}
.st-pin{
  width:42px;height:42px;border-radius:4px;border:0;
  background:#FA4713;color:#fff;display:flex;align-items:center;justify-content:center;
  font:700 10px sans-serif;box-shadow:none;transition:160ms ease;padding:0
}
.st-pin.active{
  width:48px;height:48px;background:#6BCBDD;color:#070708;
  box-shadow:none;transform:translateY(-3px)
}
</style>
</head>
<body>
<div id="map"></div>
<script src="https://mapgl.2gis.com/api/js/v1"></script>
<script>
const points = ${JSON.stringify(points)};
const map = new mapgl.Map('map', {
  key: ${JSON.stringify(MAP_KEY || '')},
  center: [${center.longitude}, ${center.latitude}],
  styleZoom: 14.4,
  ${styleOption}
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
    terrainEnabled: false
  }
});

map.setControlsLayoutPadding({
  top:82,
  right:8,
  bottom:8,
  left:8
});

const markers = {};

points.forEach((point) => {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'st-pin';
  el.textContent = String(point.index).padStart(2, '0');

  el.addEventListener('click', (event) => {
    event.stopPropagation();
    window.ReactNativeWebView.postMessage(point.id);
  });

  const marker = new mapgl.HtmlMarker(map, {
    coordinates: [point.longitude, point.latitude],
    html: el,
    anchor: [24,48],
    interactive: true
  });

  markers[point.id] = { marker, el, point };
});

window.selectShop = function(id) {
  Object.keys(markers).forEach((key) => {
    const active = key === id;
    markers[key].el.classList.toggle('active', active);
    markers[key].marker.setZIndex && markers[key].marker.setZIndex(active ? 20 : 10);
  });

  const entry = markers[id];
  if (entry) {
    map.setCenter(
      [entry.point.longitude, entry.point.latitude],
      { duration: 280 }
    );
  }
};
</script>
</body>
</html>`;
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
  const webRef = useRef<any>(null);
  const html = useMemo(() => buildHtml(shops), [shops]);

  const syncSelected = () => {
    webRef.current?.injectJavaScript(
      `window.selectShop && window.selectShop(${JSON.stringify(selectedId)}); true;`,
    );
  };

  useEffect(syncSelected, [selectedId]);

  if (!MAP_KEY) {
    return (
      <View style={s.error}>
        <Text style={s.errorTitle}>2ГИС</Text>
        <Text style={s.errorText}>Не найден EXPO_PUBLIC_2GIS_KEY</Text>
      </View>
    );
  }

  return (
    <View style={s.wrap}>
      <WebView
        ref={webRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={syncSelected}
        onMessage={(event: any) => {
          const shop = shops.find((item) => item.id === event.nativeEvent.data);
          if (shop) onSelect(shop);
        }}
        style={s.webview}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#070708',
  },
  webview: {
    flex: 1,
    backgroundColor: '#070708',
  },
  error: {
    flex: 1,
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
