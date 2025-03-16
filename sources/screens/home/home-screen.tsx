import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { IconButton } from '@/components/buttons';
import { ThemedText, FlexView, Screen } from '@/components';
import { SongList } from '@/components/song-list';
import { useStateFetcher } from '@/hooks';
import { useConfigStore } from '@/stores';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';

export const HomeScreen = () => {
  const router = useRouter();
  const palette = usePalette();
  const user = useConfigStore(state => state.user);

  const { data: songs, isLoading } = useStateFetcher({
    defaultValue: [],
    fetcher: async () => await songsProvider.get(),
  });

  if (isLoading) {
    <ActivityIndicator color={palette.primary} />;
  }

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
      <SongList songs={songs} />
    </Screen>
  );
};
