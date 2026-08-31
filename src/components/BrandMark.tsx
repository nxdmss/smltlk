import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme';

export default function BrandMark({
  width = 52,
  color = colors.red,
}: {
  width?: number;
  color?: string;
}) {
  const height = width * 0.72;

  return (
    <Svg width={width} height={height} viewBox="0 0 100 72" fill="none">
      <Path
        d="M0 0H44V17.5C44 47.5 29.5 67 0 72V52.6C15.4 51.7 24.4 41.8 25.3 24H0V0Z"
        fill={color}
      />
      <Path
        d="M53 0H97V17.5C97 47.5 82.5 67 53 72V52.6C68.4 51.7 77.4 41.8 78.3 24H53V0Z"
        fill={color}
      />
    </Svg>
  );
}
