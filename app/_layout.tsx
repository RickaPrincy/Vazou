import { MediaLibraryPermissionRequester, RequestPermissionWrapper } from "@/permissions";
import { HomeScreen } from "@/screens/home";

export default function RootLayout() {
  return (
    <RequestPermissionWrapper requesters={[MediaLibraryPermissionRequester]}>
      <HomeScreen />
    </RequestPermissionWrapper>
  )
}
