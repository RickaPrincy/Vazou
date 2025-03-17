import { Stack } from 'expo-router';
import { View } from 'react-native';

import {
  MediaMusicPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';
import { CacheRestorerWrapper, SongPlayer } from '@/components';
import { SheetModal } from '@/components/sheet-modal';
import { useSetupTrackPlayer } from '@/permissions/hooks';
import { usePalette } from '@/themes';

const RootLayout = () => {
  const palette = usePalette();
  useSetupTrackPlayer();

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
