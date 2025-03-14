import { RawData } from '@/stores/utils';
import { CachedProvider } from './types';
import { StorageUtils } from '@/utils/storage';

type ConfigureCachedProviderArgs<T, Store extends object> = Omit<
  CachedProvider<T, Store>,
  'clearCache'
>;

export const configureCachedProvider = <T, Store extends object>({
  get,
  name,
  storeKeyName,
}: ConfigureCachedProviderArgs<T, Store>): CachedProvider<T, Store> => {
  return {
    name,
    storeKeyName,
    get: async () => {
      const cachedData = await StorageUtils.get<RawData<Store>>(name);

      if (cachedData && cachedData.state[storeKeyName]) {
        return cachedData.state[storeKeyName] as T;
      }

      return get();
    },
    clearCache: async () => {
      return StorageUtils.remove(name);
    },
  };
};
