import { View, Text } from 'react-native';
import { usePalette } from '@/themes';

export const FavoritesScreen = () => {
  const palette = usePalette();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 20, color: palette.primary }}>Mes Favoris</Text>
    </View>
  );
};
