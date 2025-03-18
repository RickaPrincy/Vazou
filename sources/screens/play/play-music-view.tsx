import { View, Text } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

import { Header } from '@/components/header';
import { IconButton } from '@/components/buttons';
import { FlexView, ImageArtWork, Screen } from '@/components';
import { usePalette } from '@/themes';
import { Song, usePlayer } from '@/stores';
import { trimText } from '@/utils/trim-text';
import { useFavouritesStore } from '@/stores';

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

  const { isFavourite: isInFavourites, toggle: toggleFavorite } =
    useFavouritesStore();
  const isFavorite = isInFavourites(currentSong!);
  return (
    <Screen>
      <Header title="Vazou Music" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageArtWork
          style={{ borderRadius: 0 }}
          uri={currentSong?.artwork}
          size={300}
        />
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
      <FlexView style={{ gap: 20, marginBottom: 10, marginTop: 20 }}>
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
            name="play-skip-forward"
            size={30}
            color={palette.secondary}
          />
        </IconButton>
        <IconButton onPress={toggleRandom}>
          <Ionicons
            name="shuffle"
            size={30}
            color={random ? palette.primary : palette.secondary}
          />
        </IconButton>
        <IconButton onPress={() => toggleFavorite(currentSong!)}>
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            size={30}
            color={isFavorite ? 'red' : palette.secondary}
          />
        </IconButton>
      </FlexView>
    </Screen>
  );
};
