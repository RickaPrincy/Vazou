import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import { FlexView, Screen, ThemedText } from '@/components';
import { Header } from '@/components/header';
import { SongList } from '@/components/song-list';
import { IconButton } from '@/components/buttons';
import { Song, usePlayListStore } from '@/stores';
import { useStateFetcher } from '@/hooks';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';

export const AddSongScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const getPlayList = usePlayListStore(state => state.getPlayList)!;
  const addSongsToPlayList = usePlayListStore(
    state => state.addSongsToPlayList
  );
  const palette = usePalette();
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const playlist = getPlayList(id);
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
      <SongList
        playlist={playlist}
        songs={filteredSongs}
        selecteds={selectedSongs}
        onToggleSelected={toggleSong}
        onLongPress={toggleSong}
      />
      {selectedSongs.length && (
        <View
          style={{
            backgroundColor: palette.card,
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <ThemedText style={{ fontSize: 18, marginBottom: 10 }}>
            {selectedSongs.length} Songs Selectioned
          </ThemedText>
          <FlexView
            style={{ marginBottom: 10, justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              onPress={() => {
                addSongsToPlayList(playlist.id, selectedSongs);
                router.back();
              }}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 15,
                backgroundColor: palette.primary,
              }}
            >
              <ThemedText style={{ fontSize: 20, textAlign: 'center' }}>
                Save
              </ThemedText>
            </TouchableOpacity>
            <IconButton onPress={() => setSelectedSongs([])}>
              <MaterialIcons
                name="clear"
                style={{ fontSize: 24, color: palette.secondary }}
              />
            </IconButton>
          </FlexView>
        </View>
      )}
    </Screen>
  );
};
