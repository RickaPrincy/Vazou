import { router, Stack } from 'expo-router';
import { View, Linking } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import {
  MediaMusicPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';
import { CacheRestorerWrapper, SongPlayer } from '@/components';
import { SheetModal } from '@/components/sheet-modal';
import { PlaybackService } from '@/services';
import { useSetupTrackPlayer } from '@/permissions/hooks';
import { usePalette } from '@/themes';
import { useLayoutEffect } from 'react';

TrackPlayer.registerPlaybackService(() => PlaybackService);

const RootLayout = () => {
  const palette = usePalette();
  useSetupTrackPlayer();

  useLayoutEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      if (url.includes('notification.click')) {
        router.push('/play-view');
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, [router]);

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
            <Stack.Screen
              name="play-view"
              options={{
                gestureEnabled: true,
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
