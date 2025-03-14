import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Playlist } from '@/components/playlist';
import { useFetcher } from '@/hooks';
import { useSongsStore } from '@/stores';
import { songsProvider } from '@/providers';

export const HomeScreen = () => {
  const songs = useSongsStore(state => state.songs);
  const setSongs = useSongsStore(state => state.setSongs);

  useFetcher({
    setter: setSongs,
    fetcher: async () => await songsProvider.get(),
  });

  return (
    <View style={styles.container}>
      <Playlist songs={songs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
