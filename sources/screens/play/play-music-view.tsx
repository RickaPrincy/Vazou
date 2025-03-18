import { View, Text } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';

import { Header } from '@/components/header';
import { IconButton } from '@/components/buttons';
import { FlexView, ImageArtWork, Screen, ThemedText } from '@/components';
import { Song, usePlayer } from '@/stores';
import { usePalette } from '@/themes';
import { trimText } from '@/utils/trim-text';
import { useFavoritesStore } from '@/stores';
import { formatDuration } from '@/utils/format-duration';
import debounce from 'debounce';

export const PlayMusicViewScreen = () => {
  const palette = usePalette();
  const {
    toggle,
    playing: isPlaying,
    next,
    prev,
    song: currentSong = {} as Song,
    random,
    toggleRandom,
  } = usePlayer();
  const progress = useProgress();
  const { isFavourite: isInFavorites, toggle: toggleFavorite } =
    useFavoritesStore();
  const isFavorite = isInFavorites(currentSong!);

  const seekTo = debounce((value: number) => {
    if (currentSong) {
      TrackPlayer.seekTo(value);
    }
  }, 50);

  return (
    <Screen>
      <Header title="Vazou Music" />
      <View style={{ flex: 1, marginTop: 50, alignItems: 'center' }}>
        <ImageArtWork
          style={{ borderRadius: 100 }}
          imageStyle={{ borderRadius: 100 }}
          uri={currentSong?.artwork}
          size={200}
        />
        <FlexView style={{ gap: 50, marginTop: 20 }}>
          <IconButton onPress={() => toggleFavorite(currentSong!)}>
            <AntDesign
              name={isFavorite ? 'heart' : 'hearto'}
              size={30}
              color={isFavorite ? palette.primary : palette.secondary}
            />
          </IconButton>
          <IconButton>
            <AntDesign size={30} name={'link'} color={palette.secondary} />
          </IconButton>
        </FlexView>
        <FlexView
          style={{
            marginTop: 20,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              fontWeight: 'bold',
              color: palette.text,
            }}
          >
            {trimText(currentSong?.title ?? '', 40)}
          </Text>
          <Text style={{ fontSize: 18, color: palette.secondary }}>
            {currentSong?.artist || 'Artiste inconnu'}
          </Text>
        </FlexView>
      </View>
      <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
        <FlexView
          style={{
            marginBottom: 10,
            justifyContent: 'space-between',
          }}
        >
          <ThemedText style={{ color: palette.secondary }}>
            {formatDuration(progress.position ?? 0)}
          </ThemedText>
          <ThemedText style={{ color: palette.secondary }}>
            {formatDuration(currentSong?.duration ?? 0)}
          </ThemedText>
        </FlexView>
        <Slider
          value={progress.position}
          minimumValue={0}
          maximumValue={currentSong?.duration ?? 0}
          style={{ flex: 1, height: 40 }}
          thumbTintColor={palette.primary}
          onSlidingComplete={seekTo}
          minimumTrackTintColor={palette.primary}
          maximumTrackTintColor={palette.secondary}
        />
      </View>
      <FlexView
        style={{
          gap: 20,
          width: '100%',
          marginHorizontal: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton>
          <Ionicons name="repeat" size={30} color={palette.secondary} />
        </IconButton>
        <IconButton onPress={prev}>
          <Ionicons name="play-skip-back" size={30} color={palette.secondary} />
        </IconButton>
        <IconButton
          onPress={toggle}
          style={{
            padding: 15,
            backgroundColor: isPlaying ? palette.primary : palette.secondary,
            borderRadius: 50,
          }}
        >
          {isPlaying ? (
            <Feather size={30} name={'pause'} color="white" />
          ) : (
            <Ionicons size={30} name={'play'} color="white" />
          )}
        </IconButton>
        <IconButton onPress={next}>
          <Ionicons
            size={30}
            name="play-skip-forward"
            color={palette.secondary}
          />
        </IconButton>
        <IconButton onPress={toggleRandom}>
          <Ionicons
            size={30}
            name="shuffle"
            color={random ? palette.primary : palette.secondary}
          />
        </IconButton>
      </FlexView>
    </Screen>
  );
};
