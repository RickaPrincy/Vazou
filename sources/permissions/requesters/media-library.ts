import {
  requestPermissionsAsync,
  PermissionStatus as MediaLibraryPermissionStatus,
} from 'expo-media-library';
import { PermissionRequester, PermissionStatus, RequesterName } from '../types';

const mapStatus = (status: MediaLibraryPermissionStatus) => {
  switch (status) {
    case MediaLibraryPermissionStatus.DENIED:
      return PermissionStatus.DENIED;
    case MediaLibraryPermissionStatus.GRANTED:
      return PermissionStatus.GRANTED;
    case MediaLibraryPermissionStatus.UNDETERMINED:
      return PermissionStatus.UNDETERMINED;
    default:
      throw PermissionStatus.DENIED;
  }
};

export const MediaLibraryPermissionRequester: PermissionRequester = {
  name: RequesterName.MEDIA_LIBRARY,
  request: async () => {
    const { status } = await requestPermissionsAsync();
    return mapStatus(status);
  },
};
