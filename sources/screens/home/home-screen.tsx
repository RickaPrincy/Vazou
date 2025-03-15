import React from 'react';
import { Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Playlist } from '@/components/playlist';
import { IconButton } from '@/components/buttons';
import { ThemedText, FlexView, Screen } from '@/components';
import { useFetcher } from '@/hooks';
import { useConfigStore, useSongsStore } from '@/stores';
import { songsProvider } from '@/providers';
import { useRouter } from 'expo-router';
import { usePalette } from '@/themes';

export const HomeScreen = () => {
  const user = useConfigStore(state => state.user);
  const songs = useSongsStore(state => state.songs);
  const router = useRouter();
  const setSongs = useSongsStore(state => state.setSongs);
  const palette = usePalette();

  useFetcher({
    setter: setSongs,
    fetcher: async () => await songsProvider.get(),
  });

  return (
    <Screen>
      <FlexView
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}
      >
        <FlexView style={{ gap: 10 }}>
          <Image
            source={user.avatarUri}
            alt={user.firstName}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
            }}
          />
          <View>
            <ThemedText
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: palette.secondary,
              }}
            >
              {user.firstName}
            </ThemedText>
            <ThemedText style={{ fontSize: 16, color: palette.secondary }}>
              {user.lastName}
            </ThemedText>
          </View>
        </FlexView>
        <IconButton onPress={() => router.push('/settings')}>
          <Feather
            name="settings"
            style={{ fontSize: 24, color: palette.secondary }}
          />
        </IconButton>
      </FlexView>
      <Playlist songs={songs} />
    </Screen>
  );
};
