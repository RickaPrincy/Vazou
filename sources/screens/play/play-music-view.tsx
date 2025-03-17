import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Screen } from '@/components';
import { usePalette } from '@/themes';
import { usePlayer } from '@/stores';

export const PlayMusicViewScreen = () => {
  const palette = usePalette();
  const { toggle, playing: isPlaying, next, prev } = usePlayer();
  const [progress] = useState(0);
  const currentSong = usePlayer(state => state.song);

  return (
    <Screen>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={prev}>
          <Ionicons name="arrow-back" size={28} color={palette.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: palette.text }}>
          Vazou Music
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: currentSong?.albumCoverUri }}
          style={{ width: 300, height: 300, borderRadius: 20 }}
        />
      </View>

      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: palette.text }}>
          {currentSong?.filename}
        </Text>
        <Text style={{ fontSize: 18, color: palette.secondary }}>
          {currentSong?.artist || 'Artiste inconnu'}
        </Text>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <View
          style={{
            height: 5,
            backgroundColor: palette.secondary,
            borderRadius: 10,
            width: `${progress}%`,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Text style={{ color: palette.text }}>00:00</Text>
          <Text style={{ color: palette.text }}>03:45</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}
      >
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <Ionicons name="repeat" size={30} color={palette.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={prev} style={{ marginHorizontal: 15 }}>
          <Ionicons name="play-skip-back" size={30} color={palette.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggle}
          style={{
            backgroundColor: palette.secondary,
            padding: 15,
            borderRadius: 50,
          }}
        >
          <Feather
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={next} style={{ marginHorizontal: 15 }}>
          <Ionicons
            name="play-skip-forward"
            size={30}
            color={palette.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <Ionicons name="shuffle" size={30} color={palette.secondary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};
