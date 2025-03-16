import { FC } from 'react';
import { View, FlatList } from 'react-native';

import { Song } from '@/stores';
import { SongItem } from './song-item';
import { CurrentSongBanner } from '../player';

export type SongListProps = {
  songs: Song[];
};

export const SongList: FC<SongListProps> = ({ songs }) => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={songs}
        keyExtractor={song => song.id}
        renderItem={({ item: song }) => <SongItem key={song.id} song={song} />}
      />
      <CurrentSongBanner />
    </View>
  );
};
