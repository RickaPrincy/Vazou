import { View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { ThemedText } from '../themed-text';
import { usePalette } from '@/themes';
import { trimFilename } from '@/utils/trim-filename';
import { usePlayer } from '@/stores';

export const CurrentSongBanner = () => {
  const palette = usePalette();
  const {
    playing: isPlaying,
    next,
    stop,
    prev,
    toggle,
    song: currentSong,
  } = usePlayer();

  if (!currentSong) {
    return null;
  }

  const trimedFilename = trimFilename(currentSong.filename, 40);

  return (
    <View
      style={{
        marginTop: 10,
        height: 90,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: palette.card,
      }}
    >
      <FlexView>
        <ThemedText
          style={{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          {trimedFilename}
        </ThemedText>
      </FlexView>
      <FlexView style={{ gap: 25, backgroundColor: palette.card }}>
        <IconButton onPress={prev}>
          <Feather
            style={{ fontSize: 25, color: palette.secondary }}
            name="skip-back"
          />
        </IconButton>
        <IconButton onPress={toggle}>
          {isPlaying ? (
            <Feather
              name="pause"
              style={{ fontSize: 25, color: palette.secondary }}
            />
          ) : (
            <Feather
              style={{ fontSize: 25, color: palette.secondary }}
              name="play"
            />
          )}
        </IconButton>
        <IconButton onPress={next}>
          <Feather
            style={{ fontSize: 25, color: palette.secondary }}
            name="skip-forward"
          />
        </IconButton>
        <IconButton onPress={stop}>
          <Ionicons
            name="stop-outline"
            style={{ fontSize: 25, color: palette.secondary }}
          />
        </IconButton>
      </FlexView>
    </View>
  );
};
