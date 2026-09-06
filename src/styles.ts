import { StyleSheet } from 'react-native';

import { colors, layout } from './theme';

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  appShell: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
});
