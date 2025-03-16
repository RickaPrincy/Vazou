import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseStringifiedObj, stringifyObj } from './stringify';

export const StorageUtils = {
  async get<T>(key: string) {
    const cachedData = await AsyncStorage.getItem(key);

    if (!cachedData) {
      return null;
    }

    return parseStringifiedObj<T>(cachedData);
  },
  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },

  async setItem<T>(key: string, data: T) {
    return AsyncStorage.setItem(key, stringifyObj(data));
  },
};
