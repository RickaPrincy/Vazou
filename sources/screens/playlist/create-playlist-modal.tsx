import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

import { Button } from '@/components/buttons';
import { TextInput } from '@/components/inputs';
import { Header } from '@/components/header';
import { PlayList, usePlayListStore, useSheetModal } from '@/stores';
import { usePalette } from '@/themes';

type CreatePlayListForm = Pick<PlayList, 'name'>;
export const CreatePlayListModal = () => {
  const palette = usePalette();
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
      <Header
        showLeft={false}
        headerStyle={{ justifyContent: 'flex-start' }}
        titleStyle={{ textAlign: 'left' }}
        title="Ajouter un playlist"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput name="name" placeholder="Name" />
      </View>
      <Button
        style={{ marginTop: 10 }}
        textProps={{ style: { color: palette.text } }}
        icon={<Feather name="save" size={25} color={palette.text} />}
        onPress={form.handleSubmit(onSubmit)}
      >
        Créer
      </Button>
    </FormProvider>
  );
};
