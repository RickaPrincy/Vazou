import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';

import { Screen, ThemedText } from '@/components';
import { IconButton } from '@/components/buttons';
import { PlayLitsItem } from './components';
import { usePlayListStore } from '@/stores';
import { usePalette } from '@/themes';
import { Feather } from '@expo/vector-icons';

type FormData = {
  name: string;
  description: string;
};

export const PlayListScreen = () => {
  const palette = usePalette();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { addPlayList } = usePlayListStore();
  const playlists = usePlayListStore(state => state.playlists);

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSubmit = (data: FormData) => {
    addPlayList({
      id: uuid.v4(),
      songs: [],
      ...data,
    });
    reset();
    setIsModalVisible(false); // Close modal after submission
  };

  return (
    <Screen>
      <IconButton
        onPress={() => setIsModalVisible(true)}
        style={styles.addButton}
      >
        <Feather name="plus" size={30} color={palette.text} />
      </IconButton>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.label}>Nom de la Playlist</ThemedText>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Le nom est obligatoire' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    errors.name ? styles.inputError : null,
                    { color: palette.text },
                  ]}
                  placeholder="Nom de la playlist"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <ThemedText style={styles.error}>
                {errors.name.message}
              </ThemedText>
            )}

            <ThemedText style={styles.label}>Description</ThemedText>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { color: palette.text }]}
                  placeholder="Description (optionnel)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Button title="Créer Playlist" onPress={handleSubmit(onSubmit)} />
            <Button title="Fermer" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <ThemedText style={styles.sectionTitle}>Mes Playlists</ThemedText>

        <FlatList
          data={playlists}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PlayLitsItem playlist={item} />}
          ListEmptyComponent={
            <ThemedText style={styles.emptyMessage}>
              Aucune playlist créée.
            </ThemedText>
          }
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  addButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
