import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { FlexView, Screen, ThemedText } from '@/components';
import { SongList } from '@/components/song-list';
import { Header } from '@/components/header';
import { Button, IconButton } from '@/components/buttons';
import { usePlayer, usePlayListStore, Song } from '@/stores';
import { usePalette } from '@/themes';

export const PlayListShowScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const palette = usePalette();

  const {
    playing: isPlaying,
    toggle,
    setPlayList,
    playlist: currentPlayList,
    random,
    toggleRandom,
  } = usePlayer();

  const { getPlayList, deleteSongsToPlayList } = usePlayListStore();

  const playlist = getPlayList(id);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);

  const isCurrentPlayList = playlist.id === currentPlayList?.id;
  const isPlayingAsCurrentPlaylist = isPlaying && isCurrentPlayList;
  const isEmptyPlayList = playlist.songs.length === 0;

  const handlePlayPauseClick = () => {
    if (isEmptyPlayList) return;

    if (isPlayingAsCurrentPlaylist) {
      toggle();
    } else {
      setPlayList(playlist);
    }
  };

  const toggleSong = (song: Song) => {
    setSelectedSongs(prev =>
      prev.some(s => s.id === song.id)
        ? prev.filter(s => s.id !== song.id)
        : [...prev, song]
    );
  };

  return (
    <Screen>
      <Header title={playlist?.name} />
      <FlexView style={{ marginBottom: 30, justifyContent: 'space-between' }}>
        <Button
          onPress={() => router.push(`/playlist/${playlist.id}/add-song`)}
          icon={<Feather name="plus" style={{ color: 'white' }} size={20} />}
        >
          Add Music
        </Button>
        <FlexView style={{ gap: 20 }}>
          <IconButton onPress={handlePlayPauseClick}>
            <AntDesign
              name={isPlayingAsCurrentPlaylist ? 'pausecircle' : 'play'}
              style={{
                color: isCurrentPlayList ? palette.primary : palette.text,
              }}
              size={35}
            />
          </IconButton>
          <IconButton onPress={toggleRandom}>
            <Ionicons
              name="shuffle"
              style={{ color: random ? palette.primary : palette.text }}
              size={35}
            />
          </IconButton>
        </FlexView>
      </FlexView>

      {selectedSongs.length > 0 && (
        <FlexView
          style={{
            backgroundColor: palette.card,
            borderRadius: 30,
            padding: 10,
            marginBottom: 20,
            justifyContent: 'space-between',
          }}
        >
          <Button
            onPress={() => {
              deleteSongsToPlayList(playlist, selectedSongs);
              setSelectedSongs([]);
            }}
            style={{ backgroundColor: 'red' }}
            icon={<AntDesign color="white" size={20} name="delete" />}
          >
            <ThemedText
              style={{ fontSize: 12, color: 'white', textAlign: 'center' }}
            >
              Delete selected
            </ThemedText>
          </Button>
          <IconButton onPress={() => setSelectedSongs([])}>
            <MaterialIcons name="clear" size={24} color={palette.secondary} />
          </IconButton>
        </FlexView>
      )}

      <SongList
        canPlay
        playlist={playlist}
        songs={playlist.songs}
        selecteds={selectedSongs}
        onLongPress={toggleSong}
        onToggleSelected={toggleSong}
        onPress={
          selectedSongs.length > 0 ? song => toggleSong(song) : undefined
        }
      />
    </Screen>
  );
};
