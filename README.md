# Small Talk Coffee — 2GIS build

This is the full Small Talk Coffee Expo project with the brandbook redesign and a real 2GIS map.

## Run

```bash
npm install
npm start
```

Web: press `w` in Expo or open http://localhost:8081.

## 2GIS

The demo MapGL key is stored in `.env` as `EXPO_PUBLIC_2GIS_KEY`.

- Web uses the official `@2gis/mapgl` package.
- iOS/Android in Expo Go use 2GIS MapGL inside `react-native-webview`, so the map visually and geographically matches 2GIS without requiring a paid native Mobile SDK key yet.
- Map zoom, pan, 2GIS controls, traffic control, scale, roads/buildings and 2GIS copyright are provided by MapGL.
- Small Talk branches use branded numbered HTML markers.

For production, restrict/replace the demo key in 2GIS Platform Manager and do not commit `.env` to a public repository.
