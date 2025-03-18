import { Song } from '@/stores';

export const filterSongs = (title: string, songs: Song[]) => {
  if (!title) {
    return songs;
  }
  return songs.filter(song =>
    song.title.toLowerCase().includes(title.toLowerCase())
  );
};
