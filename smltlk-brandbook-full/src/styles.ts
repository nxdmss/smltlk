import { StyleSheet } from 'react-native';
import { colors } from './theme';
export const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.paper },
  safeArea: { flex: 1, backgroundColor: colors.paper },
  appShell: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', backgroundColor: colors.paper, overflow: 'hidden' },
});
