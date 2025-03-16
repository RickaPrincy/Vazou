import { FC } from 'react';
import { ViewStyle } from 'react-native';

import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { Feather } from '@expo/vector-icons';
import { IconButton } from '../buttons';
import { usePalette } from '@/themes';
import { Song, usePlayer } from '@/stores';

const PLAY_LIST_ITEM_STYLE: ViewStyle = {
  borderBottomWidth: 1,
  paddingHorizontal: 20,
  paddingVertical: 15,
  justifyContent: 'space-between',
};

export const PlayListItem: FC<{ song: Song; style?: ViewStyle }> = ({
  song,
}) => {
  const palette = usePalette();
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
    <FlexView
      style={[PLAY_LIST_ITEM_STYLE, { borderBottomColor: palette.border }]}
    >
      <FlexView style={{ justifyContent: 'flex-start', gap: 20 }}>
        <Feather
          name="music"
          color={palette.primary}
          style={{ fontSize: 24 }}
        />
        <ThemedText
          style={{
            maxWidth: 210,
            color: isCurrentSong ? palette.primary : palette.secondary,
          }}
        >
          {song.filename}
        </ThemedText>
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
