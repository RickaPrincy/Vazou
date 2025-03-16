import * as MediaLibrary from 'expo-media-library';

import { configureCachedProvider } from './utils';

export const SONGS_CACHE_NAME = 'SONGS-CACHE';
export const songsProvider = configureCachedProvider({
  name: SONGS_CACHE_NAME,
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
