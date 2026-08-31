import { PropsWithChildren, useEffect, useRef } from 'react';
import { Platform, ScrollView, StyleProp, ViewStyle } from 'react-native';

export default function ScreenScrollView({
  children,
  screenKey,
  contentContainerStyle,
}: PropsWithChildren<{ screenKey: string; contentContainerStyle: StyleProp<ViewStyle> }>) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS === 'web') (document.activeElement as HTMLElement | null)?.blur();
    const reset = () => scrollRef.current?.scrollTo({ y: 0, animated: false });
    const frame = requestAnimationFrame(reset);
    const timer = setTimeout(reset, 120);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [screenKey]);

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
