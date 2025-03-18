import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ImageArtWork } from '../image-artwork';
import { FlexView } from '../flex-view';
import { ThemedText } from '../themed-text';
import { usePalette } from '@/themes';
import { trimText } from '@/utils/trim-text';
import { usePlayer } from '@/stores';
import { IconButton } from '../buttons';
import { Feather } from '@expo/vector-icons';

export const CurrentSongBanner = () => {
  const palette = usePalette();
  const { playing: isPlaying, next, toggle, song: currentSong } = usePlayer();

  if (!currentSong) {
    return null;
  }

  const trimmedtitle = trimText(currentSong.title, 25);

  return (
    <>
      <TouchableOpacity onPress={() => router.push('/play-view')}>
        <FlexView
          style={{
            gap: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
            justifyContent: 'space-between',
            marginTop: 10,
            alignItems: 'flex-start',
            backgroundColor: palette.primary,
          }}
        >
          <FlexView
            style={{
              gap: 10,
              alignItems: 'flex-start',
              marginTop: 5,
              flex: 1,
              justifyContent: 'flex-start',
            }}
          >
            <ImageArtWork
              style={{ backgroundColor: 'white' }}
              uri={currentSong.uri}
              size={30}
            />
            <View>
              <ThemedText
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  marginBottom: 5,
                  color: 'white',
                }}
              >
                {trimmedtitle}
              </ThemedText>
              <ThemedText
                style={{ fontSize: 10, marginBottom: 5, color: 'white' }}
              >
                Artist: {trimText(currentSong.artist, 20)}
              </ThemedText>
            </View>
          </FlexView>
          <FlexView style={{ height: '100%', gap: 10 }}>
            <IconButton onPress={toggle}>
              <Feather
                color={'white'}
                size={25}
                name={isPlaying ? 'pause' : 'play'}
              />
            </IconButton>
            <IconButton onPress={next}>
              <Feather color={'white'} size={25} name="skip-forward" />
            </IconButton>
          </FlexView>
        </FlexView>
      </TouchableOpacity>
    </>
  );
};
