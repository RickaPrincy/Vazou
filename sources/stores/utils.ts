import { StateCreator, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageUtils } from '@/utils/storage';

type PersistedStore<T> = T & { init: () => Promise<void> };
export type RawData<T> = { state: T };
export const createPersistedStore = <T extends object>({
  name,
  state,
}: {
  name: string;
  state: StateCreator<T>;
}) =>
  create(
    persist<PersistedStore<T>>(
      (set, get, api) => ({
        ...state(set, get, api),
        init: async () => {
          try {
            const cachedData = await StorageUtils.get<RawData<T>>(name);
            if (cachedData) {
              set(cachedData.state);
            }
          } catch (error) {
            console.error(error);
          }
        },
      }),
      {
        name,
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );
