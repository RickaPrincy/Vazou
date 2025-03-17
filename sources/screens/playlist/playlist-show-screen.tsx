import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import { FlexView, Screen, ThemedText } from '@/components';
import { SongList } from '@/components/song-list';
import { Header } from '@/components/header';
import { IconButton } from '@/components/buttons';
import { usePlayListStore } from '@/stores';
import { usePalette, useReversePalette } from '@/themes';

export const PlayListShowScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const getPlayList = usePlayListStore(state => state.getPlayList);
  const reversedPalette = useReversePalette();
  const palette = usePalette();
  const playlist = getPlayList(id);

  return (
    <Screen>
      <Header title={playlist?.name} />
      <View
        style={{
          padding: 20,
          marginTop: 20,
          backgroundColor: palette.card,
          borderRadius: 15,
        }}
      >
        <ThemedText style={{ fontSize: 14, color: palette.secondary }}>
          {playlist?.name}
        </ThemedText>
        <ThemedText style={{ marginTop: 10, fontSize: 14, color: 'gray' }}>
          Number of Songs
        </ThemedText>
        <ThemedText style={{ fontSize: 16, color: palette.secondary }}>
          {playlist?.songs.length}
        </ThemedText>
      </View>
      <FlexView style={{ marginVertical: 20, justifyContent: 'space-between' }}>
        <ThemedText style={{ fontWeight: 'bold', fontSize: 20 }}>
          Playlist's song
        </ThemedText>
        <IconButton
          onPress={() => router.push(`/playlist/${playlist.id}/add-song`)}
          style={{
            backgroundColor: reversedPalette.background,
            borderRadius: 8,
            padding: 10,
          }}
        >
          <Feather
            name="plus"
            style={{ fontSize: 20, color: palette.primary }}
          />
        </IconButton>
      </FlexView>
      <SongList canPlay={true} playlist={playlist} songs={playlist.songs} />
    </Screen>
  );
};
