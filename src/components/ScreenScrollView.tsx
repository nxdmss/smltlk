import { PropsWithChildren, useEffect, useRef } from 'react';
import { Platform, ScrollView, StyleProp, ViewStyle } from 'react-native';

export default function ScreenScrollView({ children, screenKey, contentContainerStyle }: PropsWithChildren<{ screenKey: string; contentContainerStyle: StyleProp<ViewStyle> }>) {
  const scrollRef = useRef<any>(null);
  useEffect(() => {
    if (Platform.OS === 'web') (document.activeElement as HTMLElement | null)?.blur();
    const timer = setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: false }), 30);
    return () => clearTimeout(timer);
  }, [screenKey]);
  return <ScrollView ref={scrollRef} contentContainerStyle={contentContainerStyle} showsVerticalScrollIndicator={false}>{children}</ScrollView>;
}
