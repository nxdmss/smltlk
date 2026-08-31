import { Text, View } from 'react-native';
import { colors } from '../theme';

export default function BrandMark({ size = 46, inverted = false }: { size?: number; inverted?: boolean }) {
  const outer = inverted ? colors.white : colors.red;
  const bubble = inverted ? colors.red : colors.white;
  const quote = inverted ? colors.white : colors.red;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: outer,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.57,
          height: size * 0.37,
          borderRadius: size * 0.09,
          backgroundColor: bubble,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: quote,
            fontWeight: '900',
            fontSize: size * 0.29,
            lineHeight: size * 0.35,
            letterSpacing: size * -0.065,
          }}
        >
          ’’
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          borderTopWidth: size * 0.13,
          borderLeftWidth: size * 0.11,
          borderTopColor: bubble,
          borderLeftColor: 'transparent',
          bottom: '18%',
          right: '21%',
          transform: [{ rotate: '-8deg' }],
        }}
      />
    </View>
  );
}
