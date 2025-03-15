import { Theme } from '@/stores';
import { useTheme } from './use-theme';
import { PALETTE_COLORS } from '@/constants/palette';

export const usePalette = (theme?: Theme) => {
  const usedTheme = useTheme();
  return PALETTE_COLORS[theme ?? usedTheme];
};
