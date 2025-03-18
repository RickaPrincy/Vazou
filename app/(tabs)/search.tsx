import React, { useState } from 'react';
import { ActivityIndicator, View, Pressable, TextInput } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText, FlexView, Screen } from '@/components';
import { IconButton } from '@/components/buttons';
import { SongList } from '@/components/song-list';
import { useStateFetcher } from '@/hooks';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';
import { usePlayer, useSearchSongStore } from '@/stores';
import { homeScreenStyles as styles } from '@/screens/home/styles';
import { NOOP_FN } from '@/utils/noop-fn';

export const Search = () => {
  const palette = usePalette();
  const setSong = usePlayer(state => state.setSong);
  const { setValue: setSearchSongValue, value: searchSongValue } =
    useSearchSongStore();
  const { data: songs, isLoading } = useStateFetcher({
    defaultValue: [],
    fetcher: async () => await songsProvider.get(),
  });

  const [searchFilter, setSearchFilter] = useState<'artist' | 'title'>('title');

  const filteredSongs = songs.filter(song =>
    searchFilter === 'artist'
      ? song.artist.toLowerCase().includes(searchSongValue.toLowerCase())
      : song.title.toLowerCase().includes(searchSongValue.toLowerCase())
  );

  return (
    <Screen>
      {/* Header */}
      <FlexView
        style={[
          styles.headerContainer,
          { justifyContent: 'space-between', alignItems: 'center' },
        ]}
      >
        <View>
          <ThemedText style={{ fontSize: 12, color: palette.secondary }}>
            Rechercher sur
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: palette.primary,
            }}
          >
            Vazou Music
          </ThemedText>
        </View>
        <Pressable onPress={NOOP_FN}>
          <Ionicons name="musical-notes" size={28} color={palette.primary} />
        </Pressable>
      </FlexView>

      {/* Barre de recherche */}
      <FlexView
        style={[
          styles.searchContainer,
          {
            backgroundColor: palette.card,
            borderRadius: 25,
            padding: 15,
            marginTop: 30,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          },
        ]}
      >
        <Feather
          name="search"
          style={{ fontSize: 24, color: palette.secondary, marginLeft: 10 }}
        />
        <TextInput
          value={searchSongValue}
          placeholderTextColor={palette.secondary}
          placeholder={
            searchFilter === 'artist'
              ? 'Rechercher un artiste...'
              : 'Rechercher un titre...'
          }
          style={{
            flex: 1,
            fontSize: 18,
            color: palette.text,
            marginLeft: 10,
            paddingVertical: 5,
          }}
          onChangeText={setSearchSongValue}
        />
        {searchSongValue ? (
          <IconButton onPress={() => setSearchSongValue('')}>
            <Ionicons
              name="close"
              style={{ color: palette.secondary, fontSize: 24 }}
            />
          </IconButton>
        ) : (
          <IconButton>
            <Ionicons
              name="filter"
              style={{ color: palette.secondary, fontSize: 24 }}
            />
          </IconButton>
        )}
      </FlexView>

      {/* Sélection du filtre avec icônes côte à côte */}
      <FlexView
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => setSearchFilter('artist')}
          style={{ alignItems: 'center', marginHorizontal: 20 }}
        >
          <MaterialIcons
            name="person"
            size={searchFilter === 'artist' ? 90 : 60} // Grand si actif, sinon plus petit
            color={
              searchFilter === 'artist' ? palette.primary : palette.secondary
            }
          />
          <ThemedText
            style={{
              color:
                searchFilter === 'artist' ? palette.primary : palette.secondary,
            }}
          >
            Artiste
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setSearchFilter('title')}
          style={{ alignItems: 'center', marginHorizontal: 20 }}
        >
          <MaterialIcons
            name="music-note"
            size={searchFilter === 'title' ? 90 : 60} // Grand si actif, sinon plus petit
            color={
              searchFilter === 'title' ? palette.primary : palette.secondary
            }
          />
          <ThemedText
            style={{
              color:
                searchFilter === 'title' ? palette.primary : palette.secondary,
            }}
          >
            Titre
          </ThemedText>
        </Pressable>
      </FlexView>

      {/* Liste des chansons */}
      {isLoading ? (
        <ActivityIndicator
          color={palette.primary}
          size={40}
          style={{ marginTop: 20 }}
        />
      ) : (
        <SongList
          canPlay
          onPress={song => {
            setSong(song);
            router.push('/play-view');
          }}
          songs={filteredSongs}
        />
      )}
    </Screen>
  );
};

export default Search;
