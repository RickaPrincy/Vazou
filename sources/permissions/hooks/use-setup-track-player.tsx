import { useEffect } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';

export const useSetupTrackPlayer = () => {
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Stop,
          Capability.Play,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
      });
    })();
  }, []);
};
