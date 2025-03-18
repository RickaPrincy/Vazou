import { FC } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { PlayList, Song, usePlayer } from '@/stores';
import { usePalette } from '@/themes';
import { trimFilename } from '@/utils/trim-filename';
import { NOOP_FN } from '@/utils/noop-fn';
import { ImageArtWork } from '../image-artwork';

const PLAY_LIST_ITEM_STYLE: ViewStyle = {
  height: 80,
  paddingHorizontal: 20,
  paddingVertical: 15,
  marginVertical: 5,
  borderRadius: 15,
  justifyContent: 'space-between',
};

export const SongItem: FC<{
  song: Song;
  onLongPress?: (song: Song) => void;
  playlist?: PlayList;
  canPlay?: boolean;
  style?: ViewStyle;
  onPress?: (song: Song) => void;
}> = ({
  song,
  playlist,
  onPress = NOOP_FN,
  style,
  onLongPress = NOOP_FN,
  canPlay = true,
}) => {
  const palette = usePalette();
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
    <TouchableOpacity
      onPress={() => onPress(song)}
      delayLongPress={100}
      onLongPress={() => onLongPress(song)}
    >
      <FlexView
        style={[PLAY_LIST_ITEM_STYLE, { backgroundColor: palette.card }, style]}
      >
        <FlexView style={{ justifyContent: 'flex-start', gap: 20 }}>
          <ImageArtWork uri={song.artwork} />
          <View>
            <ThemedText
              style={{
                maxWidth: 210,
                color: isCurrentSong ? palette.primary : palette.secondary,
              }}
            >
              {trimFilename(song.filename, 22)}
            </ThemedText>
            <ThemedText
              style={{
                maxWidth: 210,
                color: isCurrentSong ? palette.primary : palette.secondary,
                fontSize: 14,
              }}
            >
              Artist: {trimFilename(song.artist ?? '', 18)}
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
                name="play"
                style={{
                  fontSize: 24,
                  color: isCurrentSong ? palette.primary : palette.secondary,
                }}
              />
            )}
          </IconButton>
        )}
      </FlexView>
    </TouchableOpacity>
  );
};
