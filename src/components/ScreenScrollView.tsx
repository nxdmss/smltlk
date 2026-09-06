import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import {
  Platform,
  ScrollView,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export default function ScreenScrollView({
  children,
  screenKey,
  contentContainerStyle,
}: PropsWithChildren<{
  screenKey: string;
  contentContainerStyle: StyleProp<ViewStyle>;
}>) {
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      (document.activeElement as HTMLElement | null)?.blur();
    }

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }, 30);

    return () => clearTimeout(timer);
  }, [screenKey]);

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}
