import { FC } from 'react';
import { View, FlatList } from 'react-native';

import { PlayListItem } from './playlist-item';
import { Song } from '@/providers';
import { createStyle } from '@/utils/styles';

export type PlaylistProps = {
  songs: Song[];
};

export const Playlist: FC<PlaylistProps> = ({ songs }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={song => song.id}
        renderItem={({ item: song }) => (
          <PlayListItem key={song.id} song={song} />
        )}
      />
    </View>
  );
};

const styles = createStyle({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});
