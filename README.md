# Small Talk Coffee

React Native + Expo application for Small Talk Coffee pickup orders.

## Run

```bash
npm install
npx expo start
```

## Environment

Create `.env` from `.env.example`:

```env
EXPO_PUBLIC_2GIS_KEY=...
EXPO_PUBLIC_2GIS_STYLE_ID=
```

`EXPO_PUBLIC_2GIS_STYLE_ID` is optional. Add a style ID from the 2GIS Style Editor when the final dark map style is ready.

## Structure

- `App.tsx` — application state and screen flow
- `src/data` — locations, menu, product image mapping
- `src/components` — reusable UI
- `src/screens` — application screens
- `src/theme.ts` — colors, typography, spacing, radii and layout tokens

## Typecheck

```bash
npm run typecheck
```
