import { FC } from 'react';
import { View, ViewStyle } from 'react-native';

import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { Feather } from '@expo/vector-icons';
import { IconButton } from '../buttons';
import { usePalette, useReversePalette } from '@/themes';
import { Song, usePlayer } from '@/stores';
import { trimFilename } from '@/utils/trim-filename';

const PLAY_LIST_ITEM_STYLE: ViewStyle = {
  height: 80,
  paddingHorizontal: 20,
  paddingVertical: 15,
  marginLeft: 5,
  marginRight: 5,
  marginVertical: 5,
  borderRadius: 15,
  justifyContent: 'space-between',
};

export const SongItem: FC<{ song: Song; style?: ViewStyle }> = ({ song }) => {
  const palette = usePalette();
  const reversePalette = useReversePalette();
  const {
    setSong: setPlayingSong,
    playing: isPlaying,
    song: currentSong,
    toggle,
  } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlayPauseButton = () => {
    if (!isCurrentSong) {
      setPlayingSong(song);
      return;
    }

    toggle();
  };

  return (
    <FlexView style={[PLAY_LIST_ITEM_STYLE, { backgroundColor: palette.card }]}>
      <FlexView style={{ justifyContent: 'flex-start', gap: 20 }}>
        <FlexView
          style={{
            borderRadius: 8,
            padding: 10,
            backgroundColor: reversePalette.background,
          }}
        >
          <Feather
            name="music"
            color={palette.primary}
            style={{ fontSize: 24 }}
          />
        </FlexView>
        <View>
          <ThemedText
            style={{
              maxWidth: 210,
              color: isCurrentSong ? palette.primary : palette.secondary,
            }}
          >
            {trimFilename(song.filename)}
          </ThemedText>
        </View>
      </FlexView>
      <IconButton onPress={handlePlayPauseButton}>
        {isCurrentSong && isPlaying ? (
          <Feather
            name="pause"
            style={{ fontSize: 24, color: palette.primary }}
          />
        ) : (
          <Feather
            style={{
              fontSize: 24,
              color: isCurrentSong ? palette.primary : palette.secondary,
            }}
            name="play"
          />
        )}
      </IconButton>
    </FlexView>
  );
};
