import { FC } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { Feather } from '@expo/vector-icons';
import { IconButton } from '../buttons';
import { usePalette, useReversePalette } from '@/themes';
import { PlayList, Song, usePlayer } from '@/stores';
import { trimFilename } from '@/utils/trim-filename';
import { NOOP_FN } from '@/utils/noop-fn';

const PLAY_LIST_ITEM_STYLE: ViewStyle = {
  height: 80,
  paddingHorizontal: 20,
  paddingVertical: 15,
  marginVertical: 5,
  borderRadius: 15,
  justifyContent: 'space-between',
};

export const SongItem: FC<{
  canPlay?: boolean;
  onPress?: () => void;
  song: Song;
  playlist?: PlayList;
  style?: ViewStyle;
}> = ({ song, playlist, style, onPress = NOOP_FN, canPlay = true }) => {
  const palette = usePalette();
  const reversePalette = useReversePalette();
  const {
    playlist: currentPlayList,
    setSong: setPlayingSong,
    playing: isPlaying,
    song: currentSong,
    setCurrent,
    toggle,
  } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;
  const isCurrentPlayList = currentPlayList?.id === playlist?.id;

  const handlePlayPauseButton = () => {
    if (!isCurrentSong) {
      if (isCurrentPlayList || !playlist) {
        setPlayingSong(song);
      } else {
        setCurrent({ playlist, song });
      }
      return;
    }

    toggle();
  };

  return (
    <Pressable onPress={onPress}>
      <FlexView
        style={[PLAY_LIST_ITEM_STYLE, { backgroundColor: palette.card }, style]}
      >
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
              {trimFilename(song.filename, 22)}
            </ThemedText>
          </View>
        </FlexView>
        {canPlay && (
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
        )}
      </FlexView>
    </Pressable>
  );
};
