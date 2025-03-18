import debounce, { DebouncedFunction } from 'debounce';

import { PlayList, Song } from './types';
import { createPersistedStore } from './utils';
import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';

export type PlayListStore = {
  playlists: PlayList[];
  getPlayList: (id: string) => PlayList;
  addPlayList: DebouncedFunction<(playList: PlayList) => void>;
  deletePlaylist: DebouncedFunction<(id: string) => void>;
  updatePlayList: DebouncedFunction<(playList: PlayList) => void>;
  addSongsToPlayList: DebouncedFunction<
    (playListId: string, songs: Song[]) => void
  >;
  deleteSongsToPlayList: DebouncedFunction<
    (playlist: PlayList, songs: Song[]) => void
  >;
  deleteAllPlaylists: (playlists: PlayList[]) => void;
};

const PLAY_LIST_CACHE_NAME = 'PLAY-LIST-CACHE';
export const usePlayListStore = createPersistedStore<PlayListStore>({
  name: PLAY_LIST_CACHE_NAME,
  state: (set, get) => ({
    playlists: [],
    currentPlayList: null,

    getPlayList: (id: string) =>
      get().playlists.find(playlist => playlist.id === id)!,

    addPlayList: debounce((playlist: PlayList) => {
      set({ playlists: [...get().playlists, playlist] });
    }, CLICK_BUTTON_DEBOUNCE_MS),

    deletePlaylist: debounce(
      (id: string) =>
        set({
          playlists: get().playlists.filter(playlist => playlist.id !== id),
        }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    updatePlayList: debounce(
      (updated: PlayList) =>
        set({
          playlists: get().playlists.map(playlist =>
            playlist.id === updated.id ? updated : playlist
          ),
        }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    addSongsToPlayList: debounce((id: string, songs: Song[]) => {
      const playList = get().getPlayList(id)!;
      playList.songs = [...playList.songs, ...songs];
      get().updatePlayList(playList);
    }, CLICK_BUTTON_DEBOUNCE_MS),

    deleteSongsToPlayList: debounce(
      (playlist: PlayList, songsToDelete: Song[]) => {
        const updatedPlaylist = {
          ...playlist,
          songs: playlist.songs.filter(
            song => !songsToDelete.some(s => s.id === song.id)
          ),
        };
        get().updatePlayList(updatedPlaylist);
      },
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    deleteAllPlaylists: (playlistsToDelete: PlayList[]) =>
      set({
        playlists: get().playlists.filter(
          playlist => !playlistsToDelete.some(p => p.id === playlist.id)
        ),
      }),
  }),
});
