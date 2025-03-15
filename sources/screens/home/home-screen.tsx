import React from 'react';
import { Button, useWindowDimensions } from 'react-native';

import { Playlist } from '@/components/playlist';
import { Screen } from '@/components';
import { useFetcher } from '@/hooks';
import { useConfigStore, useSongsStore } from '@/stores';
import { songsProvider } from '@/providers';

export const HomeScreen = () => {
  const toggleTheme = useConfigStore(state => state.toggleTheme);
  const songs = useSongsStore(state => state.songs);
  const setSongs = useSongsStore(state => state.setSongs);
  const { width, height } = useWindowDimensions();

  useFetcher({
    setter: setSongs,
    fetcher: async () => await songsProvider.get(),
  });

  return (
    <Screen style={{ width, height: height }}>
      <Button title="ToggleTheme" onPress={() => toggleTheme()} />
      <Playlist songs={songs} />
    </Screen>
  );
};
