import { HomeScreen } from '@/screens/home';
import {
  MediaLibraryPermissionRequester,
  RequestPermissionWrapper,
} from '@/permissions';

const RootLayout = () => {
  return (
    <RequestPermissionWrapper requesters={[MediaLibraryPermissionRequester]}>
      <HomeScreen />
    </RequestPermissionWrapper>
  );
};

export default RootLayout;
