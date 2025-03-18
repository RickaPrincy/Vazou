import { FC } from 'react';
import { View, FlatList, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { PlayList, Song } from '@/stores';
import { SongItem } from './song-item';
import { CurrentSongBanner } from '../player';
import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { usePalette } from '@/themes';

export type SongListProps = {
  showSelectedOnEmpty?: boolean;
  canPlay?: boolean;
  songs: Song[];
  playlist?: PlayList;
  selecteds?: Song[];
  songItemStyle?: ViewStyle;
  onLongPress?: (song: Song) => void;
  onToggleSelected?: (song: Song) => void;
  onPress?: (song: Song) => void;
  redirectToPreviewOnClick?: boolean;
};

export const SongList: FC<SongListProps> = ({
  songs,
  canPlay,
  playlist,
  selecteds,
  songItemStyle = {},
  showSelectedOnEmpty = false,
  redirectToPreviewOnClick = false,
  onLongPress,
  onToggleSelected,
  onPress,
}) => {
  const palette = usePalette();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={songs}
        keyExtractor={song => song.id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <MaterialIcons name="music-off" size={40} color="#888" />
            <ThemedText
              style={{ textAlign: 'center', marginTop: 10, fontSize: 16 }}
            >
              Your playlist is empty
            </ThemedText>
          </View>
        )}
        renderItem={({ item: song }) => {
          if (
            ((selecteds?.length ?? 0) < 1 && !showSelectedOnEmpty) ||
            !onToggleSelected
          ) {
            return (
              <SongItem
                song={song}
                key={song.id}
                canPlay={canPlay}
                playlist={playlist}
                onPress={onPress}
                onLongPress={onLongPress}
                redirectToPreviewOnClick={redirectToPreviewOnClick}
              />
            );
          }

          const isSelected = selecteds?.some(el => el.id === song.id);
          return (
            <FlexView style={{ justifyContent: 'space-between' }}>
              <IconButton onPress={() => onToggleSelected(song)}>
                <MaterialIcons
                  style={{ color: palette.text, fontSize: 24 }}
                  name={isSelected ? 'check-box' : 'check-box-outline-blank'}
                />
              </IconButton>
              <SongItem
                song={song}
                key={song.id}
                onPress={onPress}
                canPlay={canPlay}
                playlist={playlist}
                trimArtistValue={13}
                trimTitleValue={20}
                style={{ width: 280, ...songItemStyle }}
                onLongPress={onLongPress}
                redirectToPreviewOnClick={redirectToPreviewOnClick}
              />
            </FlexView>
          );
        }}
      />
      <CurrentSongBanner />
    </View>
  );
};
