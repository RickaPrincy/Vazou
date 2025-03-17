import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import { usePalette } from '@/themes';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/stores';
import { useState } from 'react';

interface MusicDetailModalProps {
  visible: boolean;
  onClose: () => void;
  song: {
    filename: string;
    artist?: string;
    albumCoverUri?: string;
  } | null;
}

export const MusicDetailModal = ({
  visible,
  onClose,
  song,
}: MusicDetailModalProps) => {
  const palette = usePalette();
  const { toggle, isPlaying, next, previous, shuffle, replay } = usePlayer();
  const [progress, setProgress] = useState(0);

  if (!song) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: palette.background }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={28} color={palette.text} />
          </TouchableOpacity>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', color: palette.text }}
          >
            Vazou Music
          </Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Pochette de l'album */}
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={{ uri: song.albumCoverUri }}
            style={{ width: 300, height: 300, borderRadius: 20 }}
          />
        </View>

        {/* Informations du morceau */}
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text
            style={{ fontSize: 22, fontWeight: 'bold', color: palette.text }}
          >
            {song.filename}
          </Text>
          <Text style={{ fontSize: 18, color: palette.secondary }}>
            {song.artist || 'Artiste inconnu'}
          </Text>
        </View>

        {/* Barre de progression */}
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

        {/* Boutons de contrôle */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <TouchableOpacity onPress={replay} style={{ marginHorizontal: 15 }}>
            <Ionicons name="repeat" size={30} color={palette.accent} />
          </TouchableOpacity>
          <TouchableOpacity onPress={previous} style={{ marginHorizontal: 15 }}>
            <Ionicons name="play-skip-back" size={30} color={palette.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggle}
            style={{
              backgroundColor: palette.accent,
              padding: 15,
              borderRadius: 50,
            }}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={next} style={{ marginHorizontal: 15 }}>
            <Ionicons
              name="play-skip-forward"
              size={30}
              color={palette.accent}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={shuffle} style={{ marginHorizontal: 15 }}>
            <Ionicons name="shuffle" size={30} color={palette.accent} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
