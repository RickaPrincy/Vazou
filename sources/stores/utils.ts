import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { parseStringifiedObj } from '@/utils/stringify';

export const createPersistedStore = <T extends object>({
  name,
  state,
}: {
  name: string;
  state: StateCreator<T>;
}) =>
  create(
    persist<T>(state, {
      name,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: toHidrateState => {
        const retrieveDefaultValue = async () => {
          try {
            const defaultValue = await AsyncStorage.getItem(name);
            toHidrateState = parseStringifiedObj<T>(defaultValue!);
          } catch (e) {
            console.error(e);
          }
        };

        retrieveDefaultValue();
      },
    })
  );
