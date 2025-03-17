import { Theme, useConfigStore } from '@/stores';
import { useTheme } from './use-theme';
import { PALETTE_COLORS } from '../palette';

export const usePalette = (theme?: Theme) => {
  const usedTheme = useTheme();
  const mainColor = useConfigStore(state => state.mainColor);
  const palette = PALETTE_COLORS[theme ?? usedTheme];
  return { ...palette, primary: mainColor ?? palette.primary };
};
