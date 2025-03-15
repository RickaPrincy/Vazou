import { Theme } from '@/stores';
import { useTheme } from './use-theme';
import { PALETTE_COLORS } from '../palette';

export const usePalette = (theme?: Theme) => {
  const usedTheme = useTheme();
  return PALETTE_COLORS[theme ?? usedTheme];
};
