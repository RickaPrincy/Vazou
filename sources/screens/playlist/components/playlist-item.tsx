import { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { IconButton } from '@/components/buttons';
import { ThemedText } from '@/components';
import { PlayList } from '@/stores';
import { usePalette } from '@/themes';
import { createStyle } from '@/utils/styles';

type PlayLitsItemProps = {
  playlist: PlayList;
  selecteds: PlayList[];
  togglePlayList: (playlist: PlayList) => void;
};

export const PlayLitsItem: FC<PlayLitsItemProps> = ({
  playlist,
  selecteds,
  togglePlayList,
}) => {
  const palette = usePalette();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/playlist/${playlist.id}`);
  };

  const isSelected = selecteds?.some(el => el.id === playlist.id);

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={() => togglePlayList(playlist)}
      style={[
        styles.container,
        { backgroundColor: playlist.color || palette.card },
      ]}
    >
      {selecteds.length > 0 && (
        <IconButton onPress={() => togglePlayList(playlist)}>
          <MaterialIcons
            style={{ marginRight: 15, color: palette.text, fontSize: 24 }}
            name={isSelected ? 'check-box' : 'check-box-outline-blank'}
          />
        </IconButton>
      )}
      {playlist.imageUri ? (
        <Image source={{ uri: playlist.imageUri }} style={styles.image} />
      ) : (
        <View style={styles.defaultImage}>
          <Feather name="music" size={24} color={palette.primary} />
        </View>
      )}

      <View style={styles.textContainer}>
        <ThemedText style={[styles.title, { color: palette.text }]}>
          {playlist.name}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: palette.text }]}>
          {playlist.songs.length} songs
        </ThemedText>
      </View>

      <Feather name="arrow-right" size={24} color={palette.text} />
    </TouchableOpacity>
  );
};

const styles = createStyle({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  defaultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
});
