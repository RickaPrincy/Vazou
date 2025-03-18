import { View, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ImageArtWork } from '../image-artwork';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { ThemedText } from '../themed-text';
import { usePalette } from '@/themes';
import { trimText } from '@/utils/trim-text';
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

  const trimmedtitle = trimText(currentSong.title, 25);

  return (
    <>
      <TouchableOpacity onPress={() => router.push('/play-view')}>
        <View
          style={{
            height: 100,
            marginTop: 10,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 5,
            backgroundColor: palette.card,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ImageArtWork uri={currentSong.artwork} />
          <FlexView
            style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
          >
            <ThemedText
              style={{ textAlign: 'center', fontSize: 14, marginBottom: 5 }}
            >
              {trimmedtitle}
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
