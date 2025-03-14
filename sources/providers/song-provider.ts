import * as MediaLibrary from 'expo-media-library';

import { Provider, Song } from './types';

export const songProvider: Provider<Song> = {
  getList: async () => {
    const response = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    return response?.assets?.map(asset => ({
      id: asset.id,
      filename: asset.filename,
      duration: asset.duration,
      uri: asset.uri,
    }));
  },
};
