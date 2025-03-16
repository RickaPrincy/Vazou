import { TextInput, TouchableOpacity, View } from 'react-native';
import { Screen, ThemedText } from '@/components';
import { Controller, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';

import { Header } from '@/components/header';
import { PlayList, usePlayListStore } from '@/stores';
import { usePalette } from '@/themes';
import { router } from 'expo-router';

type CreatePlayListForm = Pick<PlayList, 'name' | 'description'>;
export const CreatePlayListScreen = () => {
  const addPlayList = usePlayListStore(state => state.addPlayList);
  const palette = usePalette();
  const { control, handleSubmit } = useForm<CreatePlayListForm>({
    defaultValues: {
      description: '',
      name: '',
    },
  });

  const onSubmit = (data: CreatePlayListForm) => {
    addPlayList({
      id: uuid.v4(),
      songs: [],
      ...data,
    });
    router.back();
  };

  return (
    <Screen>
      <Header title="Ajouter un playlist" />
      <View style={{ marginTop: 20 }}>
        <ThemedText
          style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
        >
          Title
        </ThemedText>
        <View
          style={{
            padding: 15,
            backgroundColor: palette.card,
            borderRadius: 15,
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholderTextColor={'gray'}
                style={{ fontSize: 16, color: palette.secondary }}
                placeholder="Playlist title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <ThemedText
          style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
        >
          Description
        </ThemedText>
        <View
          style={{
            padding: 15,
            backgroundColor: palette.card,
            borderRadius: 15,
          }}
        >
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ fontSize: 16, color: palette.secondary }}
                placeholderTextColor={'gray'}
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          marginVertical: 20,
          backgroundColor: palette.primary,
          paddingVertical: 10,
          borderRadius: 15,
        }}
      >
        <ThemedText style={{ textAlign: 'center' }}>Save</ThemedText>
      </TouchableOpacity>
    </Screen>
  );
};
