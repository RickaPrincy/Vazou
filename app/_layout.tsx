import { Stack } from 'expo-router';
import { View } from 'react-native';
import {
  MediaLibraryPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';
import { CacheRestorerWrapper } from '@/components';

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <CacheRestorerWrapper>
        <RequestPermissionWrapper
          requesters={[MediaLibraryPermissionRequester]}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </RequestPermissionWrapper>
      </CacheRestorerWrapper>
    </View>
  );
};

export default RootLayout;
