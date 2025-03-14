export type Song = {
  id: string;
  uri: string;
  duration: number;
  filename: string;
};

export type CachedProvider<T, Store extends object> = {
  name: string;
  storeKeyName: keyof Store;
  get: () => Promise<T>;
  clearCache: () => void;
};
