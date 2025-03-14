export enum PermissionStatus {
  GRANTED = "GRANTED",
  DENIED = "DENIED",
  UNDETERMINED = "UNDETERMINED"
}

export enum RequesterName {
  MEDIA_LIBRARY = "MEDIA_LIBRARY"
}

export type PermissionRequester = {
  name: RequesterName;
  request: () => Promise<PermissionStatus>;
}

