import { PALETTE_COLORS } from '@/constants/palette';
import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof PALETTE_COLORS.light &
    keyof typeof PALETTE_COLORS.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return PALETTE_COLORS[theme][colorName];
  }
}
