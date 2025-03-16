import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components';
import { PlayList } from '@/stores';
import { usePalette, useReversePalette } from '@/themes';
import { Feather } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed

export const PlayLitsItem = ({ playlist }: { playlist: PlayList }) => {
  const palette = usePalette();
  const reversePalette = useReversePalette();

  const handlePress = () => {
    console.log('Playlist clicked:', playlist.name);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        { backgroundColor: playlist.color || palette.secondary },
      ]}
    >
      {playlist.imageUri ? (
        <Image source={{ uri: playlist.imageUri }} style={styles.image} />
      ) : (
        <View style={styles.defaultImage}>
          <Feather name="music" size={24} color={palette.primary} />
        </View>
      )}

      <View style={styles.textContainer}>
        <ThemedText style={[styles.title, { color: reversePalette.text }]}>
          {playlist.name}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: reversePalette.text }]}>
          {playlist.songs.length} songs
        </ThemedText>
      </View>

      <Feather name="arrow-right" size={24} color={reversePalette.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2, // Shadow effect
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
