import { useTheme } from './use-theme';
import { usePalette } from './use-palette';

export const useReversePalette = () => {
  const theme = useTheme();
  const palette = usePalette(theme === 'dark' ? 'light' : 'dark');

  return palette;
};
