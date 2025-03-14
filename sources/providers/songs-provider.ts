import * as MediaLibrary from 'expo-media-library';

import { CachedProvider, Song } from './types';
import { SONGS_CACHE_NAME, SongsStore } from '@/stores';
import { configureCachedProvider } from './utils';

export const songsProvider: CachedProvider<Song[], SongsStore> =
  configureCachedProvider({
    name: SONGS_CACHE_NAME,
    storeKeyName: 'songs',
    get: async () => {
      const response = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });
      return response.assets.map(asset => ({
        id: asset.id,
        filename: asset.filename,
        duration: asset.duration,
        uri: asset.uri,
      }));
    },
  });
