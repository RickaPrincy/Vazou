import { Song } from '@/stores';

export const filterSongs = (filename: string, songs: Song[]) => {
  if (!filename) {
    return songs;
  }
  return songs.filter(song =>
    song.filename.toLowerCase().includes(filename.toLowerCase())
  );
};
