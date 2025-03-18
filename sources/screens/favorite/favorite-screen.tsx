import { View, Text, FlatList, Image } from 'react-native';
import { usePalette } from '@/themes';
import { useFavouritesStore } from '@/stores';
import { SongList } from '@/components/song-list';

export const FavoritesScreen = () => {
  const palette = usePalette();
  const { songs: favorites } = useFavouritesStore();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: palette.primary,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        Mes Favoris
      </Text>

      <SongList canPlay songs={favorites} />
    </View>
  );
};
