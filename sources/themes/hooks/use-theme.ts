import { useColorScheme } from 'react-native';
import { useConfigStore } from '@/stores';

export const useTheme = () => {
  const nativeTheme = useColorScheme();
  const preferedTheme = useConfigStore(state => state.theme);

  return preferedTheme ?? nativeTheme ?? 'dark';
};
