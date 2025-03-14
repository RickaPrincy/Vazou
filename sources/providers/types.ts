export type Song = {
  id: string;
  uri: string;
  duration: number;
  filename: string;
};

export type Provider<T> = {
  getList: () => Promise<T[]>;
};
