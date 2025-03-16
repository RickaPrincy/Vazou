import { create } from 'zustand';
import { Song, songsProvider } from '@/providers';
import debounce from 'debounce';
import { SONG_STATE_DEBOUNCE } from '@/utils/debounce';

type UseSongPlayer = {
  isPlaying: boolean;
  currentSong: Song | null;
  toggle: () => void;
  setPlayingSong: (song: Song | null) => void;
  pause: () => void;
  stop: () => void;
  play: () => void;
  next: () => void;
  prev: () => void;
};

// DEBOUNCED SONG PLAYER
export const usePlayer = create<UseSongPlayer>((set, get) => ({
  isPlaying: false,
  currentSong: null,
  pause: debounce(() => set({ isPlaying: false }), SONG_STATE_DEBOUNCE),
  play: debounce(() => set({ isPlaying: true }), SONG_STATE_DEBOUNCE),
  toggle: debounce(
    () => set({ isPlaying: get().isPlaying ? false : true }),
    SONG_STATE_DEBOUNCE
  ),
  stop: debounce(
    () => set({ isPlaying: false, currentSong: null }),
    SONG_STATE_DEBOUNCE
  ),
  setPlayingSong: debounce(
    (song: Song | null) => set({ currentSong: song, isPlaying: true }),
    SONG_STATE_DEBOUNCE + 100 // Changing music takes more times than just play and pause
  ),

  prev: debounce(async () => {
    const songs = await songsProvider.get();
    const currentIndex = get().currentSong?.index ?? 0;

    if (currentIndex - 1 < 0) return;

    set({
      isPlaying: true,
      currentSong: { ...songs[currentIndex - 1], index: currentIndex - 1 },
    });
  }, SONG_STATE_DEBOUNCE),

  next: debounce(async () => {
    const songs = await songsProvider.get();
    const currentIndex = get().currentSong?.index ?? 0;

    if (currentIndex + 1 >= songs.length) return;

    set({
      isPlaying: true,
      currentSong: { ...songs[currentIndex + 1], index: currentIndex + 1 },
    });
  }, SONG_STATE_DEBOUNCE),
}));
