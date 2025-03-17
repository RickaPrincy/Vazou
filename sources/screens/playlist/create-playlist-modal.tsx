import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';

import { Button } from '@/components/buttons';
import { TextInput } from '@/components/inputs';
import { Header } from '@/components/header';
import { PlayList, usePlayListStore, useSheetModal } from '@/stores';

type CreatePlayListForm = Pick<PlayList, 'name'>;
export const CreatePlayListModal = () => {
  const addPlayList = usePlayListStore(state => state.addPlayList);
  const closeSheetModal = useSheetModal(state => state.close);
  const form = useForm<CreatePlayListForm>({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: CreatePlayListForm) => {
    addPlayList({
      id: uuid.v4(),
      songs: [],
      ...data,
    });
    closeSheetModal();
  };

  return (
    <FormProvider {...form}>
      <Header title="Ajouter un playlist" />
      <View style={{ marginTop: 20 }}>
        <TextInput name="name" placeholder="Name" />
      </View>
      <Button style={{ marginTop: 10 }} onPress={form.handleSubmit(onSubmit)}>
        Save
      </Button>
    </FormProvider>
  );
};
