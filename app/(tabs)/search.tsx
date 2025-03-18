import React from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { ThemedText, FlexView, Screen } from '@/components';
import { IconButton } from '@/components/buttons';
import { SongList } from '@/components/song-list';
import { useStateFetcher } from '@/hooks';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';
import { useConfigStore, usePlayer, useSearchSongStore } from '@/stores';
import { filterSongs } from '@/utils/filter-songs';
import { homeScreenStyles as styles } from '@/screens/home/styles';
import { NOOP_FN } from '@/utils/noop-fn';
import { router } from 'expo-router';

const groupByArtist = songs => {
  const artistsMap = new Map();
  songs.forEach(song => {
    if (!artistsMap.has(song.artist.id)) {
      artistsMap.set(song.artist.id, {
        id: song.artist.id,
        name: song.artist.name,
        image: song.artist.image,
      });
    }
  });
  return Array.from(artistsMap.values());
};

const Search = () => {
  const palette = usePalette();
  const user = useConfigStore(state => state.user);
  const setSong = usePlayer(state => state.setSong);
  const { setValue: setSearchSongValue, value: searchSongValue } =
    useSearchSongStore();
  const { data: songs, isLoading } = useStateFetcher({
    defaultValue: [],
    fetcher: async () => await songsProvider.get(),
  });
  const filteredSongs = filterSongs(searchSongValue, songs);
  const artists = groupByArtist(filteredSongs);

  return (
    <Screen style={{ backgroundColor: palette.background, padding: 20 }}>
      <FlexView
        style={[styles.headerContainer, { justifyContent: 'space-between' }]}
      >
        <View>
          <ThemedText style={{ fontSize: 12, color: palette.secondary }}>
            Bienvenue sur
          </ThemedText>
          <ThemedText
            style={{ fontSize: 22, fontWeight: 'bold', color: palette.primary }}
          >
            Vazou Music
          </ThemedText>
        </View>
        <Pressable onPress={NOOP_FN}>
          <FontAwesome name="music" size={26} color={palette.primary} />
        </Pressable>
      </FlexView>

      <FlexView
        style={[
          styles.searchContainer,
          {
            backgroundColor: palette.card,
            borderRadius: 30,
            padding: 15,
            marginTop: 30,
          },
        ]}
      >
        <Feather
          name="search"
          style={{ fontSize: 26, color: palette.secondary, marginLeft: 10 }}
        />
        <TextInput
          value={searchSongValue}
          placeholderTextColor="gray"
          placeholder="Rechercher un artiste ou une musique"
          style={{ flex: 1, fontSize: 18, color: palette.text, marginLeft: 10 }}
          onChangeText={setSearchSongValue}
        />
        {searchSongValue ? (
          <IconButton onPress={() => setSearchSongValue('')}>
            <Ionicons
              name="close"
              style={{ color: palette.secondary, fontSize: 26 }}
            />
          </IconButton>
        ) : (
          <IconButton>
            <Ionicons
              name="filter"
              style={{ color: palette.secondary, fontSize: 26 }}
            />
          </IconButton>
        )}
      </FlexView>

      {isLoading ? (
        <ActivityIndicator
          color={palette.primary}
          size={40}
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {artists.length > 0 && (
                <View style={{ marginTop: 20 }}>
                  <ThemedText
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                      color: palette.primary,
                    }}
                  >
                    Artistes Populaires
                  </ThemedText>
                  <FlatList
                    horizontal
                    data={artists || []}
                    keyExtractor={(item, index) =>
                      item?.id ? item.id.toString() : index.toString()
                    }
                    renderItem={({ item }) => {
                      if (!item) return null;
                      return (
                        <Pressable
                          onPress={() => setSearchSongValue(item.name)}
                          style={{ marginRight: 15 }}
                        >
                          {item.image && (
                            <Image
                              source={item.image}
                              style={{
                                width: 70,
                                height: 70,
                                borderRadius: 35,
                              }}
                            />
                          )}
                          <ThemedText
                            style={{ textAlign: 'center', marginTop: 5 }}
                          >
                            {item.name}
                          </ThemedText>
                        </Pressable>
                      );
                    }}
                  />
                </View>
              )}
              <ThemedText
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 20,
                  marginBottom: 10,
                  color: palette.primary,
                }}
              >
                Toutes les Musiques
              </ThemedText>
            </>
          }
          data={filteredSongs}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SongList
              canPlay
              onPress={() => {
                setSong(item);
                router.push('/play-view');
              }}
              songs={[item]}
            />
          )}
        />
      )}
    </Screen>
  );
};

export default Search;
