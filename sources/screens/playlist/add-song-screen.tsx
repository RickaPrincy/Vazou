import { View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { FlexView, Screen, ThemedText } from '@/components';
import { Header } from '@/components/header';
import { SongList } from '@/components/song-list';
import { Song, usePlayListStore } from '@/stores';
import { Button, IconButton } from '@/components/buttons';
import { useStateFetcher } from '@/hooks';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';

export const AddSongScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const getPlayList = usePlayListStore(state => state.getPlayList)!;
  const playlist = getPlayList(id);
  const addSongsToPlayList = usePlayListStore(
    state => state.addSongsToPlayList
  );
  const palette = usePalette();
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const { data: songs } = useStateFetcher({
    defaultValue: [],
    fetcher: () => songsProvider.get(),
  });

  const toggleSong = (candidate: Song) => {
    setSelectedSongs(prev =>
      prev.some(song => song.id === candidate.id)
        ? prev.filter(song => song.id !== candidate.id)
        : [...prev, candidate]
    );
  };

  const filteredSongs = songs.filter(
    song => !playlist.songs.some(pl => pl.id === song.id)
  );

  return (
    <Screen>
      <Header title={`Add Song's to ${playlist.name}`} />
      {selectedSongs.length > 0 && (
        <View
          style={{
            backgroundColor: palette.card,
            borderRadius: 30,
            padding: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <FlexView style={{ justifyContent: 'space-between' }}>
            <Button
              onPress={() => {
                addSongsToPlayList(playlist.id, selectedSongs);
                router.replace('/library');
              }}
              style={{
                backgroundColor: palette.primary,
                paddingHorizontal: 20,
              }}
              icon={<AntDesign color="white" size={20} name="save" />}
            >
              <ThemedText
                style={{ fontSize: 14, color: 'white', textAlign: 'center' }}
              >
                Save
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
        showSelectedOnEmpty
        canPlay={false}
        playlist={playlist}
        songs={filteredSongs}
        onPress={toggleSong}
        selecteds={selectedSongs}
        onToggleSelected={toggleSong}
        onLongPress={toggleSong}
      />
    </Screen>
  );
};
