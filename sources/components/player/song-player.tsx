import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

import { usePlayer } from '@/stores';
import { useLoadingHandler } from '@/hooks';

export const SongPlayer = () => {
  const { isLoading, startLoading, stopLoading } = useLoadingHandler();
  const { song: currentSong, playing: isPlaying } = usePlayer();
  const currentSongUri = currentSong?.uri;

  useEffect(() => {
    (async () => {
      startLoading();
      if (!currentSongUri) {
        await TrackPlayer.reset();
        return;
      }

      await TrackPlayer.load({
        url: currentSong?.uri,
        artwork: currentSong?.albumCoverUri,
        artist: currentSong?.artist,
        title: currentSong?.filename,
      });
      await TrackPlayer.play();
      stopLoading();
    })();
  }, [currentSongUri]);

  useEffect(() => {
    (async () => {
      if (isPlaying && !isLoading) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    })();
  }, [isPlaying, isLoading]);

  return null;
};
