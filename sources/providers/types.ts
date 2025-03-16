export type CachedProvider<T> = {
  name: string;
  get: () => Promise<T>;
  clearCache: () => void;
  getFromSource: () => Promise<T>;
};
