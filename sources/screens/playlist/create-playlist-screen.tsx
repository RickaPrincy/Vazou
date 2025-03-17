import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import uuid from 'react-native-uuid';

import { Screen, ThemedText } from '@/components';
import { Button } from '@/components/buttons';
import { TextInput } from '@/components/inputs';
import { Header } from '@/components/header';
import { PlayList, usePlayListStore } from '@/stores';

type CreatePlayListForm = Pick<PlayList, 'name' | 'description'>;
export const CreatePlayListScreen = () => {
  const addPlayList = usePlayListStore(state => state.addPlayList);
  const form = useForm<CreatePlayListForm>({
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
      <FormProvider {...form}>
        <Header title="Ajouter un playlist" />
        <View style={{ marginTop: 20 }}>
          <ThemedText
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
          >
            Title
          </ThemedText>
          <TextInput name="name" placeholder="Name" />
        </View>
        <View style={{ marginTop: 20 }}>
          <ThemedText
            style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
          >
            Description
          </ThemedText>
          <TextInput name="description" placeholder="Description" />
        </View>
        <Button style={{ marginTop: 10 }} onPress={form.handleSubmit(onSubmit)}>
          Save
        </Button>
      </FormProvider>
    </Screen>
  );
};
