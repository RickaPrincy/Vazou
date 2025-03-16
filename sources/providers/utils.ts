import { CachedProvider } from './types';
import { StorageUtils } from '@/utils/storage';

type ConfigureCachedProviderArgs<T> = Omit<
  CachedProvider<T>,
  'clearCache' | 'getFromSource'
>;

export const configureCachedProvider = <T>({
  get,
  name,
}: ConfigureCachedProviderArgs<T>): CachedProvider<T> => {
  const getFromSource = async () => {
    const newData = await get();
    await StorageUtils.setItem(name, newData);
    return newData;
  };

  return {
    name,
    get: async () => {
      const cachedData = await StorageUtils.get<T>(name);

      if (cachedData) {
        return cachedData;
      }

      return getFromSource();
    },
    clearCache: async () => {
      return StorageUtils.removeItem(name);
    },
    getFromSource,
  };
};
