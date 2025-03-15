import { FC } from 'react';
import { View, FlatList } from 'react-native';

import { PlayListItem } from './playlist-item';
import { Song } from '@/providers';
import { CurrentSongBanner } from '../player';

export type PlaylistProps = {
  songs: Song[];
};

export const Playlist: FC<PlaylistProps> = ({ songs }) => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={songs}
        keyExtractor={song => song.id}
        renderItem={({ item: song }) => (
          <PlayListItem key={song.id} song={song} />
        )}
      />
      <CurrentSongBanner />
    </View>
  );
};
