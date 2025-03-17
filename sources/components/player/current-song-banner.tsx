import { View, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { ThemedText } from '../themed-text';
import { usePalette } from '@/themes';
import { trimFilename } from '@/utils/trim-filename';
import { usePlayer } from '@/stores';
import { router } from 'expo-router';

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

  const trimmedFilename = trimFilename(currentSong.filename, 40);

  return (
    <>
      <TouchableOpacity onPress={() => router.push('/play-view')}>
        <View
          style={{
            marginTop: 10,
            height: 100,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: palette.card,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {currentSong.albumCoverUri ? (
            <Image
              source={{ uri: currentSong.albumCoverUri }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                marginRight: 10,
              }}
            />
          ) : (
            <FlexView
              style={{
                borderRadius: 8,
                padding: 10,
                backgroundColor: palette.background,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 60,
              }}
            >
              <Feather
                name="music"
                color={palette.primary}
                style={{ fontSize: 24 }}
              />
            </FlexView>
          )}
          <FlexView
            style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
          >
            <ThemedText
              style={{ textAlign: 'center', fontSize: 14, marginBottom: 5 }}
            >
              {trimmedFilename}
            </ThemedText>

            <FlexView style={{ flexDirection: 'row', gap: 15 }}>
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
          </FlexView>
        </View>
      </TouchableOpacity>
    </>
  );
};
