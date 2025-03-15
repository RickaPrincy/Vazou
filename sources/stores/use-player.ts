import { create } from 'zustand';
import { Song, songsProvider } from "@/providers";

type UseSongPlayer = {
  isPlaying: boolean;
  currentSong: Song | null;
  toggle: () => void;
  setPlayingSong: (song: Song | null) => void;
  pause: () => void,
  stop: () => void;
  play: () => void;
  next: () => void;
  prev: () => void;
}

export const usePlayer = create<UseSongPlayer>((set, get) => ({
  isPlaying: false,
  currentSong: null,
  pause: () => set({ isPlaying: false }),
  play: () => set({ isPlaying: true }),
  toggle: () => set({ isPlaying: get()?.isPlaying ? false : true }),
  stop: () => set({ isPlaying: false, currentSong: null }),
  setPlayingSong: (song) => set({ currentSong: song, isPlaying: true }),
  prev: async () => {
    const songs = await songsProvider.get();
    const currentIndex = get()?.currentSong?.index ?? 0

    if (currentIndex - 1 < 0) {
      return;
    }

    set({ currentSong: { ...songs[currentIndex - 1], index: currentIndex - 1 } })
  },
  next: async () => {
    const songs = await songsProvider.get();
    const currentIndex = get()?.currentSong?.index ?? 0
    if (currentIndex + 1 >= songs.length) {
      return;
    }

    set({ currentSong: { ...songs[currentIndex + 1], index: currentIndex + 1 } })
  }
}))
