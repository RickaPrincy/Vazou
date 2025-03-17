import { Stack } from 'expo-router';
import { View } from 'react-native';
import TrackPlayer, { Capability } from "react-native-track-player"

import {
  MediaMusicPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';
import { CacheRestorerWrapper, SongPlayer } from '@/components';
import { SheetModal } from '@/components/sheet-modal';
import { usePalette } from '@/themes';
import { useEffect } from 'react';

const RootLayout = () => {
  const palette = usePalette();

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Like,
          Capability.Play,
          Capability.SeekTo,
          Capability.Dislike,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ]
      })
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background,
        position: 'relative',
      }}
    >
      <RequestPermissionWrapper requesters={[MediaMusicPermissionRequester]}>
        <CacheRestorerWrapper>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="create-playlist"
              options={{
                gestureEnabled: true,
                presentation: 'modal',
                animation: 'slide_from_bottom',
                gestureDirection: 'vertical',
              }}
            />
            <Stack.Screen
              name="playlist/[id]/index"
              options={{
                gestureEnabled: true,
                presentation: 'modal',
                animation: 'slide_from_left',
                gestureDirection: 'horizontal',
              }}
            />
            <Stack.Screen
              name="playlist/[id]/add-song"
              options={{
                gestureEnabled: true,
                presentation: 'modal',
                animation: 'slide_from_bottom',
                gestureDirection: 'vertical',
              }}
            />
          </Stack>
          <SongPlayer />
          <SheetModal />
        </CacheRestorerWrapper>
      </RequestPermissionWrapper>
    </View>
  );
};

export default RootLayout;
