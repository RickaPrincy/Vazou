export enum PermissionStatus {
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  UNDETERMINED = 'UNDETERMINED',
}

export enum RequesterName {
  MUSIC_LIBRARY = 'MUSIC_LIBRARY',
}

export type PermissionRequester = {
  name: RequesterName;
  request: () => Promise<PermissionStatus>;
};
