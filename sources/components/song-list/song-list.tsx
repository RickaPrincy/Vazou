import { FC } from 'react';
import { View, FlatList } from 'react-native';

import { PlayList, Song } from '@/stores';
import { SongItem } from './song-item';
import { CurrentSongBanner } from '../player';
import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { usePalette } from '@/themes';

export type SongListProps = {
  songs: Song[];
  playlist?: PlayList;
  toggleSelected?: (id: Song) => void;
  selecteds?: Song[];
};

export const SongList: FC<SongListProps> = ({
  selecteds,
  toggleSelected,
  songs,
  playlist,
}) => {
  const palette = usePalette();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={song => song.id}
        ListEmptyComponent={() => (
          <ThemedText
            style={{ textAlign: 'center', marginTop: 30, fontSize: 15 }}
          >
            No Music Yet
          </ThemedText>
        )}
        renderItem={({ item: song }) => {
          if (!selecteds || !toggleSelected) {
            return <SongItem playlist={playlist} key={song.id} song={song} />;
          }

          const selected = selecteds?.find(el => el.id === song.id);

          return (
            <FlexView style={{ justifyContent: 'space-between' }}>
              <IconButton onPress={() => toggleSelected(song)}>
                <MaterialIcons
                  style={{ color: palette.text, fontSize: 24 }}
                  name={selected ? 'check-box' : 'check-box-outline-blank'}
                />
              </IconButton>
              <SongItem
                canPlay={false}
                style={{ width: 280 }}
                playlist={playlist}
                key={song.id}
                song={song}
              />
            </FlexView>
          );
        }}
      />
      <CurrentSongBanner />
    </View>
  );
};
