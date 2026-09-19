export const colors = {
  bg: '#FFFFFF',
  panel: '#F7F7F5',
  panelSoft: '#F3F3F0',
  panelStrong: '#EBECE8',
  line: '#DDDFDA',

  text: '#0B0C0D',
  muted: '#70747A',

  red: '#FA4713',
  redDeep: '#CB3508',
  aqua: '#6BCBDD',

  white: '#FFFFFF',
  black: '#000000',
  paper: '#F4F1EC',
  paperSoft: '#EAE6DF',

  overlay: 'rgba(0,0,0,0.42)',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radii = {
  sharp: 2,
  control: 4,
  sheet: 10,
  round: 999,
} as const;

export const layout = {
  maxWidth: 520,
  screenPadding: 18,
  headerHeight: 58,
  buttonHeight: 56,
  bottomBarHeight: 92,
} as const;

export const fonts = {
  regular: 'GolosText_400Regular',
  medium: 'GolosText_500Medium',
  semibold: 'GolosText_600SemiBold',
  bold: 'GolosText_700Bold',
  black: 'GolosText_900Black',
} as const;

export const typography = {
  eyebrow: {
    fontFamily: fonts.bold,
    fontSize: 8,
    lineHeight: 10,
    letterSpacing: 1.05,
    textTransform: 'uppercase' as const,
  },

  caption: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 14,
  },

  body: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },

  bodyStrong: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 17,
  },

  titleSmall: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.35,
  },

  titleMedium: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: -1.05,
  },

  titleLarge: {
    fontFamily: fonts.black,
    fontSize: 42,
    lineHeight: 42,
    letterSpacing: -2,
  },

  button: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
  },
} as const;

export const productSurfaces = {
  classic: '#E9E1D8',
  cold: '#D8EEF2',
  sweet: '#F6D8CF',
  'not-coffee': '#F1EEE9',
  seasonal: '#F3E2DB',
} as const;
