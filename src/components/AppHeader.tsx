import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, spacing, typography } from '../theme';
import BrandMark from './BrandMark';

export default function AppHeader({
  title,
  onBack,
  compact = false,
}: {
  title?: string;
  onBack?: () => void;
  compact?: boolean;
}) {
  return (
    <View style={[s.header, compact && s.headerCompact]}>
      <View style={s.side}>
        <BrandMark width={compact ? 42 : 48} />

        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Назад"
            onPress={onBack}
            hitSlop={8}
            style={s.back}
          >
            <Text style={s.backText}>←</Text>
          </Pressable>
        ) : null}
      </View>

      {title ? (
        <Text numberOfLines={1} style={s.title}>
          {title}
        </Text>
      ) : (
        <View style={s.center} />
      )}

      <View style={s.side} />
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    minHeight: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  headerCompact: {
    minHeight: 48,
    marginBottom: spacing.xs,
  },

  side: {
    width: 92,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  center: {
    flex: 1,
  },

  back: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: colors.text,
    fontFamily: typography.titleSmall.fontFamily,
    fontSize: 22,
    lineHeight: 24,
  },

  title: {
    flex: 1,
    color: colors.text,
    ...typography.titleSmall,
    textAlign: 'center',
  },
});
