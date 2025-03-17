import { Stack } from 'expo-router';
import { View } from 'react-native';
import {
  MediaMusicPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';
import { CacheRestorerWrapper, SongPlayer } from '@/components';
import { usePalette } from '@/themes';

const RootLayout = () => {
  const palette = usePalette();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background,
        position: 'relative',
      }}
    >
      <CacheRestorerWrapper>
        <RequestPermissionWrapper requesters={[MediaMusicPermissionRequester]}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="playlist/[id]"
              options={{
                gestureEnabled: true,
                presentation: 'modal',
                animation: 'slide_from_left',
                gestureDirection: 'horizontal',
              }}
            />
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
              name="/playlist/[id]/add-song"
              options={{
                gestureEnabled: true,
                presentation: 'modal',
                animation: 'slide_from_bottom',
                gestureDirection: 'vertical',
              }}
            />
          </Stack>
          <SongPlayer />
        </RequestPermissionWrapper>
      </CacheRestorerWrapper>
    </View>
  );
};

export default RootLayout;
