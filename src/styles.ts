import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.bg },
  safeArea: { flex: 1, backgroundColor: colors.bg },
  appShell: {
    flex: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
});
