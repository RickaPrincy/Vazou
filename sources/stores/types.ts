export type Song = {
  id: string;
  uri: string;
  duration: number;
  filename: string;
  artist?: string;
  albumTitle?: string;
  albumCoverUri?: string;
};

export type PlayList = {
  id: string;
  name: string;
  songs: Song[];
  description?: string;
  imageUri?: string;
  color?: string;
};
