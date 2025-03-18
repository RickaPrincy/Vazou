import { View } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Header } from '@/components/header';
import { SongList } from '@/components/song-list';
import { PlayList, Song, useFavoritesStore, usePlayer } from '@/stores';
import { FlexView, ThemedText } from '@/components';
import { Button, IconButton } from '@/components/buttons';
import { usePalette } from '@/themes';
import { useState } from 'react';

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
    toggle,
    random,
    playing: currentPlaying,
    playlist: currentPlayList,
  } = usePlayer();
  const { songs: favorites, toggleAll } = useFavoritesStore();
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const favoritePlayList = asFavoritesPlaylist(favorites);
  const isCurrentFavouritePlaylist =
    currentPlayList?.id === FAVORITES_PLAYLIST_ID;
  const isPlayingFavorites = currentPlaying && isCurrentFavouritePlaylist;

  const toggleSong = (candidate: Song) => {
    setSelectedSongs(prev =>
      prev.some(song => song.id === candidate.id)
        ? prev.filter(song => song.id !== candidate.id)
        : [...prev, candidate]
    );
  };

  const handlePlayPauseClick = () => {
    if (favoritePlayList.songs.length < 1) {
      return;
    }

    if (isCurrentFavouritePlaylist) {
      toggle();
      return;
    }

    setPlayList(favoritePlayList);
  };

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
          <IconButton onPress={handlePlayPauseClick}>
            <AntDesign
              size={40}
              name={isPlayingFavorites ? 'pausecircle' : 'play'}
              color={
                isCurrentFavouritePlaylist ? palette.primary : palette.secondary
              }
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
      {selectedSongs.length > 0 && (
        <View
          style={{
            backgroundColor: palette.card,
            borderRadius: 30,
            padding: 10,
            marginTop: 20,
          }}
        >
          <FlexView style={{ justifyContent: 'space-between' }}>
            <Button
              onPress={() => {
                toggleAll(selectedSongs);
                setSelectedSongs([]);
              }}
              style={{ backgroundColor: 'red' }}
              icon={<AntDesign color="white" size={20} name="delete" />}
            >
              <ThemedText
                style={{ fontSize: 12, color: 'white', textAlign: 'center' }}
              >
                Delete from favorites
              </ThemedText>
            </Button>
            <IconButton onPress={() => setSelectedSongs([])}>
              <MaterialIcons
                name="clear"
                style={{ fontSize: 24, color: palette.secondary }}
              />
            </IconButton>
          </FlexView>
        </View>
      )}
      <SongList
        canPlay
        songs={favorites}
        playlist={favoritePlayList}
        selecteds={selectedSongs}
        onLongPress={toggleSong}
        onToggleSelected={toggleSong}
        onPress={
          selectedSongs.length > 0 ? song => toggleSong(song) : undefined
        }
      />
    </View>
  );
};
