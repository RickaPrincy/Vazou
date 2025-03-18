import { View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/header';
import { SongList } from '@/components/song-list';
import { PlayList, Song, useFavoritesStore, usePlayer } from '@/stores';
import { FlexView } from '@/components';
import { IconButton } from '@/components/buttons';
import { usePalette } from '@/themes';

export const FAVORITES_PLAYLIST_ID = 'FAVORITES-PLAYLIST-ID';
const asFavoritesPlaylist = (songs: Song[]): PlayList => {
  return {
    name: 'Favorites',
    id: FAVORITES_PLAYLIST_ID,
    songs,
  };
};
export const FavoritesScreen = () => {
  const palette = usePalette();
  const {
    setPlayList,
    toggleRandom,
    playing: currentPlaying,
    random,
    playlist: currentPlayList,
  } = usePlayer();
  const { songs: favorites } = useFavoritesStore();
  const isPlayingFavorites =
    currentPlaying && currentPlayList?.id === FAVORITES_PLAYLIST_ID;
  const favoritePlayList = asFavoritesPlaylist(favorites);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background,
        padding: 20,
      }}
    >
      <Header title="Favorites" />
      <FlexView
        style={{
          marginVertical: 10,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}
      >
        <AntDesign color={palette.primary} name="hearto" size={25} />
        <FlexView style={{ gap: 15 }}>
          <IconButton onPress={() => setPlayList(favoritePlayList)}>
            <AntDesign
              color={palette.primary}
              name={isPlayingFavorites ? 'pausecircle' : 'play'}
              size={40}
            />
          </IconButton>
          <IconButton onPress={toggleRandom}>
            <Ionicons
              color={random ? palette.primary : palette.secondary}
              name="shuffle"
              size={40}
            />
          </IconButton>
        </FlexView>
      </FlexView>
      <SongList canPlay songs={favorites} playlist={favoritePlayList} />
    </View>
  );
};
