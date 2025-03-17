import { PermissionRequester, PermissionStatus, RequesterName } from '../types';
import { getPermissionsAsync, PermissionResponse } from 'expo-music-library';

const mapStatus = (status: PermissionResponse['status']) => {
  switch (status) {
    case 'granted':
      return PermissionStatus.GRANTED;
    case 'denied':
      return PermissionStatus.DENIED;
    default:
      throw new Error(PermissionStatus.DENIED);
  }
};

export const MediaMusicPermissionRequester: PermissionRequester = {
  name: RequesterName.MUSIC_LIBRARY,
  request: async () => {
    const { status } = await getPermissionsAsync();
    return mapStatus(status);
  },
};
