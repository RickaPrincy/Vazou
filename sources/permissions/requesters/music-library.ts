import { PermissionRequester, PermissionStatus, RequesterName } from '../types';
import {
  requestPermissionsAsync,
  PermissionResponse,
} from 'expo-music-library';
import { requestPermissionsAsync as requestMorePermission } from 'expo-media-library';

const mapStatus = (status: PermissionResponse['status']) => {
  switch (status) {
    case 'granted':
      return PermissionStatus.GRANTED;
    case 'denied':
      return PermissionStatus.DENIED;
    case 'undetermined':
      return PermissionStatus.UNDETERMINED;
    default:
      return PermissionStatus.UNDETERMINED;
  }
};

export const MediaMusicPermissionRequester: PermissionRequester = {
  name: RequesterName.MUSIC_LIBRARY,
  request: async () => {
    await requestMorePermission();
    const { status } = await requestPermissionsAsync();
    return mapStatus(status);
  },
};
