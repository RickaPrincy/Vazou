import { HomeScreen } from '@/screens/home';
import {
  MediaLibraryPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';
import { CacheRestorerWrapper } from '@/components';

const RootLayout = () => {
  return (
    <CacheRestorerWrapper>
      <RequestPermissionWrapper requesters={[MediaLibraryPermissionRequester]}>
        <HomeScreen />
      </RequestPermissionWrapper>
    </CacheRestorerWrapper>
  );
};

export default RootLayout;
