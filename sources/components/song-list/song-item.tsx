import { FC } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText } from '../themed-text';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { PlayList, Song, usePlayer } from '@/stores';
import { ImageArtWork } from '../image-artwork';
import { usePalette } from '@/themes';
import { trimText } from '@/utils/trim-text';
import { NOOP_FN } from '@/utils/noop-fn';

const PLAY_LIST_ITEM_STYLE: ViewStyle = {
  height: 70,
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
  trimTitleValue?: number;
  trimArtistValue?: number;
  onPress?: (song: Song) => void;
  redirectToPreviewOnClick?: boolean;
}> = ({
  song,
  playlist,
  onPress,
  style,
  redirectToPreviewOnClick,
  trimTitleValue = 25,
  trimArtistValue = 13,
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
    if (isCurrentSong) {
      toggle();
      return;
    }

    if (playlist) {
      if (!isCurrentPlayList) {
        setCurrent({ playlist, song });
      } else {
        setPlayingSong(song);
      }
    } else {
      setCurrent({ song, playlist: null });
    }

    if (isCurrentPlayList) {
      if (redirectToPreviewOnClick) {
        router.push('/play-view');
      }
    }
    return;
  };

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress(song) : handlePlayPauseButton())}
      delayLongPress={100}
      onLongPress={() => onLongPress(song)}
    >
      <FlexView
        style={[PLAY_LIST_ITEM_STYLE, { backgroundColor: palette.card }, style]}
      >
        <FlexView style={{ justifyContent: 'flex-start', gap: 20 }}>
          <ImageArtWork size={40} uri={song.artwork} />
          <View>
            <ThemedText
              style={{
                maxWidth: 210,
                color: isCurrentSong ? palette.primary : palette.secondary,
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              {trimText(song.title, trimTitleValue)}
            </ThemedText>
            <ThemedText
              style={{
                maxWidth: 210,
                color: isCurrentSong ? palette.primary : palette.secondary,
                fontSize: 14,
              }}
            >
              Artist: {trimText(song.artist ?? '', trimArtistValue)}
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
