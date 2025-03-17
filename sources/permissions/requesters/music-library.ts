import { PermissionRequester, PermissionStatus, RequesterName } from '../types';
import {
  requestPermissionsAsync,
  PermissionResponse,
} from 'expo-music-library';

const mapStatus = (status: PermissionResponse['status']) => {
  console.log('state', status);
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
    const { status } = await requestPermissionsAsync();
    return mapStatus(status);
  },
};
