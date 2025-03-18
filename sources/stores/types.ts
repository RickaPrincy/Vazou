export type Song = {
  id: string;
  uri: string;
  duration: number;
  title: string;
  artist?: string;
  albumTitle?: string;
  artwork?: string;
};

export type PlayList = {
  id: string;
  name: string;
  songs: Song[];
  imageUri?: string;
  color?: string;
};
